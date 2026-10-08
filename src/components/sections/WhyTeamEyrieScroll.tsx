'use client'

import React, { useState, useEffect, useRef } from 'react'

export interface WhyEyrieItem {
  id: string
  num: string
  tag: string
  title: string
  description: string
  image: string
  link?: string
  linkLabel?: string
  bullets?: string[]
}

interface WhyTeamEyrieScrollProps {
  tagline?: string
  heading?: string
  subheading?: string
  items?: WhyEyrieItem[]
}

const defaultItems: WhyEyrieItem[] = [
  {
    id: 'synergy',
    num: '01',
    tag: 'Synergy',
    title: 'Collective Intelligence',
    description:
      'A powerful alliance of senior Chartered Accountants and multidisciplinary specialists delivering unified, high-impact solutions across all financial and regulatory domains.',
    image: '/images/indian-ca-boardroom.png',
    link: '/why-team-eyrie',
    linkLabel: 'Explore Network Advantage',
    bullets: [
      'Multi-firm advisory integration under one umbrella',
      '20+ senior partners with decades of combined practice',
      'Cross-disciplinary counsel spanning tax, audit & legal',
    ],
  },
  {
    id: 'coverage',
    num: '02',
    tag: 'National Reach',
    title: 'Strong PAN-India Presence',
    description:
      'Strategically positioned across India’s premier financial and industrial corridors, offering clients seamless local accessibility backed by national institutional scale.',
    image: '/images/indian-business-bkc.png',
    link: '/presence',
    linkLabel: 'View Our Pan-India Offices',
    bullets: [
      'Hub offices in New Delhi, Chennai, Bengaluru & Salem',
      'Pan-India execution across major metro & tier-2 circuits',
      'Unified service quality standards nationwide',
    ],
  },
  {
    id: 'domain',
    num: '03',
    tag: 'Domain Depth',
    title: 'Specialised Sector Expertise',
    description:
      'Deep technical knowledge and hands-on advisory tailored across 17+ core industries, navigating complex regulatory shifts and industry-specific mandates.',
    image: '/images/industries.png',
    link: '/industries',
    linkLabel: 'Discover 17+ Sectors',
    bullets: [
      'Dedicated vertical practice heads for each sector',
      'Established regulatory precedent and NCLT/ITAT insights',
      'Customized enterprise frameworks for MSMEs to conglomerates',
    ],
  },
  {
    id: 'innovation',
    num: '04',
    tag: 'Innovation',
    title: 'Technology-Driven Delivery',
    description:
      'Harnessing digital audit platforms, secure client collaboration portals, AI-assisted data analytics, and automated tax compliance for precision and speed.',
    image: '/images/services.png',
    link: '/services',
    linkLabel: 'Explore Tech-Enabled Services',
    bullets: [
      'Automated compliance tracking and audit trail verifications',
      'Secure, encrypted document exchange & client portals',
      'Data-driven financial modelling & Virtual CFO systems',
    ],
  },
  {
    id: 'trust',
    num: '05',
    tag: 'Integrity & Trust',
    title: 'Client-Centric Philosophy',
    description:
      'Built upon an uncompromising foundation of professional ethics, direct partner involvement, transparency, and long-term partnership with every client.',
    image: '/images/indian-advisory-team.png',
    link: '/about',
    linkLabel: 'Read Our Governance Principles',
    bullets: [
      'Direct, hands-on involvement of senior founding partners',
      'Proactive risk mitigation and compliance foresight',
      'Clear, transparent communication with measurable results',
    ],
  },
  {
    id: 'global',
    num: '06',
    tag: 'Global Reach',
    title: 'Global Business Perspective',
    description:
      'Guiding enterprises, startups, and NRI investors through cross-border structuring, foreign direct investments (FDI), transfer pricing, and overseas expansion.',
    image: '/images/Why.png',
    link: '/services#global-business',
    linkLabel: 'Explore Cross-Border Advisory',
    bullets: [
      'Cross-border M&A, JV structuring, and FDI compliance',
      'Comprehensive FEMA, RBI, and international tax planning',
      'Dedicated NRI taxation, repatriation, and estate governance',
    ],
  },
]

