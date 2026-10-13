import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import HeroSection from '@/components/sections/HeroSection'
import CorporateIcon from '@/components/ui/CorporateIcon'
import IndiaNetworkMap from '@/components/map/IndiaNetworkMap'
import WhyTeamEyrieScroll from '@/components/sections/WhyTeamEyrieScroll'
import HorizontalServicesScroll from '@/components/sections/HorizontalServicesScroll'
import VisionMissionOverview from '@/components/sections/VisionMissionOverview'
import ComplianceCalendarWidget from '@/components/sections/ComplianceCalendarWidget'

export const dynamic = 'force-dynamic'

const allianceFirms = [
  {
    name: 'V. Verma & Co.',
    role: 'Chartered Accountants',
    est: 'Established Partner Firm',
    region: 'Northern & Western Circuit',
    hub: 'New Delhi • Barakhamba Road',
    desc: 'Specialized in Direct Tax Litigation, NCLT Proceedings, and Senior Counsel Representations.',
    iconName: 'tax',
    initials: 'VV',
  },
  {
    name: 'S S A L Associates',
    role: 'Chartered Accountants',
    est: 'Established Partner Firm',
    region: 'Central & Tech Corridors',
    hub: 'Salem Hub • Bengaluru Office',
    desc: 'Multidisciplinary Industrial Audit, Cost Management, MSME Advisory & Central Operations.',
    iconName: 'assurance',
    initials: 'SSAL',
  },
  {
    name: 'R. Sridharan & Company',
    role: 'Chartered Accountants',
    est: 'Established Partner Firm',
    region: 'Metropolitan & Maritime Hubs',
    hub: 'Chennai (Mount Road) • Pan-India',
    desc: 'Statutory Bank Assurance, SEBI Compliance, Transaction Structuring & Corporate Governance.',
    iconName: 'corporate',
    initials: 'RSC',
  },
]


const valuePillars = [
  {
    title: 'Collective Intelligence',
    desc: 'A powerful network of experienced professionals delivering multidisciplinary solutions under one umbrella.',
    tag: 'Synergy',
  },
  {
    title: 'National Reach',
    desc: 'A strong PAN India presence with professionals across major business centres.',
    tag: 'Coverage',
  },
  {
    title: 'Sector Expertise',
    desc: 'Specialised knowledge across diverse industries and complex regulatory environments.',
    tag: 'Domain Depth',
  },
  {
    title: 'Technology-Driven Delivery',
    desc: 'Digital workflows, automation, data analytics, and AI-assisted advisory enhance efficiency.',
    tag: 'Innovation',
  },
  {
    title: 'Client-Centric Philosophy',
    desc: 'Driven by responsiveness, transparency, uncompromising quality, and measurable outcomes.',
    tag: 'Trust',
  },
  {
    title: 'Global Perspective',
    desc: 'Assisting clients in navigating international taxation, transfer pricing, and cross-border investments.',
    tag: 'Global Reach',
  },
]



const defaultBgImages = [
  '/images/bg1.png',
  '/images/bg2.png',
  '/images/bg3.png',
  '/images/bg4.png',
  '/images/Aboutus.png',
  '/images/Why.png',
  '/images/services.png',
  '/images/industries.png',
]

function getServiceIconName(title: string): string {
  const lower = (title || '').toLowerCase()
  if (lower.includes('audit') || lower.includes('assurance')) return 'assurance'
  if (lower.includes('tax') && !lower.includes('gst') && !lower.includes('indirect')) return 'tax'
  if (lower.includes('gst') || lower.includes('indirect')) return 'gst'
  if (lower.includes('corporate') || lower.includes('regulat') || lower.includes('secretar')) return 'corporate'
  if (lower.includes('consult') || lower.includes('strateg') || lower.includes('cfo')) return 'consulting'
  if (lower.includes('transaction') || lower.includes('m&a') || lower.includes('fund') || lower.includes('vc')) return 'transaction'
  if (lower.includes('family') || lower.includes('estate') || lower.includes('wealth')) return 'family'
  if (lower.includes('global') || lower.includes('cross') || lower.includes('international') || lower.includes('nri')) return 'global'
  return 'assurance'
}

