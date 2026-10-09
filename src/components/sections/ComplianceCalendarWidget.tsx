'use client'

import React, { useState } from 'react'

interface DueDateInfo {
  day: number
  title: string
  regime: string
  desc: string
}

const octDueDates: Record<number, DueDateInfo> = {
  7: {
    day: 7,
    title: 'TDS / TCS Deposit',
    regime: 'Income Tax',
    desc: 'Deposit of Tax Deducted/Collected for September (Challan ITNS 281).',
  },
  11: {
    day: 11,
    title: 'GSTR-1 Monthly Return',
    regime: 'GST',
    desc: 'Outward supplies statement for taxpayers with turnover > ₹5 Cr or monthly filers.',
  },
  13: {
    day: 13,
    title: 'IFF (Invoice Furnishing)',
    regime: 'GST',
    desc: 'Invoice Furnishing Facility for QRMP scheme taxpayers (B2B invoices).',
  },
  15: {
    day: 15,
    title: 'EPF & ESI Monthly Contribution',
    regime: 'Labor & Payroll',
    desc: 'Electronic Challan Return (ECR) & statutory remittance for previous month wages.',
  },
  18: {
    day: 18,
    title: 'CMP-08 Quarterly Challan',
    regime: 'GST',
    desc: 'Payment of self-assessed tax by Composition Dealers for Q2.',
  },
  20: {
    day: 20,
    title: 'GSTR-3B Monthly Return',
    regime: 'GST',
    desc: 'Summary return and tax discharge for regular monthly filers.',
  },
  22: {
    day: 22,
    title: 'GSTR-3B QRMP (Category 1)',
    regime: 'GST',
    desc: 'Quarterly GSTR-3B for Southern & Western states under QRMP.',
  },
  24: {
    day: 24,
    title: 'GSTR-3B QRMP (Category 2)',
    regime: 'GST',
    desc: 'Quarterly GSTR-3B for Northern & Eastern states under QRMP.',
  },
  31: {
    day: 31,
    title: 'Tax Audit & Corporate ITR Filing',
    regime: 'Income Tax',
    desc: 'Income Tax Return filing for corporate assesses and audit cases under Sec 44AB.',
  },
}

