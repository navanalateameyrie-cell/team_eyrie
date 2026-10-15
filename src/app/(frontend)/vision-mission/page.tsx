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
  title: 'Vision, Mission & Core Values — Team Eyrie | Professional Standards',
  description:
    'The foundational vision, core mission, and guiding ethical values that drive Team Eyrie’s integrated multidisciplinary professional services network across India.',
}

const coreValues = [
  {
    number: '01',
    title: 'Uncompromising Integrity & Independence',
    description:
      'We hold statutory independence and ethical conduct as non-negotiable foundations. Guided by the ICAI Code of Ethics, we safeguard client trust with absolute transparency, fiduciary rigor, and zero conflict of interest.',
  },
  {
    number: '02',
    title: 'Relentless Technical Mastery',
    description:
      'In a business landscape governed by rapid legislative changes and complex jurisprudence, our teams maintain deep technical immersion across direct tax, GST, corporate law, and international accounting standards.',
  },
  {
    number: '03',
    title: 'Direct Partner-Led Accountability',
    description:
      'We believe client leadership deserves direct partner counsel. Every engagement is actively spearheaded by senior chartered accountants who provide strategic clarity, commercial insight, and hands-on guidance.',
  },
  {
    number: '04',
    title: 'Integrated Multidisciplinary Thinking',
    description:
      'Modern corporate transactions do not occur in silos. We integrate accounting precision, tax strategy, regulatory secretarial diligence, and valuation modeling into a cohesive, single-window execution framework.',
  },
  {
    number: '05',
    title: 'Technology & Secure Innovation',
    description:
      'We harness modern cloud collaboration tools, encrypted document repositories, and digital audit methodologies to deliver fast, highly secure, and error-free professional service experiences.',
  },
  {
    number: '06',
    title: 'Fiduciary Responsibility to the Nation',
    description:
      'As chartered accountants, we recognize our role as gatekeepers of economic governance. We champion transparent statutory compliance that fosters robust capital markets and sustainable enterprise growth.',
  },
]

const stakeholderCommitments = [
  {
    title: 'To Our Clients',
    role: 'Fiduciary Partner',
    description:
      'To provide defensible, pragmatic, and forward-looking advisory that protects business value, optimizes tax and regulatory positions, and ensures total operational peace of mind.',
    points: [
      'Proactive regulatory updates & impact analysis',
      'Absolute confidentiality and client data privacy',
      'Speedy turnaround with partner-level quality checks',
      'Practical, commercially viable execution',
    ],
  },
  {
    title: 'To Regulators & Society',
    role: 'Institutional Guardian',
    description:
      'To uphold the highest standards of professional objectivity and compliance, serving as dependable auditors and advisors who reinforce trust in India’s corporate financial system.',
    points: [
      'Strict adherence to ICAI Standards of Auditing (SAs)',
      'Zero compromise on statutory independence',
      'Transparent disclosure frameworks & peer review',
      'Constructive participation in professional forums',
    ],
  },
  {
    title: 'To Our Professionals & Trainees',
    role: 'Mentorship & Growth',
    description:
      'To nurture an empowering, meritocratic environment where aspiring CAs and seasoned professionals gain world-class technical exposure, ethical grounding, and leadership capabilities.',
    points: [
      'Structured technical training & continuing education',
      'Hands-on exposure to complex corporate mandates',
      'Culture of mutual respect, ethics, and collaboration',
      'Merit-driven career advancement pathways',
    ],
  },
]

const roadmapGoals = [
  {
    year: 'Goal 01',
    title: 'Pan-India Practice Integration',
    description: 'Deepen seamless cross-practice workflows across our 6+ metro and industrial hubs for unified service delivery.',
  },
  {
    year: 'Goal 02',
    title: 'Specialized Emerging Desks',
    description: 'Institutionalize dedicated advisory desks for ESG reporting, FinTech compliance, transfer pricing BEPS 2.0, and digital asset governance.',
  },
  {
    year: 'Goal 03',
    title: 'Global Inbound & Outbound Corridors',
    description: 'Expand specialized cross-border structuring for multinational corporations entering India and Indian enterprises venturing abroad.',
  },
  {
    year: 'Goal 04',
    title: 'Eyrie Knowledge & Academy',
    description: 'Empower industry professionals through regular research publications, statutory webinars, and structured LMS knowledge platforms.',
  },
]

