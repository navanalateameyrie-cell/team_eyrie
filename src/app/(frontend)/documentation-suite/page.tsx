import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/layout/PageHero'
import SectionHeader from '@/components/layout/SectionHeader'
import CtaBanner from '@/components/layout/CtaBanner'

export const metadata: Metadata = {
  title: 'Documentation Suite & Statutory Portal — Team Eyrie | Knowledge & Compliance Hub',
  description:
    'Comprehensive statutory compliance calendar, essential government portal directory (Income Tax, GST, MCA, TRACES, DGFT), ROC filing fee schedules, and regulatory documentation utilities by Team Eyrie.',
}

// ── STATUTORY DUE DATES DATA (BENCHMARK: palodandloya.com) ──
const dueDates = [
  {
    category: 'GST',
    form: 'GSTR-1',
    title: 'Monthly Return of Outward Supplies',
    period: 'Monthly (Turnover > ₹5 Cr or Non-QRMP)',
    dueDate: '11th of every month',
    authority: 'CBIC / GSTN',
    badgeColor: '#1a4b8c',
  },
  {
    category: 'GST',
    form: 'IFF (Invoice Furnishing Facility)',
    title: 'B2B Invoice Upload for QRMP Taxpayers',
    period: 'Monthly (QRMP Scheme)',
    dueDate: '13th of every month',
    authority: 'CBIC / GSTN',
    badgeColor: '#1a4b8c',
  },
  {
    category: 'GST',
    form: 'GSTR-3B',
    title: 'Monthly Summary Return & Tax Payment',
    period: 'Monthly (Regular Taxpayers)',
    dueDate: '20th of every month',
    authority: 'CBIC / GSTN',
    badgeColor: '#1a4b8c',
  },
  {
    category: 'GST',
    form: 'GSTR-3B (Quarterly)',
    title: 'Quarterly Summary Return (QRMP)',
    period: 'Quarterly (State-wise Category 1 & 2)',
    dueDate: '22nd / 24th of month following quarter',
    authority: 'CBIC / GSTN',
    badgeColor: '#1a4b8c',
  },
  {
    category: 'Income Tax',
    form: 'Challan ITNS 281',
    title: 'Deposit of Tax Deducted at Source (TDS/TCS)',
    period: 'Monthly',
    dueDate: '7th of following month (30th April for March)',
    authority: 'CBDT / Income Tax',
    badgeColor: '#0f274a',
  },
  {
    category: 'Income Tax',
    form: 'Advance Tax (4 Installments)',
    title: 'Advance Tax Payment for Corporate & Non-Corporate',
    period: 'Quarterly (15% Jun, 45% Sep, 75% Dec, 100% Mar)',
    dueDate: '15th June, 15th Sep, 15th Dec, 15th March',
    authority: 'CBDT / Income Tax',
    badgeColor: '#0f274a',
  },
  {
    category: 'Income Tax',
    form: 'Form 24Q / 26Q / 27Q',
    title: 'Quarterly TDS Statements (Salary / Non-Salary / Non-Resident)',
    period: 'Quarterly Returns',
    dueDate: '31st July, 31st Oct, 31st Jan, 31st May',
    authority: 'TRACES / Income Tax',
    badgeColor: '#0f274a',
  },
  {
    category: 'ROC & MCA',
    form: 'DIR-3 KYC / Web KYC',
    title: 'Annual KYC of Directors and Designated Partners',
    period: 'Annual Filing',
    dueDate: '30th September of every financial year',
    authority: 'Ministry of Corporate Affairs (MCA)',
    badgeColor: '#2563eb',
  },
  {
    category: 'ROC & MCA',
    form: 'AOC-4 / AOC-4 XBRL',
    title: 'Filing of Audited Financial Statements with ROC',
    period: 'Annual (Within 30 days of AGM)',
    dueDate: '29th October (or 30 days from AGM)',
    authority: 'MCA V3 / ROC',
    badgeColor: '#2563eb',
  },
  {
    category: 'ROC & MCA',
    form: 'MGT-7 / MGT-7A',
    title: 'Annual Return of Company / Small Company',
    period: 'Annual (Within 60 days of AGM)',
    dueDate: '28th November (or 60 days from AGM)',
    authority: 'MCA V3 / ROC',
    badgeColor: '#2563eb',
  },
  {
    category: 'Labour Law',
    form: 'EPF Electronic Challan (ECR)',
    title: 'Monthly Employees’ Provident Fund Contribution',
    period: 'Monthly',
    dueDate: '15th of following month',
    authority: 'EPFO (Ministry of Labour)',
    badgeColor: '#334155',
  },
  {
    category: 'Labour Law',
    form: 'ESIC Monthly Contribution',
    title: 'Employees’ State Insurance Corporation Deposit',
    period: 'Monthly',
    dueDate: '15th of following month',
    authority: 'ESIC',
    badgeColor: '#334155',
  },
]

