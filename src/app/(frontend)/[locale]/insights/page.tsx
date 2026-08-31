import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/PageHero'
import SectionHeader from '@/components/SectionHeader'
import CtaBanner from '@/components/CtaBanner'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Insights — Team Eyrie',
  description: 'News, articles, thought leadership and regulatory updates from Team Eyrie.',
}

const CAT_LABEL: Record<string, string> = {
  news: 'News',
  insight: 'Insight',
  regulatory: 'Regulatory Update',
  event: 'Event',
}

export default async function InsightsPage() {
  const payload = await getPayload({ config })
  const { docs: posts } = await payload.find({
    collection: 'announcements',
    where: { status: { equals: 'published' } },
    limit: 50,
    sort: '-publishedDate',
    depth: 1,
  })

  return (
    <main>
      <PageHero
        title="Knowledge & Insights"
        subtitle="Thought leadership, tax updates, and regulatory jurisprudence from across our practice areas."
        eyebrow="Expert Commentary & Analysis"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Insights' }]}
        bgImage="/hero/hero-2.png"
      />

      <section className="section section-mobile-compact" style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Publications"
            title="Latest Regulatory Updates & Thought Leadership"
            subtitle="Stay informed on crucial direct tax amendments, GST circulars, SEBI compliances, and corporate jurisprudence."
          />

          {posts.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 24px',
                background: '#f8fafc',
                borderRadius: 16,
                border: '1px solid #e2e8f0',
              }}
            >
              <p style={{ fontSize: 17, color: '#64748b', margin: 0 }}>
                Articles, technical bulletins, and regulatory updates will be published here soon.
              </p>
            </div>
          ) : (
            <div className="grid--cards-3">
              {posts.map((p: any) => {
                const img = typeof p.coverImage === 'object' && p.coverImage?.url ? p.coverImage.url : null
                return (
                  <a
                    key={p.id}
                    href={`/insights/${p.slug}`}
                    className="corporate-card corporate-card--light corporate-card--clickable"
                    style={{ padding: 0, overflow: 'hidden', textDecoration: 'none', color: 'inherit' }}
                  >
                    {img && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img}
                        alt={p.title}
                        loading="lazy"
                        style={{ width: '100%', height: 180, objectFit: 'cover' }}
                      />
                    )}
                    <div style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      {p.category && (
                        <span
                          style={{
                            color: '#b08d57',
                            fontWeight: 700,
                            fontSize: 12,
                            textTransform: 'uppercase',
                            letterSpacing: 1.2,
                            marginBottom: 8,
                          }}
                        >
                          {CAT_LABEL[p.category] || p.category}
                        </span>
                      )}
                      <h3 style={{ fontSize: 19, color: '#1f3864', fontWeight: 800, margin: '0 0 8px', lineHeight: 1.35 }}>
                        {p.title}
                      </h3>
                      {p.excerpt && (
                        <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: '0 0 14px' }}>
                          {p.excerpt}
                        </p>
                      )}
                      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
                        {p.publishedDate && (
                          <span style={{ fontSize: 12.5, color: '#94a3b8', fontWeight: 500 }}>
                            {new Date(p.publishedDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        )}
                        <span style={{ fontSize: 13.5, color: '#b08d57', fontWeight: 700 }}>
                          Read Article →
                        </span>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          )}

          <CtaBanner
            eyebrow="Custom Regulatory Briefings"
            title="Need Specific Advisory on Recent Tax Reforms?"
            description="Our practice partners regularly provide customized regulatory impact assessments for corporate leadership teams."
            primaryLabel="Request Briefing"
            primaryHref="/contact"
          />
        </div>
      </section>
    </main>
  )
}
