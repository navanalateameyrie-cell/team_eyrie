'use client'

import React, { useState } from 'react'

export interface InsightItem {
  id: string | number
  title: string
  slug?: string | null
  category?: 'news' | 'insight' | 'regulatory' | 'event' | string | null
  excerpt?: string | null
  coverImage?: any
  pdfFile?: any
  pdfUrl?: string | null
  publishedDate?: string | null
}

const CAT_LABELS: Record<string, string> = {
  all: 'All Publications',
  insight: 'Articles',
  news: 'News & Circulars',
  regulatory: 'Regulatory Updates',
  event: 'Events',
}

function getPdfUrl(item: InsightItem): string | null {
  if (typeof item.pdfFile === 'object' && item.pdfFile?.url) {
    return item.pdfFile.url
  }
  if (typeof item.pdfUrl === 'string' && item.pdfUrl.trim().length > 0) {
    return item.pdfUrl
  }
  return null
}

function getPdfFilename(item: InsightItem): string {
  if (typeof item.pdfFile === 'object' && item.pdfFile?.filename) {
    return item.pdfFile.filename
  }
  return `${(item.slug || 'news-document')}.pdf`
}

export default function InsightsView({ items }: { items: InsightItem[] }) {
  const [activeTab, setActiveTab] = useState<string>('all')

  const filteredItems = items.filter((item) => {
    if (activeTab === 'all') return true
    if (activeTab === 'news') return item.category === 'news' || Boolean(getPdfUrl(item))
    if (activeTab === 'insight') return item.category === 'insight' || !item.category
    return item.category === activeTab
  })

  const counts: Record<string, number> = {
    all: items.length,
    insight: items.filter((i) => i.category === 'insight' || !i.category).length,
    news: items.filter((i) => i.category === 'news' || Boolean(getPdfUrl(i))).length,
    regulatory: items.filter((i) => i.category === 'regulatory').length,
  }

  return (
    <div>
      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          justifyContent: 'center',
          marginBottom: 42,
        }}
      >
        {(['all', 'insight', 'news', 'regulatory'] as const).map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                borderRadius: 30,
                border: `1.5px solid ${isActive ? '#1a4b8c' : '#e2e8f0'}`,
                background: isActive ? '#1a4b8c' : '#ffffff',
                color: isActive ? '#ffffff' : '#334155',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: isActive ? '0 4px 12px rgba(26,75,140,0.18)' : '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <span>{CAT_LABELS[tab]}</span>
              <span
                style={{
                  fontSize: 12,
                  padding: '2px 8px',
                  borderRadius: 12,
                  background: isActive ? 'rgba(255,255,255,0.22)' : '#f1f5f9',
                  color: isActive ? '#ffffff' : '#64748b',
                  fontWeight: 800,
                }}
              >
                {counts[tab] || 0}
              </span>
            </button>
          )
        })}
      </div>

      {filteredItems.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 24px',
            background: '#f8fafc',
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            marginBottom: 48,
          }}
        >
          <p style={{ fontSize: 16, color: '#64748b', margin: 0 }}>
            No publications found under this category.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 26,
            marginBottom: 56,
          }}
        >
          {filteredItems.map((p) => {
            const img =
              typeof p.coverImage === 'object' && p.coverImage?.url ? p.coverImage.url : null
            const pdf = getPdfUrl(p)
            const pdfFilename = getPdfFilename(p)
            const isNews = p.category === 'news' || Boolean(pdf)
            const isArticle = p.category === 'insight' || (!p.category && !pdf)

            return (
              <div
                key={p.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 14,
                  border: '1.5px solid #e2e8f0',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 16px rgba(15, 39, 74, 0.05)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                {/* Cover Image */}
                {img ? (
                  <div style={{ position: 'relative', height: 180, width: '100%', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={p.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        display: 'flex',
                        gap: 6,
                      }}
                    >
                      <span
                        style={{
                          background: isNews ? '#0f274a' : '#1a4b8c',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: 11,
                          textTransform: 'uppercase',
                          letterSpacing: 0.8,
                          padding: '4px 10px',
                          borderRadius: 6,
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        {isArticle ? 'Article' : isNews ? 'News Circular' : (CAT_LABELS[p.category || ''] || p.category)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '18px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        background: isNews ? 'rgba(15,39,74,0.08)' : 'rgba(26,75,140,0.08)',
                        color: isNews ? '#0f274a' : '#1a4b8c',
                        fontWeight: 700,
                        fontSize: 11.5,
                        textTransform: 'uppercase',
                        letterSpacing: 0.8,
                        padding: '4px 10px',
                        borderRadius: 6,
                      }}
                    >
                      {isArticle ? 'Article' : isNews ? 'News Circular' : (CAT_LABELS[p.category || ''] || p.category)}
                    </span>
                    {pdf && (
                      <span
                        style={{
                          background: 'rgba(220,38,38,0.08)',
                          color: '#dc2626',
                          fontWeight: 700,
                          fontSize: 11,
                          padding: '3px 8px',
                          borderRadius: 4,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        📄 PDF
                      </span>
                    )}
                  </div>
                )}

                {/* Content */}
                <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {p.publishedDate && (
                    <span style={{ fontSize: 12.5, color: '#94a3b8', fontWeight: 600, marginBottom: 8 }}>
                      📅 {new Date(p.publishedDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  )}

                  <h3
                    style={{
                      fontSize: 18,
                      color: '#071A3A',
                      fontWeight: 800,
                      margin: '0 0 10px',
                      lineHeight: 1.4,
                    }}
                  >
                    <a
                      href={`/insights/${p.slug}`}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {p.title}
                    </a>
                  </h3>

                  {p.excerpt && (
                    <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: '0 0 16px', flex: 1 }}>
                      {p.excerpt}
                    </p>
                  )}

                  {/* Actions Bar */}
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: 14,
                      borderTop: '1px solid #f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 10,
                      flexWrap: 'wrap',
                    }}
                  >
                    {/* For News with PDF: Download and Read Option */}
                    {isNews && pdf ? (
                      <>
                        <a
                          href={pdf}
                          download={pdfFilename}
                          className="btn btn--primary"
                          style={{
                            padding: '8px 14px',
                            fontSize: 13,
                            fontWeight: 700,
                            borderRadius: 6,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                          title="Download PDF document"
                        >
                          <span>📥</span>
                          <span>Download PDF</span>
                        </a>

                        <a
                          href={`/insights/${p.slug}`}
                          style={{
                            fontSize: 13,
                            color: '#1a4b8c',
                            fontWeight: 700,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <span>View →</span>
                        </a>
                      </>
                    ) : (
                      /* For Articles: Read on Website */
                      <a
                        href={`/insights/${p.slug}`}
                        style={{
                          fontSize: 13.5,
                          color: '#1a4b8c',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          marginLeft: 'auto',
                        }}
                      >
                        <span>Read Article on Website</span>
                        <span>→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

