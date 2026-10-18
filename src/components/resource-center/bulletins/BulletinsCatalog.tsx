'use client'

import React, { useState, useMemo } from 'react'
import { BULLETINS_DATA, BulletinItem } from '@/data/resource-center/bulletinsData'

const CATEGORIES = [
  { id: 'all', label: 'All Updates (9)' },
  { id: 'income-tax', label: 'Income Tax' },
  { id: 'gst', label: 'GST & Indirect Tax' },
  { id: 'rbi', label: 'RBI & Banking' },
  { id: 'sebi', label: 'SEBI & Securities' },
  { id: 'mca', label: 'Companies Act & MCA' },
  { id: 'fema', label: 'FEMA & Trade' },
  { id: 'indas', label: 'Accounting Standards (Ind AS)' },
  { id: 'labour', label: 'Labour Laws' },
  { id: 'state-tax', label: 'State Tax' },
]

export default function BulletinsCatalog({ initialCategory }: { initialCategory?: string }) {
  const [selectedCat, setSelectedCat] = useState<string>(initialCategory || 'all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBulletins = useMemo(() => {
    return BULLETINS_DATA.filter((item) => {
      const matchesCat = selectedCat === 'all' || item.category === selectedCat
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sourceAuthority.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCat && matchesSearch
    })
  }, [selectedCat, searchQuery])

  return (
    <div className="inst-tool-card" style={{ padding: '24px 28px' }}>
      <div className="inst-tool-header" style={{ marginBottom: '20px' }}>
        <div>
          <span className="inst-meta-tag">STATUTORY CIRCULARS &amp; OFFICIAL GAZETTES</span>
          <h2 className="inst-tool-title">Professional Regulatory Bulletins</h2>
          <p className="inst-tool-desc">
            Verified official circulars, notifications, and gazette amendments issued by regulatory authorities (CBDT, CBIC, RBI, SEBI, MCA, and ICAI) for compliance and advisory.
          </p>
        </div>
        <div className="inst-tool-header-badge">
          <span>Official Gazettes</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ flex: '1 1 260px' }}>
          <input
            type="text"
            className="inst-input-text"
            placeholder="Search notifications by keyword, authority, circular name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '9px 14px', fontSize: '13px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: selectedCat === cat.id ? '#1e40af' : '#e2e8f0',
                background: selectedCat === cat.id ? '#1e40af' : '#ffffff',
                color: selectedCat === cat.id ? '#ffffff' : '#475569',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bulletins Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {filteredBulletins.map((b) => (
          <div
            key={b.id}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '16px',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px',
                    color: '#ea580c',
                    background: 'rgba(234, 88, 12, 0.08)',
                    padding: '3px 7px',
                    borderRadius: '4px',
                  }}
                >
                  {b.badge}
                </span>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                  Published: {b.publishedDate}
                </span>
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', lineHeight: 1.35, marginBottom: '8px' }}>
                {b.title}
              </h3>
              <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.45, marginBottom: '12px' }}>
                {b.summary}
              </p>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10.5px', color: '#64748b' }}>Authority: {b.sourceAuthority}</span>
                <span style={{ fontSize: '10px', color: '#059669', fontWeight: 600 }}>Effective: {b.effectiveDate}</span>
              </div>
              <a
                href={b.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#1e40af',
                  textDecoration: 'none',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: '#eff6ff',
                }}
              >
                <span>Official Source</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        ))}

        {filteredBulletins.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '40px 20px', textAlign: 'center', color: '#64748b' }}>
            <p style={{ fontSize: '14px', fontWeight: 600 }}>No circulars found matching your search criteria.</p>
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Try switching category filter or resetting keyword.</p>
          </div>
        )}
      </div>
    </div>
  )
}

