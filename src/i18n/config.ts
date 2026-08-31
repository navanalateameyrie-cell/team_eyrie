/**
 * Central locale configuration.
 *
 * Adding a language is a three-step change:
 *   1. add an entry to `locales` below,
 *   2. add the matching code to `localization.locales` in payload.config.ts,
 *   3. create src/i18n/dictionaries/<code>.json (copy en.json and translate).
 */

export type Locale = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'ml' | 'mr' | 'bn' | 'gu'

export type LocaleMeta = {
  code: Locale
  /** English name, used in admin and aria labels. */
  label: string
  /** Endonym — what speakers call the language. Shown in the switcher. */
  nativeLabel: string
}

export const locales: LocaleMeta[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી' },
]

export const localeCodes = locales.map((l) => l.code) as Locale[]

export const defaultLocale: Locale = 'en'

/**
 * BCP 47 tags for <html lang> and hreflang. All nine locales are LTR, so no
 * `dir` handling is needed; add it here if an RTL language is ever introduced.
 */
export const htmlLang: Record<Locale, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  mr: 'mr-IN',
  bn: 'bn-IN',
  gu: 'gu-IN',
}

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (localeCodes as string[]).includes(value)
}

export function getLocaleMeta(code: Locale): LocaleMeta {
  return locales.find((l) => l.code === code) || locales[0]
}

/**
 * Build the public URL for a path in a given locale.
 *
 * The default locale is served without a prefix so every existing English URL
 * keeps working unchanged (`/services`, not `/en/services`). Other locales are
 * prefixed (`/kn/services`). See src/middleware.ts for the rewrite that maps
 * unprefixed requests onto the [locale] route tree.
 */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}

/**
 * Inverse of localizePath: strip any locale prefix off a pathname.
 * Returns the locale that was found (defaultLocale if unprefixed) and the
 * remaining path, always starting with '/'.
 */
export function splitLocaleFromPath(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]
  if (isLocale(first)) {
    const rest = '/' + segments.slice(1).join('/')
    return { locale: first, path: rest === '/' ? '/' : rest.replace(/\/$/, '') }
  }
  return { locale: defaultLocale, path: pathname || '/' }
}
