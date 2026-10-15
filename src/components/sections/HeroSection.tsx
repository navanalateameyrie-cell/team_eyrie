'use client'

import React, { useState, useEffect } from 'react'

export interface HeroSlide {
  id: string
  num: string
  badge: string
  tagline: string
  title: string
  description: string
  image: string
  video?: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    num: '01',
    badge: 'Industry Practice',
    tagline: 'Sector-Specific Advisory & Enterprise Growth',
    title: 'Tailored Solutions for 17+ Core Sectors',
    description:
      'Specialized advisory tailored for Manufacturing, BFSI, Healthcare, Technology, Logistics, Startups, MSMEs, and Large Commercial Conglomerates.',
    image: '/images/herosection.png',
    video: '/videos/ca2.mp4',
    primaryCta: { label: 'Schedule Consultation', href: '/contact' },
    secondaryCta: { label: 'Explore Services', href: '/services' },
  },
  {
    id: 'slide-2',
    num: '02',
    badge: 'Integrated Network',
    tagline: 'Strategic Guidance & Cross-Border Advisory',
    title: 'Professional Corporate Strategic Advisory',
    description:
      'End-to-end counsel for corporate restructuring, international joint ventures, market entry strategies, direct taxation, and regulatory representation across India.',
    image: '/images/Aboutus.png',
    primaryCta: { label: 'Explore Advisory', href: '/services' },
    secondaryCta: { label: 'Contact Us', href: '/contact' },
  },
  {
    id: 'slide-3',
    num: '03',
    badge: 'National Alliance',
    tagline: 'Strategic Alliance of Three Reputed CA Partnerships',
    title: 'Together, We Create Value. Together, We Build Trust.',
    description:
      'A united national network of Chartered Accountants, Company Secretaries, Legal Counsel, and Valuation Specialists delivering institutional excellence.',
    image: '/images/finalslide3-poster.png',
    video: '/media/finalslide3.mp4',
    primaryCta: { label: 'About Team Eyrie', href: '/about' },
    secondaryCta: { label: 'Why Team Eyrie', href: '/why-team-eyrie' },
  },
  {
    id: 'slide-4',
    num: '04',
    badge: 'The Eyrie Advantage',
    tagline: 'Precision Assurance & Multi-Disciplinary Practice',
    title: 'Integrated Multi-Disciplinary Assurance Excellence',
    description:
      'Seamless coordination across direct tax litigation, high-volume statutory audits, transfer pricing, and corporate governance for high-growth enterprises.',
    image: '/images/industries.png',
    primaryCta: { label: 'Our Capabilities', href: '/why-team-eyrie' },
    secondaryCta: { label: 'PAN-India Reach', href: '/presence' },
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

function renderHeadline(title: string) {
  if (!title) return null

  // If title has "for ", split there
  if (title.includes(' for ')) {
    const [before, after] = title.split(' for ')
    return (
      <>
        <span className="hero-creative-title__main">{before} for </span>
        <span className="hero-creative-title__accent">{after}</span>
      </>
    )
  }

  // If title has a period, split there
  if (title.includes('.')) {
    const parts = title.split('.')
    return (
      <>
        <span className="hero-creative-title__main">{parts[0]}. </span>
        <span className="hero-creative-title__accent">{parts.slice(1).join('.').trim()}</span>
      </>
    )
  }

  // If title has 3+ words, highlight the last 2 words
  const words = title.trim().split(' ')
  if (words.length > 2) {
    const main = words.slice(0, words.length - 2).join(' ')
    const accent = words.slice(words.length - 2).join(' ')
    return (
      <>
        <span className="hero-creative-title__main">{main} </span>
        <span className="hero-creative-title__accent">{accent}</span>
      </>
    )
  }

  return <>{title}</>
}

function SlideVideo({
  src,
  poster,
  isActive,
}: {
  src: string
  poster?: string
  isActive: boolean
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    if (isActive && videoRef.current) {
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignore autoplay restriction errors
        })
      }
    }
  }, [isActive])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      className="hero-creative-bg__video"
    >
      <source src={src} type={src.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
      {src.endsWith('.mov') && <source src="/videos/ca2.mp4" type="video/mp4" />}
      {src.includes('finalslide3') && (
        <>
          <source src="/media/finalslide3.mp4" type="video/mp4" />
          <source src="/videos/finalslide3.mp4" type="video/mp4" />
        </>
      )}
      {src.includes('newweb') && (
        <>
          <source src="/media/newweb.mp4" type="video/mp4" />
          <source src="/videos/newweb.mp4" type="video/mp4" />
        </>
      )}
      {src.includes('gstheader') && (
        <>
          <source src="/media/gstheader.mp4" type="video/mp4" />
          <source src="/videos/gstheader.mp4" type="video/mp4" />
        </>
      )}
    </video>
  )
}

