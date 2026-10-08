'use client'

import React, { useState, useEffect } from 'react'
import borderData from './india-border-smooth.json'

export interface CityNode {
  city: string
  region: string
  role: string
  desc: string
  x: number
  y: number
  isHub?: boolean
  address?: string
  specialties?: string[]
}

const cities: CityNode[] = [
  {
    city: 'Salem',
    region: 'Tamil Nadu',
    role: 'Central Operations Hub',
    desc: 'Central coordination center for multidisciplinary audit, cost accounting, industrial compliance, and corporate financial advisory.',
    x: 236,
    y: 592,
    isHub: true,
    address: 'Team Eyrie Central Hub, Salem, Tamil Nadu',
    specialties: ['Industrial & Manufacturing Audit', 'Cost Management & MIS', 'MSME Financial Advisory', 'Central Practice Management'],
  },
  {
    city: 'New Delhi',
    region: 'National Capital Region',
    role: 'Regulatory & NCLT Hub',
    desc: 'Senior counsel for NCLT proceedings, High Court appeals, Central Direct Tax representations, and foreign investment clearances.',
    x: 225,
    y: 195,
    address: 'Barakhamba Road / Connaught Place, New Delhi',
    specialties: ['NCLT & Insolvency Matters', 'High Court & Supreme Court Appeals', 'Central Direct Tax Representations', 'FEMA & FDI Clearances'],
  },
  {
    city: 'Mumbai',
    region: 'Maharashtra',
    role: 'Financial Capital Hub',
    desc: 'Statutory bank audit, SEBI regulatory counsel, transaction structuring, due diligence, and capital markets advisory.',
    x: 136,
    y: 405,
    address: 'Bandra-Kurla Complex (BKC) / Fort, Mumbai',
    specialties: ['Statutory Bank & Concurrent Audits', 'SEBI & Capital Markets Compliance', 'M&A and Transaction Due Diligence', 'PE/VC Structuring'],
  },
  {
    city: 'Goa',
    region: 'Goa',
    role: 'Commercial & Tourism Hub',
    desc: 'Specialized advisory for hospitality, maritime logistics, GST compliance, and real estate development taxation.',
    x: 156,
    y: 495,
    address: 'Panaji, Goa',
    specialties: ['Hospitality & Tourism Taxation', 'Commercial Leases & GST Advisory', 'Statutory Audit & Assurance', 'Local Government Compliance'],
  },
  {
    city: 'Bengaluru',
    region: 'Karnataka',
    role: 'Tech & Innovation Hub',
    desc: 'End-to-end advisory for tech startups, venture-backed scaleups, ESOP design, cross-border transfer pricing, and virtual CFO services.',
    x: 215,
    y: 538,
    address: 'Indiranagar / Outer Ring Road, Bengaluru',
    specialties: ['Startup Fundraising & Cap Table', 'ESOP Architecture & Valuation', 'Cross-Border Transfer Pricing', 'Virtual CFO & ERP Setup'],
  },
  {
    city: 'Chennai',
    region: 'Tamil Nadu',
    role: 'Corporate Advisory Hub',
    desc: 'Comprehensive corporate tax, high-volume statutory audit, customs compliance, and port-adjacent enterprise assurance.',
    x: 274,
    y: 546,
    address: 'Mount Road / Nungambakkam, Chennai',
    specialties: ['Direct & Indirect Tax Litigation', 'High-Volume Statutory Audit', 'Customs & Port Logistics Tax', 'Company Secretarial Services'],
  },
  {
    city: 'Mysuru',
    region: 'Karnataka',
    role: 'Emerging Tech Hub',
    desc: 'Advisory for emerging electronics manufacturing, institutional trusts, startup corporate secretarial, and state incentive filing.',
    x: 176,
    y: 574,
    address: 'Vontikoppal, Mysuru',
    specialties: ['MSME Subsidies & Incentives', 'Trust & Institutional Audits', 'Secretarial & ROC Filings', 'Direct Tax Planning'],
  },
  {
    city: 'Namakkal',
    region: 'Tamil Nadu',
    role: 'Enterprise & Logistics Hub',
    desc: 'Industry-specific audit for fleet logistics, poultry conglomerates, educational trusts, and bank debt syndication.',
    x: 236,
    y: 622,
    address: 'Salem Road, Namakkal',
    specialties: ['Transport & Logistics Accounting', 'Agro-Industry Tax Structuring', 'Bank Debt Syndication', 'Internal Financial Controls (IFC)'],
  },
  {
    city: 'Madurai',
    region: 'Tamil Nadu',
    role: 'Commercial & Legal Hub',
    desc: 'Advisory for traditional family-owned conglomerates, succession planning, trust settlement, and High Court Bench tax litigation.',
    x: 234,
    y: 652,
    address: 'KK Nagar / Tallakulam, Madurai',
    specialties: ['Family Business Succession & Wills', 'High Court Bench Tax Litigation', 'Trust & Society Audits', 'Capital Gains Structuring'],
  },
]

