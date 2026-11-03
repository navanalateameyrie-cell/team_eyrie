'use client'

import { useEffect } from 'react'

/**
 * Fire-and-forget visit beacon. Pings /api/track-visit once per load; the route
 * dedupes by browser cookie so only genuinely new visitors increment the count.
 * Never blocks or affects rendering, and silently ignores failures.
 */
export default function VisitTracker() {
  useEffect(() => {
    fetch('/api/track-visit', { method: 'POST', keepalive: true }).catch(() => {})
  }, [])

  return null
}
