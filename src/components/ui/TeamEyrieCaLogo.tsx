'use client'

import React from 'react'

interface LogoProps {
  className?: string
  height?: number | string
  lightMode?: boolean
  customLogoUrl?: string | null
}

export default function TeamEyrieCaLogo({
  className = '',
  height = 52,
  lightMode = false,
  customLogoUrl,
}: LogoProps) {
  const logoSrc = customLogoUrl || '/logo.png'
  const numericHeight = typeof height === 'number' ? height : parseInt(height, 10) || 52

  if (lightMode) {
    return (
      <div
        className={`brand-logo-wrapper brand-logo-wrapper--light ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: '#ffffff',
          padding: '6px 16px',
          borderRadius: '8px',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
        }}
      >
        <img
          src={logoSrc}
          alt="Team Eyrie - Chartered Accountants India"
          style={{
            height: `${numericHeight}px`,
            width: 'auto',
            maxWidth: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
    )
  }

  return (
    <div
      className={`brand-logo-wrapper ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      <img
        src={logoSrc}
        alt="Team Eyrie - Chartered Accountants India"
        style={{
          height: `${numericHeight}px`,
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  )
}
