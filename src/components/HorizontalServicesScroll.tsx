'use client'

import React, { useState, useRef, useEffect } from 'react'
import CorporateIcon from './CorporateIcon'

export interface ServiceItem {
  title: string
  desc: string
  iconName: string
  href: string
  bgImage: string
  bullets?: string[]
}

interface HorizontalServicesScrollProps {
  services: ServiceItem[]
  eyebrow?: string
  heading?: string
  subheading?: string
}

const serviceCapabilities: Record<string, string[]> = {
  'Assurance & Audit': [
    'Statutory, Internal, Bank, & Concurrent Audits',
    'Tax Audits & IFC (Internal Financial Controls)',
    'Forensic Accounting, Fraud Reviews & Risk Advisory',
  ],
  'Tax Advisory': [
    'Direct Tax Planning & Corporate Income Tax',
    'Income Tax Appellate Tribunal (ITAT) & Litigation',
    'International Tax Structuring & Transfer Pricing',
  ],
  'GST & Indirect Taxes': [
    'Comprehensive GST Advisory & Routine Compliance',
    'GST Departmental Audits, Appeals & Litigation',
    'Customs & Foreign Trade Policy (FTP) Guidance',
  ],
  'Corporate & Regulatory': [
    'Companies Act Compliance & ROC Secretarial Filings',
    'NCLT Proceedings & Insolvency Resolution Support',
    'RBI, FEMA, & SEBI Regulatory Alignments',
  ],
  'Business Consulting': [
    'Corporate Restructuring & Strategic Growth Planning',
    'Financial Modelling & MIS Automation',
    'Virtual CFO & Interim Executive Advisory',
  ],
  'Transaction Advisory': [
    'Mergers & Acquisitions (M&A) & Joint Ventures',
    'Buy-Side & Sell-Side Financial Due Diligence',
    'Valuation Reports & PE / VC Fund Raising Support',
  ],
  'Family Business Advisory': [
    'Family Constitution & Governance Frameworks',
    'Succession Planning & Estate Structuring',
    'Private Trust Creation & Wealth Preservation',
  ],
  'Global Business Services': [
    'Inbound (FDI) & Outbound (ODI) Investment Guidance',
    'Cross-Border Tax Treaties (DTAA) & Expatriate Tax',
    'NRI Taxation, Asset Repatriation & Global Expansion',
  ],
}

export default function HorizontalServicesScroll({
  services,
  eyebrow = 'Comprehensive Offerings',
  heading = 'What We Do',
  subheading = 'Delivering end-to-end solutions from assurance and taxation to transaction advisory and international expansion.',
}: HorizontalServicesScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIdx, setActiveIdx] = useState(0)
  const [maxScrollWidth, setMaxScrollWidth] = useState(0)

  // Measure horizontal track scroll distance
  useEffect(() => {
    const updateMetrics = () => {
      if (trackRef.current) {
        const totalW = trackRef.current.scrollWidth
        const viewW = window.innerWidth
        // calculate horizontal travel needed to reach the end card comfortably
        const maxScroll = Math.max(0, totalW - viewW + 160)
        setMaxScrollWidth(maxScroll)
      }
    }

    updateMetrics()
    window.addEventListener('resize', updateMetrics)
    return () => window.removeEventListener('resize', updateMetrics)
  }, [services.length])

  // Vertical scroll event to drive horizontal translation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const scrollableHeight = rect.height - window.innerHeight
      if (scrollableHeight <= 0) return

      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight))
      setScrollProgress(progress)

      const active = Math.min(
        services.length - 1,
        Math.floor(progress * services.length + 0.05)
      )
      setActiveIdx(active)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [services.length])

  // Scroll to a specific card smoothly
  const scrollToService = (idx: number) => {
    if (!containerRef.current) return
    const container = containerRef.current
    const scrollableHeight = container.offsetHeight - window.innerHeight
    const targetScrollY =
      container.offsetTop + (idx / Math.max(1, services.length - 1)) * scrollableHeight

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    })
  }

  const handleNext = () => {
    const nextIdx = Math.min(services.length - 1, activeIdx + 1)
    scrollToService(nextIdx)
  }

  const handlePrev = () => {
    const prevIdx = Math.max(0, activeIdx - 1)
    scrollToService(prevIdx)
  }

  const currentTranslateX = scrollProgress * maxScrollWidth

  return (
    <section
      ref={containerRef}
      className="hz-scroll-container"
      id="services-showcase"
      style={{
        height: `calc(100vh + ${(services.length - 1) * 65}vh)`,
      }}
    >
      {/* Sticky Full-Viewport View */}
      <div className="hz-scroll-sticky">
        {/* Section Header (Centered) */}
        <div className="hz-scroll-header-bar">
          <div className="container hz-scroll-header-inner">
            <span className="hz-services-tag">
              <span className="hz-services-tag-dot" />
              {eyebrow}
            </span>
            <h2 className="hz-scroll-heading">{heading}</h2>
            <p className="hz-scroll-subheading-text">{subheading}</p>

            {/* Clean Quick Nav Buttons */}
            <div className="hz-scroll-nav-btns-fixed">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIdx === 0}
                className="hz-scroll-arrow-btn"
                aria-label="Previous service"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIdx === services.length - 1}
                className="hz-scroll-arrow-btn"
                aria-label="Next service"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Moving Cards Viewport */}
        <div className="hz-scroll-cards-viewport">
          <div
            ref={trackRef}
            className="hz-scroll-cards-track"
            style={{
              transform: `translateX(-${currentTranslateX}px)`,
            }}
          >
            {services.map((srv, idx) => {
              const bullets =
                srv.bullets ||
                serviceCapabilities[srv.title] || [
                  'End-to-end strategic advisory and regulatory compliance',
                  'Senior partner leadership and direct engagement',
                  'Technology-enabled workflows and measurable client outcomes',
                ]
              const isActive = idx === activeIdx

              return (
                <div
                  key={srv.title}
                  className={`hz-service-slide-card ${
                    isActive ? 'hz-service-slide-card--active' : ''
                  }`}
                  onClick={() => scrollToService(idx)}
                >
                  {/* LEFT SIDE: Content */}
                  <div className="hz-slide-content">
                    <div>
                      <div className="hz-slide-top-meta">
                        <div className="hz-slide-icon-box">
                          <CorporateIcon name={srv.iconName} size={28} color="#b08d57" />
                        </div>
                      </div>

                      <h3 className="hz-slide-title">{srv.title}</h3>
                      <p className="hz-slide-desc">{srv.desc}</p>

                      <div className="hz-slide-scope-box">
                        <span className="hz-slide-scope-title">Key Practice Scope:</span>
                        <ul className="hz-slide-bullets">
                          {bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="hz-slide-bullet-item">
                              <svg
                                className="hz-slide-check"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="hz-slide-action-row">
                      <a href={srv.href} className="hz-slide-cta-btn" onClick={(e) => e.stopPropagation()}>
                        <span>Explore {srv.title}</span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* RIGHT SIDE: High-Res Image Frame */}
                  <div className="hz-slide-image-frame">
                    <img
                      src={srv.bgImage}
                      alt={srv.title}
                      className="hz-slide-image"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = '/images/services.png'
                      }}
                    />
                    <div className="hz-slide-image-overlay" />
                    <div className="hz-slide-image-tag">
                      <span>{srv.title}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Catalog Link */}
        <div className="hz-scroll-bottom-bar">
          <a href="/services" className="hero-btn hero-btn--gold" style={{ padding: '10px 28px', fontSize: 14 }}>
            View Complete Service Catalog →
          </a>
        </div>
      </div>
    </section>
  )
}
