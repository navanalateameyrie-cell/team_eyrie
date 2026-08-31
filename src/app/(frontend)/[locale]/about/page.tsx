import React from 'react'
import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import SectionHeader from '@/components/SectionHeader'
import CorporateCard from '@/components/CorporateCard'
import CtaBanner from '@/components/CtaBanner'

export const metadata: Metadata = {
  title: 'About Us — Team Eyrie',
  description:
    'Team Eyrie is a premier multidisciplinary professional services network formed by the strategic alliance of V. Verma & Co., S S A L Associates, and R. Sridharan & Company.',
}

const allianceFirms = [
  {
    name: 'V. Verma & Co.',
    role: 'Chartered Accountants',
    description:
      'Reputed Chartered Accountancy firm bringing decades of assurance, tax litigation, and corporate structuring expertise.',
    badge: 'Senior Alliance Firm',
  },
  {
    name: 'S S A L Associates',
    role: 'Chartered Accountants',
    description:
      'Leading professional practice specializing in audit, indirect taxation, GST advisory, and risk advisory services.',
    badge: 'Founding Partner Firm',
  },
  {
    name: 'R. Sridharan & Company',
    role: 'Chartered Accountants',
    description:
      'Established firm delivering strategic financial modeling, valuation, corporate governance, and transaction advisory.',
    badge: 'Founding Partner Firm',
  },
]

const specialistTeam = [
  { role: 'Chartered Accountants', count: 'Nearly 20 Professionals' },
  { role: 'Company Secretaries (CS)', count: 'Governance Experts' },
  { role: 'Advocates & Legal Counsel', count: 'Litigation & FEMA' },
  { role: 'Cost Accountants & MBAs', count: 'Financial Modelling' },
  { role: 'Insolvency & Valuation', count: 'IBC & IBBI Specialists' },
  { role: 'Domain Advisory Experts', count: 'Cross-Border Advisory' },
]

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="About Team Eyrie"
        subtitle="India’s Integrated Professional Services Network"
        eyebrow="Strategic Alliance of Three Reputed CA Partnerships"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About Team Eyrie' }]}
        bgImage="/images/Aboutus.png"
      />

      <section className="section" style={{ padding: '48px 0', background: '#ffffff' }}>
        <div className="container">
          {/* Section 1: Strategic Alliance Foundation */}
          <SectionHeader
            eyebrow="Our Strategic Foundation"
            title="The Power of Three Reputed Firms"
            subtitle="Team Eyrie is a premier multidisciplinary professional services network established through the strategic alliance of three reputed Chartered Accountancy partnerships. By combining our legacy practices, we offer clients unparalleled depth, national reach, and end-to-end execution."
          />

          {/* 3 Partner Firms Cards */}
          <div className="grid--cards-3" style={{ marginBottom: 28 }}>
            {allianceFirms.map((f) => (
              <CorporateCard
                key={f.name}
                variant="light"
                badge={f.badge}
                title={f.name}
                subtitle={f.role}
                description={f.description}
                linkHref="/contact"
                linkLabel="Connect with Practice →"
              />
            ))}
          </div>

          {/* Multidisciplinary Team Composition */}
          <div
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)',
              borderRadius: 14,
              border: '1.5px solid #e2e8f0',
              borderLeft: '5px solid #b08d57',
              padding: '28px 24px',
              marginBottom: 28,
              boxShadow: '0 8px 28px rgba(0, 0, 0, 0.03)',
            }}
          >
            <SectionHeader
              eyebrow="Multidisciplinary Strength"
              title="Collective Intelligence of Over 20+ Domain Experts"
              subtitle="Nearly 20 Chartered Accountants working collaboratively alongside legal, governance, and financial specialists."
              theme="light"
              maxWidth={780}
            />

            <div className="grid--cards-3">
              {specialistTeam.map((t) => (
                <div
                  key={t.role}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 10,
                    padding: '16px 14px',
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <div style={{ color: '#b08d57', fontSize: 16, fontWeight: 800, marginBottom: 4, letterSpacing: 0.5 }}>
                    {t.count}
                  </div>
                  <div style={{ color: '#1f3864', fontSize: 13.5, fontWeight: 600 }}>{t.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Vision & Mission Split Cards */}
          <div className="grid--cards-2" style={{ marginBottom: 28 }}>
            <CorporateCard
              variant="partner"
              badge="Our Vision"
              title="To Be India’s Most Trusted Network"
              description="To be India’s most trusted multidisciplinary professional services network, empowering businesses with innovative solutions, technical excellence, and uncompromising integrity."
            />

            <CorporateCard
              variant="partner"
              badge="Our Mission"
              title="Delivering World-Class Services"
              description="To deliver world-class professional services by combining expertise, technology, and collaboration, enabling our clients to grow confidently in an evolving global business environment."
            />
          </div>

          {/* Reusable CtaBanner */}
          <CtaBanner
            eyebrow="Knowledge. Integrity. Innovation."
            title="Partner with Team Eyrie Today"
            description="At Team Eyrie, we believe enduring client relationships are built on trust, technical excellence, and a commitment to delivering practical solutions that create lasting value."
            primaryLabel="Partner with Team Eyrie"
            primaryHref="/contact"
            secondaryLabel="View Our Practice Areas"
            secondaryHref="/services"
          />
        </div>
      </section>
    </main>
  )
}
