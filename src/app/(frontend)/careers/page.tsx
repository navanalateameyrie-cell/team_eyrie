import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/layout/PageHero'
import SectionHeader from '@/components/layout/SectionHeader'
import CtaBanner from '@/components/layout/CtaBanner'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Careers & Articleship — Team Eyrie | Build Your Professional Future',
  description:
    'Explore rewarding careers and ICAI articleship opportunities with Team Eyrie across Audit & Assurance, Direct & Indirect Taxation, Corporate Finance, and Governance.',
}

const TYPE_LABEL: Record<string, string> = {
  'full-time': 'Full-Time Professional',
  'part-time': 'Part-Time Professional',
  contract: 'Retainer / Contract',
  internship: 'ICAI Articleship / Trainee',
}

const careerTracks = [
  {
    title: 'Chartered Accountants',
    badge: 'Qualified CAs',
    desc: 'Opportunities for newly qualified and experienced FCAs / ACAs across Statutory Audit, Transfer Pricing, GST Litigation, and Transaction Advisory.',
    focus: 'Leadership, Advisory & Client Fiduciary Management',
  },
  {
    title: 'ICAI Article Trainees',
    badge: 'Articleship (3 / 2 Years)',
    desc: 'Intensive, well-rounded articleship training complying with ICAI regulations. Comprehensive exposure across audit, corporate law, tax returns, and client representation.',
    focus: 'Direct Partner Mentorship & Multi-Discipline Rotation',
  },
  {
    title: 'Semi-Qualified & Audit Executives',
    badge: 'Inter CA / M.Com',
    desc: 'Dynamic operational roles for CA Finalists, Semi-Qualified accountants, and post-graduates in bookkeeping, accounting review, and tax filings.',
    focus: 'Execution Depth & Continuous Career Progression',
  },
  {
    title: 'Company Secretaries & Legal Counsel',
    badge: 'CS / LLB Specialists',
    desc: 'Specialized governance roles managing MCA V3 compliance, NCLT proceedings, secretarial audits, FEMA filings, and contract review.',
    focus: 'Corporate Governance & Commercial Jurisprudence',
  },
]

const firmCulturePillars = [
  {
    icon: '🤝',
    title: 'Direct Partner Mentorship',
    desc: 'Work directly alongside founding partners and senior CAs rather than being lost in an impersonal corporate hierarchy.',
  },
  {
    icon: '📈',
    title: 'Diverse Industry Exposure',
    desc: 'Engage with clients ranging from listed enterprises and mid-market champions to tech startups and cross-border subsidiaries.',
  },
  {
    icon: '📚',
    title: 'ICAI Exam & Study Support',
    desc: 'We support our article trainees with structured exam study leaves, continuous technical seminars, and mock interview coaching.',
  },
  {
    icon: '💻',
    title: 'Tech-First Work Environment',
    desc: 'Master industry-leading audit automation, cloud ERPs, digital analytics, and secure collaboration frameworks.',
  },
]

