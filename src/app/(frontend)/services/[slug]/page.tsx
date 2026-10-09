import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/layout/PageHero'
import RichText from '@/components/ui/RichText'
import CorporateCard from '@/components/ui/CorporateCard'
import CtaBanner from '@/components/layout/CtaBanner'

export const dynamic = 'force-dynamic'

async function getService(slug: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return docs[0] as any
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return { title: 'Service — Team Eyrie' }
  return {
    title: `${service.seo?.metaTitle || service.title} — Team Eyrie`,
    description: service.seo?.metaDescription || service.summary,
  }
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) notFound()

  const industries = Array.isArray(service.relatedIndustries)
    ? service.relatedIndustries.filter((i: any) => typeof i === 'object')
    : []

  return (
    <main>
      <PageHero
        title={service.title}
        subtitle={service.summary}
        eyebrow="Specialized Practice Area"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: service.title }]}
        bgImage="/images/services.png"
      />
      <section className="section section-mobile-compact" style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container layout-sidebar-right--narrow">
          <div>
            {service.body ? (
              <div style={{ fontSize: 16.5, lineHeight: 1.75, color: '#334155' }}>
                <RichText data={service.body} />
              </div>
            ) : (
              <p style={{ fontSize: 18, lineHeight: 1.75, color: '#475569' }}>{service.summary}</p>
            )}

            {Array.isArray(service.subServices) && service.subServices.length > 0 && (
              <>
                <h2 style={{ fontSize: 26, color: '#0f172a', fontWeight: 800, marginTop: 44, marginBottom: 20 }}>
                  What We Deliver
                </h2>
                <div className="grid--cards-2">
                  {service.subServices.map((ss: any, i: number) => (
                    <CorporateCard
                      key={i}
                      variant="partner"
                      title={ss.name}
                      description={ss.description}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <aside>
            <div
              className="corporate-card corporate-card--partner"
              style={{
                position: 'sticky',
                top: 100,
                padding: '36px 30px',
              }}
            >
              <h3 style={{ fontSize: 20, color: '#0f172a', fontWeight: 800, margin: '0 0 10px' }}>
                Consult Our Practice Leaders
              </h3>
              <p style={{ color: '#64748b', fontSize: 14.5, lineHeight: 1.6, marginBottom: 22 }}>
                Get tailored guidance on {service.title.toLowerCase()} from our senior Chartered Accountants.
              </p>
              <a href="/contact" className="hero-btn hero-btn--gold" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
                Schedule Consultation
              </a>

              {industries.length > 0 && (
                <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid #98A2B3' }}>
                  <h4 style={{ fontSize: 12.5, textTransform: 'uppercase', letterSpacing: 1, color: '#123B6D', fontWeight: 700, margin: '0 0 12px' }}>
                    Related Sectors
                  </h4>
                  <div className="chips" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {industries.map((ind: any) => (
                      <span
                        key={ind.id}
                        style={{
                          fontSize: 12.5,
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          padding: '5px 10px',
                          borderRadius: 6,
                          color: '#334155',
                          fontWeight: 600,
                        }}
                      >
                        {ind.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        <div className="container">
          <CtaBanner
            eyebrow="Specialized Practice Solutions"
            title={`Looking for Expert Assistance in ${service.title}?`}
            description="Our partner team brings decades of combined expertise and national reach to solve your complex regulatory challenges."
            primaryLabel="Contact Practice Lead"
            primaryHref="/contact"
            secondaryLabel="View All Services"
            secondaryHref="/services"
          />
        </div>
      </section>
    </main>
  )
}
