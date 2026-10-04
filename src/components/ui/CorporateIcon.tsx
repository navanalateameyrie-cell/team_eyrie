import React from 'react'

interface IconProps {
  name: string
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
}

export default function CorporateIcon({
  name,
  size = 22,
  color = '#123B6D',
  strokeWidth = 2.2,
  className = '',
}: IconProps) {
  const svgProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  }

  switch (name) {
    case 'assurance':
    case 'shield':
      return (
        <svg {...svgProps}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    case 'tax':
    case 'scale':
      return (
        <svg {...svgProps}>
          <path d="M12 3v18" />
          <path d="M6 7.5h12" />
          <path d="M4 14.5l4-7 4 7H4z" />
          <path d="M12 14.5l4-7 4 7h-8z" />
        </svg>
      )
    case 'gst':
    case 'chart':
      return (
        <svg {...svgProps}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <path d="M3 20h18" />
        </svg>
      )
    case 'corporate':
    case 'landmark':
      return (
        <svg {...svgProps}>
          <line x1="3" y1="21" x2="21" y2="21" />
          <line x1="6" y1="18" x2="6" y2="11" />
          <line x1="10" y1="18" x2="10" y2="11" />
          <line x1="14" y1="18" x2="14" y2="11" />
          <line x1="18" y1="18" x2="18" y2="11" />
          <polygon points="12 2 3 7 21 7 12 2" />
        </svg>
      )
    case 'consulting':
    case 'briefcase':
      return (
        <svg {...svgProps}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    case 'transaction':
    case 'handshake':
      return (
        <svg {...svgProps}>
          <path d="m11 17 2 2a1 1 0 0 0 1.4 0l3.6-3.6" />
          <path d="m18 14 3-3a1 1 0 0 0 0-1.4l-4.6-4.6a1 1 0 0 0-1.4 0l-7 7" />
          <path d="m3 14 4.6-4.6a1 1 0 0 1 1.4 0l4 4" />
        </svg>
      )
    case 'family':
    case 'users':
      return (
        <svg {...svgProps}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'global':
    case 'globe':
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    case 'pin':
      return (
        <svg {...svgProps}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    case 'check':
      return (
        <svg {...svgProps}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )
    default:
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
  }
}
