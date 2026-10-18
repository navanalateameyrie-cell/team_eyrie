'use client'

import React, { useState, useId } from 'react'
import { CII_DATA } from '@/data/resource-center/ciiData'

export default function CiiTable() {
  const [purchaseFy, setPurchaseFy] = useState<string>('2011-12')
  const [transferFy, setTransferFy] = useState<string>('2024-25')
  const [originalCost, setOriginalCost] = useState<string>('')
  const originalCostInputId = useId()

  const purchaseEntry = CII_DATA.find((x) => x.fy === purchaseFy) || CII_DATA[CII_DATA.length - 1]
  const transferEntry = CII_DATA.find((x) => x.fy === transferFy) || CII_DATA[0]

  const purchaseIndex = purchaseEntry.index
  const transferIndex = transferEntry.index

  const numOriginalCost = Math.max(0, parseFloat(originalCost) || 0)
  const indexedCost =
    numOriginalCost > 0 && purchaseIndex > 0
      ? Math.round((numOriginalCost * transferIndex) / purchaseIndex)
      : 0
  const indexationBenefit = Math.max(0, indexedCost - numOriginalCost)

  const formatInr = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  return (
    <div className="utility-card">
      <div className="utility-header">
        <div>
          <span className="calculator-badge">Capital Gains Utility</span>
          <h3 className="calculator-title">Cost Inflation Index (CII) &amp; Indexation Tool</h3>
          <p className="calculator-subtitle">
            Historical index notified by CBDT under Section 48 of the Income-tax Act, with interactive Long-Term Capital Gains (LTCG) indexed cost computation.
          </p>
        </div>
      </div>

      {/* Interactive Indexation Calculator Widget */}
      <div className="cii-calculator-box">
        <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-navy, #0f274a)', marginBottom: 14, letterSpacing: '0.2px' }}>
          Indexed Cost of Acquisition Computation Tool
        </h4>

        <div className="cii-inputs-grid">
          <div className="form-group">
            <label className="form-label">Financial Year of Purchase / Improvement</label>
            <select
              className="form-select"
              value={purchaseFy}
              onChange={(e) => setPurchaseFy(e.target.value)}
            >
              {CII_DATA.map((c) => (
                <option key={c.fy} value={c.fy}>
                  FY {c.fy} (CII: {c.index})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Financial Year of Transfer / Sale</label>
            <select
              className="form-select"
              value={transferFy}
              onChange={(e) => setTransferFy(e.target.value)}
            >
              {CII_DATA.map((c) => (
                <option key={c.fy} value={c.fy}>
                  FY {c.fy} (CII: {c.index})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor={originalCostInputId}>Original Purchase Consideration (₹)</label>
            <div className="input-prefix-wrapper">
              <span className="input-currency-prefix">₹</span>
              <input
                id={originalCostInputId}
                type="number"
                min="0"
                step="any"
                value={originalCost}
                onChange={(e) => setOriginalCost(e.target.value)}
                className="form-input form-input--currency"
                placeholder="Enter purchase cost (e.g. 2500000)"
              />
            </div>
          </div>
        </div>

        <div className="cii-output-card">
          <div className="cii-stat">
            <span className="cii-stat-title">Acquisition Index</span>
            <span className="cii-stat-val">{purchaseIndex} (FY {purchaseFy})</span>
          </div>
          <div className="cii-stat">
            <span className="cii-stat-title">Transfer Index</span>
            <span className="cii-stat-val">{transferIndex} (FY {transferFy})</span>
          </div>
          <div className="cii-stat">
            <span className="cii-stat-title">Indexation Benefit</span>
            <span className="cii-stat-val text-success">+{formatInr(indexationBenefit)}</span>
          </div>
          <div className="cii-stat cii-stat--highlight">
            <span className="cii-stat-title">Indexed Cost of Acquisition</span>
            <span className="cii-stat-val text-accent">{formatInr(indexedCost)}</span>
          </div>
        </div>
      </div>

      {/* Historical Table */}
      <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0f274a', marginTop: 28, marginBottom: 12 }}>
        Official CBDT Cost Inflation Index Series (Base Year 2001-02 = 100)
      </h4>

      <div className="table-responsive-wrapper">
        <table className="resource-table">
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Financial Year</th>
              <th style={{ width: '25%' }}>Assessment Year</th>
              <th style={{ width: '25%' }}>Cost Inflation Index (CII)</th>
              <th style={{ width: '25%' }}>Official Notification</th>
            </tr>
          </thead>
          <tbody>
            {CII_DATA.map((row) => (
              <tr key={row.fy}>
                <td><strong>FY {row.fy}</strong></td>
                <td>AY {row.ay}</td>
                <td>
                  <span className="threshold-pill" style={{ fontWeight: 700 }}>{row.index}</span>
                </td>
                <td className="table-subtext">{row.notificationNo || 'CBDT'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

