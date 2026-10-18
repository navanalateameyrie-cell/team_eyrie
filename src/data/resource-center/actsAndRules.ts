export interface ActOrRule {
  id: string
  title: string
  shortTitle: string
  year: number
  actNumber?: string
  ministry: string
  category: 'direct-tax' | 'indirect-tax' | 'corporate-law' | 'regulatory' | 'rules'
  description: string
  keyProvisions: string[]
  officialUrl: string
  pdfUrl?: string
}

export const ACTS_AND_RULES_DATA: ActOrRule[] = [
  {
    id: 'it-act-1961',
    title: 'Income-tax Act, 1961',
    shortTitle: 'Income Tax Act 1961',
    year: 1961,
    actNumber: 'Act No. 43 of 1961',
    ministry: 'Ministry of Finance / CBDT',
    category: 'direct-tax',
    description: 'The foundational statute governing the levy, administration, collection, and recovery of direct taxes across India.',
    keyProvisions: [
      'Section 4: Charge of income-tax',
      'Section 10: Incomes not included in total income',
      'Section 115BAC: New concessional tax regime for individuals & HUFs',
      'Section 192 to 195: Tax Deducted at Source (TDS)',
      'Section 139: Mandatory filing of returns of income',
    ],
    officialUrl: 'https://incometaxindia.gov.in/pages/acts/income-tax-act.aspx',
  },
  {
    id: 'cgst-act-2017',
    title: 'Central Goods and Services Tax Act, 2017',
    shortTitle: 'CGST Act 2017',
    year: 2017,
    actNumber: 'Act No. 12 of 2017',
    ministry: 'Ministry of Finance / CBIC',
    category: 'indirect-tax',
    description: 'Governs the levy and collection of central tax on intra-State supply of goods and services.',
    keyProvisions: [
      'Section 7: Scope of supply',
      'Section 9: Levy and collection of CGST',
      'Section 16: Eligibility and conditions for taking Input Tax Credit (ITC)',
      'Section 22: Mandatory registration threshold limits',
      'Section 37 to 39: Furnishing details of outward supplies and returns',
    ],
    officialUrl: 'https://cbic.gov.in/resources//htdocs-cbec/gst/cgst-act.pdf',
  },
  {
    id: 'igst-act-2017',
    title: 'Integrated Goods and Services Tax Act, 2017',
    shortTitle: 'IGST Act 2017',
    year: 2017,
    actNumber: 'Act No. 13 of 2017',
    ministry: 'Ministry of Finance / CBIC',
    category: 'indirect-tax',
    description: 'Statute providing for the levy and collection of tax on inter-State supply of goods and services, including import/export cross-border transactions.',
    keyProvisions: [
      'Section 5: Levy and collection of IGST',
      'Section 7 & 8: Inter-State and Intra-State supply determination',
      'Section 10 to 13: Place of supply of goods and services',
      'Section 16: Zero rated supply (exports and supplies to SEZ)',
    ],
    officialUrl: 'https://cbic.gov.in/resources//htdocs-cbec/gst/Integrated-Goods-Services-Tax-Act-2017.pdf',
  },
  {
    id: 'companies-act-2013',
    title: 'Companies Act, 2013',
    shortTitle: 'Companies Act 2013',
    year: 2013,
    actNumber: 'Act No. 18 of 2013',
    ministry: 'Ministry of Corporate Affairs (MCA)',
    category: 'corporate-law',
    description: 'The primary statute regulating the incorporation, governance, management, financial audits, and dissolution of corporate entities in India.',
    keyProvisions: [
      'Section 2(57): Statutory definition of Net Worth',
      'Section 135: Corporate Social Responsibility (CSR) obligations',
      'Section 139 to 148: Appointment and duties of statutory and cost auditors',
      'Section 185 & 186: Loans to directors, investments, and financial guarantees',
      'Section 447: Penalties and prosecution for corporate fraud',
    ],
    officialUrl: 'https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/acts.html?act=NTk2MQ==',
  },
  {
    id: 'llp-act-2008',
    title: 'Limited Liability Partnership Act, 2008',
    shortTitle: 'LLP Act 2008',
    year: 2008,
    actNumber: 'Act No. 6 of 2009',
    ministry: 'Ministry of Corporate Affairs (MCA)',
    category: 'corporate-law',
    description: 'Provides for the formation and regulation of limited liability partnerships and offers the flexibility of a partnership with limited liability benefits.',
    keyProvisions: [
      'Section 7: Designated partners and statutory accountability',
      'Section 23: Mutual rights and duties of partners (LLP Agreement)',
      'Section 34: Maintenance of books of account, other records and audit',
      'Section 35: Annual return filing obligations (Form 11)',
    ],
    officialUrl: 'https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/acts.html?act=NTk2Mw==',
  },
  {
    id: 'ibc-2016',
    title: 'Insolvency and Bankruptcy Code, 2016',
    shortTitle: 'IBC 2016',
    year: 2016,
    actNumber: 'Act No. 31 of 2016',
    ministry: 'Ministry of Corporate Affairs / IBBI',
    category: 'corporate-law',
    description: 'Consolidated statutory framework relating to reorganization and insolvency resolution of corporate persons, partnership firms, and individuals in a time-bound manner.',
    keyProvisions: [
      'Section 7: Initiation of CIRP by financial creditor',
      'Section 9: Application for initiation of CIRP by operational creditor',
      'Section 14: Moratorium protection during resolution proceedings',
      'Section 29A: Ineligibility criteria for resolution applicants',
      'Section 53: Waterfall mechanism for distribution of liquidation assets',
    ],
    officialUrl: 'https://ibbi.gov.in/en/legal-framework/act',
  },
  {
    id: 'fema-1999',
    title: 'Foreign Exchange Management Act, 1999',
    shortTitle: 'FEMA 1999',
    year: 1999,
    actNumber: 'Act No. 42 of 1999',
    ministry: 'Ministry of Finance / RBI',
    category: 'regulatory',
    description: 'Facilitates external trade and payments and promotes the orderly development and maintenance of foreign exchange markets in India.',
    keyProvisions: [
      'Section 3 & 4: Dealings in and holding of foreign exchange',
      'Section 5: Current account transaction freedoms',
      'Section 6: Capital account transaction regulations and ODI/FDI guidelines',
      'Section 13: Penalties and contravention adjudications',
    ],
    officialUrl: 'https://rbi.org.in/scripts/Fema.aspx',
  },
  {
    id: 'pmla-2002',
    title: 'Prevention of Money Laundering Act, 2002',
    shortTitle: 'PMLA 2002',
    year: 2002,
    actNumber: 'Act No. 15 of 2003',
    ministry: 'Ministry of Finance / Enforcement Directorate',
    category: 'regulatory',
    description: 'Comprehensive statute to prevent money-laundering, confiscate property derived from crime, and regulate reporting entities.',
    keyProvisions: [
      'Section 3: Offence of money-laundering',
      'Section 5: Attachment of property involved in money-laundering',
      'Section 12: Reporting entity obligations for client verification and transaction maintenance',
    ],
    officialUrl: 'https://enforcementdirectorate.gov.in/rules-and-regulations',
  },
  {
    id: 'it-rules-1962',
    title: 'Income-tax Rules, 1962',
    shortTitle: 'Income Tax Rules 1962',
    year: 1962,
    ministry: 'Ministry of Finance / CBDT',
    category: 'rules',
    description: 'Subordinate statutory rules detailing procedural compliance, depreciation schedules (Rule 5), perquisite valuations, and statutory forms.',
    keyProvisions: [
      'Rule 2A: Valuation of House Rent Allowance (HRA) exemption',
      'Rule 3: Valuation of perquisites',
      'Rule 5: Depreciation allowance rates on blocks of assets',
      'Rule 12: Return forms prescription (ITR-1 through ITR-7)',
    ],
    officialUrl: 'https://incometaxindia.gov.in/pages/rules/income-tax-rules-1962.aspx',
  },
  {
    id: 'cgst-rules-2017',
    title: 'Central Goods and Services Tax Rules, 2017',
    shortTitle: 'CGST Rules 2017',
    year: 2017,
    ministry: 'Ministry of Finance / CBIC',
    category: 'rules',
    description: 'Procedural rules governing registration, valuation of supply, e-way bills (Rule 138), input tax credit reversals (Rule 42 & 43), and return filing mechanisms.',
    keyProvisions: [
      'Rule 36(4): ITC matching with GSTR-2B',
      'Rule 42 & 43: Reversal of ITC on exempt supplies and capital goods',
      'Rule 86B: Restriction on use of input tax credit ledger (1% cash rule)',
      'Rule 138: E-Way Bill generation rules and thresholds',
    ],
    officialUrl: 'https://cbic.gov.in/resources//htdocs-cbec/gst/cgst-rules.pdf',
  },
]