// ── ESSENTIAL GOVERNMENT PORTALS (BENCHMARK: gkkediaandco.com/employee-zone) ──
const governmentPortals = [
  {
    name: 'Income Tax e-Filing Portal',
    url: 'https://www.incometax.gov.in',
    category: 'CBDT',
    desc: 'ITR filing, AIS/TIS inspection, e-Verification, refund status & notice responses.',
  },
  {
    name: 'GST Common Portal',
    url: 'https://www.gst.gov.in',
    category: 'CBIC',
    desc: 'GSTR returns, GST registration, payment challans, e-Way bills & ledger reconciliation.',
  },
  {
    name: 'MCA V3 Portal',
    url: 'https://www.mca.gov.in',
    category: 'Corporate Affairs',
    desc: 'Company/LLP incorporation, annual filings (AOC-4, MGT-7), DIN services & charges.',
  },
  {
    name: 'TRACES Portal (TDS CPC)',
    url: 'https://www.tdscpc.gov.in',
    category: 'TDS Management',
    desc: 'Form 16/16A generation, justification reports, correction statements & TDS credit verification.',
  },
  {
    name: 'DGFT (Directorate General of Foreign Trade)',
    url: 'https://www.dgft.gov.in',
    category: 'Cross-Border',
    desc: 'IEC generation, advance authorisations, RoDTEP/MEIS scripts, and export-import licensing.',
  },
  {
    name: 'ICEGATE (Indian Customs EDI)',
    url: 'https://www.icegate.gov.in',
    category: 'Customs & Trade',
    desc: 'Bill of Entry, Shipping Bills, Customs duty payments, and e-Sanchit document repository.',
  },
  {
    name: 'EPFO Unified Portal',
    url: 'https://unifiedportal-emp.epfindia.gov.in',
    category: 'Labour Laws',
    desc: 'Provident fund electronic challan return (ECR), employee KYC seeding, and compliance filings.',
  },
  {
    name: 'ESIC Portal',
    url: 'https://www.esic.gov.in',
    category: 'Employee Welfare',
    desc: 'Monthly contribution submission, employer registration, and medical benefit verification.',
  },
  {
    name: 'RBI FIRMS & Reporting Portal',
    url: 'https://firms.rbi.org.in',
    category: 'FEMA / RBI',
    desc: 'Single Master Form (SMF), FC-GPR, FC-TRS, and FLA return filings for foreign direct investments.',
  },
  {
    name: 'IBBI (Insolvency & Bankruptcy Board)',
    url: 'https://www.ibbi.gov.in',
    category: 'Insolvency / IBC',
    desc: 'Corporate insolvency resolution process (CIRP) orders, registered valuers & insolvency notifications.',
  },
  {
    name: 'ICAI Official Portal',
    url: 'https://www.icai.org',
    category: 'Chartered Accountants',
    desc: 'Standards of Auditing (SAs), UDIN generation, peer review guidelines, and official announcements.',
  },
  {
    name: 'Protean / NSDL TIN Portal',
    url: 'https://www.tin-nsdl.com',
    category: 'Tax Utilities',
    desc: 'PAN card application, TAN allotment, OLTAS challan verification, and e-TDS validation tools.',
  },
]

