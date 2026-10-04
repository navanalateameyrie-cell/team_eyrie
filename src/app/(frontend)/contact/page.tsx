import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/layout/PageHero'
import ContactForm from '@/components/forms/ContactForm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Contact Us — Team Eyrie',
  description: 'Get in touch with Team Eyrie for trusted, practical professional advice.',
}

export default async function ContactPage() {
  const payload = await getPayload({ config })
  const [{ docs: services }, { docs: offices }, settings] = await Promise.all([
    payload.find({ collection: 'services', limit: 50, sort: 'order', depth: 0 }),
    payload.find({ collection: 'offices', limit: 50, sort: 'order', depth: 0 }),
    payload.findGlobal({ slug: 'site-settings', depth: 0 }).catch(() => null as any),
  ])

  const contact = settings?.contact || {}

  return (
    <main>
      <PageHero
        title="Contact Us"
        subtitle="Trusted Advice. Practical Solutions. Sustainable Growth. Tell us how we can assist your business."
        eyebrow="Connect with Senior Practice Partners"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
        bgImage="/hero/hero-2.png"
      />

      <section className="section" style={{ padding: '48px 0', background: '#ffffff' }}>
        <div className="container layout-contact-grid">
          <div>
            <div style={{ marginBottom: 20 }}>
              <span style={{ color: '#1a4b8c', fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a4b8c', boxShadow: '0 0 6px rgba(26, 75, 140, 0.6)' }} />
                Get In Touch
              </span>
              <h2 style={{ fontSize: 'clamp(24px, 2.2vw, 32px)', color: '#0f274a', fontWeight: 800, margin: '0 0 8px' }}>
                Send Us an Enquiry
              </h2>
              <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.55, margin: 0 }}>
                Select your preferred office and practice area below. Our designated senior partner will respond promptly to schedule an introductory consultation.
              </p>
            </div>

            <ContactForm
              services={services.map((s: any) => ({ id: s.id, label: s.title }))}
              offices={offices.map((o: any) => ({ id: o.id, label: o.city }))}
            />
          </div>

          <aside>
            <div
              className="corporate-card corporate-card--partner"
              style={{
                padding: '24px 22px',
                borderTop: '4px solid #1a4b8c',
              }}
            >
              <h3 style={{ fontSize: 20, color: '#0f274a', fontWeight: 700, margin: '0 0 14px' }}>Direct Communication</h3>

              {contact.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 8, background: 'rgba(26, 75, 140, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    📞
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Phone</div>
                    <a href={`tel:${contact.phone}`} style={{ color: '#0f274a', fontWeight: 700, fontSize: 15.5, textDecoration: 'none' }}>
                      {contact.phone}
                    </a>
                  </div>
                </div>
              )}

              {contact.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 8, background: 'rgba(26, 75, 140, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ✉️
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Email</div>
                    <a href={`mailto:${contact.email}`} style={{ color: '#0f274a', fontWeight: 700, fontSize: 15.5, textDecoration: 'none' }}>
                      {contact.email}
                    </a>
                  </div>
                </div>
              )}

              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />

              <p style={{ margin: '0 0 12px', color: '#64748b', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                Network Presence Across India:
              </p>

              <div className="chips" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {offices.map((o: any) => (
                  <span
                    key={o.id}
                    style={{
                      fontSize: 13,
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      padding: '6px 12px',
                      borderRadius: 8,
                      color: '#1e293b',
                      fontWeight: 600,
                    }}
                  >
                    📍 {o.city}
                  </span>
                ))}
              </div>

              <a
                href="/presence"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  marginTop: 24,
                  fontWeight: 700,
                  color: '#1a4b8c',
                  fontSize: 14.5,
                  textDecoration: 'none',
                }}
              >
                <span>Explore interactive network map</span>
                <span>→</span>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
