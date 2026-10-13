'use client'

import React, { useState, useEffect } from 'react'
import CorporateIcon from '@/components/ui/CorporateIcon'

export interface ValuePillarItem {
  id: string
  num: string
  title: string
  iconName: string
  tag: string
  subtitle: string
  shortSummary: string
  fullDetails: string
  keyStrengths: string[]
  leadershipNote?: string
}

export const defaultPillars: ValuePillarItem[] = [
  {
    id: 'collective-intelligence',
    num: '01',
    title: 'Collective Intelligence',
    iconName: 'consulting',
    tag: 'Strategic Synergy',
    subtitle: 'Unified multidisciplinary strength under one single umbrella.',
    shortSummary:
      'A powerful network of experienced professionals delivering multidisciplinary solutions without the friction of multiple independent advisors.',
    fullDetails:
      'By bringing together nearly 20 Chartered Accountants along with Company Secretaries, Advocates, Cost Accountants, MBAs, Insolvency Professionals, and Valuation Specialists, Team Eyrie provides comprehensive, unified advisory. Our multidisciplinary approach eliminates operational silos, ensuring our clients receive coordinated insights across taxation, legal, audit, and strategic financial planning.',
    keyStrengths: [
      'Nearly 20 Senior Chartered Accountants',
      'Dedicated Company Secretaries & Governance Experts',
      'High Court & Supreme Court Legal Counsel',
      'Registered Insolvency & Valuation Professionals (IBBI)',
    ],
    leadershipNote:
      'Eliminates the complexity and conflicting advice of dealing with disconnected individual consultants.',
  },
  {
    id: 'national-reach',
    num: '02',
    title: 'National Reach',
    iconName: 'pin',
    tag: 'PAN-India Network',
    subtitle: 'Strong regional presence across 9 key Indian commercial hubs.',
    shortSummary:
      'Seamless service delivery and localized regulatory compliance backed by centralized institutional capabilities across India.',
    fullDetails:
      'Our network offices in Chennai, Bengaluru, Mumbai, New Delhi, Goa, Salem, Madurai, Namakkal, and Mysuru provide immediate local regulatory representation combined with national-scale execution. Whether representing matters before regional NCLT benches, state GST tribunals, or central ministry bodies, our presence ensures rapid, dependable action.',
    keyStrengths: [
      'Presence across 9 Major Commercial Centers',
      'Central Operations & Quality Control Hub at Salem',
      'Rapid representation before Regional Appellate Benches',
      'Standardized audit and compliance protocols across all branches',
    ],
    leadershipNote:
      'Local intimacy with regional regulatory bodies backed by the strength of a national alliance.',
  },
  {
    id: 'sector-expertise',
    num: '03',
    title: 'Sector Expertise',
    iconName: 'corporate',
    tag: '17+ Core Domains',
    subtitle: 'Tailored solutions engineered for specific industry verticals.',
    shortSummary:
      'Deep regulatory insights and operational understanding addressing the unique accounting, tax, and compliance demands of diverse sectors.',
    fullDetails:
      'From High-Tech Manufacturing and BFSI to Startups, Real Estate, E-Commerce, Logistics, and Non-Profit Trusts, our partners bring tailored insights that address industry-specific challenges. We understand sectoral subsidy schemes, specialized tax regimes, and regulatory nuances governing each market domain.',
    keyStrengths: [
      'Specialized practices for 17+ Economic Sectors',
      'Tailored internal financial controls (IFC) by sector',
      'Sectoral subsidy, SEZ, and PLI scheme advisory',
      'Industry-specific benchmarking and statutory audit models',
    ],
    leadershipNote:
      'Industry-focused advisory ensures compliance is aligned directly with operational growth.',
  },
  {
    id: 'tech-driven',
    num: '04',
    title: 'Technology-Driven Delivery',
    iconName: 'gst',
    tag: 'Digital Innovation',
    subtitle: 'Automated workflows, secure portals, and AI-assisted data analytics.',
    shortSummary:
      'Modern audit toolsets, secure client portals, and automated tax workflows that maximize execution speed, accuracy, and data security.',
    fullDetails:
      'We leverage cutting-edge audit management platforms, secure cloud document vaults, automated reconciliation scripts, and AI-assisted regulatory analysis. This technology infrastructure drastically reduces turnaround times, eliminates manual reporting errors, and ensures complete client data confidentiality.',
    keyStrengths: [
      'Encrypted Cloud Client Document Portals',
      'Automated Multi-State GST & TDS Reconciliation',
      'AI-Assisted Case Law and Jurisprudence Analytics',
      'Real-Time Audit Milestone Tracking Dashboards',
    ],
    leadershipNote:
      'Technology amplifies professional precision and delivers measurable time savings to client teams.',
  },
  {
    id: 'client-centric',
    num: '05',
    title: 'Client-Centric Philosophy',
    iconName: 'handshake',
    tag: 'Partner-Led Trust',
    subtitle: 'Direct senior partner engagement with transparent, measurable outcomes.',
    shortSummary:
      'Long-term client partnerships driven by responsiveness, strict ethical standards, transparency, and tailored executive attention.',
    fullDetails:
      'We believe enduring client relationships are built on trust and accessibility. Unlike traditional firms where senior leadership remains distant, Team Eyrie ensures direct, hands-on partner involvement in every client assignment. Every deliverable undergoes multi-tier peer review to guarantee the highest standard of institutional excellence.',
    keyStrengths: [
      'Direct Access to Senior Practice Partners',
      'Multi-Tier Quality Review & Four-Eye Principle',
      'Transparent Engagement Scopes & Timelines',
      'Proactive Regulatory Alert System for Clients',
    ],
    leadershipNote:
      'Every client engagement receives the strategic focus of senior leaders, not junior delegates.',
  },
  {
    id: 'global-perspective',
    num: '06',
    title: 'Global Perspective',
    iconName: 'global',
    tag: 'Cross-Border Advisory',
    subtitle: 'Navigating international taxation, transfer pricing, and inbound FDI.',
    shortSummary:
      'Assisting Indian enterprises expanding overseas and global corporations establishing thriving compliant operations in India.',
    fullDetails:
      'Whether advising international conglomerates on Indian market entry (FDI, FEMA, RBI compliance) or assisting homegrown Indian businesses with overseas joint ventures and transfer pricing, our cross-border practice provides end-to-end global tax structuring and bilateral treaty optimization.',
    keyStrengths: [
      'International Tax Structuring & DTAA Treaty Relief',
      'Transfer Pricing Documentation & Benchmark Studies',
      'Inbound Foreign Direct Investment (FDI) & RBI Filings',
      'Expatriate Taxation and Cross-Border IP Structuring',
    ],
    leadershipNote:
      'Empowering clients to scale internationally with complete regulatory certainty.',
  },
]

