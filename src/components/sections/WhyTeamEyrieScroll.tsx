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
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.45
      let closestIdx = 0
      let minDistance = Infinity

      itemRefs.current.forEach((el, idx) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const elementCenter = rect.top + rect.height / 2
        const distance = Math.abs(elementCenter - viewportCenter)

        if (distance < minDistance) {
          minDistance = distance
          closestIdx = idx
        }
      })

      setActiveIndex(closestIdx)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [displayItems.length])

  const scrollToItem = (idx: number) => {
    const el = itemRefs.current[idx]
    if (el) {
      const yOffset = -140
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveIndex(idx)
    }
  }

  const activeItem = displayItems[activeIndex] || displayItems[0]

  return (
    <section className="why-scroll-section" id="why-team-eyrie">
      <div className="container">
        {/* Section Header */}
        <div className="why-scroll-header">
          <span className="why-scroll-tag">
            <span className="why-scroll-tag-dot" />
            {tagline}
          </span>
          <h2 className="why-scroll-title">{heading}</h2>
          <p className="why-scroll-subheading">{subheading}</p>
        </div>

        {/* Sticky Scroll Container */}
        <div className="why-scroll-layout">
          {/* LEFT: Sticky Image Visual Showcase */}
          <div className="why-scroll-sticky-col">
            <div className="why-scroll-visual-card">
              {/* Image Stack with Crossfade */}
              <div className="why-scroll-image-container">
                {displayItems.map((item, idx) => {
                  const isActive = idx === activeIndex
                  return (
                    <div
                      key={item.id || idx}
                      className={`why-scroll-image-layer ${
                        isActive ? 'why-scroll-image-layer--active' : ''
                      }`}
                    >
                      <img
                        src={item.image || '/images/Why.png'}
                        alt={item.title}
                        className="why-scroll-image"
                        onError={(e) => {
                          // Graceful fallback to default curated image
                          ;(e.target as HTMLImageElement).src = '/images/Why.png'
                        }}
                      />
                      <div className="why-scroll-image-overlay" />
                    </div>
                  )
                })}
              </div>

              {/* Floating Tag Badge */}
              <div className="why-scroll-badge-bar">
                <div className="why-scroll-tag-pill">{activeItem.tag}</div>
              </div>

              {/* Interactive Navigation Dots */}
              <div className="why-scroll-dots">
                {displayItems.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToItem(idx)}
                    className={`why-scroll-dot ${
                      idx === activeIndex ? 'why-scroll-dot--active' : ''
                    }`}
                    aria-label={`Jump to ${displayItems[idx]?.title}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Scrolling Content Cards */}
          <div className="why-scroll-content-col">
            {displayItems.map((item, idx) => {
              const isActive = idx === activeIndex
              return (
                <div
                  key={item.id || idx}
                  ref={(el) => {
                    itemRefs.current[idx] = el
                  }}
                  onClick={() => scrollToItem(idx)}
                  className={`why-scroll-item-card ${
                    isActive ? 'why-scroll-item-card--active' : ''
                  }`}
                >
                  {/* Item Header */}
                  <div className="why-scroll-item-top">
                    <span className="why-scroll-item-num">{item.num}</span>
                    <span className="why-scroll-item-tag">{item.tag}</span>
                  </div>

                  {/* Mobile-Only Image Preview */}
                  <div className="why-scroll-item-mobile-img">
                    <img
                      src={item.image || '/images/Why.png'}
                      alt={item.title}
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = '/images/Why.png'
                      }}
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="why-scroll-item-title">{item.title}</h3>
                  <p className="why-scroll-item-desc">{item.description}</p>

                  {/* Key Highlights / Bullets */}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="why-scroll-bullets">
                      {item.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="why-scroll-bullet-item">
                          <svg
                            className="why-scroll-check-icon"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
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

                  {/* Action Link Button */}
                  <div className="why-scroll-item-action">
                    <a
                      href={item.link || '/why-team-eyrie'}
                      className="why-scroll-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>{item.linkLabel || 'Explore Detail'}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="why-scroll-btn-arrow"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
