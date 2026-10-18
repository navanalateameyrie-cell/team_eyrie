'use client'

import React, { useState } from 'react'
import { INCOME_TAX_SLABS_DATA } from '@/data/resource-center/utilitiesData'

export default function IncomeTaxRatesTable() {
  const [selectedRegime, setSelectedRegime] = useState<'all' | 'new' | 'old'>('new')

  const filtered = INCOME_TAX_SLABS_DATA.filter((item) => {
    if (selectedRegime === 'all') return true
    return item.regime === selectedRegime
  })

  return (
    <div className="utility-card">
      <div className="utility-header">
        <div>
          <span className="calculator-badge">Statutory Reference • CBDT</span>
          <h3 className="calculator-title">Income Tax Slab Rates &amp; Thresholds</h3>
          <p className="calculator-subtitle">
            Statutory tax slabs under default Section 115BAC (New Tax Regime) and optional Old Tax Regime for FY 2025-26 &amp; FY 2026-27 (AY 2026-27 &amp; AY 2027-28).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setSelectedRegime('new')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: selectedRegime === 'new' ? '#1e40af' : '#cbd5e1',
              background: selectedRegime === 'new' ? '#1e40af' : '#ffffff',
              color: selectedRegime === 'new' ? '#ffffff' : '#334155',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            New Regime (Sec 115BAC)
          </button>
          <button
            type="button"
            onClick={() => setSelectedRegime('old')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: selectedRegime === 'old' ? '#1e40af' : '#cbd5e1',
              background: selectedRegime === 'old' ? '#1e40af' : '#ffffff',
              color: selectedRegime === 'old' ? '#ffffff' : '#334155',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Old Regime (With Deductions)
          </button>
          <button
            type="button"
            onClick={() => setSelectedRegime('all')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: selectedRegime === 'all' ? '#1e40af' : '#cbd5e1',
              background: selectedRegime === 'all' ? '#1e40af' : '#ffffff',
              color: selectedRegime === 'all' ? '#ffffff' : '#334155',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Show Both
          </button>
        </div>
      </div>

      <div className="table-responsive-wrapper">
        <table className="resource-table">
          <thead>
            <tr>
              <th style={{ width: '15%' }}>Regime</th>
              <th style={{ width: '22%' }}>Assessee Category</th>
              <th style={{ width: '25%' }}>Income Slab Range</th>
              <th style={{ width: '13%' }}>Applicable Rate</th>
              <th style={{ width: '25%' }}>Statutory Provisions &amp; Relief</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <span className={`section-tag ${item.regime === 'new' ? 'section-tag--green' : ''}`}>
                    {item.regime === 'new' ? 'Default 115BAC' : 'Optional Old'}
                  </span>
                </td>
                <td>{item.category}</td>
                <td>
                  <strong>{item.slabRange}</strong>
                </td>
                <td style={{ fontWeight: 700, color: item.taxRate === 'NIL' ? '#059669' : '#1e40af' }}>
                  {item.taxRate}
                </td>
                <td style={{ fontSize: '12px', color: '#475569' }}>{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ padding: '14px 18px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px' }}>
        <div>
          <strong>Statutory Base:</strong> Income-tax Act, 1961 as amended by Finance Act, 2024 &amp; 2025 • CBDT Notifications.
        </div>
        <div>
          <strong>Jurisdiction:</strong> All India • <strong>Last Verified:</strong> April 2025
        </div>
      </div>
    </div>
  )
}

