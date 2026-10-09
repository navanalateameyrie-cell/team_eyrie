import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/layout/PageHero'
import SectionHeader from '@/components/layout/SectionHeader'
import CorporateCard from '@/components/ui/CorporateCard'
import CtaBanner from '@/components/layout/CtaBanner'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'About Us — Team Eyrie | Integrated Professional Services Network',
  description:
    'Team Eyrie is India’s premier multidisciplinary professional services network formed by the strategic alliance of V. Verma & Co., S S A L Associates, and R. Sridharan & Company, delivering excellence across Assurance, Taxation, Advisory, and Governance.',
}

const keyMetrics = [
  { value: '20+', label: 'Senior Partners & CAs', subtext: 'Decades of combined technical mastery' },
  { value: '6+', label: 'Strategic Regional Hubs', subtext: 'Pan-India presence in major business corridors' },
  { value: '35+', label: 'Years Practice Heritage', subtext: 'Deep-rooted trust & institutional credibility' },
  { value: '1,200+', label: 'Enterprises & Clients', subtext: 'MNCs, listed entities & fast-growing startups' },
]

const allianceFirms = [
  {
    initials: 'VV',
    name: 'V. Verma & Co.',
    role: 'Chartered Accountants',
    badgeLevel: 'Senior Alliance Firm',
    practiceDomain: 'Direct Tax & Corporate Restructuring',
    heritage: 'Established Practice',
    description:
      'Premier practice delivering statutory assurance, high-stakes direct tax litigation, transfer pricing, and corporate restructuring.',
    focusAreas: ['Statutory & Internal Audit', 'Direct Tax Litigation', 'Transfer Pricing & BEPS', 'Corporate Restructuring'],
    linkHref: '/contact?firm=verma',
  },
  {
    initials: 'SS',
    name: 'S S A L Associates',
    role: 'Chartered Accountants',
    badgeLevel: 'Founding Partner Firm',
    practiceDomain: 'Indirect Tax, GST & Assurance',
    heritage: 'National Tax Practice',
    description:
      'Recognized market leader in GST, indirect tax advisory, risk management, supply-chain fiscal modeling, and internal controls.',
    focusAreas: ['GST Advisory & Health Check', 'Litigation & Appeals', 'Internal Controls & IFC', 'Transaction Tax'],
    linkHref: '/contact?firm=ssal',
  },
  {
    initials: 'RS',
    name: 'R. Sridharan & Company',
    role: 'Chartered Accountants',
    badgeLevel: 'Founding Partner Firm',
    practiceDomain: 'Corporate Finance & Valuation',
    heritage: 'Advisory & Corporate Finance',
    description:
      'Renowned for strategic business valuation under IBBI/FEMA rules, M&A due diligence, and cross-border advisory.',
    focusAreas: ['Business Valuations (IBBI)', 'M&A Due Diligence', 'Cross-Border Inbound/Outbound', 'FEMA & RBI Compliance'],
    linkHref: '/contact?firm=sridharan',
  },
]

const practiceDisciplines = [
  {
    iconName: 'shield',
    title: 'Audit & Assurance',
    description: 'Independent statutory audits, internal financial controls (IFC), tax audits, and risk assurance conducted in strict adherence to ICAI Standards of Auditing (SAs).',
  },
  {
    iconName: 'scale',
    title: 'Taxation & Regulatory',
    description: 'Comprehensive direct and indirect tax strategies, domestic and international tax planning, dispute resolution, transfer pricing documentation, and GST compliance.',
  },
  {
    iconName: 'briefcase',
    title: 'Corporate Advisory & M&A',
    description: 'Transaction advisory, financial modeling, financial and tax due diligence, business valuations, and restructuring support for sustainable enterprise growth.',
  },
  {
    iconName: 'landmark',
    title: 'Governance & Secretarial',
    description: 'Company law compliance under MCA, secretarial audits, board advisory, corporate governance structuring, and regulatory filings for private and public companies.',
  },
  {
    iconName: 'globe',
    title: 'Cross-Border & FEMA',
    description: 'Inbound and outbound investment structuring, foreign direct investment (FDI) advisory, external commercial borrowings (ECB), and compliance with RBI guidelines.',
  },
  {
    iconName: 'trending-up',
    title: 'Insolvency & Business Turnaround',
    description: 'Distressed asset management, IBC advisory, creditor advisory, debt restructuring frameworks, and representation before the National Company Law Tribunal (NCLT).',
  },
]

