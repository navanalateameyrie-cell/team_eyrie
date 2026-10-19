import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/layout/PageHero'
import SectionHeader from '@/components/layout/SectionHeader'
import CtaBanner from '@/components/layout/CtaBanner'
import InsightsView from '@/components/insights/InsightsView'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'News and Articles — Team Eyrie',
  description: 'News, articles, thought leadership, circulars, and regulatory updates from Team Eyrie.',
}

export default async function InsightsPage() {
  const payload = await getPayload({ config })
  const [{ docs: posts }, pageBannersRes] = await Promise.all([
    payload.find({
      collection: 'announcements',
      where: { status: { equals: 'published' } },
      limit: 50,
      sort: '-publishedDate',
      depth: 2,
    }),
    payload.findGlobal({ slug: 'page-banners' as any, depth: 1 }).catch(() => null as any),
  ])

  const iBanner = pageBannersRes?.insights
  const bannerTitle = iBanner?.title || 'News and Articles'
  const bannerSubtitle =
    iBanner?.subtitle ||
    'Thought leadership, official circulars, news bulletins, and regulatory jurisprudence from across our practice areas.'
  const bannerEyebrow = iBanner?.eyebrow || 'Publications & Circulars'
  const bannerImage =
    typeof iBanner?.bgImage === 'object' && iBanner?.bgImage?.url
      ? iBanner.bgImage.url
      : typeof iBanner?.bgImage === 'string'
        ? iBanner.bgImage
        : '/hero/hero-2.png'
  const bannerFocal = iBanner?.focalPosition || 'right center'

  return (
    <main>
      <PageHero
        title={bannerTitle}
        subtitle={bannerSubtitle}
        eyebrow={bannerEyebrow}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'News and Articles' }]}
        bgImage={bannerImage}
        bgPosition={bannerFocal}
      />

      <section className="section section-mobile-compact" style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Publications & Circulars"
            title="News, Bulletins & Thought Leadership"
            subtitle="Browse official circulars with direct PDF download & read options, or read in-depth analysis on direct tax amendments, GST circulars, and corporate jurisprudence."
          />

          <InsightsView items={posts as any} />

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
