'use client'

import React, { useState } from 'react'
import { STATUTORY_FORMS_DATA, type StatutoryForm } from '@/data/resource-center/formsData'
import { ExternalLinkIcon } from '../Icons'

const CATEGORIES = [
  { id: 'all', label: 'All Forms' },
  { id: 'direct-tax', label: 'Income Tax' },
  { id: 'gst', label: 'GST Forms' },
  { id: 'mca', label: 'MCA & RoC' },
]

export default function FormsCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [search, setSearch] = useState<string>('')

  const filtered = STATUTORY_FORMS_DATA.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory
    const q = search.toLowerCase().trim()
    const matchesSearch =
      !q ||
      item.code.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.purpose.toLowerCase().includes(q) ||
      item.applicability.toLowerCase().includes(q)
    return matchesCat && matchesSearch
  })

  return (
    <div className="forms-catalog-container">
      <div className="utility-header">
        <div>
          <span className="calculator-badge">Statutory Compliance</span>
          <h3 className="calculator-title">Official Statutory Forms Directory</h3>
          <p className="calculator-subtitle">
            Essential declarations, returns, and certification forms prescribed under Direct Tax, GST, and MCA regulations.
          </p>
        </div>

        <div className="utility-search-box">
          <input
            type="text"
            className="form-input form-input--search"
            placeholder="Search forms (e.g. 15G, 16, AOC-4, GSTR-1)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="pill-group" style={{ marginBottom: 24 }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`pill-btn ${selectedCategory === cat.id ? 'pill-btn--active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="table-responsive-wrapper">
        <table className="resource-table">
          <thead>
            <tr>
              <th style={{ width: '15%' }}>Form Code</th>
              <th style={{ width: '30%' }}>Form Name &amp; Purpose</th>
              <th style={{ width: '25%' }}>Who Needs to File?</th>
              <th style={{ width: '15%' }}>Frequency / Due Date</th>
              <th style={{ width: '15%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.code}>
                <td>
                  <span className="form-code-badge">{item.code}</span>
                  <div className="table-subtext" style={{ marginTop: 4 }}>{item.categoryLabel}</div>
                </td>
                <td>
                  <strong>{item.title}</strong>
                  <div className="table-subtext" style={{ marginTop: 4 }}>{item.purpose}</div>
                </td>
                <td className="table-subtext">{item.applicability}</td>
                <td>
                  <span className="threshold-pill">{item.periodicity}</span>
                </td>
                <td>
                  {item.officialUrl ? (
                    <a
                      href={item.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portal-link-btn"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    >
                      <span>Portal Link</span>
                      <ExternalLinkIcon size={12} />
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '30px 10px', color: '#6b7280' }}>
                  No forms found matching &ldquo;{search}&rdquo;. Try another search term.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

