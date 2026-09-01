import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import './globals.css'
import CookieConsent from '@/components/CookieConsent'
import AccessibilityWidget from '@/components/accessibility'
import ScrollReveal from '@/components/ScrollReveal'
import SmoothScroll from '@/components/SmoothScroll'
import { SiteHeaderServer, SiteFooter } from '@/components/SiteChrome'
import { htmlLang, isLocale, localeCodes, defaultLocale, localizePath } from '@/i18n/config'

/**
 * This is the root layout for the public site. It lives under [locale] so it
 * can set <html lang> from the requested language; requests without a locale
 * prefix are rewritten to the default locale by src/middleware.ts, which keeps
 * every existing English URL (/services, /about, …) working unchanged.
 */

export function generateStaticParams() {
  return localeCodes.map((locale) => ({ locale }))
}

// Base URL for canonical + hreflang tags. Set NEXT_PUBLIC_SERVER_URL in the
// deployment environment; the literal is only a last-resort fallback so a
// misconfigured build still emits absolute (not relative) alternate links.
const siteUrl = (
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://te1-steel.vercel.app')
).replace(/\/$/, '')

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale

  // hreflang alternates so each language version is discoverable and search
  // engines don't treat them as duplicates of the English page.
  const languages: Record<string, string> = {}
  for (const code of localeCodes) {
    languages[htmlLang[code]] = `${siteUrl}${localizePath('/', code)}`
  }
  languages['x-default'] = siteUrl

  return {
    metadataBase: new URL(siteUrl),
    title: 'Team Eyrie — India’s Integrated Professional Services Network',
    description:
      'Team Eyrie is a premier multidisciplinary professional services network delivering integrated solutions across taxation, assurance, regulatory compliance, corporate advisory, transaction services, and strategic consulting.',
    alternates: {
      canonical: `${siteUrl}${localizePath('/', locale)}`,
      languages,
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html lang={htmlLang[locale]} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SmoothScroll />
        <ScrollReveal />
        <SiteHeaderServer locale={locale} />
        {children}
        <SiteFooter locale={locale} />
        <CookieConsent />
        <AccessibilityWidget position="bottom-left" />
      </body>
    </html>
  )
}
