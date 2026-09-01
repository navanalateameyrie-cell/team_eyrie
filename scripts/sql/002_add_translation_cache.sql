-- ============================================================================
-- 002_add_translation_cache.sql
--
-- Translation memory for the server-side translation layer.
--
-- Nothing here is authored in the CMS. Strings are extracted from the English
-- content, translated offline in a batch job (IndicTrans2), and loaded into
-- this table. At render time the app only ever READS from it — there is no
-- translation API in the request path, so a page render cannot be slowed down
-- or broken by a third-party outage.
--
-- Keyed on a hash of the *source* text, which is what makes invalidation
-- automatic: edit an English sentence and its hash changes, so the stale
-- translation is simply never looked up again. Nothing to purge by hand.
--
-- Run with:
--   psql "$DATABASE_URL" -v ON_ERROR_STOP=1 --single-transaction \
--     -f scripts/sql/002_add_translation_cache.sql
--
-- Idempotent and safe to re-run.
-- ============================================================================

BEGIN;

CREATE TABLE IF NOT EXISTS translations (
  -- sha256 of the normalised source string, truncated to 40 hex chars.
  -- Normalisation (trim + collapse internal whitespace) must match
  -- src/lib/translation/hash.ts exactly, or lookups silently miss.
  source_hash      char(40)    NOT NULL,

  -- Target language: 'hi', 'ta', 'te', 'kn', 'ml', 'mr', 'bn', 'gu'.
  -- Deliberately plain text rather than the Payload "_locales" enum, so adding
  -- a language here does not require altering a type used by content tables.
  locale           varchar(8)  NOT NULL,

  -- Kept for debugging and for re-translation when an engine improves.
  source_text      text        NOT NULL,
  translated_text  text        NOT NULL,

  -- Which engine produced this ('indictrans2', 'google', 'human', ...).
  engine           varchar(32) NOT NULL DEFAULT 'indictrans2',

  -- A human correction. The batch loader NEVER overwrites a row with this set,
  -- so corrections survive every subsequent re-translation. This is the
  -- override layer, and it lives here rather than in the CMS on purpose.
  is_override      boolean     NOT NULL DEFAULT false,

  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),

  PRIMARY KEY (source_hash, locale)
);

-- The only query shape the runtime uses:
--   WHERE locale = $1 AND source_hash = ANY($2)
-- The primary key is (source_hash, locale), so lead this index with locale to
-- serve that predicate efficiently.
CREATE INDEX IF NOT EXISTS translations_locale_hash_idx
  ON translations (locale, source_hash);

-- Lets a reviewer list everything still machine-generated for one language.
CREATE INDEX IF NOT EXISTS translations_review_idx
  ON translations (locale, is_override);

COMMIT;
