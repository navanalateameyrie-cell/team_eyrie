import React from 'react'

export interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  theme?: 'light' | 'dark'
  maxWidth?: number | string
  className?: string
  showDot?: boolean
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  maxWidth = 920,
  className = '',
  showDot = true,
}: SectionHeaderProps) {
  const isDark = theme === 'dark'

  return (
    <div
      className={`section-header section-header--${align} section-header--${theme} ${className}`}
      style={{
        maxWidth,
        margin: align === 'center' ? '0 auto 28px' : '0 0 22px',
        textAlign: align,
      }}
    >
      {eyebrow && (
        <span
          className="section-header__eyebrow"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: isDark ? '#f26522' : '#1d4ed8',
            fontSize: 13.5,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 8,
          }}
        >
          {showDot && (
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#f26522',
                boxShadow: '0 0 6px #f26522',
              }}
            />
          )}
          {eyebrow}
        </span>
      )}
      <h2
        className="section-header__title"
        style={{
          fontSize: 'clamp(28px, 2.8vw, 38px)',
          fontWeight: 800,
          color: isDark ? '#ffffff' : '#0f172a',
          margin: '0 0 10px',
          lineHeight: 1.22,
          letterSpacing: '-0.2px',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="section-header__subtitle"
          style={{
            fontSize: 'clamp(16px, 1.2vw, 18px)',
            color: isDark ? '#cbd5e1' : '#475569',
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
