'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          // Once revealed, keep it visible for smooth reading
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.08,
    })

    // Ensure all sections and cards are visible immediately
    const targets = document.querySelectorAll(
      'main > section, .section, .corporate-card, .pillar-hover-card, .section-header, .stats-strip, .network-grid'
    )

    targets.forEach((el) => {
      el.classList.add('is-revealed')
    })
  }, [pathname])

  return null
}
