'use client'

import React, { useState } from 'react'
import { STAMP_DUTY_DATA } from '@/data/resource-center/utilitiesData'

export default function StampDutyTable() {
  const [search, setSearch] = useState('')

  const filtered = STAMP_DUTY_DATA.filter((item) => {
    const q = search.toLowerCase().trim()
    if (!q) return true
    return (
      item.state.toLowerCase().includes(q) ||
      item.governingAct.toLowerCase().includes(q)
    )
  })

  return (
    <div className="utility-card">
      <div className="utility-header">
        <div>
          <span className="calculator-badge">Statutory Reference • State Revenue Acts</span>
          <h3 className="calculator-title">State-Wise Stamp Duty &amp; Registration Rates</h3>
          <p className="calculator-subtitle">
            Notified stamp duty and property conveyance registration tariffs across major commercial states for residential and commercial transactions.
          </p>
        </div>

        <div className="utility-search-box">
          <input
            type="text"
            className="form-input form-input--search"
            placeholder="Search by state (Maharashtra, Karnataka, Delhi, TN)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive-wrapper">
        <table className="resource-table">
          <thead>
            <tr>
              <th style={{ width: '15%' }}>State / Jurisdiction</th>
              <th style={{ width: '22%' }}>Standard Male / General Rate</th>
              <th style={{ width: '20%' }}>Female Buyer Concession</th>
              <th style={{ width: '15%' }}>Registration Fee</th>
              <th style={{ width: '28%' }}>Local Cess / Surcharge &amp; Governing Act</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <strong>{item.state}</strong>
                </td>
                <td style={{ fontSize: '12.5px' }}>{item.maleRate}</td>
                <td style={{ fontSize: '12.5px', color: '#047857', fontWeight: 600 }}>{item.femaleRate}</td>
                <td style={{ fontSize: '12.5px' }}>{item.registrationFee}</td>
                <td style={{ fontSize: '12px', color: '#475569' }}>
                  <div>{item.cessOrSurcharge}</div>
                  <div style={{ marginTop: '3px', color: '#1e40af', fontWeight: 500 }}>{item.governingAct}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ padding: '14px 18px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px' }}>
        <div>
          <strong>Statutory Base:</strong> Respective State Stamp &amp; Registration Acts • Local Body Municipal Ordinances.
        </div>
        <div>
          <strong>Verification Status:</strong> Verified State Schedules • <strong>Last Verified:</strong> April 2025
        </div>
      </div>
    </div>
  )
}

