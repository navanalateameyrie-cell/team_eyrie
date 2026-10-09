'use client'

import React, { useEffect, useState } from 'react'
import './CustomDashboard.scss'

interface RecentLead {
  id: string | number
  name: string
  email: string
  company: string
  subject: string
  status: string
  createdAt: string
}

interface RecentApp {
  id: string | number
  fullName: string
  email: string
  jobTitle: string
  stage: string
  createdAt: string
}

interface DashboardStats {
  users: number
  jobs: number
  applications: number
  teamMembers: number
  enquiries: number
  appointments: number
  services: number
  offices: number
  announcements: number
  recentLeads: RecentLead[]
  recentApps: RecentApp[]
}

const INITIAL_STATS: DashboardStats = {
  users: 0,
  jobs: 0,
  applications: 0,
  teamMembers: 0,
  enquiries: 0,
  appointments: 0,
  services: 0,
  offices: 0,
  announcements: 0,
  recentLeads: [],
  recentApps: [],
}

function formatDate(iso: string) {
  if (!iso) return ''
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

function getLeadBadge(status: string) {
  switch (status?.toLowerCase()) {
    case 'new':
      return { label: 'New', className: 'badge--blue' }
    case 'in-progress':
      return { label: 'In Progress', className: 'badge--amber' }
    case 'responded':
      return { label: 'Responded', className: 'badge--emerald' }
    case 'closed':
      return { label: 'Closed', className: 'badge--gray' }
    default:
      return { label: status || 'Pending', className: 'badge--gray' }
  }
}

function getAppBadge(stage: string) {
  switch (stage?.toLowerCase()) {
    case 'new':
      return { label: 'New', className: 'badge--indigo' }
    case 'shortlisted':
      return { label: 'Shortlisted', className: 'badge--emerald' }
    case 'interview':
      return { label: 'Interview', className: 'badge--amber' }
    case 'offer':
    case 'hired':
      return { label: stage.toUpperCase(), className: 'badge--green' }
    case 'rejected':
      return { label: 'Rejected', className: 'badge--rose' }
    default:
      return { label: stage || 'Review', className: 'badge--gray' }
  }
}

export default function CustomDashboard() {
  const [stats, setStats] = useState<DashboardStats>(INITIAL_STATS)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'leads' | 'applications'>('leads')

  const fetchStats = async (isManual = false) => {
    if (isManual) setRefreshing(true)
    try {
      const res = await fetch('/api/admin-stats')
      if (res.ok) {
        const data = await res.json()
        setStats({
          users: data.users || 0,
          jobs: data.jobs || 0,
          applications: data.applications || 0,
          teamMembers: data.teamMembers || 0,
          enquiries: data.enquiries || 0,
          appointments: data.appointments || 0,
          services: data.services || 0,
          offices: data.offices || 0,
          announcements: data.announcements || 0,
          recentLeads: Array.isArray(data.recentLeads) ? data.recentLeads : [],
          recentApps: Array.isArray(data.recentApps) ? data.recentApps : [],
        })
        const now = new Date()
        setLastUpdated(
          now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        )
      }
    } catch (err) {
      console.warn('Dashboard stats notice:', err)
    } finally {
      setLoading(false)
      if (isManual) setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const kpis = [
    {
      title: 'Client Enquiries',
      value: stats.enquiries,
      sub: 'Incoming corporate leads',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01M12 10h.01M16 10h.01" />
        </svg>
      ),
      accent: '#2563EB',
      bgTint: 'rgba(37, 99, 235, 0.08)',
      link: '/admin/collections/contact-leads',
    },
    {
      title: 'Job Applications',
      value: stats.applications,
      sub: 'Articleship & lateral resumes',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      accent: '#E87722',
      bgTint: 'rgba(232, 119, 34, 0.08)',
      link: '/admin/collections/job-applications',
    },
    {
      title: 'Active Mandates',
      value: stats.jobs,
      sub: 'Open vacancies across India',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      accent: '#059669',
      bgTint: 'rgba(5, 150, 105, 0.08)',
      link: '/admin/collections/jobs',
    },
    {
      title: 'Practice Leaders',
      value: stats.teamMembers,
      sub: 'Partners & senior advisors',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      accent: '#7C3AED',
      bgTint: 'rgba(124, 58, 237, 0.08)',
      link: '/admin/collections/team-members',
    },
    {
      title: 'Core Practice Areas',
      value: stats.services,
      sub: 'Assurance, tax & governance',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      accent: '#C09B5A',
      bgTint: 'rgba(192, 155, 90, 0.1)',
      link: '/admin/collections/services',
    },
    {
      title: 'Pan-India Offices',
      value: stats.offices,
      sub: 'Major metropolitan hubs',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      accent: '#0F2A4A',
      bgTint: 'rgba(15, 42, 74, 0.08)',
      link: '/admin/collections/offices',
    },
  ]

  if (loading) {
    return (
      <div className="te-dash-loading">
        <div className="te-dash-spinner" />
        <p>Initializing Executive Management Console...</p>
      </div>
    )
  }

  return (
    <div className="te-dash">
      {/* ── TOP HERO / EXECUTIVE BANNER ── */}
      <header className="te-dash-hero">
        <div className="te-dash-hero__info">
          <div className="te-dash-hero__eyebrow">
            <span className="te-dash-pulse-dot" />
            <span>TEAM EYRIE • ENTERPRISE MANAGEMENT PORTAL</span>
          </div>
          <h1 className="te-dash-hero__title">Executive Management Console</h1>
          <p className="te-dash-hero__subtitle">
            Enterprise overview across client enquiries, talent recruitment, pan-India offices, and regulatory governance.
          </p>
        </div>

        <div className="te-dash-hero__actions">
          <div className="te-dash-status-pill">
            <span className="te-dash-status-dot" />
            <span>All Systems Live &amp; Operational</span>
          </div>

          <div className="te-dash-hero__btn-group">
            <button
              type="button"
              onClick={() => fetchStats(true)}
              className="te-dash-btn te-dash-btn--secondary"
              title="Refresh Dashboard Data"
            >
              <svg
                className={refreshing ? 'spinning' : ''}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="te-dash-btn te-dash-btn--primary"
            >
              <span>View Live Website</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>

          {lastUpdated && (
            <span className="te-dash-last-updated">Updated today at {lastUpdated}</span>
          )}
        </div>
      </header>

      {/* ── PRIMARY KPI CARDS ── */}
      <section className="te-dash-kpis">
        {kpis.map((kpi, idx) => (
          <a key={idx} href={kpi.link} className={`te-kpi-card te-kpi-card--${idx}`}>
            <div className="te-kpi-card__top">
              <span className="te-kpi-card__title">{kpi.title}</span>
              <div
                className="te-kpi-card__icon"
                style={{ color: kpi.accent, background: kpi.bgTint }}
              >
                {kpi.icon}
              </div>
            </div>

            <div className="te-kpi-card__body">
              <span className="te-kpi-card__val">{kpi.value}</span>
              <span className="te-kpi-card__sub">{kpi.sub}</span>
            </div>

            <div className="te-kpi-card__footer">
              <span>View collection</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </a>
        ))}
      </section>

      {/* ── TWO-COLUMN OPERATIONAL HUB ── */}
      <div className="te-dash-hub">
        {/* LEFT COLUMN: LIVE ACTIVITY FEEDS */}
        <section className="te-dash-main">
          <div className="te-feed-panel">
            <div className="te-feed-header">
              <div className="te-feed-tabs">
                <button
                  type="button"
                  className={`te-feed-tab ${activeTab === 'leads' ? 'is-active is-active--leads' : ''}`}
                  onClick={() => setActiveTab('leads')}
                >
                  <span>Client Enquiries</span>
                  <span className="te-feed-count">{stats.enquiries}</span>
                </button>
                <button
                  type="button"
                  className={`te-feed-tab ${activeTab === 'applications' ? 'is-active is-active--apps' : ''}`}
                  onClick={() => setActiveTab('applications')}
                >
                  <span>Job Applications</span>
                  <span className="te-feed-count">{stats.applications}</span>
                </button>
              </div>

              <a
                href={
                  activeTab === 'leads'
                    ? '/admin/collections/contact-leads'
                    : '/admin/collections/job-applications'
                }
                className="te-feed-viewall"
              >
                <span>View all</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>

            {/* TAB CONTENT: CLIENT LEADS */}
            {activeTab === 'leads' && (
              <div className="te-table-wrap">
                {stats.recentLeads.length === 0 ? (
                  <div className="te-empty-state">
                    <p>No recent client enquiries logged yet.</p>
                  </div>
                ) : (
                  <table className="te-table">
                    <thead>
                      <tr>
                        <th>Client / Company</th>
                        <th>Subject / Request</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentLeads.map((lead) => {
                        const badge = getLeadBadge(lead.status)
                        return (
                          <tr key={lead.id}>
                            <td>
                              <div className="te-cell-primary">{lead.name}</div>
                              <div className="te-cell-sub">{lead.company} • {lead.email}</div>
                            </td>
                            <td>
                              <span className="te-cell-subject">{lead.subject}</span>
                            </td>
                            <td>
                              <span className={`te-badge ${badge.className}`}>{badge.label}</span>
                            </td>
                            <td className="te-cell-date">{formatDate(lead.createdAt)}</td>
                            <td>
                              <a
                                href={`/admin/collections/contact-leads/${lead.id}`}
                                className="te-table-link"
                              >
                                View →
                              </a>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* TAB CONTENT: CANDIDATE APPLICATIONS */}
            {activeTab === 'applications' && (
              <div className="te-table-wrap">
                {stats.recentApps.length === 0 ? (
                  <div className="te-empty-state">
                    <p>No candidate applications submitted yet.</p>
                  </div>
                ) : (
                  <table className="te-table">
                    <thead>
                      <tr>
                        <th>Applicant</th>
                        <th>Position Applied</th>
                        <th>Stage</th>
                        <th>Submitted</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentApps.map((app) => {
                        const badge = getAppBadge(app.stage)
                        return (
                          <tr key={app.id}>
                            <td>
                              <div className="te-cell-primary">{app.fullName}</div>
                              <div className="te-cell-sub">{app.email}</div>
                            </td>
                            <td>
                              <span className="te-cell-role">{app.jobTitle}</span>
                            </td>
                            <td>
                              <span className={`te-badge ${badge.className}`}>{badge.label}</span>
                            </td>
                            <td className="te-cell-date">{formatDate(app.createdAt)}</td>
                            <td>
                              <a
                                href={`/admin/collections/job-applications/${app.id}`}
                                className="te-table-link"
                              >
                                Review →
                              </a>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: QUICK ACTIONS & COMPLIANCE */}
        <aside className="te-dash-sidebar">
          {/* QUICK ACTIONS CARD */}
          <div className="te-panel">
            <h3 className="te-panel__title">Executive Actions</h3>
            <p className="te-panel__desc">Frequently executed management workflows.</p>

            <div className="te-actions-list">
              <a href="/admin/collections/jobs/create" className="te-action-row">
                <div className="te-action-icon te-action-icon--emerald">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    <line x1="12" y1="11" x2="12" y2="17" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                  </svg>
                </div>
                <div className="te-action-info">
                  <span className="te-action-name">Post Job Vacancy</span>
                  <span className="te-action-detail">Publish article trainee or CA role</span>
                </div>
                <span className="te-action-arrow">→</span>
              </a>

              <a href="/admin/collections/team-members/create" className="te-action-row">
                <div className="te-action-icon te-action-icon--blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                </div>
                <div className="te-action-info">
                  <span className="te-action-name">Add Practice Partner</span>
                  <span className="te-action-detail">Showcase senior leaders on /people</span>
                </div>
                <span className="te-action-arrow">→</span>
              </a>

              <a href="/admin/collections/announcements/create" className="te-action-row">
                <div className="te-action-icon te-action-icon--gold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                </div>
                <div className="te-action-info">
                  <span className="te-action-name">Publish Circular / Roadmap</span>
                  <span className="te-action-detail">Tax, GST &amp; MCA regulatory updates</span>
                </div>
                <span className="te-action-arrow">→</span>
              </a>

              <a href="/admin/globals/home-page" className="te-action-row">
                <div className="te-action-icon te-action-icon--copper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div className="te-action-info">
                  <span className="te-action-name">Edit Homepage Banners</span>
                  <span className="te-action-detail">Update hero slides, video &amp; stats</span>
                </div>
                <span className="te-action-arrow">→</span>
              </a>

              <a href="/admin/globals/site-settings" className="te-action-row">
                <div className="te-action-icon te-action-icon--purple">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
                <div className="te-action-info">
                  <span className="te-action-name">Firm Contacts &amp; Presence</span>
                  <span className="te-action-detail">Phone numbers, emails &amp; addresses</span>
                </div>
                <span className="te-action-arrow">→</span>
              </a>
            </div>
          </div>

          {/* COMPLIANCE & PLATFORM STATUS */}
          <div className="te-panel te-panel--governance">
            <h3 className="te-panel__title">
              Governance &amp; Infrastructure
            </h3>
            <p className="te-panel__desc">
              Regulatory compliance posture and environment status.
            </p>

            <ul className="te-status-list">
              <li>
                <div className="te-status-item">
                  <span className="te-status-check">✓</span>
                  <div>
                    <strong>ICAI Advisory Guidelines</strong>
                    <span>Strict compliance with ICAI non-solicitation code</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="te-status-item">
                  <span className="te-status-check">✓</span>
                  <div>
                    <strong>DPDP Act 2023 Consent Guard</strong>
                    <span>Digital personal data notices logged and archived</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="te-status-item">
                  <span className="te-status-check">✓</span>
                  <div>
                    <strong>PostgreSQL Enterprise Storage</strong>
                    <span>Secure cloud-hosted relational database</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="te-status-item">
                  <span className="te-status-check">✓</span>
                  <div>
                    <strong>Multilingual Engine</strong>
                    <span>8 Indian regional languages + English enabled</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
