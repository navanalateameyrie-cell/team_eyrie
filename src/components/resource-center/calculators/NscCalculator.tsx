'use client'

import React, { useState, useId } from 'react'
import { CopyIcon, CheckIcon } from '../Icons'

// Historical & Current NSC Interest Rates (compounded annually)
const NSC_TRANCHES = [
  { id: 'curr-7.7', label: '01-01-2023 to Present (7.70% p.a.)', rate: 7.70 },
  { id: '2020-6.8', label: '01-04-2020 to 31-12-2022 (6.80% p.a.)', rate: 6.80 },
  { id: '2019-7.9', label: '01-07-2019 to 31-03-2020 (7.90% p.a.)', rate: 7.90 },
  { id: '2019-8.0', label: '01-01-2019 to 30-06-2019 (8.00% p.a.)', rate: 8.00 },
  { id: '2018-8.0', label: '01-10-2018 to 31-12-2018 (8.00% p.a.)', rate: 8.00 },
  { id: '2018-7.6', label: '01-01-2018 to 30-09-2018 (7.60% p.a.)', rate: 7.60 },
  { id: '2017-7.8', label: '01-07-2017 to 31-12-2017 (7.80% p.a.)', rate: 7.80 },
  { id: '2016-8.1', label: '01-04-2016 to 30-06-2017 (8.10% p.a.)', rate: 8.10 },
  { id: '2012-8.5', label: '01-04-2012 to 31-03-2016 (8.50% p.a.)', rate: 8.50 },
]