const operatingPillars = [
  {
    number: '01',
    title: 'Direct Partner-Led Engagement',
    description:
      'We reject the detached pyramid structure of traditional firms. At Team Eyrie, every assignment is actively led and driven by experienced partners who engage directly with client leadership.',
  },
  {
    number: '02',
    title: 'Multidisciplinary Synergy',
    description:
      'Modern business challenges span accounting, tax, legal, and operational boundaries. Our unified teams deliver integrated solutions, eliminating the fragmentation of dealing with multiple siloed advisors.',
  },
  {
    number: '03',
    title: 'Rigorous Independence & Ethics',
    description:
      'Our practice is anchored by the ICAI Code of Ethics and international quality benchmarks (SQC-1). We maintain total independence, unwavering confidentiality, and zero conflict of interest.',
  },
  {
    number: '04',
    title: 'Technology-Enabled Agility',
    description:
      'Combining traditional chartered accountancy precision with modern secure cloud vaults, automated compliance calendars, and analytics-driven audit techniques.',
  },
]

const multidisciplinarySquad = [
  { role: 'Chartered Accountants (FCA / ACA)', spec: 'Audit, Tax & International Jurisprudence' },
  { role: 'Company Secretaries (FCS / ACS)', spec: 'MCA, Governance & Statutory Filings' },
  { role: 'Corporate Advocates & Legal Counsel', spec: 'FEMA, Commercial Contracts & NCLT' },
  { role: 'Registered Valuers (IBBI)', spec: 'Securities & Financial Assets Valuation' },
  { role: 'Insolvency Professionals (IP)', spec: 'IBC 2016 Advisory & Asset Recovery' },
  { role: 'Information System Auditors (DISA)', spec: 'IT Governance & Cybersecurity Audits' },
]

