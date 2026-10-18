'use client'

import React, { useState, useId } from 'react'
import { CopyIcon, CheckIcon } from '../Icons'

export default function CorporateCalculator() {
  const [paidUpCapital, setPaidUpCapital] = useState<string>('')
  const [freeReserves, setFreeReserves] = useState<string>('')
  const [securitiesPremium, setSecuritiesPremium] = useState<string>('')
  const [accumulatedLosses, setAccumulatedLosses] = useState<string>('')
  const [miscExpenditure, setMiscExpenditure] = useState<string>('')

  const [copied, setCopied] = useState(false)

  const paidUpId = useId()
  const freeReservesId = useId()
  const secPremiumId = useId()
  const lossesId = useId()
  const miscExpId = useId()

  const numPaidUp = Math.max(0, parseFloat(paidUpCapital) || 0)
  const numFreeReserves = Math.max(0, parseFloat(freeReserves) || 0)
  const numSecPremium = Math.max(0, parseFloat(securitiesPremium) || 0)
  const numLosses = Math.max(0, parseFloat(accumulatedLosses) || 0)
  const numMiscExp = Math.max(0, parseFloat(miscExpenditure) || 0)

  const grossCapitalAndReserves = numPaidUp + numFreeReserves + numSecPremium
  const totalDeductions = numLosses + numMiscExp
  const computedNetWorth = grossCapitalAndReserves - totalDeductions

  const hasData =
    paidUpCapital !== '' ||
    freeReserves !== '' ||
    securitiesPremium !== '' ||
    accumulatedLosses !== ''

  const formatINR = (val: number) => '₹' + Math.round(val).toLocaleString('en-IN')

  const handleReset = () => {
    setPaidUpCapital('')
    setFreeReserves('')
    setSecuritiesPremium('')
    setAccumulatedLosses('')
    setMiscExpenditure('')
  }

  const handleCopy = () => {
    const text = `COMPANIES ACT 2013 • SECTION 2(57) NET WORTH STATEMENT
Paid-up Share Capital : ${formatINR(numPaidUp)}
Free Reserves         : ${formatINR(numFreeReserves)}
Securities Premium    : ${formatINR(numSecPremium)}
Less: Accum. Losses   : -${formatINR(numLosses)}
Less: Misc Exp.       : -${formatINR(numMiscExp)}
─────────────────────────────────────────────
STATUTORY NET WORTH   : ${formatINR(computedNetWorth)}
Team Eyrie Chartered Accountants`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="inst-tool-card">
      <div className="inst-tool-header">
        <div>
          <span className="inst-meta-tag">COMPANIES ACT 2013 • SECTION 2(57)</span>
          <h2 className="inst-tool-title">Calculate Net Worth</h2>
          <p className="inst-tool-desc">
            Statutory computation of enterprise Net Worth under Section 2(57) of the Companies Act, 2013 based on paid-up capital, free reserves, securities premium, and statutory deductions.
          </p>
        </div>
        <div className="inst-tool-header-badge">
          <span>Sec 2(57) MCA</span>
        </div>
      </div>

      <div className="inst-tool-grid">
        {/* Form Inputs */}
        <div className="inst-form-col">
          <div className="inst-section-title" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Capital &amp; Reserves Components</span>
          </div>

          <div className="inst-form-row">
            <label htmlFor={paidUpId} className="inst-form-label">
              Paid-up Share Capital
              <span className="inst-currency-label">₹</span>
            </label>
            <div className="inst-currency-input-wrap">
              <span className="inst-currency-prefix">₹</span>
              <input
                id={paidUpId}
                type="number"
                min="0"
                placeholder="Equity + Preference Capital (e.g. 50000000)"
                value={paidUpCapital}
                onChange={(e) => setPaidUpCapital(e.target.value)}
                className="inst-num-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="inst-form-row">
              <label htmlFor={freeReservesId} className="inst-form-label">
                Free Reserves
                <span className="inst-currency-label">₹</span>
              </label>
              <div className="inst-currency-input-wrap">
                <span className="inst-currency-prefix">₹</span>
                <input
                  id={freeReservesId}
                  type="number"
                  min="0"
                  placeholder="General reserves"
                  value={freeReserves}
                  onChange={(e) => setFreeReserves(e.target.value)}
                  className="inst-num-input"
                />
              </div>
            </div>

            <div className="inst-form-row">
              <label htmlFor={secPremiumId} className="inst-form-label">
                Securities Premium
                <span className="inst-currency-label">₹</span>
              </label>
              <div className="inst-currency-input-wrap">
                <span className="inst-currency-prefix">₹</span>
                <input
                  id={secPremiumId}
                  type="number"
                  min="0"
                  placeholder="Premium account"
                  value={securitiesPremium}
                  onChange={(e) => setSecuritiesPremium(e.target.value)}
                  className="inst-num-input"
                />
              </div>
            </div>
          </div>

          <div className="inst-section-title" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '6px' }}>
            <span>Statutory Deductions u/s 2(57)</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="inst-form-row">
              <label htmlFor={lossesId} className="inst-form-label">
                Accumulated Losses
                <span className="inst-currency-label">₹</span>
              </label>
              <div className="inst-currency-input-wrap">
                <span className="inst-currency-prefix">₹</span>
                <input
                  id={lossesId}
                  type="number"
                  min="0"
                  placeholder="Debit P&L balance"
                  value={accumulatedLosses}
                  onChange={(e) => setAccumulatedLosses(e.target.value)}
                  className="inst-num-input"
                />
              </div>
            </div>

            <div className="inst-form-row">
              <label htmlFor={miscExpId} className="inst-form-label">
                Deferred / Misc Expenses
                <span className="inst-currency-label">₹</span>
              </label>
              <div className="inst-currency-input-wrap">
                <span className="inst-currency-prefix">₹</span>
                <input
                  id={miscExpId}
                  type="number"
                  min="0"
                  placeholder="Not written off"
                  value={miscExpenditure}
                  onChange={(e) => setMiscExpenditure(e.target.value)}
                  className="inst-num-input"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={() => { }}
              className="inst-action-btn"
              style={{ background: '#1e40af', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, flex: 1 }}
            >
              Calculate Net Worth
            </button>
            <button
              type="button"
              onClick={handleReset}
              style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#64748b', borderRadius: '8px', padding: '10px 18px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results Ledger */}
        <div className="inst-result-col">
          <div className="inst-section-title" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Net Worth Determination</span>
          </div>

          {!hasData ? (
            <div className="inst-empty-notice" style={{ padding: '32px 20px', textAlign: 'center', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '12px', color: '#64748b' }}>
              Enter paid-up share capital and reserves on the left to compute statutory Net Worth.
            </div>
          ) : (
            <>
              <div className="inst-kpi-grid">
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Paid-up Capital</span>
                  <span className="inst-kpi-value">{formatINR(numPaidUp)}</span>
                </div>
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Total Reserves</span>
                  <span className="inst-kpi-value">{formatINR(numFreeReserves + numSecPremium)}</span>
                </div>
                <div className="inst-kpi-card inst-kpi-card--primary">
                  <span className="inst-kpi-label">Statutory Net Worth</span>
                  <span className="inst-kpi-value" style={{ color: computedNetWorth >= 0 ? '#047857' : '#b91c1c' }}>
                    {formatINR(computedNetWorth)}
                  </span>
                </div>
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Total Deductions</span>
                  <span className="inst-kpi-value" style={{ color: totalDeductions > 0 ? '#b91c1c' : '#475569' }}>
                    -{formatINR(totalDeductions)}
                  </span>
                </div>
              </div>

              <div className="inst-table-wrap" style={{ marginTop: '16px' }}>
                <table className="inst-data-table">
                  <tbody>
                    <tr>
                      <td>Paid-up Share Capital (Equity &amp; Preference)</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatINR(numPaidUp)}</td>
                    </tr>
                    <tr>
                      <td>Free Reserves</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>+{formatINR(numFreeReserves)}</td>
                    </tr>
                    <tr>
                      <td>Securities Premium Account</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>+{formatINR(numSecPremium)}</td>
                    </tr>
                    <tr style={{ background: '#f8fafc' }}>
                      <td style={{ fontWeight: 600 }}>Gross Capital &amp; Reserves</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatINR(grossCapitalAndReserves)}</td>
                    </tr>
                    <tr>
                      <td>Less: Accumulated Losses</td>
                      <td style={{ textAlign: 'right', color: '#b91c1c', fontWeight: 600 }}>-{formatINR(numLosses)}</td>
                    </tr>
                    <tr>
                      <td>Less: Deferred &amp; Miscellaneous Expenditure</td>
                      <td style={{ textAlign: 'right', color: '#b91c1c', fontWeight: 600 }}>-{formatINR(numMiscExp)}</td>
                    </tr>
                    <tr style={{ background: computedNetWorth >= 0 ? '#ecfdf5' : '#fef2f2' }}>
                      <td style={{ fontWeight: 700, color: computedNetWorth >= 0 ? '#047857' : '#b91c1c' }}>
                        Statutory Net Worth u/s 2(57)
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: computedNetWorth >= 0 ? '#047857' : '#b91c1c', fontSize: '15px' }}>
                        {formatINR(computedNetWorth)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '14px', display: 'flex', gap: '10px' }}>
                <button type="button" className="inst-action-btn" onClick={handleCopy} style={{ flex: 1 }}>
                  {copied ? (
                    <>
                      <CheckIcon size={14} />
                      <span>Copied Net Worth Statement</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={14} />
                      <span>Copy Statement</span>
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
