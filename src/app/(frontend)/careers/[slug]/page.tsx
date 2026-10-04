import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/layout/PageHero'
import RichText from '@/components/ui/RichText'
import JobApplicationForm from '@/components/forms/JobApplicationForm'
import { getConsentNotice } from '@/lib/consent'

export const dynamic = 'force-dynamic'

const TYPE_LABEL: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  internship: 'Internship / Articleship',
}

async function getJob(slug: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'jobs',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return docs[0] as any | undefined
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const job = await getJob(slug)
  return { title: job ? `${job.title} — Careers — Team Eyrie` : 'Careers — Team Eyrie' }
}

export default async function JobDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = await getJob(slug)
  if (!job) notFound()

  const payload = await getPayload({ config })
  const notice = await getConsentNotice(payload)

  const isOpen = job.status === 'open'
  const locations = Array.isArray(job.location)
    ? job.location.filter((l: any) => typeof l === 'object').map((l: any) => l.city)
    : []

  return (
    <main>
      <PageHero
        title={job.title}
        subtitle={job.summary}
        eyebrow="Career Opportunity"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Careers', href: '/careers' }, { label: job.title }]}
        bgImage="/hero/hero-1.png"
      />
      <section className="section section-mobile-compact" style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container layout-sidebar-right">
          <div>
            <div className="chips" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              <span style={{ fontSize: 13, fontWeight: 700, background: 'rgba(26, 75, 140, 0.08)', color: '#1a4b8c', padding: '5px 12px', borderRadius: 6 }}>
                {TYPE_LABEL[job.employmentType] || job.employmentType}
              </span>
              {locations.length > 0 && (
                <span style={{ fontSize: 13, fontWeight: 600, background: '#f1f5f9', color: '#334155', padding: '5px 12px', borderRadius: 6 }}>
                  📍 {locations.join(', ')}
                </span>
              )}
              {job.department && (
                <span style={{ fontSize: 13, fontWeight: 600, background: '#f1f5f9', color: '#334155', padding: '5px 12px', borderRadius: 6 }}>
                  {job.department}
                </span>
              )}
              {(job.experienceMin != null || job.experienceMax != null) && (
                <span style={{ fontSize: 13, fontWeight: 600, background: '#f1f5f9', color: '#334155', padding: '5px 12px', borderRadius: 6 }}>
                  {[job.experienceMin, job.experienceMax].filter((x) => x != null).join('–')} yrs experience
                </span>
              )}
            </div>

            {job.description && (
              <div style={{ fontSize: 16.5, lineHeight: 1.75, color: '#334155' }}>
                <RichText data={job.description} />
              </div>
            )}

            {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
              <div style={{ marginTop: 36 }}>
                <h3 style={{ fontSize: 22, color: '#0f274a', fontWeight: 800, marginBottom: 14 }}>Key Responsibilities</h3>
                <ul style={{ paddingLeft: 20, color: '#475569', fontSize: 15.5, lineHeight: 1.8 }}>
                  {job.responsibilities.map((r: any, i: number) => (
                    <li key={i}>{r.item}</li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(job.requirements) && job.requirements.length > 0 && (
              <div style={{ marginTop: 28 }}>
                <h3 style={{ fontSize: 22, color: '#0f274a', fontWeight: 800, marginBottom: 14 }}>Requirements &amp; Qualifications</h3>
                <ul style={{ paddingLeft: 20, color: '#475569', fontSize: 15.5, lineHeight: 1.8 }}>
                  {job.requirements.map((r: any, i: number) => (
                    <li key={i}>{r.item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside>
            <div
              className="corporate-card corporate-card--partner"
              style={{
                position: 'sticky',
                top: 100,
                padding: '36px 30px',
                borderTop: '4px solid #1a4b8c',
              }}
            >
              <h3 style={{ fontSize: 20, color: '#0f274a', fontWeight: 800, margin: '0 0 12px' }}>
                Apply for this Position
              </h3>
              {isOpen ? (
                <div style={{ marginTop: 8 }}>
                  <JobApplicationForm
                    jobId={job.id}
                    jobTitle={job.title}
                    consent={{
                      label: notice.checkboxLabel,
                      reassurance: notice.reassuranceLine,
                      grievanceContact: notice.grievanceContact,
                    }}
                  />
                </div>
              ) : (
                <p style={{ color: '#64748b', fontSize: 15 }}>
                  This position is no longer accepting applications. Please check our other openings.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
