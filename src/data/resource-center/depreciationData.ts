export interface CompaniesActDepreciation {
  assetClass: string
  subCategory: string
  usefulLifeYears: number
  residualValuePercent: number
  notes?: string
}

export interface IncomeTaxDepreciation {
  blockOfAssets: string
  natureOfAsset: string
  wdvRatePercent: number
  notes?: string
}

export const COMPANIES_ACT_DEPRECIATION: CompaniesActDepreciation[] = [
  {
    assetClass: 'Buildings',
    subCategory: 'Buildings (other than factory buildings) with RCC Frame Structure',
    usefulLifeYears: 60,
    residualValuePercent: 5,
    notes: 'Schedule II, Part C, Item I(a)',
  },
  {
    assetClass: 'Buildings',
    subCategory: 'Buildings (other than factory buildings) with other than RCC Frame Structure',
    usefulLifeYears: 30,
    residualValuePercent: 5,
    notes: 'Schedule II, Part C, Item I(b)',
  },
  {
    assetClass: 'Buildings',
    subCategory: 'Factory buildings',
    usefulLifeYears: 30,
    residualValuePercent: 5,
    notes: 'Schedule II, Part C, Item I(c)',
  },
  {
    assetClass: 'Plant & Machinery',
    subCategory: 'General Plant and Machinery (used in manufacturing)',
    usefulLifeYears: 15,
    residualValuePercent: 5,
    notes: 'Single shift basis. Additional 50% for double shift, 100% for triple shift.',
  },
  {
    assetClass: 'Plant & Machinery',
    subCategory: 'Continuous process plant for which no special rate has been prescribed',
    usefulLifeYears: 25,
    residualValuePercent: 5,
    notes: 'Schedule II, Part C, Item IV(a)',
  },
  {
    assetClass: 'Furniture & Fittings',
    subCategory: 'General furniture and fixtures (used in offices, showrooms)',
    usefulLifeYears: 10,
    residualValuePercent: 5,
    notes: 'Schedule II, Part C, Item III',
  },
  {
    assetClass: 'Computers & IT',
    subCategory: 'Servers and networks',
    usefulLifeYears: 6,
    residualValuePercent: 5,
    notes: 'Schedule II, Part C, Item IV(b)(i)',
  },
  {
    assetClass: 'Computers & IT',
    subCategory: 'End-user devices such as Desktops, Laptops, etc.',
    usefulLifeYears: 3,
    residualValuePercent: 5,
    notes: 'Schedule II, Part C, Item IV(b)(ii)',
  },
  {
    assetClass: 'Vehicles',
    subCategory: 'Motor cars (other than used in commercial hire)',
    usefulLifeYears: 8,
    residualValuePercent: 5,
    notes: 'Schedule II, Part C, Item V(a)',
  },
  {
    assetClass: 'Vehicles',
    subCategory: 'Motorcycles, scooters, and other mopeds',
    usefulLifeYears: 10,
    residualValuePercent: 5,
    notes: 'Schedule II, Part C, Item V(b)',
  },
  {
    assetClass: 'Vehicles',
    subCategory: 'Commercial commercial goods/passenger vehicles (buses, lorries, taxis)',
    usefulLifeYears: 6,
    residualValuePercent: 5,
    notes: 'Schedule II, Part C, Item V(c)',
  },
  {
    assetClass: 'Office Equipment',
    subCategory: 'Printers, copiers, air conditioners, telecommunications equipment',
    usefulLifeYears: 5,
    residualValuePercent: 5,
    notes: 'Schedule II, Part C, Item VI',
  },
]

export const INCOME_TAX_DEPRECIATION: IncomeTaxDepreciation[] = [
  {
    blockOfAssets: 'Block 1: Buildings',
    natureOfAsset: 'Residential buildings other than hotels and boarding houses',
    wdvRatePercent: 5,
    notes: 'Rule 5, Appendix I',
  },
  {
    blockOfAssets: 'Block 1: Buildings',
    natureOfAsset: 'Commercial buildings, offices, factories, godowns, hotels',
    wdvRatePercent: 10,
    notes: 'Rule 5, Appendix I',
  },
  {
    blockOfAssets: 'Block 1: Buildings',
    natureOfAsset: 'Purely temporary erections such as wooden structures',
    wdvRatePercent: 40,
    notes: 'Capped at 40% maximum rate under Income Tax Act',
  },
  {
    blockOfAssets: 'Block 2: Furniture',
    natureOfAsset: 'Furniture and fittings including electrical fittings',
    wdvRatePercent: 10,
    notes: 'All furniture and fixtures',
  },
  {
    blockOfAssets: 'Block 3: Plant & Machinery',
    natureOfAsset: 'General Plant and Machinery not specially provided for',
    wdvRatePercent: 15,
    notes: 'Standard industrial and commercial plant rate',
  },
  {
    blockOfAssets: 'Block 3: Plant & Machinery',
    natureOfAsset: 'Motor cars (other than those used in business of running them on hire)',
    wdvRatePercent: 15,
    notes: '30% if acquired and put to use between Aug 23, 2019 and Mar 31, 2020',
  },
  {
    blockOfAssets: 'Block 3: Plant & Machinery',
    natureOfAsset: 'Commercial vehicles, buses, lorries, taxis used on hire',
    wdvRatePercent: 30,
    notes: 'Commercial vehicle rate',
  },
  {
    blockOfAssets: 'Block 3: Plant & Machinery',
    natureOfAsset: 'Computers including computer software, laptops, servers',
    wdvRatePercent: 40,
    notes: 'Capped at 40% w.e.f. AY 2017-18',
  },
  {
    blockOfAssets: 'Block 3: Plant & Machinery',
    natureOfAsset: 'Pollution control equipment, renewable energy devices, windmills',
    wdvRatePercent: 40,
    notes: 'Environmental and energy-saving machinery',
  },
  {
    blockOfAssets: 'Block 4: Intangibles',
    natureOfAsset: 'Know-how, patents, copyrights, trademarks, licenses, franchises',
    wdvRatePercent: 25,
    notes: 'Note: Goodwill of a business/profession is not depreciable w.e.f. AY 2021-22',
  },
]

