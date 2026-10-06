import type { Payload } from 'payload'

export const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@teameyrie.local'
export const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'Admin@12345'

const services: { title: string; summary: string; subServices: string[] }[] = [
  {
    title: 'Assurance & Audit',
    summary: 'Independent assurance and audit services that strengthen confidence in financial reporting and internal controls.',
    subServices: ['Statutory Audit', 'Internal Audit', 'Bank Audit', 'Concurrent Audit', 'Tax Audit', 'Due Diligence', 'Risk Advisory', 'Internal Financial Controls (IFC)', 'Forensic Reviews'],
  },
  {
    title: 'Tax Advisory',
    summary: 'End-to-end direct tax advisory, litigation and international tax structuring for individuals and enterprises.',
    subServices: ['Direct Tax', 'Income Tax Litigation', 'International Taxation', 'Transfer Pricing', 'Expatriate Taxation', 'Tax Structuring', 'FEMA Advisory'],
  },
  {
    title: 'GST & Indirect Taxes',
    summary: 'Comprehensive GST, customs and foreign trade advisory, compliance and litigation support.',
    subServices: ['GST Advisory', 'GST Compliance', 'GST Litigation', 'Customs', 'Foreign Trade Policy Advisory'],
  },
  {
    title: 'Corporate & Regulatory Advisory',
    summary: 'Company law, secretarial and regulatory compliance across the RBI, FEMA, SEBI and ROC frameworks.',
    subServices: ['Company Law', 'LLP Advisory', 'Secretarial Compliance', 'Corporate Governance', 'RBI & FEMA Compliance', 'SEBI Advisory', 'ROC Compliance'],
  },
  {
    title: 'Business Consulting',
    summary: 'Strategy, structuring and virtual CFO services that drive performance and sustainable growth.',
    subServices: ['Business Structuring', 'Financial Modelling', 'Business Process Improvement', 'Virtual CFO Services', 'Performance Management', 'Strategic Planning'],
  },
  {
    title: 'Transaction Advisory',
    summary: 'Fund raising, M&A, private equity and restructuring advisory across the transaction lifecycle.',
    subServices: ['Start-up Advisory', 'Venture Capital Advisory', 'Private Equity Advisory', 'Investor Due Diligence', 'Fund Raising', 'Mergers & Acquisitions', 'Corporate Restructuring'],
  },
  {
    title: 'Family Business Advisory',
    summary: 'Succession, governance and wealth preservation for family-owned enterprises across generations.',
    subServices: ['Family Constitution', 'Family Settlement', 'Succession Planning', 'Estate Planning', 'Governance Framework', 'Wealth Preservation'],
  },
  {
    title: 'Global Business Services',
    summary: 'Cross-border structuring, overseas investment and NRI taxation for global expansion.',
    subServices: ['Cross-Border Transactions', 'International Business Structuring', 'Overseas Investment Advisory', 'NRI Taxation', 'Global Expansion Support'],
  },
]

const industries = [
  'Manufacturing', 'Banking & Financial Services', 'NBFCs', 'Information Technology', 'Healthcare',
  'Infrastructure', 'Real Estate', 'Hospitality', 'Retail', 'E-Commerce', 'Logistics',
  'Renewable Energy', 'Education', 'Start-ups', 'MSMEs', 'Family-Owned Businesses',
  'Trusts & Non-Profit Organisations',
]

