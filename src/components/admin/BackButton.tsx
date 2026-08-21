'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export const BackButton: React.FC = () => {
  const router = useRouter()
  const [leftPos, setLeftPos] = React.useState('320px')
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    
    const updatePosition = () => {
      const nav = document.querySelector('.nav')
      if (nav) {
        const rect = nav.getBoundingClientRect()
        // Place it completely outside the sidebar, 24px into the main content
        setLeftPos(`${rect.right + 24}px`)
      }
    }
    
    // Initial position
    setTimeout(updatePosition, 100)
    
    // Update on resize
    window.addEventListener('resize', updatePosition)
    
    // Update if sidebar toggles (Payload usually toggles classes on HTML/body or nav)
    const observer = new MutationObserver(updatePosition)
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class', 'style'] })
    
    return () => {
      window.removeEventListener('resize', updatePosition)
      observer.disconnect()
    }
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => router.back()}
      className="admin-back-btn"
      title="Go Back"
      style={{
        position: 'fixed',
        left: leftPos,
        top: '90px', // Safely below the global header
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        height: '36px',
        background: '#ffffff',
        border: '1px solid rgba(176, 141, 87, 0.3)',
        borderRadius: '50%',
        color: 'var(--te-gold)',
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 12px rgba(11, 19, 36, 0.08)'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'var(--te-gold)'
        e.currentTarget.style.color = '#ffffff'
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(176, 141, 87, 0.3)'
        e.currentTarget.style.border = '1px solid var(--te-gold)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = '#ffffff'
        e.currentTarget.style.color = 'var(--te-gold)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(11, 19, 36, 0.08)'
        e.currentTarget.style.border = '1px solid rgba(176, 141, 87, 0.3)'
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
  )
}
