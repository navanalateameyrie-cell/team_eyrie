'use client'

import React, { useEffect, useState, useCallback } from 'react'

/**
 * Self-hosted cookie-consent widget modelled on the Cookiebot UX:
 *  - First visit: banner with Deny / Allow selection / Allow all + Customize.
 *  - After consent: a floating button reopens the settings panel showing the
 *    "current state", the consent date, and a stable consent ID.
 *  - The visitor can later Change or Withdraw consent.
 * Every accept/change/withdraw is also logged to Postgres (via Payload REST)
 * as an append-only audit trail. Client state lives in a 1-year cookie.
 */

const COOKIE_NAME = 'te-cookie-consent'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

type Categories = {
  necessary: true
  preferences: boolean
  statistics: boolean
  marketing: boolean
}

type Consent = {
  id: string
  date: string // ISO
  categories: Categories
}

const BRAND = '#1f3864'
const ACCENT = '#b08d57'

function readConsent(): Consent | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${COOKIE_NAME}=`))
  if (!match) return null
  try {
    return JSON.parse(decodeURIComponent(match.split('=').slice(1).join('=')))
  } catch {
    return null
  }
}

function writeConsent(consent: Consent) {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(consent),
  )}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

function genConsentId(): string {
  const arr = new Uint8Array(24)
  crypto.getRandomValues(arr)
  let bin = ''
  arr.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin)
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    })
  } catch {
    return iso
  }
}

const CATEGORY_META: { key: keyof Categories; label: string; desc: string }[] = [
  { key: 'necessary', label: 'Necessary', desc: 'Essential for the website to function. Always active.' },
  { key: 'preferences', label: 'Preferences', desc: 'Remember choices such as language or region.' },
  { key: 'statistics', label: 'Statistics', desc: 'Help us understand how visitors use the site (analytics).' },
  { key: 'marketing', label: 'Marketing', desc: 'Used to deliver and measure relevant communications.' },
]

async function logConsent(consent: Consent, action: 'accepted' | 'updated' | 'withdrawn') {
  try {
    await fetch('/api/consent-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        consentId: consent.id,
        action,
        necessary: true,
        preferences: consent.categories.preferences,
        statistics: consent.categories.statistics,
        marketing: consent.categories.marketing,
        consentDate: consent.date,
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    })
  } catch {
    // Logging is best-effort; the visitor's cookie is the source of truth client-side.
  }
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false)
  const [consent, setConsent] = useState<Consent | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [mode, setMode] = useState<'banner' | 'state' | 'edit'>('banner')
  const [showDetails, setShowDetails] = useState(false)
  const [draft, setDraft] = useState<Categories>({
    necessary: true,
    preferences: false,
    statistics: false,
    marketing: false,
  })

  useEffect(() => {
    setMounted(true)
    const existing = readConsent()
    if (existing) {
      setConsent(existing)
      setDraft(existing.categories)
      setPanelOpen(false)
    } else {
      setPanelOpen(true)
      setMode('banner')
    }
  }, [])

  const persist = useCallback(
    (categories: Categories, action: 'accepted' | 'updated' | 'withdrawn') => {
      const next: Consent = {
        id: consent?.id ?? genConsentId(),
        date: new Date().toISOString(),
        categories,
      }
      writeConsent(next)
      setConsent(next)
      setDraft(categories)
      void logConsent(next, action)
      return next
    },
    [consent],
  )

  const acceptAll = () =>
    persist({ necessary: true, preferences: true, statistics: true, marketing: true }, consent ? 'updated' : 'accepted')

  const denyAll = () =>
    persist({ necessary: true, preferences: false, statistics: false, marketing: false }, consent ? 'updated' : 'accepted')

  const allowSelection = () => persist({ ...draft, necessary: true }, consent ? 'updated' : 'accepted')

  const withdraw = () => {
    persist({ necessary: true, preferences: false, statistics: false, marketing: false }, 'withdrawn')
    setMode('state')
  }

  if (!mounted) return null

  // Floating reopen button when a decision has been made and the panel is closed.
  const floatingButton = consent && !panelOpen && (
    <button
      aria-label="Cookie settings"
      onClick={() => {
        setMode('state')
        setPanelOpen(true)
      }}
      style={{
        position: 'fixed',
        left: 12,
        bottom: 12,
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: BRAND,
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
        fontSize: 16,
        zIndex: 9998,
      }}
    >
      🍪
    </button>
  )

  if (!panelOpen) return floatingButton

  // ---- First-visit banner ----
  if (mode === 'banner' && !consent) {
    return (
      <div style={bannerWrap}>
        <div style={bannerInner}>
          <div style={{ flex: '1 1 420px', minWidth: 260 }}>
            <strong style={{ color: BRAND, fontSize: 16 }}>This website uses cookies</strong>
            <p style={{ margin: '6px 0 0', color: '#444', fontSize: 14, lineHeight: 1.5 }}>
              We use cookies to make our site work, to understand how it is used, and to improve your
              experience. You can accept all, allow a selection, or deny non-essential cookies. You can
              change or withdraw your consent at any time.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <button style={btnGhost} onClick={() => setMode('edit')}>
              Customize
            </button>
            <button
              style={btnGhost}
              onClick={() => {
                denyAll()
                setPanelOpen(false)
              }}
            >
              Deny
            </button>
            <button
              style={btnOutline}
              onClick={() => {
                allowSelection()
                setPanelOpen(false)
              }}
            >
              Allow selection
            </button>
            <button
              style={btnPrimary}
              onClick={() => {
                acceptAll()
                setPanelOpen(false)
              }}
            >
              Allow all
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ---- Settings dialog (state + edit) ----
  return (
    <div style={overlay} role="dialog" aria-modal="true" aria-label="Cookie settings">
      <div style={dialog}>
        <div style={dialogHeader}>
          <strong style={{ fontSize: 18 }}>Cookie settings</strong>
          <button aria-label="Close" onClick={() => setPanelOpen(false)} style={closeBtn}>
            ✕
          </button>
        </div>

        <div style={{ padding: '18px 22px', overflowY: 'auto' }}>
          {mode === 'edit' ? (
            <>
              <p style={{ marginTop: 0, color: '#444', fontSize: 14 }}>
                Choose which categories of cookies you allow.
              </p>
              {CATEGORY_META.map((c) => (
                <label
                  key={c.key}
                  style={{
                    display: 'flex',
                    gap: 12,
                    padding: '12px 0',
                    borderTop: '1px solid #eef0f4',
                    alignItems: 'flex-start',
                    cursor: c.key === 'necessary' ? 'default' : 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={c.key === 'necessary' ? true : draft[c.key]}
                    disabled={c.key === 'necessary'}
                    onChange={(e) =>
                      c.key !== 'necessary' && setDraft({ ...draft, [c.key]: e.target.checked })
                    }
                    style={{ marginTop: 3, width: 16, height: 16 }}
                  />
                  <span>
                    <span style={{ fontWeight: 600, color: BRAND }}>{c.label}</span>
                    <span style={{ display: 'block', color: '#5a6472', fontSize: 13 }}>{c.desc}</span>
                  </span>
                </label>
              ))}
            </>
          ) : (
            <>
              <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#222' }}>Your current state</p>
              {CATEGORY_META.map((c) => {
                const on = c.key === 'necessary' ? true : consent?.categories[c.key]
                return (
                  <div key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0' }}>
                    <span style={{ width: 20, textAlign: 'center', color: on ? '#1a7f4b' : '#c0392b', fontWeight: 700 }}>
                      {c.key === 'necessary' ? '🔒' : on ? '✓' : '✕'}
                    </span>
                    <span style={{ fontSize: 15 }}>{c.label}</span>
                  </div>
                )
              })}

              <button
                onClick={() => setShowDetails((v) => !v)}
                style={{ background: 'none', border: 'none', color: BRAND, cursor: 'pointer', padding: '10px 0', fontWeight: 600 }}
              >
                {showDetails ? 'Hide details ▲' : 'Show details ▼'}
              </button>

              {showDetails && consent && (
                <div style={{ background: '#f2f4f7', borderRadius: 8, padding: 16, fontSize: 14 }}>
                  <div style={{ fontWeight: 600 }}>Consent date:</div>
                  <div style={{ marginBottom: 12 }}>{formatDate(consent.date)}</div>
                  <div style={{ fontWeight: 600 }}>Your consent ID:</div>
                  <div style={{ wordBreak: 'break-all', fontFamily: 'monospace', fontSize: 12 }}>{consent.id}</div>
                  <div style={{ textAlign: 'right', marginTop: 10, color: '#8a94a6', fontSize: 12 }}>
                    Team Eyrie Consent
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div style={dialogFooter}>
          {mode === 'edit' ? (
            <>
              <button style={btnGhost} onClick={() => (consent ? setMode('state') : setMode('banner'))}>
                Cancel
              </button>
              <button
                style={btnPrimary}
                onClick={() => {
                  allowSelection()
                  setMode('state')
                }}
              >
                Save consent
              </button>
            </>
          ) : (
            <>
              <button style={btnOutline} onClick={withdraw}>
                Withdraw your consent
              </button>
              <button style={btnPrimary} onClick={() => setMode('edit')}>
                Change your consent
              </button>
            </>
          )}
        </div>
      </div>
      {floatingButton}
    </div>
  )
}

/* ---- styles ---- */
const bannerWrap: React.CSSProperties = {
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  background: '#fff',
  borderTop: '3px solid ' + ACCENT,
  boxShadow: '0 -4px 20px rgba(0,0,0,0.12)',
  zIndex: 9999,
  padding: '16px 20px',
}
const bannerInner: React.CSSProperties = {
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  gap: 18,
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
}
const overlay: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(15,23,42,0.45)',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
}
const dialog: React.CSSProperties = {
  background: '#fff',
  borderRadius: 12,
  width: '100%',
  maxWidth: 640,
  maxHeight: '85vh',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
}
const dialogHeader: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 22px',
  borderBottom: '1px solid #eef0f4',
}
const dialogFooter: React.CSSProperties = {
  display: 'flex',
  gap: 10,
  justifyContent: 'flex-end',
  padding: '14px 22px',
  borderTop: '1px solid #eef0f4',
  flexWrap: 'wrap',
}
const closeBtn: React.CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: 18,
  cursor: 'pointer',
  color: '#333',
}
const btnBase: React.CSSProperties = {
  padding: '10px 18px',
  borderRadius: 6,
  fontWeight: 600,
  fontSize: 14,
  cursor: 'pointer',
}
const btnPrimary: React.CSSProperties = { ...btnBase, background: BRAND, color: '#fff', border: 'none' }
const btnOutline: React.CSSProperties = { ...btnBase, background: '#fff', color: BRAND, border: `1px solid ${BRAND}` }
const btnGhost: React.CSSProperties = { ...btnBase, background: 'transparent', color: '#5a6472', border: '1px solid #d6dae1' }
