import React from 'react'

export type Breadcrumb = { label: string; href?: string }

export interface PageHeroProps {
  title: string
  subtitle?: string
  eyebrow?: string
  crumbs?: Breadcrumb[]
  bgImage?: string
  bgPosition?: string
  children?: React.ReactNode
}

function renderPageTitle(title: string) {
  if (!title) return null

  // If title has " for ", split there
  if (title.includes(' for ')) {
    const [before, after] = title.split(' for ')
    return (
      <>
        <span className="page-hero-title__main">{before} for </span>
        <span className="page-hero-title__accent">{after}</span>
      </>
    )
  }

  // If title has a period, split there
  if (title.includes('.')) {
    const parts = title.split('.')
    return (
      <>
        <span className="page-hero-title__main">{parts[0]}. </span>
        <span className="page-hero-title__accent">{parts.slice(1).join('.').trim()}</span>
      </>
    )
  }

  // If title has 3+ words, highlight the last 2 words
  const words = title.trim().split(' ')
  if (words.length >= 3) {
    const main = words.slice(0, words.length - 2).join(' ')
    const accent = words.slice(words.length - 2).join(' ')
    return (
      <>
        <span className="page-hero-title__main">{main} </span>
        <span className="page-hero-title__accent">{accent}</span>
      </>
    )
  }

  // If title has 2 words, highlight the second word
  if (words.length === 2) {
    return (
      <>
        <span className="page-hero-title__main">{words[0]} </span>
        <span className="page-hero-title__accent">{words[1]}</span>
      </>
    )
  }

  return <>{title}</>
}

export default function PageHero({
  title,
  subtitle,
  eyebrow = "India's Integrated Professional Services Network",
  bgImage = '/hero/hero-1.png',
  bgPosition,
  children,
}: PageHeroProps) {
  return (
    <section className="page-hero-wrapper">
      {/* Background with Dark Frosted Gradient Overlay */}
      <div
        className="page-hero-bg"
        style={{
          backgroundImage: `url('${bgImage}')`,
          ...(bgPosition ? { backgroundPosition: bgPosition } : {}),
        }}
      />
      <div className="page-hero-overlay" />
      <div className="page-hero-overlay-radial" />

      <div className="container page-hero-container">
        {/* Direct Clean Content (Card removed for pure professional text presentation) */}
        <div className="page-hero-content">
          {/* Eyebrow with glowing gold indicator */}
          {eyebrow && (
            <div className="page-hero-eyebrow">
              <span className="page-hero-eyebrow__dot" />
              <span>{eyebrow}</span>
            </div>
          )}

          {/* Page Title */}
          <h1 className="page-hero-title">{renderPageTitle(title)}</h1>

          {/* Subtitle / Tagline */}
          {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}

          {children}
        </div>
      </div>
    </section>
  )
}
