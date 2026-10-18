export interface IncomeTaxSlab {
  regime: 'new' | 'old'
  category: string
  slabRange: string
  taxRate: string
  notes: string
}

export interface GstRateItem {
  rate: string
  hsnSac: string
  description: string
  majorGoodsOrServices: string
  cess: string
}

export interface SmallSavingsScheme {
  schemeName: string
  interestRate: string
  compoundingFrequency: string
  tenure: string
  taxBenefit: string
  minInvestment: string
}

export interface StampDutyItem {
  state: string
  maleRate: string
  femaleRate: string
  jointRate: string
  registrationFee: string
  cessOrSurcharge: string
  governingAct: string
}

export const INCOME_TAX_SLABS_DATA: IncomeTaxSlab[] = [
  // New Tax Regime (Section 115BAC) for FY 2025-26 & 2026-27
  {
    regime: 'new',
    category: 'All Individuals & HUFs',
    slabRange: 'Up to ₹3,00,000',
    taxRate: 'NIL',
    notes: 'Exempt basic threshold under Section 115BAC',
  },
  {
    regime: 'new',
    category: 'All Individuals & HUFs',
    slabRange: '₹3,00,001 to ₹7,00,000',
    taxRate: '5%',
    notes: 'Eligible for Sec 87A rebate up to ₹7,00,000 (standard rebate)',
  },
  {
    regime: 'new',
    category: 'All Individuals & HUFs',
    slabRange: '₹7,00,001 to ₹10,00,000',
    taxRate: '10%',
    notes: 'Salaried employees get flat ₹75,000 standard deduction',
  },
  {
    regime: 'new',
    category: 'All Individuals & HUFs',
    slabRange: '₹10,00,001 to ₹12,00,000',
    taxRate: '15%',
    notes: 'Marginal relief available if income marginally exceeds ₹12L',
  },
  {
    regime: 'new',
    category: 'All Individuals & HUFs',
    slabRange: '₹12,00,001 to ₹15,00,000',
    taxRate: '20%',
    notes: 'Tax liability of ₹1,00,000 + 20% of amount over ₹12L',
  },
  {
    regime: 'new',
    category: 'All Individuals & HUFs',
    slabRange: 'Above ₹15,00,000',
    taxRate: '30%',
    notes: 'Highest statutory slab under default regime',
  },

  // Old Tax Regime (Optional)
  {
    regime: 'old',
    category: 'Individuals below 60 Years',
    slabRange: 'Up to ₹2,50,000',
    taxRate: 'NIL',
    notes: 'Basic exemption threshold',
  },
  {
    regime: 'old',
    category: 'Individuals below 60 Years',
    slabRange: '₹2,50,001 to ₹5,00,000',
    taxRate: '5%',
    notes: 'Sec 87A rebate up to ₹12,500 available',
  },
  {
    regime: 'old',
    category: 'Individuals below 60 Years',
    slabRange: '₹5,00,001 to ₹10,00,000',
    taxRate: '20%',
    notes: 'Deductions under Sec 80C, 80D, 24(b) permitted',
  },
  {
    regime: 'old',
    category: 'Individuals below 60 Years',
    slabRange: 'Above ₹10,00,000',
    taxRate: '30%',
    notes: 'Plus applicable surcharge and 4% Health & Education Cess',
  },
]

export const GST_RATES_DATA: GstRateItem[] = [
  {
    rate: '0% (Exempt)',
    hsnSac: '0101 - 0406',
    description: 'Fresh vegetables, unpackaged foodgrains, milk, salt, organic manure',
    majorGoodsOrServices: 'Essential staples, public healthcare, school education',
    cess: 'Nil',
  },
  {
    rate: '0.25%',
    hsnSac: '7102',
    description: 'Cut and polished semi-precious & precious stones, rough diamonds',
    majorGoodsOrServices: 'Gems & Jewelry raw material exports',
    cess: 'Nil',
  },
  {
    rate: '3%',
    hsnSac: '7106 - 7108',
    description: 'Gold, silver, platinum jewelry and bullion, imitation jewelry',
    majorGoodsOrServices: 'Precious metal trading, minted coins',
    cess: 'Nil',
  },
  {
    rate: '5%',
    hsnSac: '1006, 3004',
    description: 'Packaged branded food grains, insulin, life-saving medicines, domestic air travel (economy)',
    majorGoodsOrServices: 'Transport services, non-AC restaurants, renewable energy devices',
    cess: 'Nil',
  },
  {
    rate: '12%',
    hsnSac: '8414, 4819',
    description: 'Apparel > ₹1,000, dairy products (butter, cheese), processed foods, diagnostic kits',
    majorGoodsOrServices: 'Business class air travel, construction contracts for affordable housing',
    cess: 'Nil',
  },
  {
    rate: '18%',
    hsnSac: '8471, 9983',
    description: 'Capital machinery, electronics, IT & software services, legal & accounting consultancies',
    majorGoodsOrServices: 'Banking, telecom, commercial leases, hotels with tariff > ₹7,500',
    cess: 'Nil',
  },
  {
    rate: '28%',
    hsnSac: '8703, 2402',
    description: 'Motor vehicles, luxury cars, yachts, air conditioners, aerated drinks, pan masala',
    majorGoodsOrServices: 'Casino gaming, online real money gaming, race courses',
    cess: '1% to 22% on luxury cars; specific cess on tobacco',
  },
]

