'use client'

import React, { useState, useId } from 'react'
import { CopyIcon, CheckIcon } from '../Icons'

export default function EffectiveCapitalCalculator() {
  // Aggregate additions
  const [paidUpCapital, setPaidUpCapital] = useState<string>('')
  const [sharePremium, setSharePremium] = useState<string>('')
  const [reservesSurplus, setReservesSurplus] = useState<string>('')
  const [longTermLoans, setLongTermLoans] = useState<string>('')
  const [deposits, setDeposits] = useState<string>('')

  // Aggregate deductions
  const [investments, setInvestments] = useState<string>('')
  const [accumulatedLosses, setAccumulatedLosses] = useState<string>('')
  const [preliminaryExpenses, setPreliminaryExpenses] = useState<string>('')

  // Optional: Investment company exemption toggle
  const [isInvestmentCompany, setIsInvestmentCompany] = useState<boolean>(false)

  const [copied, setCopied] = useState(false)

  // Element IDs
  const capitalId = useId()
  const premiumId = useId()
  const reservesId = useId()
  const loansId = useId()
  const depositsId = useId()
  const investmentsId = useId()
  const lossesId = useId()
  const prelimId = useId()

  // Numeric parse (in Rupees)
  const numCapital = Math.max(0, parseFloat(paidUpCapital) || 0)
  const numPremium = Math.max(0, parseFloat(sharePremium) || 0)
  const numReserves = Math.max(0, parseFloat(reservesSurplus) || 0)
  const numLoans = Math.max(0, parseFloat(longTermLoans) || 0)
  const numDeposits = Math.max(0, parseFloat(deposits) || 0)

  const totalCapitalAndDebt = numCapital + numPremium + numReserves + numLoans + numDeposits

  const numInvestments = isInvestmentCompany ? 0 : Math.max(0, parseFloat(investments) || 0)
  const numLosses = Math.max(0, parseFloat(accumulatedLosses) || 0)
  const numPrelim = Math.max(0, parseFloat(preliminaryExpenses) || 0)

  const totalDeductions = numInvestments + numLosses + numPrelim

  const hasData =
    paidUpCapital !== '' ||
    sharePremium !== '' ||
    reservesSurplus !== '' ||
    longTermLoans !== '' ||
    deposits !== '' ||
    investments !== '' ||
    accumulatedLosses !== '' ||
    preliminaryExpenses !== ''

  const effectiveCapital = totalCapitalAndDebt - totalDeductions
  const effectiveCapitalCrores = effectiveCapital / 10000000 // In ₹ Crores

  // Schedule V Tier Calculation (Section II of Part II, Schedule V)
  let tierLabel = ''
  let standardLimitLakhs = 0 // In ₹ Lakhs per managerial person
  let specialResolutionLimitLakhs = 0 // If approved by special resolution (doubled)

  if (effectiveCapitalCrores < 5) {
    tierLabel = 'Negative or less than ₹5 Crore'
    standardLimitLakhs = 60
    specialResolutionLimitLakhs = 120
  } else if (effectiveCapitalCrores >= 5 && effectiveCapitalCrores < 100) {
    tierLabel = '₹5 Crore and above but less than ₹100 Crore'
    standardLimitLakhs = 84
    specialResolutionLimitLakhs = 168
  } else if (effectiveCapitalCrores >= 100 && effectiveCapitalCrores < 250) {
    tierLabel = '₹100 Crore and above but less than ₹250 Crore'
    standardLimitLakhs = 120
    specialResolutionLimitLakhs = 240
  } else {
    tierLabel = '₹250 Crore and above'
    const excessOver250Cr = (effectiveCapital - 2500000000) * 0.0001 // 0.01% of excess
    const excessLakhs = excessOver250Cr / 100000
    standardLimitLakhs = 120 + excessLakhs
    specialResolutionLimitLakhs = standardLimitLakhs * 2
  }

  const formatINR = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN')
  }

  const formatCrores = (val: number) => {
    return `₹${(val / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 3 })} Cr`
  }

  const handleCopy = () => {
    if (!hasData) return

    const text = `COMPANIES ACT, 2013 • SCHEDULE V EFFECTIVE CAPITAL STATEMENT
─────────────────────────────────────────────────
Statutory Rule     : Schedule V read with Section 197 of Companies Act, 2013
─────────────────────────────────────────────────
CAPITAL & LONG-TERM LIABILITIES:
• Paid-up Share Capital (excluding appln money) : ${formatINR(numCapital)}
• Share Premium Account                        : ${formatINR(numPremium)}
• Reserves & Surplus (excl. revaluation res)   : ${formatINR(numReserves)}
• Long-Term Loans (repayable after 1 year)     : ${formatINR(numLoans)}
• Long-Term Deposits (repayable after 1 year)  : ${formatINR(numDeposits)}
TOTAL POSITIVE CAPITAL (A)                     : ${formatINR(totalCapitalAndDebt)}
─────────────────────────────────────────────────
DEDUCTIONS:
• Investments ${isInvestmentCompany ? '(Exempted - Investment Co.)' : ''} : ${formatINR(numInvestments)}
• Accumulated Losses                           : ${formatINR(numLosses)}
• Preliminary Expenses not written off         : ${formatINR(numPrelim)}
TOTAL DEDUCTIONS (B)                           : ${formatINR(totalDeductions)}
─────────────────────────────────────────────────
COMPUTED EFFECTIVE CAPITAL (A - B)             : ${formatINR(effectiveCapital)} (${formatCrores(effectiveCapital)})
─────────────────────────────────────────────────
SCHEDULE V REMUNERATION SLAB ASSESSMENT (Inadequate / Nil Profits):
• Applicable Bracket: ${tierLabel}
• Standard Annual Limit (Ordinary Resolution)  : ₹${standardLimitLakhs.toFixed(2)} Lakhs / director
• Upper Ceiling (Special Resolution Approved)  : ₹${specialResolutionLimitLakhs.toFixed(2)} Lakhs / director
─────────────────────────────────────────────────
Generated via Team Eyrie Resource Center • Corporate Compliance Advisory`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="inst-tool-card">
      <div className="inst-tool-header">
        <div>
          <span className="inst-meta-tag">COMPANIES ACT 2013 • SCHEDULE V &amp; SECTION 197</span>
          <h2 className="inst-tool-title">Effective Capital Calculator</h2>
          <p className="inst-tool-desc">
            Statutory computation of Effective Capital under Schedule V of the Companies Act, 2013 for determining maximum permissible managerial remuneration in case of nil or inadequate profits.
          </p>
        </div>
        <div className="inst-tool-header-badge">
          <span>Sch V MCA</span>
        </div>
      </div>

      <div className="inst-form-layout">
        {/* Left Form Inputs */}
        <div className="inst-form-col">
          <div className="inst-section-title">
            <span>1. Capital &amp; Long-Term Liabilities (Positive Items)</span>
          </div>

          <div className="inst-input-group">
            <label htmlFor={capitalId} className="inst-input-label">
              Paid-up Share Capital (₹)
            </label>
            <input
              id={capitalId}
              type="number"
              step="any"
              className="inst-input-text"
              placeholder="Enter paid-up capital (excluding application money)"
              value={paidUpCapital}
              onChange={(e) => setPaidUpCapital(e.target.value)}
            />
          </div>

          <div className="inst-input-group">
            <label htmlFor={premiumId} className="inst-input-label">
              Securities / Share Premium (₹)
            </label>
            <input
              id={premiumId}
              type="number"
              step="any"
              className="inst-input-text"
              placeholder="Enter balance in securities premium"
              value={sharePremium}
              onChange={(e) => setSharePremium(e.target.value)}
            />
          </div>

          <div className="inst-input-group">
            <label htmlFor={reservesId} className="inst-input-label">
              Reserves &amp; Surplus (₹)
            </label>
            <input
              id={reservesId}
              type="number"
              step="any"
              className="inst-input-text"
              placeholder="Enter free reserves (excluding revaluation reserves)"
              value={reservesSurplus}
              onChange={(e) => setReservesSurplus(e.target.value)}
            />
            <span className="inst-input-hint">Exclude revaluation reserves strictly under Schedule V.</span>
          </div>

          <div className="inst-input-group">
            <label htmlFor={loansId} className="inst-input-label">
              Long-Term Loans Repayable After 1 Year (₹)
            </label>
            <input
              id={loansId}
              type="number"
              step="any"
              className="inst-input-text"
              placeholder="Enter long-term borrowings"
              value={longTermLoans}
              onChange={(e) => setLongTermLoans(e.target.value)}
            />
            <span className="inst-input-hint">Exclude bank working capital loans, cash credit &amp; overdrafts.</span>
          </div>

          <div className="inst-input-group">
            <label htmlFor={depositsId} className="inst-input-label">
              Long-Term Deposits Repayable After 1 Year (₹)
            </label>
            <input
              id={depositsId}
              type="number"
              step="any"
              className="inst-input-text"
              placeholder="Enter term deposits"
              value={deposits}
              onChange={(e) => setDeposits(e.target.value)}
            />
          </div>

          <div className="inst-section-title" style={{ marginTop: '1.25rem' }}>
            <span>2. Deductions under Schedule V</span>
          </div>

          <div className="inst-checkbox-row" style={{ marginBottom: '0.75rem' }}>
            <label className="inst-checkbox-label">
              <input
                type="checkbox"
                checked={isInvestmentCompany}
                onChange={(e) => setIsInvestmentCompany(e.target.checked)}
              />
              <span>Entity is an Investment Company (Investments exempt from deduction)</span>
            </label>
          </div>

          <div className="inst-input-group">
            <label htmlFor={investmentsId} className="inst-input-label">
              Investments (₹)
            </label>
            <input
              id={investmentsId}
              type="number"
              step="any"
              disabled={isInvestmentCompany}
              className="inst-input-text"
              placeholder={isInvestmentCompany ? 'Exempt for investment companies' : 'Enter book value of investments'}
              value={investments}
              onChange={(e) => setInvestments(e.target.value)}
            />
          </div>

          <div className="inst-input-group">
            <label htmlFor={lossesId} className="inst-input-label">
              Accumulated Losses (₹)
            </label>
            <input
              id={lossesId}
              type="number"
              step="any"
              className="inst-input-text"
              placeholder="Enter carried forward losses"
              value={accumulatedLosses}
              onChange={(e) => setAccumulatedLosses(e.target.value)}
            />
          </div>

          <div className="inst-input-group">
            <label htmlFor={prelimId} className="inst-input-label">
              Preliminary Expenses Not Written Off (₹)
            </label>
            <input
              id={prelimId}
              type="number"
              step="any"
              className="inst-input-text"
              placeholder="Enter unamortized preliminary expenses"
              value={preliminaryExpenses}
              onChange={(e) => setPreliminaryExpenses(e.target.value)}
            />
          </div>
        </div>

        {/* Right Ledger Summary */}
        <div className="inst-result-col">
          <div className="inst-section-title">
            <span>Schedule V Effective Capital Assessment</span>
          </div>

          {!hasData ? (
            <div className="inst-empty-notice">
              Enter capital, reserves, and loan balances on the left to compute statutory Effective Capital and assess allowable managerial remuneration under Schedule V.
            </div>
          ) : (
            <>
              <div className="inst-kpi-grid">
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Capital &amp; Debt (A)</span>
                  <span className="inst-kpi-value">{formatINR(totalCapitalAndDebt)}</span>
                </div>
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Deductions (B)</span>
                  <span className="inst-kpi-value" style={{ color: '#b91c1c' }}>
                    -{formatINR(totalDeductions)}
                  </span>
                </div>
                <div className="inst-kpi-card inst-kpi-card--primary">
                  <span className="inst-kpi-label">Effective Capital</span>
                  <span className="inst-kpi-value">{formatINR(effectiveCapital)}</span>
                </div>
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Capital in Crores</span>
                  <span className="inst-kpi-value" style={{ color: '#1e3a8a' }}>
                    {formatCrores(effectiveCapital)}
                  </span>
                </div>
              </div>

              {/* Schedule V Statutory Managerial Remuneration Scale */}
              <div className="inst-section-title" style={{ marginTop: '1.25rem' }}>
                <span>Schedule V Remuneration Thresholds (Loss / Inadequate Profit)</span>
              </div>

              <div className="inst-statutory-notice" style={{ marginBottom: '1rem' }}>
                <strong>Applicable Capital Tier:</strong> {tierLabel}
              </div>

              <div className="inst-table-wrap">
                <table className="inst-data-table">
                  <thead>
                    <tr>
                      <th>Effective Capital Range</th>
                      <th>Ordinary Resolution Cap</th>
                      <th>Special Resolution Cap (Doubled)</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ background: effectiveCapitalCrores < 5 ? '#eff6ff' : 'transparent' }}>
                      <td style={{ fontWeight: 600 }}>Negative or &lt; ₹5 Crore</td>
                      <td>₹60 Lakhs / yr</td>
                      <td>₹120 Lakhs / yr</td>
                      <td>
                        {effectiveCapitalCrores < 5 ? (
                          <span className="inst-chip inst-chip--blue">Current Tier</span>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                    <tr
                      style={{
                        background:
                          effectiveCapitalCrores >= 5 && effectiveCapitalCrores < 100
                            ? '#eff6ff'
                            : 'transparent',
                      }}
                    >
                      <td style={{ fontWeight: 600 }}>₹5 Crore to &lt; ₹100 Crore</td>
                      <td>₹84 Lakhs / yr</td>
                      <td>₹168 Lakhs / yr</td>
                      <td>
                        {effectiveCapitalCrores >= 5 && effectiveCapitalCrores < 100 ? (
                          <span className="inst-chip inst-chip--blue">Current Tier</span>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                    <tr
                      style={{
                        background:
                          effectiveCapitalCrores >= 100 && effectiveCapitalCrores < 250
                            ? '#eff6ff'
                            : 'transparent',
                      }}
                    >
                      <td style={{ fontWeight: 600 }}>₹100 Crore to &lt; ₹250 Crore</td>
                      <td>₹120 Lakhs / yr</td>
                      <td>₹240 Lakhs / yr</td>
                      <td>
                        {effectiveCapitalCrores >= 100 && effectiveCapitalCrores < 250 ? (
                          <span className="inst-chip inst-chip--blue">Current Tier</span>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                    <tr style={{ background: effectiveCapitalCrores >= 250 ? '#eff6ff' : 'transparent' }}>
                      <td style={{ fontWeight: 600 }}>₹250 Crore and above</td>
                      <td>₹120L + 0.01% of excess</td>
                      <td>Doubled with Special Res.</td>
                      <td>
                        {effectiveCapitalCrores >= 250 ? (
                          <span className="inst-chip inst-chip--blue">Current Tier</span>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={{ fontWeight: 700 }}>Computed Permissible Remuneration</td>
                      <td style={{ fontWeight: 700, color: '#1e3a8a' }}>
                        ₹{standardLimitLakhs.toFixed(2)} Lakhs
                      </td>
                      <td style={{ fontWeight: 700, color: '#047857' }}>
                        ₹{specialResolutionLimitLakhs.toFixed(2)} Lakhs
                      </td>
                      <td style={{ fontSize: '0.75rem', color: '#64748b' }}>Per Manager / Year</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="inst-actions-bar" style={{ marginTop: '1.25rem' }}>
                <button type="button" className="inst-action-btn" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <CheckIcon size={15} />
                      <span>Copied Schedule V Statement</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={15} />
                      <span>Copy Schedule V Statement</span>
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

