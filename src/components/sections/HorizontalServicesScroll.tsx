'use client'

import React, { useState, useEffect, useRef } from 'react'
import CorporateIcon from '@/components/ui/CorporateIcon'

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

export default function HorizontalServicesScroll({
  services,
  eyebrow = 'Comprehensive Offerings',
  heading = 'What We Do',
  subheading = 'Delivering end-to-end solutions from assurance and taxation to transaction advisory and international expansion.',
}: HorizontalServicesScrollProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current && window.innerWidth > 900) {
            const rect = containerRef.current.getBoundingClientRect()
            const scrollableDistance = rect.height - window.innerHeight
            if (scrollableDistance > 0) {
              const scrolled = -rect.top
              const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1)
              const active = Math.min(
                services.length - 1,
                Math.floor(progress * services.length)
              )
              setActiveIdx(active)
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [services.length])

  if (!services || services.length === 0) return null
  const isSingleItem = services.length <= 1
  const currentService = services[activeIdx] || services[0]

  const bullets =
    Array.isArray(currentService.bullets) && currentService.bullets.length > 0
      ? currentService.bullets
      : []

  const scrollToService = (idx: number) => {
    setActiveIdx(idx)
    if (!containerRef.current || window.innerWidth <= 900) return
    const container = containerRef.current
    const scrollableDistance = container.offsetHeight - window.innerHeight
    if (scrollableDistance <= 0) return
    const targetScrollY =
      window.scrollY + container.getBoundingClientRect().top + (idx / Math.max(1, services.length - 1)) * scrollableDistance
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    })
  }

  return (
    <section
      ref={containerRef}
      className="services-console-section"
      id="services-showcase"
      style={{
        height: isSingleItem ? 'auto' : `calc(100vh + ${(services.length - 1) * 60}vh)`,
        paddingBottom: isSingleItem ? '60px' : undefined,
      }}
    >
      <div
        className="services-console-sticky"
        style={
          isSingleItem
            ? {
                position: 'relative',
                height: 'auto',
                overflow: 'visible',
              }
            : undefined
        }
      >
        <div className="container">
          {/* Section Header */}
          <div className="services-console-header">
            <span className="services-console-eyebrow">
              <span className="services-console-dot" />
              {eyebrow}
            </span>
            <h2 className="services-console-title">{heading}</h2>
            <p className="services-console-subheading">{subheading}</p>
          </div>

          {/* Horizontal Interactive Category Tabs */}
          {!isSingleItem && (
            <div className="services-console-nav-wrapper">
              <div className="services-console-nav-track">
                {services.map((srv, idx) => {
                  const isActive = idx === activeIdx
                  return (
                    <button
                      key={srv.title}
                      type="button"
                      onClick={() => scrollToService(idx)}
                      className={`services-console-tab-btn ${isActive ? 'services-console-tab-btn--active' : ''
                        }`}
                    >
                      <span className="services-console-tab-num">0{idx + 1}</span>
                      <span className="services-console-tab-label">{srv.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Active Capability Stage (Split View: Details on Left, Sliding Images on Right) */}
          <div className="services-console-stage">
            {/* Left Column: Narrative & Scope */}
            <div className="services-console-details" key={`details-${activeIdx}`}>
              <div className="services-console-details-top">
                <div className="services-console-badge-row">
                  <div className="services-console-icon-pill">
                    <CorporateIcon name={currentService.iconName} size={24} color="#f26522" />
                    <span>Practice Discipline 0{activeIdx + 1}</span>
                  </div>
                </div>

                <h3 className="services-console-active-title">{currentService.title}</h3>
                <p className="services-console-active-desc">{currentService.desc}</p>

                {/* Scope Checklist (Dynamic Sub-Services) */}
                {bullets.length > 0 && (
                  <div className="services-console-scope-list">
                    <span className="services-console-scope-label">Core Practice Scope:</span>
                    <ul>
                      {bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>
                          <svg
                            className="services-console-check-icon"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#f26522"
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
                )}
              </div>

              {/* Action Row */}
              <div className="services-console-action-row">
                <a href={currentService.href} className="hero-btn hero-btn--gold" style={{ padding: '14px 32px', fontSize: 15.5 }}>
                  <span>Explore {currentService.title}</span>
                  <span style={{ marginLeft: 6 }}>→</span>
                </a>
                <a href="/contact" className="services-console-consult-link">
                  <span>Book Practice Consultation</span>
                </a>
              </div>
            </div>

            {/* Right Column: Sliding Image Carousel */}
            <div className="services-console-visual">
              <div className="services-console-visual-frame">
                <div
                  className="services-console-slider-track"
                  style={{
                    display: 'flex',
                    height: '100%',
                    width: `${services.length * 100}%`,
                    transform: `translateX(-${(activeIdx * 100) / services.length}%)`,
                    transition: 'transform 0.55s cubic-bezier(0.2, 0.8, 0.25, 1)',
                  }}
                >
                  {services.map((srv) => (
                    <div
                      key={srv.title}
                      style={{
                        width: `${100 / services.length}%`,
                        height: '100%',
                        position: 'relative',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={srv.bgImage}
                        alt={srv.title}
                        className="services-console-visual-img"
                        onError={(e) => {
                          ; (e.target as HTMLImageElement).src = '/images/services.png'
                        }}
                      />
                      <div className="services-console-visual-overlay" />
                      <div className="services-console-visual-pill">
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f26522', boxShadow: '0 0 6px #f26522' }} />
                        <span>{srv.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Catalog Button */}
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <a
              href="/services"
              className="hero-btn hero-btn--outline"
              style={{
                background: '#ffffff',
                color: '#1d4ed8',
                borderColor: '#cbd5e1',
                padding: '10px 26px',
                fontSize: 13.5,
                fontWeight: 700,
              }}
            >
              Explore Complete Service Catalog →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