// ── UTILITY TOOLS & REFERENCE GUIDES (BENCHMARK: vnrassociates.com & grandco.in) ──
const utilities = [
  {
    title: 'ROC Filing Fee Slabs (Companies Act, 2013)',
    summary: 'Standard statutory fees based on Authorized Share Capital for Form filings:',
    items: [
      'Authorized Capital up to ₹1,00,000: ₹200 per document',
      'Authorized Capital ₹1,00,000 to ₹4,99,999: ₹300 per document',
      'Authorized Capital ₹5,00,000 to ₹24,99,999: ₹400 per document',
      'Authorized Capital ₹25,00,000 to ₹99,99,999: ₹500 per document',
      'Authorized Capital ₹1 Crore or more: ₹600 per document',
    ],
  },
  {
    title: 'TDS Rates Matrix (FY 2026-27 Quick Reference)',
    summary: 'Frequently applicable Tax Deducted at Source provisions for corporate transactions:',
    items: [
      'Sec 194C (Contractors / Sub-contractors): 1% (Ind/HUF) | 2% (Other entities)',
      'Sec 194J (Professional / Technical Fees): 2% (Technical services) | 10% (Professional fees)',
      'Sec 194I (Rent on Land & Building / Plant & Machinery): 10% (Immovable) | 2% (Plant/Machinery)',
      'Sec 194Q (Purchase of Goods over ₹50 Lakhs): 0.1% of value exceeding ₹50L',
      'Sec 194H (Commission or Brokerage): 2% (effective reduced rates)',
    ],
  },
  {
    title: 'Annual Statutory Audit & Board Checklist',
    summary: 'Mandatory documentation required for private and public companies under Indian law:',
    items: [
      'Board Report with Director’s Responsibility Statement & Secretarial Audit Report',
      'Auditors’ Report with CARO 2020 Compliance Notes & Internal Financial Controls (IFC)',
      'DIR-8 Disqualification Declarations & MBP-1 Interest in other entities',
      'Related Party Transactions (RPT) register under Section 189 & Form AOC-2',
      'Annual Performance & Financial Ratio disclosures in Financial Statements',
    ],
  },
]

