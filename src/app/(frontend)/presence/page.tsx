import React from 'react'
import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import SectionHeader from '@/components/layout/SectionHeader'
import IndiaNetworkMap from '@/components/map/IndiaNetworkMap'
import CtaBanner from '@/components/layout/CtaBanner'

export const metadata: Metadata = {
  title: 'Our Presence — Team Eyrie',
  description:
    'Team Eyrie has offices and professional associates across 9 key commercial hubs in India: Chennai, Bengaluru, Mumbai, New Delhi, Goa, Salem, Madurai, Namakkal, and Mysuru.',
}

export default function PresencePage() {
  return (
    <main>
      <PageHero
        title="Our PAN-India Presence"
        subtitle="National Capabilities with Local Regulatory Insights Across 9 Commercial Hubs"
        eyebrow="Integrated National Reach"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Our Presence' }]}
        bgImage="/hero/hero-4.png"
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
