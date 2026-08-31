'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { locales, splitLocaleFromPath, localizePath, type Locale } from '@/i18n/config'

/**
 * Header language selector.
 *
 * Deliberately a native <select>: it is keyboard- and screen-reader-accessible
 * for free, renders the platform picker on mobile, and needs no JS to be
 * announced correctly. Switching keeps the visitor on the same page — it swaps
 * only the locale prefix, so /services becomes /kn/services rather than
 * dumping the user back on the homepage.
 */
export default function LanguageSwitcher({
  locale,
  label = 'Select Language',
}: {
  locale: Locale
  label?: string
}) {
  const router = useRouter()
  const pathname = usePathname()

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as Locale
    // usePathname() returns the rewritten path, which may or may not carry a
    // locale prefix depending on how the request was routed — strip whatever
    // is there before re-applying the new one.
    const { path } = splitLocaleFromPath(pathname || '/')
    router.push(localizePath(path, next))
    router.refresh()
  }

  return (
    <div className="language-switcher">
      <label className="sr-only" htmlFor="site-language-select">
        {label}
      </label>
      <select
        id="site-language-select"
        className="language-switcher__select"
        value={locale}
        onChange={onChange}
        aria-label={label}
      >
        {locales.map((l) => (
          <option key={l.code} value={l.code}>
            {l.nativeLabel}
          </option>
        ))}
      </select>
    </div>
  )
}
