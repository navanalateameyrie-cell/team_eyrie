#!/usr/bin/env node
/**
 * Step 3 of the translation pipeline: load the translated strings into the
 * `translations` table that the app reads at render time.
 *
 *   node --env-file=.env scripts/translate/load.mjs
 *   node --env-file=.env scripts/translate/load.mjs --locales kn hi
 *   node --env-file=.env scripts/translate/load.mjs --dry-run
 *
 * Reads scripts/translate/work/translations.<locale>.jsonl (from indictrans2.py).
 *
 * Human overrides are sacred: a row with is_override = true is never
 * overwritten, so a correction someone made survives every future
 * re-translation. That is the whole reason the override lives in this table
 * rather than being recomputed.
 */

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const here = path.dirname(fileURLToPath(import.meta.url))
const workDir = path.join(here, 'work')

// --- keep byte-identical with src/lib/translation/hash.ts --------------------
const normalizeSource = (t) => t.replace(/\s+/g, ' ').trim()
const sourceHash = (t) =>
  crypto.createHash('sha256').update(normalizeSource(t), 'utf8').digest('hex').slice(0, 40)
// ----------------------------------------------------------------------------

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const localeArgIdx = args.indexOf('--locales')
const onlyLocales =
  localeArgIdx === -1 ? null : args.slice(localeArgIdx + 1).filter((a) => !a.startsWith('--'))

async function main() {
  const dbUrl =
    process.env.DATABASE_URL || process.env.DATABASE_URI || process.env.POSTGRES_URL || ''
  if (!dbUrl) {
    console.error('load: no DATABASE_URL in the environment.')
    process.exit(1)
  }

  const targets = JSON.parse(fs.readFileSync(path.join(here, 'locales.json'), 'utf8')).targets
  const locales = Object.keys(targets).filter((l) => !onlyLocales || onlyLocales.includes(l))

  const isLocal = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')
  const client = new pg.Client({
    connectionString: dbUrl,
    ssl: isLocal ? false : { rejectUnauthorized: false },
  })
  await client.connect()

  // Fail early and clearly rather than throwing 61 times.
  const { rows: exists } = await client.query(`SELECT to_regclass('public.translations') AS t`)
  if (!exists[0].t) {
    console.error(
      'load: the `translations` table is missing. Run:\n' +
        '  psql "$DATABASE_URL" -v ON_ERROR_STOP=1 --single-transaction \\\n' +
        '    -f scripts/sql/002_add_translation_cache.sql',
    )
    await client.end()
    process.exit(1)
  }

  let totalIn = 0
  let totalWritten = 0
  let totalProtected = 0

  for (const locale of locales) {
    const file = path.join(workDir, `translations.${locale}.jsonl`)
    if (!fs.existsSync(file)) {
      console.log(`  ${locale}: no file, skipped`)
      continue
    }

    const rows = fs
      .readFileSync(file, 'utf8')
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => JSON.parse(l))
      .filter((r) => r.text && r.translated)

    // Recompute the hash from the source rather than trusting the file: if the
    // Python side ever drifts from the JS normalisation, this catches it here
    // instead of producing a table full of entries nothing looks up.
    let mismatched = 0
    for (const r of rows) {
      const expected = sourceHash(r.text)
      if (r.hash && r.hash !== expected) mismatched++
      r.hash = expected
    }
    if (mismatched > 0) {
      console.warn(
        `  ${locale}: ! ${mismatched} hash mismatches (source normalisation differs between ` +
          `extract.mjs and indictrans2.py) — recomputed locally`,
      )
    }

    totalIn += rows.length
    if (dryRun) {
      console.log(`  ${locale}: ${rows.length} rows (dry run, nothing written)`)
      continue
    }

    // One statement, not one per row: unnest the arrays server-side.
    const res = await client.query(
      `INSERT INTO translations (source_hash, locale, source_text, translated_text, engine)
       SELECT * FROM unnest(
         $1::char(40)[], $2::varchar(8)[], $3::text[], $4::text[], $5::varchar(32)[]
       )
       ON CONFLICT (source_hash, locale) DO UPDATE
         SET translated_text = EXCLUDED.translated_text,
             engine          = EXCLUDED.engine,
             updated_at      = now()
         WHERE translations.is_override = false
       RETURNING 1`,
      [
        rows.map((r) => r.hash),
        rows.map(() => locale),
        rows.map((r) => r.text),
        rows.map((r) => r.translated),
        rows.map((r) => r.engine || 'indictrans2'),
      ],
    )

    const written = res.rowCount ?? 0
    const protectedRows = rows.length - written
    totalWritten += written
    totalProtected += protectedRows

    console.log(
      `  ${locale}: ${written} written` +
        (protectedRows > 0 ? `, ${protectedRows} left alone (human overrides)` : ''),
    )
  }

  if (!dryRun) {
    const { rows: summary } = await client.query(
      `SELECT locale,
              count(*)                                  AS total,
              count(*) FILTER (WHERE is_override)        AS overrides
         FROM translations
        GROUP BY locale
        ORDER BY locale`,
    )
    console.log('\nTranslation memory now holds:')
    for (const r of summary) {
      console.log(
        `  ${r.locale}: ${r.total} strings` + (Number(r.overrides) ? ` (${r.overrides} human)` : ''),
      )
    }
  }

  await client.end()
  console.log(
    `\n${totalIn} read, ${totalWritten} written` +
      (totalProtected ? `, ${totalProtected} protected` : '') +
      (dryRun ? ' (dry run)' : ''),
  )
}

main().catch((err) => {
  console.error('load failed:', err)
  process.exit(1)
})
