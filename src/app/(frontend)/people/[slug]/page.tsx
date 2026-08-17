import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '../../../../components/PageHero'
import RichText from '../../../../components/RichText'
import CtaBanner from '../../../../components/CtaBanner'

export const dynamic = 'force-dynamic'

async function getPerson(slug: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'team-members',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return docs[0] as any | undefined
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = await getPerson(slug)
  return { title: p ? `${p.name} — Team Eyrie` : 'Profile — Team Eyrie' }
}

export default async function PersonDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = await getPerson(slug)
  if (!p) notFound()

  const photoUrl = typeof p.photo === 'object' && p.photo?.url ? p.photo.url : null
  const expertise = Array.isArray(p.expertise) ? p.expertise.filter((e: any) => typeof e === 'object') : []
  const contact = p.contact || {}

  return (
    <main>
      <PageHero
        title={p.name}
        subtitle={p.designation}
        eyebrow="Practice Partner Profile"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Our People', href: '/people' }, { label: p.name }]}
        bgImage="/hero/hero-3.png"
      />
      <section className="section section-mobile-compact" style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container layout-sidebar-left">
          <aside>
            {photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photoUrl}
                alt={p.name}
                loading="lazy"
                style={{ width: '100%', borderRadius: 14, objectFit: 'cover', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
              />
            ) : null}

            <div
              className="corporate-card corporate-card--partner"
              style={{ marginTop: 20, padding: '28px 24px' }}
            >
              {p.qualifications && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Qualifications</div>
                  <div style={{ color: '#1f3864', fontWeight: 700, fontSize: 14.5 }}>{p.qualifications}</div>
                </div>
              )}
              {contact.email && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Email</div>
                  <a href={`mailto:${contact.email}`} style={{ color: '#b08d57', fontWeight: 700, fontSize: 14.5, textDecoration: 'none' }}>
                    {contact.email}
                  </a>
                </div>
              )}
              {contact.phone && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Phone</div>
                  <a href={`tel:${contact.phone}`} style={{ color: '#1f3864', fontWeight: 600, fontSize: 14.5, textDecoration: 'none' }}>
                    {contact.phone}
                  </a>
                </div>
              )}
              {contact.linkedin && (
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #e2e8f0' }}>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#b08d57', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                    Connect on LinkedIn →
                  </a>
                </div>
              )}
            </div>
          </aside>

          <div>
            <h2 style={{ fontSize: 'clamp(26px, 2.2vw, 34px)', color: '#1f3864', fontWeight: 800, margin: '0 0 16px' }}>
              Professional Background
            </h2>
            {p.bio ? (
              <div style={{ fontSize: 16.5, lineHeight: 1.75, color: '#334155' }}>
                <RichText data={p.bio} />
              </div>
            ) : (
              <p style={{ fontSize: 17, lineHeight: 1.7, color: '#64748b' }}>
                {p.name} is {p.designation} at Team Eyrie, contributing to the firm&apos;s multidisciplinary professional excellence.
              </p>
            )}

            {expertise.length > 0 && (
              <div style={{ marginTop: 40, paddingTop: 28, borderTop: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: 20, color: '#1f3864', fontWeight: 800, marginBottom: 14 }}>
                  Areas of Practice &amp; Expertise
                </h3>
                <div className="chips" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {expertise.map((e: any) => (
                    <a
                      key={e.id}
                      href={`/services/${e.slug}`}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        padding: '7px 14px',
                        borderRadius: 8,
                        color: '#1f3864',
                        fontWeight: 600,
                        fontSize: 14,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {e.title} →
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="container">
          <CtaBanner
            eyebrow="Consult Practice Leaders"
            title={`Schedule Consultation with ${p.name}`}
            description="Discuss your corporate advisory, tax litigation, or assurance requirements directly."
            primaryLabel="Contact Directly"
            primaryHref="/contact"
            secondaryLabel="Back to All Partners"
            secondaryHref="/people"
          />
        </div>
      </section>
    </main>
  )
}