export default async function AboutPage() {
  const payload = await getPayload({ config })
  const [{ docs: teamMembers }, { docs: dbServices }, homePage] = await Promise.all([
    payload.find({ collection: 'team-members', limit: 12, sort: 'order', depth: 1 }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'services', limit: 8, sort: 'order' }).catch(() => ({ docs: [] })),
    payload.findGlobal({ slug: 'home-page' }).catch(() => null),
  ])

  const displayMetrics =
    homePage?.stats && homePage.stats.length > 0
      ? homePage.stats.map((s) => ({
        value: s.value,
        label: s.label,
        subtext: 'Institutional capability metric',
      }))
      : keyMetrics

  const partnerCards =
    teamMembers.length > 0
      ? teamMembers.map((tm: any) => {
        const initials = tm.name
          ? tm.name
            .replace(/CA\s+/i, '')
            .trim()
            .split(/\s+/)
            .map((n: string) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()
          : 'CA'

        let bioSnippet = ''
        if (typeof tm.bio === 'string') {
          bioSnippet = tm.bio
        } else if (tm.bio?.root?.children) {
          bioSnippet = tm.bio.root.children
            .map((c: any) => c.children?.map((ch: any) => ch.text || '').join('') || '')
            .join(' ')
        }

        const rawDesignation = tm.designation || 'Senior Partner'
        const parts = rawDesignation.split(/—|-/).map((s: string) => s.trim())
        const badgeLevel = parts[0] || 'Senior Partner'
        const practiceDomain =
          parts.length > 1
            ? parts.slice(1).join(' — ')
            : tm.serviceTitle || 'Tax & Advisory Practice'

        const focusAreas =
          Array.isArray(tm.expertise) && tm.expertise.length > 0
            ? tm.expertise.map((e: any) => (typeof e === 'object' ? e.title : 'Advisory Practice'))
            : tm.serviceTitle
              ? [tm.serviceTitle]
              : ['Corporate Assurance', 'Taxation & Regulatory']

        const personSlug =
          tm.slug ||
          (tm.name
            ? tm.name
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '')
            : '')
        const linkHref = personSlug ? `/people/${personSlug}` : (tm.id ? `/people/${tm.id}` : '/contact')

        const fullDescription =
          bioSnippet ||
          'Senior Partner spearheading multidisciplinary corporate advisory, compliance and regulatory representation.'

        // Compact summary (max ~90 chars for clean 2-line height)
        const MAX_DESC = 90
        const isLong = fullDescription.length > MAX_DESC
        let shortDescription = fullDescription
        if (isLong) {
          const cut = fullDescription.slice(0, MAX_DESC)
          const lastSpace = cut.lastIndexOf(' ')
          shortDescription = (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trim() + '...'
        }

        return {
          initials,
          name: tm.name,
          role: tm.qualifications || 'Chartered Accountant',
          badgeLevel,
          practiceDomain,
          heritage: tm.officeCity ? `${tm.officeCity} Hub` : 'Partner Leadership',
          description: fullDescription,
          shortDescription,
          isLong,
          focusAreas,
          linkHref,
          isPerson: true,
        }
      })
      : allianceFirms.map((f) => ({
        ...f,
        shortDescription: f.description,
        isLong: false,
        isPerson: false,
      }))

  return (
    <main>
      <PageHero
        title="About Team Eyrie"
        subtitle="An Integrated Multidisciplinary Professional Services Network Delivering Institutional Excellence Across India"
        eyebrow="The Power of Strategic Alliance"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About Team Eyrie' }]}
        bgImage="/images/Aboutus.png"
      />

      {/* ── SECTION 1: EXECUTIVE NARRATIVE ── */}
      <section className="section" style={{ padding: '60px 0 40px', background: '#ffffff' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 40,
              alignItems: 'center',
              marginBottom: 48,
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  color: '#123B6D',
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  marginBottom: 10,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#f26522' }} />
                Who We Are
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', color: '#0f172a', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.25 }}>
                Redefining Professional Services for the Modern Enterprise
              </h2>
              <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, margin: '0 0 16px' }}>
                <strong>Team Eyrie</strong> is an integrated multidisciplinary professional services network established through the strategic alliance of three reputed Chartered Accountancy partnerships: <strong>V. Verma & Co.</strong>, <strong>S S A L Associates</strong>, and <strong>R. Sridharan & Company</strong>.
              </p>
              <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, margin: 0 }}>
                Recognizing the growing complexity of Indian and global commerce, our founding partners united decades of specialized legacy practices into a singular cohesive national network. Together, we combine the personalized attention and institutional trust of traditional CA practice with the scale, technical breadth, and tech-driven infrastructure required by high-growth enterprises, multinational corporations, and family offices.
              </p>
            </div>

            <div
              style={{
                background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 45%, #172554 100%)',
                color: '#ffffff',
                borderRadius: 16,
                padding: '36px 30px',
                boxShadow: '0 16px 36px rgba(29, 78, 216, 0.22)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 2, color: '#f26522', fontWeight: 700, marginBottom: 12 }}>
                Our Core Philosophy
              </div>
              <blockquote style={{ margin: '0 0 20px', fontSize: 19, fontWeight: 600, lineHeight: 1.45, fontStyle: 'italic', borderLeft: '3px solid #f26522', paddingLeft: 16 }}>
                “Together, We Create Value. Together, We Build Trust. Our responsibility is not merely compliance; it is providing the intellectual clarity and regulatory safety for businesses to scale with absolute confidence.”
              </blockquote>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#f26522', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 800, fontSize: 18 }}>
                  TE
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>Senior Partner Council</div>
                  <div style={{ fontSize: 13, color: '#cbd5e1' }}>Team Eyrie Integrated Network</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── KEY METRICS BAR ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 20,
              padding: '28px 24px',
              background: '#F8FAFC',
              border: '1px solid rgba(152, 162, 179, 0.3)',
              borderRadius: 14,
              marginBottom: 56,
            }}
          >
            {displayMetrics.map((m) => (
              <div key={m.label} style={{ textAlign: 'center', padding: '10px 14px' }}>
                <div style={{ fontSize: 'clamp(32px, 3vw, 42px)', fontWeight: 800, color: '#123B6D', lineHeight: 1.1, marginBottom: 4 }}>
                  {m.value}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#071A3A', marginBottom: 2 }}>
                  {m.label}
                </div>
                <div style={{ fontSize: 12.5, color: '#64748b' }}>
                  {m.subtext}
                </div>
              </div>
            ))}
          </div>

          {/* ── SECTION 2: THE 3 ALLIANCE FIRMS ── */}
          <SectionHeader
            eyebrow="Our Alliance Foundation"
            title="The Three Pillar Partnerships"
            subtitle="Each alliance firm brings specialized industry credentials, deep regulatory relationships, and decades of client trust."
          />

          {/* Centered Floating Partner Cards Container (Compact Height) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: 16,
              marginBottom: 48,
              maxWidth: 1280,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {partnerCards.map((f) => (
              <div
                key={f.name}
                className="partner-showcase-card"
                style={{
                  flex: '1 1 250px',
                  width: '100%',
                  maxWidth: 285,
                  minWidth: 230,
                  background: '#ffffff',
                  border: '1px solid rgba(152, 162, 179, 0.4)',
                  borderTop: '3.5px solid #1d4ed8',
                  borderRadius: 14,
                  padding: '18px 16px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)',
                  transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div>
                  {/* Top Bar: Compact Single Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 10 }}>
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: 0.8,
                        padding: '3px 9px',
                        borderRadius: 12,
                        background: 'rgba(29, 78, 216, 0.08)',
                        color: '#1d4ed8',
                        border: '1px solid rgba(29, 78, 216, 0.2)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f26522', flexShrink: 0 }} />
                      {f.badgeLevel}
                    </span>
                  </div>

                  {/* Profile Identity: Compact Monogram & Names */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
                    {/* Prestigious Monogram Icon Box */}
                    <a
                      href={f.linkHref}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                        border: '1.5px solid rgba(242, 101, 34, 0.5)',
                        color: '#ffffff',
                        fontSize: 15,
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        letterSpacing: 0.5,
                        boxShadow: '0 4px 12px rgba(29, 78, 216, 0.25)',
                        textDecoration: 'none',
                        marginBottom: 8,
                        transition: 'transform 0.2s ease',
                      }}
                      title={`View ${f.name} Profile`}
                    >
                      {f.initials}
                    </a>

                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <h3 style={{ fontSize: 17, color: '#071A3A', fontWeight: 800, margin: '0 0 2px', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
                        <a
                          href={f.linkHref}
                          style={{ color: '#071A3A', textDecoration: 'none', transition: 'color 0.2s ease' }}
                        >
                          {f.name}
                        </a>
                      </h3>
                      <div style={{ fontSize: 12, color: '#1d4ed8', fontWeight: 700, margin: '1px 0 2px', lineHeight: 1.3 }}>
                        {f.practiceDomain}
                      </div>
                      <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>
                        {f.role}
                      </div>
                    </div>
                  </div>

                  {/* Concise Description with Read More */}
                  <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.5, textAlign: 'center', margin: '0 0 10px' }}>
                    {f.shortDescription}
                    {f.isLong && (
                      <a
                        href={f.linkHref}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 2,
                          color: '#f26522',
                          fontWeight: 700,
                          fontSize: 12,
                          marginLeft: 4,
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        Read More →
                      </a>
                    )}
                  </p>

                  {/* Domain Focus Chip */}
                  <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        background: '#F8FAFC',
                        color: '#071A3A',
                        border: '1px solid rgba(152, 162, 179, 0.4)',
                        padding: '2px 8px',
                        borderRadius: 5,
                        maxWidth: '90%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {f.focusAreas[0] || 'Tax Advisory'}
                    </span>
                  </div>
                </div>

                {/* Footer Link */}
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 10, display: 'flex', justifyContent: 'center' }}>
                  <a
                    href={f.linkHref}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4,
                      color: '#1d4ed8',
                      fontWeight: 700,
                      fontSize: 12.5,
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    <span>View Profile</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* ── SECTION 3: MULTIDISCIPLINARY EXPERT SQUAD ── */}
          <div
            style={{
              background: '#F8FAFC',
              borderRadius: 16,
              border: '1.5px solid rgba(152, 162, 179, 0.45)',
              borderLeft: '6px solid #1d4ed8',
              padding: '40px 32px',
              marginBottom: 56,
              boxShadow: '0 4px 18px rgba(7, 26, 58, 0.04)',
            }}
          >
            <SectionHeader
              eyebrow="Integrated Expertise"
              title="Multidisciplinary Professional Bench"
              subtitle="Complex business challenges require more than conventional accounting. Our roster spans multiple statutory disciplines."
              theme="light"
              maxWidth={820}
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 16,
              }}
            >
              {multidisciplinarySquad.map((member) => (
                <div
                  key={member.role}
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(152, 162, 179, 0.4)',
                    borderRadius: 10,
                    padding: '18px 16px',
                    boxShadow: '0 2px 8px rgba(7, 26, 58, 0.03)',
                  }}
                >
                  <div style={{ color: '#071A3A', fontSize: 14.5, fontWeight: 700, marginBottom: 4 }}>
                    {member.role}
                  </div>
                  <div style={{ color: '#1d4ed8', fontSize: 12.5, fontWeight: 600 }}>
                    {member.spec}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTION 4: PRACTICE DISCIPLINES ── */}
          <SectionHeader
            eyebrow="Our Capabilities"
            title="Comprehensive Practice Areas"
            subtitle="Full-spectrum corporate, tax, assurance, and financial advisory services executed to international standards."
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20, marginBottom: 56 }}>
            {practiceDisciplines.map((d) => (
              <div key={d.title} style={{ flex: '1 1 320px', maxWidth: 380, minWidth: 280, display: 'flex' }}>
                <CorporateCard
                  variant="light"
                  iconName={d.iconName}
                  title={d.title}
                  description={d.description}
                  linkHref="/services"
                  linkLabel="Explore Practice →"
                  style={{ width: '100%' }}
                />
              </div>
            ))}
          </div>

          {/* ── SECTION 5: OPERATING PILLARS ── */}
          <SectionHeader
            eyebrow="Our Delivery Standard"
            title="The Four Operating Pillars of Team Eyrie"
            subtitle="How we consistently deliver higher quality, faster turnaround, and measurable peace of mind to our clients."
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20, marginBottom: 48 }}>
            {operatingPillars.map((p) => (
              <div key={p.number} style={{ flex: '1 1 450px', maxWidth: 560, minWidth: 320, display: 'flex' }}>
                <CorporateCard
                  variant="light"
                  number={p.number}
                  title={p.title}
                  description={p.description}
                  style={{ width: '100%' }}
                />
              </div>
            ))}
          </div>

          {/* ── SECTION 6: QUALITY & ICAI CODE ASSURANCE ── */}
          <div
            style={{
              background: '#071A3A',
              color: '#ffffff',
              borderRadius: 16,
              padding: '40px 32px',
              marginBottom: 48,
              border: '1px solid rgba(152, 162, 179, 0.3)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 32,
              alignItems: 'center',
            }}
          >
            <div>
              <span style={{ color: '#93c5fd', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, display: 'block', marginBottom: 8 }}>
                Institutional Governance
              </span>
              <h3 style={{ fontSize: 'clamp(22px, 2vw, 28px)', fontWeight: 800, margin: '0 0 12px', color: '#ffffff' }}>
                Unwavering Adherence to ICAI Regulatory Standards
              </h3>
              <p style={{ fontSize: 14.5, color: '#cbd5e1', lineHeight: 1.65, margin: 0 }}>
                Every engagement conducted under the Team Eyrie banner strictly complies with the Chartered Accountants Act, 1949, the ICAI Code of Ethics, and Standard on Quality Control (SQC-1). Our partners maintain rigorous peer review compliance and documented audit trails.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: 10, padding: 18, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#f26522', marginBottom: 4 }}>SQC-1</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>Quality Control Framework</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: 10, padding: 18, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#f26522', marginBottom: 4 }}>100%</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>Peer Review Compliance</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: 10, padding: 18, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#f26522', marginBottom: 4 }}>ISO/IEC</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>Data Confidentiality</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: 10, padding: 18, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#f26522', marginBottom: 4 }}>Pan-India</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>Statutory Authority</div>
              </div>
            </div>
          </div>

          {/* ── CALL TO ACTION BANNER ── */}
          <CtaBanner
            eyebrow="Integrity. Mastery. Growth."
            title="Partner with Team Eyrie Today"
            description="Experience seamless professional services designed for forward-thinking leadership. Connect with a designated practice partner for your business requirements."
            primaryLabel="Schedule a Consultation"
            primaryHref="/contact"
            secondaryLabel="Explore Practice Areas"
            secondaryHref="/services"
          />
        </div>
      </section>
    </main>
  )
}
