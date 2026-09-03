import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import CookieConsent from '@/components/CookieConsent'
import AccessibilityWidget from '@/components/accessibility'
import ScrollReveal from '@/components/ScrollReveal'
import SmoothScroll from '@/components/SmoothScroll'
import { SiteHeaderServer, SiteFooter } from '@/components/SiteChrome'
import Chatbot from '@/components/Chatbot'

const siteUrl = (
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://te1-steel.vercel.app')
).replace(/\/$/, '')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Team Eyrie — India’s Integrated Professional Services Network',
  description:
    'Team Eyrie is a premier multidisciplinary professional services network delivering integrated solutions across taxation, assurance, regulatory compliance, corporate advisory, transaction services, and strategic consulting.',
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SmoothScroll />
        <ScrollReveal />
        <SiteHeaderServer />
        {children}
        <SiteFooter />
        <CookieConsent />
        <AccessibilityWidget position="bottom-left" />
        <Chatbot />
      </body>
    </html>
  )
}
