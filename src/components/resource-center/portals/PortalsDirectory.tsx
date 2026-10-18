'use client'

import React, { useState } from 'react'
import { REGULATORY_PORTALS_DATA, type RegulatoryPortal } from '@/data/resource-center/portalsData'
import { ShieldIcon, CheckIcon, ExternalLinkIcon } from '../Icons'

const CATEGORIES = [
  { id: 'all', label: 'All Portals' },
  { id: 'direct-tax', label: 'Direct Tax' },
  { id: 'indirect-tax', label: 'GST & Customs' },
  { id: 'corporate', label: 'MCA & Corporate' },
  { id: 'labour', label: 'Labour & PF' },
  { id: 'banking', label: 'RBI & Banking' },
]

export default function PortalsDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [search, setSearch] = useState<string>('')

  const filtered = REGULATORY_PORTALS_DATA.filter((portal) => {
    const matchesCat = selectedCategory === 'all' || portal.category === selectedCategory
    const q = search.toLowerCase().trim()
    const matchesSearch =
      !q ||
      portal.name.toLowerCase().includes(q) ||
      portal.shortName.toLowerCase().includes(q) ||
      portal.department.toLowerCase().includes(q) ||
      portal.description.toLowerCase().includes(q) ||
      portal.keyServices.some((s) => s.toLowerCase().includes(q))
    return matchesCat && matchesSearch
  })

  return (
    <div className="portals-directory-container">
      <div className="utility-header">
        <div>
          <span className="calculator-badge">Government Gateways</span>
          <h3 className="calculator-title">Official Regulatory Portals Directory</h3>
          <p className="calculator-subtitle">
            Direct, verified links to central regulatory compliance platforms, e-filing systems, and ministry databases.
          </p>
        </div>

        <div className="utility-search-box">
          <input
            type="text"
            className="form-input form-input--search"
            placeholder="Search portals (e.g. GST, TRACES, MCA, EPFO)..."
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

      <div className="portals-grid">
        {filtered.map((portal) => (
          <div key={portal.id} className="portal-card">
            <div className="portal-card-header">
              <span className="portal-badge-verified">
                <ShieldIcon size={12} />
                <span>{portal.badgeText}</span>
              </span>
              <span className="act-category-tag">{portal.categoryLabel}</span>
            </div>

            <h4 className="portal-card-title">{portal.name}</h4>
            <div className="portal-department">{portal.department}</div>

            <p className="portal-desc">{portal.description}</p>

            <div className="portal-services-box">
              <span className="portal-services-title">Core E-Services:</span>
              <ul className="portal-services-list">
                {portal.keyServices.map((service, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckIcon size={13} style={{ color: '#16a34a', flexShrink: 0 }} />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="portal-card-footer">
              <a
                href={portal.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="portal-primary-btn"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <span>Access Official Portal</span>
                <ExternalLinkIcon size={14} />
              </a>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="empty-state-box">
            No regulatory portals match &ldquo;{search}&rdquo;. Try another search term.
          </div>
        )}
      </div>
    </div>
  )
}

