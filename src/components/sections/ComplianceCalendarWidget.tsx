'use client'

import React, { useState, useEffect, useMemo } from 'react'

export interface ComplianceEventItem {
  id?: string | number
  title: string
  date: string | Date
  category?: string
  isSpecialEvent?: boolean
  regime?: string
  description?: string
  applicableTo?: string
  notificationAlert?: string
  status?: string
}

// Built-in standard recurring statutory due dates for Indian corporate compliance
const DEFAULT_STATUTORY_DUE_DATES: Record<number, { title: string; regime: string; category: string; desc: string; applicableTo: string }> = {
  7: {
    title: 'TDS / TCS Monthly Deposit',
    regime: 'Income Tax',
    category: 'TDS / TCS',
    desc: 'Deposit of Tax Deducted/Collected at Source for the previous month (Challan ITNS 281).',
    applicableTo: 'All Deductors / Corporate Assessees',
  },
  11: {
    title: 'GSTR-1 Monthly Return Filing',
    regime: 'GST',
    category: 'GST',
    desc: 'Statement of outward supplies for taxpayers with aggregate turnover > ₹5 Crore or monthly filers.',
    applicableTo: 'Monthly GST Registered Taxpayers',
  },
  13: {
    title: 'IFF (Invoice Furnishing Facility)',
    regime: 'GST',
    category: 'GST',
    desc: 'B2B invoice submission under the QRMP (Quarterly Return Monthly Payment) scheme.',
    applicableTo: 'QRMP Registered Taxpayers',
  },
  15: {
    title: 'EPF & ESI Statutory Contribution',
    regime: 'Labor & Payroll',
    category: 'Labor & Payroll',
    desc: 'Electronic Challan cum Return (ECR) filing & statutory remittance for previous month payroll.',
    applicableTo: 'All establishments with 20+ (EPF) or 10+ (ESI) employees',
  },
  18: {
    title: 'CMP-08 Quarterly Tax Statement',
    regime: 'GST',
    category: 'GST',
    desc: 'Payment of self-assessed tax and statement filing for Composition Scheme dealers.',
    applicableTo: 'Composition Scheme Taxpayers',
  },
  20: {
    title: 'GSTR-3B Monthly Return Filing',
    regime: 'GST',
    category: 'GST',
    desc: 'Summary return filing and discharge of tax liability for regular monthly registered taxpayers.',
    applicableTo: 'Regular Monthly Taxpayers',
  },
  22: {
    title: 'GSTR-3B Quarterly Filing (Category 1 States)',
    regime: 'GST',
    category: 'GST',
    desc: 'Quarterly return filing under QRMP scheme for Southern & Western States/UTs.',
    applicableTo: 'QRMP Filers in Category 1 States',
  },
  24: {
    title: 'GSTR-3B Quarterly Filing (Category 2 States)',
    regime: 'GST',
    category: 'GST',
    desc: 'Quarterly return filing under QRMP scheme for Northern & Eastern States/UTs.',
    applicableTo: 'QRMP Filers in Category 2 States',
  },
  30: {
    title: 'TDS Certificate Issuance / Form 16A',
    regime: 'Income Tax',
    category: 'TDS / TCS',
    desc: 'Quarterly issuance of TDS certificates to payees for tax deducted under various sections.',
    applicableTo: 'Corporate Tax Deductors',
  },
  31: {
    title: 'Corporate Statutory & Audit Filing Deadline',
    regime: 'Income Tax / MCA',
    category: 'Income Tax',
    desc: 'Statutory returns and tax audit reports under Section 44AB and corporate compliance frameworks.',
    applicableTo: 'Corporate Assessees & Audited Entities',
  },
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export default function ComplianceCalendarWidget({
  className = '',
  initialEvents = [],
  onCtaClick,
}: {
  className?: string
  initialEvents?: ComplianceEventItem[]
  onCtaClick?: () => void
}) {
  // Real-time dynamic current date initialization
  const now = useMemo(() => new Date(), [])
  const realCurrentYear = now.getFullYear()
  const realCurrentMonth = now.getMonth() // 0-indexed
  const realCurrentDay = now.getDate()

  // Calendar navigation state (defaults to real-time current month & year)
  const [viewYear, setViewYear] = useState<number>(realCurrentYear)
  const [viewMonth, setViewMonth] = useState<number>(realCurrentMonth)

  // Events state (hydrated with initialEvents or fetched dynamically)
  const [dbEvents, setDbEvents] = useState<ComplianceEventItem[]>(initialEvents)
  const [loadingEvents, setLoadingEvents] = useState<boolean>(false)

  // Fetch from API if initialEvents was empty
  useEffect(() => {
    if (initialEvents.length === 0) {
      setLoadingEvents(true)
      fetch('/api/compliance-events')
        .then((res) => res.json())
        .then((data) => {
          if (data?.success && Array.isArray(data.events)) {
            setDbEvents(data.events)
          }
        })
        .catch(() => {
          // Graceful fallback to built-in events
        })
        .finally(() => setLoadingEvents(false))
    }
  }, [initialEvents])

  // Selected date state for the left showcase panel
  const [selectedDay, setSelectedDay] = useState<number>(realCurrentDay)
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)

  // Modal subscription state
  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [selectedState, setSelectedState] = useState('All India')
  const [subscribed, setSubscribed] = useState(false)

  // Calculate calendar grid metrics for viewYear & viewMonth
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const startDayOfWeek = new Date(viewYear, viewMonth, 1).getDay() // 0 = Sun
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptySlots = Array.from({ length: startDayOfWeek }, (_, i) => i)

  // Check if viewing the real-time current month
  const isViewingCurrentMonth = viewYear === realCurrentYear && viewMonth === realCurrentMonth

  // Map of events for the current viewed month: dayNumber -> ComplianceEventItem[]
  const eventsByDay = useMemo(() => {
    const map: Record<number, ComplianceEventItem[]> = {}

    // 1. First add database events that fall into viewYear & viewMonth
    dbEvents.forEach((evt) => {
      if (!evt.date) return
      const d = new Date(evt.date)
      if (d.getFullYear() === viewYear && d.getMonth() === viewMonth) {
        const day = d.getDate()
        if (!map[day]) map[day] = []
        map[day].push(evt)
      }
    })

    // 2. Add standard statutory due dates as foundation (if not already overridden)
    Object.entries(DEFAULT_STATUTORY_DUE_DATES).forEach(([dayStr, info]) => {
      const day = Number(dayStr)
      if (day <= daysInMonth) {
        if (!map[day]) {
          map[day] = [
            {
              title: info.title,
              date: new Date(viewYear, viewMonth, day),
              category: info.category,
              regime: info.regime,
              description: info.desc,
              applicableTo: info.applicableTo,
              isSpecialEvent: false,
            },
          ]
        }
      }
    })

    return map
  }, [dbEvents, viewYear, viewMonth, daysInMonth])

  // Total count of due dates & special events in the viewed month
  const totalDueDatesInMonth = Object.keys(eventsByDay).length
  const totalSpecialEventsInMonth = Object.values(eventsByDay).filter((arr) =>
    arr.some((e) => e.isSpecialEvent)
  ).length

  // Month navigation handlers
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
    setSelectedDay(1)
    setHoveredDay(null)
  }

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
    setSelectedDay(1)
    setHoveredDay(null)
  }

  const handleGoToToday = () => {
    setViewYear(realCurrentYear)
    setViewMonth(realCurrentMonth)
    setSelectedDay(realCurrentDay)
    setHoveredDay(null)
  }

  // Active day being showcased on the left (hovered takes preview priority, otherwise selected)
  const activeDay = hoveredDay !== null ? hoveredDay : selectedDay
  const activeDayEvents = eventsByDay[activeDay] || []
  const hasActiveEvents = activeDayEvents.length > 0

  // Find next upcoming due date in the month if activeDay has no events
  const nextUpcomingDay = useMemo(() => {
    const upcoming = Object.keys(eventsByDay)
      .map(Number)
      .filter((d) => d >= activeDay)
      .sort((a, b) => a - b)
    return upcoming.length > 0 ? upcoming[0] : null
  }, [eventsByDay, activeDay])

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
    }, 2800)
  }

  return (
    <div
      className={`compliance-calendar-widget ${className}`}
      style={{
        background: 'linear-gradient(135deg, #122f5d 0%, #1b417e 50%, #204d94 100%)',
        borderRadius: 22,
        padding: '36px 38px',
        color: '#ffffff',
        boxShadow: '0 20px 48px rgba(18, 47, 93, 0.35), 0 4px 14px rgba(27, 65, 126, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        border: '1.5px solid rgba(255, 255, 255, 0.24)',
      }}
    >
      {/* Ambient background accent glows */}
      <div
        style={{
          position: 'absolute',
          top: -90,
          right: -90,
          width: 360,
          height: 360,
          background: 'radial-gradient(circle, rgba(242, 101, 34, 0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -80,
          left: '25%',
          width: 320,
          height: 320,
          background: 'radial-gradient(circle, rgba(27, 65, 126, 0.45) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Bold Background Watermark Typography: "TAX" */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '42%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(150px, 26vw, 350px)',
          fontWeight: 950,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          letterSpacing: '-0.03em',
          lineHeight: 0.8,
          color: 'rgba(255, 255, 255, 0.09)',
          WebkitTextStroke: '2.5px rgba(255, 255, 255, 0.13)',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1,
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
        }}
      >
        TAX
      </div>

      {/* Main Grid: Left = Event Details & Content, Right = Calendar */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'minmax(340px, 1.15fr) minmax(320px, 395px)',
          gap: '36px',
          alignItems: 'center',
        }}
        className="compliance-calendar-grid"
      >
        {/* ══════════════════════════════════════════════════════════
            LEFT COLUMN: Active Event Spotlight, Details & CTA
           ══════════════════════════════════════════════════════════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Section Header with Pill */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(255, 255, 255, 0.14)',
                  backdropFilter: 'blur(8px)',
                  padding: '4px 12px',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f26522', boxShadow: '0 0 6px #f26522' }} />
                Real-Time Compliance Radar
              </span>
              {totalSpecialEventsInMonth > 0 && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    background: 'rgba(242, 101, 34, 0.2)',
                    border: '1px solid rgba(242, 101, 34, 0.45)',
                    padding: '3px 10px',
                    borderRadius: 20,
                    fontSize: 10.5,
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: 0.5,
                  }}
                >
                  ⭐ {totalSpecialEventsInMonth} Special {totalSpecialEventsInMonth === 1 ? 'Event' : 'Events'}
                </span>
              )}
            </div>

            <h3
              style={{
                margin: '0 0 8px 0',
                fontSize: 'clamp(24px, 2.3vw, 30px)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
              }}
            >
              Never miss a due date again
            </h3>
            <p
              style={{
                fontSize: '14.5px',
                color: '#dbeafe',
                lineHeight: 1.55,
                margin: 0,
                maxWidth: 560,
              }}
            >
              All-India statutory filings &amp; special milestones tracking in real time. Click any date on the calendar to inspect filings.
            </p>
          </div>

          {/* ── Active Date Spotlight Showcase Card ── */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.14)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1.5px solid rgba(255, 255, 255, 0.28)',
              borderRadius: 16,
              padding: '22px 24px',
              boxShadow: '0 8px 24px rgba(18, 47, 93, 0.25)',
              minHeight: 170,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              transition: 'all 0.25s ease',
            }}
          >
            {/* Top Bar of the Showcase: Formatted Date */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#f26522', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                  📅 {MONTH_NAMES[viewMonth]} {activeDay}, {viewYear}
                </span>
                {isViewingCurrentMonth && activeDay === realCurrentDay && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 10,
                      background: 'rgba(245, 158, 11, 0.2)',
                      border: '1px solid #f59e0b',
                      color: '#fbbf24',
                      textTransform: 'uppercase',
                    }}
                  >
                    Today
                  </span>
                )}
              </div>
              <span style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600 }}>
                {hasActiveEvents ? `${activeDayEvents.length} Event${activeDayEvents.length > 1 ? 's' : ''}` : 'No Deadlines'}
              </span>
            </div>

            {/* Event Content Details */}
            {hasActiveEvents ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {activeDayEvents.map((evt, idx) => (
                  <div key={idx} style={{ borderTop: idx > 0 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none', paddingTop: idx > 0 ? 10 : 0 }}>
                    {/* Badge / Regime */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      {evt.isSpecialEvent ? (
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            padding: '3px 9px',
                            borderRadius: 6,
                            background: 'linear-gradient(135deg, #f26522 0%, #ea580c 100%)',
                            color: '#ffffff',
                            boxShadow: '0 2px 8px rgba(242, 101, 34, 0.5)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          ⭐ SPECIAL EVENT
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            padding: '3px 9px',
                            borderRadius: 6,
                            background: 'rgba(37, 99, 235, 0.35)',
                            border: '1px solid rgba(96, 165, 250, 0.4)',
                            color: '#bfdbfe',
                            textTransform: 'uppercase',
                          }}
                        >
                          {evt.regime || evt.category || 'Statutory Due Date'}
                        </span>
                      )}
                      {evt.applicableTo && (
                        <span style={{ fontSize: 11, color: '#cbd5e1', fontStyle: 'italic' }}>
                          • {evt.applicableTo}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div style={{ fontSize: 17, fontWeight: 800, color: '#ffffff', marginBottom: 4, lineHeight: 1.3 }}>
                      {evt.title}
                    </div>

                    {/* Description */}
                    {evt.description && (
                      <p style={{ fontSize: 13, color: '#dbeafe', margin: 0, lineHeight: 1.5 }}>
                        {evt.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'left', padding: '6px 0' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>
                  No statutory due date on this date.
                </div>
                <p style={{ fontSize: 13, color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>
                  Routine operations window. Direct partner review and statutory audits remain active.
                  {nextUpcomingDay && (
                    <button
                      onClick={() => setSelectedDay(nextUpcomingDay)}
                      style={{
                        display: 'inline-block',
                        marginLeft: 8,
                        background: 'none',
                        border: 'none',
                        color: '#f26522',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: 0,
                        textDecoration: 'underline',
                      }}
                    >
                      Jump to next filing (Day {nextUpcomingDay}) →
                    </button>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Action Row: High-Converting CTA & Benefits */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <button
                onClick={handleCta}
                style={{
                  background: 'linear-gradient(135deg, #f26522 0%, #ea580c 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 10,
                  padding: '13px 26px',
                  fontSize: '15px',
                  fontWeight: 800,
                  letterSpacing: '0.01em',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(242, 101, 34, 0.45)',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
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
                <span>Get Free Calendar Reminders</span>
                <span>→</span>
              </button>

              <button
                onClick={handleGoToToday}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 10,
                  padding: '12px 18px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                title="Return to today's real-time date"
              >
                Today ({realCurrentDay} {MONTH_NAMES[realCurrentMonth].slice(0, 3)})
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            RIGHT COLUMN: Interactive Calendar Grid with Spiral Binder Head
           ══════════════════════════════════════════════════════════ */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1.5px solid rgba(255, 255, 255, 0.28)',
            borderRadius: 18,
            padding: '30px 20px 22px 20px',
            position: 'relative',
            boxShadow: '0 12px 32px rgba(18, 47, 93, 0.28)',
          }}
        >
          {/* ── Realistic Spiral Binder Rings at Head of Calendar ── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: -11,
              left: 20,
              right: 20,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'flex-start',
              pointerEvents: 'none',
              zIndex: 6,
            }}
          >
            {[...Array(7)].map((_, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Twin Metallic Chrome Coils */}
                <div style={{ display: 'flex', gap: 3.5, position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      width: 5,
                      height: 22,
                      borderRadius: 3,
                      background: 'linear-gradient(180deg, #94a3b8 0%, #ffffff 35%, #e2e8f0 65%, #475569 100%)',
                      boxShadow: '0 3px 5px rgba(0, 0, 0, 0.5), inset 0 1px 1px #ffffff',
                      border: '0.5px solid rgba(255, 255, 255, 0.4)',
                    }}
                  />
                  <div
                    style={{
                      width: 5,
                      height: 22,
                      borderRadius: 3,
                      background: 'linear-gradient(180deg, #94a3b8 0%, #ffffff 35%, #e2e8f0 65%, #475569 100%)',
                      boxShadow: '0 3px 5px rgba(0, 0, 0, 0.5), inset 0 1px 1px #ffffff',
                      border: '0.5px solid rgba(255, 255, 255, 0.4)',
                    }}
                  />
                </div>
                {/* Realistic Punched Hole Cutout in Calendar Sheet */}
                <div
                  style={{
                    width: 17,
                    height: 8,
                    borderRadius: 4,
                    background: 'rgba(20, 55, 175, 0.75)',
                    marginTop: -7,
                    boxShadow: 'inset 0 2px 4px rgba(10, 30, 100, 0.7), 0 0.5px 0 rgba(255, 255, 255, 0.25)',
                    border: '0.5px solid rgba(255, 255, 255, 0.2)',
                    zIndex: 1,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Perforated Flip Line below spiral rings */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 18,
              left: 16,
              right: 16,
              height: 1,
              borderBottom: '1px dashed rgba(255, 255, 255, 0.08)',
              pointerEvents: 'none',
            }}
          />

          {/* Calendar Month Navigation Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            {/* Month & Year Title */}
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
                  fontSize: 17.5,
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  color: '#ffffff',
                }}
              >
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
            </div>

            {/* Navigation Arrows & Count */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#bfdbfe',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '3px 8px',
                  borderRadius: 10,
                  marginRight: 4,
                }}
              >
                {totalDueDatesInMonth} {totalDueDatesInMonth === 1 ? 'due date' : 'due dates'}
              </span>

              {/* Prev Month Button */}
              <button
                onClick={handlePrevMonth}
                aria-label="Previous month"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 800,
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
              >
                ‹
              </button>

              {/* Next Month Button */}
              <button
                onClick={handleNextMonth}
                aria-label="Next month"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 800,
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
              >
                ›
              </button>
            </div>
          </div>

          {/* Weekday Labels (S M T W T F S) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              textAlign: 'center',
              marginBottom: 8,
              fontSize: 11,
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
              const dayEvents = eventsByDay[day] || []
              const hasDueDate = dayEvents.length > 0
              const isSpecial = dayEvents.some((e) => e.isSpecialEvent)
              const isToday = isViewingCurrentMonth && day === realCurrentDay
              const isSelected = day === activeDay
              const isPassed =
                viewYear < realCurrentYear ||
                (viewYear === realCurrentYear && viewMonth < realCurrentMonth) ||
                (isViewingCurrentMonth && day < realCurrentDay)

              let cellBg = 'rgba(255, 255, 255, 0.12)'
              let cellColor = '#ffffff'
              let cellBorder = '1px solid rgba(255, 255, 255, 0.18)'
              let boxShadow = 'none'

              if (isSpecial) {
                // Special Event styling: High-voltage orange gradient with star glow
                cellBg = 'linear-gradient(135deg, #f26522 0%, #ea580c 100%)'
                cellColor = '#ffffff'
                cellBorder = '1.5px solid #ffffff'
                boxShadow = '0 0 12px rgba(242, 101, 34, 0.8), 0 2px 6px rgba(0, 0, 0, 0.3)'
              } else if (hasDueDate) {
                // Due Date styling: Signature Electric Sunset Orange
                cellBg = '#f26522'
                cellColor = '#ffffff'
                cellBorder = '1px solid rgba(255, 255, 255, 0.25)'
                boxShadow = '0 2px 8px rgba(242, 101, 34, 0.5)'
              } else if (isToday) {
                // Today styling: Golden outline ring
                cellBg = 'rgba(255, 255, 255, 0.22)'
                cellBorder = '2.5px solid #f59e0b'
                boxShadow = '0 0 0 2px rgba(245, 158, 11, 0.25)'
              } else if (isPassed) {
                cellBg = 'rgba(255, 255, 255, 0.07)'
                cellColor = '#dbeafe'
              }

              if (isSelected) {
                cellBorder = '2px solid #ffffff'
                boxShadow = hasDueDate
                  ? '0 0 14px rgba(242, 101, 34, 0.9)'
                  : '0 0 10px rgba(255, 255, 255, 0.6)'
              }

              return (
                <div
                  key={day}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  onClick={() => setSelectedDay(day)}
                  title={
                    hasDueDate
                      ? `${dayEvents[0].title}${isSpecial ? ' (Special Event)' : ''}`
                      : undefined
                  }
                  style={{
                    height: 34,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    fontSize: 12.5,
                    fontWeight: hasDueDate || isToday || isSelected ? 800 : 500,
                    background: cellBg,
                    color: cellColor,
                    border: cellBorder,
                    boxShadow: boxShadow,
                    cursor: 'pointer',
                    transition: 'all 0.16s ease',
                    transform: isSelected ? 'scale(1.14)' : hoveredDay === day ? 'scale(1.08)' : 'scale(1)',
                    position: 'relative',
                    zIndex: isSelected ? 5 : 1,
                  }}
                >
                  {day}
                  {/* Star dot indicator for Special Events */}
                  {isSpecial && (
                    <span
                      style={{
                        position: 'absolute',
                        top: -3,
                        right: -3,
                        fontSize: 9,
                        lineHeight: 1,
                      }}
                    >
                      ⭐
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Calendar Legend */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 14,
              paddingTop: 10,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: 10.5,
              color: '#bfdbfe',
              flexWrap: 'wrap',
              gap: 6,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  background: '#f26522',
                  borderRadius: 2,
                  display: 'inline-block',
                }}
              />
              <span>Due Date</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 10, lineHeight: 1 }}>⭐</span>
              <span>Special Event</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  border: '1.5px solid #f59e0b',
                  borderRadius: 2,
                  display: 'inline-block',
                }}
              />
              <span>Today</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  display: 'inline-block',
                }}
              />
              <span>Passed</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal Subscription Dialog ── */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 26, 58, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: 18,
              padding: '36px 32px',
              maxWidth: 520,
              width: '100%',
              color: '#0f172a',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
              border: '1px solid #e2e8f0',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: 'none',
                border: 'none',
                fontSize: 22,
                cursor: 'pointer',
                color: '#64748b',
                lineHeight: 1,
              }}
            >
              ×
            </button>

            {!subscribed ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span
                    style={{
                      background: 'rgba(29, 78, 216, 0.08)',
                      color: '#1d4ed8',
                      fontSize: 11,
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: 12,
                      textTransform: 'uppercase',
                      letterSpacing: 0.8,
                    }}
                  >
                    Free Service
                  </span>
                  <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Zero spam • Monthly digest</span>
                </div>

                <h3 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800, color: '#0f172a' }}>
                  Sync Statutory Due Dates to Your Calendar
                </h3>
                <p style={{ margin: '0 0 20px', fontSize: 14, color: '#475569', lineHeight: 1.55 }}>
                  Receive tailored filing reminders 3 days before major GST, TDS, Income Tax, and ROC deadlines.
                </p>

                <form onSubmit={handleSubscribe}>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      State / Jurisdiction
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: 8,
                        border: '1.5px solid #cbd5e1',
                        fontSize: 14,
                        color: '#0f172a',
                        background: '#ffffff',
                        boxSizing: 'border-box',
                      }}
                    >
                      <option value="All India">All-India (National Filings)</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Gujarat">Gujarat</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="cfo@yourcompany.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: 8,
                        border: '1.5px solid #cbd5e1',
                        fontSize: 14,
                        boxSizing: 'border-box',
                        color: '#0f172a',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #f26522 0%, #ea580c 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 10,
                      padding: '13px',
                      fontSize: 15,
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 6px 18px rgba(242, 101, 34, 0.4)',
                    }}
                  >
                    Subscribe &amp; Download Calendar (.ics) →
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 10px' }}>
                <div style={{ fontSize: 44, marginBottom: 10 }}>🎉</div>
                <h3 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800, color: '#0f172a' }}>
                  Calendar Sync Ready!
                </h3>
                <p style={{ margin: 0, fontSize: 14.5, color: '#475569', lineHeight: 1.6 }}>
                  We have queued statutory calendar notifications for <strong>{email}</strong> ({selectedState}).
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Responsive layout CSS for smaller screens */}
      <style jsx>{`
        @media (max-width: 900px) {
          .compliance-calendar-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </div>
  )
}
