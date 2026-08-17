'use client'

import React, { useState, useEffect, useRef } from 'react'

export interface HeroSlide {
  id: string
  num: string
  badge: string
  tagline: string
  title: string
  description: string
  image: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    num: '01',
    badge: 'Integrated Network',
    tagline: 'Strategic Guidance & Cross-Border Advisory',
    title: 'Professional Corporate Advisory',
    description:
      'End-to-end counsel for corporate restructuring, international joint ventures, market entry strategies, direct taxation, and regulatory representation across India.',
    image: '/images/herosection.png',
    primaryCta: { label: 'Explore Advisory', href: '/services' },
    secondaryCta: { label: 'Contact Us', href: '/contact' },
  },
  {
    id: 'slide-2',
    num: '02',
    badge: 'National Alliance',
    tagline: 'Strategic Alliance of Three Reputed CA Partnerships',
    title: 'Together, We Create Value. Together, We Build Trust.',
    description:
      'A united national network of Chartered Accountants, Company Secretaries, Legal Counsel, and Valuation Specialists delivering institutional excellence.',
    image: '/images/Aboutus.png',
    primaryCta: { label: 'About Team Eyrie', href: '/about' },
    secondaryCta: { label: 'Why Team Eyrie', href: '/why-team-eyrie' },
  },
  {
    id: 'slide-3',
    num: '03',
    badge: 'The Eyrie Advantage',
    tagline: 'Precision Assurance & Multi-Disciplinary Practice',
    title: 'Integrated Multi-Disciplinary Excellence',
    description:
      'Seamless coordination across direct tax litigation, high-volume statutory audits, transfer pricing, and corporate governance for high-growth enterprises.',
    image: '/images/Why.png',
    primaryCta: { label: 'Our Capabilities', href: '/why-team-eyrie' },
    secondaryCta: { label: 'PAN-India Reach', href: '/presence' },
  },
  {
    id: 'slide-4',
    num: '04',
    badge: 'Industry Practice',
    tagline: 'Sector-Specific Advisory & Enterprise Growth',
    title: 'Tailored Solutions for 17+ Core Sectors',
    description:
      'Specialized advisory tailored for Manufacturing, BFSI, Healthcare, Technology, Logistics, Startups, MSMEs, and Large Commercial Conglomerates.',
    image: '/images/industries.png',
    primaryCta: { label: 'Industry Sectors', href: '/industries' },
    secondaryCta: { label: 'Consult Our Team', href: '/contact' },
  },
]

const MAX_HERO_SLIDES = 4

export interface AllianceFirm {
  name: string
  role: string
  hub: string
  initials: string
}

export const defaultAllianceFirms: AllianceFirm[] = [
  {
    name: 'V. Verma & Co.',
    role: 'Chartered Accountants',
    hub: 'New Delhi • Barakhamba Rd',
    initials: 'VV',
  },
  {
    name: 'S S A L Associates',
    role: 'Chartered Accountants',
    hub: 'Salem • Bengaluru',
    initials: 'SSAL',
  },
  {
    name: 'R. Sridharan & Company',
    role: 'Chartered Accountants',
    hub: 'Chennai • Pan-India',
    initials: 'RSC',
  },
]

interface HeroProps {
  eyebrow?: string
  headline?: string
  subheadline?: string
  primaryCtaLabel?: string
  primaryCtaLink?: string
  slides?: HeroSlide[]
  allianceFirms?: AllianceFirm[]
}

export default function HeroSection({
  eyebrow = "India's Integrated Professional Services Network",
  headline = 'TEAM EYRIE',
  subheadline = 'Together, We Create Value. Together, We Build Trust.',
  primaryCtaLabel,
  primaryCtaLink,
  slides = defaultHeroSlides,
  allianceFirms = defaultAllianceFirms,
}: HeroProps) {
  // Enforce max 4 slides rule: exactly / up to 4 slides allowed
  const activeSlides = (slides && slides.length > 0 ? slides : defaultHeroSlides).slice(0, MAX_HERO_SLIDES)
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const slideCount = activeSlides.length

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slideCount)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount)
  }

  const goToSlide = (idx: number) => {
    setActiveIndex(idx)
  }

  // Automatic continuous background image rotation based on timer (does not stop on hover)
  useEffect(() => {
    if (slideCount <= 1) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount)
    }, 6000)
    return () => clearInterval(timer)
  }, [activeIndex, slideCount])

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX
    if (diff > 50) {
      nextSlide()
    } else if (diff < -50) {
      prevSlide()
    }
    setTouchStartX(null)
  }

  const activeSlide = activeSlides[activeIndex] || activeSlides[0]

  return (
    <section
      className="hero-section"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Featured Capabilities Carousel"
    >
      {/* Background Image Carousel Track with Smooth Fade & Subtle Zoom */}
      <div className="hero-section__bg-wrapper">
        {activeSlides.map((slide, idx) => {
          const isActive = idx === activeIndex
          return (
            <div
              key={slide.id}
              className={`hero-section__bg-slide ${isActive ? 'hero-section__bg-slide--active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden={!isActive}
            />
          )
        })}
        {/* Transparent Gradient Overlays for High Legibility and Rich Contrast */}
        <div className="hero-section__overlay" />
        <div className="hero-section__overlay-radial" />
      </div>

      {/* Main Content Layout Container */}
      <div className="container hero-section__container">
        {/* Main Content Row: Indicators + Hero Information Card */}
        <div className="hero-section__main-row">
          {/* VERTICAL SLIDE PROGRESS INDICATORS (Left Side) */}
          <div className="hero-vertical-indicators" aria-label="Slide Selection">
            {activeSlides.map((slide, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`hero-vertical-indicator ${isActive ? 'hero-vertical-indicator--active' : ''}`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                >
                  <span className="hero-vertical-indicator__line" />
                </button>
              )
            })}
          </div>

          {/* LEFT CORNER: Translucent / Transparent Frosted-Glass Hero Information Card */}
          <div className="hero-section__left-col">
            <div className="hero-glass-card" key={activeSlide.id}>
              {/* Animated Headline & Subtitle */}
              <h1 className="hero-glass-card__title">{activeSlide.title}</h1>
              <p className="hero-glass-card__tagline">{activeSlide.tagline}</p>
              <p className="hero-glass-card__desc">{activeSlide.description}</p>

              {/* Action Buttons */}
              <div className="hero-glass-card__actions">
                <a
                  href={primaryCtaLink || activeSlide.primaryCta.href}
                  className="hero-btn hero-btn--gold"
                >
                  <span>{primaryCtaLabel || activeSlide.primaryCta.label}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hero-btn__icon"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <a
                  href={activeSlide.secondaryCta.href}
                  className="hero-btn hero-btn--outline"
                >
                  {activeSlide.secondaryCta.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
