import React from 'react'
import type { Metadata } from 'next'
import PageHero from '../../../components/PageHero'
import SectionHeader from '../../../components/SectionHeader'
import CtaBanner from '../../../components/CtaBanner'
import CorporateIcon from '../../../components/CorporateIcon'

export const metadata: Metadata = {
  title: 'Services — Team Eyrie',
  description:
    'Integrated professional services across Assurance & Audit, Tax Advisory, GST & Indirect Taxes, Corporate & Regulatory Advisory, Business Consulting, Transaction Advisory, Family Business Advisory, and Global Business Services.',
}

type ServiceThemeColor = 'navy' | 'gold' | 'teal' | 'indigo' | 'sky' | 'emerald' | 'bronze' | 'azure'

const serviceThemePresets: Record<
  ServiceThemeColor,
  {
    cardBg: string
    borderColor: string
    hoverBorder: string
    hoverShadow: string
    topBar: string
    iconGradient: string
    iconShadow: string
    tagBg: string
    tagBorder: string
    tagHoverBorder: string
    checkColor: string
    linkColor: string
  }
> = {
  navy: {
    cardBg: 'linear-gradient(155deg, #ffffff 40%, #f0f4fa 100%)',
    borderColor: '#dbe4f0',
    hoverBorder: '#1f3864',
    hoverShadow: '0 16px 36px rgba(31, 56, 100, 0.12)',
    topBar: 'linear-gradient(90deg, #1f3864 0%, #3b66ac 100%)',
    iconGradient: 'linear-gradient(135deg, #2d508f 0%, #16294a 100%)',
    iconShadow: '0 6px 16px rgba(31, 56, 100, 0.28)',
    tagBg: '#f5f8fc',
    tagBorder: '#dbe6f3',
    tagHoverBorder: '#1f3864',
    checkColor: '#1f3864',
    linkColor: '#1f3864',
  },
  gold: {
    cardBg: 'linear-gradient(155deg, #ffffff 40%, #fdfaf4 100%)',
    borderColor: '#eee3d2',
    hoverBorder: '#b08d57',
    hoverShadow: '0 16px 36px rgba(176, 141, 87, 0.14)',
    topBar: 'linear-gradient(90deg, #b08d57 0%, #e0b469 100%)',
    iconGradient: 'linear-gradient(135deg, #e5b358 0%, #b08d57 100%)',
    iconShadow: '0 6px 16px rgba(176, 141, 87, 0.32)',
    tagBg: '#fdfbf6',
    tagBorder: '#f2e8d9',
    tagHoverBorder: '#b08d57',
    checkColor: '#b08d57',
    linkColor: '#967341',
  },
  teal: {
    cardBg: 'linear-gradient(155deg, #ffffff 40%, #f0fdf9 100%)',
    borderColor: '#cbf0e7',
    hoverBorder: '#0d9488',
    hoverShadow: '0 16px 36px rgba(13, 148, 136, 0.12)',
    topBar: 'linear-gradient(90deg, #0d9488 0%, #2dd4bf 100%)',
    iconGradient: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
    iconShadow: '0 6px 16px rgba(13, 148, 136, 0.28)',
    tagBg: '#f0fbf8',
    tagBorder: '#d2f2ea',
    tagHoverBorder: '#0d9488',
    checkColor: '#0d9488',
    linkColor: '#0f766e',
  },
  indigo: {
    cardBg: 'linear-gradient(155deg, #ffffff 40%, #f4f5fe 100%)',
    borderColor: '#dde1fc',
    hoverBorder: '#4f46e5',
    hoverShadow: '0 16px 36px rgba(79, 70, 229, 0.12)',
    topBar: 'linear-gradient(90deg, #4f46e5 0%, #818cf8 100%)',
    iconGradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
    iconShadow: '0 6px 16px rgba(79, 70, 229, 0.28)',
    tagBg: '#f6f7fe',
    tagBorder: '#e2e6fb',
    tagHoverBorder: '#4f46e5',
    checkColor: '#4f46e5',
    linkColor: '#4338ca',
  },
  sky: {
    cardBg: 'linear-gradient(155deg, #ffffff 40%, #f0f7fc 100%)',
    borderColor: '#cbe5f7',
    hoverBorder: '#0284c7',
    hoverShadow: '0 16px 36px rgba(2, 132, 199, 0.12)',
    topBar: 'linear-gradient(90deg, #0284c7 0%, #38bdf8 100%)',
    iconGradient: 'linear-gradient(135deg, #38bdf8 0%, #0369a1 100%)',
    iconShadow: '0 6px 16px rgba(2, 132, 199, 0.28)',
    tagBg: '#f0f7fd',
    tagBorder: '#d7ecfa',
    tagHoverBorder: '#0284c7',
    checkColor: '#0284c7',
    linkColor: '#0369a1',
  },
  emerald: {
    cardBg: 'linear-gradient(155deg, #ffffff 40%, #f0fdf6 100%)',
    borderColor: '#ccf2de',
    hoverBorder: '#059669',
    hoverShadow: '0 16px 36px rgba(5, 150, 105, 0.12)',
    topBar: 'linear-gradient(90deg, #059669 0%, #34d399 100%)',
    iconGradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    iconShadow: '0 6px 16px rgba(5, 150, 105, 0.28)',
    tagBg: '#f1fcf6',
    tagBorder: '#d6f5e4',
    tagHoverBorder: '#059669',
    checkColor: '#059669',
    linkColor: '#047857',
  },
  bronze: {
    cardBg: 'linear-gradient(155deg, #ffffff 40%, #fcf7f1 100%)',
    borderColor: '#f6e3c9',
    hoverBorder: '#b45309',
    hoverShadow: '0 16px 36px rgba(180, 83, 9, 0.12)',
    topBar: 'linear-gradient(90deg, #b45309 0%, #fbbf24 100%)',
    iconGradient: 'linear-gradient(135deg, #f59e0b 0%, #9a3412 100%)',
    iconShadow: '0 6px 16px rgba(180, 83, 9, 0.28)',
    tagBg: '#fdf8f2',
    tagBorder: '#f8ebd9',
    tagHoverBorder: '#b45309',
    checkColor: '#b45309',
    linkColor: '#b45309',
  },
  azure: {
    cardBg: 'linear-gradient(155deg, #ffffff 40%, #f1f6fd 100%)',
    borderColor: '#d0e1fc',
    hoverBorder: '#2563eb',
    hoverShadow: '0 16px 36px rgba(37, 99, 235, 0.12)',
    topBar: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
    iconGradient: 'linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)',
    iconShadow: '0 6px 16px rgba(37, 99, 235, 0.28)',
    tagBg: '#f3f8fe',
    tagBorder: '#dbe8fc',
    tagHoverBorder: '#2563eb',
    checkColor: '#2563eb',
    linkColor: '#1d4ed8',
  },
}

