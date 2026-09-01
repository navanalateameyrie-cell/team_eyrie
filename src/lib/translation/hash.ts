import { createHash } from 'crypto'

/**
 * Normalise a source string before hashing.
 *
 * Trailing whitespace and line wrapping differ between the CMS editor and the
 * rendered markup for what is really the same sentence; without normalisation
 * those would become separate cache entries and get translated twice.
 *
 * IMPORTANT: scripts/translate/extract.mjs and scripts/translate/load.mjs
 * duplicate this function. The three must stay byte-identical or lookups miss
 * silently — a miss just renders English, so it fails quietly rather than
 * loudly. Change all three together.
 */
export function normalizeSource(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

/** sha256 of the normalised source, truncated to 40 hex chars (see the table). */
export function sourceHash(text: string): string {
  return createHash('sha256').update(normalizeSource(text), 'utf8').digest('hex').slice(0, 40)
}
