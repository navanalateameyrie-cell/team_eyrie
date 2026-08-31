'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'

import TeamEyrieCaLogo from './TeamEyrieCaLogo'
import LanguageSwitcher from './LanguageSwitcher'
import { defaultLocale, localizePath, splitLocaleFromPath, type Locale } from '@/i18n/config'
import { getDictionary, type Dictionary } from '@/i18n/getDictionary'

type ServiceLink = { title: string; slug: string; summary?: string | null }
type ContactInfo = { email?: string | null; phone?: string | null }

export default function SiteHeader({
  orgName,
  services,
  contact,
  logoUrl,
  locale = defaultLocale,
  dict,
}: {
  orgName?: string
  services?: ServiceLink[]
  contact?: ContactInfo
  logoUrl?: string | null
  locale?: Locale
  dict?: Dictionary
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const close = () => setOpen(false)
  const t = dict || getDictionary(locale)

  const email = contact?.email || 'contact@balakrishnaandco.com'
  const phone = contact?.phone || '8618259712 / 9845721255'

  /** Every in-site link carries the current locale prefix. */
  const href = (path: string) => localizePath(path, locale)

  const topNavItems = [
    { label: t.topbar.ourTeam, href: '/people' },
    { label: t.topbar.news, href: '/insights' },
    { label: t.topbar.career, href: '/careers' },
    { label: t.topbar.lms, href: '/services' },
  ]

  const mainNavItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.services, href: '/services' },
    { label: t.nav.industries, href: '/industries' },
    { label: t.nav.why, href: '/why-team-eyrie' },
    { label: t.nav.presence, href: '/presence' },
    { label: t.nav.contact, href: '/contact' },
  ]

  const isLinkActive = (target: string) => {
    if (!pathname) return false
    // Compare locale-stripped paths so /kn/services still highlights Services.
    const { path } = splitLocaleFromPath(pathname)
    if (target === '/') {
      return path === '/'
    }
    return path === target || path.startsWith(target + '/')
  }

  return (
    <header className="site-header">
      {/* Top Contact & Quick Nav Bar */}
      <div className="site-header__top">
        <div className="container site-header__top-inner">
          <div className="top-bar__contact">
            <a href={`mailto:${email}`} className="top-bar__link" aria-label={t.topbar.emailUs}>
              <svg
                className="top-bar__icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e66a2b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: '15px', height: '15px', minWidth: '15px', minHeight: '15px', flexShrink: 0 }}
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>{email}</span>
            </a>

            <a href={`tel:${phone.split('/')[0].trim()}`} className="top-bar__link" aria-label={t.topbar.callUs}>
              <svg
                className="top-bar__icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e66a2b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: '15px', height: '15px', minWidth: '15px', minHeight: '15px', flexShrink: 0 }}
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{phone}</span>
            </a>
          </div>

          <div className="top-bar__nav">
            {topNavItems.map((item, idx) => (
              <React.Fragment key={item.label}>
                {idx > 0 && <span className="top-bar__pipe">|</span>}
                <a
                  href={href(item.href)}
                  className={`top-bar__nav-link ${isLinkActive(item.href) ? 'top-bar__nav-link--active' : ''}`}
                >
                  {item.label}
                </a>
              </React.Fragment>
            ))}
            <span className="top-bar__pipe">|</span>
            <LanguageSwitcher locale={locale} label={t.common.selectLanguage} />
            <a
              href={href('/login')}
              className="top-bar__nav-link"
              style={{
                background: '#e66a2b',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: '4px',
                fontWeight: '600',
                marginLeft: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
            >
              {t.topbar.login}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Row: Logo on Left + Navigation Menu on Right */}
      <div className="site-header__brand-row">
        <div className="container site-header__brand-inner">
          <a href={href('/')} className="brand-logo-link" onClick={close} title="Team Eyrie - Chartered Accountants">
            <TeamEyrieCaLogo height={52} customLogoUrl={logoUrl} />
          </a>

          {/* Main Navigation Menu placed to the right of the logo */}
          <nav className={`main-menu ${open ? 'main-menu--open' : ''}`}>
            <div className="main-menu__inner">
              {mainNavItems.map((item, idx) => {
                const active = isLinkActive(item.href)
                return (
                  <React.Fragment key={item.label}>
                    {idx > 0 && <span className="main-menu__pipe">|</span>}
                    <div className="main-menu__item-wrapper">
                      <a
                        href={href(item.href)}
                        onClick={close}
                        className={`main-menu__link ${active ? 'main-menu__link--active' : ''}`}
                      >
                        {item.label}
                      </a>
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </nav>

          <button
            className="hamburger"
            aria-label={t.common.toggleMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}
