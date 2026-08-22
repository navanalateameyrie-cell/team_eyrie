'use client'
import React, { useEffect } from 'react'

export const SidebarBranding: React.FC = () => {
  useEffect(() => {
    // Find the header or h1 that contains [Untitled] and hide it
    const hideUntitledText = () => {
      const headings = document.querySelectorAll('h1, h2, .doc-header__title')
      headings.forEach(h => {
        const el = h as HTMLElement;
        if (el.textContent?.trim() === '[Untitled]') {
          el.style.display = 'none'
          
          // Also hide the parent header container to remove its padding/margin
          const headerElement = el.closest('.doc-header, .collection-edit__header, header') as HTMLElement;
          if (headerElement) {
            headerElement.style.display = 'none';
          } else if (el.parentElement) {
            // Fallback: hide the immediate wrapper if it has no other significant siblings
            el.parentElement.style.display = 'none';
          }
        }
      })
    }
    
    hideUntitledText()
    
    // Observer to catch dynamically loaded titles
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          hideUntitledText()
        }
      }
    })
    
    observer.observe(document.body, { childList: true, subtree: true })
    
    return () => observer.disconnect()
  }, [])

  return (
    <div className="sidebar-branding-text" style={{
      position: 'absolute',
      top: '30px',
      left: '72px',
      color: 'var(--te-gold)',
      fontWeight: 800,
      fontSize: '13px',
      lineHeight: '1.4',
      letterSpacing: '1.5px',
      borderLeft: '2px solid rgba(176, 141, 87, 0.3)',
      paddingLeft: '16px',
      whiteSpace: 'nowrap',
      zIndex: 10,
      pointerEvents: 'none'
    }}>
      TEAM EYRIE <br /> ADMIN PANEL
    </div>
  )
}
