'use client'

import React, { useState, useId } from 'react'
import { CopyIcon, CheckIcon } from '../Icons'

const QUICK_INCOMES = [750000, 1000000, 1500000, 2500000, 5000000]

export default function IncomeTaxCalculator() {
  const [financialYear, setFinancialYear] = useState<'2025-26' | '2026-27'>('2025-26')
  const [ageGroup, setAgeGroup] = useState<'individual' | 'senior' | 'superSenior'>('individual')
  const [grossIncome, setGrossIncome] = useState<string>('')
  const [isSalaried, setIsSalaried] = useState<boolean>(true)

  // Old Regime Deductions
  const [sec80C, setSec80C] = useState<string>('')
  const [sec80D, setSec80D] = useState<string>('')
  const [sec24b, setSec24b] = useState<string>('')
  const [sec80CCD, setSec80CCD] = useState<string>('')
  const [otherDeductions, setOtherDeductions] = useState<string>('')

  const [copied, setCopied] = useState(false)
  const grossIncomeInputId = useId()
  const sec80CInputId = useId()
  const sec80DInputId = useId()
  const sec24bInputId = useId()
  const sec80CCDInputId = useId()
  const otherDeductionsInputId = useId()

  const numGrossIncome = Math.max(0, parseFloat(grossIncome) || 0)
  const numSec80C = Math.min(150000, Math.max(0, parseFloat(sec80C) || 0))
  const numSec80D = Math.max(0, parseFloat(sec80D) || 0)
  const numSec24b = Math.min(200000, Math.max(0, parseFloat(sec24b) || 0))
  const numSec80CCD = Math.min(50000, Math.max(0, parseFloat(sec80CCD) || 0))
  const numOtherDeductions = Math.max(0, parseFloat(otherDeductions) || 0)

  const formatInr = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  // --- NEW REGIME CALCULATION (Section 115BAC) ---
  const newRegimeStdDeduction = isSalaried && numGrossIncome > 0 ? Math.min(numGrossIncome, 75000) : 0
  const newRegimeTaxableIncome = Math.max(0, numGrossIncome - newRegimeStdDeduction)

  let newSlabTax = 0
  if (newRegimeTaxableIncome > 1500000) {
    newSlabTax += (newRegimeTaxableIncome - 1500000) * 0.3
    newSlabTax += 300000 * 0.2
    newSlabTax += 200000 * 0.15
    newSlabTax += 300000 * 0.1
    newSlabTax += 400000 * 0.05
  } else if (newRegimeTaxableIncome > 1200000) {
    newSlabTax += (newRegimeTaxableIncome - 1200000) * 0.2
    newSlabTax += 200000 * 0.15
    newSlabTax += 300000 * 0.1
    newSlabTax += 400000 * 0.05
  } else if (newRegimeTaxableIncome > 1000000) {
    newSlabTax += (newRegimeTaxableIncome - 1000000) * 0.15
    newSlabTax += 300000 * 0.1
    newSlabTax += 400000 * 0.05
  } else if (newRegimeTaxableIncome > 700000) {
    newSlabTax += (newRegimeTaxableIncome - 700000) * 0.1
    newSlabTax += 400000 * 0.05
  } else if (newRegimeTaxableIncome > 300000) {
    newSlabTax += (newRegimeTaxableIncome - 300000) * 0.05
  }

  let newRebate87A = 0
  if (newRegimeTaxableIncome <= 700000) {
    newRebate87A = newSlabTax
  } else {
    const excessOver7L = newRegimeTaxableIncome - 700000
    if (newSlabTax > excessOver7L) {
      newRebate87A = newSlabTax - excessOver7L
    }
  }

  const newTaxAfterRebate = Math.max(0, newSlabTax - newRebate87A)

  let newSurcharge = 0
  if (newRegimeTaxableIncome > 20000000) {
    newSurcharge = newTaxAfterRebate * 0.25
  } else if (newRegimeTaxableIncome > 10000000) {
    newSurcharge = newTaxAfterRebate * 0.15
  } else if (newRegimeTaxableIncome > 5000000) {
    newSurcharge = newTaxAfterRebate * 0.1
  }

  const newCess = (newTaxAfterRebate + newSurcharge) * 0.04
  const newTotalTax = Math.round(newTaxAfterRebate + newSurcharge + newCess)

  // --- OLD REGIME CALCULATION ---
  const oldRegimeStdDeduction = isSalaried && numGrossIncome > 0 ? Math.min(numGrossIncome, 50000) : 0
  const totalOldDeductions =
    oldRegimeStdDeduction + numSec80C + numSec80D + numSec24b + numSec80CCD + numOtherDeductions

  const oldRegimeTaxableIncome = Math.max(0, numGrossIncome - totalOldDeductions)

  let basicExemption = 250000
  if (ageGroup === 'senior') basicExemption = 300000
  if (ageGroup === 'superSenior') basicExemption = 500000

  let oldSlabTax = 0
  if (oldRegimeTaxableIncome > 1000000) {
    oldSlabTax += (oldRegimeTaxableIncome - 1000000) * 0.3
    oldSlabTax += 500000 * 0.2
    if (basicExemption < 500000) {
      oldSlabTax += (500000 - basicExemption) * 0.05
    }
  } else if (oldRegimeTaxableIncome > 500000) {
    oldSlabTax += (oldRegimeTaxableIncome - 500000) * 0.2
    if (basicExemption < 500000) {
      oldSlabTax += (500000 - basicExemption) * 0.05
    }
  } else if (oldRegimeTaxableIncome > basicExemption) {
    oldSlabTax += (oldRegimeTaxableIncome - basicExemption) * 0.05
  }

  let oldRebate87A = 0
  if (oldRegimeTaxableIncome <= 500000) {
    oldRebate87A = Math.min(12500, oldSlabTax)
  }

  const oldTaxAfterRebate = Math.max(0, oldSlabTax - oldRebate87A)

  let oldSurcharge = 0
  if (oldRegimeTaxableIncome > 50000000) {
    oldSurcharge = oldTaxAfterRebate * 0.37
  } else if (oldRegimeTaxableIncome > 20000000) {
    oldSurcharge = oldTaxAfterRebate * 0.25
  } else if (oldRegimeTaxableIncome > 10000000) {
    oldSurcharge = oldTaxAfterRebate * 0.15
  } else if (oldRegimeTaxableIncome > 5000000) {
    oldSurcharge = oldTaxAfterRebate * 0.1
  }

  const oldCess = (oldTaxAfterRebate + oldSurcharge) * 0.04
  const oldTotalTax = Math.round(oldTaxAfterRebate + oldSurcharge + oldCess)

  const diff = Math.abs(oldTotalTax - newTotalTax)
  const isNewBetter = newTotalTax <= oldTotalTax

  const handleCopySummary = () => {
    const text = `INCOME TAX STATUTORY COMPARISON SHEET
─────────────────────────────────────────────────
Financial Year    : FY ${financialYear} (AY ${financialYear === '2025-26' ? '2026-27' : '2027-28'})
Gross Total Income: ${formatInr(numGrossIncome)}
Employment Status : ${isSalaried ? 'Salaried' : 'Non-Salaried / Business'}
Taxpayer Category : ${ageGroup === 'individual' ? 'Individual (< 60 Yrs)' : ageGroup === 'senior' ? 'Senior (60-80)' : 'Super Senior (80+)'}
─────────────────────────────────────────────────
[NEW REGIME (SECTION 115BAC)]
• Standard Deduction : ${formatInr(newRegimeStdDeduction)}
• Net Taxable Income : ${formatInr(newRegimeTaxableIncome)}
• Slab Tax Liability : ${formatInr(newSlabTax)}
• Section 87A Rebate : ${formatInr(newRebate87A)}
• Health & Edu Cess  : ${formatInr(newCess)}
• Total Tax Payable  : ${formatInr(newTotalTax)}

[OLD REGIME WITH DEDUCTIONS]
• Total Deductions   : ${formatInr(totalOldDeductions)}
• Net Taxable Income : ${formatInr(oldRegimeTaxableIncome)}
• Slab Tax Liability : ${formatInr(oldSlabTax)}
• Section 87A Rebate : ${formatInr(oldRebate87A)}
• Health & Edu Cess  : ${formatInr(oldCess)}
• Total Tax Payable  : ${formatInr(oldTotalTax)}
─────────────────────────────────────────────────
VERDICT: ${isNewBetter ? `New Regime saves you ${formatInr(diff)}!` : `Old Regime saves you ${formatInr(diff)}!`}
Generated via Team Eyrie Resource Center • Statutory Compliant`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="inst-tool-card">
      <div className="inst-tool-header">
        <div>
          <span className="inst-meta-tag">DIRECT TAXATION • INCOME-TAX ACT 1961</span>
          <h2 className="inst-tool-title">Income Tax Calculator (Old vs New Regime)</h2>
          <p className="inst-tool-desc">
            Statutory tax liability evaluation comparing Section 115BAC with the Old Tax Regime, incorporating Union Budget standard deductions, 87A rebate, and marginal relief.
          </p>
        </div>
        <div className="inst-tool-header-badge">
          <span>Finance Act Compliant</span>
        </div>
      </div>

      <div className="inst-tool-grid">
        {/* Controls Column */}
        <div className="inst-form-col">
          <div className="inst-form-row">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label className="inst-form-label">Assessment Year</label>
                <select
                  className="inst-custom-field"
                  style={{ width: '100%', padding: '9px 12px' }}
                  value={financialYear}
                  onChange={(e) => setFinancialYear(e.target.value as any)}
                >
                  <option value="2025-26">FY 2025-26 (AY 2026-27)</option>
                  <option value="2026-27">FY 2026-27 (AY 2027-28)</option>
                </select>
              </div>

              <div>
                <label className="inst-form-label">Age Classification</label>
                <select
                  className="inst-custom-field"
                  style={{ width: '100%', padding: '9px 12px' }}
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value as any)}
                >
                  <option value="individual">&lt; 60 Years (General)</option>
                  <option value="senior">60 to 80 Years (Senior)</option>
                  <option value="superSenior">&gt; 80 Years (Super Senior)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Gross Income Input */}
          <div className="inst-form-row">
            <label className="inst-form-label" htmlFor={grossIncomeInputId}>
              <span>Gross Annual Total Income</span>
              <span className="inst-currency-label">INR (₹)</span>
            </label>
            <div className="inst-currency-input-wrap">
              <span className="inst-currency-prefix">₹</span>
              <input
                id={grossIncomeInputId}
                type="number"
                min="0"
                step="any"
                value={grossIncome}
                onChange={(e) => setGrossIncome(e.target.value)}
                className="inst-num-input"
                placeholder="Enter gross annual income (e.g. 1500000)"
              />
            </div>

            <div className="inst-preset-strip">
              <span className="inst-preset-label">Quick select:</span>
              {QUICK_INCOMES.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className={`inst-preset-pill ${grossIncome === String(amt) ? 'inst-preset-pill--active' : ''}`}
                  onClick={() => setGrossIncome(String(amt))}
                >
                  ₹{(amt / 100000).toLocaleString('en-IN')}L
                </button>
              ))}
            </div>
          </div>

          {/* Taxpayer Category */}
          <div className="inst-form-row">
            <label className="inst-form-label">Taxpayer Category</label>
            <div className="inst-segmented-control">
              <button
                type="button"
                className={`inst-segmented-option ${isSalaried ? 'inst-segmented-option--active' : ''}`}
                onClick={() => setIsSalaried(true)}
              >
                Salaried (Auto ₹75k / ₹50k Std. Deduction)
              </button>
              <button
                type="button"
                className={`inst-segmented-option ${!isSalaried ? 'inst-segmented-option--active' : ''}`}
                onClick={() => setIsSalaried(false)}
              >
                Business / Professional (No Std. Deduction)
              </button>
            </div>
          </div>

          {/* Old Regime Deductions Section */}
          <div className="inst-box-subpanel">
            <span className="inst-box-subpanel-title">OLD REGIME DEDUCTIONS (CHAPTER VI-A)</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
              <div>
                <label className="inst-mini-label" htmlFor={sec80CInputId}>Section 80C (PPF/ELSS - Max ₹1.5L)</label>
                <input
                  id={sec80CInputId}
                  type="number"
                  min="0"
                  max="150000"
                  step="any"
                  value={sec80C}
                  onChange={(e) => setSec80C(e.target.value)}
                  className="inst-custom-field"
                  placeholder="0"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label className="inst-mini-label" htmlFor={sec80DInputId}>Section 80D (Health Insurance)</label>
                <input
                  id={sec80DInputId}
                  type="number"
                  min="0"
                  step="any"
                  value={sec80D}
                  onChange={(e) => setSec80D(e.target.value)}
                  className="inst-custom-field"
                  placeholder="0"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label className="inst-mini-label" htmlFor={sec24bInputId}>Section 24(b) (Home Loan - Max ₹2L)</label>
                <input
                  id={sec24bInputId}
                  type="number"
                  min="0"
                  max="200000"
                  step="any"
                  value={sec24b}
                  onChange={(e) => setSec24b(e.target.value)}
                  className="inst-custom-field"
                  placeholder="0"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label className="inst-mini-label" htmlFor={sec80CCDInputId}>80CCD(1B) (NPS - Max ₹50k)</label>
                <input
                  id={sec80CCDInputId}
                  type="number"
                  min="0"
                  max="50000"
                  step="any"
                  value={sec80CCD}
                  onChange={(e) => setSec80CCD(e.target.value)}
                  className="inst-custom-field"
                  placeholder="0"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ marginTop: 10 }}>
              <label className="inst-mini-label" htmlFor={otherDeductionsInputId}>Other Deductions (HRA, 80G, 80E, 80TTA)</label>
              <input
                id={otherDeductionsInputId}
                type="number"
                min="0"
                step="any"
                value={otherDeductions}
                onChange={(e) => setOtherDeductions(e.target.value)}
                className="inst-custom-field"
                placeholder="0"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="inst-results-col">
          <div className="inst-statement-card">
            {/* Recommendation Strip */}
            <div className={`inst-recommend-ribbon ${isNewBetter ? 'inst-recommend-ribbon--new' : 'inst-recommend-ribbon--old'}`}>
              <div className="inst-recommend-text">
                <strong>Recommended: {isNewBetter ? 'New Tax Regime (Section 115BAC)' : 'Old Tax Regime'}</strong>
                <p>
                  {diff === 0
                    ? 'Both regimes result in the identical tax liability for your income.'
                    : `You save ${formatInr(diff)} in taxes by selecting the ${isNewBetter ? 'New' : 'Old'} Regime.`}
                </p>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="inst-statement-ledger" style={{ padding: 0, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left', color: '#1e293b', fontWeight: 700 }}>
                      Particulars
                    </th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, color: isNewBetter ? '#ea580c' : '#475569' }}>
                      New Regime
                    </th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, color: !isNewBetter ? '#ea580c' : '#475569' }}>
                      Old Regime
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '9px 14px', color: '#475569' }}>Gross Total Income</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontWeight: 600 }}>{formatInr(numGrossIncome)}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontWeight: 600 }}>{formatInr(numGrossIncome)}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '9px 14px', color: '#475569' }}>Standard &amp; Exemptions</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', color: '#16a34a' }}>-{formatInr(newRegimeStdDeduction)}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', color: '#16a34a' }}>-{formatInr(totalOldDeductions)}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                    <td style={{ padding: '9px 14px', fontWeight: 700, color: '#0f274a' }}>Taxable Income</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontWeight: 800 }}>{formatInr(newRegimeTaxableIncome)}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontWeight: 800 }}>{formatInr(oldRegimeTaxableIncome)}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '9px 14px', color: '#475569' }}>Section 87A Rebate</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', color: '#16a34a' }}>-{formatInr(newRebate87A)}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', color: '#16a34a' }}>-{formatInr(oldRebate87A)}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '9px 14px', color: '#475569' }}>Health &amp; Edu Cess (4%)</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right' }}>{formatInr(newCess)}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right' }}>{formatInr(oldCess)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Hero Winning Total Box */}
            <div className="inst-total-box">
              <span className="inst-total-eyebrow">
                {isNewBetter ? 'TOTAL TAX PAYABLE (NEW REGIME BEST)' : 'TOTAL TAX PAYABLE (OLD REGIME BEST)'}
              </span>
              <div className="inst-total-figure">
                {formatInr(isNewBetter ? newTotalTax : oldTotalTax)}
              </div>
              <div className="inst-total-meta">
                <span>Alternate Option: {formatInr(isNewBetter ? oldTotalTax : newTotalTax)}</span>
                <span>•</span>
                <span>Net Savings: {formatInr(diff)}</span>
              </div>
            </div>

            {/* Action */}
            <button
              type="button"
              className={`inst-copy-btn ${copied ? 'inst-copy-btn--copied' : ''}`}
              onClick={handleCopySummary}
            >
              {copied ? (
                <>
                  <CheckIcon size={16} />
                  <span>Comparison Sheet Copied</span>
                </>
              ) : (
                <>
                  <CopyIcon size={16} />
                  <span>Copy Tax Computation Sheet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
