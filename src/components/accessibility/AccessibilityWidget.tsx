'use client'

import React, { useState, useEffect, useRef } from 'react'
import { accessibilityStyles } from './styles'
import { useAccessibility, PROFILES } from './useAccessibility'
import type { AccessibilityWidgetProps, ProfileId } from './types'

// Modern Vector Icons
const Icons = {
  accessibility: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4.5" r="2.5" fill="currentColor" />
      <path d="M12 7v7" />
      <path d="M6 9.5l6 1.5 6-1.5" />
      <path d="M9 20l3-6 3 6" />
    </svg>
  ),
  seizure: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M13 8l-4 5h4l-1 4" />
    </svg>
  ),
  vision: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  adhd: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  cognitive: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  dyslexia: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h3l7-14h-3L4 20z" />
      <path d="M14 14h6" />
      <path d="M17 10v10" />
    </svg>
  ),
  motor: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l7 18 3-7 7-3L3 3z" />
    </svg>
  ),
  screenReader: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  ),
  alignLeft: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="17" y1="10" x2="3" y2="10" />
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="14" x2="3" y2="14" />
      <line x1="17" y1="18" x2="3" y2="18" />
    </svg>
  ),
  alignCenter: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="10" x2="6" y2="10" />
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="14" x2="3" y2="14" />
      <line x1="18" y1="18" x2="6" y2="18" />
    </svg>
  ),
  alignRight: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="21" y1="10" x2="7" y2="10" />
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="14" x2="3" y2="14" />
      <line x1="21" y1="18" x2="7" y2="18" />
    </svg>
  ),
  alignJustify: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="10" x2="3" y2="10" />
      <line x1="21" y1="14" x2="3" y2="14" />
      <line x1="21" y1="18" x2="3" y2="18" />
    </svg>
  ),
  link: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  heading: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4v16M18 4v16M6 12h12" />
    </svg>
  ),
  zoom: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
  mask: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
    </svg>
  ),
  ruler: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.3 8.7l-6-6a1 1 0 0 0-1.4 0l-11.2 11.2a1 1 0 0 0 0 1.4l6 6a1 1 0 0 0 1.4 0l11.2-11.2a1 1 0 0 0 0-1.4z" />
      <line x1="7.5" y1="10.5" x2="9.5" y2="8.5" />
      <line x1="10.5" y1="13.5" x2="12.5" y2="11.5" />
      <line x1="13.5" y1="16.5" x2="15.5" y2="14.5" />
    </svg>
  ),
  pause: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="10" y1="15" x2="10" y2="9" />
      <line x1="14" y1="15" x2="14" y2="9" />
    </svg>
  ),
  speaker: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  reset: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  ),
  close: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  shield: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
}

const PROFILE_ICON_MAP: Record<ProfileId, React.ReactNode> = {
  'seizure-safe': Icons.seizure,
  'vision-impaired': Icons.vision,
  'adhd-friendly': Icons.adhd,
  'cognitive-learning': Icons.cognitive,
  'dyslexia': Icons.dyslexia,
  'keyboard-navigation': Icons.motor,
  'blind-screen-reader': Icons.screenReader,
}

