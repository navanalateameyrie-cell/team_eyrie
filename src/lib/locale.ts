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
 * Spread into any payload.find / findByID / findGlobal call to fetch content in
 * the active language, falling back to the default locale for fields that have
 * not been translated yet.
 *
 *   const docs = await payload.find({ collection: 'services', ...localeQuery(locale) })
 */
export function localeQuery(locale: Locale) {
  return { locale, fallbackLocale: defaultLocale } as const
}
