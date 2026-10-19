import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/layout/PageHero'
import RichText from '@/components/ui/RichText'
import JobApplicationForm from '@/components/forms/JobApplicationForm'
import { getConsentNotice } from '@/lib/consent'
import { isJobExpired, getClosingDateInfo } from '@/lib/jobs'

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
    depth: 2,
  })
  return docs[0] as any | undefined
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const job = await getJob(slug)
  if (!job || isJobExpired(job.closingDate)) {
    return { title: 'Position Not Found — Careers — Team Eyrie' }
  }
  return { title: `${job.title} — Careers — Team Eyrie` }
}

export default async function JobDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = await getJob(slug)
  if (!job || isJobExpired(job.closingDate)) notFound()

  const payload = await getPayload({ config })
  const notice = await getConsentNotice(payload)

  const isOpen = job.status !== 'closed'
  const locations: string[] = Array.isArray(job.location)
    ? job.location
      .map((l: any) => (typeof l === 'object' && l ? l.city : typeof l === 'string' ? l : ''))
      .filter(Boolean)
    : []
  const deadlineInfo = getClosingDateInfo(job.closingDate)
  const quals = Array.isArray(job.qualifications)
    ? job.qualifications.map((q: any) => (typeof q === 'object' ? q.name : q)).filter(Boolean)
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
                  🏷️ {job.department}
                </span>
              )}
              {(job.experienceMin != null || job.experienceMax != null) && (
                <span style={{ fontSize: 13, fontWeight: 600, background: '#f1f5f9', color: '#334155', padding: '5px 12px', borderRadius: 6 }}>
                  {[job.experienceMin, job.experienceMax].filter((x) => x != null).join('–')} yrs experience
                </span>
              )}
              {deadlineInfo && (
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    background: deadlineInfo.isUrgent ? '#fef2f2' : '#fffbeb',
                    color: deadlineInfo.isUrgent ? '#b91c1c' : '#92400e',
                    border: `1px solid ${deadlineInfo.isUrgent ? '#fecaca' : '#fde68a'}`,
                    padding: '5px 12px',
                    borderRadius: 6,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                  title={`Applications close on ${deadlineInfo.formatted}`}
                >
                  <span>{deadlineInfo.isUrgent ? '⏰' : '📅'}</span>
                  <span>Apply by {deadlineInfo.formatted}</span>
                  {deadlineInfo.urgencyText && (
                    <span style={{ opacity: 0.85, fontWeight: 600 }}>({deadlineInfo.urgencyText})</span>
                  )}
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
              {deadlineInfo && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                    color: '#64748b',
                    marginBottom: 16,
                    padding: '8px 12px',
                    borderRadius: 6,
                    background: deadlineInfo.isUrgent ? '#fef2f2' : '#f8fafc',
                    border: `1px solid ${deadlineInfo.isUrgent ? '#fecaca' : '#e2e8f0'}`,
                  }}
                >
                  <span>{deadlineInfo.isUrgent ? '⏰' : '📅'}</span>
                  <span>
                    Deadline:{' '}
                    <strong style={{ color: deadlineInfo.isUrgent ? '#b91c1c' : '#0f274a' }}>
                      {deadlineInfo.formatted}
                    </strong>
                  </span>
                  {deadlineInfo.urgencyText && (
                    <span style={{ color: '#b91c1c', fontWeight: 700, marginLeft: 'auto', fontSize: 11.5 }}>
                      {deadlineInfo.urgencyText}
                    </span>
                  )}
                </div>
              )}
              {isOpen ? (
                <div style={{ marginTop: 8 }}>
                  <JobApplicationForm
                    jobId={job.id}
                    jobTitle={job.title}
                    locations={locations}
                    qualifications={quals}
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