export default function IndiaNetworkMap() {
  const [activeCity, setActiveCity] = useState<CityNode>(cities[0]) // Default to Salem (Central Hub)
  const [hoveredCity, setHoveredCity] = useState<CityNode | null>(null)

  const salemHub = cities[0]
  const currentCity = hoveredCity || activeCity

  // Automatically cycle through regional nodes every 4.5 seconds when user is not hovering
  useEffect(() => {
    if (hoveredCity) return
    const timer = setInterval(() => {
      setActiveCity((prev) => {
        const currIndex = cities.findIndex((c) => c.city === prev.city)
        const nextIndex = (currIndex + 1) % cities.length
        return cities[nextIndex]
      })
    }, 4500)
    return () => clearInterval(timer)
  }, [hoveredCity])

  // Generate curved Bezier connector path between city and Salem
  const getCurvePath = (city: CityNode) => {
    if (city.city === 'Salem') return null
    const x1 = city.x
    const y1 = city.y
    const x2 = salemHub.x
    const y2 = salemHub.y

    // Calculate perpendicular offset for elegant arc
    const dx = x2 - x1
    const dy = y2 - y1
    const dist = Math.hypot(dx, dy)

    // Slight curve offset towards center
    const curvature = Math.min(dist * 0.15, 30)
    const midX = (x1 + x2) / 2 - (dy / dist) * curvature * 0.5
    const midY = (y1 + y2) / 2 + (dx / dist) * curvature * 0.5

    return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`
  }

  return (
    <div
      className="india-network-section"
      style={{
        background: '#ffffff',
        borderRadius: 20,
        padding: 'clamp(24px, 4vw, 48px)',
        border: '1px solid #e2e8f0',
        boxShadow: '0 20px 50px rgba(31, 56, 100, 0.08), 0 4px 16px rgba(0, 0, 0, 0.02)',
      }}
    >
      {/* Top Section Header Ribbon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          paddingBottom: 24,
          marginBottom: 32,
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12.5,
              fontWeight: 700,
              color: '#123B6D',
              textTransform: 'uppercase',
              letterSpacing: 2,
              marginBottom: 4,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            Integrated National Hub Network
          </div>
          <h3 style={{ fontSize: 'clamp(22px, 2vw, 28px)', color: '#1f3864', fontWeight: 800, margin: 0 }}>
            PAN-India Practice Reach &amp; Convergence
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#2563eb', border: '2px solid #ffffff', boxShadow: '0 0 6px #2563eb' }} />
            <span style={{ fontSize: 13.5, color: '#475569', fontWeight: 600 }}>Commercial Practice Nodes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 14, height: 3, background: '#10b981', borderRadius: 2 }} />
            <span style={{ fontSize: 13.5, color: '#475569', fontWeight: 600 }}>Active Auto-Convergence to Salem</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Dotted Map on Left, Executive City Dossier on Right */}
      <div
        className="india-network-map-grid"
        style={{
          display: 'grid',
          gap: 'clamp(20px, 2.5vw, 32px)',
          alignItems: 'center',
        }}
      >
        {/* LEFT: Clean Vector India Map Canvas */}
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
            borderRadius: 14,
            padding: '12px 10px',
            border: '1px solid #e2e8f0',
            boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.02)',
            overflow: 'hidden',
          }}
        >
          <svg
            viewBox="30 20 540 660"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: '100%', maxHeight: '540px', height: 'auto', display: 'block' }}
          >
            <defs>
              {/* Refined Executive Filters */}
              <filter id="hubGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="goldGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Pin Gradients */}
              <linearGradient id="goldPinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E87722" />
                <stop offset="100%" stopColor="#D06312" />
              </linearGradient>

              <linearGradient id="hubPinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>

              <linearGradient id="navyPinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#123B6D" />
                <stop offset="100%" stopColor="#071A3A" />
              </linearGradient>

              {/* Keyframe Animations */}
              <style>{`
                @keyframes hubPulseRing {
                  0% { r: 6; opacity: 0.9; stroke-width: 2; }
                  60% { r: 22; opacity: 0.35; stroke-width: 1.2; }
                  100% { r: 32; opacity: 0; stroke-width: 0.5; }
                }
                @keyframes hoverPulseRing {
                  0% { r: 4; opacity: 0.85; stroke-width: 2; }
                  100% { r: 18; opacity: 0; stroke-width: 0.8; }
                }
                @keyframes flowLineDash {
                  to { stroke-dashoffset: -24; }
                }
                .flowing-green-line {
                  animation: flowLineDash 1.8s linear infinite;
                }
                .hub-radar-circle {
                  animation: hubPulseRing 2.4s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
                  transform-origin: ${salemHub.x}px ${salemHub.y}px;
                }
                .node-pulse-active {
                  animation: hoverPulseRing 1.6s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
                }
                .map-city-node {
                  transition: transform 0.22s cubic-bezier(0.2, 0.8, 0.4, 1);
                }
              `}</style>
            </defs>

            {/* Layer 0: Clean Vector India Map Silhouette & Border */}
            <g id="india-border-outline">
              <path
                d={borderData.smoothPathD}
                fill="rgba(241, 245, 249, 0.95)"
                stroke="rgba(31, 56, 100, 0.15)"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={borderData.smoothPathD}
                fill="none"
                stroke="#1f3864"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.92}
              />
            </g>

            {/* Layer 2: Automatic Moving Connection Lines & Traveling Convergence Points into Salem */}
            <g id="green-connection-lines">
              {cities.map((c, i) => {
                if (c.city === 'Salem') return null
                const isCityActive = currentCity.city === c.city
                const pathStr = getCurvePath(c)
                if (!pathStr) return null

                const duration = 2.4 + (i % 4) * 0.35

                return (
                  <g key={`line-${c.city}`}>
                    {/* Shadow/Glow Line */}
                    <path
                      d={pathStr}
                      fill="none"
                      stroke={isCityActive ? '#10b981' : '#22c55e'}
                      strokeWidth={isCityActive ? 3.5 : 1.4}
                      strokeOpacity={isCityActive ? 0.95 : 0.35}
                      filter={isCityActive ? 'url(#hubGlow)' : 'none'}
                      style={{ transition: 'all 0.25s ease' }}
                    />

                    {/* Animated Flowing Dashed Line */}
                    <path
                      d={pathStr}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth={isCityActive ? 2 : 1.1}
                      strokeDasharray="4,6"
                      strokeOpacity={isCityActive ? 0.95 : 0.4}
                      className="flowing-green-line"
                    />

                    {/* Primary Traveling Data Particle towards Salem Hub */}
                    <circle r={isCityActive ? '5' : '4'} fill="#10b981" filter="url(#hubGlow)">
                      <animateMotion
                        path={pathStr}
                        dur={`${duration}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle r="1.8" fill="#ffffff">
                      <animateMotion
                        path={pathStr}
                        dur={`${duration}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                )
              })}
            </g>

            {/* Layer 3: Salem Central Operations Hub Radar Effect */}
            <g id="salem-hub-radar">
              <circle
                cx={salemHub.x}
                cy={salemHub.y}
                r="6"
                fill="none"
                stroke="#10b981"
                className="hub-radar-circle"
              />
              <circle
                cx={salemHub.x}
                cy={salemHub.y}
                r="6"
                fill="none"
                stroke="#E87722"
                className="hub-radar-circle"
                style={{ animationDelay: '1.2s' }}
              />
            </g>

            {/* Layer 4: City Marker Nodes with Anchored Pins & Clean Labels */}
            <g id="city-marker-nodes">
              {cities.map((c) => {
                const isSelected = activeCity.city === c.city
                const isHovered = hoveredCity?.city === c.city
                const isHighlighted = isHovered || isSelected
                const isHub = c.isHub

                // Alignment: Western nodes & Bengaluru to left, eastern nodes to right
                const isLeftLabel = c.city === 'Mumbai' || c.city === 'Goa' || c.city === 'Mysuru' || c.city === 'Bengaluru'

                const labelX = c.x + (isLeftLabel ? -16 : 16)
                const labelY = c.y - (isHub ? 12 : 10)

                return (
                  <g
                    key={c.city}
                    onClick={() => {
                      setActiveCity(c)
                      setHoveredCity(null)
                    }}
                    onMouseEnter={() => {
                      setHoveredCity(c)
                      setActiveCity(c)
                    }}
                    onMouseLeave={() => setHoveredCity(null)}
                    style={{ cursor: 'pointer', pointerEvents: 'all' }}
                  >
                    {/* Generous Click/Hover Hitbox covering both pin and label area */}
                    <circle
                      cx={c.x}
                      cy={c.y - 12}
                      r={28}
                      fill="rgba(255, 255, 255, 0.001)"
                      style={{ pointerEvents: 'all' }}
                    />
                    <rect
                      x={isLeftLabel ? c.x - 90 : c.x}
                      y={c.y - 26}
                      width={95}
                      height={32}
                      fill="rgba(255, 255, 255, 0.001)"
                      style={{ pointerEvents: 'all' }}
                    />

                    {/* Ground Radar Pulse on Selection/Hover */}
                    {isHighlighted && (
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r="5"
                        fill="none"
                        stroke={isHub ? '#10b981' : isHovered ? '#E87722' : '#1E3A8A'}
                        className="node-pulse-active"
                      />
                    )}

                    {/* Unified Location Pin anchored strictly at (c.x, c.y) */}
                    <g
                      transform={`translate(${c.x}, ${c.y})`}
                      style={{
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {/* Pin geometry pointing directly down to (0,0) */}
                      <g
                        style={{
                          transform: isHighlighted ? 'scale(1.28)' : 'scale(1)',
                          transformOrigin: '0px 0px',
                          transition: 'transform 0.22s cubic-bezier(0.2, 0.8, 0.4, 1), filter 0.2s ease',
                          filter: isHovered
                            ? 'drop-shadow(0 6px 12px rgba(232, 119, 34, 0.45))'
                            : isSelected
                              ? 'drop-shadow(0 4px 8px rgba(15, 42, 74, 0.45))'
                              : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                        }}
                      >
                        {/* Pin body */}
                        <path
                          d={
                            isHub
                              ? 'M 0 0 C -2.5 -3.5 -10 -11 -10 -18 A 10 10 0 1 1 10 -18 C 10 -11 2.5 -3.5 0 0 Z'
                              : 'M 0 0 C -2 -3 -8.5 -9.5 -8.5 -15.5 A 8.5 8.5 0 1 1 8.5 -15.5 C 8.5 -9.5 2 -3 0 0 Z'
                          }
                          fill={
                            isHub
                              ? 'url(#hubPinGrad)'
                              : isHovered
                                ? 'url(#goldPinGrad)'
                                : isSelected
                                  ? 'url(#navyPinGrad)'
                                  : '#0F2A4A'
                          }
                          stroke="#ffffff"
                          strokeWidth={isHub ? 2 : 1.6}
                        />
                        {/* Center Dot */}
                        <circle
                          cx={0}
                          cy={isHub ? -18 : -15.5}
                          r={isHub ? 3.8 : 3}
                          fill="#ffffff"
                        />
                        {/* Inner Accent Core */}
                        <circle
                          cx={0}
                          cy={isHub ? -18 : -15.5}
                          r={isHub ? 2 : 1.4}
                          fill={isHub ? '#10b981' : isHovered ? '#E87722' : '#1E3A8A'}
                        />
                      </g>
                    </g>

                    {/* Crisp City Label with SVG paint-order White Halo */}
                    <text
                      x={labelX}
                      y={labelY}
                      textAnchor={isLeftLabel ? 'end' : 'start'}
                      fill={isHighlighted ? (isHub ? '#047857' : isHovered ? '#1E3A8A' : '#0F2A4A') : '#1e293b'}
                      fontSize={isHub ? '16' : isHighlighted ? '15' : '13.5'}
                      fontWeight={isHighlighted || isHub ? '800' : '700'}
                      letterSpacing="0.2px"
                      style={{
                        pointerEvents: 'all',
                        paintOrder: 'stroke fill',
                        stroke: '#ffffff',
                        strokeWidth: '4.5px',
                        strokeLinejoin: 'round',
                        strokeLinecap: 'round',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {c.city}
                      {isHub ? ' ★' : ''}
                    </text>
                  </g>
                )
              })}
            </g>
          </svg>
        </div>

        {/* RIGHT: Detailed City Dossier Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#ffffff',
            borderRadius: 14,
            padding: '24px 26px',
            border: '1.5px solid #e2e8f0',
            borderLeft: currentCity.isHub ? '5px solid #10b981' : '5px solid #1f3864',
            boxShadow: '0 8px 24px rgba(31, 56, 100, 0.06)',
            transition: 'border-color 0.25s ease',
          }}
        >
          {/* Header Row */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: 1.2,
                  padding: '4px 12px',
                  borderRadius: 14,
                  background: currentCity.isHub ? 'rgba(16, 185, 129, 0.12)' : 'rgba(31, 56, 100, 0.08)',
                  color: currentCity.isHub ? '#047857' : '#1f3864',
                  border: currentCity.isHub ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(31, 56, 100, 0.18)',
                }}
              >
                {currentCity.role}
              </span>
              <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>{currentCity.region}</span>
            </div>

            <h4
              style={{
                fontSize: 24,
                color: '#1f3864',
                fontWeight: 800,
                margin: '0 0 8px',
                letterSpacing: '-0.2px',
              }}
            >
              {currentCity.city}
              {currentCity.isHub && (
                <span style={{ fontSize: 13.5, color: '#10b981', fontWeight: 700, marginLeft: 8, verticalAlign: 'middle' }}>
                  (Central Practice &amp; Coordination Hub)
                </span>
              )}
            </h4>

            <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.6, margin: '0 0 16px' }}>
              {currentCity.desc}
            </p>

            {/* Specialties Checklist */}
            {currentCity.specialties && (
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, color: '#94a3b8', marginBottom: 10 }}>
                  Practice Specialties &amp; Domain Expertise:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8 }}>
                  {currentCity.specialties.map((spec, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        padding: '8px 12px',
                        borderRadius: 6,
                        fontSize: 13,
                        color: '#1f3864',
                        fontWeight: 600,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={currentCity.isHub ? '#10b981' : '#123B6D'} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Node Switcher Navigation */}
          <div style={{ paddingTop: 14, borderTop: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
              Select Regional Hub Node:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {cities.map((c) => {
                const isSel = currentCity.city === c.city
                return (
                  <button
                    key={c.city}
                    type="button"
                    onClick={() => {
                      setActiveCity(c)
                      setHoveredCity(null)
                    }}
                    onMouseEnter={() => setHoveredCity(c)}
                    onMouseLeave={() => setHoveredCity(null)}
                    style={{
                      background: isSel ? (c.isHub ? '#047857' : '#1f3864') : '#ffffff',
                      color: isSel ? '#ffffff' : '#334155',
                      border: isSel ? (c.isHub ? '1px solid #047857' : '1px solid #1f3864') : '1px solid #cbd5e1',
                      borderRadius: 6,
                      padding: '6px 12px',
                      fontSize: 12.5,
                      fontWeight: isSel ? 700 : 600,
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      boxShadow: isSel ? '0 2px 8px rgba(31, 56, 100, 0.2)' : 'none',
                    }}
                  >
                    {c.isHub ? '★ ' : '📍 '}{c.city}
                  </button>
                )
              })}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href="/contact"
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: currentCity.isHub ? '#047857' : '#1f3864',
                  color: '#ffffff',
                  padding: '12px 18px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 3px 10px rgba(31, 56, 100, 0.2)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>Consult {currentCity.city} Practice</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
