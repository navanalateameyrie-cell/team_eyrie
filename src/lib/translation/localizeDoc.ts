import { defaultLocale, type Locale } from '@/i18n/config'
import { lookupTranslations } from './cache'
import { isTranslatableKey, isTranslatableValue } from './translatable'

/**
 * Phase 2: translate CMS content in the data layer.
 *
 * Payload documents are fetched in English and passed through here on the way
 * to the page. Nothing is authored per-language in the CMS — the translation
 * comes from the translation memory built offline.
 *
 * Because this walks the document generically rather than naming fields, any
 * collection added later is covered automatically, including content an editor
 * creates through the portal tomorrow.
 *
 * Usage:
 *   const { docs } = await payload.find({ collection: 'services', locale: 'en' })
 *   const services = await localizeDocs(docs, locale)
 */

/** Lexical rich text: a nested tree whose leaves are { type: 'text', text }. */
type LexicalNode = { type?: string; text?: string; children?: LexicalNode[]; [k: string]: unknown }

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function looksLikeLexical(v: unknown): boolean {
  return isPlainObject(v) && isPlainObject((v as Record<string, unknown>).root)
}

/** Collect every translatable string in a lexical tree. */
function collectLexical(node: LexicalNode | undefined, out: string[]): void {
  if (!node || typeof node !== 'object') return
  if (node.type === 'text' && typeof node.text === 'string' && isTranslatableValue(node.text)) {
    out.push(node.text)
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) collectLexical(child, out)
  }
}

/** Rebuild a lexical tree with translated leaves. Structure is preserved. */
function mapLexical(node: LexicalNode, table: Map<string, string>): LexicalNode {
  const next: LexicalNode = { ...node }
  if (next.type === 'text' && typeof next.text === 'string') {
    const hit = table.get(next.text)
    if (hit !== undefined) next.text = hit
  }
  if (Array.isArray(next.children)) {
    next.children = next.children.map((c) => mapLexical(c, table))
  }
  return next
}

/** Walk any value, gathering translatable strings. */
function collect(value: unknown, key: string | null, out: string[]): void {
  if (typeof value === 'string') {
    if (key !== null && !isTranslatableKey(key)) return
    if (isTranslatableValue(value)) out.push(value)
    return
  }
  if (Array.isArray(value)) {
    for (const item of value) collect(item, key, out)
    return
  }
  if (looksLikeLexical(value)) {
    collectLexical((value as { root: LexicalNode }).root, out)
    return
  }
  if (isPlainObject(value)) {
    for (const [k, v] of Object.entries(value)) {
      if (!isTranslatableKey(k)) continue
      collect(v, k, out)
    }
  }
}

/** Walk any value again, substituting translations. Returns a new structure. */
function apply<T>(value: T, key: string | null, table: Map<string, string>): T {
  if (typeof value === 'string') {
    if (key !== null && !isTranslatableKey(key)) return value
    const hit = table.get(value)
    return (hit === undefined ? value : hit) as unknown as T
  }
  if (Array.isArray(value)) {
    return value.map((item) => apply(item, key, table)) as unknown as T
  }
  if (looksLikeLexical(value)) {
    const v = value as unknown as { root: LexicalNode }
    return { ...v, root: mapLexical(v.root, table) } as unknown as T
  }
  if (isPlainObject(value)) {
    const next: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) {
      next[k] = isTranslatableKey(k) ? apply(v, k, table) : v
    }
    return next as unknown as T
  }
  return value
}

/**
 * Translate one document. Returns the input untouched for the default locale,
 * and falls back to English for any string with no entry in the memory.
 */
export async function localizeDoc<T>(doc: T, locale: Locale): Promise<T> {
  if (locale === defaultLocale || doc == null) return doc
  const [result] = await localizeDocs([doc], locale)
  return result
}

/**
 * Translate many documents in ONE round trip.
 *
 * Always prefer this over mapping localizeDoc across a list: a services listing
 * would otherwise issue one query per card.
 */
export async function localizeDocs<T>(docs: T[], locale: Locale): Promise<T[]> {
  if (locale === defaultLocale || !Array.isArray(docs) || docs.length === 0) return docs

  const sources: string[] = []
  for (const doc of docs) collect(doc, null, sources)
  if (sources.length === 0) return docs

  const table = await lookupTranslations(sources, locale)
  if (table.size === 0) return docs

  return docs.map((doc) => apply(doc, null, table))
}

/**
 * Translate loose strings that aren't part of a document — a page heading held
 * in a variable, a computed label. Preserves order and falls back per item.
 */
export async function localizeStrings(values: string[], locale: Locale): Promise<string[]> {
  if (locale === defaultLocale || values.length === 0) return values
  const table = await lookupTranslations(values.filter(isTranslatableValue), locale)
  return values.map((v) => table.get(v) ?? v)
}
