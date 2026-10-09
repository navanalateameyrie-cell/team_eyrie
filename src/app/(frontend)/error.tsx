'use client'

import React, { useEffect } from 'react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Frontend Error caught:', error)
  }, [error])

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
        Something went wrong
      </h2>
      <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '480px', marginBottom: '24px', lineHeight: 1.6 }}>
        An unexpected error occurred while loading this page. Please try reloading or return to the homepage.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={() => reset()}
          style={{
            background: '#f26522',
            color: '#fff',
            border: 'none',
            padding: '10px 22px',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Try again
        </button>
        <a
          href="/"
          style={{
            background: '#0f172a',
            color: '#fff',
            textDecoration: 'none',
            padding: '10px 22px',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          Return Home
        </a>
      </div>
    </div>
  )
}