const offices: {
  city: string
  isHeadOffice?: boolean
  addressLine1?: string
  addressLine2?: string
  state?: string
  pincode?: string
  phone?: string
  email?: string
}[] = [
    {
      city: 'Chennai',
      isHeadOffice: true,
      addressLine1: 'No. 14, Cathedral Road, Gopalapuram',
      addressLine2: 'Near US Consulate',
      state: 'Tamil Nadu',
      pincode: '600086',
      phone: '+91 44 2811 0000',
      email: 'chennai@teameyrie.in',
    },
    {
      city: 'Bengaluru',
      addressLine1: 'Prestige Meridian, 8th Floor, M.G. Road',
      addressLine2: 'Shivajinagar',
      state: 'Karnataka',
      pincode: '560001',
      phone: '+91 80 4123 0000',
      email: 'bengaluru@teameyrie.in',
    },
    {
      city: 'Mumbai',
      addressLine1: 'Maker Chambers V, Nariman Point',
      addressLine2: 'Financial District',
      state: 'Maharashtra',
      pincode: '400021',
      phone: '+91 22 6600 0000',
      email: 'mumbai@teameyrie.in',
    },
    {
      city: 'Delhi (NCR)',
      addressLine1: 'Barakhamba Road, Connaught Place',
      addressLine2: 'Central Business District',
      state: 'New Delhi',
      pincode: '110001',
      phone: '+91 11 2341 0000',
      email: 'delhi@teameyrie.in',
    },
    {
      city: 'Hyderabad',
      addressLine1: 'Road No. 36, Jubilee Hills',
      addressLine2: 'Near Metro Station',
      state: 'Telangana',
      pincode: '500033',
      phone: '+91 40 4010 0000',
      email: 'hyderabad@teameyrie.in',
    },
    {
      city: 'Kochi',
      addressLine1: 'Panampilly Nagar Main Avenue',
      addressLine2: 'Near South Overbridge',
      state: 'Kerala',
      pincode: '682036',
      phone: '+91 484 231 0000',
      email: 'kochi@teameyrie.in',
    },
    {
      city: 'Pune',
      addressLine1: 'Senapati Bapat Road, Shivajinagar',
      addressLine2: 'Opposite ICC Trade Tower',
      state: 'Maharashtra',
      pincode: '411016',
      phone: '+91 20 2567 0000',
      email: 'pune@teameyrie.in',
    },
    { city: 'Goa', state: 'Goa', email: 'goa@teameyrie.in' },
    { city: 'Salem', state: 'Tamil Nadu', email: 'salem@teameyrie.in' },
    { city: 'Madurai', state: 'Tamil Nadu', email: 'madurai@teameyrie.in' },
    { city: 'Namakkal', state: 'Tamil Nadu', email: 'namakkal@teameyrie.in' },
    { city: 'Mysuru', state: 'Karnataka', email: 'mysuru@teameyrie.in' },
  ]

export const sampleTeamMembersData = [
  {
    name: 'CA V. Venkatesh',
    slug: 'ca-v-venkatesh',
    designation: 'Senior Partner — Direct Taxation & Restructuring',
    qualifications: 'B.Com, FCA, DISA (ICAI)',
    order: 1,
    featured: true,
    contact: {
      email: 'v.venkatesh@teameyrie.in',
      phone: '+91 86182 59712',
      linkedin: 'https://linkedin.com',
    },
    serviceTitle: 'Tax Advisory',
    officeCity: 'Bengaluru',
    bioText:
      'Senior Partner with over 28 years of distinguished standing in corporate taxation, high-stakes tax litigation, transfer pricing, and cross-border restructuring. Managing Partner at V V & Associates.',
  },
  {
    name: 'CA S. Shankaranarayanan',
    slug: 'ca-s-shankaranarayanan',
    designation: 'Senior Partner — Corporate Assurance & Governance',
    qualifications: 'B.Sc, FCA',
    order: 2,
    featured: true,
    contact: {
      email: 's.shankar@teameyrie.in',
      phone: '+91 86182 59712',
      linkedin: 'https://linkedin.com',
    },
    serviceTitle: 'Assurance & Audit',
    officeCity: 'Chennai',
    bioText:
      'Senior Partner specializing in statutory audit, internal financial controls (IFC), bank assurance, and board-level corporate governance for over 25 years. Managing Partner at Shankaranarayanan & Co.',
  },
  {
    name: 'CA R. Srinivas',
    slug: 'ca-r-srinivas',
    designation: 'Senior Partner — Indirect Tax & GST Litigation',
    qualifications: 'B.Com, FCA',
    order: 3,
    featured: true,
    contact: {
      email: 'r.srinivas@teameyrie.in',
      phone: '+91 86182 59712',
      linkedin: 'https://linkedin.com',
    },
    serviceTitle: 'GST & Indirect Taxes',
    officeCity: 'Mumbai',
    bioText:
      'Senior Partner spearheading GST advisory, indirect tax dispute resolution, customs, foreign trade policy, and commercial contracts with over 22 years of practice. Managing Partner at Srinivas & Associates.',
  },
]

