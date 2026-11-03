'use client'

import React, { useEffect, useState } from 'react'

/**
 * Shows the site's unique-visit count in the top-right of the admin header.
 * Rendered only inside the authenticated admin panel, so only logged-in admins
 * see it. Reads the SiteStats global via Payload's REST API and refreshes it
 * once a minute.
 */
export default function VisitCountBadge() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let active = true

    const load = () => {
      fetch('/api/globals/site-stats?depth=0', { credentials: 'include' })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (active && data) setCount(Number(data.uniqueVisits ?? 0))
        })
        .catch(() => {})
    }

    load()
    const id = setInterval(load, 60_000)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [])

  if (count === null) return null

  return (
    <span
      title="Unique site visitors"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        marginInline: 8,
        borderRadius: 4,
        fontSize: 13,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        color: 'var(--theme-elevation-800)',
        background: 'var(--theme-elevation-100)',
        border: '1px solid var(--theme-elevation-150)',
      }}
    >
      <span aria-hidden>👁</span>
      {count.toLocaleString()} visits
    </span>
  )
}