export default async function DocumentationSuitePage() {
  const payload = await getPayload({ config })
  const [{ docs: regulatoryUpdates }, { docs: dbServices }] = await Promise.all([
    payload
      .find({
        collection: 'announcements',
        where: { category: { equals: 'regulatory' } },
        sort: '-publishedDate',
        limit: 3,
      })
      .catch(() => ({ docs: [] })),
    payload.find({ collection: 'services', limit: 8, sort: 'order' }).catch(() => ({ docs: [] })),
  ])

  return (
    <main>
      <PageHero
        title="Documentation Suite"
        subtitle="The Statutory Knowledge, Real-Time Compliance Calendar, and Official Regulatory Portal Directory for Corporate India"
        eyebrow="Compliance & Regulatory Intelligence"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Documentation Suite' }]}
        bgImage="/hero/hero-2.png"
      />

      <section className="section" style={{ padding: '60px 0', background: '#ffffff' }}>
        <div className="container">
          {/* ── LIVE REGULATORY CIRCULARS (DYNAMIC FROM PAYLOAD CMS) ── */}
          {regulatoryUpdates.length > 0 && (
            <div
              style={{
                background: 'linear-gradient(135deg, #f0f7ff 0%, #e0effe 100%)',
                border: '1.5px solid #bfdbfe',
                borderRadius: 14,
                padding: '24px 28px',
                marginBottom: 44,
                boxShadow: '0 4px 16px rgba(26, 75, 140, 0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ display: 'inline-flex', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#2563eb' }} />
                  <span style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: '#1a4b8c' }}>
                    Live Regulatory Alerts & Circulars
                  </span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#475569', background: '#ffffff', padding: '4px 10px', borderRadius: 20, border: '1px solid #cbd5e1' }}>
                  Managed via CMS Dashboard
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                {regulatoryUpdates.map((item: any) => (
                  <div
                    key={item.id}
                    style={{
                      background: '#ffffff',
                      borderRadius: 10,
                      padding: '16px 18px',
                      border: '1px solid #dbeafe',
                      boxShadow: '0 2px 8px rgba(15, 39, 74, 0.03)',
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#1a4b8c', textTransform: 'uppercase', marginBottom: 6 }}>
                      {item.category === 'regulatory' ? 'Statutory Update' : item.category}
                      {item.publishedDate ? ` • ${new Date(item.publishedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}` : ''}
                    </div>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: '#0f274a', marginBottom: 6, lineHeight: 1.4 }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
                      {item.excerpt}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SECTION 1: ESSENTIAL STATUTORY DUE DATES CALENDAR ── */}
          <SectionHeader
            eyebrow="Statutory Calendar"
            title="Key Compliance Due Dates Matrix"
            subtitle="Real-time statutory deadline reference across Goods & Services Tax (GST), Income Tax, TDS, MCA Corporate Law, and Payroll Regulations."
          />

          <div
            style={{
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: '0 4px 18px rgba(15, 39, 74, 0.04)',
              marginBottom: 56,
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 700 }}>
                <thead>
                  <tr style={{ background: '#0f274a', color: '#ffffff' }}>
                    <th style={{ padding: '14px 18px', fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.8 }}>Regime</th>
                    <th style={{ padding: '14px 18px', fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.8 }}>Form / Challan</th>
                    <th style={{ padding: '14px 18px', fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.8 }}>Particulars</th>
                    <th style={{ padding: '14px 18px', fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.8 }}>Applicable Period</th>
                    <th style={{ padding: '14px 18px', fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.8 }}>Statutory Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {dueDates.map((item, idx) => (
                    <tr
                      key={item.form + idx}
                      style={{
                        background: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      <td style={{ padding: '14px 18px' }}>
                        <span
                          style={{
                            fontSize: 11.5,
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: 6,
                            background: `${item.badgeColor}15`,
                            color: item.badgeColor,
                            border: `1px solid ${item.badgeColor}30`,
                            display: 'inline-block',
                          }}
                        >
                          {item.category}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0f274a', fontSize: 14 }}>
                        {item.form}
                      </td>
                      <td style={{ padding: '14px 18px', color: '#334155', fontSize: 13.5 }}>
                        {item.title}
                        <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 2 }}>{item.authority}</div>
                      </td>
                      <td style={{ padding: '14px 18px', color: '#475569', fontSize: 13 }}>
                        {item.period}
                      </td>
                      <td style={{ padding: '14px 18px', fontWeight: 700, color: '#1a4b8c', fontSize: 13.5 }}>
                        {item.dueDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ padding: '14px 20px', background: '#f1f5f9', borderTop: '1px solid #e2e8f0', fontSize: 12.5, color: '#64748b' }}>
              ℹ️ <em>Statutory dates are subject to notifications and circular extensions issued by the Ministry of Finance / MCA / CBIC / CBDT from time to time.</em>
            </div>
          </div>

          {/* ── SECTION 2: OFFICIAL GOVERNMENT PORTAL HUB (BENCHMARK: G.K. KEDIA) ── */}
          <SectionHeader
            eyebrow="Quick Portal Access"
            title="Official Regulatory &amp; Statutory Portals"
            subtitle="Single-window direct access to official government compliance systems, tax portals, and corporate regulatory repositories."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
              marginBottom: 56,
            }}
          >
            {governmentPortals.map((portal) => (
              <a
                key={portal.name}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: 12,
                  padding: '22px 20px',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 10px rgba(15, 39, 74, 0.03)',
                  transition: 'transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        background: 'rgba(26, 75, 140, 0.08)',
                        color: '#1a4b8c',
                        padding: '3px 8px',
                        borderRadius: 6,
                      }}
                    >
                      {portal.category}
                    </span>
                    <span style={{ fontSize: 14, color: '#1a4b8c' }}>↗</span>
                  </div>

                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f274a', margin: '0 0 6px' }}>
                    {portal.name}
                  </h3>

                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.55, margin: 0 }}>
                    {portal.desc}
                  </p>
                </div>

                <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px solid #f1f5f9', fontSize: 12, fontWeight: 700, color: '#1a4b8c' }}>
                  Open Official Portal ↗
                </div>
              </a>
            ))}
          </div>

          {/* ── SECTION 3: STATUTORY UTILITIES & REFERENCE GUIDES (BENCHMARK: VNR & GRANDCO) ── */}
          <SectionHeader
            eyebrow="Practice Utilities"
            title="Corporate Reference &amp; Statutory Utilities"
            subtitle="Quick-reference tables and statutory schedules compiled by Team Eyrie partners for enterprise financial controllers and CFOs."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
              marginBottom: 56,
            }}
          >
            {utilities.map((util) => (
              <div
                key={util.title}
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderTop: '4px solid #1a4b8c',
                  borderRadius: 14,
                  padding: '26px 22px',
                  boxShadow: '0 4px 14px rgba(15, 39, 74, 0.03)',
                }}
              >
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f274a', margin: '0 0 8px' }}>
                  {util.title}
                </h3>
                <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.55, margin: '0 0 16px' }}>
                  {util.summary}
                </p>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#334155', lineHeight: 1.7 }}>
                  {util.items.map((item, i) => (
                    <li key={i} style={{ marginBottom: 6 }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── SECTION 4: LMS KNOWLEDGE SUITE INTEGRATION (REQ #6 & #7) ── */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0f274a 0%, #1a4b8c 100%)',
              color: '#ffffff',
              borderRadius: 16,
              padding: '40px 32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 32,
              alignItems: 'center',
              boxShadow: '0 12px 32px rgba(15, 39, 74, 0.16)',
              marginBottom: 48,
            }}
          >
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#93c5fd', display: 'block', marginBottom: 8 }}>
                Learning &amp; Knowledge Management
              </span>
              <h3 style={{ fontSize: 'clamp(22px, 2.2vw, 28px)', fontWeight: 800, color: '#ffffff', margin: '0 0 12px' }}>
                Team Eyrie Classplus LMS Portal
              </h3>
              <p style={{ fontSize: 14.5, color: '#cbd5e1', lineHeight: 1.65, margin: 0 }}>
                Access internal technical seminars, statutory masterclasses, audit checklists, and continuing professional education (CPE) resources hosted on our enterprise Classplus platform.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <a
                href="https://web.classplusapp.com/login"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#ffffff',
                  color: '#0f274a',
                  padding: '14px 32px',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                }}
              >
                <span>Launch LMS Portal (Classplus)</span>
                <span>↗</span>
              </a>
              <div style={{ fontSize: 12, color: '#93c5fd', marginTop: 10 }}>
                Enterprise login for Team Eyrie partners, staff &amp; article trainees
              </div>
            </div>
          </div>

          {/* ── CALL TO ACTION BANNER ── */}
          <CtaBanner
            eyebrow="Compliance Assistance"
            title="Need Expert Guidance on Complex Statutory Matters?"
            description="Our senior partners and multidisciplinary practice groups are available for technical consultations across GST, Direct Tax litigation, and corporate structuring."
            primaryLabel="Schedule Partner Consultation"
            primaryHref="/contact"
            secondaryLabel="Explore Our Services"
            secondaryHref="/services"
          />
        </div>
      </section>
    </main>
  )
}