export default function WhyTeamEyrieScroll({
  tagline = 'The Team Eyrie Advantage',
  heading = 'Why Team Eyrie?',
  subheading = 'A single umbrella combining senior leadership, multidisciplinary intelligence, and technology-assisted execution.',
  items,
}: WhyTeamEyrieScrollProps) {
  const displayItems = items && items.length > 0 ? items : defaultItems
  const containerRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      if (window.innerWidth <= 900) return

      const rect = containerRef.current.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      if (scrollableDistance <= 0) return

      const scrolled = -rect.top
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1)

      const active = Math.min(
        displayItems.length - 1,
        Math.floor(progress * displayItems.length)
      )
      setActiveIndex(active)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [displayItems.length])

  const scrollToAdvantage = (idx: number) => {
    setActiveIndex(idx)
    if (!containerRef.current || window.innerWidth <= 900) return
    const container = containerRef.current
    const scrollableDistance = container.offsetHeight - window.innerHeight
    if (scrollableDistance <= 0) return
    const targetScrollY =
      window.scrollY + container.getBoundingClientRect().top + (idx / Math.max(1, displayItems.length - 1)) * scrollableDistance
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    })
  }

  const activeItem = displayItems[activeIndex] || displayItems[0]

  return (
    <section
      ref={containerRef}
      className="why-editorial-section"
      id="why-team-eyrie"
      style={{
        height: `calc(100vh + ${(displayItems.length - 1) * 65}vh)`,
      }}
    >
      <div className="why-editorial-sticky">
        <div className="container">
          {/* Section Header */}
          <div className="why-editorial-header">
            <span className="why-editorial-tag">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E87722' }} />
              {tagline}
            </span>
            <h2 className="why-editorial-heading">{heading}</h2>
            <p className="why-editorial-subheading">{subheading}</p>
          </div>

          {/* Seamless 2-Column Split Stage */}
          <div className="why-editorial-stage">
            {/* LEFT: Synchronized Visual Stage */}
            <div className="why-editorial-visual-col">
              <div className="why-editorial-img-frame">
                {displayItems.map((item, idx) => {
                  const isActive = idx === activeIndex
                  return (
                    <div
                      key={item.id || idx}
                      className={`why-editorial-img-layer ${isActive ? 'why-editorial-img-layer--active' : ''
                        }`}
                    >
                      <img
                        src={item.image || '/images/Why.png'}
                        alt={item.title}
                        className="why-editorial-img"
                        onError={(e) => {
                          ; (e.target as HTMLImageElement).src = '/images/Why.png'
                        }}
                      />
                      <div className="why-editorial-img-overlay" />
                    </div>
                  )
                })}
                <div className="why-editorial-badge-pill">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E87722', boxShadow: '0 0 6px #E87722' }} />
                  <span>{activeItem.tag}</span>
                </div>
              </div>

              {/* Navigation Dash Indicators */}
              <div className="why-editorial-dots">
                {displayItems.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToAdvantage(idx)}
                    className={`why-editorial-dot ${idx === activeIndex ? 'why-editorial-dot--active' : ''
                      }`}
                    aria-label={`Select advantage ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: Seamless Editorial Narrative Stream (6 Items) */}
            <div className="why-editorial-stream-col">
              {displayItems.map((item, idx) => {
                const isActive = idx === activeIndex
                return (
                  <div
                    key={item.id || idx}
                    onClick={() => scrollToAdvantage(idx)}
                    className={`why-editorial-row ${isActive ? 'why-editorial-row--active' : ''
                      }`}
                  >
                    {/* Row Header */}
                    <div className="why-editorial-row-header">
                      <span className="why-editorial-row-num">{item.num}</span>
                      <span className="why-editorial-row-tag">{item.tag}</span>
                      <h3 className="why-editorial-row-title">{item.title}</h3>
                    </div>

                    {/* Expanded Content Area (Active Item Details) */}
                    <div className="why-editorial-row-body">
                      <p className="why-editorial-row-desc">{item.description}</p>

                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="why-editorial-row-bullets">
                          {item.bullets.map((b, bIdx) => (
                            <li key={bIdx}>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#E87722"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="why-editorial-row-action">
                        <a
                          href={item.link || '/why-team-eyrie'}
                          className="why-editorial-action-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>{item.linkLabel || 'Explore Advantage'}</span>
                          <span style={{ marginLeft: 6 }}>→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
