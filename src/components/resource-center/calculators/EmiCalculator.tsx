'use client'

import React, { useState, useId } from 'react'
import { CopyIcon, CheckIcon } from '../Icons'

const QUICK_AMOUNTS = [1000000, 2500000, 5000000, 10000000, 20000000]

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState<string>('')
  const [interestRate, setInterestRate] = useState<string>('')
  const [tenureYears, setTenureYears] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const principalInputId = useId()
  const interestRateInputId = useId()
  const tenureInputId = useId()

  const formatInr = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  const P = Math.max(0, parseFloat(principal) || 0)
  const annualR = Math.max(0, parseFloat(interestRate) || 0)
  const numTenureYears = Math.max(0, parseInt(tenureYears, 10) || 0)
  const r = annualR > 0 ? annualR / (12 * 100) : 0
  const n = numTenureYears > 0 ? numTenureYears * 12 : 0

  let emi = 0
  let totalPayment = 0
  let totalInterest = 0

  if (P > 0 && n > 0) {
    if (r > 0) {
      emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
      totalPayment = emi * n
      totalInterest = Math.max(0, totalPayment - P)
    } else {
      emi = Math.round(P / n)
      totalPayment = P
      totalInterest = 0
    }
  }

  // Yearly Amortization Schedule
  const schedule: {
    year: number
    openingBalance: number
    principalPaid: number
    interestPaid: number
    closingBalance: number
  }[] = []

  if (P > 0 && n > 0 && emi > 0) {
    let currentBalance = P
    for (let year = 1; year <= Math.min(numTenureYears, 30); year++) {
      const openingBalance = currentBalance
      let yearlyInterest = 0
      let yearlyPrincipal = 0

      for (let month = 1; month <= 12; month++) {
        if (currentBalance <= 0) break
        const interestForMonth = currentBalance * r
        const principalForMonth = Math.min(currentBalance, emi - interestForMonth)

        yearlyInterest += interestForMonth
        yearlyPrincipal += principalForMonth
        currentBalance -= principalForMonth
      }

      schedule.push({
        year,
        openingBalance: Math.round(openingBalance),
        principalPaid: Math.round(yearlyPrincipal),
        interestPaid: Math.round(yearlyInterest),
        closingBalance: Math.max(0, Math.round(currentBalance)),
      })

      if (currentBalance <= 0) break
    }
  }

  const principalPercent = totalPayment > 0 ? Math.round((P / totalPayment) * 100) : 100
  const interestPercent = totalPayment > 0 ? 100 - principalPercent : 0

  const handleCopy = () => {
    const text = `LOAN EMI & AMORTIZATION SUMMARY
─────────────────────────────────────────────────
Loan Principal   : ${formatInr(P)}
Annual Rate      : ${annualR}% p.a.
Tenure           : ${numTenureYears} Years (${n} Months)
─────────────────────────────────────────────────
MONTHLY EMI      : ${formatInr(emi)}
Total Interest   : ${formatInr(totalInterest)} (${interestPercent}%)
Total Outflow    : ${formatInr(totalPayment)}
─────────────────────────────────────────────────
Generated via Team Eyrie Resource Center • Banking & Corporate Finance`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="inst-tool-card">
      <div className="inst-tool-header">
        <div>
          <span className="inst-meta-tag">CORPORATE FINANCE &amp; BANKING</span>
          <h2 className="inst-tool-title">Loan EMI &amp; Amortization Calculator</h2>
          <p className="inst-tool-desc">
            Compute term loans, debt financing, and commercial mortgage installments with annual principal vs. interest amortization breakdown.
          </p>
        </div>
        <div className="inst-tool-header-badge">
          <span>Standard Amortization</span>
        </div>
      </div>

      <div className="inst-tool-grid">
        <div className="inst-form-col">
          {/* Principal */}
          <div className="inst-form-row">
            <label className="inst-form-label" htmlFor={principalInputId}>
              <span>Principal Borrowing Amount</span>
              <span className="inst-currency-label">INR (₹)</span>
            </label>
            <div className="inst-currency-input-wrap">
              <span className="inst-currency-prefix">₹</span>
              <input
                id={principalInputId}
                type="number"
                min="0"
                step="any"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="inst-num-input"
                placeholder="Enter borrowing amount (e.g. 5000000)"
              />
            </div>

            <div className="inst-preset-strip">
              <span className="inst-preset-label">Presets:</span>
              {QUICK_AMOUNTS.map((q) => (
                <button
                  key={q}
                  type="button"
                  className={`inst-preset-pill ${principal === String(q) ? 'inst-preset-pill--active' : ''}`}
                  onClick={() => setPrincipal(String(q))}
                >
                  ₹{(q / 100000).toLocaleString('en-IN')}L
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate & Tenure */}
          <div className="inst-form-row">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label className="inst-form-label" htmlFor={interestRateInputId}>
                  <span>Interest Rate (% p.a.)</span>
                </label>
                <div className="inst-custom-input-box" style={{ width: '100%' }}>
                  <input
                    id={interestRateInputId}
                    type="number"
                    min="0"
                    max="100"
                    step="any"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="inst-custom-field"
                    placeholder="e.g. 8.5"
                  />
                  <span className="inst-custom-symbol">%</span>
                </div>
              </div>

              <div>
                <label className="inst-form-label" htmlFor={tenureInputId}>
                  <span>Tenure (Years)</span>
                </label>
                <div className="inst-custom-input-box" style={{ width: '100%' }}>
                  <input
                    id={tenureInputId}
                    type="number"
                    min="1"
                    max="50"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(e.target.value)}
                    className="inst-custom-field"
                    placeholder="e.g. 15"
                  />
                  <span className="inst-custom-symbol">Yrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Ratio Bar */}
          <div className="inst-split-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontWeight: 700, marginBottom: 8 }}>
              <span style={{ color: '#0f274a' }}>Principal: {principalPercent}%</span>
              <span style={{ color: '#ea580c' }}>Interest: {interestPercent}%</span>
            </div>
            <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', background: '#e2e8f0' }}>
              <div style={{ width: `${principalPercent}%`, backgroundColor: '#0f274a' }} />
              <div style={{ width: `${interestPercent}%`, backgroundColor: '#ea580c' }} />
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="inst-results-col">
          <div className="inst-statement-card">
            <div className="inst-statement-header">
              <div>
                <span className="inst-statement-sub">LOAN SERVICE VOUCHER</span>
                <h3 className="inst-statement-title">Repayment Breakdown</h3>
              </div>
              <span className="inst-statement-pill">{numTenureYears > 0 ? `${numTenureYears} YEARS TENURE` : 'LOAN TERMS'}</span>
            </div>

            <div className="inst-statement-ledger">
              <div className="inst-ledger-line">
                <span className="inst-ledger-item">Principal Borrowing</span>
                <span className="inst-ledger-num">{formatInr(P)}</span>
              </div>
              <div className="inst-ledger-line">
                <span className="inst-ledger-item">Total Interest Outflow</span>
                <span className="inst-ledger-num inst-ledger-num--accent">{formatInr(totalInterest)}</span>
              </div>
              <div className="inst-ledger-rule" />
              <div className="inst-ledger-line inst-ledger-line--highlight">
                <span className="inst-ledger-item">Total Cash Commitment</span>
                <span className="inst-ledger-num">{formatInr(totalPayment)}</span>
              </div>
            </div>

            {/* Hero EMI Card */}
            <div className="inst-total-box">
              <span className="inst-total-eyebrow">EQUATED MONTHLY INSTALLMENT (EMI)</span>
              <div className="inst-total-value">{formatInr(emi)}</div>
              <div className="inst-total-meta">
                <span>Per Month for {n} Months</span>
              </div>
            </div>

            <button
              type="button"
              className={`inst-copy-btn ${copied ? 'inst-copy-btn--success' : ''}`}
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <CheckIcon size={16} />
                  <span>EMI Details Copied!</span>
                </>
              ) : (
                <>
                  <CopyIcon size={16} />
                  <span>Copy Loan Summary</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Amortization Table */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0b1324', marginBottom: 12 }}>
          Annual Principal vs. Interest Amortization
        </h3>
        <div className="table-responsive-wrapper">
          <table className="resource-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Opening Principal</th>
                <th>Principal Repaid</th>
                <th>Interest Charged</th>
                <th>Ending Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.year}>
                  <td><strong>Year {row.year}</strong></td>
                  <td>{formatInr(row.openingBalance)}</td>
                  <td>{formatInr(row.principalPaid)}</td>
                  <td className="rate-cell" style={{ color: '#ea580c' }}>{formatInr(row.interestPaid)}</td>
                  <td>{formatInr(row.closingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
