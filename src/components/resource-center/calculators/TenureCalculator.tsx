'use client'

import React, { useState, useId } from 'react'
import { CopyIcon, CheckIcon } from '../Icons'

export default function TenureCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('')
  const [installmentAmount, setInstallmentAmount] = useState<string>('')
  const [interestRate, setInterestRate] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const loanId = useId()
  const installmentId = useId()
  const rateId = useId()

  const numLoan = Math.max(0, parseFloat(loanAmount) || 0)
  const numInstallment = Math.max(0, parseFloat(installmentAmount) || 0)
  const numRate = Math.max(0, parseFloat(interestRate) || 0)

  const monthlyRate = numRate > 0 ? numRate / 12 / 100 : 0
  const monthlyInterestObligation = numLoan * monthlyRate

  let totalMonths = 0
  let isUnderpaying = false
  let totalInterest = 0
  let totalPayment = 0

  if (numLoan > 0 && numInstallment > 0) {
    if (monthlyRate > 0) {
      if (numInstallment <= monthlyInterestObligation) {
        isUnderpaying = true
      } else {
        // n = -ln(1 - P*r/PMT) / ln(1+r)
        const n = -Math.log(1 - (numLoan * monthlyRate) / numInstallment) / Math.log(1 + monthlyRate)
        totalMonths = Math.ceil(n)
        totalPayment = numInstallment * totalMonths
        totalInterest = totalPayment - numLoan
      }
    } else {
      // 0% interest
      totalMonths = Math.ceil(numLoan / numInstallment)
      totalPayment = numLoan
      totalInterest = 0
    }
  }

  const tenureYears = Math.floor(totalMonths / 12)
  const remainingMonths = totalMonths % 12

  const hasData = loanAmount !== '' || installmentAmount !== '' || interestRate !== ''

  const formatINR = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN')
  }

  const handleCopy = () => {
    if (totalMonths === 0 || isUnderpaying) return

    const text = `LOAN PAYOFF & NUMBER OF INSTALLMENTS ASSESSMENT
─────────────────────────────────────────────────
Financed Loan Amount       : ${formatINR(numLoan)}
Monthly Installment Amount : ${formatINR(numInstallment)}
Annual Interest Rate       : ${numRate.toFixed(2)}% p.a.
Monthly Interest Burden    : ${formatINR(monthlyInterestObligation)}
─────────────────────────────────────────────────
COMPUTED TENURE OUTCOME:
• Number of Installments   : ${totalMonths} Monthly Installments
• Payoff Duration          : ${tenureYears} Years, ${remainingMonths} Months
• Total Interest Payable   : ${formatINR(totalInterest)}
• Total Repayment Outflow  : ${formatINR(totalPayment)}
─────────────────────────────────────────────────
Generated via Team Eyrie Resource Center • Banking & Debt Advisory`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="inst-tool-card">
      <div className="inst-tool-header">
        <div>
          <span className="inst-meta-tag">DEBT AMORTIZATION • PAYOFF TENURE SOLVER</span>
          <h2 className="inst-tool-title">Get Number of Installments Calculator</h2>
          <p className="inst-tool-desc">
            Calculate the exact number of monthly installments and years required to fully payoff a loan given a fixed repayment installment budget and interest rate.
          </p>
        </div>
        <div className="inst-tool-header-badge">
          <span>Tenure Solver</span>
        </div>
      </div>

      <div className="inst-form-layout">
        {/* Left Inputs */}
        <div className="inst-form-col">
          <div className="inst-section-title">
            <span>Loan &amp; Repayment Target</span>
          </div>

          <div className="inst-input-group">
            <label htmlFor={loanId} className="inst-input-label">
              Total Loan Principal Amount (₹)
            </label>
            <input
              id={loanId}
              type="number"
              step="any"
              className="inst-input-text"
              placeholder="Enter outstanding principal (e.g. 1000000)"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>

          <div className="inst-input-group">
            <label htmlFor={installmentId} className="inst-input-label">
              Target Monthly Installment Amount (₹)
            </label>
            <input
              id={installmentId}
              type="number"
              step="any"
              className="inst-input-text"
              placeholder="Enter monthly payment budget (e.g. 25000)"
              value={installmentAmount}
              onChange={(e) => setInstallmentAmount(e.target.value)}
            />
            <span className="inst-input-hint">
              Installment must be greater than the monthly interest cost ({formatINR(monthlyInterestObligation)}).
            </span>
          </div>

          <div className="inst-input-group">
            <label htmlFor={rateId} className="inst-input-label">
              Interest Rate (% p.a.)
            </label>
            <input
              id={rateId}
              type="number"
              step="0.01"
              className="inst-input-text"
              placeholder="Enter annual interest rate (e.g. 9.5)"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>

          <div className="inst-statutory-notice" style={{ marginTop: '1.25rem' }}>
            <strong>Mathematical Amortization Limb:</strong>
            <p>
              Solved via exact logarithmic debt decay formula n = -ln(1 - (P * r) / PMT) / ln(1 + r), determining the exact terminal period where the outstanding loan balance decays to zero.
            </p>
          </div>
        </div>

        {/* Right Results Ledger */}
        <div className="inst-result-col">
          <div className="inst-section-title">
            <span>Payoff Outcome &amp; Duration Schedule</span>
          </div>

          {!hasData || numLoan === 0 || numInstallment === 0 ? (
            <div className="inst-empty-notice">
              Enter loan amount, monthly installment budget, and interest rate on the left to compute the exact number of monthly installments and payoff tenure.
            </div>
          ) : isUnderpaying ? (
            <div className="inst-statutory-notice" style={{ borderLeftColor: '#b91c1c', background: '#fef2f2' }}>
              <strong style={{ color: '#b91c1c' }}>Repayment Warning: Insufficient Installment Amount</strong>
              <p style={{ color: '#7f1d1d' }}>
                Your installment of {formatINR(numInstallment)} is less than or equal to the first month&apos;s interest obligation ({formatINR(monthlyInterestObligation)}). The loan balance will never reduce. Please increase your monthly installment budget above {formatINR(monthlyInterestObligation)}.
              </p>
            </div>
          ) : (
            <>
              <div className="inst-kpi-grid">
                <div className="inst-kpi-card inst-kpi-card--primary">
                  <span className="inst-kpi-label">Required Installments</span>
                  <span className="inst-kpi-value">{totalMonths} Months</span>
                </div>
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Tenure Duration</span>
                  <span className="inst-kpi-value" style={{ color: '#1e3a8a' }}>
                    {tenureYears} Yrs {remainingMonths} Mo
                  </span>
                </div>
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Total Interest Paid</span>
                  <span className="inst-kpi-value" style={{ color: '#b91c1c' }}>
                    {formatINR(totalInterest)}
                  </span>
                </div>
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Total Cash Outflow</span>
                  <span className="inst-kpi-value">{formatINR(totalPayment)}</span>
                </div>
              </div>

              {/* Statement breakdown */}
              <div className="inst-section-title" style={{ marginTop: '1.25rem' }}>
                <span>Amortization Summary Statement</span>
              </div>

              <div className="inst-table-wrap">
                <table className="inst-data-table">
                  <tbody>
                    <tr>
                      <td>Initial Loan Balance</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatINR(numLoan)}</td>
                    </tr>
                    <tr>
                      <td>Monthly Installment Repayment</td>
                      <td style={{ textAlign: 'right', color: '#1e3a8a', fontWeight: 600 }}>
                        {formatINR(numInstallment)} / mo
                      </td>
                    </tr>
                    <tr>
                      <td>First Month Interest Outflow</td>
                      <td style={{ textAlign: 'right', color: '#64748b' }}>
                        {formatINR(monthlyInterestObligation)}
                      </td>
                    </tr>
                    <tr>
                      <td>First Month Principal Amortization</td>
                      <td style={{ textAlign: 'right', color: '#047857', fontWeight: 600 }}>
                        {formatINR(numInstallment - monthlyInterestObligation)}
                      </td>
                    </tr>
                    <tr style={{ background: '#f8fafc' }}>
                      <td style={{ fontWeight: 600 }}>Total Number of Installments</td>
                      <td style={{ textAlign: 'right', fontWeight: 700 }}>
                        {totalMonths} Monthly Installments
                      </td>
                    </tr>
                    <tr>
                      <td>Total Interest Across Amortization</td>
                      <td style={{ textAlign: 'right', color: '#b91c1c', fontWeight: 600 }}>
                        {formatINR(totalInterest)}
                      </td>
                    </tr>
                    <tr style={{ background: '#0f172a', color: '#ffffff' }}>
                      <td style={{ fontWeight: 700 }}>Total Principal + Interest Repaid</td>
                      <td style={{ textAlign: 'right', fontWeight: 700 }}>{formatINR(totalPayment)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="inst-actions-bar" style={{ marginTop: '1.25rem' }}>
                <button type="button" className="inst-action-btn" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <CheckIcon size={15} />
                      <span>Copied Installment Statement</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={15} />
                      <span>Copy Installment Statement</span>
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
