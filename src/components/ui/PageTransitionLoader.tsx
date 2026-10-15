'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransitionLoader() {
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [, startTransition] = useTransition()

  // Intercept click on internal links to start transition immediately
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Find closest anchor
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      if (!href) return

      // Skip external links, hash anchors, mailto, tel, target="_blank", or modifier clicks
      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        target.target === '_blank' ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey ||
        e.defaultPrevented
      ) {
        return
      }

      try {
        const targetUrl = new URL(href, window.location.origin)
        // Only trigger if navigation is internal and to a different path or query
        if (
          targetUrl.origin === window.location.origin &&
          (targetUrl.pathname !== window.location.pathname || targetUrl.search !== window.location.search)
        ) {
          startTransition(() => {
            setIsNavigating(true)
            setIsFadingOut(false)
          })
        }
      } catch {
        // invalid URL format, ignore
      }
    }

    document.addEventListener('click', handleClick, { capture: true })
    return () => document.removeEventListener('click', handleClick, { capture: true })
  }, [])

  // When pathname changes, navigation has completed -> trigger smooth fadeout
  useEffect(() => {
    if (isNavigating) {
      setIsFadingOut(true)
      const timer = setTimeout(() => {
        setIsNavigating(false)
        setIsFadingOut(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [pathname])

  // Safety fallback: if navigation takes unusually long or is aborted, hide after 4s
  useEffect(() => {
    if (isNavigating) {
      const safety = setTimeout(() => {
        setIsFadingOut(true)
        setTimeout(() => {
          setIsNavigating(false)
          setIsFadingOut(false)
        }, 300)
      }, 4000)
      return () => clearTimeout(safety)
    }
  }, [isNavigating])

  if (!isNavigating) return null

  return (
    <div
      className={`eyrie-loader-overlay ${isFadingOut ? 'eyrie-loader--fadeout' : ''}`}
      aria-live="polite"
      aria-busy="true"
    >
      {/* Soft radiant ambient aura matching reference */}
      <div className="eyrie-loader-aura" />

      {/* Center Brand Group */}
      <div className="eyrie-loader-center">
        <div className="eyrie-loader-emblem-wrap">
          <img
            src="/emblem_transparent.png"
            alt="Team Eyrie Emblem"
            className="eyrie-loader-emblem"
          />
          {/* Subtle gold diamond glint sparkle */}
          <span className="eyrie-loader-sparkle" aria-hidden="true">
            ✦
          </span>
        </div>

        <div className="eyrie-loader-brand">
          <h2 className="eyrie-loader-title">TEAM EYRIE</h2>
          <p className="eyrie-loader-tagline">ELEVATE. COLLABORATE. EXCEL.</p>
        </div>
      </div>

      {/* Bottom 3-Dot Synchronized Loader matching reference */}
      <div className="eyrie-loader-dots" aria-label="Loading page...">
        <span className="eyrie-dot eyrie-dot-1" />
        <span className="eyrie-dot eyrie-dot-2" />
        <span className="eyrie-dot eyrie-dot-3" />
      </div>
    </div>
  )
}

