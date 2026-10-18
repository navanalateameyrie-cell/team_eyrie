'use client'

import React, { useState } from 'react'
import { GST_RATES_DATA } from '@/data/resource-center/utilitiesData'

export default function GstRatesTable() {
  const [search, setSearch] = useState('')

  const filtered = GST_RATES_DATA.filter((item) => {
    const q = search.toLowerCase().trim()
    if (!q) return true
    return (
      item.rate.toLowerCase().includes(q) ||
      item.hsnSac.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.majorGoodsOrServices.toLowerCase().includes(q)
    )
  })

  return (
    <div className="utility-card">
      <div className="utility-header">
        <div>
          <span className="calculator-badge">Statutory Reference • GST Council</span>
          <h3 className="calculator-title">GST Rate Structure &amp; HSN/SAC Directory</h3>
          <p className="calculator-subtitle">
            Notified Goods and Services Tax rates (0%, 0.25%, 3%, 5%, 12%, 18%, 28%) and representative HSN/SAC classifications under CGST / SGST / IGST Acts.
          </p>
        </div>

        <div className="utility-search-box">
          <input
            type="text"
            className="form-input form-input--search"
            placeholder="Search by HSN, rate, goods or services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive-wrapper">
        <table className="resource-table">
          <thead>
            <tr>
              <th style={{ width: '12%' }}>GST Slab</th>
              <th style={{ width: '14%' }}>HSN / SAC Code</th>
              <th style={{ width: '32%' }}>Description of Goods / Supplies</th>
              <th style={{ width: '28%' }}>Representative Services / Industry</th>
              <th style={{ width: '14%' }}>Compensation Cess</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <span className="section-tag" style={{ background: '#eff6ff', color: '#1e40af', borderColor: '#bfdbfe' }}>
                    {item.rate}
                  </span>
                </td>
                <td>
                  <code style={{ fontSize: '12px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                    {item.hsnSac}
                  </code>
                </td>
                <td style={{ fontSize: '13px' }}>{item.description}</td>
                <td style={{ fontSize: '12.5px', color: '#334155' }}>{item.majorGoodsOrServices}</td>
                <td style={{ fontSize: '12px', color: item.cess === 'Nil' ? '#64748b' : '#b91c1c', fontWeight: item.cess === 'Nil' ? 400 : 600 }}>
                  {item.cess}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ padding: '14px 18px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px' }}>
        <div>
          <strong>Statutory Authority:</strong> GST Council Notifications • Central Board of Indirect Taxes &amp; Customs (CBIC).
        </div>
        <div>
          <strong>Jurisdiction:</strong> All India • <strong>Last Verified:</strong> April 2025
        </div>
      </div>
    </div>
  )
}

