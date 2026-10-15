import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/layout/PageHero'
import SectionHeader from '@/components/layout/SectionHeader'
import IndiaNetworkMap from '@/components/map/IndiaNetworkMap'
import CtaBanner from '@/components/layout/CtaBanner'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Our Presence — Team Eyrie',
  description:
    'Team Eyrie has offices and professional associates across 9 key commercial hubs in India: Chennai, Bengaluru, Mumbai, New Delhi, Goa, Salem, Madurai, Namakkal, and Mysuru.',
}

export default async function PresencePage() {
  let bannerTitle = 'Our PAN-India Presence'
  let bannerSubtitle = 'National Capabilities with Local Regulatory Insights Across 9 Commercial Hubs'
  let bannerEyebrow = 'Integrated National Reach'
  let bannerImage = '/hero/hero-4.png'
  let bannerFocal = 'right center'

  try {
    const payload = await getPayload({ config })
    const pageBannersRes: any = await payload.findGlobal({ slug: 'page-banners' as any, depth: 1 }).catch(() => null)
    const pBanner = pageBannersRes?.presence
    if (pBanner) {
      if (pBanner.title) bannerTitle = pBanner.title
      if (pBanner.subtitle) bannerSubtitle = pBanner.subtitle
      if (pBanner.eyebrow) bannerEyebrow = pBanner.eyebrow
      if (typeof pBanner.bgImage === 'object' && pBanner.bgImage?.url) {
        bannerImage = pBanner.bgImage.url
      } else if (typeof pBanner.bgImage === 'string') {
        bannerImage = pBanner.bgImage
      }
      if (pBanner.focalPosition) bannerFocal = pBanner.focalPosition
    }
  } catch {
    // Fall back to defaults
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
            eyebrow="National Network Hub"
            title="Interactive PAN-India Advisory Network"
            subtitle="Explore our regional network nodes connecting seamlessly to the central Team Eyrie headquarters hub. Click or hover on any location marker to view regional practice specialties."
          />

          {/* Interactive Vector India Network Map */}
          <IndiaNetworkMap />

          {/* Reusable CtaBanner */}
          <CtaBanner
            eyebrow="Local Presence • National Strength"
            title="Connect with Your Regional Eyrie Office"
            description="Our senior partners are ready to assist you at any of our 9 commercial hubs across India with tailored corporate solutions."
            primaryLabel="Contact Regional Office"
            primaryHref="/contact"
            secondaryLabel="Explore Our Services"
            secondaryHref="/services"
          />
        </div>
      </section>
    </main>
  )
}