export default async function HomePage() {
  let displayServices: any[] = []
  let showServicesSection = true
  let servicesEyebrow = 'Comprehensive Offerings'
  let servicesHeading = 'What We Do'
  let servicesSubheading =
    'Delivering end-to-end solutions from assurance and taxation to transaction advisory and international expansion.'
  let heroSlides = undefined
  let heroEyebrow = "India's Integrated Professional Services Network"
  let heroHeadline = 'TEAM EYRIE'
  let heroSubheadline = 'Together, We Create Value. Together, We Build Trust.'
  let whyEyrieData: any = undefined
  let heroPrimaryCtaLabel: string | undefined = undefined
  let heroPrimaryCtaLink: string | undefined = undefined
  let introHeading = 'Integrated Expertise Across Advisory, Audit & Governance'
  let introBody: string | undefined = undefined
  let homeStats: any[] | undefined = undefined
  let complianceEvents: any[] = []

  try {
    const payload = await getPayload({ config })
    const [servicesRes, homePageRes, complianceEventsRes] = await Promise.all([
      payload
        .find({
          collection: 'services',
          limit: 50,
          sort: 'order',
          depth: 2,
        })
        .catch(() => null),
      payload.findGlobal({ slug: 'home-page', depth: 2 }).catch(() => null),
      payload
        .find({
          collection: 'compliance-events' as any,
          where: {
            status: { not_equals: 'archived' },
          },
          limit: 200,
          depth: 1,
        })
        .catch(() => null),
    ])

    if (complianceEventsRes?.docs) {
      complianceEvents = complianceEventsRes.docs.map((doc: any) => ({
        id: doc.id,
        title: doc.title,
        date: doc.date,
        category: doc.category,
        isSpecialEvent: doc.isSpecialEvent,
        regime: doc.regime,
        description: doc.description,
        applicableTo: doc.applicableTo,
        status: doc.status,
      }))
    }

    const home: any = homePageRes

    if (home?.servicesSection) {
      if (home.servicesSection.showSection === false || home.servicesSection.showSection === 'false') {
        showServicesSection = false
      }
      if (home.servicesSection.eyebrow) servicesEyebrow = home.servicesSection.eyebrow
      if (home.servicesSection.heading) servicesHeading = home.servicesSection.heading
      if (home.servicesSection.subheading) servicesSubheading = home.servicesSection.subheading
    }

    const serviceMap = new Map((servicesRes?.docs || []).map((doc: any) => [doc.id, doc]))

    let rawServices: any[] = []
    if (
      home?.servicesSection?.selectedServices &&
      Array.isArray(home.servicesSection.selectedServices) &&
      home.servicesSection.selectedServices.length > 0
    ) {
      // Option B: User explicitly chose and ordered services in Home Page Global
      rawServices = home.servicesSection.selectedServices
        .map((item: any) => {
          if (typeof item === 'object' && item !== null && item.title) {
            return item
          }
          const id = typeof item === 'object' && item !== null ? item.id : item
          return serviceMap.get(id)
        })
        .filter(Boolean)
    } else if (servicesRes && Array.isArray(servicesRes.docs) && servicesRes.docs.length > 0) {
      // Fallback: Services in collection marked showOnHome: true
      rawServices = servicesRes.docs.filter((doc: any) => {
        return doc.showOnHome === true || doc.showOnHome === 'true' || doc.showOnHome === 1
      })
    }

    displayServices = rawServices.map((doc: any, idx: number) => {
      let bgImg = defaultBgImages[idx % defaultBgImages.length]
      if (doc.heroImage && typeof doc.heroImage === 'object' && doc.heroImage.url) {
        bgImg = doc.heroImage.url
      } else if (doc.bgImage) {
        bgImg = doc.bgImage
      }
      const bullets =
        Array.isArray(doc.subServices) && doc.subServices.length > 0
          ? doc.subServices.map((s: any) => (typeof s === 'string' ? s : s.name)).filter(Boolean)
          : doc.bullets
      return {
        title: doc.title,
        desc: doc.summary || doc.desc || 'Comprehensive specialized professional services and strategic business solutions.',
        iconName: doc.iconName || getServiceIconName(doc.title),
        href: doc.href || `/services/${doc.slug || ''}`,
        bgImage: bgImg,
        bullets,
      }
    })

    if (home?.hero) {
      if (home.hero.eyebrow) heroEyebrow = home.hero.eyebrow
      if (home.hero.headline) heroHeadline = home.hero.headline
      if (home.hero.subheadline) heroSubheadline = home.hero.subheadline
      if (home.hero.primaryCtaLabel) heroPrimaryCtaLabel = home.hero.primaryCtaLabel
      if (home.hero.primaryCtaLink) heroPrimaryCtaLink = home.hero.primaryCtaLink
      if (Array.isArray(home.hero.slides) && home.hero.slides.length > 0) {
        heroSlides = home.hero.slides.map((s: any, idx: number) => {
          let img = defaultBgImages[idx % defaultBgImages.length]
          if (s.image && typeof s.image === 'object' && s.image.url) {
            img = s.image.url
          } else if (s.imageUrl) {
            img = s.imageUrl
          }
          return {
            id: `slide-${idx}`,
            num: `0${idx + 1}`,
            badge: s.badge || 'Practice Domain',
            tagline: s.tagline || '',
            title: s.title || '',
            description: s.description || '',
            image: img,
            video: s.videoUrl || (img && (img.endsWith('.mp4') || img.endsWith('.mov') || img.endsWith('.webm')) ? img : undefined),
            primaryCta: { label: s.primaryCtaLabel || 'Explore Advisory', href: s.primaryCtaLink || '/services' },
            secondaryCta: { label: s.secondaryCtaLabel || 'Contact Us', href: s.secondaryCtaLink || '/contact' },
          }
        })
      }
    }

    if (home?.intro) {
      if (home.intro.heading) introHeading = home.intro.heading
      if (home.intro.body) introBody = home.intro.body
    }

    if (Array.isArray(home?.stats) && home.stats.length > 0) {
      homeStats = home.stats
    }

    if (home?.whyEyrie) {
      const we = home.whyEyrie
      const hasCustomItems = Array.isArray(we.items) && we.items.length > 0
      const filtered = hasCustomItems
        ? we.items.filter((it: any) => {
          // Strictly exclude any item where showOnHome is false, 'false', 0, or null
          if (it.showOnHome === false || it.showOnHome === 'false' || it.showOnHome === 0 || it.showOnHome === null) {
            return false
          }
          return true
        })
        : []

      const items = filtered.map((it: any, idx: number) => {
        let img = defaultBgImages[idx % defaultBgImages.length]
        if (it.image && typeof it.image === 'object' && it.image.url) {
          img = it.image.url
        } else if (it.imageUrl) {
          img = it.imageUrl
        }
        const bullets = Array.isArray(it.bullets)
          ? it.bullets.map((b: any) => (typeof b === 'string' ? b : b.text)).filter(Boolean)
          : undefined
        return {
          id: `why-item-${idx}`,
          num: `0${idx + 1}`,
          tag: it.tag || 'Advantage',
          title: it.title,
          description: it.description,
          image: img,
          link: it.link || '/why-team-eyrie',
          linkLabel: it.linkLabel || 'Explore Detail',
          bullets,
        }
      })

      whyEyrieData = {
        showSection: we.showSection !== false,
        hasCustomItems,
        tagline: we.tagline,
        heading: we.heading,
        subheading: we.subheading,
        items,
      }
    }
  } catch {
    // Graceful fallback to static curated defaults
  }

  return (
    <main>
      {/* 1. Dynamic Hero Section */}
      <HeroSection
        eyebrow={heroEyebrow}
        headline={heroHeadline}
        subheadline={heroSubheadline}
        primaryCtaLabel={heroPrimaryCtaLabel}
        primaryCtaLink={heroPrimaryCtaLink}
        slides={heroSlides}
        allianceFirms={allianceFirms}
      />

      {/* 2. Strategic Alliance Network / Author Details (Separated below Hero Banner) */}
      <section className="alliance-firms-section">
        <div className="container">
          <div className="alliance-firms-bar">
            <div className="alliance-firms-header">
              <span className="alliance-firms-tag">Strategic Alliance Network</span>
              <h2 className="alliance-firms-title">
                Formed by Three Esteemed Chartered Accountancy Partnerships
              </h2>
            </div>
            <div className="alliance-firms-grid">
              {allianceFirms.map((firm) => (
                <div key={firm.name} className="alliance-firm-card">
                  <div className="alliance-firm-card__header">
                    <span className="alliance-firm-card__bullet" />
                    <h3 className="alliance-firm-card__name">{firm.name}</h3>
                  </div>
                  <div className="alliance-firm-card__meta">
                    <span className="alliance-firm-card__role">{firm.role}</span>
                    <span className="alliance-firm-card__dot">•</span>
                    <span className="alliance-firm-card__hub">{firm.hub}</span>
                  </div>
                  {firm.desc && (
                    <p className="alliance-firm-card__desc">{firm.desc}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Executive About & Multidisciplinary Capability */}
      <section className="section-mobile-compact" style={{ padding: '38px 0 34px', background: '#F8FAFC' }}>
        <div className="container">
          <div className="layout-split-weighted">
            <div>
              <span style={{ color: '#1d4ed8', fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>
                About Team Eyrie
              </span>
              <h2 style={{ fontSize: 'clamp(26px, 2.4vw, 34px)', color: '#0f172a', margin: '6px 0 14px', fontWeight: 800 }}>
                {introHeading}
              </h2>
              {introBody ? (
                <p style={{ color: '#475569', fontSize: 15.5, lineHeight: 1.65, marginBottom: 20, whiteSpace: 'pre-line', textAlign: 'justify', textJustify: 'inter-word' }}>
                  {introBody}
                </p>
              ) : (
                <>
                  <p style={{ color: '#475569', fontSize: 15.5, lineHeight: 1.65, marginBottom: 12, textAlign: 'justify', textJustify: 'inter-word' }}>
                    Team Eyrie is a premier multidisciplinary professional services network established through the strategic alliance of three reputed Chartered Accountancy firms.
                  </p>
                  <p style={{ color: '#475569', fontSize: 15.5, lineHeight: 1.65, marginBottom: 20, textAlign: 'justify', textJustify: 'inter-word' }}>
                    Our network brings together the collective intelligence of nearly <strong>20 Chartered Accountants</strong>, supported by an accomplished team of Company Secretaries, Advocates, Cost Accountants, MBAs, Insolvency Professionals, Valuation Specialists, and domain experts.
                  </p>
                </>
              )}

              {/* Dynamic Stats Strip if set in Admin Panel */}
              {homeStats && homeStats.length > 0 && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(auto-fit, minmax(130px, 1fr))`,
                    gap: 12,
                    marginBottom: 20,
                    padding: '14px 18px',
                    background: '#ffffff',
                    border: '1px solid rgba(148, 163, 184, 0.25)',
                    borderRadius: 10,
                  }}
                >
                  {homeStats.map((st: any, sIdx: number) => (
                    <div key={sIdx} style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: 'clamp(22px, 2vw, 28px)', fontWeight: 800, color: '#1d4ed8', lineHeight: 1.1 }}>
                        {st.value}
                      </div>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', marginTop: 2 }}>
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="/about" className="hero-btn hero-btn--gold" style={{ padding: '10px 24px', fontSize: 14.5 }}>
                  Read Network Profile
                </a>
                <a href="/why-team-eyrie" className="hero-btn hero-btn--outline" style={{ background: '#ffffff', color: '#0f172a', borderColor: '#98A2B3', padding: '10px 24px', fontSize: 14.5 }}>
                  Why Choose Us
                </a>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '20px 0 20px 28px',
                borderLeft: '2px solid rgba(242, 101, 34, 0.4)',
              }}
            >
              <span style={{ fontSize: 11.5, fontWeight: 800, color: '#f26522', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>
                Guiding Principles
              </span>
              <h3 style={{ fontSize: 22, color: '#0f172a', margin: '0 0 20px', fontWeight: 800 }}>
                Our Core Pillars
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ background: '#0f172a', padding: 10, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CorporateIcon name="consulting" size={20} color="#f26522" />
                  </div>
                  <div>
                    <strong style={{ color: '#0f172a', fontSize: 15.5, display: 'block', marginBottom: 2, fontWeight: 700 }}>Knowledge</strong>
                    <p style={{ margin: 0, fontSize: 13.5, color: '#475569', lineHeight: 1.5 }}>Technical precision and continuous learning across complex domains.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ background: '#0f172a', padding: 10, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CorporateIcon name="assurance" size={20} color="#f26522" />
                  </div>
                  <div>
                    <strong style={{ color: '#0f172a', fontSize: 15.5, display: 'block', marginBottom: 2, fontWeight: 700 }}>Integrity</strong>
                    <p style={{ margin: 0, fontSize: 13.5, color: '#475569', lineHeight: 1.5 }}>Uncompromising professional ethics, transparency, and trust.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ background: '#0f172a', padding: 10, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CorporateIcon name="gst" size={20} color="#f26522" />
                  </div>
                  <div>
                    <strong style={{ color: '#0f172a', fontSize: 15.5, display: 'block', marginBottom: 2, fontWeight: 700 }}>Innovation</strong>
                    <p style={{ margin: 0, fontSize: 13.5, color: '#475569', lineHeight: 1.5 }}>Technology-driven workflows, data analytics, and modern solutions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 Foundational Purpose: Vision & Mission Overview */}
      <VisionMissionOverview />

      {/* 4. What We Do — Interactive Horizontal Services Showcase (Image on Right, Content & Horizontal Rail on Left) */}
      {showServicesSection && displayServices.length > 0 && (
        <HorizontalServicesScroll
          services={displayServices}
          eyebrow={servicesEyebrow}
          heading={servicesHeading}
          subheading={servicesSubheading}
        />
      )}

      {/* 4.5 Statutory Compliance Due Dates Interactive Calendar (Royal Blue & Electric Orange Signature Theme) */}
      <section style={{ padding: '24px 0', background: '#F8FAFC' }}>
        <div className="container">
          <ComplianceCalendarWidget initialEvents={complianceEvents} />
        </div>
      </section>

      {/* 5. Why Team Eyrie? (Interactive Sticky Scroll Feature Showcase) */}
      {(!whyEyrieData || (whyEyrieData.showSection !== false && (!whyEyrieData.hasCustomItems || whyEyrieData.items.length > 0))) && (
        <WhyTeamEyrieScroll
          tagline={whyEyrieData?.tagline}
          heading={whyEyrieData?.heading}
          subheading={whyEyrieData?.subheading}
          items={whyEyrieData?.hasCustomItems ? whyEyrieData?.items : undefined}
        />
      )}



      {/* 7. Interactive PAN India Network Map Section */}
      <section style={{ padding: '36px 0 30px', background: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 18px' }}>
            <span style={{ color: '#1d4ed8', fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>
              National Network Hub
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 2.4vw, 34px)', color: '#0f172a', margin: '6px 0 10px', fontWeight: 800 }}>
              Our PAN-India Presence
            </h2>
            <p style={{ color: '#64748b', fontSize: 15.5, lineHeight: 1.55 }}>
              With offices and professional associates across India, Team Eyrie connects clients to a central hub of multidisciplinary expertise.
            </p>
          </div>

          {/* Render the Interactive India Map Component */}
          <IndiaNetworkMap />
        </div>
      </section>

      {/* 8. Call to Action */}
      <section style={{ padding: '36px 0', background: 'linear-gradient(135deg, #f8fafc 0%, #edf4fc 100%)', borderTop: '1px solid #e2e8f0', borderBottom: '3px solid #1d4ed8', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 940 }}>
          <span style={{ color: '#1d4ed8', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, display: 'inline-block', marginBottom: 8 }}>
            Get Started With Team Eyrie
          </span>
          <h2 style={{ color: '#0f172a', fontSize: 'clamp(24px, 2.6vw, 32px)', margin: '0 0 10px', fontWeight: 800 }}>
            Trusted Advice. Practical Solutions. Sustainable Growth.
          </h2>
          <p style={{ color: '#475569', fontSize: 15.5, lineHeight: 1.55, margin: '0 0 16px' }}>
            Whether you are launching your first venture, restructuring a business, or expanding globally, Team Eyrie is your trusted partner.
          </p>
          <a href="/contact" className="hero-btn hero-btn--gold" style={{ padding: '11px 30px', fontSize: 14.5 }}>
            Connect with Our Partners
          </a>
        </div>
      </section>
    </main>
  )
}
