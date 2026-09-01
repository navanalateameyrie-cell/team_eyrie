/**
 * Rules for deciding which values in a Payload document are prose worth
 * translating, and which are identifiers that must survive untouched.
 *
 * Getting this wrong is not cosmetic: translating a slug breaks routing,
 * translating an email address breaks contact forms, and translating a CTA
 * link breaks navigation. The default is therefore to REFUSE, and only allow
 * values that look like sentences.
 */

/**
 * Field names that never hold prose. Matched case-insensitively against the
 * whole key, plus a few suffix rules below.
 */
const BLOCKED_KEYS = new Set([
  'id',
  '_id',
  'slug',
  'url',
  'link',
  'href',
  'src',
  'email',
  'phone',
  'whatsapp',
  'filename',
  'mimetype',
  'filesize',
  'width',
  'height',
  'order',
  '_order',
  'code',
  'locale',
  '_locale',
  '_parent_id',
  'createdat',
  'updatedat',
  'publishedat',
  '_status',
  'password',
  'salt',
  'hash',
  'imageurl',
  'value',
  'pan',
  'aadhaar',
  'ifsc',
  'gstin',
])

/** Suffixes that mark a field as a target rather than a label. */
const BLOCKED_SUFFIXES = ['link', 'url', 'href', 'id', 'slug', 'at', 'email']

export function isTranslatableKey(key: string): boolean {
  const k = key.toLowerCase()
  if (BLOCKED_KEYS.has(k)) return false
  // `ctaLink` is a target; `ctaLabel` is prose. Suffix rules separate them.
  if (BLOCKED_SUFFIXES.some((s) => k.endsWith(s) && k !== 'label')) return false
  return true
}

const URL_LIKE = /^(https?:\/\/|\/|mailto:|tel:|#)/i
const EMAIL_LIKE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ISO_DATE_LIKE = /^\d{4}-\d{2}-\d{2}/
const HAS_LETTER = /\p{L}/u

/**
 * Does this string look like human prose?
 *
 * Deliberately conservative. A value that slips through untranslated renders
 * in English, which is recoverable; a slug or URL that gets translated breaks
 * the page, which is not.
 */
export function isTranslatableValue(value: string): boolean {
  const v = value.trim()
  if (v.length < 2) return false
  if (!HAS_LETTER.test(v)) return false // pure numbers, punctuation, emoji
  if (URL_LIKE.test(v)) return false
  if (EMAIL_LIKE.test(v)) return false
  if (ISO_DATE_LIKE.test(v)) return false
  // A single lowercase token with no spaces is almost always an enum value or
  // a slug fragment ('super_admin', 'assurance-audit'), not a sentence.
  if (!v.includes(' ') && /^[a-z0-9_-]+$/.test(v)) return false
  return true
}

import glossary from '@/i18n/glossary.json'

/**
 * Terms that must appear verbatim in every language. Statutory and
 * professional vocabulary loses its meaning — and its legal precision — if a
 * translation engine renders it phonetically or paraphrases it.
 *
 * The batch translator masks these before sending and restores them after, so
 * they are never handed to the model at all. Defined in src/i18n/glossary.json
 * because scripts/translate/indictrans2.py reads the same file.
 */
export const DO_NOT_TRANSLATE: string[] = glossary.doNotTranslate
