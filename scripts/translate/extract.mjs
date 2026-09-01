#!/usr/bin/env node
/**
 * Step 1 of the translation pipeline: collect every English string that needs
 * translating, straight out of Postgres.
 *
 *   node scripts/translate/extract.mjs
 *   -> scripts/translate/work/strings.json
 *
 * Reads the database directly rather than going through Payload, for two
 * reasons: the Payload CLI cannot run on Node 24 in this repo, and this way
 * extraction needs no dev server. Plain .mjs so there is no tsx involved.
 *
 * Deliberately slightly MORE permissive than the runtime rules in
 * src/lib/translation/translatable.ts. Extracting a string that is never looked
 * up costs a few characters of translation; missing one renders English on a
 * translated page. The asymmetry favours over-collecting.
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

/**
 * Tables holding publishable copy. Submitted data (contact_leads,
 * job_applications, consent_logs, partner_registrations, appointments) is
 * deliberately absent — it is user data, not site content, and must never be
 * shipped to a translation engine.
 */
const CONTENT_TABLES = [
  'services',
  'services_locales',
  'services_sub_services',
  'industries',
  'industries_locales',
  'site_settings',
  'site_settings_locales',
  'home_page',
  'home_page_locales',
  'home_page_stats',
  'home_page_stats_locales',
  'home_page_process_steps',
  'home_page_process_steps_locales',
  'home_page_hero_slides',
  'home_page_hero_slides_locales',
  'home_page_why_eyrie_items',
  'home_page_why_eyrie_items_locales',
  'home_page_why_eyrie_items_bullets',
  'home_page_why_eyrie_items_bullets_locales',
  'offices',
  'team_members',
  'jobs',
  'jobs_requirements',
  'jobs_responsibilities',
  'case_studies',
  'case_studies_results',
  'testimonials',
  'announcements',
  'recruitment_overview',
]

const BLOCKED_KEYS = new Set([
  'id', '_id', 'slug', 'url', 'link', 'href', 'src', 'email', 'phone', 'whatsapp',
  'filename', 'mime_type', 'filesize', 'width', 'height', 'order', '_order', 'code',
  'locale', '_locale', '_parent_id', 'created_at', 'updated_at', 'published_at',
  '_status', 'password', 'salt', 'hash', 'image_url', 'pan', 'aadhaar', 'ifsc', 'gstin',
])
const BLOCKED_SUFFIXES = ['_link', '_url', '_href', '_id', '_slug', '_at', '_email']

const URL_LIKE = /^(https?:\/\/|\/|mailto:|tel:|#)/i
const EMAIL_LIKE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ISO_DATE_LIKE = /^\d{4}-\d{2}-\d{2}/
const HAS_LETTER = /\p{L}/u

const keyAllowed = (k) => {
  const key = k.toLowerCase()
  if (BLOCKED_KEYS.has(key)) return false
  if (BLOCKED_SUFFIXES.some((s) => key.endsWith(s))) return false
  return true
}

const valueAllowed = (v) => {
  const s = String(v).trim()
  if (s.length < 2 || s.length > 5000) return false
  if (!HAS_LETTER.test(s)) return false
  if (URL_LIKE.test(s) || EMAIL_LIKE.test(s) || ISO_DATE_LIKE.test(s)) return false
  if (!s.includes(' ') && /^[a-z0-9_-]+$/.test(s)) return false
  return true
}

/** Pull the text leaves out of a Lexical rich-text tree. */
function collectLexical(node, out) {
  if (!node || typeof node !== 'object') return
  if (node.type === 'text' && typeof node.text === 'string' && valueAllowed(node.text)) {
    out.add(normalizeSource(node.text))
  }
  if (Array.isArray(node.children)) for (const c of node.children) collectLexical(c, out)
  if (node.root) collectLexical(node.root, out)
}

async function main() {
  const dbUrl =
    process.env.DATABASE_URL || process.env.DATABASE_URI || process.env.POSTGRES_URL || ''
  if (!dbUrl) {
    console.error('extract: no DATABASE_URL in the environment. Load .env first.')
    process.exit(1)
  }
  const isLocal = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')
  const client = new pg.Client({
    connectionString: dbUrl,
    ssl: isLocal ? false : { rejectUnauthorized: false },
  })
  await client.connect()

  const strings = new Set()
  const perTable = []

  for (const table of CONTENT_TABLES) {
    const { rows: cols } = await client.query(
      `SELECT column_name, data_type
         FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = $1`,
      [table],
    )
    if (cols.length === 0) continue // table absent on this deployment; fine

    const textCols = cols
      .filter((c) => ['text', 'character varying', 'jsonb'].includes(c.data_type))
      .filter((c) => keyAllowed(c.column_name))
      .map((c) => c.column_name)
    if (textCols.length === 0) continue

    // Localised tables hold one row per language; only English is the source.
    const hasLocale = cols.some((c) => c.column_name === '_locale')
    const select = textCols.map((c) => `"${c}"`).join(', ')
    const sql = hasLocale
      ? `SELECT ${select} FROM "${table}" WHERE _locale = 'en'`
      : `SELECT ${select} FROM "${table}"`

    let rows = []
    try {
      ;({ rows } = await client.query(sql))
    } catch (err) {
      console.warn(`  ! skipped ${table}: ${err.message}`)
      continue
    }

    const before = strings.size
    for (const row of rows) {
      for (const [col, val] of Object.entries(row)) {
        if (val == null) continue
        if (typeof val === 'object') {
          collectLexical(val, strings) // jsonb rich text
        } else if (typeof val === 'string' && valueAllowed(val)) {
          strings.add(normalizeSource(val))
        }
      }
    }
    const added = strings.size - before
    if (added > 0) perTable.push({ table, rows: rows.length, newStrings: added })
  }

  // Static UI copy already lives in dictionaries and is translated separately
  // (phase 04), so it is intentionally not collected here.

  await client.end()

  const items = [...strings]
    .sort()
    .map((text) => ({ hash: sourceHash(text), text, chars: text.length }))

  fs.mkdirSync(workDir, { recursive: true })
  const outFile = path.join(workDir, 'strings.json')
  fs.writeFileSync(outFile, JSON.stringify({ generatedAt: new Date().toISOString(), items }, null, 2))

  const chars = items.reduce((n, i) => n + i.chars, 0)
  console.log('\nExtracted from:')
  for (const t of perTable) console.log(`  ${String(t.newStrings).padStart(4)}  ${t.table} (${t.rows} rows)`)
  console.log(`\n  ${items.length} unique strings, ${chars.toLocaleString()} characters`)
  console.log(`  ~${(chars * 8).toLocaleString()} characters across 8 languages`)
  console.log(`  -> ${path.relative(process.cwd(), outFile)}\n`)
}

main().catch((err) => {
  console.error('extract failed:', err)
  process.exit(1)
})
