-- ============================================================================
-- 001_add_localization.sql
--
-- Enables Payload content localization (en, hi, ta, te, kn, ml, mr, bn, gu)
-- on an existing database.
--
-- WHY THIS FILE EXISTS INSTEAD OF A PAYLOAD MIGRATION
-- ---------------------------------------------------
-- `payload migrate:create` cannot run on Node 24 in this repo: tsx cannot
-- require() @payloadcms/richtext-lexical because it is an ESM graph with a
-- top-level await (ERR_REQUIRE_ASYNC_MODULE). The same issue breaks
-- `payload generate:types`. Once that toolchain problem is fixed, this can be
-- replaced by a generated migration.
--
-- WHY IT IS SAFE(R) THAN `push`
-- -----------------------------
-- Payload's dev `push` syncs the schema but does NOT move data: it drops the
-- localized columns and leaves the new *_locales tables empty, silently losing
-- all existing content. This script instead copies each row's current value
-- into the 'en' locale BEFORE dropping the old column, so nothing is lost.
--
-- Every statement is guarded (IF NOT EXISTS / IF EXISTS / ON CONFLICT), so the
-- script is idempotent and safe to re-run.
--
-- BEFORE RUNNING IN PRODUCTION
-- ----------------------------
--   1. Take a backup:
--        pg_dump -Fc -d "$DATABASE_URL" -f pre_localization.dump
--   2. Restore that dump into a scratch database and run this script there
--      first. Confirm the row counts reported at the end look right.
--   3. Only then run against production:
--        psql "$DATABASE_URL" -v ON_ERROR_STOP=1 --single-transaction \
--          -f scripts/sql/001_add_localization.sql
--
-- The whole thing runs in one transaction, so a failure rolls back cleanly.
-- ============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. The locale enum. Keep in sync with `locales` in src/i18n/config.ts and
--    `localization.locales` in src/payload.config.ts.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  CREATE TYPE "_locales" AS ENUM ('en', 'hi', 'ta', 'te', 'kn', 'ml', 'mr', 'bn', 'gu');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ---------------------------------------------------------------------------
-- 2. services
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services_locales (
  title                 character varying NOT NULL,
  summary               character varying NOT NULL,
  body                  jsonb,
  seo_meta_title        character varying,
  seo_meta_description  character varying,
  id                    serial PRIMARY KEY,
  _locale               "_locales" NOT NULL,
  _parent_id            integer NOT NULL
    REFERENCES services (id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS services_locales_locale_parent_id_unique
  ON services_locales (_locale, _parent_id);

-- Copy existing English content across, then drop the source columns.
-- The column_exists guard means a re-run is a no-op rather than an error.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'services' AND column_name = 'title') THEN
    INSERT INTO services_locales
      (title, summary, body, seo_meta_title, seo_meta_description, _locale, _parent_id)
    SELECT title, summary, body, seo_meta_title, seo_meta_description, 'en', id
    FROM services
    ON CONFLICT (_locale, _parent_id) DO NOTHING;

    ALTER TABLE services
      DROP COLUMN IF EXISTS title,
      DROP COLUMN IF EXISTS summary,
      DROP COLUMN IF EXISTS body,
      DROP COLUMN IF EXISTS seo_meta_title,
      DROP COLUMN IF EXISTS seo_meta_description;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 3. industries
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS industries_locales (
  name         character varying NOT NULL,
  description  character varying,
  id           serial PRIMARY KEY,
  _locale      "_locales" NOT NULL,
  _parent_id   integer NOT NULL
    REFERENCES industries (id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS industries_locales_locale_parent_id_unique
  ON industries_locales (_locale, _parent_id);

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'industries' AND column_name = 'name') THEN
    INSERT INTO industries_locales (name, description, _locale, _parent_id)
    SELECT name, description, 'en', id FROM industries
    ON CONFLICT (_locale, _parent_id) DO NOTHING;

    ALTER TABLE industries
      DROP COLUMN IF EXISTS name,
      DROP COLUMN IF EXISTS description;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 4. site_settings
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings_locales (
  organization_name  character varying DEFAULT 'Team Eyrie',
  tagline            character varying DEFAULT 'Together, We Create Value. Together, We Build Trust.',
  id                 serial PRIMARY KEY,
  _locale            "_locales" NOT NULL,
  _parent_id         integer NOT NULL
    REFERENCES site_settings (id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS site_settings_locales_locale_parent_id_unique
  ON site_settings_locales (_locale, _parent_id);

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'site_settings' AND column_name = 'organization_name') THEN
    INSERT INTO site_settings_locales (organization_name, tagline, _locale, _parent_id)
    SELECT organization_name, tagline, 'en', id FROM site_settings
    ON CONFLICT (_locale, _parent_id) DO NOTHING;

    ALTER TABLE site_settings
      DROP COLUMN IF EXISTS organization_name,
      DROP COLUMN IF EXISTS tagline;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 5. home_page (global)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS home_page_locales (
  hero_eyebrow            character varying DEFAULT 'India’s Integrated Professional Services Network',
  hero_headline           character varying DEFAULT 'Team Eyrie',
  hero_subheadline        character varying DEFAULT 'Together, We Create Value. Together, We Build Trust.',
  hero_primary_cta_label  character varying DEFAULT 'Contact Us',
  intro_heading           character varying DEFAULT 'About Team Eyrie',
  intro_body              character varying,
  process_heading         character varying DEFAULT 'How We Work',
  why_eyrie_tagline       character varying DEFAULT 'The Team Eyrie Advantage',
  why_eyrie_heading       character varying DEFAULT 'Why Team Eyrie?',
  why_eyrie_subheading    character varying DEFAULT 'A single umbrella combining senior leadership, multidisciplinary intelligence, and technology-assisted execution.',
  id                      serial PRIMARY KEY,
  _locale                 "_locales" NOT NULL,
  _parent_id              integer NOT NULL
    REFERENCES home_page (id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS home_page_locales_locale_parent_id_unique
  ON home_page_locales (_locale, _parent_id);

-- why_eyrie_* columns may not exist on older schemas; copy them only if present.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'home_page' AND column_name = 'hero_eyebrow') THEN
    INSERT INTO home_page_locales
      (hero_eyebrow, hero_headline, hero_subheadline, hero_primary_cta_label,
       intro_heading, intro_body, process_heading, _locale, _parent_id)
    SELECT hero_eyebrow, hero_headline, hero_subheadline, hero_primary_cta_label,
           intro_heading, intro_body, process_heading, 'en', id
    FROM home_page
    ON CONFLICT (_locale, _parent_id) DO NOTHING;

    ALTER TABLE home_page
      DROP COLUMN IF EXISTS hero_eyebrow,
      DROP COLUMN IF EXISTS hero_headline,
      DROP COLUMN IF EXISTS hero_subheadline,
      DROP COLUMN IF EXISTS hero_primary_cta_label,
      DROP COLUMN IF EXISTS intro_heading,
      DROP COLUMN IF EXISTS intro_body,
      DROP COLUMN IF EXISTS process_heading,
      DROP COLUMN IF EXISTS why_eyrie_tagline,
      DROP COLUMN IF EXISTS why_eyrie_heading,
      DROP COLUMN IF EXISTS why_eyrie_subheading;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 6. home_page array rows.
--    Array-row _parent_id is a varchar (Payload's generated row id), not an int.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS home_page_stats_locales (
  label       character varying NOT NULL,
  id          serial PRIMARY KEY,
  _locale     "_locales" NOT NULL,
  _parent_id  character varying NOT NULL
    REFERENCES home_page_stats (id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS home_page_stats_locales_locale_parent_id_unique
  ON home_page_stats_locales (_locale, _parent_id);

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'home_page_stats' AND column_name = 'label') THEN
    INSERT INTO home_page_stats_locales (label, _locale, _parent_id)
    SELECT label, 'en', id FROM home_page_stats
    ON CONFLICT (_locale, _parent_id) DO NOTHING;

    ALTER TABLE home_page_stats DROP COLUMN IF EXISTS label;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS home_page_process_steps_locales (
  title        character varying NOT NULL,
  description  character varying,
  id           serial PRIMARY KEY,
  _locale      "_locales" NOT NULL,
  _parent_id   character varying NOT NULL
    REFERENCES home_page_process_steps (id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS home_page_process_steps_locales_locale_parent_id_unique
  ON home_page_process_steps_locales (_locale, _parent_id);

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'home_page_process_steps' AND column_name = 'title') THEN
    INSERT INTO home_page_process_steps_locales (title, description, _locale, _parent_id)
    SELECT title, description, 'en', id FROM home_page_process_steps
    ON CONFLICT (_locale, _parent_id) DO NOTHING;

    ALTER TABLE home_page_process_steps
      DROP COLUMN IF EXISTS title,
      DROP COLUMN IF EXISTS description;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS home_page_hero_slides_locales (
  badge                character varying,
  tagline              character varying,
  title                character varying NOT NULL,
  description          character varying,
  primary_cta_label    character varying,
  secondary_cta_label  character varying,
  id                   serial PRIMARY KEY,
  _locale              "_locales" NOT NULL,
  _parent_id           character varying NOT NULL
    REFERENCES home_page_hero_slides (id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS home_page_hero_slides_locales_locale_parent_id_unique
  ON home_page_hero_slides_locales (_locale, _parent_id);

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'home_page_hero_slides' AND column_name = 'title') THEN
    INSERT INTO home_page_hero_slides_locales
      (badge, tagline, title, description, primary_cta_label, secondary_cta_label,
       _locale, _parent_id)
    SELECT badge, tagline, title, description, primary_cta_label, secondary_cta_label,
           'en', id
    FROM home_page_hero_slides
    ON CONFLICT (_locale, _parent_id) DO NOTHING;

    ALTER TABLE home_page_hero_slides
      DROP COLUMN IF EXISTS badge,
      DROP COLUMN IF EXISTS tagline,
      DROP COLUMN IF EXISTS title,
      DROP COLUMN IF EXISTS description,
      DROP COLUMN IF EXISTS primary_cta_label,
      DROP COLUMN IF EXISTS secondary_cta_label;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 7. "Why Team Eyrie" showcase rows.
--    These base tables are NOT present on every deployment — they were added
--    to the config after the last schema sync on some environments. Create the
--    locale tables only where the parent exists, otherwise skip quietly; the
--    next schema sync will create both together.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF to_regclass('public.home_page_why_eyrie_items') IS NOT NULL THEN
    CREATE TABLE IF NOT EXISTS home_page_why_eyrie_items_locales (
      tag          character varying,
      title        character varying NOT NULL,
      description  character varying NOT NULL,
      link_label   character varying,
      id           serial PRIMARY KEY,
      _locale      "_locales" NOT NULL,
      _parent_id   character varying NOT NULL
        REFERENCES home_page_why_eyrie_items (id) ON DELETE CASCADE
    );
    CREATE UNIQUE INDEX IF NOT EXISTS home_page_why_eyrie_items_locales_locale_parent_id_unique
      ON home_page_why_eyrie_items_locales (_locale, _parent_id);

    IF EXISTS (SELECT 1 FROM information_schema.columns
               WHERE table_name = 'home_page_why_eyrie_items' AND column_name = 'title') THEN
      INSERT INTO home_page_why_eyrie_items_locales
        (tag, title, description, link_label, _locale, _parent_id)
      SELECT tag, title, description, link_label, 'en', id
      FROM home_page_why_eyrie_items
      ON CONFLICT (_locale, _parent_id) DO NOTHING;

      ALTER TABLE home_page_why_eyrie_items
        DROP COLUMN IF EXISTS tag,
        DROP COLUMN IF EXISTS title,
        DROP COLUMN IF EXISTS description,
        DROP COLUMN IF EXISTS link_label;
    END IF;
  END IF;

  IF to_regclass('public.home_page_why_eyrie_items_bullets') IS NOT NULL THEN
    CREATE TABLE IF NOT EXISTS home_page_why_eyrie_items_bullets_locales (
      text        character varying NOT NULL,
      id          serial PRIMARY KEY,
      _locale     "_locales" NOT NULL,
      _parent_id  character varying NOT NULL
        REFERENCES home_page_why_eyrie_items_bullets (id) ON DELETE CASCADE
    );
    CREATE UNIQUE INDEX IF NOT EXISTS home_page_why_eyrie_items_bullets_locales_locale_parent_id_u
      ON home_page_why_eyrie_items_bullets_locales (_locale, _parent_id);

    IF EXISTS (SELECT 1 FROM information_schema.columns
               WHERE table_name = 'home_page_why_eyrie_items_bullets' AND column_name = 'text') THEN
      INSERT INTO home_page_why_eyrie_items_bullets_locales (text, _locale, _parent_id)
      SELECT text, 'en', id FROM home_page_why_eyrie_items_bullets
      ON CONFLICT (_locale, _parent_id) DO NOTHING;

      ALTER TABLE home_page_why_eyrie_items_bullets DROP COLUMN IF EXISTS text;
    END IF;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 8. Report what landed, so the dry run can be eyeballed before committing.
-- ---------------------------------------------------------------------------
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT 'services_locales' AS t, count(*) AS n FROM services_locales
    UNION ALL SELECT 'industries_locales', count(*) FROM industries_locales
    UNION ALL SELECT 'site_settings_locales', count(*) FROM site_settings_locales
    UNION ALL SELECT 'home_page_locales', count(*) FROM home_page_locales
    UNION ALL SELECT 'home_page_stats_locales', count(*) FROM home_page_stats_locales
    UNION ALL SELECT 'home_page_process_steps_locales', count(*) FROM home_page_process_steps_locales
    UNION ALL SELECT 'home_page_hero_slides_locales', count(*) FROM home_page_hero_slides_locales
    ORDER BY 1
  LOOP
    RAISE NOTICE 'localization: % -> % row(s)', r.t, r.n;
  END LOOP;
END $$;

COMMIT;
