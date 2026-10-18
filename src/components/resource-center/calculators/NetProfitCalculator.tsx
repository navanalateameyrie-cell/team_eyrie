'use client'

import React, { useState, useId } from 'react'
import { CopyIcon, CheckIcon } from '../Icons'

export default function NetProfitCalculator() {
  const [revenue, setRevenue] = useState<string>('')
  const [cogs, setCogs] = useState<string>('')
  const [operatingExpenses, setOperatingExpenses] = useState<string>('')
  const [depreciation, setDepreciation] = useState<string>('')
  const [otherIncome, setOtherIncome] = useState<string>('')
  const [taxRate, setTaxRate] = useState<string>('25') // Default 25% corporate tax rate

  // Optional Section 198 Additions/Deductions
  const [showSec198, setShowSec198] = useState<boolean>(false)
  const [sec198Addbacks, setSec198Addbacks] = useState<string>('')
  const [sec198Deductions, setSec198Deductions] = useState<string>('')

  const [copied, setCopied] = useState(false)

  // IDs
  const revId = useId()
  const cogsId = useId()
  const opexId = useId()
  const depId = useId()
  const otherIncId = useId()
  const taxRateId = useId()
  const addbackId = useId()
  const dedId = useId()

  const numRevenue = Math.max(0, parseFloat(revenue) || 0)
  const numCogs = Math.max(0, parseFloat(cogs) || 0)
  const numOpex = Math.max(0, parseFloat(operatingExpenses) || 0)
  const numDep = Math.max(0, parseFloat(depreciation) || 0)
  const numOtherInc = Math.max(0, parseFloat(otherIncome) || 0)
  const numTaxRate = Math.max(0, parseFloat(taxRate) || 0)

  const numAddbacks = Math.max(0, parseFloat(sec198Addbacks) || 0)
  const numDeductions = Math.max(0, parseFloat(sec198Deductions) || 0)

  // P&L Metrics
  const grossProfit = numRevenue - numCogs
  const ebitda = grossProfit - numOpex + numOtherInc
  const pbt = ebitda - numDep
  const taxExpense = pbt > 0 ? (pbt * numTaxRate) / 100 : 0
  const pat = pbt - taxExpense

  const grossMargin = numRevenue > 0 ? (grossProfit / numRevenue) * 100 : 0
  const netMargin = numRevenue > 0 ? (pat / numRevenue) * 100 : 0

  // Statutory Net Profit u/s 198
  const statutoryNetProfit = Math.max(0, pbt + numAddbacks - numDeductions)
  const maxOverallRemuneration = statutoryNetProfit * 0.11
  const singleMdRemuneration = statutoryNetProfit * 0.05
  const csrSpend = statutoryNetProfit * 0.02

  const hasData = revenue !== '' || cogs !== '' || operatingExpenses !== ''

  const formatINR = (val: number) => '₹' + Math.round(val).toLocaleString('en-IN')

  const handleReset = () => {
    setRevenue('')
    setCogs('')
    setOperatingExpenses('')
    setDepreciation('')
    setOtherIncome('')
    setTaxRate('25')
    setSec198Addbacks('')
    setSec198Deductions('')
    setShowSec198(false)
  }

  const handleCopy = () => {
    const text = `PROFIT & LOSS FINANCIAL STATEMENT
Revenue / Gross Sales : ${formatINR(numRevenue)}
Cost of Goods Sold    : -${formatINR(numCogs)}
Gross Profit          : ${formatINR(grossProfit)} (${grossMargin.toFixed(1)}%)
Operating Expenses    : -${formatINR(numOpex)}
Depreciation & Amort. : -${formatINR(numDep)}
Profit Before Tax(PBT): ${formatINR(pbt)}
Tax Provision (${numTaxRate}%): -${formatINR(taxExpense)}
NET PROFIT AFTER TAX  : ${formatINR(pat)} (${netMargin.toFixed(1)}%)
${showSec198 ? `\nSec 198 Statutory Net Profit : ${formatINR(statutoryNetProfit)}\nMax 11% Managerial Remuneration: ${formatINR(maxOverallRemuneration)}\n` : ''}Team Eyrie Chartered Accountants`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="inst-tool-card">
      <div className="inst-tool-header">
        <div>
          <span className="inst-meta-tag">FINANCIAL &amp; CORPORATE ACCOUNTING</span>
          <h2 className="inst-tool-title">Net Profit Calculator</h2>
          <p className="inst-tool-desc">
            Calculate gross profit, operating EBITDA, Profit Before Tax (PBT), and Net Profit After Tax (PAT) with optional Section 198 managerial remuneration limits.
          </p>
        </div>
        <div className="inst-tool-header-badge">
          <span>P&amp;L Analysis</span>
        </div>
      </div>

      <div className="inst-tool-grid">
        {/* Form Inputs */}
        <div className="inst-form-col">
          <div className="inst-section-title" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Revenue &amp; Cost Inputs</span>
          </div>

          <div className="inst-form-row">
            <label htmlFor={revId} className="inst-form-label">
              Total Revenue / Gross Sales
              <span className="inst-currency-label">₹</span>
            </label>
            <div className="inst-currency-input-wrap">
              <span className="inst-currency-prefix">₹</span>
              <input
                id={revId}
                type="number"
                min="0"
                placeholder="e.g. 10000000"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className="inst-num-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="inst-form-row">
              <label htmlFor={cogsId} className="inst-form-label">
                Cost of Goods Sold (COGS)
                <span className="inst-currency-label">₹</span>
              </label>
              <div className="inst-currency-input-wrap">
                <span className="inst-currency-prefix">₹</span>
                <input
                  id={cogsId}
                  type="number"
                  min="0"
                  placeholder="Direct costs"
                  value={cogs}
                  onChange={(e) => setCogs(e.target.value)}
                  className="inst-num-input"
                />
              </div>
            </div>

            <div className="inst-form-row">
              <label htmlFor={opexId} className="inst-form-label">
                Operating Expenses
                <span className="inst-currency-label">₹</span>
              </label>
              <div className="inst-currency-input-wrap">
                <span className="inst-currency-prefix">₹</span>
                <input
                  id={opexId}
                  type="number"
                  min="0"
                  placeholder="Admin, rent, salary"
                  value={operatingExpenses}
                  onChange={(e) => setOperatingExpenses(e.target.value)}
                  className="inst-num-input"
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="inst-form-row">
              <label htmlFor={depId} className="inst-form-label">
                Depreciation &amp; Amortization
                <span className="inst-currency-label">₹</span>
              </label>
              <div className="inst-currency-input-wrap">
                <span className="inst-currency-prefix">₹</span>
                <input
                  id={depId}
                  type="number"
                  min="0"
                  placeholder="e.g. 500000"
                  value={depreciation}
                  onChange={(e) => setDepreciation(e.target.value)}
                  className="inst-num-input"
                />
              </div>
            </div>

            <div className="inst-form-row">
              <label htmlFor={otherIncId} className="inst-form-label">
                Other / Non-Operating Income
                <span className="inst-currency-label">₹</span>
              </label>
              <div className="inst-currency-input-wrap">
                <span className="inst-currency-prefix">₹</span>
                <input
                  id={otherIncId}
                  type="number"
                  min="0"
                  placeholder="Interest, dividends"
                  value={otherIncome}
                  onChange={(e) => setOtherIncome(e.target.value)}
                  className="inst-num-input"
                />
              </div>
            </div>
          </div>

          <div className="inst-form-row">
            <label htmlFor={taxRateId} className="inst-form-label">
              Applicable Tax Rate (%)
              <span className="inst-form-label-hint">Corporate 22% / 25% / 30%</span>
            </label>
            <input
              id={taxRateId}
              type="number"
              placeholder="25"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="inst-num-input"
              style={{ paddingLeft: '12px' }}
            />
          </div>

          {/* Collapsible Section 198 Additions/Deductions */}
          <div>
            <button
              type="button"
              onClick={() => setShowSec198((v) => !v)}
              style={{ background: 'none', border: 'none', color: '#1d4ed8', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', padding: 0 }}
            >
              {showSec198 ? '− Hide Companies Act Sec 198 Adjustments' : '+ Companies Act Sec 198 Adjustments (Optional)'}
            </button>

            {showSec198 && (
              <div style={{ marginTop: '12px', padding: '14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="inst-form-row">
                    <label htmlFor={addbackId} className="inst-form-label" style={{ fontSize: '12px' }}>
                      Add: Non-Permitted Deductions (₹)
                    </label>
                    <input
                      id={addbackId}
                      type="number"
                      placeholder="Asset loss, donations"
                      value={sec198Addbacks}
                      onChange={(e) => setSec198Addbacks(e.target.value)}
                      className="inst-num-input"
                      style={{ paddingLeft: '10px', fontSize: '13px' }}
                    />
                  </div>
                  <div className="inst-form-row">
                    <label htmlFor={dedId} className="inst-form-label" style={{ fontSize: '12px' }}>
                      Less: Capital Credits / Profits (₹)
                    </label>
                    <input
                      id={dedId}
                      type="number"
                      placeholder="Share premium, cap profits"
                      value={sec198Deductions}
                      onChange={(e) => setSec198Deductions(e.target.value)}
                      className="inst-num-input"
                      style={{ paddingLeft: '10px', fontSize: '13px' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={() => {}}
              className="inst-action-btn"
              style={{ background: '#1e40af', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, flex: 1 }}
            >
              Calculate P&amp;L
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
            <span>Profitability &amp; Margins Statement</span>
          </div>

          {!hasData ? (
            <div className="inst-empty-notice" style={{ padding: '32px 20px', textAlign: 'center', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '12px', color: '#64748b' }}>
              Enter revenue and expenses on the left to compute profit margins and Net Profit.
            </div>
          ) : (
            <>
              <div className="inst-kpi-grid">
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Gross Profit</span>
                  <span className="inst-kpi-value" style={{ color: grossProfit >= 0 ? '#047857' : '#b91c1c' }}>
                    {formatINR(grossProfit)}
                  </span>
                </div>
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Gross Margin</span>
                  <span className="inst-kpi-value">{grossMargin.toFixed(1)}%</span>
                </div>
                <div className="inst-kpi-card inst-kpi-card--primary">
                  <span className="inst-kpi-label">Net Profit (PAT)</span>
                  <span className="inst-kpi-value" style={{ color: pat >= 0 ? '#047857' : '#b91c1c' }}>
                    {formatINR(pat)}
                  </span>
                </div>
                <div className="inst-kpi-card">
                  <span className="inst-kpi-label">Net Margin</span>
                  <span className="inst-kpi-value">{netMargin.toFixed(1)}%</span>
                </div>
              </div>

              <div className="inst-table-wrap" style={{ marginTop: '16px' }}>
                <table className="inst-data-table">
                  <tbody>
                    <tr>
                      <td>Total Revenue / Sales</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatINR(numRevenue)}</td>
                    </tr>
                    <tr>
                      <td>Less: Cost of Goods Sold (COGS)</td>
                      <td style={{ textAlign: 'right', color: '#b91c1c', fontWeight: 600 }}>-{formatINR(numCogs)}</td>
                    </tr>
                    <tr style={{ background: '#f8fafc' }}>
                      <td style={{ fontWeight: 600 }}>Gross Profit</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatINR(grossProfit)}</td>
                    </tr>
                    <tr>
                      <td>Less: Operating Expenses (Opex)</td>
                      <td style={{ textAlign: 'right', color: '#b91c1c', fontWeight: 600 }}>-{formatINR(numOpex)}</td>
                    </tr>
                    <tr>
                      <td>Add: Other / Non-Operating Income</td>
                      <td style={{ textAlign: 'right', color: '#047857', fontWeight: 600 }}>+{formatINR(numOtherInc)}</td>
                    </tr>
                    <tr>
                      <td>Operating Profit (EBITDA)</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatINR(ebitda)}</td>
                    </tr>
                    <tr>
                      <td>Less: Depreciation &amp; Amortization</td>
                      <td style={{ textAlign: 'right', color: '#b91c1c', fontWeight: 600 }}>-{formatINR(numDep)}</td>
                    </tr>
                    <tr>
                      <td>Profit Before Tax (PBT)</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatINR(pbt)}</td>
                    </tr>
                    <tr>
                      <td>Less: Income Tax Provision ({numTaxRate}%)</td>
                      <td style={{ textAlign: 'right', color: '#b91c1c', fontWeight: 600 }}>-{formatINR(taxExpense)}</td>
                    </tr>
                    <tr style={{ background: pat >= 0 ? '#ecfdf5' : '#fef2f2' }}>
                      <td style={{ fontWeight: 700, color: pat >= 0 ? '#047857' : '#b91c1c' }}>
                        Net Profit After Tax (PAT)
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: pat >= 0 ? '#047857' : '#b91c1c', fontSize: '15px' }}>
                        {formatINR(pat)}
                      </td>
                    </tr>
                    {showSec198 && (
                      <>
                        <tr style={{ background: '#eff6ff' }}>
                          <td style={{ fontWeight: 700, color: '#1d4ed8' }}>Companies Act Sec 198 Net Profit</td>
                          <td style={{ textAlign: 'right', fontWeight: 700, color: '#1d4ed8' }}>{formatINR(statutoryNetProfit)}</td>
                        </tr>
                        <tr>
                          <td>Max 11% Managerial Remuneration Cap</td>
                          <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatINR(maxOverallRemuneration)}</td>
                        </tr>
                        <tr>
                          <td>Mandatory 2% CSR Spend Benchmark</td>
                          <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatINR(csrSpend)}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '14px', display: 'flex', gap: '10px' }}>
                <button type="button" className="inst-action-btn" onClick={handleCopy} style={{ flex: 1 }}>
                  {copied ? (
                    <>
                      <CheckIcon size={14} />
                      <span>Copied P&amp;L Statement</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={14} />
                      <span>Copy P&amp;L Statement</span>
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
