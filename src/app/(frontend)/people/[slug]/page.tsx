import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/layout/PageHero'
import RichText from '@/components/ui/RichText'
import CtaBanner from '@/components/layout/CtaBanner'

export const dynamic = 'force-dynamic'

async function getPerson(slug: string) {
  const payload = await getPayload({ config })

  // 1. Exact slug match
  const { docs } = await payload.find({
    collection: 'team-members',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  if (docs.length > 0) return docs[0] as any | undefined

  // 2. Direct ID match if numeric
  if (!isNaN(Number(slug))) {
    try {
      const byId = await payload.findByID({
        collection: 'team-members',
        id: Number(slug),
        depth: 1,
      })
      if (byId) return byId as any
    } catch {
      // ignore
    }
  }

  // 3. Fallback: match by slugified name
  const all = await payload.find({
    collection: 'team-members',
    limit: 100,
    depth: 1,
  })
  const normalizedSearch = decodeURIComponent(slug).toLowerCase()
  const matched = all.docs.find((p: any) => {
    if (p.slug && p.slug.toLowerCase() === normalizedSearch) return true
    if (p.name) {
      const s = p.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
      if (s === normalizedSearch) return true
    }
    return false
  })
  return (matched as any) || undefined
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
  const focalX = typeof p.photo === 'object' && p.photo?.focalX != null ? `${p.photo.focalX}%` : '50%'
  const focalY = typeof p.photo === 'object' && p.photo?.focalY != null ? `${p.photo.focalY}%` : '18%'
  const expertise = Array.isArray(p.expertise) ? p.expertise.filter((e: any) => typeof e === 'object') : []
  const contact = p.contact || {}

  const initials = p.name
    ? p.name
      .replace(/^(CA|CS|CMA|ADV|DR)\s+/i, '')
      .trim()
      .split(/\s+/)
      .map((n: string) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
    : 'TE'

  return (
    <main>
      <PageHero
        title={p.name}
        subtitle={p.designation}
        eyebrow="Practice Partner Profile"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Our People', href: '/people' }, { label: p.name }]}
        bgImage="/hero/hero-3.png"
      />
      <section className="section section-mobile-compact" style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container layout-sidebar-left">
          <aside>
            {photoUrl ? (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1.05',
                  maxHeight: 380,
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: '1px solid rgba(152, 162, 179, 0.4)',
                  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
                  background: '#f8fafc',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoUrl}
                  alt={p.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: `${focalX} ${focalY}`,
                    display: 'block',
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  height: 280,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 54,
                  fontWeight: 800,
                  letterSpacing: 2,
                  boxShadow: '0 8px 24px rgba(29, 78, 216, 0.25)',
                  border: '1.5px solid rgba(242, 101, 34, 0.45)',
                }}
              >
                {initials}
              </div>
            )}

            <div
              className="corporate-card corporate-card--partner"
              style={{ marginTop: 20, padding: '28px 24px' }}
            >
              {p.qualifications && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Qualifications</div>
                  <div style={{ color: '#0f172a', fontWeight: 700, fontSize: 14.5 }}>{p.qualifications}</div>
                </div>
              )}
              {contact.email && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Email</div>
                  <a href={`mailto:${contact.email}`} style={{ color: '#1d4ed8', fontWeight: 700, fontSize: 14.5, textDecoration: 'none' }}>
                    {contact.email}
                  </a>
                </div>
              )}
              {contact.phone && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Phone</div>
                  <a href={`tel:${contact.phone}`} style={{ color: '#0f172a', fontWeight: 600, fontSize: 14.5, textDecoration: 'none' }}>
                    {contact.phone}
                  </a>
                </div>
              )}
              {contact.linkedin && (
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #98A2B3' }}>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#f26522', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                    Connect on LinkedIn →
                  </a>
                </div>
              )}
            </div>
          </aside>

          <div>
            <h2 style={{ fontSize: 'clamp(26px, 2.2vw, 34px)', color: '#0f172a', fontWeight: 800, margin: '0 0 16px' }}>
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
                <h3 style={{ fontSize: 20, color: '#0f172a', fontWeight: 800, marginBottom: 14 }}>
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
                        color: '#1d4ed8',
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