export default function NscCalculator() {
  const [depositAmount, setDepositAmount] = useState<string>('')
  const [selectedTranche, setSelectedTranche] = useState<string>('curr-7.7')
  const [customRate, setCustomRate] = useState<string>('')
  const [useCustomRate, setUseCustomRate] = useState<boolean>(false)
  const [copied, setCopied] = useState(false)

  const amountId = useId()
  const trancheId = useId()
  const customRateId = useId()

  const numDeposit = Math.max(0, parseFloat(depositAmount) || 0)
  const activeTranche = NSC_TRANCHES.find((t) => t.id === selectedTranche) || NSC_TRANCHES[0]
  const effectiveRate = useCustomRate
    ? Math.max(0, parseFloat(customRate) || 0)
    : activeTranche.rate

  // 5-Year Annual Compounding Table
  const tenureYears = 5
  interface NscScheduleItem {
    year: number
    openingBalance: number
    interestEarned: number
    closingBalance: number
    isReinvestedFor80C: boolean
  }
  const yearlySchedule: NscScheduleItem[] = []
  let currentPrincipal = numDeposit
  let totalInterest = 0

  for (let year = 1; year <= tenureYears; year++) {
    const interestForYear = currentPrincipal * (effectiveRate / 100)
    const closingBalance = currentPrincipal + interestForYear
    totalInterest += interestForYear

    yearlySchedule.push({
      year,
      openingBalance: currentPrincipal,
      interestEarned: interestForYear,
      closingBalance,
      isReinvestedFor80C: year < tenureYears, // Years 1-4 deemed reinvested under 80C
    })

    currentPrincipal = closingBalance
  }

  const maturityValue = numDeposit > 0 ? currentPrincipal : 0

  const formatINR = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN')
  }

  const handleCopy = () => {
    if (numDeposit === 0) return

    let tableRows = ''
    yearlySchedule.forEach((row) => {
      tableRows += `Year ${row.year}: Opening ${formatINR(row.openingBalance)} | Interest ${formatINR(row.interestEarned)} | Closing ${formatINR(row.closingBalance)} (${row.isReinvestedFor80C ? 'Sec 80C Reinvested' : 'Taxable Payout'})\n`
    })

    const text = `NATIONAL SAVINGS CERTIFICATE (NSC VIII ISSUE) COMPUTATION
─────────────────────────────────────────────────
Statutory Rule     : Government Savings Certificates Act / Sec 80C
Purchase Tranche   : ${activeTranche.label}
Effective Rate     : ${effectiveRate.toFixed(2)}% p.a. Compounded Annually
Tenure             : 5 Years (Fixed)
Initial Deposit    : ${formatINR(numDeposit)}
─────────────────────────────────────────────────
YEAR-BY-YEAR ACCRUAL SCHEDULE:
${tableRows}─────────────────────────────────────────────────
TOTAL INTEREST     : ${formatINR(totalInterest)}
MATURITY VALUE     : ${formatINR(maturityValue)}
─────────────────────────────────────────────────
Note: Interest accrued during Years 1 to 4 is deemed reinvested and eligible for deduction u/s 80C (subject to ₹1.5L cap). Year 5 interest is fully taxable.
Generated via Team Eyrie Resource Center • Savings & Investments`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="inst-tool-card">
      <div className="inst-tool-header">
        <div>
          <span className="inst-meta-tag">POST OFFICE SAVINGS • SECTION 80C DEDUCTION</span>
          <h2 className="inst-tool-title">National Savings Certificate (NSC) Calculator</h2>
          <p className="inst-tool-desc">
            5-Year NSC VIII Issue statutory interest accrual, annual compounding breakdown, Section 80C deemed reinvestment schedule, and final maturity computation.
          </p>
        </div>
        <div className="inst-tool-header-badge">
          <span>NSC VIII Issue</span>
        </div>
      </div>

      <div className="inst-form-layout">
        {/* Input Parameters */}
        <div className="inst-form-col">
          <div className="inst-section-title">
            <span>Certificate Purchase Details</span>
          </div>

          <div className="inst-input-group">
            <label htmlFor={amountId} className="inst-input-label">
              Investment Deposit Amount (₹)
            </label>
            <input
              id={amountId}
              type="number"
              step="any"
              className="inst-input-text"
              placeholder="Enter deposit amount (e.g. 100000)"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <span className="inst-input-hint">Minimum investment ₹1,000 in multiples of ₹100. No upper ceiling.</span>
          </div>

          <div className="inst-input-group">
            <label htmlFor={trancheId} className="inst-input-label">
              Purchase Issue Period / Interest Rate Tranche
            </label>
            <select
              id={trancheId}
              className="inst-input-select"
              value={selectedTranche}
              disabled={useCustomRate}
              onChange={(e) => setSelectedTranche(e.target.value)}
            >
              {NSC_TRANCHES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
            <span className="inst-input-hint">Government declared quarterly sovereign rate lock for 5-year tenure.</span>
          </div>

          <div className="inst-checkbox-row" style={{ marginTop: '0.75rem' }}>
            <label className="inst-checkbox-label">
              <input
                type="checkbox"
                checked={useCustomRate}
                onChange={(e) => setUseCustomRate(e.target.checked)}
              />
              <span>Specify custom interest rate (%)</span>
            </label>
          </div>

          {useCustomRate && (
            <div className="inst-input-group" style={{ marginTop: '0.75rem' }}>
              <label htmlFor={customRateId} className="inst-input-label">
                Custom Annual Interest Rate (% p.a.)
              </label>
              <input
                id={customRateId}
                type="number"
                step="0.01"
                className="inst-input-text"
                placeholder="Enter custom rate (e.g. 7.7)"
                value={customRate}
                onChange={(e) => setCustomRate(e.target.value)}
              />
            </div>
          )}

          <div className="inst-statutory-notice" style={{ marginTop: '1.25rem' }}>
            <strong>Section 80C Tax Provision:</strong>
            <p>
              Interest accruing annually for the first 4 years is deemed to be reinvested in the NSC and qualifies for deduction under Section 80C within the overall ceiling of ₹1,50,000. The interest accrued in the 5th (final) year is taxable under &quot;Income from Other Sources&quot;.
            </p>
          </div>
        </div>

        {/* Results Ledger & Amortization */}
        <div className="inst-result-col">
          <div className="inst-section-title">
            <span>Certificate Accrual &amp; Maturity Ledger</span>
          </div>

          {numDeposit === 0 ? (
            <div className="inst-empty-notice">
              Enter certificate investment amount on the left to generate the complete 5-year interest accrual schedule and Section 80C deemed reinvestment ledger.
            </div>
          ) : (
            <>
              <div className="inst-kpi-grid">
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Principal Invested</span>
                  <span className="inst-kpi-value">{formatINR(numDeposit)}</span>
                </div>
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Compounded Rate</span>
                  <span className="inst-kpi-value">{effectiveRate.toFixed(2)}%</span>
                </div>
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Total Interest</span>
                  <span className="inst-kpi-value" style={{ color: '#047857' }}>
                    {formatINR(totalInterest)}
                  </span>
                </div>
                <div className="inst-kpi-card inst-kpi-card--primary">
                  <span className="inst-kpi-label">Maturity Value (5 Yrs)</span>
                  <span className="inst-kpi-value">{formatINR(maturityValue)}</span>
                </div>
              </div>

              {/* Year-by-Year Table */}
              <div className="inst-table-wrap" style={{ marginTop: '1.25rem' }}>
                <table className="inst-data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '12%' }}>Year</th>
                      <th>Opening Balance</th>
                      <th>Annual Interest</th>
                      <th>Closing Balance</th>
                      <th>Tax Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlySchedule.map((row) => (
                      <tr key={row.year}>
                        <td style={{ fontWeight: 600 }}>Year {row.year}</td>
                        <td>{formatINR(row.openingBalance)}</td>
                        <td style={{ color: '#047857', fontWeight: 600 }}>
                          +{formatINR(row.interestEarned)}
                        </td>
                        <td style={{ fontWeight: 600 }}>{formatINR(row.closingBalance)}</td>
                        <td>
                          {row.isReinvestedFor80C ? (
                            <span className="inst-chip inst-chip--green">Sec 80C Reinvested</span>
                          ) : (
                            <span className="inst-chip inst-chip--amber">Taxable on Payout</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2} style={{ fontWeight: 700 }}>
                        Total At Maturity
                      </td>
                      <td style={{ fontWeight: 700, color: '#047857' }}>{formatINR(totalInterest)}</td>
                      <td style={{ fontWeight: 700 }}>{formatINR(maturityValue)}</td>
                      <td style={{ fontSize: '0.75rem', color: '#64748b' }}>Post Office Sovereign</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="inst-actions-bar" style={{ marginTop: '1.25rem' }}>
                <button type="button" className="inst-action-btn" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <CheckIcon size={15} />
                      <span>Copied Statement</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={15} />
                      <span>Copy Client Statement</span>
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
