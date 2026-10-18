export interface RocFeeSlab {
  capitalRange: string
  normalFee: number
  description: string
}

export interface RocDelayFeeSlab {
  delayPeriod: string
  multipleOfNormalFee: string
  additionalFeeText: string
}

export const ROC_NORMAL_FEES: RocFeeSlab[] = [
  {
    capitalRange: 'Less than ₹1,00,000',
    normalFee: 200,
    description: 'Companies having nominal share capital up to ₹1,00,000',
  },
  {
    capitalRange: '₹1,00,000 to ₹4,99,999',
    normalFee: 300,
    description: 'Companies having nominal share capital of ₹1 Lakh to ₹5 Lakhs',
  },
  {
    capitalRange: '₹5,00,000 to ₹24,99,999',
    normalFee: 400,
    description: 'Companies having nominal share capital of ₹5 Lakhs to ₹25 Lakhs',
  },
  {
    capitalRange: '₹25,00,000 to ₹99,99,999',
    normalFee: 500,
    description: 'Companies having nominal share capital of ₹25 Lakhs to ₹1 Crore',
  },
  {
    capitalRange: '₹1,00,00,000 or more',
    normalFee: 600,
    description: 'Companies having nominal share capital of ₹1 Crore and above',
  },
]

export const ROC_DELAY_ADDITIONAL_FEES: RocDelayFeeSlab[] = [
  {
    delayPeriod: 'Up to 30 days',
    multipleOfNormalFee: '2 times of normal fee',
    additionalFeeText: 'Normal fee + 1x additional fee',
  },
  {
    delayPeriod: 'More than 30 days and up to 60 days',
    multipleOfNormalFee: '4 times of normal fee',
    additionalFeeText: 'Normal fee + 3x additional fee',
  },
  {
    delayPeriod: 'More than 60 days and up to 90 days',
    multipleOfNormalFee: '6 times of normal fee',
    additionalFeeText: 'Normal fee + 5x additional fee',
  },
  {
    delayPeriod: 'More than 90 days and up to 180 days',
    multipleOfNormalFee: '10 times of normal fee',
    additionalFeeText: 'Normal fee + 9x additional fee',
  },
  {
    delayPeriod: 'Beyond 180 days',
    multipleOfNormalFee: '12 times of normal fee',
    additionalFeeText: 'Normal fee + 11x additional fee (for non-AOC-4/MGT-7)',
  },
]