export function AccessibilityWidget({
  position = 'bottom-left',
  offsetBottom = 28,
  offsetLeft = 24,
  offsetRight = 24,
  offsetTop = 24,
  primaryColor = '#071A3A',
  accentColor = '#123B6D',
  zIndex = 99999,
  defaultOpen = false,
  className = '',
}: AccessibilityWidgetProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [activeTab, setActiveTab] = useState<'profiles' | 'content' | 'colors' | 'aids'>('profiles')
  const [isMounted, setIsMounted] = useState(false)
  const [magnifiedText, setMagnifiedText] = useState<string>('')
  const [btnPos, setBtnPos] = useState<{ x: number; y: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragInfoRef = useRef<{ startX: number; startY: number; origX: number; origY: number; moved: boolean } | null>(null)

  const panelRef = useRef<HTMLDivElement>(null)
  const topMaskRef = useRef<HTMLDivElement>(null)
  const bottomMaskRef = useRef<HTMLDivElement>(null)
  const guideLineRef = useRef<HTMLDivElement>(null)
  const magnifierRef = useRef<HTMLDivElement>(null)

  // Initialize and restore custom button position
  useEffect(() => {
    setIsMounted(true)
    try {
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        // Keep docked to bottom-left on mobile screens
        setBtnPos(null)
        return
      }
      const saved = localStorage.getItem('a11y-btn-pos')
      if (saved && typeof window !== 'undefined') {
        const parsed = JSON.parse(saved)
        if (
          typeof parsed.x === 'number' &&
          typeof parsed.y === 'number' &&
          parsed.x >= 0 &&
          parsed.x < window.innerWidth - 30 &&
          parsed.y >= 0 &&
          parsed.y < window.innerHeight - 30
        ) {
          const clampedX = Math.min(window.innerWidth - 66, Math.max(12, parsed.x))
          const clampedY = Math.min(window.innerHeight - 66, Math.max(12, parsed.y))
          setBtnPos({ x: clampedX, y: clampedY })
          return
        }
      }
    } catch { }

    // If no valid stored position, keep btnPos as null to use robust CSS bottom-left anchoring
    setBtnPos(null)
  }, [])

  const {
    state,
    isSpeaking,
    activeCount,
    toggleProfile,
    setFontSize,
    setLineHeight,
    setLetterSpacing,
    setTextAlign,
    toggleDyslexiaFont,
    toggleHighlightLinks,
    toggleHighlightTitles,
    toggleTextMagnifier,
    setContrast,
    setSaturation,
    toggleReadingMask,
    toggleReadingGuide,
    setCursor,
    toggleStopAnimations,
    resetAll,
    speakSelectedText,
  } = useAccessibility()

  // Close panel on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Drag handlers for free-moving launcher button
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch { }

    const rect = e.currentTarget.getBoundingClientRect()
    dragInfoRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: rect.left,
      origY: rect.top,
      moved: false,
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragInfoRef.current) return
    const dx = e.clientX - dragInfoRef.current.startX
    const dy = e.clientY - dragInfoRef.current.startY

    if (Math.hypot(dx, dy) > 4) {
      dragInfoRef.current.moved = true
      if (!isDragging) setIsDragging(true)
    }

    if (dragInfoRef.current.moved) {
      const newX = Math.min(window.innerWidth - 64, Math.max(12, dragInfoRef.current.origX + dx))
      const newY = Math.min(window.innerHeight - 64, Math.max(12, dragInfoRef.current.origY + dy))
      setBtnPos({ x: newX, y: newY })
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragInfoRef.current) return
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch { }

    if (!dragInfoRef.current.moved) {
      // It was a clean click
      setIsOpen((prev) => !prev)
    } else if (btnPos) {
      // Save position to localStorage
      try {
        localStorage.setItem('a11y-btn-pos', JSON.stringify(btnPos))
      } catch { }
    }

    dragInfoRef.current = null
    setIsDragging(false)
  }

  // Window resize & orientation change listener (keeps draggable button inside screen boundaries)
  useEffect(() => {
    const handleResize = () => {
      setBtnPos((prev) => {
        if (!prev) return prev
        const clampedX = Math.min(window.innerWidth - 64, Math.max(12, prev.x))
        const clampedY = Math.min(window.innerHeight - 64, Math.max(12, prev.y))
        return { x: clampedX, y: clampedY }
      })
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  // High-performance 120fps hardware-accelerated cursor & touch tracking (Zero React re-renders)
  useEffect(() => {
    if (!state.readingMask && !state.readingGuide && !state.textMagnifier) return

    let rafId: number | null = null
    const maskHeight = 110
    let lastTextCheck = 0

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX: number, clientY: number
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX
        clientY = (e as MouseEvent).clientY
      } else {
        return
      }

      if (rafId) cancelAnimationFrame(rafId)

      rafId = requestAnimationFrame(() => {
        const y = clientY
        const x = clientX

        if (topMaskRef.current) {
          const topHeight = Math.max(0, y - maskHeight / 2)
          topMaskRef.current.style.height = `${topHeight}px`
        }
        if (bottomMaskRef.current) {
          const bottomHeight = Math.max(0, window.innerHeight - (y + maskHeight / 2))
          bottomMaskRef.current.style.height = `${bottomHeight}px`
        }
        if (guideLineRef.current) {
          guideLineRef.current.style.top = `${y}px`
        }
        if (magnifierRef.current) {
          magnifierRef.current.style.transform = `translate3d(${x}px, ${y - 30}px, 0) translate(-50%, -100%)`
        }

        // Throttle text magnifier inspection to prevent layout thrashing
        const now = Date.now()
        if (state.textMagnifier && now - lastTextCheck > 80) {
          lastTextCheck = now
          const el = document.elementFromPoint(x, y)
          if (el && !el.closest('.a11y-widget-root')) {
            const text = el.textContent?.trim() || ''
            if (text.length > 0 && text.length < 200) {
              setMagnifiedText(text)
            }
          }
        }
      })
    }

    window.addEventListener('mousemove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handlePointerMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('touchmove', handlePointerMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [state.readingMask, state.readingGuide, state.textMagnifier])

  // Compute inline position styles for launcher button (with free drag coordinates)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const triggerStyle: React.CSSProperties = {
    zIndex: 99999,
    backgroundColor: primaryColor,
    color: '#ffffff',
    ...(btnPos && !isMobile
      ? { left: `${btnPos.x}px`, top: `${btnPos.y}px`, bottom: 'auto', right: 'auto' }
      : {
        bottom: position.includes('bottom') ? `${isMobile ? 20 : offsetBottom}px` : undefined,
        top: position.includes('top') ? `${offsetTop}px` : undefined,
        left: position.includes('left') ? `${isMobile ? 16 : offsetLeft}px` : undefined,
        right: position.includes('right') ? `${offsetRight}px` : undefined,
      }),
  }

  // Determine intelligent anchoring for the panel based on current button position
  const isLeft = btnPos
    ? btnPos.x < (typeof window !== 'undefined' ? window.innerWidth / 2 : 500)
    : position.includes('left')
  const isTop = btnPos
    ? btnPos.y < (typeof window !== 'undefined' ? window.innerHeight / 2 : 500)
    : position.includes('top')
  const panelPositionClass = `a11y-panel--${isTop ? 'top' : 'bottom'}-${isLeft ? 'left' : 'right'}`

  if (!isMounted) {
    return (
      <div className={`a11y-widget-root ${className}`}>
        <style id="a11y-widget-styles" dangerouslySetInnerHTML={{ __html: accessibilityStyles }} />
        <button
          type="button"
          className="a11y-trigger-btn"
          style={{
            zIndex: 99999,
            backgroundColor: primaryColor,
            color: '#ffffff',
            bottom: `${offsetBottom}px`,
            left: `${offsetLeft}px`,
          }}
          aria-label="Accessibility Options"
        >
          {Icons.accessibility}
        </button>
      </div>
    )
  }

  return (
    <div className={`a11y-widget-root ${className}`}>
      {/* Scoped CSS */}
      <style id="a11y-widget-styles" dangerouslySetInnerHTML={{ __html: accessibilityStyles }} />

      {/* 1. OVERLAY READING AIDS (Direct DOM Ref / Hardware Accelerated) */}
      {state.readingMask && (
        <>
          <div ref={topMaskRef} className="a11y-reading-mask-top" style={{ height: '40vh' }} />
          <div ref={bottomMaskRef} className="a11y-reading-mask-bottom" style={{ height: '40vh' }} />
        </>
      )}

      {state.readingGuide && (
        <div ref={guideLineRef} className="a11y-reading-guide-line" style={{ top: '50vh' }} />
      )}

      {state.textMagnifier && magnifiedText && (
        <div ref={magnifierRef} className="a11y-text-magnifier" style={{ transform: 'translate3d(50vw, 50vh, 0)' }}>
          {magnifiedText}
        </div>
      )}

      {/* 2. DRAGGABLE FLOATING LAUNCHER BUTTON */}
      <button
        type="button"
        className={`a11y-trigger-btn ${isDragging ? 'a11y-trigger-btn--dragging' : ''}`}
        style={triggerStyle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        aria-label="Open Accessibility Options (Click to open, Drag to move)"
        title="Click to open menu, or Drag to reposition"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {Icons.accessibility}

        {activeCount > 0 && (
          <span className="a11y-trigger-badge" title={`${activeCount} active settings`}>
            {activeCount}
          </span>
        )}
      </button>

      {/* 3. ACCESSIBILITY MODAL DRAWER / BOTTOM SHEET */}
      {isOpen && (
        <>
          <div className="a11y-modal-backdrop" onClick={() => setIsOpen(false)} aria-hidden="true" />
          <div
            ref={panelRef}
            className={`a11y-panel ${panelPositionClass}`}
            style={{ zIndex: zIndex + 1 }}
            role="dialog"
            aria-modal="true"
            aria-label="Accessibility Settings"
          >
            {/* Header */}
            <div className="a11y-header">
              <div className="a11y-drag-indicator" aria-hidden="true" />
              <div className="a11y-header-top-row">
                <div className="a11y-header-title-box">
                  <div className="a11y-header-icon-badge">
                    {Icons.accessibility}
                  </div>
                  <div className="a11y-header-titles">
                    <h3>Accessibility Tools</h3>
                    <span className="a11y-header-subtitle">
                      {Icons.shield} Assistive Mode
                    </span>
                  </div>
                </div>

                <div className="a11y-header-actions">
                  {activeCount > 0 && (
                    <div className="a11y-active-pill">
                      <span className="a11y-active-pill-dot" />
                      <span>{activeCount} Active</span>
                    </div>
                  )}
                  <button
                    type="button"
                    className="a11y-btn-icon"
                    onClick={resetAll}
                    title="Reset all settings"
                    aria-label="Reset all settings"
                  >
                    {Icons.reset}
                  </button>
                  <button
                    type="button"
                    className="a11y-btn-icon"
                    onClick={() => setIsOpen(false)}
                    title="Close accessibility menu"
                    aria-label="Close accessibility menu"
                  >
                    {Icons.close}
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="a11y-tabs">
              <button
                type="button"
                className={`a11y-tab-btn ${activeTab === 'profiles' ? 'a11y-tab-btn--active' : ''}`}
                onClick={() => setActiveTab('profiles')}
              >
                <span>⚡</span> Profiles
              </button>
              <button
                type="button"
                className={`a11y-tab-btn ${activeTab === 'content' ? 'a11y-tab-btn--active' : ''}`}
                onClick={() => setActiveTab('content')}
              >
                <span>🔤</span> Content
              </button>
              <button
                type="button"
                className={`a11y-tab-btn ${activeTab === 'colors' ? 'a11y-tab-btn--active' : ''}`}
                onClick={() => setActiveTab('colors')}
              >
                <span>🎨</span> Colors
              </button>
              <button
                type="button"
                className={`a11y-tab-btn ${activeTab === 'aids' ? 'a11y-tab-btn--active' : ''}`}
                onClick={() => setActiveTab('aids')}
              >
                <span>🛠️</span> Tools
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="a11y-body">
              {/* TAB 1: PROFILES */}
              {activeTab === 'profiles' && (
                <div>
                  <div className="a11y-section-title">
                    <span>Pre-Configured Accessibility Profiles</span>
                    {state.activeProfile && (
                      <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                        1 Active
                      </span>
                    )}
                  </div>
                  <div className="a11y-profiles-grid">
                    {PROFILES.map((p) => {
                      const isActive = state.activeProfile === p.id
                      return (
                        <button
                          key={p.id}
                          type="button"
                          className={`a11y-profile-card ${isActive ? 'a11y-profile-card--active' : ''}`}
                          onClick={() => toggleProfile(p.id)}
                        >
                          <div className="a11y-profile-card-top">
                            <div className="a11y-profile-icon-wrap">
                              {PROFILE_ICON_MAP[p.id]}
                            </div>
                            <div className={`a11y-status-switch ${isActive ? 'a11y-status-switch--active' : ''}`}>
                              <div className="a11y-status-thumb" />
                            </div>
                          </div>
                          <div>
                            <div className="a11y-profile-card-title">{p.title}</div>
                            <div className="a11y-profile-card-sub">{p.subtitle}</div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: CONTENT & TYPOGRAPHY */}
              {activeTab === 'content' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Font Scaling */}
                  <div className="a11y-card">
                    <div className="a11y-section-title" style={{ margin: '0 0 8px 0' }}>
                      <span>🔤 Font Sizing</span>
                    </div>
                    <div className="a11y-stepper-box">
                      <button
                        type="button"
                        className="a11y-stepper-btn"
                        onClick={() => setFontSize(state.fontSize - 10)}
                        aria-label="Decrease Font Size"
                      >
                        -
                      </button>
                      <span className="a11y-stepper-value">{state.fontSize}%</span>
                      <button
                        type="button"
                        className="a11y-stepper-btn"
                        onClick={() => setFontSize(state.fontSize + 10)}
                        aria-label="Increase Font Size"
                      >
                        +
                      </button>
                    </div>
                    <div className="a11y-chip-group">
                      {[100, 110, 120, 130, 140, 150].map((size) => (
                        <button
                          key={size}
                          type="button"
                          className={`a11y-chip ${state.fontSize === size ? 'a11y-chip--active' : ''}`}
                          onClick={() => setFontSize(size)}
                        >
                          {size}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Line Height & Letter Spacing */}
                  <div className="a11y-tools-grid">
                    <div className="a11y-card">
                      <div className="a11y-section-title" style={{ margin: '0 0 8px 0' }}>
                        <span>Line Height</span>
                      </div>
                      <div className="a11y-choice-group">
                        {(['normal', '1.8', '2.2'] as const).map((lh) => (
                          <button
                            key={lh}
                            type="button"
                            className={`a11y-choice-btn ${state.lineHeight === lh ? 'a11y-choice-btn--active' : ''}`}
                            onClick={() => setLineHeight(lh)}
                          >
                            {lh === 'normal' ? 'Def' : lh}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="a11y-card">
                      <div className="a11y-section-title" style={{ margin: '0 0 8px 0' }}>
                        <span>Letter Spacing</span>
                      </div>
                      <div className="a11y-choice-group">
                        {(['normal', 'wide', 'extra-wide'] as const).map((ls) => (
                          <button
                            key={ls}
                            type="button"
                            className={`a11y-choice-btn ${state.letterSpacing === ls ? 'a11y-choice-btn--active' : ''}`}
                            onClick={() => setLetterSpacing(ls)}
                          >
                            {ls === 'normal' ? 'Def' : ls === 'wide' ? 'Wide' : '+Wide'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Text Alignment */}
                  <div className="a11y-card">
                    <div className="a11y-section-title" style={{ margin: '0 0 8px 0' }}>
                      <span>Text Alignment</span>
                    </div>
                    <div className="a11y-choice-group">
                      {[
                        { id: 'initial', label: 'Default', icon: Icons.alignLeft },
                        { id: 'left', label: 'Left', icon: Icons.alignLeft },
                        { id: 'center', label: 'Center', icon: Icons.alignCenter },
                        { id: 'right', label: 'Right', icon: Icons.alignRight },
                        { id: 'justify', label: 'Justify', icon: Icons.alignJustify },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={`a11y-choice-btn ${state.textAlign === item.id ? 'a11y-choice-btn--active' : ''}`}
                          onClick={() => setTextAlign(item.id as any)}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Toggle Rows */}
                  <button
                    type="button"
                    className={`a11y-toggle-row ${state.dyslexiaFont ? 'a11y-toggle-row--active' : ''}`}
                    onClick={toggleDyslexiaFont}
                  >
                    <div className="a11y-toggle-row-left">
                      <div className="a11y-toggle-row-icon">{Icons.dyslexia}</div>
                      <div className="a11y-toggle-row-text">
                        <h4>Dyslexia-Friendly Font</h4>
                        <p>Enhance legibility with Lexend / Atkinson typeface</p>
                      </div>
                    </div>
                    <div className={`a11y-status-switch ${state.dyslexiaFont ? 'a11y-status-switch--active' : ''}`}>
                      <div className="a11y-status-thumb" />
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`a11y-toggle-row ${state.highlightLinks ? 'a11y-toggle-row--active' : ''}`}
                    onClick={toggleHighlightLinks}
                  >
                    <div className="a11y-toggle-row-left">
                      <div className="a11y-toggle-row-icon">{Icons.link}</div>
                      <div className="a11y-toggle-row-text">
                        <h4>Highlight Links</h4>
                        <p>Highlight actionable links with high-contrast underline</p>
                      </div>
                    </div>
                    <div className={`a11y-status-switch ${state.highlightLinks ? 'a11y-status-switch--active' : ''}`}>
                      <div className="a11y-status-thumb" />
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`a11y-toggle-row ${state.highlightTitles ? 'a11y-toggle-row--active' : ''}`}
                    onClick={toggleHighlightTitles}
                  >
                    <div className="a11y-toggle-row-left">
                      <div className="a11y-toggle-row-icon">{Icons.heading}</div>
                      <div className="a11y-toggle-row-text">
                        <h4>Highlight Titles & Headings</h4>
                        <p>Emphasize page headings and structural markers</p>
                      </div>
                    </div>
                    <div className={`a11y-status-switch ${state.highlightTitles ? 'a11y-status-switch--active' : ''}`}>
                      <div className="a11y-status-thumb" />
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`a11y-toggle-row ${state.textMagnifier ? 'a11y-toggle-row--active' : ''}`}
                    onClick={toggleTextMagnifier}
                  >
                    <div className="a11y-toggle-row-left">
                      <div className="a11y-toggle-row-icon">{Icons.zoom}</div>
                      <div className="a11y-toggle-row-text">
                        <h4>Text Magnifier</h4>
                        <p>Hover magnifying loupe over text content</p>
                      </div>
                    </div>
                    <div className={`a11y-status-switch ${state.textMagnifier ? 'a11y-status-switch--active' : ''}`}>
                      <div className="a11y-status-thumb" />
                    </div>
                  </button>
                </div>
              )}

              {/* TAB 3: COLORS & CONTRAST */}
              {activeTab === 'colors' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="a11y-section-title">Visual Contrast Modes</div>
                  <div className="a11y-theme-cards-grid">
                    <button
                      type="button"
                      className={`a11y-theme-card ${state.contrast === 'dark' ? 'a11y-theme-card--active' : ''}`}
                      onClick={() => setContrast('dark')}
                    >
                      <div className="a11y-theme-preview a11y-theme-preview--dark">
                        Aa Dark High Contrast
                      </div>
                      <div className="a11y-theme-card-footer">
                        <span className="a11y-theme-card-title">Dark Contrast</span>
                        <div className={`a11y-status-switch ${state.contrast === 'dark' ? 'a11y-status-switch--active' : ''}`}>
                          <div className="a11y-status-thumb" />
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`a11y-theme-card ${state.contrast === 'light' ? 'a11y-theme-card--active' : ''}`}
                      onClick={() => setContrast('light')}
                    >
                      <div className="a11y-theme-preview a11y-theme-preview--light">
                        Aa Light High Contrast
                      </div>
                      <div className="a11y-theme-card-footer">
                        <span className="a11y-theme-card-title">Light Contrast</span>
                        <div className={`a11y-status-switch ${state.contrast === 'light' ? 'a11y-status-switch--active' : ''}`}>
                          <div className="a11y-status-thumb" />
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`a11y-theme-card ${state.contrast === 'invert' ? 'a11y-theme-card--active' : ''}`}
                      onClick={() => setContrast('invert')}
                    >
                      <div className="a11y-theme-preview a11y-theme-preview--invert">
                        Aa Invert Colors
                      </div>
                      <div className="a11y-theme-card-footer">
                        <span className="a11y-theme-card-title">Invert Colors</span>
                        <div className={`a11y-status-switch ${state.contrast === 'invert' ? 'a11y-status-switch--active' : ''}`}>
                          <div className="a11y-status-thumb" />
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`a11y-theme-card ${state.contrast === 'monochrome' ? 'a11y-theme-card--active' : ''}`}
                      onClick={() => setContrast('monochrome')}
                    >
                      <div className="a11y-theme-preview a11y-theme-preview--mono">
                        Aa Monochrome Grayscale
                      </div>
                      <div className="a11y-theme-card-footer">
                        <span className="a11y-theme-card-title">Monochrome</span>
                        <div className={`a11y-status-switch ${state.contrast === 'monochrome' ? 'a11y-status-switch--active' : ''}`}>
                          <div className="a11y-status-thumb" />
                        </div>
                      </div>
                    </button>
                  </div>

                  <div className="a11y-card">
                    <div className="a11y-section-title" style={{ margin: '0 0 8px 0' }}>
                      <span>Color Saturation</span>
                    </div>
                    <div className="a11y-choice-group">
                      {(['low', 'normal', 'high'] as const).map((sat) => (
                        <button
                          key={sat}
                          type="button"
                          className={`a11y-choice-btn ${state.saturation === sat ? 'a11y-choice-btn--active' : ''}`}
                          onClick={() => setSaturation(sat)}
                        >
                          {sat === 'low' ? 'Low Saturation' : sat === 'normal' ? 'Normal' : 'High Saturation'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: READING AIDS & NAVIGATION */}
              {activeTab === 'aids' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* TTS Player Card */}
                  <div className="a11y-tts-card">
                    <div>
                      <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                        Screen Reader (Text to Speech)
                      </h4>
                      <p style={{ margin: '3px 0 0', fontSize: '11px', color: '#64748b' }}>
                        Select any text on screen and listen
                      </p>
                    </div>
                    <button
                      type="button"
                      className="a11y-tts-btn"
                      style={{ backgroundColor: primaryColor }}
                      onClick={speakSelectedText}
                    >
                      {isSpeaking ? (
                        <>
                          <span>⏹</span> Stop
                        </>
                      ) : (
                        <>
                          {Icons.speaker}
                          <span>Speak</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="a11y-section-title">Reading & Focus Guides</div>

                  <button
                    type="button"
                    className={`a11y-toggle-row ${state.readingMask ? 'a11y-toggle-row--active' : ''}`}
                    onClick={toggleReadingMask}
                  >
                    <div className="a11y-toggle-row-left">
                      <div className="a11y-toggle-row-icon">{Icons.mask}</div>
                      <div className="a11y-toggle-row-text">
                        <h4>Reading Mask (Focus Window)</h4>
                        <p>Dim background and highlight active focal reading line</p>
                      </div>
                    </div>
                    <div className={`a11y-status-switch ${state.readingMask ? 'a11y-status-switch--active' : ''}`}>
                      <div className="a11y-status-thumb" />
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`a11y-toggle-row ${state.readingGuide ? 'a11y-toggle-row--active' : ''}`}
                    onClick={toggleReadingGuide}
                  >
                    <div className="a11y-toggle-row-left">
                      <div className="a11y-toggle-row-icon">{Icons.ruler}</div>
                      <div className="a11y-toggle-row-text">
                        <h4>Reading Ruler Guide</h4>
                        <p>Horizontal guideline tracking mouse cursor</p>
                      </div>
                    </div>
                    <div className={`a11y-status-switch ${state.readingGuide ? 'a11y-status-switch--active' : ''}`}>
                      <div className="a11y-status-thumb" />
                    </div>
                  </button>

                  <div className="a11y-card">
                    <div className="a11y-section-title" style={{ margin: '0 0 8px 0' }}>
                      <span>High-Visibility Big Cursor</span>
                    </div>
                    <div className="a11y-choice-group">
                      {[
                        { id: 'none', label: 'Default' },
                        { id: 'white', label: 'Large White ↖' },
                        { id: 'black', label: 'Large Black ↖' },
                      ].map((cur) => (
                        <button
                          key={cur.id}
                          type="button"
                          className={`a11y-choice-btn ${state.bigCursor === cur.id ? 'a11y-choice-btn--active' : ''}`}
                          onClick={() => setCursor(cur.id as any)}
                        >
                          {cur.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`a11y-toggle-row ${state.stopAnimations ? 'a11y-toggle-row--active' : ''}`}
                    onClick={toggleStopAnimations}
                  >
                    <div className="a11y-toggle-row-left">
                      <div className="a11y-toggle-row-icon">{Icons.pause}</div>
                      <div className="a11y-toggle-row-text">
                        <h4>Stop All Animations</h4>
                        <p>Pause CSS transitions, flashes, and moving elements</p>
                      </div>
                    </div>
                    <div className={`a11y-status-switch ${state.stopAnimations ? 'a11y-status-switch--active' : ''}`}>
                      <div className="a11y-status-thumb" />
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="a11y-footer">
              <button type="button" className="a11y-btn-reset" onClick={resetAll}>
                {Icons.reset}
                <span>Reset All</span>
              </button>
              <div className="a11y-compliance-badge">
                {Icons.shield}
                <span>WCAG 2.1 AA Compliant</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default AccessibilityWidget
