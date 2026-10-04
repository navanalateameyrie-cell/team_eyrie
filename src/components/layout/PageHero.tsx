import React from 'react'

export type Breadcrumb = { label: string; href?: string }

export interface PageHeroProps {
  title: string
  subtitle?: string
  eyebrow?: string
  crumbs?: Breadcrumb[]
  bgImage?: string
  children?: React.ReactNode
}

export default function PageHero({
  title,
  subtitle,
  eyebrow = "India's Integrated Professional Services Network",
  bgImage = '/hero/hero-1.png',
  children,
}: PageHeroProps) {
  return (
    <section className="page-hero-wrapper">
      {/* Background with Dark Frosted Gradient Overlay */}
      <div
        className="page-hero-bg"
        style={{
          backgroundImage: `url('${bgImage}')`,
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
          <h1 className="page-hero-title">{title}</h1>

          {/* Subtitle / Tagline */}
          {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}

          {children}
        </div>
      </div>
    </section>
  )
}