export const sampleAnnouncementsData = [
  {
    title: 'Statutory Due Dates Roadmap: GST, Income Tax & MCA Compliances',
    category: 'regulatory' as const,
    excerpt:
      'Official statutory calendar outlining monthly GSTR-1, GSTR-3B, TDS/TCS payments (Challan 281), Advance Tax installments, and annual ROC filings.',
    status: 'published' as const,
    publishedDate: new Date().toISOString(),
  },
  {
    title: 'Advisory on Mandatory Dematerialization of Shares for Private Limited Entities',
    category: 'regulatory' as const,
    excerpt:
      'Guidelines and procedural requirements under MCA Rule 9B for conversion of physical securities into dematerialized form.',
    status: 'published' as const,
    publishedDate: new Date().toISOString(),
  },
  {
    title: 'Quarterly TDS Return & Form 16/16A Issuance Directives',
    category: 'regulatory' as const,
    excerpt:
      'Compliance checklist for corporate deductors regarding Forms 24Q, 26Q, and 27Q along with TRACES portal processing guidelines.',
    status: 'published' as const,
    publishedDate: new Date().toISOString(),
  },
]

export const sampleJobsData = [
  {
    title: 'Audit & Assurance — Manager',
    employmentType: 'full-time',
    status: 'open',
    locations: ['Chennai', 'Bengaluru'],
    department: 'Assurance & Audit',
    experienceMin: 3,
    experienceMax: 6,
    summary: 'Lead statutory, internal, and tax audit engagements for a diverse portfolio of corporate clients across manufacturing, finance, and healthcare.',
    responsibilities: [
      { item: 'Plan and execute statutory, internal, and tax audit engagements for mid-to-large corporates.' },
      { item: 'Review working papers, draft audit reports, and ensure strict compliance with Ind AS and IFC standards.' },
      { item: 'Lead and mentor a team of senior associates and CA article assistants.' },
      { item: 'Liaise directly with client management, audit committees, and external stakeholders.' },
    ],
    requirements: [
      { item: 'Qualified Chartered Accountant (CA).' },
      { item: '3–6 years of post-qualification experience in core statutory audit.' },
      { item: 'Strong expertise in Ind AS, Indian GAAP, and Companies Act audit provisions.' },
      { item: 'Excellent project management, technical review, and team leadership skills.' },
    ],
    openings: 2,
  },
  {
    title: 'Direct Tax Advisory — Senior Associate',
    employmentType: 'full-time',
    status: 'open',
    locations: ['Mumbai', 'Chennai'],
    department: 'Tax Advisory',
    experienceMin: 2,
    experienceMax: 5,
    summary: 'Deliver end-to-end direct tax advisory, corporate tax compliance, income tax litigation support, and international tax structuring.',
    responsibilities: [
      { item: 'Draft technical submissions and grounds of appeal for representation before CIT(A) and ITAT.' },
      { item: 'Prepare and review corporate tax returns, tax audit reports, and transfer pricing documentation.' },
      { item: 'Advise domestic and international clients on tax implications of corporate restructurings.' },
      { item: 'Conduct tax due diligence reviews for mergers and acquisition transactions.' },
    ],
    requirements: [
      { item: 'Qualified Chartered Accountant (CA) or LL.B with direct tax specialization.' },
      { item: '2–5 years of post-qualification experience in corporate tax practice.' },
      { item: 'In-depth knowledge of Income Tax Act 1961, judicial precedents, and international tax treaties.' },
      { item: 'Strong written and oral communication skills for legal and tax drafting.' },
    ],
    openings: 3,
  },
  {
    title: 'GST & Indirect Taxation Specialist',
    employmentType: 'full-time',
    status: 'open',
    locations: ['Bengaluru', 'New Delhi', 'Chennai'],
    department: 'GST & Indirect Taxes',
    experienceMin: 1,
    experienceMax: 4,
    summary: 'Manage GST compliance, health checks, export refunds, departmental audit support, and advisory for enterprise clients.',
    responsibilities: [
      { item: 'Conduct comprehensive GST audits, health checks, and reconciliation of GSTR-2B with financial books.' },
      { item: 'Structure GST refund claims and handle export documentation for IT & service exporters.' },
      { item: 'Draft responses to show cause notices and represent clients during departmental audits.' },
      { item: 'Provide real-time tax advisory on GST rate classifications and input tax credit optimization.' },
    ],
    requirements: [
      { item: 'Qualified CA, CMA (Cost Accountant), or Tax Specialist.' },
      { item: '1–4 years of post-qualification experience in indirect tax compliance and advisory.' },
      { item: 'Hands-on proficiency in GST portal operations, data analytics, and ERP reconciliations.' },
      { item: 'Strong analytical mindset and detail-oriented approach.' },
    ],
    openings: 4,
  },
  {
    title: 'Articleship Trainee / CA Article Assistant',
    employmentType: 'internship',
    status: 'open',
    locations: ['Chennai', 'Bengaluru', 'Mumbai', 'Salem', 'Madurai'],
    department: 'Multi-disciplinary Practice',
    experienceMin: 0,
    experienceMax: 1,
    summary: 'Gain hands-on practical exposure across Statutory Audit, Tax Advisory, GST Filings, and Corporate Law under senior CA mentors.',
    responsibilities: [
      { item: 'Participate in statutory, internal, and concurrent audit engagements across various industries.' },
      { item: 'Assist in computing tax liabilities, filing income tax & GST returns, and preparing audit papers.' },
      { item: 'Conduct field testing, physical stock verification, and client data reconciliation.' },
      { item: 'Undergo structured technical training modules across direct tax, indirect tax, and auditing.' },
    ],
    requirements: [
      { item: 'Cleared CA Intermediate (Both Groups or Single Group as per ICAI guidelines).' },
      { item: 'Strong foundational knowledge of accounting concepts and willingness to learn.' },
      { item: 'Working knowledge of MS Excel, MS Word, and Tally Prime / accounting software.' },
      { item: 'Professional demeanor and commitment to completing 2-year articleship training.' },
    ],
    openings: 10,
  },
  {
    title: 'Virtual CFO & Business Consulting Lead',
    employmentType: 'full-time',
    status: 'open',
    locations: ['Bengaluru', 'Chennai', 'Mumbai'],
    department: 'Business Consulting',
    experienceMin: 5,
    experienceMax: 10,
    summary: 'Drive strategic financial planning, cash flow optimization, financial modeling, and Virtual CFO services for growth-stage companies.',
    responsibilities: [
      { item: 'Act as Virtual CFO for tech startups and MSMEs, overseeing financial strategy and unit economics.' },
      { item: 'Build institutional-grade financial models, valuation reports, and investor pitch presentations.' },
      { item: 'Design working capital management strategies and internal financial control systems.' },
      { item: 'Engage with client founders and boards to guide capital raising and strategic decisions.' },
    ],
    requirements: [
      { item: 'Qualified CA / MBA (Finance) / Insolvency Professional.' },
      { item: '5–10 years of post-qualification experience in FP&A, corporate finance, or business consulting.' },
      { item: 'Exceptional financial modeling skills and strategic advisory capability.' },
      { item: 'Proven track record of managing multi-client engagements.' },
    ],
    openings: 2,
  },
  {
    title: 'Corporate & Secretarial Compliance Manager',
    employmentType: 'full-time',
    status: 'open',
    locations: ['Chennai', 'New Delhi'],
    department: 'Corporate & Regulatory Advisory',
    experienceMin: 3,
    experienceMax: 7,
    summary: 'Oversee company law compliance, secretarial audits, RBI/FEMA reporting, and ROC filings for domestic and cross-border entities.',
    responsibilities: [
      { item: 'Manage secretarial compliance, board meeting proceedings, committee meetings, and annual filings.' },
      { item: 'Execute foreign direct investment (FDI), ODI, and FEMA reporting compliance (FC-GPR, FLA).' },
      { item: 'Advise on corporate governance frameworks, LLP agreements, and shareholder documentation.' },
      { item: 'Liaise with ROC, RBI, NCLT, and regional regulatory authorities.' },
    ],
    requirements: [
      { item: 'Qualified Company Secretary (CS) with ICSI membership.' },
      { item: '3–7 years of post-qualification secretarial and regulatory practice experience.' },
      { item: 'Deep knowledge of Companies Act 2013, FEMA regulations, and corporate secretarial standards.' },
      { item: 'High degree of precision in legal drafting and compliance management.' },
    ],
    openings: 2,
  },
]

