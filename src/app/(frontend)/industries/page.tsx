import React from 'react'
import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import SectionHeader from '@/components/layout/SectionHeader'
import CtaBanner from '@/components/layout/CtaBanner'

export const metadata: Metadata = {
  title: 'Industries We Serve — Team Eyrie',
  description:
    'Team Eyrie provides specialized advisory, audit, and tax solutions across 17 major industries including Manufacturing, Banking, IT, Real Estate, Startups, MSMEs, and Non-Profits.',
}

function renderSectorIcon(icon: string) {
  const props = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (icon) {
    case 'factory':
      return (
        <svg {...props}>
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H2z" />
          <path d="M17 18h1" />
          <path d="M12 18h1" />
          <path d="M7 18h1" />
        </svg>
      )
    case 'landmark':
      return (
        <svg {...props}>
          <line x1="3" y1="21" x2="21" y2="21" />
          <line x1="6" y1="18" x2="6" y2="11" />
          <line x1="10" y1="18" x2="10" y2="11" />
          <line x1="14" y1="18" x2="14" y2="11" />
          <line x1="18" y1="18" x2="18" y2="11" />
          <polygon points="12 2 20 7 4 7" />
        </svg>
      )
    case 'trending':
      return (
        <svg {...props}>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    case 'cpu':
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" />
          <line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" />
          <line x1="20" y1="14" x2="23" y2="14" />
        </svg>
      )
    case 'heart':
      return (
        <svg {...props}>
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    case 'building':
      return (
        <svg {...props}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="9" y1="6" x2="9" y2="6.01" />
          <line x1="15" y1="6" x2="15" y2="6.01" />
          <line x1="9" y1="10" x2="9" y2="10.01" />
          <line x1="15" y1="10" x2="15" y2="10.01" />
          <line x1="9" y1="14" x2="9" y2="14.01" />
          <line x1="15" y1="14" x2="15" y2="14.01" />
        </svg>
      )
    case 'users':
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'shopping':
      return (
        <svg {...props}>
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    case 'rocket':
      return (
        <svg {...props}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        </svg>
      )
    case 'truck':
      return (
        <svg {...props}>
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      )
    case 'leaf':
      return (
        <svg {...props}>
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6" />
        </svg>
      )
    case 'briefcase':
    default:
      return (
        <svg {...props}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
  }
}

type IndustryThemeColor = 'navy' | 'gold' | 'teal' | 'indigo' | 'sky' | 'bronze' | 'amber' | 'azure' | 'purple' | 'green' | 'royal'

const industryThemePresets: Record<
  IndustryThemeColor,
  {
    cardBg: string
    borderColor: string
    hoverBorder: string
    hoverShadow: string
    topBar: string
    iconGradient: string
    iconShadow: string
    badgeBg: string
    badgeColor: string
    badgeBorder: string
    linkColor: string
  }
> = {
  navy: {
    cardBg: 'linear-gradient(160deg, #ffffff 45%, #f1f5fa 100%)',
    borderColor: '#dbe4f0',
    hoverBorder: '#1f3864',
    hoverShadow: '0 14px 32px rgba(31, 56, 100, 0.12)',
    topBar: 'linear-gradient(90deg, #1f3864 0%, #3b66ac 100%)',
    iconGradient: 'linear-gradient(135deg, #2d508f 0%, #16294a 100%)',
    iconShadow: '0 4px 12px rgba(31, 56, 100, 0.25)',
    badgeBg: 'rgba(31, 56, 100, 0.08)',
    badgeColor: '#1f3864',
    badgeBorder: 'rgba(31, 56, 100, 0.18)',
    linkColor: '#1f3864',
  },
  gold: {
    cardBg: 'linear-gradient(160deg, #ffffff 45%, #F7F7F2 100%)',
    borderColor: '#98A2B3',
    hoverBorder: '#F0C04A',
    hoverShadow: '0 14px 32px rgba(7, 26, 58, 0.12)',
    topBar: 'linear-gradient(90deg, #123B6D 0%, #F0C04A 100%)',
    iconGradient: 'linear-gradient(135deg, #F0C04A 0%, #d4a332 100%)',
    iconShadow: '0 4px 12px rgba(240, 192, 74, 0.35)',
    badgeBg: 'rgba(18, 59, 109, 0.08)',
    badgeColor: '#123B6D',
    badgeBorder: 'rgba(18, 59, 109, 0.25)',
    linkColor: '#123B6D',
  },
  teal: {
    cardBg: 'linear-gradient(160deg, #ffffff 45%, #f0fdf9 100%)',
    borderColor: '#cbf0e7',
    hoverBorder: '#0d9488',
    hoverShadow: '0 14px 32px rgba(13, 148, 136, 0.12)',
    topBar: 'linear-gradient(90deg, #0d9488 0%, #2dd4bf 100%)',
    iconGradient: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
    iconShadow: '0 4px 12px rgba(13, 148, 136, 0.25)',
    badgeBg: 'rgba(13, 148, 136, 0.1)',
    badgeColor: '#0f766e',
    badgeBorder: 'rgba(13, 148, 136, 0.22)',
    linkColor: '#0f766e',
  },
  indigo: {
    cardBg: 'linear-gradient(160deg, #ffffff 45%, #f4f5fe 100%)',
    borderColor: '#dde1fc',
    hoverBorder: '#4f46e5',
    hoverShadow: '0 14px 32px rgba(79, 70, 229, 0.12)',
    topBar: 'linear-gradient(90deg, #4f46e5 0%, #818cf8 100%)',
    iconGradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
    iconShadow: '0 4px 12px rgba(79, 70, 229, 0.25)',
    badgeBg: 'rgba(79, 70, 229, 0.1)',
    badgeColor: '#4338ca',
    badgeBorder: 'rgba(79, 70, 229, 0.22)',
    linkColor: '#4338ca',
  },
  sky: {
    cardBg: 'linear-gradient(160deg, #ffffff 45%, #f0f7fc 100%)',
    borderColor: '#cbe5f7',
    hoverBorder: '#0284c7',
    hoverShadow: '0 14px 32px rgba(2, 132, 199, 0.12)',
    topBar: 'linear-gradient(90deg, #0284c7 0%, #38bdf8 100%)',
    iconGradient: 'linear-gradient(135deg, #38bdf8 0%, #0369a1 100%)',
    iconShadow: '0 4px 12px rgba(2, 132, 199, 0.25)',
    badgeBg: 'rgba(2, 132, 199, 0.1)',
    badgeColor: '#0369a1',
    badgeBorder: 'rgba(2, 132, 199, 0.22)',
    linkColor: '#0369a1',
  },
  bronze: {
    cardBg: 'linear-gradient(160deg, #ffffff 45%, #fcf7f1 100%)',
    borderColor: '#f6e3c9',
    hoverBorder: '#b45309',
    hoverShadow: '0 14px 32px rgba(180, 83, 9, 0.12)',
    topBar: 'linear-gradient(90deg, #b45309 0%, #fbbf24 100%)',
    iconGradient: 'linear-gradient(135deg, #f59e0b 0%, #9a3412 100%)',
    iconShadow: '0 4px 12px rgba(180, 83, 9, 0.25)',
    badgeBg: 'rgba(180, 83, 9, 0.1)',
    badgeColor: '#b45309',
    badgeBorder: 'rgba(180, 83, 9, 0.22)',
    linkColor: '#b45309',
  },
  amber: {
    cardBg: 'linear-gradient(160deg, #ffffff 45%, #fefbf3 100%)',
    borderColor: '#faebd4',
    hoverBorder: '#d97706',
    hoverShadow: '0 14px 32px rgba(217, 119, 6, 0.12)',
    topBar: 'linear-gradient(90deg, #d97706 0%, #fcd34d 100%)',
    iconGradient: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
    iconShadow: '0 4px 12px rgba(217, 119, 6, 0.25)',
    badgeBg: 'rgba(217, 119, 6, 0.1)',
    badgeColor: '#b45309',
    badgeBorder: 'rgba(217, 119, 6, 0.22)',
    linkColor: '#b45309',
  },
  azure: {
    cardBg: 'linear-gradient(160deg, #ffffff 45%, #f1f6fd 100%)',
    borderColor: '#d0e1fc',
    hoverBorder: '#2563eb',
    hoverShadow: '0 14px 32px rgba(37, 99, 235, 0.12)',
    topBar: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
    iconGradient: 'linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)',
    iconShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
    badgeBg: 'rgba(37, 99, 235, 0.1)',
    badgeColor: '#1d4ed8',
    badgeBorder: 'rgba(37, 99, 235, 0.22)',
    linkColor: '#1d4ed8',
  },
  purple: {
    cardBg: 'linear-gradient(160deg, #ffffff 45%, #f6f4fe 100%)',
    borderColor: '#e5dcfa',
    hoverBorder: '#7c3aed',
    hoverShadow: '0 14px 32px rgba(124, 58, 237, 0.12)',
    topBar: 'linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%)',
    iconGradient: 'linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)',
    iconShadow: '0 4px 12px rgba(124, 58, 237, 0.25)',
    badgeBg: 'rgba(124, 58, 237, 0.1)',
    badgeColor: '#6d28d9',
    badgeBorder: 'rgba(124, 58, 237, 0.22)',
    linkColor: '#6d28d9',
  },
  green: {
    cardBg: 'linear-gradient(160deg, #ffffff 45%, #f0fdf4 100%)',
    borderColor: '#cbf3d8',
    hoverBorder: '#16a34a',
    hoverShadow: '0 14px 32px rgba(22, 163, 74, 0.12)',
    topBar: 'linear-gradient(90deg, #16a34a 0%, #4ade80 100%)',
    iconGradient: 'linear-gradient(135deg, #4ade80 0%, #15803d 100%)',
    iconShadow: '0 4px 12px rgba(22, 163, 74, 0.25)',
    badgeBg: 'rgba(22, 163, 74, 0.1)',
    badgeColor: '#15803d',
    badgeBorder: 'rgba(22, 163, 74, 0.22)',
    linkColor: '#15803d',
  },
  royal: {
    cardBg: 'linear-gradient(160deg, #ffffff 45%, #f0f4fd 100%)',
    borderColor: '#cfdcfa',
    hoverBorder: '#1e3a8a',
    hoverShadow: '0 14px 32px rgba(30, 58, 138, 0.12)',
    topBar: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)',
    iconGradient: 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)',
    iconShadow: '0 4px 12px rgba(30, 58, 138, 0.25)',
    badgeBg: 'rgba(30, 58, 138, 0.1)',
    badgeColor: '#1e3a8a',
    badgeBorder: 'rgba(30, 58, 138, 0.22)',
    linkColor: '#1e3a8a',
  },
}

const industries: Array<{
  code: string
  name: string
  desc: string
  icon: string
  theme: IndustryThemeColor
}> = [
    { code: 'SEC-01', name: 'Manufacturing', desc: 'Costing, GST compliance, internal financial controls, inventory audit, and tax structuring.', icon: 'factory', theme: 'navy' },
    { code: 'SEC-02', name: 'Banking & Financial Services', desc: 'Statutory bank audit, concurrent audit, regulatory compliance, and risk management.', icon: 'landmark', theme: 'gold' },
    { code: 'SEC-03', name: 'NBFCs', desc: 'RBI regulatory compliance, statutory audit, asset classification, and corporate governance.', icon: 'trending', theme: 'teal' },
    { code: 'SEC-04', name: 'Information Technology', desc: 'SEZ compliance, international taxation, transfer pricing, and IP structuring.', icon: 'cpu', theme: 'indigo' },
    { code: 'SEC-05', name: 'Healthcare & Pharma', desc: 'Hospital accounting, regulatory compliance, GST advisory, and M&A due diligence.', icon: 'heart', theme: 'sky' },
    { code: 'SEC-06', name: 'Infrastructure & Engineering', desc: 'Project financing, joint venture structuring, EPC taxation, and forensic reviews.', icon: 'building', theme: 'teal' },
    { code: 'SEC-07', name: 'Real Estate & Construction', desc: 'RERA compliance, capital gains tax advisory, joint development agreement (JDA) tax.', icon: 'building', theme: 'bronze' },
    { code: 'SEC-08', name: 'Hospitality & Tourism', desc: 'Operational audits, revenue assurance, lease transaction structuring, and tax filing.', icon: 'users', theme: 'amber' },
    { code: 'SEC-09', name: 'Retail & Consumer Goods', desc: 'Supply chain GST, inventory audit, franchise structuring, and POS financial control.', icon: 'shopping', theme: 'azure' },
    { code: 'SEC-10', name: 'E-Commerce & Digital Business', desc: 'TDS/TCS marketplace compliance, cross-border payments, and startup valuation.', icon: 'rocket', theme: 'purple' },
    { code: 'SEC-11', name: 'Logistics & Transportation', desc: 'Fleet GST compliance, vehicle lease taxation, and multi-state tax structuring.', icon: 'truck', theme: 'sky' },
    { code: 'SEC-12', name: 'Renewable Energy', desc: 'ESG reporting, subsidy compliance, project finance due diligence, and direct tax.', icon: 'leaf', theme: 'green' },
    { code: 'SEC-13', name: 'Education & Academics', desc: 'University trust audits, FCRA compliance, exemption advisory, and internal control.', icon: 'landmark', theme: 'royal' },
    { code: 'SEC-14', name: 'Start-ups & Scale-ups', desc: 'VC/PE fundraising advisory, investor due diligence, cap table, and ESOP structuring.', icon: 'rocket', theme: 'gold' },
    { code: 'SEC-15', name: 'MSMEs & Enterprise', desc: 'Subsidies, bank loan syndication, virtual CFO, tax planning, and statutory audit.', icon: 'briefcase', theme: 'navy' },
    { code: 'SEC-16', name: 'Family-Owned Businesses', desc: 'Family constitution, succession planning, trust settlement, and wealth preservation.', icon: 'users', theme: 'bronze' },
    { code: 'SEC-17', name: 'Trusts & Non-Profit Organisations', desc: '12A/80G tax exemptions, FCRA filings, statutory trust audits, and governance.', icon: 'heart', theme: 'green' },
  ]

export default function IndustriesPage() {
  return (
    <main>
      <PageHero
        title="Industries We Serve"
        subtitle="Deep Domain Specialization Across 17 Core Economic Sectors"
        eyebrow="Specialized Sector Practices"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Industries We Serve' }]}
        bgImage="/images/industries.png"
      />

      <section className="section" style={{ padding: '48px 0', background: '#ffffff' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Sector Experience"
            title="Tailored Solutions for Diverse Industry Landscapes"
            subtitle="Our multidisciplinary team brings deep regulatory insights and operational understanding tailored to the unique financial and tax requirements of each sector."
          />

          <div className="industry-sectors-grid">
            {industries.map((ind) => {
              const theme = industryThemePresets[ind.theme]
              return (
                <div
                  key={ind.code}
                  id={ind.code.toLowerCase()}
                  className="industry-sector-card"
                  style={
                    {
                      '--card-bg': theme.cardBg,
                      '--card-border': theme.borderColor,
                      '--hover-border': theme.hoverBorder,
                      '--hover-shadow': theme.hoverShadow,
                      '--top-bar': theme.topBar,
                      scrollMarginTop: 90,
                    } as React.CSSProperties
                  }
                >
                  <div>
                    {/* Card Header with Icon Badge and Sector Code */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div
                        className="industry-sector-icon"
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 10,
                          background: theme.iconGradient,
                          border: '1.5px solid rgba(255, 255, 255, 0.85)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: theme.iconShadow,
                          color: '#ffffff',
                        }}
                      >
                        {renderSectorIcon(ind.icon)}
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: theme.badgeColor,
                          background: theme.badgeBg,
                          border: `1px solid ${theme.badgeBorder}`,
                          padding: '2.5px 8px',
                          borderRadius: 4,
                          letterSpacing: 0.6,
                          textTransform: 'uppercase',
                        }}
                      >
                        {ind.code}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: 17.5,
                        fontWeight: 800,
                        color: '#1f3864',
                        margin: '0 0 8px',
                        lineHeight: 1.3,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {ind.name}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: 13,
                        color: '#526071',
                        margin: 0,
                        lineHeight: 1.55,
                      }}
                    >
                      {ind.desc}
                    </p>
                  </div>

                  {/* Action Footer */}
                  <div
                    style={{
                      marginTop: 18,
                      paddingTop: 12,
                      borderTop: `1px dashed ${theme.borderColor}`,
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <a
                      href={`/contact?sector=${encodeURIComponent(ind.name)}`}
                      className="industry-sector-link"
                      style={{
                        color: theme.linkColor,
                      }}
                    >
                      <span>Consult Industry Partner</span>
                      <span className="industry-sector-arrow">→</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          <CtaBanner
            eyebrow="Sector Advisory"
            title="Seeking Sector-Specific Advisory or Audit?"
            description="Connect with our industry specialists to discuss tailored professional solutions for your organization."
            primaryLabel="Contact Industry Specialist"
            primaryHref="/contact"
            secondaryLabel="View Full Service Catalog"
            secondaryHref="/services"
          />
        </div>
      </section>
    </main>
  )
}
