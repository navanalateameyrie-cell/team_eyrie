'use client'

import React, { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global Error caught:', error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
          color: '#ffffff',
        }}
      >
        <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '500px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '16px' }}>Team Eyrie</h1>
          <p style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '28px', lineHeight: 1.6 }}>
            The application encountered a temporary error.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: '#f26522',
              color: '#ffffff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  )
}

