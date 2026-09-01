import { defaultLocale, isLocale, type Locale } from '@/i18n/config'

/**
 * Read the locale out of a page's route params, falling back to the default
 * for any value that isn't a configured locale. Every public page sits under
 * app/(frontend)/[locale]/, so `params` always carries a `locale` key.
 */
export async function resolveLocale(
  params?: Promise<{ locale?: string }> | { locale?: string },
): Promise<Locale> {
  if (!params) return defaultLocale
  const resolved = await params
  return isLocale(resolved?.locale) ? resolved.locale : defaultLocale
}

/**
 * Spread into any payload.find / findByID / findGlobal call to fetch the
 * SOURCE (English) copy.
 *
 * Translation does not happen in the CMS. Content is authored once in English
 * and translated by the server-side layer in src/lib/translation/, so every
 * query asks for English and the result is passed through localizeDocs():
 *
 *   const { docs } = await payload.find({ collection: 'services', ...sourceQuery() })
 *   const services = await localizeDocs(docs, locale)
 *
 * Editors therefore never touch a locale switcher, and a collection added
 * later is covered without changing its schema.
 */
export function sourceQuery() {
  return { locale: defaultLocale, fallbackLocale: defaultLocale } as const
}

/**
 * Fetch content in the active language using Payload's own per-locale storage.
 *
 * Retained for the case where a document really is authored per language in
 * the admin. The site does not use this path — prefer sourceQuery() +
 * localizeDocs() so translations come from the translation memory.
 */
export function localeQuery(locale: Locale) {
  return { locale, fallbackLocale: defaultLocale } as const
}
