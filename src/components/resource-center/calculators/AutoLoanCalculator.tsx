'use client'

import React, { useState, useId } from 'react'
import { CopyIcon, CheckIcon } from '../Icons'

export default function AutoLoanCalculator() {
  const [purchasePrice, setPurchasePrice] = useState<string>('')
  const [gstRate, setGstRate] = useState<string>('')
  const [downPayment, setDownPayment] = useState<string>('')
  const [interestRate, setInterestRate] = useState<string>('')
  const [tenureMonths, setTenureMonths] = useState<string>('')
  const [processingFeePct, setProcessingFeePct] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const priceId = useId()
  const gstId = useId()
  const downPaymentId = useId()
  const rateId = useId()
  const tenureId = useId()
  const feeId = useId()

  const numPrice = Math.max(0, parseFloat(purchasePrice) || 0)
  const numGstPct = Math.max(0, parseFloat(gstRate) || 0)
  const numDownPayment = Math.max(0, parseFloat(downPayment) || 0)
  const numRate = Math.max(0, parseFloat(interestRate) || 0)
  const numMonths = Math.max(0, parseInt(tenureMonths, 10) || 0)
  const numFeePct = Math.max(0, parseFloat(processingFeePct) || 0)

  // Computed values
  const gstAmount = numPrice * (numGstPct / 100)
  const onRoadPrice = numPrice + gstAmount
  const loanAmount = Math.max(0, onRoadPrice - numDownPayment)

  // Monthly EMI computation: P * r * (1+r)^n / ((1+r)^n - 1)
  let emi = 0
  let totalPayment = 0
  let totalInterest = 0

  if (loanAmount > 0 && numRate > 0 && numMonths > 0) {
    const monthlyRate = numRate / 12 / 100
    emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numMonths)) / (Math.pow(1 + monthlyRate, numMonths) - 1)
    totalPayment = emi * numMonths
    totalInterest = totalPayment - loanAmount
  } else if (loanAmount > 0 && numRate === 0 && numMonths > 0) {
    emi = loanAmount / numMonths
    totalPayment = loanAmount
    totalInterest = 0
  }

  const processingFeeAmount = loanAmount * (numFeePct / 100)
  const ltvRatio = onRoadPrice > 0 ? (loanAmount / onRoadPrice) * 100 : 0

  const hasData = purchasePrice !== '' || downPayment !== '' || interestRate !== ''

  const formatINR = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN')
  }

  const handleCopy = () => {
    if (loanAmount === 0) return

    const text = `VEHICLE & AUTO LOAN FINANCING STATEMENT
─────────────────────────────────────────────────
Vehicle Purchase Price (ex-showroom) : ${formatINR(numPrice)}
GST Applicable (${numGstPct}%)                  : ${formatINR(gstAmount)}
On-Road / Invoice Price              : ${formatINR(onRoadPrice)}
Down Payment / Rebates               : ${formatINR(numDownPayment)}
─────────────────────────────────────────────────
FINANCED LOAN AMOUNT                 : ${formatINR(loanAmount)}
Loan-to-Value (LTV) Ratio            : ${ltvRatio.toFixed(1)}%
Annual Interest Rate                 : ${numRate.toFixed(2)}% p.a.
Loan Tenure                          : ${numMonths} Months (${(numMonths / 12).toFixed(1)} Years)
─────────────────────────────────────────────────
MONTHLY AUTO EMI                     : ${formatINR(emi)}
Total Interest Payable               : ${formatINR(totalInterest)}
Processing Fee (${numFeePct}%)               : ${formatINR(processingFeeAmount)}
TOTAL CASH OUTFLOW                   : ${formatINR(totalPayment + numDownPayment + processingFeeAmount)}
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
          <span className="inst-meta-tag">AUTOMOTIVE FINANCE • CONSUMER CREDIT</span>
          <h2 className="inst-tool-title">Auto Loan Calculator</h2>
          <p className="inst-tool-desc">
            Calculate vehicle financing, GST invoice price, down payment margin, loan-to-value (LTV) ratio, monthly auto EMI, and complete borrowing cost.
          </p>
        </div>
        <div className="inst-tool-header-badge">
          <span>Auto Finance</span>
        </div>
      </div>

      <div className="inst-form-layout">
        {/* Left Inputs */}
        <div className="inst-form-col">
          <div className="inst-section-title">
            <span>Vehicle &amp; Purchase Structure</span>
          </div>

          <div className="inst-input-group">
            <label htmlFor={priceId} className="inst-input-label">
              Vehicle Purchase Price (Before Tax) (₹)
            </label>
            <input
              id={priceId}
              type="number"
              step="any"
              className="inst-input-text"
              placeholder="Enter ex-showroom price (e.g. 1200000)"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
            />
          </div>

          <div className="inst-input-group">
            <label htmlFor={gstId} className="inst-input-label">
              Applicable GST + Cess (%)
            </label>
            <input
              id={gstId}
              type="number"
              step="0.01"
              className="inst-input-text"
              placeholder="Enter GST rate (e.g. 18 or 28)"
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
            />
            <span className="inst-input-hint">Typically 18% for commercial/EVs, 28% for passenger cars (+ cess).</span>
          </div>

          <div className="inst-input-group">
            <label htmlFor={downPaymentId} className="inst-input-label">
              Down Payment or Trade-in Rebates (₹)
            </label>
            <input
              id={downPaymentId}
              type="number"
              step="any"
              className="inst-input-text"
              placeholder="Enter upfront down payment (e.g. 250000)"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
            />
          </div>

          <div className="inst-section-title" style={{ marginTop: '1.25rem' }}>
            <span>Loan Terms</span>
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
              placeholder="Enter interest rate (e.g. 8.75)"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>

          <div className="inst-input-group">
            <label htmlFor={tenureId} className="inst-input-label">
              Number of Monthly Payments (Tenure in Months)
            </label>
            <input
              id={tenureId}
              type="number"
              step="1"
              className="inst-input-text"
              placeholder="Enter tenure in months (e.g. 60 for 5 years)"
              value={tenureMonths}
              onChange={(e) => setTenureMonths(e.target.value)}
            />
            <span className="inst-input-hint">36 mo (3 yrs), 60 mo (5 yrs), 84 mo (7 yrs).</span>
          </div>

          <div className="inst-input-group">
            <label htmlFor={feeId} className="inst-input-label">
              Bank Processing Fee (% of loan, optional)
            </label>
            <input
              id={feeId}
              type="number"
              step="0.01"
              className="inst-input-text"
              placeholder="Enter processing fee % (e.g. 0.5)"
              value={processingFeePct}
              onChange={(e) => setProcessingFeePct(e.target.value)}
            />
          </div>
        </div>

        {/* Right Results Ledger */}
        <div className="inst-result-col">
          <div className="inst-section-title">
            <span>Financing Summary &amp; Monthly Installment</span>
          </div>

          {!hasData || loanAmount === 0 ? (
            <div className="inst-empty-notice">
              Enter vehicle purchase price, down payment, interest rate, and tenure months on the left to compute loan EMI and complete cost statement.
            </div>
          ) : (
            <>
              <div className="inst-kpi-grid">
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">On-Road / Invoice Price</span>
                  <span className="inst-kpi-value">{formatINR(onRoadPrice)}</span>
                </div>
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Financed Loan Amount</span>
                  <span className="inst-kpi-value" style={{ color: '#1e3a8a' }}>
                    {formatINR(loanAmount)}
                  </span>
                </div>
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Loan-to-Value (LTV)</span>
                  <span className="inst-kpi-value">{ltvRatio.toFixed(1)}%</span>
                </div>
                <div className="inst-kpi-card inst-kpi-card--primary">
                  <span className="inst-kpi-label">Monthly Auto EMI</span>
                  <span className="inst-kpi-value">{formatINR(emi)}</span>
                </div>
              </div>

              {/* Ledger breakdown */}
              <div className="inst-section-title" style={{ marginTop: '1.25rem' }}>
                <span>Repayment &amp; Total Outflow Statement</span>
              </div>

              <div className="inst-table-wrap">
                <table className="inst-data-table">
                  <tbody>
                    <tr>
                      <td>Ex-Showroom Price</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatINR(numPrice)}</td>
                    </tr>
                    <tr>
                      <td>GST &amp; Statutory Cess ({numGstPct}%)</td>
                      <td style={{ textAlign: 'right', color: '#64748b' }}>+{formatINR(gstAmount)}</td>
                    </tr>
                    <tr style={{ background: '#f8fafc' }}>
                      <td style={{ fontWeight: 600 }}>Total Vehicle Invoice Price</td>
                      <td style={{ textAlign: 'right', fontWeight: 700 }}>{formatINR(onRoadPrice)}</td>
                    </tr>
                    <tr>
                      <td>Less: Down Payment Paid Upfront</td>
                      <td style={{ textAlign: 'right', color: '#047857', fontWeight: 600 }}>
                        -{formatINR(numDownPayment)}
                      </td>
                    </tr>
                    <tr style={{ background: '#eff6ff' }}>
                      <td style={{ fontWeight: 700, color: '#1e3a8a' }}>Principal Financed</td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: '#1e3a8a' }}>
                        {formatINR(loanAmount)}
                      </td>
                    </tr>
                    <tr>
                      <td>Total Interest Over {numMonths} Months</td>
                      <td style={{ textAlign: 'right', color: '#b91c1c', fontWeight: 600 }}>
                        +{formatINR(totalInterest)}
                      </td>
                    </tr>
                    {numFeePct > 0 && (
                      <tr>
                        <td>Upfront Processing Fee ({numFeePct}%)</td>
                        <td style={{ textAlign: 'right', color: '#64748b' }}>
                          +{formatINR(processingFeeAmount)}
                        </td>
                      </tr>
                    )}
                    <tr style={{ background: '#0f172a', color: '#ffffff' }}>
                      <td style={{ fontWeight: 700 }}>Total Repayment Outflow (Loan + Down Payment)</td>
                      <td style={{ textAlign: 'right', fontWeight: 700 }}>
                        {formatINR(totalPayment + numDownPayment + processingFeeAmount)}
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
                      <span>Copied Auto Loan Statement</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={15} />
                      <span>Copy Auto Loan Statement</span>
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

