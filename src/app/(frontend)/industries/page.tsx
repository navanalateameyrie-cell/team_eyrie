import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/layout/PageHero'
import SectionHeader from '@/components/layout/SectionHeader'
import CtaBanner from '@/components/layout/CtaBanner'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Industries We Serve — Team Eyrie',
  description:
    'Team Eyrie provides specialized advisory, audit, and tax solutions across 17 major industries including Manufacturing, Banking, IT, Real Estate, Startups, MSMEs, and Non-Profits.',
}

function renderSectorIcon(icon: string) {
  const props = {
    width: 36,
    height: 36,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (icon) {
    case 'factory':
      return (
        <svg {...props}>
          <path d="M3 21h18M3 21V9l5 4V9l5 4V7l8-3v17" />
          <line x1="7" y1="17" x2="7.01" y2="17" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
          <line x1="17" y1="17" x2="17.01" y2="17" />
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
          <polygon points="12 3 21 8 3 8" />
        </svg>
      )
    case 'trending':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <polyline points="7 15 11 11 14 14 17 9" />
          <polyline points="14 9 17 9 17 12" />
        </svg>
      )
    case 'laptop':
    case 'cpu':
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <line x1="2" y1="20" x2="22" y2="20" />
          <line x1="9" y1="10" x2="9" y2="10.01" />
          <line x1="15" y1="10" x2="15" y2="10.01" />
          <line x1="12" y1="10" x2="12" y2="12" />
        </svg>
      )
    case 'heart-pulse':
    case 'heart':
      return (
        <svg {...props}>
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
          <path d="M3.5 12h3.5l2-3.5 3 7 2-3.5h6.5" />
        </svg>
      )
    case 'helmet':
      return (
        <svg {...props}>
          <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a8 8 0 0 0-7.05-7.94V6a2 2 0 0 0-4 0v2.06A8 8 0 0 0 2 16v2z" />
          <line x1="6" y1="19" x2="6" y2="16" />
          <line x1="18" y1="19" x2="18" y2="16" />
        </svg>
      )
    case 'home':
    case 'building':
      return (
        <svg {...props}>
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    case 'cloche':
      return (
        <svg {...props}>
          <path d="M4 18h16" />
          <path d="M4 18a8 8 0 0 1 16 0" />
          <circle cx="12" cy="7" r="1.5" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      )
    case 'cart':
    case 'shopping':
      return (
        <svg {...props}>
          <circle cx="8" cy="21" r="1.5" />
          <circle cx="18" cy="21" r="1.5" />
          <path d="M2 3h3l2.4 11.2a2 2 0 0 0 2 1.6h9.2a2 2 0 0 0 2-1.6L22 6H6" />
        </svg>
      )
    case 'e-commerce':
      return (
        <svg {...props}>
          <rect x="2" y="5" width="16" height="11" rx="2" />
          <line x1="2" y1="9" x2="18" y2="9" />
          <circle cx="17.5" cy="15.5" r="3.5" />
          <line x1="14" y1="15.5" x2="21" y2="15.5" />
          <line x1="17.5" y1="12" x2="17.5" y2="19" />
        </svg>
      )
    case 'truck':
      return (
        <svg {...props}>
          <rect x="1" y="4" width="14" height="12" rx="1" />
          <path d="M15 8h4l3 4v4h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      )
    case 'leaf':
      return (
        <svg {...props}>
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z" />
          <path d="M2 21c0-3 1.8-5.4 5-6" />
        </svg>
      )
    case 'graduation-cap':
      return (
        <svg {...props}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      )
    case 'rocket':
      return (
        <svg {...props}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        </svg>
      )
    case 'briefcase':
      return (
        <svg {...props}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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
    default:
      return (
        <svg {...props}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
  }
}

const industries: Array<{
  code: string
  name: string
  desc: string
  icon: string
}> = [
    { code: 'SEC-01', name: 'Manufacturing', desc: 'Costing, GST compliance, internal financial controls, inventory audit, and tax structuring.', icon: 'factory' },
    { code: 'SEC-02', name: 'Banking & Financial Services', desc: 'Statutory bank audit, concurrent audit, regulatory compliance, and risk management.', icon: 'landmark' },
    { code: 'SEC-03', name: 'NBFCs', desc: 'RBI regulatory compliance, statutory audit, asset classification, and corporate governance.', icon: 'trending' },
    { code: 'SEC-04', name: 'Information Technology', desc: 'SEZ compliance, international taxation, transfer pricing, and IP structuring.', icon: 'laptop' },
    { code: 'SEC-05', name: 'Healthcare', desc: 'Hospital accounting, regulatory compliance, GST advisory, and M&A due diligence.', icon: 'heart-pulse' },
    { code: 'SEC-06', name: 'Infrastructure', desc: 'Project financing, joint venture structuring, EPC taxation, and forensic reviews.', icon: 'helmet' },
    { code: 'SEC-07', name: 'Real Estate', desc: 'RERA compliance, capital gains tax advisory, joint development agreement (JDA) tax.', icon: 'home' },
    { code: 'SEC-08', name: 'Hospitality', desc: 'Operational audits, revenue assurance, lease transaction structuring, and tax filing.', icon: 'cloche' },
    { code: 'SEC-09', name: 'Retail', desc: 'Supply chain GST, inventory audit, franchise structuring, and POS financial control.', icon: 'cart' },
    { code: 'SEC-10', name: 'E-Commerce', desc: 'TDS/TCS marketplace compliance, cross-border payments, and startup valuation.', icon: 'e-commerce' },
    { code: 'SEC-11', name: 'Logistics', desc: 'Fleet GST compliance, vehicle lease taxation, and multi-state tax structuring.', icon: 'truck' },
    { code: 'SEC-12', name: 'Renewable Energy', desc: 'ESG reporting, subsidy compliance, project finance due diligence, and direct tax.', icon: 'leaf' },
    { code: 'SEC-13', name: 'Education', desc: 'University trust audits, FCRA compliance, exemption advisory, and internal control.', icon: 'graduation-cap' },
    { code: 'SEC-14', name: 'Start-ups', desc: 'VC/PE fundraising advisory, investor due diligence, cap table, and ESOP structuring.', icon: 'rocket' },
    { code: 'SEC-15', name: 'MSMEs', desc: 'Subsidies, bank loan syndication, virtual CFO, tax planning, and statutory audit.', icon: 'briefcase' },
    { code: 'SEC-16', name: 'Family-Owned Businesses', desc: 'Family constitution, succession planning, trust settlement, and wealth preservation.', icon: 'users' },
    { code: 'SEC-17', name: 'Trusts & Non-Profit Organisations', desc: '12A/80G tax exemptions, FCRA filings, statutory trust audits, and governance.', icon: 'heart-pulse' },
  ]

export default async function IndustriesPage() {
  let displayIndustries = industries
  let bannerTitle = 'Industries We Serve'
  let bannerSubtitle = 'Deep Domain Specialization Across 17 Core Economic Sectors'
  let bannerEyebrow = 'Specialized Sector Practices'
  let bannerImage = '/images/industries.png'
  let bannerFocal = 'right center'

  try {
    const payload = await getPayload({ config })
    const [dbIndustries, pageBannersRes] = await Promise.all([
      payload.find({
        collection: 'industries',
        limit: 50,
        sort: 'order',
      }).catch(() => null),
      payload.findGlobal({ slug: 'page-banners' as any, depth: 1 }).catch(() => null),
    ])

    if (dbIndustries && dbIndustries.docs && dbIndustries.docs.length > 0) {
      displayIndustries = dbIndustries.docs.map((doc: any, idx: number) => {
        const fallback = industries[idx % industries.length]
        return {
          code: `SEC-${String(idx + 1).padStart(2, '0')}`,
          name: doc.name,
          desc: doc.description || fallback.desc,
          icon: fallback.icon,
        }
      })
    }

    const indBanner = (pageBannersRes as any)?.industries
    if (indBanner) {
      if (indBanner.title) bannerTitle = indBanner.title
      if (indBanner.subtitle) bannerSubtitle = indBanner.subtitle
      if (indBanner.eyebrow) bannerEyebrow = indBanner.eyebrow
      if (typeof indBanner.bgImage === 'object' && indBanner.bgImage?.url) {
        bannerImage = indBanner.bgImage.url
      } else if (typeof indBanner.bgImage === 'string') {
        bannerImage = indBanner.bgImage
      }
      if (indBanner.focalPosition) bannerFocal = indBanner.focalPosition
    }
  } catch {
    // Fallback gracefully to curated defaults
  }

  return (
    <main>
      <PageHero
        title={bannerTitle}
        subtitle={bannerSubtitle}
        eyebrow={bannerEyebrow}
        crumbs={[{ label: 'Home', href: '/' }, { label: bannerTitle }]}
        bgImage={bannerImage}
        bgPosition={bannerFocal}
      />

      <section className="section" style={{ padding: '56px 0 64px', background: '#ffffff' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Industries We Serve"
            title="Specialist insight. Sector-specific expertise."
            subtitle="We provide tailored accounting, tax and advisory solutions across 17 key industry sectors, helping businesses stay compliant, efficient and future-ready."
          />

          <div className="industry-editorial-grid">
            {displayIndustries.map((ind, idx) => {
              const num = String(idx + 1).padStart(2, '0')
              return (
                <div
                  key={ind.code || num}
                  id={(ind.code || `sec-${num}`).toLowerCase()}
                  className="industry-editorial-item"
                  style={{ scrollMarginTop: 90 }}
                >
                  {/* Step / Sector Number */}
                  <div className="industry-editorial-num">{num}</div>

                  {/* Body: Outline Icon + Content */}
                  <div className="industry-editorial-body">
                    <div className="industry-editorial-icon">
                      {renderSectorIcon(ind.icon)}
                    </div>

                    <div className="industry-editorial-content">
                      <h3 className="industry-editorial-title">{ind.name}</h3>
                      <p className="industry-editorial-desc">{ind.desc}</p>
                      <a
                        href={`/contact?sector=${encodeURIComponent(ind.name)}`}
                        className="industry-editorial-link"
                      >
                        <span>Consult Industry Partner</span>
                        <span className="industry-editorial-arrow">→</span>
                      </a>
                    </div>
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
