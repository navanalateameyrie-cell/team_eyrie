'use client'

import React, { useState, useId } from 'react'
import { CopyIcon, CheckIcon } from '../Icons'

export default function HomeLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('')
  const [mortgageRate, setMortgageRate] = useState<string>('')
  const [tenureYears, setTenureYears] = useState<string>('')
  const [extraPaymentMonthly, setExtraPaymentMonthly] = useState<string>('')
  const [taxSlabPct, setTaxSlabPct] = useState<string>('30')
  const [copied, setCopied] = useState(false)

  const loanId = useId()
  const rateId = useId()
  const tenureId = useId()
  const extraId = useId()
  const slabId = useId()

  const numLoan = Math.max(0, parseFloat(loanAmount) || 0)
  const numRate = Math.max(0, parseFloat(mortgageRate) || 0)
  const numYears = Math.max(0, parseFloat(tenureYears) || 0)
  const numExtra = Math.max(0, parseFloat(extraPaymentMonthly) || 0)
  const numSlab = Math.max(0, parseFloat(taxSlabPct) || 0)

  const numMonths = Math.round(numYears * 12)
  const monthlyRate = numRate > 0 ? numRate / 12 / 100 : 0

  // Base EMI without prepayments
  let baseEmi = 0
  if (numLoan > 0 && numRate > 0 && numMonths > 0) {
    baseEmi = (numLoan * monthlyRate * Math.pow(1 + monthlyRate, numMonths)) / (Math.pow(1 + monthlyRate, numMonths) - 1)
  } else if (numLoan > 0 && numRate === 0 && numMonths > 0) {
    baseEmi = numLoan / numMonths
  }

  // Simulation with extra prepayment to find actual payoff months & total interest
  let actualMonths = 0
  let totalInterest = 0
  let totalPayments = 0
  let firstYearInterest = 0
  let firstYearPrincipal = 0

  if (numLoan > 0 && baseEmi > 0) {
    let balance = numLoan
    const totalMonthlyOutflow = baseEmi + numExtra

    while (balance > 0.01 && actualMonths < 600) {
      actualMonths++
      const interestThisMonth = balance * monthlyRate
      totalInterest += interestThisMonth

      const principalThisMonth = Math.min(balance, totalMonthlyOutflow - interestThisMonth)
      balance -= principalThisMonth
      totalPayments += principalThisMonth + interestThisMonth

      if (actualMonths <= 12) {
        firstYearInterest += interestThisMonth
        firstYearPrincipal += principalThisMonth
      }
    }
  }

  // Tax Benefit Calculations (Indian Income Tax Act, 1961)
  // Section 24(b): Max ₹2,00,000 for self-occupied property
  // Section 80C: Max ₹1,50,000 for principal repayment
  const sec24bEligible = Math.min(200000, firstYearInterest)
  const sec80cEligible = Math.min(150000, firstYearPrincipal)
  const totalTaxDeductionFirstYear = sec24bEligible + sec80cEligible
  const annualTaxSavings = totalTaxDeductionFirstYear * (numSlab / 100)
  const effectiveAnnualCost = (baseEmi * 12) - annualTaxSavings

  const hasData = loanAmount !== '' || mortgageRate !== '' || tenureYears !== ''

  const formatINR = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN')
  }

  const handleCopy = () => {
    if (numLoan === 0) return

    const text = `HOME LOAN & TAX BENEFIT STATEMENT
─────────────────────────────────────────────────
Statutory Provisions : Section 24(b) (Interest) & Section 80C (Principal)
Loan Amount Financed : ${formatINR(numLoan)}
Mortgage Rate        : ${numRate.toFixed(2)}% p.a.
Stipulated Tenure    : ${numYears} Years (${numMonths} Months)
Extra Monthly Payoff : ${formatINR(numExtra)}
─────────────────────────────────────────────────
REPAYMENT SUMMARY:
• Regular Monthly EMI          : ${formatINR(baseEmi)}
• Total Monthly Outflow        : ${formatINR(baseEmi + numExtra)}
• Actual Payoff Duration       : ${actualMonths} Months (${(actualMonths / 12).toFixed(1)} Years)
• Total Interest Payable       : ${formatINR(totalInterest)}
• Total Repayment Amount       : ${formatINR(totalPayments)}
─────────────────────────────────────────────────
ANNUAL TAX SHIELD (FIRST YEAR ESTIMATE):
• Section 24(b) Interest Cap   : ${formatINR(sec24bEligible)} (Max ₹2,00,000)
• Section 80C Principal Cap    : ${formatINR(sec80cEligible)} (Max ₹1,50,000)
• Total Tax Deductions Claimed : ${formatINR(totalTaxDeductionFirstYear)}
• Annual Tax Saved (${numSlab}% Slab) : ${formatINR(annualTaxSavings)}
• Net Post-Tax Annual EMI Cost : ${formatINR(effectiveAnnualCost)}
─────────────────────────────────────────────────
Generated via Team Eyrie Resource Center • Housing Finance & Tax Planning`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="inst-tool-card">
      <div className="inst-tool-header">
        <div>
          <span className="inst-meta-tag">HOUSING FINANCE • SECTION 24(B) &amp; SECTION 80C</span>
          <h2 className="inst-tool-title">Home Loan Calculator</h2>
          <p className="inst-tool-desc">
            Calculate home mortgage EMI, prepayment payoff acceleration, and statutory tax shields under Section 24(b) (₹2L interest deduction) and Section 80C (₹1.5L principal).
          </p>
        </div>
        <div className="inst-tool-header-badge">
          <span>Home Mortgage</span>
        </div>
      </div>

      <div className="inst-form-layout">
        {/* Left Inputs */}
        <div className="inst-form-col">
          <div className="inst-section-title">
            <span>Mortgage Parameters</span>
          </div>

          <div className="inst-input-group">
            <label htmlFor={loanId} className="inst-input-label">
              Home Loan Amount (₹)
            </label>
            <input
              id={loanId}
              type="number"
              step="any"
              className="inst-input-text"
              placeholder="Enter loan amount (e.g. 5000000)"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>

          <div className="inst-input-group">
            <label htmlFor={rateId} className="inst-input-label">
              Mortgage Rate (% p.a.)
            </label>
            <input
              id={rateId}
              type="number"
              step="0.01"
              className="inst-input-text"
              placeholder="Enter interest rate (e.g. 8.5)"
              value={mortgageRate}
              onChange={(e) => setMortgageRate(e.target.value)}
            />
          </div>

          <div className="inst-input-group">
            <label htmlFor={tenureId} className="inst-input-label">
              Amortization Period (in Years)
            </label>
            <input
              id={tenureId}
              type="number"
              step="1"
              className="inst-input-text"
              placeholder="Enter loan tenure (e.g. 20)"
              value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
            />
            <span className="inst-input-hint">Standard tenures: 15, 20, 25, or 30 years.</span>
          </div>

          <div className="inst-input-group">
            <label htmlFor={extraId} className="inst-input-label">
              Extra Monthly Prepayment (₹, Optional)
            </label>
            <input
              id={extraId}
              type="number"
              step="any"
              className="inst-input-text"
              placeholder="Enter optional prepayment (e.g. 5000)"
              value={extraPaymentMonthly}
              onChange={(e) => setExtraPaymentMonthly(e.target.value)}
            />
            <span className="inst-input-hint">Additional principal paid every month to reduce interest.</span>
          </div>

          <div className="inst-input-group">
            <label htmlFor={slabId} className="inst-input-label">
              Borrower Income Tax Slab Rate (%)
            </label>
            <select
              id={slabId}
              className="inst-input-select"
              value={taxSlabPct}
              onChange={(e) => setTaxSlabPct(e.target.value)}
            >
              <option value="30">30% (Standard Highest Slab u/s 115BAC / Old)</option>
              <option value="20">20% Mid Slab</option>
              <option value="15">15% Moderate Slab</option>
              <option value="10">10% Entry Slab</option>
              <option value="0">0% (Nil / Non-Taxpayer)</option>
            </select>
          </div>
        </div>

        {/* Right Results Ledger */}
        <div className="inst-result-col">
          <div className="inst-section-title">
            <span>Repayment Summary &amp; Tax Shield</span>
          </div>

          {!hasData || numLoan === 0 ? (
            <div className="inst-empty-notice">
              Enter loan amount, interest rate, and tenure on the left to compute monthly home loan EMI, payoff schedule, and tax savings under Section 24(b) &amp; Section 80C.
            </div>
          ) : (
            <>
              <div className="inst-kpi-grid">
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Loan Financed</span>
                  <span className="inst-kpi-value">{formatINR(numLoan)}</span>
                </div>
                <div className="inst-kpi-card inst-kpi-card--primary">
                  <span className="inst-kpi-label">Monthly EMI</span>
                  <span className="inst-kpi-value">{formatINR(baseEmi)}</span>
                </div>
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Total Interest</span>
                  <span className="inst-kpi-value" style={{ color: '#b91c1c' }}>
                    {formatINR(totalInterest)}
                  </span>
                </div>
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Effective Payoff</span>
                  <span className="inst-kpi-value" style={{ color: '#047857' }}>
                    {actualMonths} Mo ({(actualMonths / 12).toFixed(1)} Yrs)
                  </span>
                </div>
              </div>

              {/* Tax Savings Table */}
              <div className="inst-section-title" style={{ marginTop: '1.25rem' }}>
                <span>Income Tax Benefit Ledger (Annual Section 24b &amp; 80C)</span>
              </div>

              <div className="inst-table-wrap">
                <table className="inst-data-table">
                  <thead>
                    <tr>
                      <th>Income Tax Section</th>
                      <th>First Year Component</th>
                      <th>Max Statutory Cap</th>
                      <th style={{ textAlign: 'right' }}>Allowed Deduction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Section 24(b) (Interest Deduction)</td>
                      <td>{formatINR(firstYearInterest)}</td>
                      <td>₹2,00,000</td>
                      <td style={{ textAlign: 'right', fontWeight: 600, color: '#047857' }}>
                        {formatINR(sec24bEligible)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Section 80C (Principal Repayment)</td>
                      <td>{formatINR(firstYearPrincipal)}</td>
                      <td>₹1,50,000</td>
                      <td style={{ textAlign: 'right', fontWeight: 600, color: '#047857' }}>
                        {formatINR(sec80cEligible)}
                      </td>
                    </tr>
                    <tr style={{ background: '#eff6ff' }}>
                      <td colSpan={3} style={{ fontWeight: 700 }}>
                        Total Annual Tax Deductions Under Old Regime
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: '#1e3a8a' }}>
                        {formatINR(totalTaxDeductionFirstYear)}
                      </td>
                    </tr>
                    <tr style={{ background: '#ecfdf5' }}>
                      <td colSpan={3} style={{ fontWeight: 700, color: '#047857' }}>
                        Annual Tax Saved (at {numSlab}% Tax Bracket)
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: '#047857' }}>
                        +{formatINR(annualTaxSavings)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="inst-actions-bar" style={{ marginTop: '1.25rem' }}>
                <button type="button" className="inst-action-btn" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <CheckIcon size={15} />
                      <span>Copied Home Loan Statement</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={15} />
                      <span>Copy Home Loan Statement</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

