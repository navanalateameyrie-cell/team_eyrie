import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/layout/PageHero'
import SectionHeader from '@/components/layout/SectionHeader'
import CtaBanner from '@/components/layout/CtaBanner'
import { getMediaUrl, getFocalPoint } from '@/lib/media'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Our People — Team Eyrie',
  description: 'Meet the professionals behind Team Eyrie’s multidisciplinary expertise.',
}

function Avatar({ photo, name }: { photo: any; name: string }) {
  const url = getMediaUrl(photo, 'card')
  const { x: focalX, y: focalY } = getFocalPoint(photo, { x: '50%', y: '22%' })

  if (url) {
    return (
      <div
        style={{
          width: '80%',
          maxWidth: 240,
          aspectRatio: '4 / 4.7',
          margin: '0 auto 16px auto',
          borderRadius: 14,
          overflow: 'hidden',
          background: '#f8fafc',
          border: '1.5px solid rgba(152, 162, 179, 0.35)',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.07)',
          position: 'relative',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={name}
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
    )
  }

  const initials = name
    .replace(/^(CA|CS|CMA|ADV|DR)\s+/i, '')
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'TE'

  return (
    <div
      style={{
        width: '80%',
        maxWidth: 240,
        aspectRatio: '4 / 4.7',
        margin: '0 auto 16px auto',
        borderRadius: 14,
        background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 42,
        fontWeight: 800,
        border: '1.5px solid rgba(242, 101, 34, 0.45)',
        boxShadow: '0 4px 16px rgba(29, 78, 216, 0.2)',
        letterSpacing: 1.5,
      }}
    >
      {initials}
    </div>
  )
}

export default async function PeoplePage() {
  const payload = await getPayload({ config })
  const [{ docs: people }, pageBannersRes] = await Promise.all([
    payload.find({
      collection: 'team-members',
      limit: 100,
      sort: 'order',
      depth: 1,
    }),
    payload.findGlobal({ slug: 'page-banners' as any, depth: 1 }).catch(() => null),
  ])

  const pBanner = (pageBannersRes as any)?.people
  const bannerTitle = pBanner?.title || 'Our People & Leadership'
  const bannerSubtitle =
    pBanner?.subtitle ||
    'A network of nearly 20 Chartered Accountants supported by Company Secretaries, Advocates, Cost Accountants, MBAs, Insolvency Professionals, and Valuation Specialists.'
  const bannerEyebrow = pBanner?.eyebrow || 'Multidisciplinary Leadership'
  const bannerImage =
    typeof pBanner?.bgImage === 'object' && pBanner?.bgImage?.url
      ? pBanner.bgImage.url
      : typeof pBanner?.bgImage === 'string'
        ? pBanner.bgImage
        : '/hero/hero-3.png'
  const bannerFocal = pBanner?.focalPosition || 'right top'

  return (
    <main>
      <PageHero
        title={bannerTitle}
        subtitle={bannerSubtitle}
        eyebrow={bannerEyebrow}
        crumbs={[{ label: 'Home', href: '/' }, { label: bannerTitle }]}
        bgImage={bannerImage}
        bgPosition={bannerFocal}
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
              {people.map((p: any) => {
                const personSlug =
                  p.slug ||
                  (p.name
                    ? p.name
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-')
                      .replace(/^-|-$/g, '')
                    : p.id)

                let bioSnippet = ''
                if (typeof p.bio === 'string') {
                  bioSnippet = p.bio
                } else if (p.bio?.root?.children) {
                  bioSnippet = p.bio.root.children
                    .map((c: any) => c.children?.map((ch: any) => ch.text || '').join('') || '')
                    .join(' ')
                }

                const MAX_DESC = 140
                const isLong = bioSnippet.length > MAX_DESC
                let shortBio = bioSnippet
                if (isLong) {
                  const cut = bioSnippet.slice(0, MAX_DESC)
                  const lastSpace = cut.lastIndexOf(' ')
                  shortBio = (lastSpace > 90 ? cut.slice(0, lastSpace) : cut).trim() + '...'
                }

                return (
                  <a
                    key={p.id}
                    href={`/people/${personSlug}`}
                    className="corporate-card corporate-card--light corporate-card--clickable"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Avatar photo={p.photo} name={p.name} />
                    <h3 style={{ fontSize: 20, color: '#0f172a', fontWeight: 800, margin: '0 0 4px' }}>
                      {p.name}
                    </h3>
                    <div style={{ color: '#1d4ed8', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
                      {p.designation}
                    </div>
                    {p.qualifications && (
                      <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500, marginBottom: 6 }}>
                        {p.qualifications}
                      </div>
                    )}
                    {shortBio && (
                      <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.55, margin: '8px 0 10px' }}>
                        {shortBio}
                        {isLong && (
                          <span style={{ color: '#f26522', fontWeight: 700, marginLeft: 6 }}>
                            Read More →
                          </span>
                        )}
                      </p>
                    )}
                    <div className="corporate-card__footer" style={{ marginTop: 'auto', paddingTop: 14 }}>
                      <span style={{ color: '#1d4ed8', fontWeight: 700 }}>View Profile →</span>
                    </div>
                  </a>
                )
              })}
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
