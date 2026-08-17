import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import HeroSection from '../../components/HeroSection'
import CorporateIcon from '../../components/CorporateIcon'
import IndiaNetworkMap from '../../components/IndiaNetworkMap'
import WhyTeamEyrieScroll from '../../components/WhyTeamEyrieScroll'
import HorizontalServicesScroll from '../../components/HorizontalServicesScroll'

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

const mainServices = [
  {
    title: 'Assurance & Audit',
    desc: 'Statutory, Internal, Bank, Concurrent, Tax Audits, IFC, Forensic Reviews & Risk Advisory.',
    iconName: 'assurance',
    href: '/services#assurance-audit',
    bgImage: '/images/bg1.png',
  },
  {
    title: 'Tax Advisory',
    desc: 'Direct Tax, Income Tax Litigation, International Tax, Transfer Pricing & FEMA Advisory.',
    iconName: 'tax',
    href: '/services#tax-advisory',
    bgImage: '/images/bg2.png',
  },
  {
    title: 'GST & Indirect Taxes',
    desc: 'GST Advisory, Compliance, Litigation, Customs & Foreign Trade Policy guidance.',
    iconName: 'gst',
    href: '/services#gst-indirect-taxes',
    bgImage: '/images/bg3.png',
  },
  {
    title: 'Corporate & Regulatory',
    desc: 'Company Law, Secretarial Compliance, Governance, RBI, SEBI & ROC Compliance.',
    iconName: 'corporate',
    href: '/services#corporate-regulatory',
    bgImage: '/images/bg4.png',
  },
  {
    title: 'Business Consulting',
    desc: 'Business Structuring, Financial Modelling, Virtual CFO Services & Strategic Planning.',
    iconName: 'consulting',
    href: '/services#business-consulting',
    bgImage: '/images/Aboutus.png',
  },
  {
    title: 'Transaction Advisory',
    desc: 'M&A, Start-up Advisory, VC/PE Advisory, Investor Due Diligence & Fund Raising.',
    iconName: 'transaction',
    href: '/services#transaction-advisory',
    bgImage: '/images/Why.png',
  },
  {
    title: 'Family Business Advisory',
    desc: 'Family Constitution, Succession & Estate Planning, Governance & Wealth Preservation.',
    iconName: 'family',
    href: '/services#family-business',
    bgImage: '/images/services.png',
  },
  {
    title: 'Global Business Services',
    desc: 'Cross-Border Transactions, NRI Taxation, International Structuring & Global Expansion.',
    iconName: 'global',
    href: '/services#global-business',
    bgImage: '/images/industries.png',
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

const industryHighlights = [
  { name: 'Manufacturing & Engineering', icon: 'factory' },
  { name: 'Banking & Financial Services', icon: 'landmark' },
  { name: 'NBFCs & FinTech', icon: 'trending' },
  { name: 'Information Technology & Software', icon: 'cpu' },
  { name: 'Healthcare & Life Sciences', icon: 'heart' },
  { name: 'Real Estate & Infrastructure', icon: 'building' },
  { name: 'E-Commerce & Digital Retail', icon: 'shopping' },
  { name: 'Start-ups & Scale-ups', icon: 'rocket' },
  { name: 'MSMEs & Enterprise Clusters', icon: 'briefcase' },
  { name: 'Family Businesses & Conglomerates', icon: 'users' },
  { name: 'Renewable Energy & ESG', icon: 'leaf' },
  { name: 'Logistics & Supply Chain', icon: 'truck' },
]

function getIndustryIcon(type: string) {
  switch (type) {
    case 'factory':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H2z" />
          <path d="M17 18h1" /><path d="M12 18h1" /><path d="M7 18h1" />
        </svg>
      )
    case 'landmark':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="21" x2="21" y2="21" /><line x1="6" y1="18" x2="6" y2="11" />
          <line x1="10" y1="18" x2="10" y2="11" /><line x1="14" y1="18" x2="14" y2="11" />
          <line x1="18" y1="18" x2="18" y2="11" /><polygon points="12 2 20 7 4 7" />
        </svg>
      )
    case 'trending':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    case 'cpu':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
        </svg>
      )
    case 'heart':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    case 'building':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="9" y1="6" x2="9" y2="6.01" /><line x1="15" y1="6" x2="15" y2="6.01" />
          <line x1="9" y1="10" x2="9" y2="10.01" /><line x1="15" y1="10" x2="15" y2="10.01" />
          <line x1="9" y1="14" x2="9" y2="14.01" /><line x1="15" y1="14" x2="15" y2="14.01" />
        </svg>
      )
    case 'shopping':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    case 'rocket':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        </svg>
      )
    case 'briefcase':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    case 'users':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'leaf':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6" />
        </svg>
      )
    case 'truck':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      )
    default:
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
        </svg>
      )
  }
}

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
  let displayServices = mainServices
  let heroSlides = undefined
  let heroEyebrow = "India's Integrated Professional Services Network"
  let heroHeadline = 'TEAM EYRIE'
  let heroSubheadline = 'Together, We Create Value. Together, We Build Trust.'
  let whyEyrieData: any = undefined

  try {
    const payload = await getPayload({ config })
    const [servicesRes, homePageRes] = await Promise.all([
      payload.find({ collection: 'services', limit: 50, sort: 'order', depth: 2 }).catch(() => null),
      payload.findGlobal({ slug: 'home-page', depth: 2 }).catch(() => null),
    ])

    if (servicesRes && servicesRes.docs && servicesRes.docs.length > 0) {
      displayServices = servicesRes.docs.map((doc: any, idx: number) => {
        let bgImg = defaultBgImages[idx % defaultBgImages.length]
        if (doc.heroImage && typeof doc.heroImage === 'object' && doc.heroImage.url) {
          bgImg = doc.heroImage.url
        }
        return {
          title: doc.title,
          desc: doc.summary || 'Comprehensive specialized professional services and strategic business solutions.',
          iconName: getServiceIconName(doc.title),
          href: `/services#${doc.slug || ''}`,
          bgImage: bgImg,
        }
      })
    }

    if (homePageRes?.hero) {
      if (homePageRes.hero.eyebrow) heroEyebrow = homePageRes.hero.eyebrow
      if (homePageRes.hero.headline) heroHeadline = homePageRes.hero.headline
      if (homePageRes.hero.subheadline) heroSubheadline = homePageRes.hero.subheadline
      if (Array.isArray(homePageRes.hero.slides) && homePageRes.hero.slides.length > 0) {
        heroSlides = homePageRes.hero.slides.map((s: any, idx: number) => {
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
            primaryCta: { label: s.primaryCtaLabel || 'Explore Advisory', href: s.primaryCtaLink || '/services' },
            secondaryCta: { label: s.secondaryCtaLabel || 'Contact Us', href: s.secondaryCtaLink || '/contact' },
          }
        })
      }
    }

    if (homePageRes?.whyEyrie) {
      const we = homePageRes.whyEyrie
      const items =
        Array.isArray(we.items) && we.items.length > 0
          ? we.items.map((it: any, idx: number) => {
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
          : undefined

      whyEyrieData = {
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

      {/* 2.5 Quick Feature Cards with Background Images */}
      <section style={{ padding: '36px 0 16px', background: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 24px' }}>
            <span style={{ color: '#b08d57', fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>
              Explore Our Network
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 2.2vw, 32px)', color: '#1f3864', margin: '4px 0 0', fontWeight: 800 }}>
              Key Pillar Overview
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {/* Card 1: About */}
            <a
              href="/about"
              className="pillar-hover-card"
              style={{ backgroundImage: "url('/images/Aboutus.png')" }}
            >
              <div>
                <h3 style={{ fontSize: 21, color: '#ffffff', margin: '0 0 8px', fontWeight: 800, letterSpacing: '-0.01em', textShadow: '0 2px 10px rgba(0,0,0,0.85)' }}>
                  Network Profile
                </h3>
                <p style={{ color: '#f8fafc', fontSize: 13.5, margin: 0, lineHeight: 1.55, fontWeight: 500, textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>
                  Alliance of 3 reputed CA firms with 20+ senior professionals across India.
                </p>
              </div>
              <div style={{ color: '#ffffff', fontSize: 13, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 18, background: 'rgba(176, 141, 87, 0.3)', border: '1px solid rgba(216, 193, 154, 0.55)', padding: '6px 14px', borderRadius: 6, width: 'fit-content' }}>
                <span>Learn About Us</span>
                <span>→</span>
              </div>
            </a>

            {/* Card 2: Services */}
            <a
              href="/services"
              className="pillar-hover-card"
              style={{ backgroundImage: "url('/images/services.png')" }}
            >
              <div>
                <h3 style={{ fontSize: 21, color: '#ffffff', margin: '0 0 8px', fontWeight: 800, letterSpacing: '-0.01em', textShadow: '0 2px 10px rgba(0,0,0,0.85)' }}>
                  Practice Areas
                </h3>
                <p style={{ color: '#f8fafc', fontSize: 13.5, margin: 0, lineHeight: 1.55, fontWeight: 500, textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>
                  Assurance, Tax, GST, Corporate Compliance, M&A & Global Advisory.
                </p>
              </div>
              <div style={{ color: '#ffffff', fontSize: 13, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 18, background: 'rgba(176, 141, 87, 0.3)', border: '1px solid rgba(216, 193, 154, 0.55)', padding: '6px 14px', borderRadius: 6, width: 'fit-content' }}>
                <span>View All Practice Areas</span>
                <span>→</span>
              </div>
            </a>

            {/* Card 3: Why Team Eyrie */}
            <a
              href="/why-team-eyrie"
              className="pillar-hover-card"
              style={{ backgroundImage: "url('/images/Why.png')" }}
            >
              <div>
                <h3 style={{ fontSize: 21, color: '#ffffff', margin: '0 0 8px', fontWeight: 800, letterSpacing: '-0.01em', textShadow: '0 2px 10px rgba(0,0,0,0.85)' }}>
                  The Eyrie Advantage
                </h3>
                <p style={{ color: '#f8fafc', fontSize: 13.5, margin: 0, lineHeight: 1.55, fontWeight: 500, textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>
                  6 core pillars of multidisciplinary expertise, national reach & technology.
                </p>
              </div>
              <div style={{ color: '#ffffff', fontSize: 13, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 18, background: 'rgba(176, 141, 87, 0.3)', border: '1px solid rgba(216, 193, 154, 0.55)', padding: '6px 14px', borderRadius: 6, width: 'fit-content' }}>
                <span>Explore Advantages</span>
                <span>→</span>
              </div>
            </a>

            {/* Card 4: Industry Sectors */}
            <a
              href="/industries"
              className="pillar-hover-card"
              style={{ backgroundImage: "url('/images/industries.png')" }}
            >
              <div>
                <h3 style={{ fontSize: 21, color: '#ffffff', margin: '0 0 8px', fontWeight: 800, letterSpacing: '-0.01em', textShadow: '0 2px 10px rgba(0,0,0,0.85)' }}>
                  17 Sectors We Serve
                </h3>
                <p style={{ color: '#f8fafc', fontSize: 13.5, margin: 0, lineHeight: 1.55, fontWeight: 500, textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>
                  Manufacturing, BFSI, Healthcare, IT, Real Estate, Startups & MSMEs.
                </p>
              </div>
              <div style={{ color: '#ffffff', fontSize: 13, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 18, background: 'rgba(176, 141, 87, 0.3)', border: '1px solid rgba(216, 193, 154, 0.55)', padding: '6px 14px', borderRadius: 6, width: 'fit-content' }}>
                <span>View All Sectors</span>
                <span>→</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Executive About & Multidisciplinary Capability */}
      <section className="section-mobile-compact" style={{ padding: '48px 0', background: '#f8fafc' }}>
        <div className="container">
          <div className="layout-split-weighted">
            <div>
              <span style={{ color: '#b08d57', fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>
                About Team Eyrie
              </span>
              <h2 style={{ fontSize: 'clamp(26px, 2.4vw, 34px)', color: '#1f3864', margin: '6px 0 14px', fontWeight: 800 }}>
                Integrated Expertise Across Advisory, Audit & Governance
              </h2>
              <p style={{ color: '#475569', fontSize: 15.5, lineHeight: 1.65, marginBottom: 12 }}>
                Team Eyrie is a premier multidisciplinary professional services network established through the strategic alliance of three reputed Chartered Accountancy firms.
              </p>
              <p style={{ color: '#475569', fontSize: 15.5, lineHeight: 1.65, marginBottom: 20 }}>
                Our network brings together the collective intelligence of nearly <strong>20 Chartered Accountants</strong>, supported by an accomplished team of Company Secretaries, Advocates, Cost Accountants, MBAs, Insolvency Professionals, Valuation Specialists, and domain experts.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="/about" className="hero-btn hero-btn--gold" style={{ padding: '10px 24px', fontSize: 14.5 }}>
                  Read Network Profile
                </a>
                <a href="/why-team-eyrie" className="hero-btn hero-btn--outline" style={{ background: '#ffffff', color: '#1f3864', borderColor: '#cbd5e1', padding: '10px 24px', fontSize: 14.5 }}>
                  Why Choose Us
                </a>
              </div>
            </div>

            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderLeft: '5px solid #b08d57',
                borderRadius: 12,
                padding: '24px 24px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              }}
            >
              <h3 style={{ fontSize: 20, color: '#1f3864', margin: '0 0 16px', fontWeight: 700 }}>
                Our Core Pillars
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(176, 141, 87, 0.12)', padding: 10, borderRadius: 8 }}>
                    <CorporateIcon name="consulting" size={20} color="#b08d57" />
                  </div>
                  <div>
                    <strong style={{ color: '#1f3864', fontSize: 15.5, display: 'block', marginBottom: 2 }}>Knowledge</strong>
                    <p style={{ margin: 0, fontSize: 13.5, color: '#64748b', lineHeight: 1.5 }}>Technical precision and continuous learning across complex domains.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(176, 141, 87, 0.12)', padding: 10, borderRadius: 8 }}>
                    <CorporateIcon name="assurance" size={20} color="#b08d57" />
                  </div>
                  <div>
                    <strong style={{ color: '#1f3864', fontSize: 15.5, display: 'block', marginBottom: 2 }}>Integrity</strong>
                    <p style={{ margin: 0, fontSize: 13.5, color: '#64748b', lineHeight: 1.5 }}>Uncompromising professional ethics, transparency, and trust.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(176, 141, 87, 0.12)', padding: 10, borderRadius: 8 }}>
                    <CorporateIcon name="gst" size={20} color="#b08d57" />
                  </div>
                  <div>
                    <strong style={{ color: '#1f3864', fontSize: 15.5, display: 'block', marginBottom: 2 }}>Innovation</strong>
                    <p style={{ margin: 0, fontSize: 13.5, color: '#64748b', lineHeight: 1.5 }}>Technology-driven workflows, data analytics, and modern solutions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What We Do — Interactive Horizontal Services Showcase (Image on Right, Content & Horizontal Rail on Left) */}
      <HorizontalServicesScroll services={displayServices} />

      {/* 5. Why Team Eyrie? (Interactive Sticky Scroll Feature Showcase) */}
      <WhyTeamEyrieScroll
        tagline={whyEyrieData?.tagline}
        heading={whyEyrieData?.heading}
        subheading={whyEyrieData?.subheading}
        items={whyEyrieData?.items}
      />

      {/* 6. Industries We Serve (Luxury Dark Theme + Related Icons + Horizontal Moving Marquee) */}
      <section className="sectors-marquee-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <span style={{ color: '#d8c19a', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#b08d57', boxShadow: '0 0 8px #b08d57' }} />
              Industry Expertise
            </span>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(24px, 2.2vw, 32px)', margin: '6px 0 0', fontWeight: 800 }}>
              Sectors We Serve
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: 14.5, margin: '6px auto 0', maxWidth: 640 }}>
              Specialised advisory across 17+ core industries and complex regulatory frameworks
            </p>
          </div>
        </div>

        {/* Horizontal Infinite Moving Ticker Track */}
        <div className="sectors-marquee-track-wrapper">
          <div className="sectors-marquee-track">
            {/* Set 1 */}
            {industryHighlights.map((ind) => (
              <div key={`ind-1-${ind.name}`} className="sector-chip">
                <span className="sector-chip__icon">
                  {getIndustryIcon(ind.icon)}
                </span>
                <span>{ind.name}</span>
              </div>
            ))}
            {/* Set 2 (for continuous seamless infinite scrolling) */}
            {industryHighlights.map((ind) => (
              <div key={`ind-2-${ind.name}`} className="sector-chip">
                <span className="sector-chip__icon">
                  {getIndustryIcon(ind.icon)}
                </span>
                <span>{ind.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="container" style={{ textAlign: 'center', marginTop: 14 }}>
          <a
            href="/industries"
            style={{
              color: '#d8c19a',
              textDecoration: 'none',
              fontSize: 13.5,
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'color 0.2s ease',
            }}
          >
            <span>Explore All 17 Specialised Sectors</span>
            <span>→</span>
          </a>
        </div>
      </section>

      {/* 7. Interactive PAN India Network Map Section */}
      <section style={{ padding: '48px 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 28px' }}>
            <span style={{ color: '#b08d57', fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>
              National Network Hub
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 2.4vw, 34px)', color: '#1f3864', margin: '6px 0 10px', fontWeight: 800 }}>
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
      <section style={{ padding: '44px 0', background: 'linear-gradient(135deg, #f8fafc 0%, #eef2f6 100%)', borderTop: '1px solid #e2e8f0', borderBottom: '3px solid #b08d57', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 940 }}>
          <span style={{ color: '#967341', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, display: 'inline-block', marginBottom: 8 }}>
            Get Started With Team Eyrie
          </span>
          <h2 style={{ color: '#1f3864', fontSize: 'clamp(24px, 2.6vw, 32px)', margin: '0 0 12px', fontWeight: 800 }}>
            Trusted Advice. Practical Solutions. Sustainable Growth.
          </h2>
          <p style={{ color: '#475569', fontSize: 16, lineHeight: 1.55, margin: '0 0 20px' }}>
            Whether you are launching your first venture, restructuring a business, or expanding globally, Team Eyrie is your trusted partner.
          </p>
          <a href="/contact" className="hero-btn hero-btn--gold" style={{ padding: '12px 32px', fontSize: 15 }}>
            Connect with Our Partners
          </a>
        </div>
      </section>
    </main>
  )
}
