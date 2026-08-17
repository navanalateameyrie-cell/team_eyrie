import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '../../../components/PageHero'
import SectionHeader from '../../../components/SectionHeader'
import CtaBanner from '../../../components/CtaBanner'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Careers — Team Eyrie',
  description: 'Build your career with India’s integrated professional services network.',
}

const TYPE_LABEL: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  internship: 'Internship / Articleship',
}

export default async function CareersPage() {
  const payload = await getPayload({ config })
  const { docs: jobs } = await payload.find({
    collection: 'jobs',
    where: { status: { equals: 'open' } },
    limit: 100,
    sort: '-createdAt',
    depth: 1,
  })

  return (
    <main>
      <PageHero
        title="Careers at Team Eyrie"
        subtitle="Together We Rise. Together We Excel. Join a multidisciplinary network of professionals building lasting value."
        eyebrow="Grow with India's Premier Network"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Careers' }]}
        bgImage="/hero/hero-1.png"
      />

      <section className="section section-mobile-compact" style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Opportunities"
            title="Current Openings Across India"
            subtitle="Explore rewarding career opportunities in Assurance, Direct & Indirect Taxation, Corporate Advisory, and Transaction Consulting."
          />

          {jobs.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 24px',
                background: '#f8fafc',
                borderRadius: 16,
                border: '1px solid #e2e8f0',
              }}
            >
              <p style={{ fontSize: 17, color: '#64748b', margin: '0 0 16px' }}>
                There are no open positions right now. Please check back soon or send your resume directly to our talent team.
              </p>
              <a href="/contact" className="hero-btn hero-btn--gold" style={{ padding: '12px 28px' }}>
                Send Your Resume
              </a>
            </div>
          ) : (
            <div className="grid--cards-2">
              {jobs.map((j: any) => {
                const locations = Array.isArray(j.location)
                  ? j.location.filter((l: any) => typeof l === 'object').map((l: any) => l.city)
                  : []
                return (
                  <a
                    key={j.id}
                    href={`/careers/${j.slug}`}
                    className="corporate-card corporate-card--light corporate-card--clickable"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <h3 style={{ fontSize: 22, color: '#1f3864', fontWeight: 800, margin: '0 0 10px' }}>
                      {j.title}
                    </h3>
                    <div className="chips" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '0 0 14px' }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          background: 'rgba(176, 141, 87, 0.12)',
                          color: '#b08d57',
                          padding: '4px 10px',
                          borderRadius: 6,
                        }}
                      >
                        {TYPE_LABEL[j.employmentType] || j.employmentType}
                      </span>
                      {locations.length > 0 && (
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            background: '#f1f5f9',
                            color: '#334155',
                            padding: '4px 10px',
                            borderRadius: 6,
                          }}
                        >
                          📍 {locations.join(', ')}
                        </span>
                      )}
                      {j.department && (
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            background: '#f1f5f9',
                            color: '#334155',
                            padding: '4px 10px',
                            borderRadius: 6,
                          }}
                        >
                          {j.department}
                        </span>
                      )}
                    </div>
                    <p style={{ color: '#64748b', fontSize: 14.5, lineHeight: 1.65, margin: '0 0 16px' }}>
                      {j.summary}
                    </p>
                    <div className="corporate-card__footer" style={{ marginTop: 'auto', paddingTop: 10 }}>
                      <span>View &amp; Apply →</span>
                    </div>
                  </a>
                )
              })}
            </div>
          )}

          <CtaBanner
            eyebrow="Join Our Network"
            title="Looking for an Articleship or Professional Role?"
            description="We are always keen to engage with exceptional Chartered Accountants, CS, Advocates, and article trainees."
            primaryLabel="Submit General Application"
            primaryHref="/contact"
          />
        </div>
      </section>
    </main>
  )
}
