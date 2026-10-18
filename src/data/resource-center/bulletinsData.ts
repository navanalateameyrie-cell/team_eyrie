export interface BulletinItem {
  id: string
  title: string
  category: 'income-tax' | 'gst' | 'rbi' | 'sebi' | 'mca' | 'fema' | 'indas' | 'labour' | 'state-tax'
  categoryLabel: string
  publishedDate: string
  effectiveDate: string
  summary: string
  sourceAuthority: string
  sourceUrl: string
  badge: string
}

export const BULLETINS_DATA: BulletinItem[] = [
  {
    id: 'it-cir-2025-01',
    title: 'CBDT Clarification on Revised Tax Slabs under Section 115BAC (New Tax Regime)',
    category: 'income-tax',
    categoryLabel: 'Income Tax',
    publishedDate: '15 Feb 2025',
    effectiveDate: '01 Apr 2025',
    summary: 'Clarification regarding enhanced standard deduction of ₹75,000 for salaried employees and revised marginal tax slab rates up to ₹24 Lakhs under default regime for FY 2025-26.',
    sourceAuthority: 'Central Board of Direct Taxes (CBDT)',
    sourceUrl: 'https://incometaxindia.gov.in',
    badge: 'CBDT Circular',
  },
  {
    id: 'gst-notif-2025-04',
    title: 'CBIC Advisory on Mandatory 2-Factor Authentication for E-Way Bill & E-Invoice Portals',
    category: 'gst',
    categoryLabel: 'GST & Indirect Tax',
    publishedDate: '10 Jan 2025',
    effectiveDate: '01 Feb 2025',
    summary: 'Mandatory 2FA implementation for all taxpayers with Aggregate Annual Turnover exceeding ₹20 Crores accessing the e-Way Bill and NIC E-Invoice portals.',
    sourceAuthority: 'Central Board of Indirect Taxes & Customs (CBIC)',
    sourceUrl: 'https://cbic.gov.in',
    badge: 'CBIC Notification',
  },
  {
    id: 'rbi-md-2025-11',
    title: 'RBI Master Direction on Digital Lending & Customer Protection Norms',
    category: 'rbi',
    categoryLabel: 'RBI & Banking',
    publishedDate: '20 Jan 2025',
    effectiveDate: '01 Apr 2025',
    summary: 'Updated guidelines for Regulated Entities (REs) regarding Key Fact Statements (KFS), APR disclosure, and cooling-off periods for retail and MSME digital credit facilities.',
    sourceAuthority: 'Reserve Bank of India (RBI)',
    sourceUrl: 'https://rbi.org.in',
    badge: 'RBI Master Direction',
  },
  {
    id: 'mca-cir-2025-02',
    title: 'MCA Extension for Annual Filing of Form LLP-11 and DIRT-3 KYC Disclosures',
    category: 'mca',
    categoryLabel: 'Companies Act & MCA',
    publishedDate: '28 Feb 2025',
    effectiveDate: 'Immediate',
    summary: 'Ministry of Corporate Affairs deployment notes on V3 portal for annual statement of solvency and director identification number KYC compliances.',
    sourceAuthority: 'Ministry of Corporate Affairs (MCA)',
    sourceUrl: 'https://mca.gov.in',
    badge: 'MCA Circular',
  },
  {
    id: 'sebi-lodr-2025-06',
    title: 'SEBI (LODR) Amendments regarding Verification of Market Rumours by Top 250 Listed Entities',
    category: 'sebi',
    categoryLabel: 'SEBI & Securities',
    publishedDate: '12 Jan 2025',
    effectiveDate: '01 Feb 2025',
    summary: 'Regulation 30(11) compliance framework requiring top listed entities to confirm, deny, or clarify material market rumours circulating in mainstream and digital media.',
    sourceAuthority: 'Securities and Exchange Board of India (SEBI)',
    sourceUrl: 'https://sebi.gov.in',
    badge: 'SEBI Regulation',
  },
  {
    id: 'fema-ap-2025-03',
    title: 'RBI FEMA Notification on Overseas Direct Investment (ODI) Reporting via Single Master Form',
    category: 'fema',
    categoryLabel: 'FEMA & Trade',
    publishedDate: '05 Feb 2025',
    effectiveDate: 'Immediate',
    summary: 'Streamlined reporting protocol on FIRMS portal for Indian entities undertaking overseas direct investments and financial commitments in foreign subsidiaries.',
    sourceAuthority: 'Foreign Exchange Management Act / RBI',
    sourceUrl: 'https://rbi.org.in',
    badge: 'FEMA Circular',
  },
  {
    id: 'indas-icai-2025-01',
    title: 'ICAI Technical Guide on Financial Instruments Impairment under Ind AS 109',
    category: 'indas',
    categoryLabel: 'Accounting Standards (Ind AS)',
    publishedDate: '18 Jan 2025',
    effectiveDate: 'FY 2024-25 onwards',
    summary: 'Guidance note on application of Expected Credit Loss (ECL) modeling, stage transition assessment, and significant increase in credit risk for corporate lenders.',
    sourceAuthority: 'Institute of Chartered Accountants of India (ICAI)',
    sourceUrl: 'https://icai.org',
    badge: 'Ind AS Guidance',
  },
  {
    id: 'labour-epf-2025-02',
    title: 'EPFO Implementation Circular on Simplified Joint Declarations for Member Profiles',
    category: 'labour',
    categoryLabel: 'Labour Laws',
    publishedDate: '22 Jan 2025',
    effectiveDate: 'Immediate',
    summary: 'SOP issued by Employees Provident Fund Organisation enabling digital verification of joint declarations for name, DoB, and marital status corrections without physical employer visits.',
    sourceAuthority: 'Ministry of Labour & Employment / EPFO',
    sourceUrl: 'https://epfindia.gov.in',
    badge: 'EPFO SOP',
  },
  {
    id: 'state-pt-2025-01',
    title: 'State Commercial Taxes Advisory on Revised Professional Tax Slabs & Return Due Dates',
    category: 'state-tax',
    categoryLabel: 'State Tax Updates',
    publishedDate: '01 Mar 2025',
    effectiveDate: '01 Apr 2025',
    summary: 'Consolidated statutory advisory covering revised monthly profession tax deduction thresholds for salaried individuals and registered establishments across major states.',
    sourceAuthority: 'State Commercial Taxes Department',
    sourceUrl: 'https://karnataka.gov.in',
    badge: 'State Tax Notice',
  },
]

