'use client'

import React, { useState } from 'react'
import { SMALL_SAVINGS_DATA } from '@/data/resource-center/utilitiesData'

export default function NscRatesTable() {
  const [search, setSearch] = useState('')

  const filtered = SMALL_SAVINGS_DATA.filter((item) => {
    const q = search.toLowerCase().trim()
    if (!q) return true
    return (
      item.schemeName.toLowerCase().includes(q) ||
      item.interestRate.toLowerCase().includes(q) ||
      item.taxBenefit.toLowerCase().includes(q)
    )
  })

  return (
    <div className="utility-card">
      <div className="utility-header">
        <div>
          <span className="calculator-badge">Statutory Reference • Ministry of Finance</span>
          <h3 className="calculator-title">NSC &amp; Small Savings Interest Rates</h3>
          <p className="calculator-subtitle">
            Notified quarterly interest rates for National Savings Certificates (VIII Issue), Public Provident Fund, Senior Citizen Scheme, and Post Office term deposits.
          </p>
        </div>

        <div className="utility-search-box">
          <input
            type="text"
            className="form-input form-input--search"
            placeholder="Search by scheme (NSC, PPF, SCSS, SSA)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive-wrapper">
        <table className="resource-table">
          <thead>
            <tr>
              <th style={{ width: '24%' }}>Scheme Name</th>
              <th style={{ width: '13%' }}>Interest Rate</th>
              <th style={{ width: '20%' }}>Compounding Convention</th>
              <th style={{ width: '12%' }}>Tenure</th>
              <th style={{ width: '18%' }}>Income Tax Treatment</th>
              <th style={{ width: '13%' }}>Min Investment</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <strong>{item.schemeName}</strong>
                </td>
                <td style={{ fontWeight: 700, color: '#047857' }}>{item.interestRate}</td>
                <td style={{ fontSize: '12.5px', color: '#475569' }}>{item.compoundingFrequency}</td>
                <td>
                  <span className="section-tag">{item.tenure}</span>
                </td>
                <td style={{ fontSize: '12px', color: '#334155' }}>{item.taxBenefit}</td>
                <td style={{ fontSize: '12.5px' }}>{item.minInvestment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ padding: '14px 18px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px' }}>
        <div>
          <strong>Statutory Authority:</strong> Department of Economic Affairs, Ministry of Finance • Government of India Notifications.
        </div>
        <div>
          <strong>Applicable Period:</strong> FY 2025-26 • <strong>Last Verified:</strong> April 2025
        </div>
      </div>
    </div>
  )
}

