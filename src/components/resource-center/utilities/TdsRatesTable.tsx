'use client'

import React, { useState } from 'react'
import { TDS_RATES_DATA } from '@/data/resource-center/tdsRates'

export default function TdsRatesTable() {
  const [search, setSearch] = useState('')

  const filtered = TDS_RATES_DATA.filter((item) => {
    const q = search.toLowerCase().trim()
    if (!q) return true
    return (
      item.section.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.natureOfPayment.toLowerCase().includes(q)
    )
  })

  return (
    <div className="utility-card">
      <div className="utility-header">
        <div>
          <span className="calculator-badge">Statutory Reference</span>
          <h3 className="calculator-title">Comprehensive TDS &amp; TCS Rate Chart</h3>
          <p className="calculator-subtitle">
            Updated statutory withholding tax rates for FY 2025-26 and FY 2026-27 including latest Finance Act amendments.
          </p>
        </div>

        <div className="utility-search-box">
          <input
            type="text"
            className="form-input form-input--search"
            placeholder="Search by section (e.g. 194C, 194J) or nature..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive-wrapper">
        <table className="resource-table">
          <thead>
            <tr>
              <th style={{ width: '10%' }}>Section</th>
              <th style={{ width: '22%' }}>Nature of Payment</th>
              <th style={{ width: '25%' }}>Exemption / Threshold</th>
              <th style={{ width: '12%' }}>Ind / HUF Rate</th>
              <th style={{ width: '12%' }}>Company Rate</th>
              <th style={{ width: '19%' }}>Statutory Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.section}>
                <td>
                  <span className="section-tag">Sec {item.section}</span>
                </td>
                <td>
                  <strong>{item.title}</strong>
                  <div className="table-subtext">{item.natureOfPayment}</div>
                </td>
                <td>
                  <span className="threshold-pill">{item.thresholdLabel}</span>
                </td>
                <td className="rate-cell">
                  {item.rateIndHuf === 0 ? 'Slab Rates' : `${item.rateIndHuf}%`}
                </td>
                <td className="rate-cell">
                  {item.rateCompanyOthers === 0 ? 'Slab Rates' : `${item.rateCompanyOthers}%`}
                </td>
                <td className="table-subtext">{item.notes || '—'}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '30px 10px', color: '#6b7280' }}>
                  No TDS sections match &ldquo;{search}&rdquo;. Try searching for 194C, 194J, rent, or salary.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

