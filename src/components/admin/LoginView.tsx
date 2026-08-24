'use client'

import React, { useState } from 'react'

export const LoginView: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passFocused, setPassFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        window.location.href = '/admin'
      } else {
        const errorData = await res.json()
        setError(errorData?.errors?.[0]?.message || 'Invalid email or password. Please try again.')
      }
    } catch {
      setError('A network error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Global override — break out of Payload's wrapper completely */}
      <style dangerouslySetInnerHTML={{
        __html: `
        html, body { margin: 0 !important; padding: 0 !important; overflow: hidden !important; }
        #app, [data-payload-theme], .template-default, .template-default__wrap, main {
          display: contents !important;
          background: transparent !important;
          padding: 0 !important;
          margin: 0 !important;
          min-height: unset !important;
        }
      ` }} />

      <div style={S.page}>
        {/* Full-screen Background Grid & Circles */}
        <div style={S.circleOuter} />
        <div style={S.circleMid} />
        <div style={S.circleInner} />
        <div style={S.dotGrid} />

        {/* Container for Side-by-Side Floating Layout */}
        <div style={S.container}>

          {/* ── LEFT: Branding & Stats Content ──────────────────────── */}
          <div style={S.leftBrand}>
            <div style={S.pill}>✦ TRUSTED SINCE 2010 ✦</div>

            <h1 style={S.leftH1}>
              Powering India's<br />
              <span style={S.accent}>Premier CA Firm</span>
            </h1>

            <p style={S.leftP}>
              Welcome to Team Eyrie CMS. Access your client management,
              recruitment portals, and service administrative controls.
            </p>

            <div style={S.divider} />

            {/* Glass Stat Cards */}
            <div style={S.stats}>
              {[
                { v: '10+', l: 'Active Clients' },
                { v: '5+', l: 'Years Experience' },
                { v: '9', l: 'Office Locations' },
              ].map(({ v, l }) => (
                <div key={l} style={S.statCard}>
                  <div style={S.statNum}>{v}</div>
                  <div style={S.statLbl}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Frosted Glass Pop-up Card ──────────────────── */}
          <div style={S.rightCardWrapper}>
            <div style={S.glassCard}>
              {/* Metallic Gold Top Bar */}
              <div style={S.cardGoldAccent} />

              {/* Glass Card Inner */}
              <div style={S.cardInner}>
                {/* Logo */}
                <div style={S.logoBox}>
                  <img src="/logo.png" alt="Team Eyrie CA" style={S.logo} />
                </div>

                <p style={S.tag}>SECURE ADMIN PORTAL</p>
                <h2 style={S.cardH2}>Welcome Back</h2>
                <p style={S.sub}>Sign in to access your administrative suite</p>

                {/* Error Box */}
                {error && (
                  <div style={S.error}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={S.form} noValidate>
                  <div style={S.field}>
                    <label htmlFor="te-email" style={S.label}>Email Address</label>
                    <input
                      id="te-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      required
                      autoComplete="email"
                      style={emailFocused ? { ...S.input, ...S.inputFocused } : S.input}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                    />
                  </div>

                  <div style={S.field}>
                    <div style={S.labelRow}>
                      <label htmlFor="te-password" style={S.label}>Password</label>
                      <a href="/admin/forgot-password" style={S.forgot}>Forgot?</a>
                    </div>
                    <div style={{ position: 'relative', width: '100%' }}>
                      <input
                        id="te-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••"
                        required
                        autoComplete="current-password"
                        style={{
                          ...(passFocused ? { ...S.input, ...S.inputFocused } : S.input),
                          paddingRight: '44px',
                        }}
                        onFocus={() => setPassFocused(true)}
                        onBlur={() => setPassFocused(false)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#64748b',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '6px',
                          transition: 'color 0.2s, background 0.2s',
                        }}
                        title={showPassword ? 'Hide Password' : 'Show Password'}
                      >
                        {showPassword ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    style={isLoading ? { ...S.btn, ...S.btnDisabled } : S.btn}
                  >
                    {isLoading ? 'Signing in…' : 'Sign In →'}
                  </button>
                </form>

                <p style={S.footer}>
                  © {new Date().getFullYear()} Team Eyrie Chartered Accountants
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

// ─── Color Tokens ─────────────────────────────────────────────────────────
const NAVY = '#0b1324'
const BLUE = '#1f3864'
const GOLD = '#b08d57'
const GOLD_LT = '#d8c19a'
const WHITE = '#ffffff'

// ─── Styles ───────────────────────────────────────────────────────────────
const S: Record<string, React.CSSProperties> = {
  /* Full screen navy canvas */
  page: {
    position: 'fixed',
    inset: 0,
    background: `linear-gradient(135deg, ${NAVY} 0%, ${BLUE} 50%, #0d2444 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
    zIndex: 9999,
    overflow: 'hidden',
  },

  /* Background elements */
  circleOuter: {
    position: 'absolute',
    width: '700px', height: '700px',
    borderRadius: '50%',
    border: '1px solid rgba(176,141,87,0.12)',
    top: '50%', left: '30%',
    transform: 'translate(-50%,-50%)',
    pointerEvents: 'none',
  },
  circleMid: {
    position: 'absolute',
    width: '450px', height: '450px',
    borderRadius: '50%',
    border: '1px solid rgba(176,141,87,0.18)',
    top: '50%', left: '30%',
    transform: 'translate(-50%,-50%)',
    pointerEvents: 'none',
  },
  circleInner: {
    position: 'absolute',
    width: '240px', height: '240px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(176,141,87,0.15) 0%, transparent 70%)',
    top: '50%', left: '30%',
    transform: 'translate(-50%,-50%)',
    pointerEvents: 'none',
  },
  dotGrid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(rgba(176,141,87,0.12) 1px, transparent 1px)',
    backgroundSize: '28px 28px',
    pointerEvents: 'none',
  },

  /* Content Layout Container */
  container: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1200px',
    padding: '0 48px',
    gap: '48px',
  },

  /* Left Brand Section */
  leftBrand: {
    flex: 1,
    maxWidth: '520px',
  },
  pill: {
    display: 'inline-block',
    background: 'rgba(176,141,87,0.15)',
    border: '1px solid rgba(176,141,87,0.4)',
    color: GOLD_LT,
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '2.5px',
    padding: '7px 18px',
    borderRadius: '100px',
    marginBottom: '28px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  leftH1: {
    margin: '0 0 16px',
    fontSize: '44px',
    fontWeight: 800,
    color: WHITE,
    lineHeight: 1.15,
    letterSpacing: '-0.03em',
  },
  accent: { color: GOLD_LT },
  leftP: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.7,
    margin: '0 0 32px',
  },
  divider: {
    width: '60px',
    height: '2px',
    background: `linear-gradient(90deg, ${GOLD}, transparent)`,
    margin: '0 0 32px',
    borderRadius: '2px',
  },
  stats: { display: 'flex', gap: '16px' },
  statCard: {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '16px',
    padding: '20px',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    flex: 1,
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  },
  statNum: {
    fontSize: '26px',
    fontWeight: 800,
    color: GOLD_LT,
    lineHeight: 1,
    marginBottom: '5px',
  },
  statLbl: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.6)',
    fontWeight: 500,
    lineHeight: 1.3,
  },

  /* Right Side Frosted Glass Pop-up Card */
  rightCardWrapper: {
    width: '440px',
    flexShrink: 0,
  },
  glassCard: {
    background: 'rgba(255, 255, 255, 0.88)',
    backdropFilter: 'blur(24px) saturate(190%)',
    WebkitBackdropFilter: 'blur(24px) saturate(190%)',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 30px 70px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.8) inset, 0 0 0 1px rgba(176, 141, 87, 0.3)',
    position: 'relative',
  },
  cardGoldAccent: {
    height: '5px',
    background: `linear-gradient(90deg, ${NAVY} 0%, ${GOLD} 50%, ${NAVY} 100%)`,
  },
  cardInner: {
    padding: '40px 38px 34px',
  },

  logoBox: { marginBottom: '22px', textAlign: 'center' },
  logo: { height: '50px', width: 'auto', objectFit: 'contain' },

  tag: {
    margin: '0 0 4px',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
    color: GOLD,
    textAlign: 'center',
  },
  cardH2: {
    margin: '0 0 4px',
    fontSize: '26px',
    fontWeight: 800,
    color: NAVY,
    letterSpacing: '-0.02em',
    textAlign: 'center',
  },
  sub: {
    margin: '0 0 24px',
    fontSize: '14px',
    color: '#475569',
    textAlign: 'center',
  },

  /* Form Elements */
  form: { display: 'flex', flexDirection: 'column', gap: '0' },
  field: { marginBottom: '18px' },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  },
  label: { fontSize: '12px', fontWeight: 700, color: NAVY, textTransform: 'uppercase', letterSpacing: '0.6px' },
  forgot: { fontSize: '12px', color: GOLD, fontWeight: 600, textDecoration: 'none' },

  input: {
    display: 'block',
    width: '100%',
    padding: '13px 16px',
    fontSize: '14px',
    color: NAVY,
    background: 'rgba(255, 255, 255, 0.75)',
    border: '1.5px solid rgba(203, 213, 225, 0.8)',
    borderRadius: '12px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(8px)',
  },
  inputFocused: {
    background: '#ffffff',
    border: `1.5px solid ${GOLD}`,
    boxShadow: `0 0 0 4px rgba(176, 141, 87, 0.2)`,
  },

  btn: {
    width: '100%',
    padding: '15px',
    background: `linear-gradient(135deg, ${GOLD} 0%, #8a6530 100%)`,
    color: WHITE,
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 800,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    marginTop: '6px',
    boxShadow: `0 8px 24px rgba(176,141,87,0.4)`,
    fontFamily: 'inherit',
    transition: 'all 0.25s ease',
  },
  btnDisabled: {
    background: '#94a3b8',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },

  error: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(254, 242, 242, 0.95)',
    border: '1px solid #fca5a5',
    color: '#b91c1c',
    borderRadius: '12px',
    padding: '10px 14px',
    fontSize: '13px',
    marginBottom: '16px',
  },

  footer: { marginTop: '26px', fontSize: '11px', color: '#64748b', textAlign: 'center', fontWeight: 500 },
}
