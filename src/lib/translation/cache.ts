// NOTE: server-only module. It opens a Postgres pool and must never be pulled
// into a client bundle. The `server-only` package isn't installed here, so this
// is enforced by convention: import it exclusively from Server Components,
// route handlers and scripts.
import { Pool } from 'pg'

import { defaultLocale, type Locale } from '@/i18n/config'
import { sourceHash } from './hash'

/**
 * Read side of the translation memory.
 *
 * This module NEVER calls a translation API. Translations are produced offline
 * by scripts/translate/ and loaded into the `translations` table; rendering
 * only looks them up. A missing entry renders the English source, so the site
 * degrades to English rather than erroring or blocking on a network call.
 */

const dbUrl =
  process.env.DATABASE_URL || process.env.DATABASE_URI || process.env.POSTGRES_URL || ''

const isLocalDb = !dbUrl || dbUrl.includes('127.0.0.1') || dbUrl.includes('localhost')

/**
 * A small pool of our own rather than borrowing Payload's. Kept deliberately
 * tiny: on serverless every concurrent render holds a connection, and Postgres
 * connection limits are the usual way this kind of layer takes a site down.
 */
declare global {
  // eslint-disable-next-line no-var
  var __translationPool: Pool | undefined
}

function getPool(): Pool | null {
  if (!dbUrl) return null
  if (!global.__translationPool) {
    global.__translationPool = new Pool({
      connectionString: dbUrl,
      ssl: isLocalDb ? false : { rejectUnauthorized: false },
      max: 3,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    })
    // A pool-level error listener is required; without one an idle client
    // error takes down the whole process.
    global.__translationPool.on('error', () => {})
  }
  return global.__translationPool
}

/**
 * Per-process memo. A single page render asks for the same strings repeatedly
 * (nav labels, repeated service names), and a build renders every page in nine
 * languages, so this saves a large number of round trips.
 */
const memo = new Map<string, string>()
const memoKey = (locale: Locale, hash: string) => `${locale}:${hash}`

/**
 * Look up many source strings at once.
 *
 * Returns a Map keyed by the ORIGINAL source string (not its hash) so callers
 * never deal with hashing. Sources with no translation are simply absent —
 * callers fall back to the English they already hold.
 */
export async function lookupTranslations(
  sources: string[],
  locale: Locale,
): Promise<Map<string, string>> {
  const out = new Map<string, string>()
  if (locale === defaultLocale || sources.length === 0) return out

  const unique = [...new Set(sources)]
  const hashBySource = new Map<string, string>()
  const misses: string[] = []

  for (const src of unique) {
    const h = sourceHash(src)
    hashBySource.set(src, h)
    const memoed = memo.get(memoKey(locale, h))
    if (memoed !== undefined) {
      out.set(src, memoed)
    } else {
      misses.push(h)
    }
  }

  if (misses.length === 0) return out

  const pool = getPool()
  if (!pool) return out

  try {
    const { rows } = await pool.query<{ source_hash: string; translated_text: string }>(
      `SELECT source_hash, translated_text
         FROM translations
        WHERE locale = $1 AND source_hash = ANY($2::char(40)[])`,
      [locale, misses],
    )

    const byHash = new Map(rows.map((r) => [r.source_hash, r.translated_text]))
    for (const [src, h] of hashBySource) {
      const hit = byHash.get(h)
      if (hit !== undefined) {
        memo.set(memoKey(locale, h), hit)
        out.set(src, hit)
      }
    }
  } catch (err) {
    // A translation-memory failure must never take a page down. Log once and
    // let every caller fall back to English.
    console.warn(
      '[translation] lookup failed, rendering source language:',
      err instanceof Error ? err.message : err,
    )
  }

  return out
}

/** Convenience for a single string. Prefer the batch form in render paths. */
export async function translateOne(source: string, locale: Locale): Promise<string> {
  const map = await lookupTranslations([source], locale)
  return map.get(source) ?? source
}
