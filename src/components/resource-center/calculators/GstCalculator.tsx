'use client'

import React, { useState, useId } from 'react'
import { CopyIcon, CheckIcon } from '../Icons'

const STANDARD_RATES = [
  { rate: 0.25, label: '0.25%', note: 'Precious Stones' },
  { rate: 3, label: '3%', note: 'Gold & Silver' },
  { rate: 5, label: '5%', note: 'Essentials' },
  { rate: 12, label: '12%', note: 'Standard Goods' },
  { rate: 18, label: '18%', note: 'Services / General' },
  { rate: 28, label: '28%', note: 'Luxury Goods' },
]

const PRESET_AMOUNTS = [10000, 50000, 100000, 500000, 1000000]

interface GstCalculatorProps {
  initialMode?: 'exclusive' | 'inclusive'
  titleOverride?: string
}

export default function GstCalculator({ initialMode = 'exclusive', titleOverride }: GstCalculatorProps = {}) {
  const [calcMode, setCalcMode] = useState<'exclusive' | 'inclusive'>(initialMode)

  React.useEffect(() => {
    if (initialMode) {
      setCalcMode(initialMode)
    }
  }, [initialMode])

  const [supplyType, setSupplyType] = useState<'intra' | 'inter'>('intra')
  const [amount, setAmount] = useState<string>('')
  const [rate, setRate] = useState<number>(18)
  const [customRate, setCustomRate] = useState<string>('')
  const [cessPercent, setCessPercent] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const amountInputId = useId()
  const customRateInputId = useId()
  const cessInputId = useId()

  const effectiveRate = customRate !== '' && !isNaN(Number(customRate)) ? Number(customRate) : rate
  const numAmount = parseFloat(amount) || 0
  const numCess = parseFloat(cessPercent) || 0

  let baseAmount = 0
  let totalTax = 0
  let cgst = 0
  let sgst = 0
  let igst = 0
  let cessAmount = 0
  let grossAmount = 0

  if (calcMode === 'exclusive') {
    baseAmount = Math.max(0, numAmount)
    const gstAmount = (baseAmount * effectiveRate) / 100
    cessAmount = (baseAmount * numCess) / 100
    totalTax = gstAmount + cessAmount
    grossAmount = baseAmount + totalTax

    if (supplyType === 'intra') {
      cgst = gstAmount / 2
      sgst = gstAmount / 2
      igst = 0
    } else {
      igst = gstAmount
      cgst = 0
      sgst = 0
    }
  } else {
    // Inclusive (MRP Reverse)
    const totalInclusive = Math.max(0, numAmount)
    const combinedRate = effectiveRate + numCess
    baseAmount = combinedRate > 0 ? (totalInclusive * 100) / (100 + combinedRate) : totalInclusive
    const gstAmount = (baseAmount * effectiveRate) / 100
    cessAmount = (baseAmount * numCess) / 100
    totalTax = gstAmount + cessAmount
    grossAmount = totalInclusive

    if (supplyType === 'intra') {
      cgst = gstAmount / 2
      sgst = gstAmount / 2
      igst = 0
    } else {
      igst = gstAmount
      cgst = 0
      sgst = 0
    }
  }

  const formatInr = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(val)
  }

  const handleCopySummary = () => {
    const text = `GST STATUTORY COMPUTATION VOUCHER
─────────────────────────────────────────────────
Mode of Computation : ${calcMode === 'exclusive' ? 'Exclusive of Tax (Base + GST)' : 'Inclusive of Tax (MRP Reverse Tax Extraction)'}
Transaction Supply  : ${supplyType === 'intra' ? 'Intra-State (CGST + SGST Split)' : 'Inter-State (IGST 100%)'}
Statutory GST Slab  : ${effectiveRate}% ${numCess > 0 ? `+ ${numCess}% Cess` : ''}
─────────────────────────────────────────────────
Taxable Base Value  : ${formatInr(baseAmount)}
${supplyType === 'intra'
        ? `Central Tax (CGST @ ${effectiveRate / 2}%) : ${formatInr(cgst)}\nState Tax (SGST @ ${effectiveRate / 2}%)   : ${formatInr(sgst)}`
        : `Integrated Tax (IGST @ ${effectiveRate}%) : ${formatInr(igst)}`
      }
${numCess > 0 ? `Compensation Cess (${numCess}%)  : ${formatInr(cessAmount)}\n` : ''}Total Tax Liability : ${formatInr(totalTax)}
─────────────────────────────────────────────────
GROSS INVOICE TOTAL : ${formatInr(grossAmount)}
─────────────────────────────────────────────────
Team Eyrie Statutory Resource Center • Compliant with CGST & IGST Acts`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="inst-tool-card">
      {/* Tool Header */}
      <div className="inst-tool-header">
        <div>
          <span className="inst-meta-tag">INDIRECT TAXATION • CGST &amp; IGST ACT 2017</span>
          <h2 className="inst-tool-title">
            {titleOverride || (calcMode === 'inclusive' ? 'GST MRP Calculator (Reverse Method)' : 'GST Multi-Rate Calculator')}
          </h2>
          <p className="inst-tool-desc">
            Compute forward GST additions or reverse-calculate taxable consideration from gross retail MRP with statutory CGST, SGST, and IGST apportionment.
          </p>
        </div>
        <div className="inst-tool-header-badge">
          <span>FY 2025-26 &amp; 2026-27</span>
        </div>
      </div>

      <div className="inst-tool-grid">
        {/* Form Inputs (Left Column) */}
        <div className="inst-form-col">
          {/* Calculation Mode */}
          <div className="inst-form-row">
            <label className="inst-form-label">
              <span>Calculation Method</span>
              <span className="inst-form-label-hint">
                {calcMode === 'exclusive' ? 'Compute GST on net price' : 'Extract base price from MRP'}
              </span>
            </label>
            <div className="inst-segmented-control">
              <button
                type="button"
                className={`inst-segmented-option ${calcMode === 'exclusive' ? 'inst-segmented-option--active' : ''}`}
                onClick={() => setCalcMode('exclusive')}
              >
                Exclusive of Tax (Base + GST)
              </button>
              <button
                type="button"
                className={`inst-segmented-option ${calcMode === 'inclusive' ? 'inst-segmented-option--active' : ''}`}
                onClick={() => setCalcMode('inclusive')}
              >
                Inclusive of Tax (MRP Reverse)
              </button>
            </div>
          </div>

          {/* Supply Type */}
          <div className="inst-form-row">
            <label className="inst-form-label">
              <span>Transaction Supply Type</span>
              <span className="inst-form-label-hint">
                {supplyType === 'intra' ? 'Same State: CGST (50%) + SGST (50%)' : 'Inter-State: IGST (100%)'}
              </span>
            </label>
            <div className="inst-segmented-control">
              <button
                type="button"
                className={`inst-segmented-option ${supplyType === 'intra' ? 'inst-segmented-option--active' : ''}`}
                onClick={() => setSupplyType('intra')}
              >
                Intra-State (Within Same State)
              </button>
              <button
                type="button"
                className={`inst-segmented-option ${supplyType === 'inter' ? 'inst-segmented-option--active' : ''}`}
                onClick={() => setSupplyType('inter')}
              >
                Inter-State (Outside State)
              </button>
            </div>
          </div>

          {/* Amount Input */}
          <div className="inst-form-row">
            <label className="inst-form-label" htmlFor={amountInputId}>
              <span>{calcMode === 'exclusive' ? 'Taxable Amount (Excl. Tax)' : 'Gross MRP Value (Incl. Tax)'}</span>
              <span className="inst-currency-label">INR (₹)</span>
            </label>
            <div className="inst-currency-input-wrap">
              <span className="inst-currency-prefix">₹</span>
              <input
                id={amountInputId}
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="inst-num-input"
                placeholder="Enter taxable amount (e.g. 100000)"
              />
            </div>

            {/* Presets */}
            <div className="inst-preset-strip">
              <span className="inst-preset-label">Quick select:</span>
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className={`inst-preset-pill ${amount === String(amt) ? 'inst-preset-pill--active' : ''}`}
                  onClick={() => setAmount(String(amt))}
                >
                  ₹{(amt / 1000).toLocaleString('en-IN')}k
                </button>
              ))}
            </div>
          </div>

          {/* Rate Selector */}
          <div className="inst-form-row">
            <label className="inst-form-label">
              <span>Statutory GST Tax Slab</span>
              <span className="inst-form-label-hint">Current: {effectiveRate}%</span>
            </label>
            <div className="inst-rate-grid">
              {STANDARD_RATES.map((item) => {
                const isSelected = effectiveRate === item.rate && customRate === ''
                return (
                  <button
                    key={item.rate}
                    type="button"
                    className={`inst-rate-card ${isSelected ? 'inst-rate-card--active' : ''}`}
                    onClick={() => {
                      setRate(item.rate)
                      setCustomRate('')
                    }}
                  >
                    <span className="inst-rate-pct">{item.label}</span>
                    <span className="inst-rate-sub">{item.note}</span>
                  </button>
                )
              })}
            </div>

            {/* Custom rate */}
            <div className="inst-custom-rate-row">
              <span className="inst-custom-rate-text">Or custom rate:</span>
              <div className="inst-custom-input-box">
                <input
                  id={customRateInputId}
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="e.g. 7.5"
                  value={customRate}
                  onChange={(e) => setCustomRate(e.target.value)}
                  className="inst-custom-field"
                />
                <span className="inst-custom-symbol">%</span>
              </div>
            </div>
          </div>

          {/* Compensation Cess */}
          <div className="inst-form-row">
            <label className="inst-form-label" htmlFor={cessInputId}>
              <span>Compensation Cess % (Optional)</span>
              <span className="inst-form-label-hint">For motor vehicles, luxury goods, aerated beverages</span>
            </label>
            <div className="inst-custom-input-box" style={{ maxWidth: 160 }}>
              <input
                id={cessInputId}
                type="number"
                min="0"
                max="100"
                step="any"
                value={cessPercent}
                onChange={(e) => setCessPercent(e.target.value)}
                className="inst-custom-field"
                placeholder="0"
              />
              <span className="inst-custom-symbol">% Cess</span>
            </div>
          </div>
        </div>

        {/* Results Statement (Right Column) */}
        <div className="inst-results-col">
          <div className="inst-statement-card">
            {/* Statement Header */}
            <div className="inst-statement-header">
              <div>
                <span className="inst-statement-sub">STATUTORY COMPUTATION STATEMENT</span>
                <h3 className="inst-statement-title">Tax Apportionment Breakdown</h3>
              </div>
              <span className="inst-statement-pill">
                {supplyType === 'intra' ? 'INTRA-STATE' : 'INTER-STATE'}
              </span>
            </div>

            {/* Statement Ledger */}
            <div className="inst-statement-ledger">
              <div className="inst-ledger-line">
                <span className="inst-ledger-item">Taxable Base Consideration</span>
                <span className="inst-ledger-num">{formatInr(baseAmount)}</span>
              </div>

              <div className="inst-ledger-subgroup">
                {supplyType === 'intra' ? (
                  <>
                    <div className="inst-ledger-subline">
                      <span className="inst-ledger-subitem">
                        <span className="inst-tax-badge">CGST</span> Central Tax ({effectiveRate / 2}%)
                      </span>
                      <span className="inst-ledger-subnum">{formatInr(cgst)}</span>
                    </div>
                    <div className="inst-ledger-subline">
                      <span className="inst-ledger-subitem">
                        <span className="inst-tax-badge">SGST</span> State Tax ({effectiveRate / 2}%)
                      </span>
                      <span className="inst-ledger-subnum">{formatInr(sgst)}</span>
                    </div>
                  </>
                ) : (
                  <div className="inst-ledger-subline">
                    <span className="inst-ledger-subitem">
                      <span className="inst-tax-badge inst-tax-badge--blue">IGST</span> Integrated Tax ({effectiveRate}%)
                    </span>
                    <span className="inst-ledger-subnum">{formatInr(igst)}</span>
                  </div>
                )}

                {numCess > 0 && (
                  <div className="inst-ledger-subline">
                    <span className="inst-ledger-subitem">
                      <span className="inst-tax-badge inst-tax-badge--red">CESS</span> Compensation Cess ({cessPercent}%)
                    </span>
                    <span className="inst-ledger-subnum">{formatInr(cessAmount)}</span>
                  </div>
                )}
              </div>

              <div className="inst-ledger-rule" />

              <div className="inst-ledger-line inst-ledger-line--highlight">
                <span className="inst-ledger-item">Total GST Liability</span>
                <span className="inst-ledger-num inst-ledger-num--accent">{formatInr(totalTax)}</span>
              </div>
            </div>

            {/* Hero Final Value Box */}
            <div className="inst-total-box">
              <span className="inst-total-eyebrow">GROSS INVOICE VALUE (INCL. TAXES)</span>
              <div className="inst-total-figure">{formatInr(grossAmount)}</div>
              <div className="inst-total-meta">
                <span>Effective Tax Share: {grossAmount > 0 ? ((totalTax / grossAmount) * 100).toFixed(2) : 0}%</span>
                <span>•</span>
                <span>Base Consideration: {formatInr(baseAmount)}</span>
              </div>
            </div>

            {/* Copy Button */}
            <button
              type="button"
              className={`inst-copy-btn ${copied ? 'inst-copy-btn--copied' : ''}`}
              onClick={handleCopySummary}
            >
              {copied ? (
                <>
                  <CheckIcon size={16} />
                  <span>Computation Copied</span>
                </>
              ) : (
                <>
                  <CopyIcon size={16} />
                  <span>Copy Statutory Computation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
