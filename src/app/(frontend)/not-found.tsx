import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404: Page Not Found — Team Eyrie',
  description: 'The page you are looking for might have been removed, renamed, or is temporarily unavailable.',
}

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        backgroundColor: '#f8fafc',
        fontFamily: 'var(--font-body, system-ui, -apple-system, sans-serif)',
      }}
    >
      <div
        style={{
          maxWidth: '720px',
          width: '100%',
          textAlign: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '56px 36px',
          boxShadow: '0 12px 36px rgba(15, 23, 42, 0.06)',
          border: '1px solid #e2e8f0',
        }}
      >
        {/* Eyebrow badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(29, 78, 216, 0.08)',
            color: '#1d4ed8',
            padding: '6px 16px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#f26522',
            }}
          />
          Error 404 • Page Not Found
        </div>

        {/* Big visual number */}
        <div
          style={{
            fontSize: 'clamp(64px, 12vw, 110px)',
            fontWeight: 900,
            lineHeight: 1,
            color: '#0f172a',
            letterSpacing: '-0.04em',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #1d4ed8 0%, #0f172a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: 'clamp(22px, 3.5vw, 28px)',
            fontWeight: 800,
            color: '#0f172a',
            margin: '0 0 16px',
            letterSpacing: '-0.02em',
          }}
        >
          The Page You Requested Was Not Found
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.65,
            color: '#64748b',
            maxWidth: '540px',
            margin: '0 auto 36px',
          }}
        >
          The link you followed may be broken, expired, or the page may have been moved during our recent portal enhancements. Explore our core services or return to the homepage.
        </p>

        {/* Primary Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#1d4ed8',
              color: '#ffffff',
              padding: '12px 26px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(29, 78, 216, 0.25)',
              transition: 'all 0.2s ease',
            }}
          >
            ← Back to Homepage
          </Link>
          <Link
            href="/services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#f8fafc',
              color: '#0f172a',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              border: '1.5px solid #cbd5e1',
            }}
          >
            Explore Services
          </Link>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#f26522',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(242, 101, 34, 0.25)',
            }}
          >
            Contact Team Eyrie
          </Link>
        </div>

        {/* Helpful Practice Links Grid */}
        <div
          style={{
            borderTop: '1px solid #e2e8f0',
            paddingTop: '28px',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '14px',
              textAlign: 'center',
            }}
          >
            Quick Navigation Links
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
            }}
          >
            <Link
              href="/about"
              style={{
                display: 'block',
                padding: '10px 14px',
                borderRadius: '6px',
                backgroundColor: '#f8fafc',
                color: '#1e293b',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid #e2e8f0',
              }}
            >
              🏛️ About Team Eyrie
            </Link>
            <Link
              href="/people"
              style={{
                display: 'block',
                padding: '10px 14px',
                borderRadius: '6px',
                backgroundColor: '#f8fafc',
                color: '#1e293b',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid #e2e8f0',
              }}
            >
              👥 Partners & Leadership
            </Link>
            <Link
              href="/careers"
              style={{
                display: 'block',
                padding: '10px 14px',
                borderRadius: '6px',
                backgroundColor: '#f8fafc',
                color: '#1e293b',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid #e2e8f0',
              }}
            >
              💼 Careers & Articleship
            </Link>
            <Link
              href="/resource-center"
              style={{
                display: 'block',
                padding: '10px 14px',
                borderRadius: '6px',
                backgroundColor: '#f8fafc',
                color: '#1e293b',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid #e2e8f0',
              }}
            >
              📚 Resource Center
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

