import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/layout/PageHero'
import CtaBanner from '@/components/layout/CtaBanner'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Services — Team Eyrie',
  description:
    'Integrated professional services across Assurance & Audit, Tax Advisory, GST & Indirect Taxes, Corporate & Regulatory Advisory, Business Consulting, Transaction Advisory, Family Business Advisory, and Global Business Services.',
}

function renderServiceIcon(nameOrSlug: string) {
  const key = (nameOrSlug || '').toLowerCase()
  const props = {
    width: 38,
    height: 38,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  // 1. Direct Taxes & Litigation (Scales of Justice)
  if (key.includes('litigation') || key.includes('direct-tax') || key.includes('direct tax')) {
    return (
      <svg {...props}>
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <path d="M3 7h18" />
      </svg>
    )
  }

  // 2. Assurance & Audit (Shield with checkmark)
  if (key.includes('assurance') || key.includes('audit')) {
    return (
      <svg {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    )
  }

  // 3. Tax Advisory (Document with analytics / trending chart)
  if (key.includes('tax-advisory') || key.includes('tax advisory') || key.includes('tax')) {
    return (
      <svg {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M8 17v-3" />
        <path d="M12 17v-6" />
        <path d="M16 17v-4" />
      </svg>
    )
  }

  // 4. GST & Indirect Taxes (Coins stack with percentage)
  if (key.includes('gst') || key.includes('indirect')) {
    return (
      <svg {...props}>
        <ellipse cx="9" cy="6" rx="6" ry="2.5" />
        <path d="M3 6v4c0 1.4 2.7 2.5 6 2.5" />
        <path d="M3 10v4c0 1.4 2.7 2.5 6 2.5" />
        <circle cx="17.5" cy="15.5" r="4.5" />
        <line x1="16" y1="17" x2="19" y2="14" />
        <circle cx="16" cy="14" r="0.75" fill="currentColor" />
        <circle cx="19" cy="17" r="0.75" fill="currentColor" />
      </svg>
    )
  }

  // 5. Corporate & Regulatory Advisory (Pillars / Greek temple landmark)
  if (key.includes('corporate-regulatory-advisory') || key.includes('regulatory advisory') || key.includes('corporate & regulatory advisory')) {
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
  }

  // 6. Corporate & Regulatory / Governance (Document with verification badge)
  if (key.includes('corporate') || key.includes('regulatory') || key.includes('governance')) {
    return (
      <svg {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    )
  }

  // 7. Transaction Advisory (Deal Handshake)
  if (key.includes('transaction') || key.includes('m&a') || key.includes('deal')) {
    return (
      <svg {...props}>
        <path d="m11 17 2 2a1 1 0 1 0 3-3" />
        <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
        <path d="m21 3 1 11h-2" />
        <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
        <path d="M3 4h8" />
      </svg>
    )
  }

  // 8. Family Business (Generations / users)
  if (key.includes('family') || key.includes('wealth')) {
    return (
      <svg {...props}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }

  // 9. Global Business Services (Globe)
  if (key.includes('global') || key.includes('international')) {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    )
  }

  // Default: Executive Briefcase
  return (
    <svg {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

const defaultServices = [
  {
    slug: 'direct-taxes-and-company-law-litigations',
    title: 'Direct Taxes and Company Law Litigations',
    summary:
      'He regularly advises and represents clients in complex tax assessments, appeals and proceedings before various authorities and tribunals. His expertise includes interpreting tax laws, developing strong legal strategies and presenting matters with clarity and precision.',
  },
  {
    slug: 'assurance-audit',
    title: 'Assurance & Audit',
    summary:
      'Delivering reliable audit and assurance services that strengthen financial transparency, improve internal controls, and build confidence among stakeholders.',
  },
  {
    slug: 'tax-advisory',
    title: 'Tax Advisory',
    summary:
      'Providing strategic tax planning and advisory solutions to help businesses remain compliant, manage tax liabilities, and make informed financial decisions.',
  },
  {
    slug: 'gst-indirect-taxes',
    title: 'GST & Indirect Taxes',
    summary:
      'End-to-end GST and indirect tax support, including compliance, advisory, registrations, returns, reconciliations, and regulatory requirements.',
  },
  {
    slug: 'corporate-regulatory-advisory',
    title: 'Corporate & Regulatory Advisory',
    summary:
      'Company law, secretarial and regulatory compliance across the RBI, FEMA, SEBI and ROC frameworks.',
    subServices: [
      { name: 'Company law' },
      { name: 'Secretarial & regulatory compliance' },
      { name: 'RBI' },
      { name: 'FEMA' },
      { name: 'SEBI' },
      { name: 'ROC frameworks' },
    ],
  },
  {
    slug: 'corporate-regulatory',
    title: 'Corporate & Regulatory',
    summary:
      'Helping businesses navigate corporate laws, regulatory requirements, statutory compliance, and governance with confidence and efficiency.',
  },
  {
    slug: 'transaction-advisory',
    title: 'Transaction Advisory',
    summary:
      'Strategic capital raising, M&A due diligence, business valuations under IBBI/FEMA rules, and restructuring advisory across the deal lifecycle.',
  },
  {
    slug: 'family-business-advisory',
    title: 'Family Business Advisory',
    summary:
      'Succession planning, family constitutions, trust settlements, and long-term wealth preservation for multi-generational business families.',
  },
]

export default async function ServicesPage() {
  const payload = await getPayload({ config })
  const [{ docs: dbServices }, pageBannersRes] = await Promise.all([
    payload.find({
      collection: 'services',
      limit: 100,
      sort: 'order',
    }).catch(() => ({ docs: [] })),
    payload.findGlobal({ slug: 'page-banners' as any, depth: 1 }).catch(() => null),
  ])

  const services = dbServices && dbServices.length > 0 ? dbServices : defaultServices

  const sBanner = (pageBannersRes as any)?.services
  const bannerTitle = sBanner?.title || 'Our Practice Areas & Services'
  const bannerSubtitle =
    sBanner?.subtitle || 'Multidisciplinary Professional Solutions Delivered with Technical Excellence'
  const bannerEyebrow = sBanner?.eyebrow || '8 Core Specialized Practice Domains'
  const bannerImage =
    typeof sBanner?.bgImage === 'object' && sBanner?.bgImage?.url
      ? sBanner.bgImage.url
      : typeof sBanner?.bgImage === 'string'
        ? sBanner.bgImage
        : '/images/services.png'
  const bannerFocal = sBanner?.focalPosition || 'right center'

  return (
    <main>
      <PageHero
        title={bannerTitle}
        subtitle={bannerSubtitle}
        eyebrow={bannerEyebrow}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        bgImage={bannerImage}
        bgPosition={bannerFocal}
      />

      <section className="section" style={{ padding: '64px 0 72px', background: '#ffffff' }}>
        <div className="container">
          <div className="services-editorial-layout">
            {/* Left Column: Sticky Editorial Introduction */}
            <aside className="services-editorial-aside">
              <div className="services-editorial-aside__inner">
                <div className="services-editorial-eyebrow">
                  <span>PRACTICE AREAS</span>
                  <span className="services-editorial-eyebrow__line" />
                </div>

                <h2 className="services-editorial-title">
                  Expertise that moves business forward
                </h2>

                <div className="services-editorial-accent-bar" />

                <p className="services-editorial-subtitle">
                  Team Eyrie combines deep technical expertise with industry specialization across eight core practice areas, providing seamless support for corporate, institutional, and high-net-worth clients.
                </p>
              </div>
            </aside>

            {/* Right Column: 2-Column Editorial Grid (No Boxed Cards) */}
            <div className="services-editorial-grid">
              {services.map((service: any, idx: number) => {
                const num = String(idx + 1).padStart(2, '0')
                return (
                  <div
                    key={service.slug || num}
                    id={service.slug}
                    className="services-editorial-item"
                    style={{ scrollMarginTop: 90 }}
                  >
                    {/* Index Number */}
                    <div className="services-editorial-num">{num}</div>

                    {/* Body: Outline Line Icon + Content */}
                    <div className="services-editorial-body">
                      <div className="services-editorial-icon">
                        {renderServiceIcon(service.slug || service.title)}
                      </div>

                      <div className="services-editorial-content">
                        <h3 className="services-editorial-name">
                          {service.title}
                        </h3>

                        <p className="services-editorial-desc">
                          {service.summary}
                        </p>

                        {/* Inline Pipe Separated Sub-Services */}
                        {service.subServices && service.subServices.length > 0 && (
                          <div className="services-editorial-subtext">
                            {service.subServices.slice(0, 6).map((sub: any, sIdx: number) => (
                              <React.Fragment key={sub.name || sIdx}>
                                {sIdx > 0 && <span className="services-editorial-pipe">|</span>}
                                <span>{sub.name}</span>
                              </React.Fragment>
                            ))}
                          </div>
                        )}

                        <a
                          href={`/services/${service.slug}`}
                          className="services-editorial-link"
                        >
                          <span>Explore practice</span>
                          <span className="services-editorial-arrow">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

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
