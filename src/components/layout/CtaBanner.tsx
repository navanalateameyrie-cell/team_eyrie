import React from 'react'

export interface CtaBannerProps {
  eyebrow?: string
  title: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  style?: React.CSSProperties
  className?: string
}

export default function CtaBanner({
  eyebrow = 'Partner with Team Eyrie',
  title = 'Ready to Build Value and Ensure Regulatory Precision?',
  description = 'Connect directly with our senior partners across assurance, taxation, corporate governance, and transaction advisory.',
  primaryLabel = 'Schedule Partner Consultation',
  primaryHref = '/contact',
  secondaryLabel,
  secondaryHref,
  style,
  className = '',
}: CtaBannerProps) {
  return (
    <div
      className={`cta-banner ${className}`}
      style={{
        marginTop: 32,
        background: 'linear-gradient(135deg, #ffffff 0%, #F8FAFC 100%)',
        border: '1.5px solid rgba(29, 78, 216, 0.18)',
        borderLeft: '5px solid #f26522',
        borderRadius: 14,
        padding: '28px 24px',
        textAlign: 'center',
        boxShadow: '0 8px 28px rgba(29, 78, 216, 0.08), 0 2px 8px rgba(0, 0, 0, 0.02)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Subtle backdrop glow */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, rgba(29, 78, 216, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 840, margin: '0 auto' }}>
        {eyebrow && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: '#1d4ed8',
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 2,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#f26522',
                boxShadow: '0 0 8px #f26522',
              }}
            />
            {eyebrow}
          </span>
        )}
        <h3
          style={{
            color: '#0f172a',
            fontSize: 'clamp(22px, 2vw, 28px)',
            fontWeight: 800,
            margin: '0 0 8px',
            lineHeight: 1.25,
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              color: '#475569',
              fontSize: 'clamp(14px, 1vw, 15.5px)',
              lineHeight: 1.55,
              margin: '0 auto 20px',
              maxWidth: 720,
            }}
          >
            {description}
          </p>
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            flexWrap: 'wrap',
          }}
        >
          {primaryLabel && primaryHref && (
            <a
              href={primaryHref}
              className="hero-btn hero-btn--gold"
              style={{ padding: '13px 32px', fontSize: 15 }}
            >
              <span>{primaryLabel}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: 6 }}
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          )}
          {secondaryLabel && secondaryHref && (
            <a
              href={secondaryHref}
              className="cta-banner-btn-secondary"
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