export default async function CareersPage() {
  const payload = await getPayload({ config })
  const { docs: jobs } = await payload.find({
    collection: 'jobs',
    where: { status: { equals: 'open' } },
    limit: 100,
    sort: '-createdAt',
    depth: 1,
  }).catch(() => ({ docs: [] }))

  return (
    <main>
      <PageHero
        title="Careers & Articleship"
        subtitle="Together We Rise. Together We Excel. Build an Extraordinary Career with India’s Premier Professional Services Network."
        eyebrow="Grow with Industry Leaders"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Careers' }]}
        bgImage="/hero/hero-1.png"
      />

      <section className="section" style={{ padding: '60px 0', background: '#ffffff' }}>
        <div className="container">
          {/* ── SECTION 1: CAREER TRACKS (SIMPLIFIED & CLEAR) ── */}
          <SectionHeader
            eyebrow="Opportunities for Everyone"
            title="Structured Pathways to Professional Excellence"
            subtitle="Whether you are beginning your ICAI articleship or are a seasoned chartered accountant seeking partner-track growth, Team Eyrie provides the platform to excel."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 20,
              marginBottom: 56,
            }}
          >
            {careerTracks.map((track) => (
              <div
                key={track.title}
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderTop: '4px solid #1a4b8c',
                  borderRadius: 12,
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 14px rgba(15, 39, 74, 0.03)',
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      padding: '4px 10px',
                      borderRadius: 14,
                      background: 'rgba(26, 75, 140, 0.08)',
                      color: '#1a4b8c',
                      display: 'inline-block',
                      marginBottom: 10,
                    }}
                  >
                    {track.badge}
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f274a', margin: '0 0 8px' }}>
                    {track.title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.6, margin: '0 0 14px' }}>
                    {track.desc}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 10, fontSize: 12, fontWeight: 600, color: '#1a4b8c' }}>
                  ✓ {track.focus}
                </div>
              </div>
            ))}
          </div>

          {/* ── SECTION 2: CURRENT OPENINGS (SIMPLIFIED FULL-WIDTH LIST) ── */}
          <SectionHeader
            eyebrow="Active Positions"
            title="Current Openings Across India"
            subtitle="Browse available mandates and apply online directly to our talent acquisition team."
          />

          {jobs.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 24px',
                background: '#f8fafc',
                borderRadius: 14,
                border: '1.5px dashed #cbd5e1',
                marginBottom: 56,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>💼</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f274a', margin: '0 0 8px' }}>
                Open Enrollment for Articleship &amp; Lateral Roles
              </h3>
              <p style={{ fontSize: 15, color: '#64748b', maxWidth: 600, margin: '0 auto 20px', lineHeight: 1.6 }}>
                We continuously review applications for <strong>ICAI Article Assistants</strong>, <strong>Chartered Accountants</strong>, and <strong>Audit Associates</strong> across Bengaluru, Mumbai, Delhi, and Chennai.
              </p>
              <a
                href="/contact"
                style={{
                  background: '#1a4b8c',
                  color: '#ffffff',
                  padding: '12px 28px',
                  borderRadius: 8,
                  fontSize: 14.5,
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 14px rgba(26, 75, 140, 0.3)',
                }}
              >
                <span>Submit Your Resume Online</span>
                <span>→</span>
              </a>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 56 }}>
              {jobs.map((j: any) => {
                const locations = Array.isArray(j.location)
                  ? j.location.filter((l: any) => typeof l === 'object').map((l: any) => l.city)
                  : []
                return (
                  <div
                    key={j.id}
                    style={{
                      background: '#ffffff',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: 12,
                      padding: '24px 24px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 20,
                      boxShadow: '0 2px 10px rgba(15, 39, 74, 0.03)',
                      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                    }}
                  >
                    <div style={{ flex: '1 1 500px', minWidth: 'min(100%, 260px)' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span
                          style={{
                            fontSize: 11.5,
                            fontWeight: 700,
                            background: 'rgba(26, 75, 140, 0.08)',
                            color: '#1a4b8c',
                            padding: '3px 10px',
                            borderRadius: 6,
                          }}
                        >
                          {TYPE_LABEL[j.employmentType] || j.employmentType}
                        </span>
                        {locations.length > 0 && (
                          <span
                            style={{
                              fontSize: 11.5,
                              fontWeight: 600,
                              background: '#f1f5f9',
                              color: '#475569',
                              padding: '3px 10px',
                              borderRadius: 6,
                            }}
                          >
                            📍 {locations.join(', ')}
                          </span>
                        )}
                        {j.department && (
                          <span
                            style={{
                              fontSize: 11.5,
                              fontWeight: 600,
                              background: '#f1f5f9',
                              color: '#475569',
                              padding: '3px 10px',
                              borderRadius: 6,
                            }}
                          >
                            🏷️ {j.department}
                          </span>
                        )}
                      </div>

                      <h3 style={{ fontSize: 20, color: '#0f274a', fontWeight: 800, margin: '0 0 6px' }}>
                        {j.title}
                      </h3>

                      {j.summary && (
                        <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                          {j.summary}
                        </p>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                      <a
                        href={`/careers/${j.slug}`}
                        style={{
                          background: '#1a4b8c',
                          color: '#ffffff',
                          padding: '10px 22px',
                          borderRadius: 6,
                          fontWeight: 700,
                          fontSize: 13.5,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          boxShadow: '0 4px 12px rgba(26, 75, 140, 0.25)',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span>View</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* ── SECTION 3: WHY BUILD YOUR CAREER AT TEAM EYRIE ── */}
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
              eyebrow="The Eyrie Advantage"
              title="Why Build Your Professional Career With Us"
              subtitle="We cultivate an environment of technical rigor, integrity, and mutual respect where exceptional talent thrives."
              theme="light"
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 20,
              }}
            >
              {firmCulturePillars.map((p) => (
                <div
                  key={p.title}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    padding: '22px 18px',
                    boxShadow: '0 2px 8px rgba(15, 39, 74, 0.02)',
                  }}
                >
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{p.icon}</div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0f274a', margin: '0 0 8px' }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CALL TO ACTION BANNER ── */}
          <CtaBanner
            eyebrow="Direct Application"
            title="Looking for an Articleship or Lateral Position?"
            description="We welcome applications from motivated CA Students, Qualified Chartered Accountants, and Company Secretaries. Email your CV directly to our talent acquisition team."
            primaryLabel="Email Your CV to HR"
            primaryHref="mailto:careers@teameyrie.in?subject=Application%20for%20Articleship%20%2F%20Lateral%20Position&body=Dear%20Team%20Eyrie%20Talent%20Team%2C%0D%0A%0D%0APlease%20find%20attached%20my%20CV%20for%20consideration.%0D%0A%0D%0AFull%20Name%3A%20%0D%0AContact%20Number%3A%20%0D%0APreferred%20City%20(Bengaluru%20%2F%20Mumbai%20%2F%20Delhi%20%2F%20Chennai%20%2F%20Other)%3A%20%0D%0AQualification%20%2F%20Role%20Interest%3A%20%0D%0A%0D%0AThank%20you."
            secondaryLabel="About Our Network"
            secondaryHref="/about"
          />
        </div>
      </section>
    </main>
  )
}