export default function HeroSection({
  eyebrow = 'TRUSTED CHARTERED ACCOUNTANTS',
  headline = 'TEAM EYRIE',
  subheadline = 'Together, We Create Value. Together, We Build Trust.',
  primaryCtaLabel,
  primaryCtaLink,
  slides = defaultHeroSlides,
  allianceFirms = defaultAllianceFirms,
}: HeroProps) {
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

  // Auto rotate every 4s
  useEffect(() => {
    if (slideCount <= 1) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount)
    }, 4000)
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
      className="hero-creative-section"
      suppressHydrationWarning
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Hero Section"
    >
      {/* Full-bleed background image & video carousel */}
      <div className="hero-creative-bg">
        {activeSlides.map((slide, idx) => {
          const isActive = idx === activeIndex
          const isVideo = Boolean(
            slide.video ||
            slide.image?.endsWith('.mp4') ||
            slide.image?.endsWith('.mov') ||
            slide.image?.endsWith('.webm')
          )
          const videoSrc = slide.video || (isVideo ? slide.image : undefined)

          return (
            <div
              key={slide.id}
              className={`hero-creative-bg__slide ${isActive ? 'hero-creative-bg__slide--active' : ''}`}
              style={isVideo ? undefined : { backgroundImage: `url(${slide.image})` }}
              aria-hidden={!isActive}
            >
              {isVideo && videoSrc && (
                <SlideVideo
                  src={videoSrc}
                  poster={slide.image && !slide.image.endsWith('.mp4') && !slide.image.endsWith('.mov') ? slide.image : undefined}
                  isActive={isActive}
                />
              )}
            </div>
          )
        })}

        {/* Dark gradient overlays for text legibility */}
        <div className="hero-creative-bg__overlay" />
        <div className="hero-creative-bg__overlay-radial" />
      </div>

      {/* Overlaid text content */}
      <div className="container hero-creative-container">
        <div className="hero-creative-content" key={activeSlide.id}>
          {/* Eyebrow */}
          <div className="hero-creative-eyebrow">
            <span>{eyebrow}</span>
          </div>

          {/* Headline with Accent Highlight */}
          <h1 className="hero-creative-title">
            {renderHeadline(activeSlide.title)}
          </h1>

          {/* Description */}
          <p className="hero-creative-desc">
            {activeSlide.description}
          </p>

          {/* Action Buttons */}
          <div className="hero-creative-actions">
            <a
              href={primaryCtaLink || activeSlide.primaryCta.href}
              className="hero-creative-btn hero-creative-btn--primary"
            >
              <span>{primaryCtaLabel || activeSlide.primaryCta.label || 'Schedule Consultation'}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            <a
              href={activeSlide.secondaryCta.href || '/services'}
              className="hero-creative-btn hero-creative-btn--secondary"
            >
              <span>{activeSlide.secondaryCta.label || 'Explore Services'}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* Slide Indicators */}
          {activeSlides.length > 1 && (
            <div className="hero-creative-indicators" aria-label="Slide Selection">
              {activeSlides.map((slide, idx) => {
                const isActive = idx === activeIndex
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`hero-creative-indicator ${isActive ? 'hero-creative-indicator--active' : ''}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    <span className="hero-creative-indicator__line" />
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

