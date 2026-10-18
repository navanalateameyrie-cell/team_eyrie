'use client'

import React, { useState, useId } from 'react'
import { TDS_RATES_DATA } from '@/data/resource-center/tdsRates'
import { CopyIcon, CheckIcon } from '../Icons'

const PRESET_INVOICES = [30000, 50000, 100000, 250000, 500000]

export default function TdsCalculator() {
  const [selectedSection, setSelectedSection] = useState<string>('194J(b)')
  const [payeeType, setPayeeType] = useState<'individual' | 'company'>('individual')
  const [hasPan, setHasPan] = useState<boolean>(true)
  const [billAmount, setBillAmount] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const billAmountInputId = useId()

  const currentEntry =
    TDS_RATES_DATA.find((item) => item.section === selectedSection) || TDS_RATES_DATA[0]

  const numBillAmount = Math.max(0, parseFloat(billAmount) || 0)
  let normalRate = payeeType === 'individual' ? currentEntry.rateIndHuf : currentEntry.rateCompanyOthers
  const effectiveRate = !hasPan ? 20 : normalRate

  const isThresholdApplicable = numBillAmount >= currentEntry.threshold
  const tdsDeduction = isThresholdApplicable ? Math.round((numBillAmount * effectiveRate) / 100) : 0
  const netPayable = numBillAmount - tdsDeduction

  const formatInr = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  const handleCopy = () => {
    const text = `TDS WITHHOLDING TAX VOUCHER
─────────────────────────────────────────────────
Section Reference : Section ${currentEntry.section} — ${currentEntry.title}
Nature of Payment : ${currentEntry.natureOfPayment}
Payee Category    : ${payeeType === 'individual' ? 'Individual / HUF' : 'Company / Corporate Firm'}
PAN Verification  : ${hasPan ? 'Valid PAN Furnished (Normal Rate)' : 'PAN Not Furnished (Sec 206AA @ 20%)'}
Statutory Limit   : ${currentEntry.thresholdLabel}
Applicable Rate   : ${effectiveRate}%
─────────────────────────────────────────────────
Gross Bill Amount : ${formatInr(numBillAmount)}
TDS to Deduct     : -${formatInr(tdsDeduction)}
─────────────────────────────────────────────────
NET PAYABLE AMOUNT: ${formatInr(netPayable)}
─────────────────────────────────────────────────
Team Eyrie Statutory Resource Center • Chapter XVII-B Withholding`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="inst-tool-card">
      <div className="inst-tool-header">
        <div>
          <span className="inst-meta-tag">STATUTORY WITHHOLDING • CHAPTER XVII-B</span>
          <h2 className="inst-tool-title">TDS Withholding Calculator &amp; Section Lookup</h2>
          <p className="inst-tool-desc">
            Calculate statutory tax withholding under Chapter XVII-B, verify Section 206AA non-PAN rates, and compute net vendor disbursement.
          </p>
        </div>
        <div className="inst-tool-header-badge">
          <span>FY 2025-26 &amp; 2026-27</span>
        </div>
      </div>

      <div className="inst-tool-grid">
        <div className="inst-form-col">
          {/* Section Picker */}
          <div className="inst-form-row">
            <label className="inst-form-label">
              <span>TDS Section &amp; Nature of Payment</span>
              <span className="inst-form-label-hint">Threshold: {currentEntry.thresholdLabel}</span>
            </label>
            <select
              className="inst-custom-field"
              style={{ width: '100%', padding: '10px 14px', fontSize: 14 }}
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              {TDS_RATES_DATA.map((item) => (
                <option key={item.section} value={item.section}>
                  Sec {item.section} — {item.title} ({item.natureOfPayment.slice(0, 48)}...)
                </option>
              ))}
            </select>
          </div>

          {/* Payee Category */}
          <div className="inst-form-row">
            <label className="inst-form-label">Payee Legal Classification</label>
            <div className="inst-segmented-control">
              <button
                type="button"
                className={`inst-segmented-option ${payeeType === 'individual' ? 'inst-segmented-option--active' : ''}`}
                onClick={() => setPayeeType('individual')}
              >
                Individual / HUF ({currentEntry.rateIndHuf}%)
              </button>
              <button
                type="button"
                className={`inst-segmented-option ${payeeType === 'company' ? 'inst-segmented-option--active' : ''}`}
                onClick={() => setPayeeType('company')}
              >
                Company / Partnership Firm ({currentEntry.rateCompanyOthers}%)
              </button>
            </div>
          </div>

          {/* PAN Status */}
          <div className="inst-form-row">
            <label className="inst-form-label">Payee PAN Verification</label>
            <div className="inst-segmented-control">
              <button
                type="button"
                className={`inst-segmented-option ${hasPan ? 'inst-segmented-option--active' : ''}`}
                onClick={() => setHasPan(true)}
              >
                Valid PAN Available (Standard Rate)
              </button>
              <button
                type="button"
                className={`inst-segmented-option ${!hasPan ? 'inst-segmented-option--active inst-segmented-option--danger' : ''}`}
                onClick={() => setHasPan(false)}
              >
                PAN Not Available (Sec 206AA @ 20%)
              </button>
            </div>
          </div>

          {/* Invoice Amount */}
          <div className="inst-form-row">
            <label className="inst-form-label" htmlFor={billAmountInputId}>
              <span>Gross Invoice / Payment Amount</span>
              <span className="inst-currency-label">INR (₹)</span>
            </label>
            <div className="inst-currency-input-wrap">
              <span className="inst-currency-prefix">₹</span>
              <input
                id={billAmountInputId}
                type="number"
                min="0"
                step="any"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                className="inst-num-input"
                placeholder="Enter bill or invoice amount (e.g. 75000)"
              />
            </div>

            <div className="inst-preset-strip">
              <span className="inst-preset-label">Quick select:</span>
              {PRESET_INVOICES.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className={`inst-preset-pill ${billAmount === String(amt) ? 'inst-preset-pill--active' : ''}`}
                  onClick={() => setBillAmount(String(amt))}
                >
                  ₹{(amt / 1000).toLocaleString('en-IN')}k
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="inst-results-col">
          <div className="inst-statement-card">
            <div className="inst-statement-header">
              <div>
                <span className="inst-statement-sub">WITHHOLDING TAX VOUCHER</span>
                <h3 className="inst-statement-title">Section {currentEntry.section} Calculation</h3>
              </div>
              <span className="inst-statement-pill">{effectiveRate}% WITHHOLDING</span>
            </div>

            <div className="inst-statement-ledger">
              <div className="inst-ledger-line">
                <span className="inst-ledger-item">Gross Invoice Value</span>
                <span className="inst-ledger-num">{formatInr(numBillAmount)}</span>
              </div>

              <div className="inst-ledger-subgroup">
                <div className="inst-ledger-subline">
                  <span className="inst-ledger-subitem">Statutory Threshold</span>
                  <span className="inst-ledger-subnum">{currentEntry.thresholdLabel}</span>
                </div>
                <div className="inst-ledger-subline">
                  <span className="inst-ledger-subitem">Applicable TDS Rate</span>
                  <span className="inst-ledger-subnum" style={{ color: !hasPan ? '#dc2626' : '#0f274a' }}>
                    {effectiveRate}% {!hasPan && '(Higher Rate u/s 206AA)'}
                  </span>
                </div>
                <div className="inst-ledger-subline">
                  <span className="inst-ledger-subitem">Threshold Breached?</span>
                  <span className="inst-ledger-subnum" style={{ color: isThresholdApplicable ? '#16a34a' : '#64748b' }}>
                    {isThresholdApplicable ? 'Yes (TDS Required)' : 'No (Within Exemption Limit)'}
                  </span>
                </div>
              </div>

              <div className="inst-ledger-rule" />

              <div className="inst-ledger-line inst-ledger-line--highlight">
                <span className="inst-ledger-item">TDS Deduction to Remit</span>
                <span className="inst-ledger-num" style={{ color: '#dc2626' }}>-{formatInr(tdsDeduction)}</span>
              </div>
            </div>

            <div className="inst-total-box">
              <span className="inst-total-eyebrow">NET DISBURSABLE AMOUNT TO PAYEE</span>
              <div className="inst-total-figure" style={{ color: '#86efac' }}>
                {formatInr(netPayable)}
              </div>
              <div className="inst-total-meta">
                <span>Gross: {formatInr(numBillAmount)}</span>
                <span>•</span>
                <span>TDS Withheld: {formatInr(tdsDeduction)}</span>
              </div>
            </div>

            <button
              type="button"
              className={`inst-copy-btn ${copied ? 'inst-copy-btn--copied' : ''}`}
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <CheckIcon size={16} />
                  <span>Voucher Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <CopyIcon size={16} />
                  <span>Copy TDS Computation Voucher</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