export default function WhyEyriePillarsGrid({
  pillars = defaultPillars,
}: {
  pillars?: ValuePillarItem[]
}) {
  const [selectedPillar, setSelectedPillar] = useState<ValuePillarItem | null>(null)

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPillar(null)
    }
    if (selectedPillar) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPillar])

  return (
    <div>
      {/* 3x2 Symmetrical Grid (Responsive) */}
      <div
        style={{
          display: 'grid',
          gap: 20,
        }}
        className="why-pillars-symmetrical-grid"
      >
        {pillars.map((pil) => (
          <div
            key={pil.id}
            className="corporate-card corporate-card--light"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '24px 22px',
              borderRadius: 14,
              border: '1.5px solid #e2e8f0',
              background: '#ffffff',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              transition: 'all 0.25s ease',
              position: 'relative',
            }}
          >
            <div>
              {/* Card Header: Gold Icon & Number Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #1d4ed8 0%, #0f172a 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(7, 26, 58, 0.25)',
                  }}
                >
                  <CorporateIcon name={pil.iconName} size={22} color="#ffffff" strokeWidth={2.4} />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                    color: '#1d4ed8',
                    background: 'rgba(18, 59, 109, 0.1)',
                    padding: '3px 9px',
                    borderRadius: 4,
                  }}
                >
                  {pil.tag}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3
                style={{
                  fontSize: 19,
                  fontWeight: 800,
                  color: '#0f172a',
                  margin: '0 0 6px',
                  letterSpacing: '-0.01em',
                }}
              >
                {pil.title}
              </h3>
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: '#1d4ed8',
                  marginBottom: 10,
                  lineHeight: 1.4,
                }}
              >
                {pil.subtitle}
              </div>

              {/* Short Summary */}
              <p
                style={{
                  fontSize: 13.5,
                  color: '#526071',
                  lineHeight: 1.55,
                  margin: '0 0 16px',
                  textAlign: 'justify',
                  textJustify: 'inter-word',
                }}
              >
                {pil.shortSummary}
              </p>
            </div>

            {/* Read More Trigger Button */}
            <div
              style={{
                paddingTop: 14,
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedPillar(pil)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#1d4ed8',
                  fontSize: 13.5,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f26522')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#1d4ed8')}
              >
                <span>Read More</span>
                <span style={{ transition: 'transform 0.2s ease' }}>→</span>
              </button>
              <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700 }}>
                {pil.num}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Light-Theme Pop-up Modal */}
      {selectedPillar && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPillar(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.22s ease-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: 18,
              maxWidth: 620,
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1.5px solid #94A3B8',
              borderTop: '5px solid #f26522',
              boxShadow: '0 25px 60px rgba(15, 42, 74, 0.22), 0 4px 16px rgba(0, 0, 0, 0.04)',
              padding: 'clamp(24px, 4vw, 36px)',
              position: 'relative',
              animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPillar(null)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                color: '#475569',
                fontSize: 18,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e2e8f0'
                e.currentTarget.style.color = '#0f172a'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f1f5f9'
                e.currentTarget.style.color = '#475569'
              }}
            >
              ✕
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #0f172a 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 6px 16px rgba(7, 26, 58, 0.25)',
                }}
              >
                <CorporateIcon name={selectedPillar.iconName} size={26} color="#ffffff" strokeWidth={2.4} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: '#1d4ed8',
                      background: 'rgba(18, 59, 109, 0.1)',
                      padding: '2.5px 8px',
                      borderRadius: 4,
                      letterSpacing: 0.8,
                      textTransform: 'uppercase',
                    }}
                  >
                    Pillar {selectedPillar.num} • {selectedPillar.tag}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: 24,
                    color: '#0f172a',
                    fontWeight: 800,
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {selectedPillar.title}
                </h3>
              </div>
            </div>

            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#1d4ed8',
                marginBottom: 16,
                paddingBottom: 14,
                borderBottom: '1px solid #98A2B3',
              }}
            >
              {selectedPillar.subtitle}
            </div>

            {/* In-Depth Proposition */}
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.8, color: '#94a3b8', fontWeight: 800, marginBottom: 8 }}>
                Executive Overview:
              </h4>
              <p
                style={{
                  color: '#334155',
                  fontSize: 14.5,
                  lineHeight: 1.68,
                  margin: 0,
                  textAlign: 'justify',
                  textJustify: 'inter-word',
                }}
              >
                {selectedPillar.fullDetails}
              </p>
            </div>

            {/* Key Capabilities / Value Drivers */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.8, color: '#94a3b8', fontWeight: 800, marginBottom: 10 }}>
                Domain Strengths &amp; Capabilities:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
                {selectedPillar.keyStrengths.map((str, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      background: '#F8FAFC',
                      border: '1px solid #98A2B3',
                      borderRadius: 8,
                      padding: '10px 14px',
                      fontSize: 13.5,
                      color: '#0f172a',
                      fontWeight: 600,
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: '#1d4ed8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <CorporateIcon name="check" size={12} color="#ffffff" strokeWidth={3} />
                    </div>
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership Quality Note */}
            {selectedPillar.leadershipNote && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #FFF7ED 100%)',
                  border: '1px solid #94A3B8',
                  borderLeft: '4px solid #f26522',
                  borderRadius: 8,
                  padding: '12px 16px',
                  marginBottom: 24,
                  fontSize: 13,
                  color: '#0f172a',
                  lineHeight: 1.5,
                }}
              >
                <strong style={{ color: '#1d4ed8' }}>Team Eyrie Advantage:</strong> {selectedPillar.leadershipNote}
              </div>
            )}

            {/* Action Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 12,
                paddingTop: 16,
                borderTop: '1px solid #e2e8f0',
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedPillar(null)}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  color: '#475569',
                  padding: '10px 20px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
              <a
                href={`/contact?pillar=${encodeURIComponent(selectedPillar.title)}`}
                style={{
                  background: '#f26522',
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '10px 22px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 14px rgba(242, 101, 34, 0.35)',
                }}
              >
                <span>Consult Senior Partner</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Breakpoints Style */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.94); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 980px) {
          .why-pillars-symmetrical-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 620px) {
          .why-pillars-symmetrical-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
