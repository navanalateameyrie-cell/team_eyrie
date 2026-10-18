'use client'

import React, { useState } from 'react'
import { ACTS_AND_RULES_DATA, type ActOrRule } from '@/data/resource-center/actsAndRules'
import { ExternalLinkIcon } from '../Icons'

const CATEGORIES = [
  { id: 'all', label: 'All Legislation' },
  { id: 'direct-tax', label: 'Direct Tax' },
  { id: 'indirect-tax', label: 'GST & Indirect Tax' },
  { id: 'corporate-law', label: 'Corporate & Insolvency' },
  { id: 'regulatory', label: 'Regulatory & FEMA' },
  { id: 'rules', label: 'Statutory Rules' },
]

export default function ActsCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [search, setSearch] = useState<string>('')

  const filtered = ACTS_AND_RULES_DATA.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory
    const q = search.toLowerCase().trim()
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.shortTitle.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.keyProvisions.some((p) => p.toLowerCase().includes(q))
    return matchesCat && matchesSearch
  })

  return (
    <div className="acts-catalog-container">
      <div className="utility-header">
        <div>
          <span className="calculator-badge">Statutory Bare Acts</span>
          <h3 className="calculator-title">Bare Acts, Codes &amp; Statutory Rules</h3>
          <p className="calculator-subtitle">
            Direct access to official legislative statutes, central acts, and regulatory frameworks governing Indian taxation and enterprise governance.
          </p>
        </div>

        <div className="utility-search-box">
          <input
            type="text"
            className="form-input form-input--search"
            placeholder="Search acts, sections, keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Category Pills */}
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

      {/* Grid of Acts */}
      <div className="acts-grid">
        {filtered.map((item) => (
          <div key={item.id} className="act-card">
            <div className="act-card-header">
              <span className="act-category-tag">{item.category.toUpperCase().replace('-', ' ')}</span>
              <span className="act-year">{item.year}</span>
            </div>

            <h4 className="act-card-title">{item.title}</h4>
            <div className="act-ministry">{item.ministry}</div>

            <p className="act-card-desc">{item.description}</p>

            <div className="act-provisions-box">
              <span className="provisions-title">Key Statutory Provisions:</span>
              <ul className="provisions-list">
                {item.keyProvisions.map((prov, i) => (
                  <li key={i}>{prov}</li>
                ))}
              </ul>
            </div>

            <div className="act-card-footer">
              <a
                href={item.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="act-official-link"
              >
                <span>Official Gazette / e-Book</span>
                <ExternalLinkIcon size={13} />
              </a>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="empty-state-box">
            No statutes found matching &ldquo;{search}&rdquo;. Try another keyword or reset the category filter.
          </div>
        )}
      </div>
    </div>
  )
}

