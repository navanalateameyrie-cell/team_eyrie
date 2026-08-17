import React from 'react'
import type { Metadata } from 'next'
import PageHero from '../../../components/PageHero'
import SectionHeader from '../../../components/SectionHeader'
import CorporateCard from '../../../components/CorporateCard'
import CtaBanner from '../../../components/CtaBanner'

export const metadata: Metadata = {
  title: 'Vision & Mission — Team Eyrie',
  description:
    'The foundational vision, core mission, and guiding values that drive Team Eyrie’s multidisciplinary professional services network.',
}

export default function VisionMissionPage() {
  return (
    <main>
      <PageHero
        title="Vision, Mission & Values"
        subtitle="The Guiding Principles Defining Team Eyrie’s High-Trust Professional Standard"
        eyebrow="Our Guiding North Star"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Vision & Mission' }]}
        bgImage="/images/about.png"
      />

      <section className="section section-mobile-compact" style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Foundational Purpose"
            title="Empowering Enterprises Through Excellence & Integrity"
            subtitle="Built on the bedrock of three esteemed Chartered Accountancy partnerships, our guiding principles ensure unwavering trust and measurable value for every client."
          />

          <div className="grid--cards-2" style={{ marginBottom: 56 }}>
            <CorporateCard
              variant="light"
              badge="Our Vision"
              title="To Be India’s Most Trusted Network"
              description="To be India’s most trusted multidisciplinary professional services network, empowering businesses with innovative solutions, technical excellence, and uncompromising integrity."
            />

            <CorporateCard
              variant="light"
              badge="Our Mission"
              title="Delivering World-Class Services"
              description="To deliver world-class professional services by combining expertise, technology, and collaboration, enabling our clients to grow confidently in an evolving global business environment."
            />
          </div>

          {/* Guiding Core Values */}
          <div
            className="box-mobile-compact"
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)',
              borderRadius: 18,
              border: '1.5px solid #e2e8f0',
              borderLeft: '5px solid #b08d57',
              padding: '52px 40px',
              marginBottom: 56,
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.04)',
            }}
          >
            <SectionHeader
              eyebrow="Core Guiding Values"
              title="The Pillars of the Eyrie Code"
              subtitle="Three uncompromising principles that shape our work culture, client advisory, and statutory commitments."
              theme="light"
            />

            <div className="grid--cards-3">
              <CorporateCard
                variant="light"
                badge="01"
                title="Knowledge & Technical Depth"
                description="Relentless commitment to continuous technical mastery across complex tax jurisprudence, audit standards, and regulatory frameworks."
              />
              <CorporateCard
                variant="light"
                badge="02"
                title="Uncompromising Integrity"
                description="Absolute independence, complete transparency, and highest ethical standards that safeguard client trust and regulatory compliance."
              />
              <CorporateCard
                variant="light"
                badge="03"
                title="Technology & Innovation"
                description="Leveraging digital workflows, secure collaboration platforms, and AI-assisted data analytics to deliver rapid, accurate solutions."
              />
            </div>
          </div>

          <CtaBanner
            eyebrow="Together We Rise. Together We Excel."
            title="Trusted Advice. Practical Solutions. Sustainable Growth."
            description="Experience multidisciplinary professional services engineered for India's leading enterprises and growing businesses."
            primaryLabel="Partner with Team Eyrie"
            primaryHref="/contact"
            secondaryLabel="Why Choose Us"
            secondaryHref="/why-team-eyrie"
          />
        </div>
      </section>
    </main>
  )
}
