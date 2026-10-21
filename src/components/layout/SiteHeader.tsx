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
  // { label: 'Knowledge Bank', href: '/knowledge-bank' }, // Hidden as requested by client
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/contact' },
]

// Categorized Sub-Menu Directory (Tax, Corporate, Salary, Loans, RERA, Bulletins, Utilities)
const KNOWLEDGE_BANK_CATEGORIES = [
  {
    id: 'tax',
    label: 'GST & Taxation Menu',
    countBadge: '5 Calculators',
    desc: 'GST calculator, reverse MRP, rate split, income tax slabs & TDS',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="16" y1="14" x2="16" y2="18" />
        <line x1="8" y1="14" x2="12" y2="14" />
        <line x1="8" y1="18" x2="12" y2="18" />
      </svg>
    ),
    items: [
      { label: 'GST Calculator', href: '/knowledge-bank?tab=calculators&tool=gst', badge: 'Dual Forward & MRP' },
      { label: 'GST MRP Calculator', href: '/knowledge-bank?tab=calculators&tool=gst-mrp', badge: 'Reverse MRP' },
      { label: 'GST Rate Calculator', href: '/knowledge-bank?tab=calculators&tool=gst-rate', badge: 'Rate Split' },
      { label: 'Income Tax Calculator', href: '/knowledge-bank?tab=calculators&tool=income-tax', badge: 'Old vs New 115BAC' },
      { label: 'TDS / TCS Calculator', href: '/knowledge-bank?tab=calculators&tool=tds', badge: 'Ch. XVII-B' },
    ],
  },
  {
    id: 'corporate',
    label: 'Corporate Law & Business',
    countBadge: '3 Calculators',
    desc: 'Companies Act 2013 Net Profit, Net Worth & Schedule V',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" />
      </svg>
    ),
    items: [
      { label: 'Calculate Net Profit', href: '/knowledge-bank?tab=calculators&tool=net-profit', badge: 'Sec 198' },
      { label: 'Calculate Net Worth', href: '/knowledge-bank?tab=calculators&tool=corporate', badge: 'Sec 2(57)' },
      { label: 'Effective Capital', href: '/knowledge-bank?tab=calculators&tool=effective-capital', badge: 'Schedule V' },
    ],
  },
  {
    id: 'salary',
    label: 'Salary & Investments',
    countBadge: '2 Calculators',
    desc: 'HRA tax exemption & NSC compound interest growth',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>
    ),
    items: [
      { label: 'HRA Calculator', href: '/knowledge-bank?tab=calculators&tool=hra', badge: 'Sec 10(13A)' },
      { label: 'NSC Calculator', href: '/knowledge-bank?tab=calculators&tool=nsc', badge: 'Sec 80C' },
    ],
  },
  {
    id: 'banking',
    label: 'Loans & Banking Menu',
    countBadge: '4 Calculators',
    desc: 'Retail amortizations, home mortgages, auto finance & tenure solver',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="21" x2="21" y2="21" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <polygon points="12 3 2 10 22 10 12 3" />
        <line x1="6" y1="10" x2="6" y2="21" />
        <line x1="10" y1="10" x2="10" y2="21" />
        <line x1="14" y1="10" x2="14" y2="21" />
        <line x1="18" y1="10" x2="18" y2="21" />
      </svg>
    ),
    items: [
      { label: 'EMI Calculator', href: '/knowledge-bank?tab=calculators&tool=emi', badge: 'Banking' },
      { label: 'Home Loan Calculator', href: '/knowledge-bank?tab=calculators&tool=home-loan', badge: 'Sec 24b / 80C' },
      { label: 'Auto Loan Calculator', href: '/knowledge-bank?tab=calculators&tool=auto-loan', badge: 'Vehicle Finance' },
      { label: 'Number of Instalments', href: '/knowledge-bank?tab=calculators&tool=tenure', badge: 'Payoff Solver' },
    ],
  },
  {
    id: 'rera',
    label: 'Real Estate & RERA Menu',
    countBadge: '3 Calculators',
    desc: '70% separate escrow account withdrawal, delay interest & refund',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    items: [
      { label: 'RERA 70% Withdrawal', href: '/knowledge-bank?tab=calculators&tool=rera-withdrawal', badge: 'Sec 4(2)(l)(D)' },
      { label: 'RERA Delay Interest', href: '/knowledge-bank?tab=calculators&tool=rera-delay', badge: 'Sec 18 Delay' },
      { label: 'RERA Homebuyer Refund', href: '/knowledge-bank?tab=calculators&tool=rera-refund', badge: 'Sec 18 Refund' },
    ],
  },
  {
    id: 'bulletins',
    label: 'Professional Bulletins',
    countBadge: '9 Practice Areas',
    desc: 'Official circulars, MCA gazettes, RBI master directions & SEBI LODR',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" />
        <path d="M15 18h-5" />
        <path d="M10 6h8v4h-8V6Z" />
      </svg>
    ),
    items: [
      { label: 'Income Tax Circulars', href: '/knowledge-bank?tab=bulletins', badge: 'CBDT' },
      { label: 'GST & Customs Gazettes', href: '/knowledge-bank?tab=bulletins', badge: 'CBIC' },
      { label: 'RBI & Banking Master Directions', href: '/knowledge-bank?tab=bulletins', badge: 'RBI' },
      { label: 'Companies Act & MCA Updates', href: '/knowledge-bank?tab=bulletins', badge: 'MCA' },
      { label: 'SEBI (LODR) Regulations', href: '/knowledge-bank?tab=bulletins', badge: 'SEBI' },
      { label: 'FEMA & Trade Reporting', href: '/knowledge-bank?tab=bulletins', badge: 'FEMA' },
      { label: 'Accounting Standards (Ind AS)', href: '/knowledge-bank?tab=bulletins', badge: 'ICAI' },
      { label: 'Labour Laws & EPFO Circulars', href: '/knowledge-bank?tab=bulletins', badge: 'EPFO' },
      { label: 'State Tax & Profession Tax', href: '/knowledge-bank?tab=bulletins', badge: 'State Tax' },
    ],
  },
  {
    id: 'utilities',
    label: 'Statutory Utilities & Rates',
    countBadge: '9 Reference Schedules',
    desc: 'Tax slabs, TDS charts, GST directory, CII index, depreciation & stamp duty',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    items: [
      { label: 'Income Tax Slab Rates', href: '/knowledge-bank?tab=utilities&tool=income-tax-rates', badge: '115BAC' },
      { label: 'TDS & TCS Rate Chart', href: '/knowledge-bank?tab=utilities&tool=tds-rates', badge: 'Rates' },
      { label: 'GST Rates & HSN Directory', href: '/knowledge-bank?tab=utilities&tool=gst-rates', badge: '0% - 28%' },
      { label: 'Cost Inflation Index (CII)', href: '/knowledge-bank?tab=utilities&tool=cii', badge: 'Index' },
      { label: 'Depreciation Schedules', href: '/knowledge-bank?tab=utilities&tool=depreciation', badge: 'IT / Co. Act' },
      { label: 'RoC & MCA Filing Fees', href: '/knowledge-bank?tab=utilities&tool=roc-fees', badge: 'MCA' },
      { label: 'NSC & Small Savings Rates', href: '/knowledge-bank?tab=utilities&tool=nsc-rates', badge: 'Gov Rates' },
      { label: 'State Stamp Duty References', href: '/knowledge-bank?tab=utilities&tool=stamp-duty', badge: 'State Acts' },
      { label: 'Gold & Silver Benchmarks', href: '/knowledge-bank?tab=utilities&tool=market-rates', badge: 'Valuation' },
    ],
  },
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
  const [rcDropdownOpen, setRcDropdownOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const close = () => {
    setOpen(false)
    setRcDropdownOpen(false)
    setExpandedCategory(null)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown on pathname change
  useEffect(() => {
    setRcDropdownOpen(false)
    setExpandedCategory(null)
    setOpen(false)
  }, [pathname])

  const email = contact?.email || 'contact@balakrishnaandco.com'
  const phone = contact?.phone || '8618259712 / 9845721255'

  const isLinkActive = (target: string) => {
    if (!pathname) return false
    if (target === '/') {
      return pathname === '/'
    }
    if (target === '/knowledge-bank' || target === '/resource-center') {
      return pathname.startsWith('/knowledge-bank') || pathname.startsWith('/resource-center')
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
                const isKnowledgeBank = item.label === 'Knowledge Bank' || item.label === 'Resource Center'

                if (isKnowledgeBank) {
                  return (
                    <React.Fragment key={item.label}>
                      {idx > 0 && <span className="main-menu__pipe">|</span>}
                      <div
                        className="main-menu__item-wrapper main-menu__item-wrapper--has-dropdown"
                        onMouseEnter={() => setRcDropdownOpen(true)}
                        onMouseLeave={() => {
                          setRcDropdownOpen(false)
                          setExpandedCategory(null)
                        }}
                      >
                        <a
                          href={item.href}
                          onClick={(e) => {
                            if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
                              e.preventDefault()
                              setRcDropdownOpen((v) => !v)
                            } else {
                              close()
                            }
                          }}
                          className={`main-menu__link ${active ? 'main-menu__link--active' : ''}`}
                          aria-expanded={rcDropdownOpen}
                          aria-haspopup="true"
                        >
                          <span>{item.label}</span>
                          <svg
                            className={`main-menu__caret ${rcDropdownOpen ? 'main-menu__caret--open' : ''}`}
                            width="9"
                            height="9"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </a>

                        {/* Clean, Simple, User-Friendly Knowledge Bank Dropdown */}
                        <div
                          className={`rc-dropdown-panel ${rcDropdownOpen ? 'rc-dropdown-panel--open' : ''}`}
                        >
                          <div className="rc-dropdown-header">
                            <div className="rc-dropdown-title-group">
                              <span className="rc-dropdown-tag">Statutory Knowledge Bank</span>
                              <h4 className="rc-dropdown-heading">Knowledge Bank Directory</h4>
                            </div>
                            <a
                              href="/knowledge-bank"
                              onClick={() => {
                                setRcDropdownOpen(false)
                                setExpandedCategory(null)
                                close()
                              }}
                              className="rc-dropdown-all-link"
                            >
                              <span>Explore All</span>
                              <span>→</span>
                            </a>
                          </div>

                          <div className="rc-accordion-list">
                            {KNOWLEDGE_BANK_CATEGORIES.map((cat) => {
                              const isExpanded = expandedCategory === cat.id
                              return (
                                <div key={cat.id} className={`rc-acc-group ${isExpanded ? 'rc-acc-group--expanded' : ''}`}>
                                  <button
                                    type="button"
                                    className={`rc-acc-header-btn ${isExpanded ? 'rc-acc-header-btn--active' : ''}`}
                                    onClick={() => {
                                      setExpandedCategory((prev) => (prev === cat.id ? null : cat.id))
                                    }}
                                    onMouseEnter={() => {
                                      setExpandedCategory(cat.id)
                                    }}
                                    aria-expanded={isExpanded}
                                  >
                                    <div className="rc-acc-header-left">
                                      <span className="rc-acc-icon">{cat.icon}</span>
                                      <span className="rc-acc-title">{cat.label}</span>
                                    </div>
                                    <div className="rc-acc-header-right">
                                      <span className="rc-acc-badge">{cat.countBadge}</span>
                                      <svg
                                        className={`rc-acc-chevron ${isExpanded ? 'rc-acc-chevron--open' : ''}`}
                                        width="11"
                                        height="11"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <polyline points="9 18 15 12 9 6" />
                                      </svg>
                                    </div>
                                  </button>

                                  {isExpanded && (
                                    <div className="rc-acc-submenu">
                                      <ul className="rc-acc-submenu-list">
                                        {cat.items.map((sub) => (
                                          <li key={sub.label} className="rc-acc-sub-item">
                                            <a
                                              href={sub.href}
                                              onClick={() => {
                                                setRcDropdownOpen(false)
                                                setExpandedCategory(null)
                                                close()
                                              }}
                                              className="rc-acc-sub-link"
                                            >
                                              <div className="rc-acc-sub-left">
                                                <span className="rc-acc-bullet">▪</span>
                                                <span className="rc-acc-sub-title">{sub.label}</span>
                                              </div>
                                              <span className="rc-acc-sub-badge">{sub.badge}</span>
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>

                          <div className="rc-dropdown-footer">
                            <a
                              href="/knowledge-bank"
                              onClick={() => {
                                setRcDropdownOpen(false)
                                setExpandedCategory(null)
                                close()
                              }}
                              className="rc-dropdown-footer-link"
                            >
                              <span>Browse All 17 Financial Calculators, Bulletins &amp; Utilities</span>
                              <span>→</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  )
                }

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