export default async function VisionMissionPage() {
  const payload = await getPayload({ config })
  const [siteSettings, homePage] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
    payload.findGlobal({ slug: 'home-page' }).catch(() => null),
  ])

  const orgName = siteSettings?.organizationName || 'Team Eyrie'
  const tagline = siteSettings?.tagline || 'Together, We Create Value. Together, We Build Trust.'

  return (
    <main>
      <PageHero
        title="Vision, Mission & Values"
        subtitle={`The Guiding Principles and High-Trust Standards Driving ${orgName} Across India`}
        eyebrow="Our Guiding North Star"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Vision & Mission' }]}
        bgImage="/images/about.png"
      />

      {/* ── SECTION 1: VISION & MISSION HERO CARDS ── */}
      <section className="section" style={{ padding: '60px 0 40px', background: '#ffffff' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Foundational Purpose"
            title="Empowering Enterprise Growth Through Integrity & Technical Mastery"
            subtitle="Built on the bedrock of three esteemed Chartered Accountancy partnerships, our mission and vision unite traditional fiduciary ethics with modern strategic scale."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 28,
              marginBottom: 56,
            }}
          >
            {/* ── OUR VISION CARD ── */}
            <div
              style={{
                background: 'linear-gradient(135deg, #2b52d4 0%, #2563eb 50%, #1d4ed8 100%)',
                color: '#ffffff',
                borderRadius: 16,
                padding: '40px 32px',
                boxShadow: '0 16px 40px rgba(37, 99, 235, 0.25)',
                border: '1.5px solid rgba(255, 255, 255, 0.22)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Ambient Radial Accent Glow */}
              <div
                style={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(242, 101, 34, 0.25) 0%, rgba(29, 78, 216, 0) 70%)',
                  pointerEvents: 'none',
                }}
              />

              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255, 255, 255, 0.15)', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#ffffff', marginBottom: 20, border: '1px solid rgba(255, 255, 255, 0.22)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#f26522', boxShadow: '0 0 8px #f26522' }} />
                  Our Vision
                </div>
                <h3 style={{ fontSize: 'clamp(24px, 2.2vw, 30px)', fontWeight: 800, margin: '0 0 16px', color: '#ffffff', lineHeight: 1.3 }}>
                  To Be India’s Most Trusted &amp; Technically Formidable Professional Services Network
                </h3>
                <p style={{ fontSize: 15.5, color: '#e2e8f0', lineHeight: 1.7, margin: '0 0 24px', textAlign: 'justify', textJustify: 'inter-word' }}>
                  To establish Team Eyrie as India’s foremost integrated multidisciplinary network—celebrated by enterprises, regulatory authorities, and the profession for uncompromising independence, technical mastery, and strategic value creation.
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#f26522', marginBottom: 10 }}>
                  Vision Pillars
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 13, color: '#ffffff' }}>
                  <div><span style={{ color: '#f26522', fontWeight: 800, marginRight: 6 }}>✓</span>National Scale with Local Care</div>
                  <div><span style={{ color: '#f26522', fontWeight: 800, marginRight: 6 }}>✓</span>Tech-Enabled Compliance</div>
                  <div><span style={{ color: '#f26522', fontWeight: 800, marginRight: 6 }}>✓</span>High-Trust Fiduciary Standard</div>
                  <div><span style={{ color: '#f26522', fontWeight: 800, marginRight: 6 }}>✓</span>Sustainable Enterprise Growth</div>
                </div>
              </div>
            </div>

            {/* ── OUR MISSION CARD ── */}
            <div
              style={{
                background: '#ffffff',
                border: '1.5px solid #cfe0f2',
                borderTop: '6px solid #1d4ed8',
                borderRadius: 16,
                padding: '40px 32px',
                boxShadow: '0 12px 32px rgba(29, 78, 216, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(29, 78, 216, 0.08)', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#1d4ed8', marginBottom: 20, border: '1px solid rgba(29, 78, 216, 0.2)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#f26522' }} />
                  Our Mission
                </div>
                <h3 style={{ fontSize: 'clamp(24px, 2.2vw, 30px)', fontWeight: 800, margin: '0 0 16px', color: '#0f172a', lineHeight: 1.3 }}>
                  Transforming Regulatory Complexity into Strategic Confidence
                </h3>
                <p style={{ fontSize: 15.5, color: '#475569', lineHeight: 1.7, margin: '0 0 24px', textAlign: 'justify', textJustify: 'inter-word' }}>
                  To deliver world-class professional assurance, tax jurisprudence, and transactional advisory by fusing decades of specialized legacy expertise with modern collaborative technology—enabling clients to navigate evolving economic frontiers with complete certainty.
                </p>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#1d4ed8', marginBottom: 10 }}>
                  Mission Execution
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 13, color: '#334155' }}>
                  <div><span style={{ color: '#f26522', fontWeight: 800, marginRight: 6 }}>✓</span>Defensible Statutory Counsel</div>
                  <div><span style={{ color: '#f26522', fontWeight: 800, marginRight: 6 }}>✓</span>Partner-Led Accountability</div>
                  <div><span style={{ color: '#f26522', fontWeight: 800, marginRight: 6 }}>✓</span>Seamless Single-Window Service</div>
                  <div><span style={{ color: '#f26522', fontWeight: 800, marginRight: 6 }}>✓</span>Developing Top Tier CA Talent</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTION 2: THE EYRIE CODE — 6 CORE VALUES ── */}
          <SectionHeader
            eyebrow="The Eyrie Code"
            title="Six Non-Negotiable Core Values"
            subtitle="The ethical compass and operational discipline that guide our partner council, professionals, and daily client interactions."
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20, marginBottom: 56 }}>
            {coreValues.map((val) => (
              <div key={val.number} style={{ flex: '1 1 320px', maxWidth: 380, minWidth: 280, display: 'flex' }}>
                <CorporateCard
                  variant="light"
                  number={val.number}
                  title={val.title}
                  description={val.description}
                  style={{ width: '100%' }}
                />
              </div>
            ))}
          </div>

          {/* ── SECTION 3: STAKEHOLDER COMMITMENTS ── */}
          <SectionHeader
            eyebrow="Trust in Action"
            title="Our Tripartite Stakeholder Commitment"
            subtitle="Professional services are an act of public and corporate trust. Here is how we honor our obligations across our ecosystem."
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20, marginBottom: 56 }}>
            {stakeholderCommitments.map((sc) => (
              <div
                key={sc.title}
                style={{
                  flex: '1 1 320px',
                  maxWidth: 380,
                  minWidth: 280,
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: 14,
                  padding: '28px 24px',
                  boxShadow: '0 4px 18px rgba(15, 39, 74, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 1.2,
                      padding: '4px 10px',
                      borderRadius: 20,
                      background: 'rgba(26, 75, 140, 0.08)',
                      color: '#1a4b8c',
                      border: '1px solid rgba(26, 75, 140, 0.15)',
                      display: 'inline-block',
                      marginBottom: 12,
                    }}
                  >
                    {sc.role}
                  </span>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f274a', margin: '0 0 10px' }}>
                    {sc.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, margin: '0 0 18px', textAlign: 'justify', textJustify: 'inter-word' }}>
                    {sc.description}
                  </p>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#334155', lineHeight: 1.7 }}>
                    {sc.points.map((pt) => (
                      <li key={pt} style={{ marginBottom: 4 }}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* ── SECTION 4: STRATEGIC ROADMAP 2026-2030 ── */}
          <div
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #edf4fc 100%)',
              borderRadius: 16,
              border: '1.5px solid #cfe0f2',
              borderLeft: '6px solid #1a4b8c',
              padding: '40px 32px',
              marginBottom: 48,
              boxShadow: '0 8px 24px rgba(26, 75, 140, 0.04)',
            }}
          >
            <SectionHeader
              eyebrow="Looking Forward"
              title="Strategic Horizon &amp; Growth Objectives"
              subtitle="Where we are steering the Team Eyrie network over the coming years as India’s corporate landscape expands."
              theme="light"
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 20,
              }}
            >
              {roadmapGoals.map((goal) => (
                <div
                  key={goal.title}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    padding: '20px 18px',
                    boxShadow: '0 2px 10px rgba(15, 39, 74, 0.02)',
                  }}
                >
                  <span style={{ fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', color: '#1a4b8c', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
                    {goal.year}
                  </span>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0f274a', margin: '0 0 8px' }}>
                    {goal.title}
                  </h4>
                  <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.6, margin: 0, textAlign: 'justify', textJustify: 'inter-word' }}>
                    {goal.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CALL TO ACTION BANNER ── */}
          <CtaBanner
            eyebrow="Shared Values. Formidable Execution."
            title="Experience the Team Eyrie Standard"
            description="Our senior partners are ready to discuss your audit, taxation, transaction, or governance mandates. Experience the clarity of partner-led professional advisory."
            primaryLabel="Contact Senior Partners"
            primaryHref="/contact"
            secondaryLabel="Why Choose Us"
            secondaryHref="/why-team-eyrie"
          />
        </div>
      </section>
    </main>
  )
}