export const SMALL_SAVINGS_DATA: SmallSavingsScheme[] = [
  {
    schemeName: 'National Savings Certificate (NSC VIII Issue)',
    interestRate: '7.70% p.a.',
    compoundingFrequency: 'Compounded annually, payable at maturity',
    tenure: '5 Years',
    taxBenefit: 'Deduction under Section 80C (up to ₹1.5L); deemed reinvested interest eligible for 80C in first 4 years',
    minInvestment: '₹1,000 (No maximum limit)',
  },
  {
    schemeName: 'Public Provident Fund (PPF)',
    interestRate: '7.10% p.a.',
    compoundingFrequency: 'Compounded annually',
    tenure: '15 Years (extendable in 5-yr blocks)',
    taxBenefit: 'Exempt-Exempt-Exempt (EEE) status: Sec 80C deduction, tax-free interest & maturity',
    minInvestment: '₹500 / year (Max ₹1.5L / year)',
  },
  {
    schemeName: 'Senior Citizens Savings Scheme (SCSS)',
    interestRate: '8.20% p.a.',
    compoundingFrequency: 'Quarterly payout (every 31 Mar, 30 Jun, 30 Sep, 31 Dec)',
    tenure: '5 Years',
    taxBenefit: 'Sec 80C eligible at deposit; interest taxable subject to Sec 80TTB threshold of ₹50,000',
    minInvestment: '₹1,000 (Max ₹30,00,000)',
  },
  {
    schemeName: 'Sukanya Samriddhi Account (SSA)',
    interestRate: '8.20% p.a.',
    compoundingFrequency: 'Compounded annually',
    tenure: '21 years from account opening or marriage after 18',
    taxBenefit: 'Exempt-Exempt-Exempt (EEE) under Section 80C and Section 10(11A)',
    minInvestment: '₹250 / year (Max ₹1.5L / year)',
  },
  {
    schemeName: 'Kisan Vikas Patra (KVP)',
    interestRate: '7.50% p.a.',
    compoundingFrequency: 'Compounded annually (Doubles in 115 months)',
    tenure: '9 Years 7 Months',
    taxBenefit: 'No 80C deduction; interest taxable on accrual/receipt basis; no TDS',
    minInvestment: '₹1,000 (No upper limit)',
  },
  {
    schemeName: 'Post Office Monthly Income Scheme (POMIS)',
    interestRate: '7.40% p.a.',
    compoundingFrequency: 'Monthly payout to savings bank',
    tenure: '5 Years',
    taxBenefit: 'No 80C benefit; monthly interest taxable at investor slab rates',
    minInvestment: '₹1,000 (Max ₹9L single / ₹15L joint)',
  },
]

export const STAMP_DUTY_DATA: StampDutyItem[] = [
  {
    state: 'Maharashtra',
    maleRate: '6.00% (5% + 1% Metro Cess in Mumbai/Pune)',
    femaleRate: '5.00% (Concession of 1% for female buyers)',
    jointRate: '5.50% to 6.00%',
    registrationFee: '1% of property value (Capped at ₹30,000 for residential)',
    cessOrSurcharge: '1% Local Body / Metro Cess applicable in notified municipal corporations',
    governingAct: 'Maharashtra Stamp Act, 1958',
  },
  {
    state: 'Karnataka',
    maleRate: '5.00% (> ₹45 Lakhs); 3.00% (₹20L - ₹45L); 2.00% (< ₹20L)',
    femaleRate: 'Same as male rate',
    jointRate: '5.00%',
    registrationFee: '2% of registered consideration',
    cessOrSurcharge: '10% Infrastructure Cess + 2% Urban Transport Surcharge on Stamp Duty',
    governingAct: 'Karnataka Stamp Act, 1957',
  },
  {
    state: 'Delhi (NCT)',
    maleRate: '6.00%',
    femaleRate: '4.00% (2% statutory gender concession)',
    jointRate: '5.00%',
    registrationFee: '1% of property value + ₹100 pasting fee',
    cessOrSurcharge: 'Included in basic stamp duty rates',
    governingAct: 'Indian Stamp (Delhi Amendment) Act, 2001',
  },
  {
    state: 'Tamil Nadu',
    maleRate: '7.00%',
    femaleRate: '7.00%',
    jointRate: '7.00%',
    registrationFee: '4% (reduced from former combined fee)',
    cessOrSurcharge: 'Integrated stamp duty of 7% (no separate local cess)',
    governingAct: 'Tamil Nadu Stamp Act, 1899 & Registration Rules',
  },
  {
    state: 'Telangana',
    maleRate: '6.00%',
    femaleRate: '6.00%',
    jointRate: '6.00%',
    registrationFee: '0.50% of market value',
    cessOrSurcharge: '1.5% Transfer Duty collected by Stamps & Registration Dept',
    governingAct: 'Telangana Stamp Act, 1899',
  },
  {
    state: 'Uttar Pradesh',
    maleRate: '7.00%',
    femaleRate: '6.00% (₹10,000 rebate on stamp duty)',
    jointRate: '6.50%',
    registrationFee: '1% of property valuation (capped at ₹20,000)',
    cessOrSurcharge: '1% to 2% Nagar Nigam / Development Authority Surcharge',
    governingAct: 'Indian Stamp (Uttar Pradesh Amendment) Act',
  },
]

