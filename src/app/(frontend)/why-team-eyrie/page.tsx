import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/layout/PageHero'
import SectionHeader from '@/components/layout/SectionHeader'
import WhyEyriePillarsGrid from '@/components/sections/WhyEyriePillarsGrid'
import CtaBanner from '@/components/layout/CtaBanner'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Why Team Eyrie — Team Eyrie',
  description:
    'Discover why leading enterprises choose Team Eyrie: Collective Intelligence, National Reach, Sector Expertise, Technology-Driven Delivery, Client-Centric Philosophy, and Global Perspective.',
}

export default async function WhyTeamEyriePage() {
  let customPillars = undefined
  let bannerTitle = 'Why Team Eyrie?'
  let bannerSubtitle = 'The Multidisciplinary Professional Services Advantage'
  let bannerEyebrow = '6 Core Strategic Pillars of Excellence'
  let bannerImage = '/images/Why.png'
  let bannerFocal = 'right center'

  try {
    const payload = await getPayload({ config })
    const [home, pageBannersRes]: any = await Promise.all([
      payload.findGlobal({ slug: 'home-page' }).catch(() => null),
      payload.findGlobal({ slug: 'page-banners' as any, depth: 1 }).catch(() => null),
    ])

    const wBanner = pageBannersRes?.whyEyrie
    if (wBanner) {
      if (wBanner.title) bannerTitle = wBanner.title
      if (wBanner.subtitle) bannerSubtitle = wBanner.subtitle
      if (wBanner.eyebrow) bannerEyebrow = wBanner.eyebrow
      if (typeof wBanner.bgImage === 'object' && wBanner.bgImage?.url) {
        bannerImage = wBanner.bgImage.url
      } else if (typeof wBanner.bgImage === 'string') {
        bannerImage = wBanner.bgImage
      }
      if (wBanner.focalPosition) bannerFocal = wBanner.focalPosition
    }

    if (home?.whyEyrie?.items && Array.isArray(home.whyEyrie.items) && home.whyEyrie.items.length > 0) {
      customPillars = home.whyEyrie.items.map((it: any, idx: number) => {
        const bullets = Array.isArray(it.bullets)
          ? it.bullets.map((b: any) => (typeof b === 'string' ? b : b.text)).filter(Boolean)
          : []
        return {
          id: `pillar-${idx}`,
          num: String(idx + 1).padStart(2, '0'),
          title: it.title,
          iconName: 'consulting',
          tag: it.tag || 'Advantage',
          subtitle: it.description?.slice(0, 100) || '',
          shortSummary: it.description || '',
          fullDetails: it.description || '',
          keyStrengths: bullets.length > 0 ? bullets : ['Senior partner involvement', 'Multidisciplinary excellence', 'Technology-driven execution'],
          leadershipNote: it.linkLabel ? `Explore: ${it.linkLabel}` : undefined,
        }
      })
    }
  } catch {
    // Fall back to default pillars
  }

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

      <section className="section" style={{ padding: '48px 0', background: '#ffffff' }}>
        <div className="container">
          <SectionHeader
            eyebrow="The Eyrie Advantage"
            title="6 Reasons Organizations Choose Team Eyrie"
            subtitle="Combining legacy Chartered Accountancy principles with modern technology, senior partner involvement, and a multidisciplinary workforce."
          />

          <WhyEyriePillarsGrid pillars={customPillars} />

          <div style={{ marginTop: 40 }}>
            <CtaBanner
              eyebrow="The Team Eyrie Standard"
              title="Ready to Experience the Team Eyrie Advantage?"
              description="Connect with our senior partners to explore how our multidisciplinary network can support your corporate governance and growth."
              primaryLabel="Contact Our Network Partners"
              primaryHref="/contact"
              secondaryLabel="Explore Our Services"
              secondaryHref="/services"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
