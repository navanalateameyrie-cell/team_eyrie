'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

import TeamEyrieCaLogo from '@/components/ui/TeamEyrieCaLogo'

type ServiceLink = { title: string; slug: string; summary?: string | null }
type ContactInfo = { email?: string | null; phone?: string | null }

const topNavItems = [
  { label: 'Our Team', href: '/people' },
  { label: 'News and Articles', href: '/insights' },
  { label: 'Documentation Suite', href: 'https://apps.teameyrie.com/', external: true },
  { label: 'Careers', href: '/careers' },
  { label: 'LMS Login', href: 'https://web.classplusapp.com/login', external: true },
]

const mainNavItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Why Team Eyrie', href: '/why-team-eyrie' },
  { label: 'Our Presence', href: '/presence' },
  { label: 'Contact Us', href: '/contact' },
]

export default function SiteHeader({
  orgName,
  services,
  contact,
  logoUrl,
}: {
  orgName?: string
  services?: ServiceLink[]
  contact?: ContactInfo
  logoUrl?: string | null
}) {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const close = () => setOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const email = contact?.email || 'contact@balakrishnaandco.com'
  const phone = contact?.phone || '8618259712 / 9845721255'

  const isLinkActive = (target: string) => {
    if (!pathname) return false
    if (target === '/') {
      return pathname === '/'
    }
    return pathname === target || pathname.startsWith(target + '/')
  }

  const isHomePage = pathname === '/'

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''} ${!isHomePage ? 'site-header--solid' : ''}`}>
      {/* Top Contact & Quick Nav Bar */}
      <div className="site-header__top">
        <div className="container site-header__top-inner">
          <div className="top-bar__contact">
            <a href={`mailto:${email}`} className="top-bar__link" aria-label="Email Us">
              <svg
                className="top-bar__icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#123B6D"
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

            <a href={`tel:${phone.split('/')[0].trim()}`} className="top-bar__link" aria-label="Call Us">
              <svg
                className="top-bar__icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#123B6D"
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
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className={`top-bar__nav-link ${isLinkActive(item.href) ? 'top-bar__nav-link--active' : ''}`}
                >
                  {item.label}
                  {item.external && <span style={{ fontSize: 11, marginLeft: 3 }}>↗</span>}
                </a>
              </React.Fragment>
            ))}
            <a
              href="/login"
              className="top-bar__login-btn"
              style={{
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(135deg, #f26522 0%, #ea580c 100%)',
                color: '#ffffff',
                padding: '5px 16px',
                borderRadius: '6px',
                fontWeight: '700',
                fontSize: '12.5px',
                letterSpacing: '0.3px',
                marginLeft: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(242, 101, 34, 0.4)',
              }}
            >
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Row: Logo on Left + Navigation Menu on Right */}
      <div className="site-header__brand-row">
        <div className="container site-header__brand-inner">
          <a href="/" className="brand-logo-link" onClick={close} title="Team Eyrie - Chartered Accountants">
            <TeamEyrieCaLogo height={34} customLogoUrl={logoUrl} />
          </a>

          {/* Mobile Right Controls: Login + Hamburger */}
          <div className="site-header__mobile-controls">
            <a
              href="/login"
              className="site-header__mobile-login"
            >
              Login
            </a>
            <button
              className="hamburger"
              aria-label="Toggle Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? '✕' : '☰'}
            </button>
          </div>

          {/* Main Navigation Menu */}
          <nav className={`main-menu ${open ? 'main-menu--open' : ''}`}>
            <div className="main-menu__inner">
              {mainNavItems.map((item, idx) => {
                const active = isLinkActive(item.href)
                return (
                  <React.Fragment key={item.label}>
                    {idx > 0 && <span className="main-menu__pipe">|</span>}
                    <div className="main-menu__item-wrapper">
                      <a
                        href={item.href}
                        onClick={close}
                        className={`main-menu__link ${active ? 'main-menu__link--active' : ''}`}
                      >
                        {item.label}
                      </a>
                    </div>
                  </React.Fragment>
                )
              })}

              {/* Mobile Drawer Quick Links & Contact Section */}
              <div className="main-menu__mobile-section">
                <div className="main-menu__mobile-divider" />
                <div className="main-menu__mobile-title">Quick Links</div>
                <div className="main-menu__mobile-grid">
                  {topNavItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      onClick={close}
                      className="main-menu__mobile-sublink"
                    >
                      {item.label}
                      {item.external && ' ↗'}
                    </a>
                  ))}
                </div>

                <div className="main-menu__mobile-contact-box">
                  <a href={`mailto:${email}`} className="main-menu__mobile-contact-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#123B6D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>{email}</span>
                  </a>
                  <a href={`tel:${phone.split('/')[0].trim()}`} className="main-menu__mobile-contact-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#123B6D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
