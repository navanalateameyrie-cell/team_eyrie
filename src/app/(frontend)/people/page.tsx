import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '../../../components/PageHero'
import SectionHeader from '../../../components/SectionHeader'
import CtaBanner from '../../../components/CtaBanner'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Our People — Team Eyrie',
  description: 'Meet the professionals behind Team Eyrie’s multidisciplinary expertise.',
}

function Avatar({ photo, name }: { photo: any; name: string }) {
  const url = typeof photo === 'object' && photo?.url ? photo.url : null
  if (url) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={url}
        alt={name}
        loading="lazy"
        style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 10, marginBottom: 14 }}
      />
    )
  }
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('')
  return (
    <div
      style={{
        width: '100%',
        height: 240,
        borderRadius: 10,
        background: 'linear-gradient(135deg, #1f3864 0%, #16294a 100%)',
        color: '#d8c19a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 44,
        fontWeight: 800,
        marginBottom: 14,
        border: '1px solid rgba(216, 193, 154, 0.3)',
      }}
    >
      {initials}
    </div>
  )
}

export default async function PeoplePage() {
  const payload = await getPayload({ config })
  const { docs: people } = await payload.find({
    collection: 'team-members',
    limit: 100,
    sort: 'order',
    depth: 1,
  })

  return (
    <main>
      <PageHero
        title="Our People & Leadership"
        subtitle="A network of nearly 20 Chartered Accountants supported by Company Secretaries, Advocates, Cost Accountants, MBAs, Insolvency Professionals, and Valuation Specialists."
        eyebrow="Multidisciplinary Leadership"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Our People' }]}
        bgImage="/hero/hero-3.png"
      />

      <section className="section section-mobile-compact" style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Partner Leadership"
            title="Senior Professionals Guiding Your Business"
            subtitle="Direct partner involvement ensures unmatched technical precision, strategic clarity, and dependable compliance execution."
          />

          {people.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: '#f8fafc',
                borderRadius: 16,
                border: '1px solid #e2e8f0',
              }}
            >
              <p style={{ fontSize: 17, color: '#64748b', margin: 0 }}>
                Professional partner and specialist profiles will be published here soon.
              </p>
            </div>
          ) : (
            <div className="grid--cards-3">
              {people.map((p: any) => (
                <a
                  key={p.id}
                  href={`/people/${p.slug}`}
                  className="corporate-card corporate-card--light corporate-card--clickable"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Avatar photo={p.photo} name={p.name} />
                  <h3 style={{ fontSize: 20, color: '#1f3864', fontWeight: 800, margin: '0 0 4px' }}>
                    {p.name}
                  </h3>
                  <div style={{ color: '#b08d57', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
                    {p.designation}
                  </div>
                  {p.qualifications && (
                    <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>
                      {p.qualifications}
                    </div>
                  )}
                  <div className="corporate-card__footer" style={{ marginTop: 'auto', paddingTop: 14 }}>
                    <span>View Profile →</span>
                  </div>
                </a>
              ))}
            </div>
          )}

          <CtaBanner
            eyebrow="Direct Partner Access"
            title="Consult with Senior Practice Leaders"
            description="Discuss your corporate audit, tax litigation, or transaction structuring directly with our partners."
            primaryLabel="Schedule Consultation"
            primaryHref="/contact"
          />
        </div>
      </section>
    </main>
  )
}