export default function ComplianceCalendarWidget({
  className = '',
  onCtaClick,
}: {
  className?: string
  onCtaClick?: () => void
}) {
  const [activeHoverDate, setActiveHoverDate] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // October 2026: Oct 1 is Thursday (4 empty cells in Sun-first calendar)
  const emptyDaysStart = 4
  const totalDaysInMonth = 31
  const todayDay = 9 // Highlighted day as shown in reference

  const daysArray = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1)
  const emptySlots = Array.from({ length: emptyDaysStart }, (_, i) => i)

  const handleCta = () => {
    if (onCtaClick) {
      onCtaClick()
    } else {
      setModalOpen(true)
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => {
      setModalOpen(false)
      setSubscribed(false)
      setEmail('')
    }, 2500)
  }

  const activeInfo = activeHoverDate ? octDueDates[activeHoverDate] : null

  return (
    <div
      className={`compliance-calendar-widget ${className}`}
      style={{
        background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 45%, #172554 100%)',
        borderRadius: 20,
        padding: '36px 40px',
        color: '#ffffff',
        boxShadow: '0 16px 40px rgba(29, 78, 216, 0.28), 0 4px 12px rgba(15, 23, 42, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        border: '1.5px solid rgba(255, 255, 255, 0.15)',
      }}
    >
      {/* Ambient background orbs */}
      <div
        style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 320,
          height: 320,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -60,
          left: '30%',
          width: 280,
          height: 280,
          background: 'radial-gradient(circle, rgba(242, 101, 34, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 390px) 1fr',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        {/* ── Left Column: Interactive October Calendar ── */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.28)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1.5px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 16,
            padding: '24px 22px',
            position: 'relative',
          }}
        >
          {/* Calendar Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 18,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 4,
                  height: 18,
                  background: '#60a5fa',
                  borderRadius: 2,
                }}
              />
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  color: '#ffffff',
                }}
              >
                October 2026
              </span>
            </div>
            <span
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                color: '#bfdbfe',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '3px 9px',
                borderRadius: 12,
              }}
            >
              9 major due dates
            </span>
          </div>

          {/* Weekday labels */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              textAlign: 'center',
              marginBottom: 10,
              fontSize: 11.5,
              fontWeight: 700,
              color: '#93c5fd',
              letterSpacing: 0.5,
            }}
          >
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>

          {/* Days Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '6px',
            }}
          >
            {/* Empty slots for start of month */}
            {emptySlots.map((s) => (
              <div key={`empty-${s}`} style={{ height: 34 }} />
            ))}

            {/* Calendar Days */}
            {daysArray.map((day) => {
              const hasDueDate = !!octDueDates[day]
              const isToday = day === todayDay
              const isPassed = day < todayDay

              let cellBg = 'rgba(255, 255, 255, 0.08)'
              let cellColor = '#ffffff'
              let cellBorder = '1px solid rgba(255, 255, 255, 0.08)'
              let boxShadow = 'none'

              if (hasDueDate) {
                cellBg = '#f26522' // Vibrant Orange matching the user reference
                cellColor = '#ffffff'
                cellBorder = '1px solid rgba(255, 255, 255, 0.25)'
                boxShadow = '0 2px 8px rgba(242, 101, 34, 0.5)'
              } else if (isToday) {
                cellBg = 'rgba(255, 255, 255, 0.12)'
                cellBorder = '2.5px solid #f59e0b' // Gold outline matching today reference
                boxShadow = '0 0 0 2px rgba(245, 158, 11, 0.2)'
              } else if (isPassed) {
                cellBg = 'rgba(255, 255, 255, 0.04)'
                cellColor = '#cbd5e1'
              }

              return (
                <div
                  key={day}
                  onMouseEnter={() => hasDueDate && setActiveHoverDate(day)}
                  onMouseLeave={() => setActiveHoverDate(null)}
                  onClick={() => hasDueDate && setActiveHoverDate(day)}
                  title={hasDueDate ? octDueDates[day].title : undefined}
                  style={{
                    height: 34,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    fontSize: 12.5,
                    fontWeight: hasDueDate || isToday ? 800 : 500,
                    background: cellBg,
                    color: cellColor,
                    border: cellBorder,
                    boxShadow: boxShadow,
                    cursor: hasDueDate ? 'pointer' : 'default',
                    transition: 'all 0.15s ease',
                    transform: activeHoverDate === day ? 'scale(1.12)' : 'scale(1)',
                    position: 'relative',
                  }}
                >
                  {day}
                </div>
              )
            })}
          </div>

          {/* Interactive Tooltip Card when hovering a date */}
          {activeInfo && (
            <div
              style={{
                marginTop: 14,
                padding: '10px 14px',
                background: '#ffffff',
                color: '#0f274a',
                borderRadius: 10,
                fontSize: 12,
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                animation: 'fadeIn 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: 4,
                    background: '#fef3c7',
                    color: '#b45309',
                    textTransform: 'uppercase',
                  }}
                >
                  {activeInfo.regime}
                </span>
                <strong style={{ fontSize: 13, color: '#1d4ed8' }}>Oct {activeInfo.day}th</strong>
              </div>
              <div style={{ fontWeight: 700, fontSize: 12.5, color: '#0f172a' }}>
                {activeInfo.title}
              </div>
              <div style={{ color: '#64748b', fontSize: 11.5, marginTop: 2 }}>{activeInfo.desc}</div>
            </div>
          )}

          {/* Legend */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 16,
              paddingTop: 12,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: 11,
              color: '#bfdbfe',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span
                style={{
                  width: 9,
                  height: 9,
                  background: '#f26522',
                  borderRadius: 2,
                  display: 'inline-block',
                }}
              />
              <span>Due date – hover or tap</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span
                style={{
                  width: 9,
                  height: 9,
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  display: 'inline-block',
                }}
              />
              <span>Passed</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span
                style={{
                  width: 9,
                  height: 9,
                  border: '1.5px solid #f59e0b',
                  borderRadius: 2,
                  display: 'inline-block',
                }}
              />
              <span>Today</span>
            </div>
          </div>
        </div>

        {/* ── Right Column: Copy & High-Converting Orange CTA ── */}
        <div style={{ paddingRight: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div
              style={{
                width: 4,
                height: 22,
                background: '#60a5fa',
                borderRadius: 2,
              }}
            />
            <h3
              style={{
                margin: 0,
                fontSize: 'clamp(22px, 2.3vw, 28px)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
              }}
            >
              Never miss a due date again
            </h3>
          </div>

          <p
            style={{
              fontSize: 'clamp(14px, 1.15vw, 15.5px)',
              color: '#dbeafe',
              lineHeight: 1.65,
              margin: '0 0 28px 0',
              maxWidth: 580,
            }}
          >
            These are the all-India majors – GST, TDS, Income Tax, EPF/ESI. Build YOUR calendar in
            30 seconds: pick your state, entity and registrations to see only what applies to you,
            add it to Google Calendar, and get it by email on the 1st of every month. Free.
          </p>

          <div>
            <button
              onClick={handleCta}
              style={{
                background: 'linear-gradient(135deg, #f26522 0%, #ea580c 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 10,
                padding: '15px 30px',
                fontSize: '15.5px',
                fontWeight: 800,
                letterSpacing: '0.01em',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(242, 101, 34, 0.45)',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(242, 101, 34, 0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(242, 101, 34, 0.45)'
              }}
            >
              <span>See My Due Dates + Free Email Reminders</span>
              <span style={{ fontSize: 18 }}>→</span>
            </button>
          </div>

          {/* Subtext Features */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginTop: 22,
              fontSize: 13,
              color: '#bfdbfe',
              fontWeight: 500,
              flexWrap: 'wrap',
            }}
          >
            <span>Personalised</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>Google Calendar file</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>Monthly email</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>By a CA</span>
          </div>
        </div>
      </div>

      {/* ── Email Subscription Modal ── */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 18,
              padding: '36px 32px',
              maxWidth: 480,
              width: '100%',
              color: '#0f274a',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              boxSizing: 'border-box',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: '#f1f5f9',
                border: 'none',
                width: 32,
                height: 32,
                borderRadius: '50%',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                color: '#64748b',
              }}
            >
              ✕
            </button>

            {subscribed ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    background: '#ecfdf5',
                    color: '#059669',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                    margin: '0 auto 16px',
                  }}
                >
                  ✓
                </div>
                <h4 style={{ margin: '0 0 8px', fontSize: 20, color: '#0f274a' }}>
                  Calendar Reminders Activated!
                </h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>
                  You will receive monthly statutory due date alerts and direct Google Calendar import
                  links on the 1st of every month.
                </p>
              </div>
            ) : (
              <div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: '#f26522',
                    letterSpacing: 1,
                  }}
                >
                  Statutory Compliance Service
                </span>
                <h3 style={{ margin: '6px 0 10px', fontSize: 22, color: '#0f274a' }}>
                  Get Monthly Due Date Alerts
                </h3>
                <p style={{ color: '#64748b', fontSize: 13.5, lineHeight: 1.5, margin: '0 0 20px' }}>
                  Never incur a late filing fee or interest penalty again. Enter your work email to receive
                  curated GST, TDS, and MCA filing deadlines with 1-click Google Calendar sync.
                </p>

                <form onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your corporate email..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 8,
                      border: '1.5px solid #cbd5e1',
                      fontSize: 14,
                      marginBottom: 14,
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #f26522 0%, #ea580c 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '13px 20px',
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(242, 101, 34, 0.4)',
                    }}
                  >
                    Subscribe to Free Due Date Alerts →
                  </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: 14, fontSize: 11.5, color: '#94a3b8' }}>
                  🔒 No spam. Strictly statutory compliance notices curated by Team Eyrie CAs.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