export async function runSeed(payload: Payload) {
  const log: string[] = []

  const existingUsers = await payload.count({ collection: 'users' })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { name: 'Team Eyrie Admin', email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: 'admin' },
    })
    log.push(`Created admin user ${ADMIN_EMAIL}`)
  } else {
    log.push('Users already exist — skipped admin creation')
  }

  let seededSvcCount = 0
  for (let i = 0; i < services.length; i++) {
    const s = services[i]
    const existing = await payload.find({
      collection: 'services',
      where: { title: { equals: s.title } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'services',
        data: { title: s.title, summary: s.summary, order: i, subServices: s.subServices.map((name) => ({ name })) },
      })
      seededSvcCount++
    }
  }
  if (seededSvcCount > 0) {
    log.push(`Seeded ${seededSvcCount} services`)
  } else {
    log.push('Services already exist — skipped')
  }

  let seededIndCount = 0
  for (let i = 0; i < industries.length; i++) {
    const indName = industries[i]
    const existing = await payload.find({
      collection: 'industries',
      where: { name: { equals: indName } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'industries', data: { name: indName, order: i } })
      seededIndCount++
    }
  }
  if (seededIndCount > 0) {
    log.push(`Seeded ${seededIndCount} industries`)
  } else {
    log.push('Industries already exist — skipped')
  }

  const offCount = await payload.count({ collection: 'offices' })
  if (offCount.totalDocs === 0) {
    for (let i = 0; i < offices.length; i++) {
      await payload.create({ collection: 'offices', data: { ...offices[i], order: i } })
    }
    log.push(`Seeded ${offices.length} offices`)
  } else {
    for (let i = 0; i < offices.length; i++) {
      const off = offices[i]
      const existing = await payload.find({
        collection: 'offices',
        where: { city: { equals: off.city } },
        limit: 1,
      })
      if (existing.totalDocs === 0) {
        await payload.create({ collection: 'offices', data: { ...off, order: i } })
      } else if (off.addressLine1 && !existing.docs[0].addressLine1) {
        await payload.update({
          collection: 'offices',
          id: existing.docs[0].id,
          data: {
            addressLine1: off.addressLine1,
            addressLine2: off.addressLine2,
            state: off.state,
            pincode: off.pincode,
            phone: off.phone,
            email: off.email,
          },
        })
      }
    }
    log.push('Offices verified and upgraded with complete address details')
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      organizationName: 'Team Eyrie',
      tagline: 'Together, We Create Value. Together, We Build Trust.',
      contact: {
        email: 'contact@teameyrie.in',
        phone: '+91 86182 59712',
        whatsapp: '+91 86182 59712',
      },
      social: {
        linkedin: 'https://linkedin.com/company/team-eyrie',
        twitter: 'https://twitter.com/teameyrie',
        facebook: 'https://facebook.com/teameyrie',
      },
      features: {
        enableAccessibilityWidget: true,
        enableChatbot: true,
      },
      enquiryEmail: 'contact@teameyrie.in',
      recruitmentEmail: 'careers@teameyrie.in',
    },
  })
  log.push('Updated site settings')

  // Home page content: intro, stats, process model
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        eyebrow: 'India’s Integrated Professional Services Network',
        headline: 'Team Eyrie',
        subheadline: 'Together, We Create Value. Together, We Build Trust.',
        primaryCtaLabel: 'Contact Us',
        primaryCtaLink: '/contact',
      },
      intro: {
        heading: 'About Team Eyrie',
        body: 'Team Eyrie is a premier multidisciplinary professional services network established through the strategic alliance of three reputed Chartered Accountancy firms. Our network brings together nearly 20 Chartered Accountants, supported by Company Secretaries, Advocates, Cost Accountants, MBAs, Insolvency Professionals and Valuation Specialists.',
      },
      stats: [
        { value: '20+', label: 'Chartered Accountants' },
        { value: '9', label: 'Cities across India' },
        { value: '8', label: 'Practice areas' },
        { value: '17+', label: 'Industries served' },
      ],
      process: {
        heading: 'How We Work',
        steps: [
          { title: 'Understand', description: 'We begin by understanding your business, goals and regulatory context.' },
          { title: 'Advise', description: 'Our multidisciplinary experts design practical, compliant solutions.' },
          { title: 'Deliver', description: 'We execute with technology-driven workflows and clear communication.' },
          { title: 'Sustain', description: 'We stay engaged to support growth and ongoing compliance.' },
        ],
      },
    },
  })
  log.push('Updated home page content')

  // Testimonials
  const testCount = await payload.count({ collection: 'testimonials' })
  if (testCount.totalDocs === 0) {
    const testimonials = [
      { quote: 'Team Eyrie brought clarity to a complex cross-border restructuring. Their multidisciplinary bench meant every question had an expert answer.', authorName: 'Managing Director', authorTitle: 'Manufacturing Group', company: '' },
      { quote: 'Responsive, technically sharp and genuinely invested in our outcomes. A trusted partner for our GST and audit needs.', authorName: 'Chief Financial Officer', authorTitle: 'NBFC', company: '' },
      { quote: 'Their family business advisory helped us put a governance framework in place for the next generation. Invaluable.', authorName: 'Promoter', authorTitle: 'Family-Owned Business', company: '' },
    ]
    for (let i = 0; i < testimonials.length; i++) {
      await payload.create({ collection: 'testimonials', data: { ...testimonials[i], featured: true, order: i } })
    }
    log.push(`Seeded ${testimonials.length} testimonials`)
  } else {
    log.push('Testimonials already exist — skipped')
  }

  // Seed Job Openings
  const officeDocs = await payload.find({ collection: 'offices', limit: 100, depth: 0 })
  const officeMap = new Map(officeDocs.docs.map((off: any) => [off.city, off.id]))

  let seededJobCount = 0
  for (const j of sampleJobsData) {
    const existing = await payload.find({
      collection: 'jobs',
      where: { title: { equals: j.title } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      const locationIds = j.locations
        .map((city) => officeMap.get(city))
        .filter(Boolean) as number[]

      await payload.create({
        collection: 'jobs',
        overrideAccess: true,
        data: {
          title: j.title,
          employmentType: j.employmentType as any,
          status: j.status as any,
          location: locationIds.length > 0 ? locationIds : undefined,
          department: j.department,
          experienceMin: j.experienceMin,
          experienceMax: j.experienceMax,
          summary: j.summary,
          responsibilities: j.responsibilities,
          requirements: j.requirements,
          openings: j.openings,
        },
      })
      seededJobCount++
    }
  }
  if (seededJobCount > 0) {
    log.push(`Seeded ${seededJobCount} job opening(s)`)
  } else {
    log.push('Job openings already exist — skipped')
  }

  // Sample case study
  const csCount = await payload.count({ collection: 'case-studies' })
  if (csCount.totalDocs === 0) {
    await payload.create({
      collection: 'case-studies',
      data: {
        title: 'Cross-border restructuring for a manufacturing group',
        clientName: '',
        summary: 'Advised a manufacturing group on restructuring its overseas holding and India operations to improve tax efficiency and compliance.',
        challenge: 'A growing manufacturer needed to consolidate multiple entities across jurisdictions while remaining compliant with FEMA and transfer pricing regulations.',
        outcome: 'A streamlined structure with improved tax efficiency, full regulatory compliance and a clear roadmap for global expansion.',
        results: [
          { value: '4', label: 'Entities consolidated' },
          { value: '100%', label: 'Regulatory compliance' },
        ],
        status: 'published',
        order: 0,
      },
    })
    log.push('Seeded 1 case study')
  } else {
    log.push('Case studies already exist — skipped')
  }

  // DPDP Consent Settings (initial values; admin can edit thereafter)
  await payload.updateGlobal({
    slug: 'consent-settings',
    data: {
      notice: {
        version: 'v1',
        checkboxLabel:
          'I explicitly consent to Team Eyrie storing and processing my personal data — including my name, email address, phone number and uploaded résumé — in its secure candidate database for the purpose of evaluating my job application, under the Digital Personal Data Protection (DPDP) Act, 2023. I understand that I may withdraw this consent and request deletion of my data at any time using the link in my application acknowledgement email, or by contacting Team Eyrie’s Grievance Officer. I understand that withdrawing consent will mean my application is no longer considered.',
        reassuranceLine:
          'Your application details are transmitted over a secure, encrypted (HTTPS/TLS) connection and are not shared with third parties for marketing.',
      },
      grievanceOfficer: {
        name: 'Grievance Officer',
        email: 'grievance@teameyrie.in',
        phone: '',
      },
      retentionPeriodMonths: 12,
      withdrawalEmail: {
        subject: 'Your application to Team Eyrie',
        body:
          'Dear {{name}},\n\nThank you for applying for {{jobTitle}} at Team Eyrie. We have received your application.\n\nUnder the DPDP Act, 2023 you may withdraw your consent and have your application removed at any time using this link:\n{{withdrawUrl}}\n\nRegards,\nTeam Eyrie',
      },
    },
  })
  // Seed Team Members (Senior Partners & Leadership)
  const tmCount = await payload.count({ collection: 'team-members' })
  if (tmCount.totalDocs === 0) {
    const allServices = await payload.find({ collection: 'services', limit: 50, depth: 0 })
    const allOffices = await payload.find({ collection: 'offices', limit: 50, depth: 0 })
    const svcTitleMap = new Map(allServices.docs.map((s: any) => [s.title, s.id]))
    const offCityMap = new Map(allOffices.docs.map((o: any) => [o.city, o.id]))

    for (const tm of sampleTeamMembersData) {
      const serviceId = svcTitleMap.get(tm.serviceTitle)
      const officeId = offCityMap.get(tm.officeCity)

      await payload.create({
        collection: 'team-members',
        data: {
          name: tm.name,
          slug: tm.slug,
          designation: tm.designation,
          qualifications: tm.qualifications,
          order: tm.order,
          featured: tm.featured,
          contact: tm.contact,
          expertise: serviceId ? [serviceId] : undefined,
          offices: officeId ? [officeId] : undefined,
          bio: {
            root: {
              type: 'root',
              format: '' as const,
              indent: 0,
              version: 1,
              direction: 'ltr' as const,
              children: [
                {
                  type: 'paragraph',
                  format: '' as const,
                  indent: 0,
                  version: 1,
                  direction: 'ltr' as const,
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: tm.bioText,
                      version: 1,
                    },
                  ],
                },
              ],
            },
          },
        },
      })
    }
    log.push(`Seeded ${sampleTeamMembersData.length} team members (Senior Partners)`)
  } else {
    log.push('Team members already exist — skipped')
  }

  // Seed Announcements & Regulatory Circulars
  const annCount = await payload.count({ collection: 'announcements' })
  if (annCount.totalDocs === 0) {
    for (const ann of sampleAnnouncementsData) {
      await payload.create({
        collection: 'announcements',
        data: {
          title: ann.title,
          category: ann.category,
          excerpt: ann.excerpt,
          status: ann.status,
          publishedDate: ann.publishedDate,
          body: {
            root: {
              type: 'root',
              format: '' as const,
              indent: 0,
              version: 1,
              direction: 'ltr' as const,
              children: [
                {
                  type: 'paragraph',
                  format: '' as const,
                  indent: 0,
                  version: 1,
                  direction: 'ltr' as const,
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: ann.excerpt,
                      version: 1,
                    },
                  ],
                },
              ],
            },
          },
        },
      })
    }
    log.push(`Seeded ${sampleAnnouncementsData.length} regulatory announcements`)
  } else {
    log.push('Announcements already exist — skipped')
  }

  return log
}
