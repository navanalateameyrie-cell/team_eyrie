import React from 'react'
import CorporateIcon from './CorporateIcon'

export interface CorporateCardProps {
  variant?: 'light' | 'glass-dark' | 'outline' | 'partner'
  iconName?: string
  iconColor?: string
  badge?: string
  number?: string
  title: string
  subtitle?: string
  description?: string
  items?: string[]
  linkHref?: string
  linkLabel?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export default function CorporateCard({
  variant = 'light',
  iconName,
  iconColor = '#1d4ed8',
  badge,
  number,
  title,
  subtitle,
  description,
  items,
  linkHref,
  linkLabel = 'Learn More →',
  children,
  style,
  className = '',
}: CorporateCardProps) {
  const isDark = variant === 'glass-dark'

  const content = (
    <>
      {/* Top row with Badge, Number, or Icon */}
      <div className="corporate-card__header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, width: '100%', marginBottom: 12 }}>
          {iconName && (
            <div
              className="corporate-card__icon-box"
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #1d4ed8 0%, #0f172a 100%)',
                border: '1.5px solid rgba(255, 255, 255, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 16px rgba(7, 26, 58, 0.25)',
              }}
            >
              <CorporateIcon name={iconName} size={24} color="#ffffff" strokeWidth={2.4} />
            </div>
          )}

          {badge && (
            <span
              className="corporate-card__badge"
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1.2,
                padding: '4px 10px',
                borderRadius: 20,
                background: isDark ? 'rgba(242, 101, 34, 0.15)' : 'rgba(29, 78, 216, 0.08)',
                color: isDark ? '#f26522' : '#1d4ed8',
                border: `1px solid ${isDark ? 'rgba(242, 101, 34, 0.35)' : 'rgba(29, 78, 216, 0.2)'}`,
              }}
            >
              {badge}
            </span>
          )}

          {number && (
            <span
              className="corporate-card__number"
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: '#1d4ed8',
                letterSpacing: 0.5,
                marginLeft: 'auto',
              }}
            >
              {number}
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="corporate-card__body">
        <h3
          className="corporate-card__title"
          style={{
            fontSize: 'clamp(19px, 1.35vw, 22px)',
            fontWeight: 700,
            color: isDark ? '#ffffff' : '#0f172a',
            margin: '0 0 6px',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>

        {subtitle && (
          <div
            className="corporate-card__subtitle"
            style={{
              color: '#1d4ed8',
              fontSize: 13.5,
              fontWeight: 700,
              letterSpacing: 0.3,
              marginBottom: 10,
            }}
          >
            {subtitle}
          </div>
        )}

        {description && (
          <p
            className="corporate-card__desc"
            style={{
              color: isDark ? '#cbd5e1' : '#64748b',
              fontSize: 14.5,
              lineHeight: 1.65,
              margin: items && items.length > 0 ? '0 0 16px' : 0,
              textAlign: 'justify',
              textJustify: 'inter-word',
            }}
          >
            {description}
          </p>
        )}

        {/* Optional Checklist Items */}
        {items && items.length > 0 && (
          <div
            className="corporate-card__items"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 10,
              marginTop: 16,
              paddingTop: 16,
              borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #98A2B3',
            }}
          >
            {items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13.5,
                  color: isDark ? '#e2e8f0' : '#334155',
                  fontWeight: 500,
                }}
              >
                <CorporateIcon name="check" size={15} color="#f26522" strokeWidth={2.5} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {children}

        {/* Optional Link CTA */}
        {linkHref && (
          <div
            className="corporate-card__footer"
            style={{
              marginTop: 16,
              paddingTop: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: '#1d4ed8',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            <span>{linkLabel}</span>
          </div>
        )}
      </div>
    </>
  )

  if (linkHref) {
    return (
      <a
        href={linkHref}
        className={`corporate-card corporate-card--${variant} corporate-card--clickable ${className}`}
        style={{ textDecoration: 'none', color: 'inherit', ...style }}
      >
        {content}
      </a>
    )
  }

  return (
    <div
      className={`corporate-card corporate-card--${variant} ${className}`}
      style={style}
    >
      {content}
    </div>
  )
}
