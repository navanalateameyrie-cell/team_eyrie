'use client'

import React, { useState } from 'react'
import {
  COMPANIES_ACT_DEPRECIATION,
  INCOME_TAX_DEPRECIATION,
} from '@/data/resource-center/depreciationData'

export default function DepreciationTable() {
  const [activeTab, setActiveTab] = useState<'income-tax' | 'companies-act'>('income-tax')
  const [search, setSearch] = useState('')

  const itFiltered = INCOME_TAX_DEPRECIATION.filter(
    (item) =>
      item.blockOfAssets.toLowerCase().includes(search.toLowerCase()) ||
      item.natureOfAsset.toLowerCase().includes(search.toLowerCase())
  )

  const caFiltered = COMPANIES_ACT_DEPRECIATION.filter(
    (item) =>
      item.assetClass.toLowerCase().includes(search.toLowerCase()) ||
      item.subCategory.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="utility-card">
      <div className="utility-header">
        <div>
          <span className="calculator-badge">Statutory Depreciation</span>
          <h3 className="calculator-title">Depreciation Rates &amp; Useful Life Schedules</h3>
          <p className="calculator-subtitle">
            Dual reference schedules for Income Tax Act (Block of Assets WDV) and Companies Act 2013 (Schedule II Useful Life).
          </p>
        </div>

        <div className="utility-search-box">
          <input
            type="text"
            className="form-input form-input--search"
            placeholder="Search asset (e.g. computer, car, building)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="pill-group" style={{ marginBottom: 18 }}>
        <button
          type="button"
          className={`pill-btn ${activeTab === 'income-tax' ? 'pill-btn--active' : ''}`}
          onClick={() => setActiveTab('income-tax')}
        >
          Income Tax Act, 1961 (Rule 5 Appendix I)
        </button>
        <button
          type="button"
          className={`pill-btn ${activeTab === 'companies-act' ? 'pill-btn--active' : ''}`}
          onClick={() => setActiveTab('companies-act')}
        >
          Companies Act, 2013 (Schedule II Useful Life)
        </button>
      </div>

      {activeTab === 'income-tax' ? (
        <div className="table-responsive-wrapper">
          <table className="resource-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Block of Assets</th>
                <th style={{ width: '45%' }}>Nature of Asset Description</th>
                <th style={{ width: '15%' }}>WDV Rate (%)</th>
                <th style={{ width: '15%' }}>Statutory Reference</th>
              </tr>
            </thead>
            <tbody>
              {itFiltered.map((row, idx) => (
                <tr key={idx}>
                  <td><strong>{row.blockOfAssets}</strong></td>
                  <td>{row.natureOfAsset}</td>
                  <td className="rate-cell">{row.wdvRatePercent}%</td>
                  <td className="table-subtext">{row.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="table-responsive-wrapper">
          <table className="resource-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Asset Classification</th>
                <th style={{ width: '45%' }}>Sub-Category Description</th>
                <th style={{ width: '15%' }}>Useful Life (Years)</th>
                <th style={{ width: '15%' }}>Residual Value</th>
              </tr>
            </thead>
            <tbody>
              {caFiltered.map((row, idx) => (
                <tr key={idx}>
                  <td><strong>{row.assetClass}</strong></td>
                  <td>{row.subCategory}</td>
                  <td className="rate-cell">{row.usefulLifeYears} Years</td>
                  <td className="table-subtext">{row.residualValuePercent}% (Standard)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

