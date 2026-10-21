'use client'

import React, { useMemo, useState } from 'react'
import { getClosingDateInfo } from '@/lib/jobs'

const TYPE_LABEL: Record<string, string> = {
  'full-time': 'Full-Time Professional',
  'part-time': 'Part-Time Professional',
  contract: 'Retainer / Contract',
  internship: 'ICAI Articleship / Trainee',
}

export interface CareerJobDoc {
  id: string | number
  title: string
  slug: string
  order?: number
  employmentType: string
  department?: string
  location?: any[]
  summary?: string
  experienceMin?: number
  experienceMax?: number
  closingDate?: string
  createdAt?: string
  qualifications?: any[]
}

interface CareersJobListProps {
  initialJobs: CareerJobDoc[]
}

export default function CareersJobList({ initialJobs = [] }: CareersJobListProps) {
  const [sortBy, setSortBy] = useState<'order' | 'latest' | 'exp-asc' | 'exp-desc' | 'alpha'>('order')
  const [selectedDept, setSelectedDept] = useState<string>('all')

  // Extract distinct departments for filtering
  const departments = useMemo(() => {
    const set = new Set<string>()
    initialJobs.forEach((j) => {
      if (j.department && j.department.trim()) {
        set.add(j.department.trim())
      }
    })
    return Array.from(set).sort()
  }, [initialJobs])

  // Filter and sort jobs dynamically
  const filteredAndSortedJobs = useMemo(() => {
    let result = [...initialJobs]

    // 1. Department filter
    if (selectedDept !== 'all') {
      result = result.filter((j) => j.department?.trim() === selectedDept)
    }

    // 2. Sorting logic
    result.sort((a, b) => {
      if (sortBy === 'order') {
        const orderA = typeof a.order === 'number' && a.order > 0 ? a.order : 9999
        const orderB = typeof b.order === 'number' && b.order > 0 ? b.order : 9999
        if (orderA !== orderB) return orderA - orderB
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      }

      if (sortBy === 'latest') {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      }

      if (sortBy === 'exp-asc') {
        const expA = a.experienceMin ?? 0
        const expB = b.experienceMin ?? 0
        return expA - expB
      }

      if (sortBy === 'exp-desc') {
        const expA = a.experienceMin ?? 0
        const expB = b.experienceMin ?? 0
        return expB - expA
      }

      if (sortBy === 'alpha') {
        return a.title.localeCompare(b.title)
      }

      return 0
    })

    return result
  }, [initialJobs, sortBy, selectedDept])

  if (!initialJobs || initialJobs.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '48px 24px',
          background: '#f8fafc',
          borderRadius: 14,
          border: '1.5px dashed #cbd5e1',
          marginBottom: 56,
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>💼</div>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f274a', margin: '0 0 8px' }}>
          Open Enrollment for Articleship &amp; Lateral Roles
        </h3>
        <p style={{ fontSize: 15, color: '#64748b', maxWidth: 600, margin: '0 auto 20px', lineHeight: 1.6 }}>
          We continuously review applications for <strong>ICAI Article Assistants</strong>, <strong>Chartered Accountants</strong>, and <strong>Audit Associates</strong> across Bengaluru, Mumbai, Delhi, and Chennai.
        </p>
        <a
          href="/contact"
          style={{
            background: '#1a4b8c',
            color: '#ffffff',
            padding: '12px 28px',
            borderRadius: 8,
            fontSize: 14.5,
            fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 14px rgba(26, 75, 140, 0.3)',
          }}
        >
          <span>Submit Your Resume Online</span>
          <span>→</span>
        </a>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: 56 }}>
      {/* ── Sort & Filter Controls Toolbar ── */}
      <div
        style={{
          background: '#f8fafc',
          border: '1.5px solid #e2e8f0',
          borderRadius: 12,
          padding: '16px 20px',
          marginBottom: 20,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        {/* Left: Active Count & Filter Summary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: 13.5,
              fontWeight: 800,
              color: '#0f274a',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a' }} />
            {filteredAndSortedJobs.length} {filteredAndSortedJobs.length === 1 ? 'Position Available' : 'Positions Available'}
          </span>

          {selectedDept !== 'all' && (
            <button
              onClick={() => setSelectedDept('all')}
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#dc2626',
                background: '#fee2e2',
                border: 'none',
                borderRadius: 4,
                padding: '3px 8px',
                cursor: 'pointer',
              }}
              title="Clear department filter"
            >
              Clear Department Filter ✕
            </button>
          )}
        </div>

        {/* Right: Sort Options & Department Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {/* Department Filter */}
          {departments.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <label htmlFor="dept-filter" style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>
                Practice:
              </label>
              <select
                id="dept-filter"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#0f274a',
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: 6,
                  padding: '6px 12px',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="all">All Practices ({initialJobs.length})</option>
                {departments.map((dept) => {
                  const count = initialJobs.filter((j) => j.department?.trim() === dept).length
                  return (
                    <option key={dept} value={dept}>
                      {dept} ({count})
                    </option>
                  )
                })}
              </select>
            </div>
          )}

          {/* Sort By Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <label htmlFor="sort-by" style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>
              Sort by:
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#1a4b8c',
                background: '#ffffff',
                border: '1.5px solid #1a4b8c',
                borderRadius: 6,
                padding: '6px 12px',
                cursor: 'pointer',
                outline: 'none',
                boxShadow: '0 1px 3px rgba(26, 75, 140, 0.08)',
              }}
            >
              <option value="order">Order-wise (Sequence 1, 2, 3...)</option>
              <option value="latest">Latest First</option>
              <option value="exp-asc">Experience: Low to High</option>
              <option value="exp-desc">Experience: High to Low</option>
              <option value="alpha">Job Title: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Open Positions Cards List ── */}
      {filteredAndSortedJobs.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '36px 20px',
            background: '#ffffff',
            borderRadius: 12,
            border: '1.5px solid #e2e8f0',
          }}
        >
          <p style={{ fontSize: 15, color: '#64748b', margin: '0 0 12px' }}>
            No open roles found matching the selected filters.
          </p>
          <button
            onClick={() => {
              setSelectedDept('all')
              setSortBy('order')
            }}
            style={{
              background: '#1a4b8c',
              color: '#ffffff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 18px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filteredAndSortedJobs.map((j) => {
            const locations = Array.isArray(j.location)
              ? j.location
                  .map((l: any) => (typeof l === 'object' && l ? l.city : typeof l === 'string' ? l : ''))
                  .filter(Boolean)
              : []
            const deadlineInfo = getClosingDateInfo(j.closingDate)

            return (
              <div
                key={j.id}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: 12,
                  padding: '24px 24px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 20,
                  boxShadow: '0 2px 10px rgba(15, 39, 74, 0.03)',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                  position: 'relative',
                }}
              >
                <div style={{ flex: '1 1 500px', minWidth: 'min(100%, 260px)' }}>
                  {/* Metadata Chips Row */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    {/* Display Order Sequence Indicator */}
                    {typeof j.order === 'number' && j.order > 0 && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          background: '#0f274a',
                          color: '#ffffff',
                          padding: '2px 8px',
                          borderRadius: 4,
                          letterSpacing: 0.5,
                        }}
                        title={`Display Sequence Order: ${j.order}`}
                      >
                        #{j.order}
                      </span>
                    )}

                    <span
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        background: 'rgba(26, 75, 140, 0.08)',
                        color: '#1a4b8c',
                        padding: '3px 10px',
                        borderRadius: 6,
                      }}
                    >
                      {TYPE_LABEL[j.employmentType] || j.employmentType}
                    </span>

                    {locations.length > 0 && (
                      <span
                        style={{
                          fontSize: 11.5,
                          fontWeight: 600,
                          background: '#f1f5f9',
                          color: '#475569',
                          padding: '3px 10px',
                          borderRadius: 6,
                        }}
                      >
                        📍 {locations.join(', ')}
                      </span>
                    )}

                    {j.department && (
                      <span
                        style={{
                          fontSize: 11.5,
                          fontWeight: 600,
                          background: '#f1f5f9',
                          color: '#475569',
                          padding: '3px 10px',
                          borderRadius: 6,
                        }}
                      >
                        🏷️ {j.department}
                      </span>
                    )}

                    {deadlineInfo && (
                      <span
                        style={{
                          fontSize: 11.5,
                          fontWeight: 700,
                          background: deadlineInfo.isUrgent ? '#fef2f2' : '#fffbeb',
                          color: deadlineInfo.isUrgent ? '#b91c1c' : '#92400e',
                          border: `1px solid ${deadlineInfo.isUrgent ? '#fecaca' : '#fde68a'}`,
                          padding: '3px 10px',
                          borderRadius: 6,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                        title={`Applications close on ${deadlineInfo.formatted}`}
                      >
                        <span>{deadlineInfo.isUrgent ? '⏰' : '📅'}</span>
                        <span>Apply by {deadlineInfo.formatted}</span>
                        {deadlineInfo.urgencyText && (
                          <span style={{ opacity: 0.85, fontWeight: 600 }}>({deadlineInfo.urgencyText})</span>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Job Title */}
                  <h3 style={{ fontSize: 20, color: '#0f274a', fontWeight: 800, margin: '0 0 6px' }}>
                    {j.title}
                  </h3>

                  {/* Summary */}
                  {j.summary && (
                    <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                      {j.summary}
                    </p>
                  )}
                </div>

                {/* Right Action: View Link */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                  <a
                    href={`/careers/${j.slug}`}
                    style={{
                      background: '#1a4b8c',
                      color: '#ffffff',
                      padding: '10px 22px',
                      borderRadius: 6,
                      fontWeight: 700,
                      fontSize: 13.5,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      boxShadow: '0 4px 12px rgba(26, 75, 140, 0.25)',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>View</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