const serviceCategories: Array<{
  id: string
  title: string
  subtitle: string
  iconName: string
  theme: ServiceThemeColor
  items: string[]
}> = [
  {
    id: 'assurance-audit',
    title: 'Assurance & Audit',
    subtitle: 'Independent evaluation, financial transparency, and governance frameworks.',
    iconName: 'assurance',
    theme: 'navy',
    items: [
      'Statutory Audit',
      'Internal Audit',
      'Bank Audit',
      'Concurrent Audit',
      'Tax Audit',
      'Due Diligence',
      'Risk Advisory',
      'Internal Financial Controls (IFC)',
      'Forensic Reviews',
    ],
  },
  {
    id: 'tax-advisory',
    title: 'Tax Advisory',
    subtitle: 'Strategic direct tax planning, dispute resolution, and cross-border structuring.',
    iconName: 'tax',
    theme: 'gold',
    items: [
      'Direct Tax Advisory',
      'Income Tax Litigation',
      'International Taxation',
      'Transfer Pricing',
      'Expatriate Taxation',
      'Tax Structuring',
      'FEMA Advisory',
    ],
  },
  {
    id: 'gst-indirect-taxes',
    title: 'GST & Indirect Taxes',
    subtitle: 'Complete indirect tax compliance, litigation support, and trade advisory.',
    iconName: 'gst',
    theme: 'teal',
    items: [
      'GST Advisory Services',
      'GST Compliance & Filing',
      'GST Litigation & Representation',
      'Customs & Tariff Advisory',
      'Foreign Trade Policy Advisory',
    ],
  },
  {
    id: 'corporate-regulatory',
    title: 'Corporate & Regulatory Advisory',
    subtitle: 'End-to-end secretarial, SEBI, RBI, and corporate governance compliance.',
    iconName: 'corporate',
    theme: 'indigo',
    items: [
      'Company Law Advisory',
      'LLP Advisory & Formation',
      'Secretarial Compliance',
      'Corporate Governance Frameworks',
      'RBI & FEMA Compliance',
      'SEBI Advisory',
      'ROC Compliance & Filings',
    ],
  },
  {
    id: 'business-consulting',
    title: 'Business Consulting',
    subtitle: 'Financial strategy, virtual CFO services, and business performance improvement.',
    iconName: 'consulting',
    theme: 'sky',
    items: [
      'Business Structuring',
      'Financial Modelling & Projection',
      'Business Process Improvement',
      'Virtual CFO Services',
      'Performance Management',
      'Strategic Planning & Advisory',
    ],
  },
  {
    id: 'transaction-advisory',
    title: 'Transaction Advisory',
    subtitle: 'Strategic support for capital raising, M&A, startup growth, and valuation.',
    iconName: 'transaction',
    theme: 'emerald',
    items: [
      'Start-up Advisory',
      'Venture Capital Advisory',
      'Private Equity Advisory',
      'Investor Due Diligence',
      'Fund Raising Assistance',
      'Mergers & Acquisitions (M&A)',
      'Corporate Restructuring',
    ],
  },
  {
    id: 'family-business',
    title: 'Family Business Advisory',
    subtitle: 'Preserving wealth, establishing family governance, and succession planning.',
    iconName: 'family',
    theme: 'bronze',
    items: [
      'Family Constitution Formulation',
      'Family Settlement Advisory',
      'Succession Planning',
      'Estate Planning & Trusts',
      'Governance Framework',
      'Wealth Preservation Strategy',
    ],
  },
  {
    id: 'global-business',
    title: 'Global Business Services',
    subtitle: 'Navigating international tax, cross-border investments, and global expansion.',
    iconName: 'global',
    theme: 'azure',
    items: [
      'Cross-Border Transactions',
      'International Business Structuring',
      'Overseas Investment Advisory',
      'NRI Taxation & Compliance',
      'Global Expansion Support',
    ],
  },
]

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        title="Our Practice Areas & Services"
        subtitle="Multidisciplinary Professional Solutions Delivered with Technical Excellence"
        eyebrow="8 Core Specialized Practice Domains"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        bgImage="/images/services.png"
      />

      <section className="section" style={{ padding: '48px 0', background: '#ffffff' }}>
        <div className="container">
          <SectionHeader
            eyebrow="What We Do"
            title="Integrated Advisory & Assurance Solutions"
            subtitle="Team Eyrie combines deep technical expertise with industry specialization across eight core practice areas, providing seamless support for corporate, institutional, and high-net-worth clients."
          />

          {/* 8 Core Practice Areas Grid (2-Column Balanced Grid) */}
          <div className="services-catalog-grid">
            {serviceCategories.map((cat) => {
              const theme = serviceThemePresets[cat.theme]
              return (
                <div
                  key={cat.id}
                  id={cat.id}
                  className="service-practice-card"
                  style={
                    {
                      '--card-bg': theme.cardBg,
                      '--card-border': theme.borderColor,
                      '--hover-border': theme.hoverBorder,
                      '--hover-shadow': theme.hoverShadow,
                      '--top-bar': theme.topBar,
                      '--tag-hover-border': theme.tagHoverBorder,
                      scrollMarginTop: 90,
                    } as React.CSSProperties
                  }
                >
                  <div>
                    {/* Card Header */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
                      <div
                        className="service-practice-icon-box"
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: theme.iconGradient,
                          border: '1.5px solid rgba(255, 255, 255, 0.8)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: theme.iconShadow,
                        }}
                      >
                        <CorporateIcon name={cat.iconName} size={24} color="#ffffff" strokeWidth={2.4} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: 19, color: '#1f3864', margin: '0 0 3px', fontWeight: 800, letterSpacing: '-0.01em' }}>
                          {cat.title}
                        </h3>
                        <p style={{ color: '#526071', fontSize: 13.5, margin: 0, lineHeight: 1.5 }}>
                          {cat.subtitle}
                        </p>
                      </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: `1px solid ${theme.borderColor}`, margin: '0 0 14px', opacity: 0.85 }} />

                    {/* Capabilities Sub-items Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                        gap: 8,
                      }}
                    >
                      {cat.items.map((item) => (
                        <div
                          key={item}
                          className="service-practice-tag"
                          style={{
                            background: theme.tagBg,
                            border: `1px solid ${theme.tagBorder}`,
                          }}
                        >
                          <CorporateIcon name="check" size={13} color={theme.checkColor} strokeWidth={2.8} />
                          <span style={{ whiteSpace: 'normal', lineHeight: 1.3 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div style={{ marginTop: 18, paddingTop: 13, borderTop: `1px dashed ${theme.borderColor}`, display: 'flex', justifyContent: 'flex-end' }}>
                    <a
                      href={`/services/${cat.id}`}
                      className="service-practice-link"
                      style={{
                        color: theme.linkColor,
                      }}
                    >
                      <span>Explore {cat.title} Practice</span>
                      <span className="service-practice-arrow">→</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Reusable CtaBanner */}
          <CtaBanner
            eyebrow="Specialized Practice Solutions"
            title="Need Specialized Advisory or Audit Services?"
            description="Speak directly with our partner team to discuss your business requirements and customized multidisciplinary solutions."
            primaryLabel="Schedule Partner Consultation"
            primaryHref="/contact"
            secondaryLabel="Explore Why Choose Us"
            secondaryHref="/why-team-eyrie"
          />
        </div>
      </section>
    </main>
  )
}
