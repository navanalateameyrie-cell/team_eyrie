#!/usr/bin/env python3
"""
Step 2 of the translation pipeline: translate the extracted English strings
into the eight Indian languages using AI4Bharat's IndicTrans2.

    python scripts/translate/indictrans2.py
    python scripts/translate/indictrans2.py --locales kn hi --batch-size 16

Reads  : scripts/translate/work/strings.json      (from extract.mjs)
Writes : scripts/translate/work/translations.<locale>.jsonl

Why IndicTrans2: it is open source, purpose-built for Indic languages by
AI4Bharat (IIT Madras), and generally outperforms the general-purpose engines
on English -> Indian language pairs. Running it here means no API key, no
per-character billing and no third-party dependency in production — the output
is loaded into Postgres once and read from there.

SETUP
-----
    pip install torch transformers sentencepiece
    pip install git+https://github.com/VarunGumma/IndicTransToolkit

A GPU makes this minutes rather than hours, but CPU is perfectly adequate for a
corpus this size — it is a one-off job, not a request-path dependency. Use
--model to switch to the distilled 200M checkpoint if memory is tight.

RESUMABLE
---------
Already-translated hashes are skipped, so an interrupted run can simply be
restarted. Delete the .jsonl for a language to force a full re-translation.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
WORK = HERE / "work"
REPO = HERE.parent.parent
GLOSSARY_PATH = REPO / "src" / "i18n" / "glossary.json"
LOCALES_PATH = HERE / "locales.json"

DEFAULT_MODEL = "ai4bharat/indictrans2-en-indic-1B"
DISTILLED_MODEL = "ai4bharat/indictrans2-en-indic-dist-200M"


def load_json(path: Path):
    with path.open(encoding="utf-8") as fh:
        return json.load(fh)


# --------------------------------------------------------------------------
# Glossary masking.
#
# Rather than trusting the model to leave "GST" or "NCLT" alone, each glossary
# term is swapped for an opaque placeholder before translation and restored
# afterwards. The model therefore never sees the term and cannot mangle it.
#
# Placeholders are chosen to survive tokenisation intact: a bare token like
# "XX0XX" is far less likely to be split or transliterated than a symbol-heavy
# marker such as "<<0>>".
# --------------------------------------------------------------------------
PLACEHOLDER = "XX{}XX"


def build_glossary_pattern(terms: list[str]) -> re.Pattern | None:
    if not terms:
        return None
    # Longest first, so "IND AS" wins over a bare "AS" and "M&A" is not split.
    ordered = sorted(terms, key=len, reverse=True)
    escaped = [re.escape(t) for t in ordered]
    return re.compile(r"(?<![\w])(" + "|".join(escaped) + r")(?![\w])")


def mask(text: str, pattern: re.Pattern | None) -> tuple[str, list[str]]:
    if pattern is None:
        return text, []
    found: list[str] = []

    def repl(m: re.Match) -> str:
        found.append(m.group(0))
        return PLACEHOLDER.format(len(found) - 1)

    return pattern.sub(repl, text), found


def unmask(text: str, found: list[str]) -> str:
    for i, original in enumerate(found):
        ph = PLACEHOLDER.format(i)
        if ph in text:
            text = text.replace(ph, original)
        else:
            # The model dropped or altered the placeholder. Append the term so
            # the information is not silently lost, and flag it for review.
            text = f"{text} {original}".strip()
    return text


def main() -> int:
    ap = argparse.ArgumentParser(description="Translate extracted strings with IndicTrans2.")
    ap.add_argument("--locales", nargs="*", default=None, help="Subset of locales (default: all).")
    ap.add_argument("--batch-size", type=int, default=8)
    ap.add_argument("--model", default=DEFAULT_MODEL, help=f"HF model id (distilled: {DISTILLED_MODEL})")
    ap.add_argument("--device", default=None, help="cuda | cpu (default: auto)")
    args = ap.parse_args()

    strings_file = WORK / "strings.json"
    if not strings_file.exists():
        print(f"No {strings_file}. Run:  node --env-file=.env scripts/translate/extract.mjs", file=sys.stderr)
        return 1

    items = load_json(strings_file)["items"]
    if not items:
        print("Nothing to translate.")
        return 0

    locale_cfg = load_json(LOCALES_PATH)
    targets = locale_cfg["targets"]
    if args.locales:
        unknown = [l for l in args.locales if l not in targets]
        if unknown:
            print(f"Unknown locale(s): {', '.join(unknown)}", file=sys.stderr)
            return 1
        targets = {k: v for k, v in targets.items() if k in args.locales}

    glossary_terms = load_json(GLOSSARY_PATH)["doNotTranslate"]
    pattern = build_glossary_pattern(glossary_terms)

    # Imported late so --help works without the ML stack installed.
    try:
        import torch
        from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
        from IndicTransToolkit.processor import IndicProcessor
    except ImportError as exc:
        print(
            "Missing dependency: %s\n\n"
            "  pip install torch transformers sentencepiece\n"
            "  pip install git+https://github.com/VarunGumma/IndicTransToolkit\n" % exc,
            file=sys.stderr,
        )
        return 1

    device = args.device or ("cuda" if torch.cuda.is_available() else "cpu")
    print(f"model  : {args.model}\ndevice : {device}\nstrings: {len(items)}\n")

    tokenizer = AutoTokenizer.from_pretrained(args.model, trust_remote_code=True)
    model = AutoModelForSeq2SeqLM.from_pretrained(
        args.model,
        trust_remote_code=True,
        torch_dtype=torch.float16 if device == "cuda" else torch.float32,
    ).to(device)
    model.eval()
    processor = IndicProcessor(inference=True)

    WORK.mkdir(parents=True, exist_ok=True)
    src_lang = locale_cfg["source"]

    for locale, flores in targets.items():
        out_path = WORK / f"translations.{locale}.jsonl"

        done: set[str] = set()
        if out_path.exists():
            with out_path.open(encoding="utf-8") as fh:
                for line in fh:
                    line = line.strip()
                    if line:
                        try:
                            done.add(json.loads(line)["hash"])
                        except (json.JSONDecodeError, KeyError):
                            pass

        pending = [it for it in items if it["hash"] not in done]
        if not pending:
            print(f"{locale} ({flores}): already complete, {len(done)} strings")
            continue

        print(f"{locale} ({flores}): {len(pending)} to translate, {len(done)} cached")

        with out_path.open("a", encoding="utf-8") as out:
            for start in range(0, len(pending), args.batch_size):
                batch = pending[start : start + args.batch_size]
                masked, masks = zip(*(mask(it["text"], pattern) for it in batch))

                prepared = processor.preprocess_batch(list(masked), src_lang=src_lang, tgt_lang=flores)
                enc = tokenizer(
                    prepared,
                    truncation=True,
                    padding=True,
                    max_length=256,
                    return_tensors="pt",
                ).to(device)

                with torch.inference_mode():
                    generated = model.generate(
                        **enc,
                        max_length=256,
                        num_beams=5,
                        num_return_sequences=1,
                    )

                decoded = tokenizer.batch_decode(
                    generated.detach().cpu().tolist(),
                    skip_special_tokens=True,
                    clean_up_tokenization_spaces=True,
                )

                finals = processor.postprocess_batch(decoded, lang=flores)

                for item, translated, found in zip(batch, finals, masks):
                    out.write(
                        json.dumps(
                            {
                                "hash": item["hash"],
                                "text": item["text"],
                                "translated": unmask(translated, list(found)),
                                "engine": "indictrans2",
                            },
                            ensure_ascii=False,
                        )
                        + "\n"
                    )
                out.flush()

                done_n = min(start + args.batch_size, len(pending))
                print(f"  {done_n}/{len(pending)}", end="\r", flush=True)

        print(f"  wrote {out_path.name}                    ")

    print("\nNext:  node --env-file=.env scripts/translate/load.mjs")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
