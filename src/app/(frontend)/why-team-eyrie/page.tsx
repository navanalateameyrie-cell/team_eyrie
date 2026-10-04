import React from 'react'
import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import SectionHeader from '@/components/layout/SectionHeader'
import WhyEyriePillarsGrid from '@/components/sections/WhyEyriePillarsGrid'
import CtaBanner from '@/components/layout/CtaBanner'

export const metadata: Metadata = {
  title: 'Why Team Eyrie — Team Eyrie',
  description:
    'Discover why leading enterprises choose Team Eyrie: Collective Intelligence, National Reach, Sector Expertise, Technology-Driven Delivery, Client-Centric Philosophy, and Global Perspective.',
}

export default function WhyTeamEyriePage() {
  return (
    <main>
      <PageHero
        title="Why Team Eyrie?"
        subtitle="The Multidisciplinary Professional Services Advantage"
        eyebrow="6 Core Strategic Pillars of Excellence"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Why Team Eyrie' }]}
        bgImage="/images/Why.png"
      />

      <section className="section" style={{ padding: '48px 0', background: '#ffffff' }}>
        <div className="container">
          <SectionHeader
            eyebrow="The Eyrie Advantage"
            title="6 Reasons Organizations Choose Team Eyrie"
            subtitle="Combining legacy Chartered Accountancy principles with modern technology, senior partner involvement, and a multidisciplinary workforce."
          />

          <WhyEyriePillarsGrid />

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
