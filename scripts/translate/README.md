# Translation pipeline

Server-side translation for the eight Indian languages. **Nothing is authored
per language in the CMS.** Content is written once in English; translations are
produced offline and loaded into a `translations` table that the app reads at
render time.

There is no translation API in the request path. A page render cannot be slowed
down, rate-limited or broken by a third party — and if the translation memory is
unreachable, pages fall back to English rather than erroring.

## The chain

Every string resolves in this order, first hit wins:

1. **Human override** — a row with `is_override = true`. Never overwritten by the loader.
2. **Translation memory** — the normal path, a cached machine translation.
3. **English** — the source text, if there is no entry.

## Running it

One-time, then whenever English content changes.

```bash
# 0. Create the table (once per database)
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 --single-transaction \
  -f scripts/sql/002_add_translation_cache.sql

# 1. Collect English strings straight from Postgres
npm run translate:extract

# 2. Translate them with IndicTrans2 (see setup below)
python scripts/translate/indictrans2.py

# 3. Load the results into the database
npm run translate:load
```

Step 2 needs Python. Steps 1 and 3 are plain `.mjs` and deliberately avoid the
Payload CLI, which cannot run on Node 24 in this repo
(`ERR_REQUIRE_ASYNC_MODULE` — tsx cannot `require` `richtext-lexical`'s
top-level await).

### IndicTrans2 setup

```bash
pip install torch transformers sentencepiece
pip install git+https://github.com/VarunGumma/IndicTransToolkit
```

A GPU turns this into minutes rather than hours, but CPU is fine — it is a
one-off batch, not a request-path dependency. If memory is tight:

```bash
python scripts/translate/indictrans2.py --model ai4bharat/indictrans2-en-indic-dist-200M
```

The run is resumable: already-translated strings are skipped, so an interrupted
job can just be restarted. Delete `work/translations.<locale>.jsonl` to force a
full re-translation of one language.

## Correcting a translation

Machine output is not always right, and statutory vocabulary is where it fails
hardest. To fix one string, set it as an override — the loader will never
overwrite it again:

```sql
UPDATE translations
   SET translated_text = $1, is_override = true, engine = 'human'
 WHERE locale = 'kn' AND source_text = 'Tax Advisory';
```

> **On Windows, do not pass non-ASCII text to `psql` on the command line.** The
> console mangles it to `????` and silently corrupts the row. Use a UTF-8 `.sql`
> file with `psql -f`, or a parameterised query from Node.

To list what still needs review for one language:

```sql
SELECT source_text, translated_text
  FROM translations
 WHERE locale = 'kn' AND is_override = false
 ORDER BY length(source_text) DESC;
```

## Cache invalidation

Entries are keyed on a hash of the *source* text. Edit an English sentence and
its hash changes, so the stale translation is never looked up again — there is
nothing to purge by hand. Re-run extract → translate → load to fill the gap.

The normalisation used for that hash is duplicated in three places and **must
stay byte-identical**:

- `src/lib/translation/hash.ts` (runtime)
- `scripts/translate/extract.mjs`
- `scripts/translate/load.mjs`

`load.mjs` recomputes hashes itself and warns loudly if the Python side has
drifted, because the failure mode is otherwise silent: lookups simply miss and
pages quietly render English.

## Glossary

`src/i18n/glossary.json` lists terms that must survive verbatim — GST, NCLT,
SEBI, FEMA, firm names. The translator masks them before the model sees them and
restores them afterwards, so they cannot be transliterated or paraphrased. Both
the TypeScript runtime and the Python script read that one file.

## What this does *not* cover

Text hardcoded in JSX — roughly 450 public strings across the pages and
components — is not in the CMS and therefore not in this pipeline. Those need
extracting into `src/i18n/dictionaries/` first (phase 03 of the plan); the
dictionaries are then translated separately at build time.
