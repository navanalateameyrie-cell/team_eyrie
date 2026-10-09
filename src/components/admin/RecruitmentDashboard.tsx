import React from 'react'
import './RecruitmentDashboard.scss'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'

export const RecruitmentDashboard = async () => {
  const payload = await getPayload({ config: configPromise })

  // 1. Fetch Open Jobs
  const { docs: openJobs, totalDocs: totalJobs } = await payload.find({
    collection: 'jobs',
    where: { status: { equals: 'open' } },
    depth: 0,
    limit: 100,
  })

  // 2. Fetch all configured Jobs count
  const { totalDocs: allJobsCount } = await payload.find({
    collection: 'jobs',
    depth: 0,
    limit: 1,
  })

  // 3. Fetch Job Applications
  const { docs: applications, totalDocs: totalApps } = await payload.find({
    collection: 'job-applications',
    depth: 1,
    limit: 1000,
  })

  // 4. Calculate Pipeline Stages
  const newAppsCount = applications.filter((a: any) => !a.stage || a.stage === 'new').length
  const shortlistedCount = applications.filter((a: any) => a.stage === 'shortlisted').length
  const interviewingCount = applications.filter((a: any) => a.stage === 'interview').length
  const offerHiredCount = applications.filter(
    (a: any) => a.stage === 'offer' || a.stage === 'hired',
  ).length

  // 5. Calculate Applications per Job
  const appsPerJob: Record<string, number> = {}
  applications.forEach((app: any) => {
    const jobTitle = app.job?.title || 'General Inflow'
    appsPerJob[jobTitle] = (appsPerJob[jobTitle] || 0) + 1
  })

  const maxApps = Math.max(...Object.values(appsPerJob), 1)

  return (
    <div className="rd-container">
      {/* ── Executive Hero Banner ── */}
      <div className="rd-hero">
        <div className="rd-hero__info">
          <div className="rd-hero__eyebrow">
            <span className="rd-pulse-dot"></span>
            Talent Acquisition & Careers Hub
          </div>
          <h1 className="rd-hero__title">Recruitment & Pipeline Overview</h1>
          <p className="rd-hero__subtitle">
            Real-time intelligence on active vacancies, candidate velocity, and hiring stages across
            Team Eyrie offices nationwide.
          </p>
        </div>

        <div className="rd-hero__actions">
          <Link href="/admin/collections/jobs/create" className="rd-btn rd-btn--accent">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Post New Job
          </Link>
          <Link href="/admin/collections/jobs" className="rd-btn rd-btn--secondary">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            Manage Openings
          </Link>
          <Link href="/admin/collections/job-applications" className="rd-btn rd-btn--primary">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            View Applicants
            {totalApps > 0 && <span className="rd-btn-counter">{totalApps}</span>}
          </Link>
        </div>
      </div>

      {/* ── 4 Key Performance Indicator (KPI) Metric Cards ── */}
      <div className="rd-kpi-grid">
        {/* KPI 1: Active Openings */}
        <div className="rd-kpi-card rd-kpi-card--blue">
          <div className="rd-kpi-top">
            <div className="rd-kpi-icon rd-kpi-icon--blue">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <span className="rd-kpi-badge rd-kpi-badge--green">Live & Hiring</span>
          </div>
          <span className="rd-kpi-label">Active Job Openings</span>
          <div className="rd-kpi-number-wrap">
            <span className="rd-kpi-number">{totalJobs}</span>
            <span className="rd-kpi-unit">Openings</span>
          </div>
          <div className="rd-kpi-footer">
            <span>Configured in database: {allJobsCount} positions</span>
            <Link href="/admin/collections/jobs" className="rd-kpi-link">
              Browse →
            </Link>
          </div>
        </div>

        {/* KPI 2: Total Applications */}
        <div className="rd-kpi-card rd-kpi-card--amber">
          <div className="rd-kpi-top">
            <div className="rd-kpi-icon rd-kpi-icon--amber">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <span className="rd-kpi-badge rd-kpi-badge--amber">Inflow Volume</span>
          </div>
          <span className="rd-kpi-label">Total Applications Received</span>
          <div className="rd-kpi-number-wrap">
            <span className="rd-kpi-number">{totalApps}</span>
            <span className="rd-kpi-unit">Candidates</span>
          </div>
          <div className="rd-kpi-footer">
            <span>Lifetime candidate submissions</span>
            <Link href="/admin/collections/job-applications" className="rd-kpi-link">
              Review →
            </Link>
          </div>
        </div>

        {/* KPI 3: Active Interviews */}
        <div className="rd-kpi-card rd-kpi-card--emerald">
          <div className="rd-kpi-top">
            <div className="rd-kpi-icon rd-kpi-icon--emerald">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <span className="rd-kpi-badge rd-kpi-badge--emerald">Active Stages</span>
          </div>
          <span className="rd-kpi-label">Currently Interviewing</span>
          <div className="rd-kpi-number-wrap">
            <span className="rd-kpi-number">{interviewingCount}</span>
            <span className="rd-kpi-unit">In Evaluation</span>
          </div>
          <div className="rd-kpi-footer">
            <span>Panel interviews & technical rounds</span>
            <Link
              href="/admin/collections/job-applications?where[stage][equals]=interview"
              className="rd-kpi-link"
            >
              Inspect →
            </Link>
          </div>
        </div>

        {/* KPI 4: Pending Screening */}
        <div className="rd-kpi-card rd-kpi-card--purple">
          <div className="rd-kpi-top">
            <div className="rd-kpi-icon rd-kpi-icon--purple">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <span className="rd-kpi-badge rd-kpi-badge--purple">Action Required</span>
          </div>
          <span className="rd-kpi-label">Pending Recruiter Screening</span>
          <div className="rd-kpi-number-wrap">
            <span className="rd-kpi-number">{newAppsCount}</span>
            <span className="rd-kpi-unit">New CVs</span>
          </div>
          <div className="rd-kpi-footer">
            <span>{shortlistedCount} currently shortlisted</span>
            <Link
              href="/admin/collections/job-applications?where[stage][equals]=new"
              className="rd-kpi-link"
            >
              Filter →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Candidate Pipeline Lifecycle Funnel ── */}
      <div className="rd-pipeline-card">
        <div className="rd-pipeline-header">
          <div className="rd-pipeline-title-wrap">
            <span className="rd-pipeline-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </span>
            <div>
              <h2 className="rd-card-title">Candidate Pipeline Stages</h2>
              <p className="rd-card-subtext">
                Live candidate velocity through all 5 hiring qualification stages.
              </p>
            </div>
          </div>
          <div className="rd-pipeline-meta">
            <span className="rd-stat-pill">Total Active: {totalApps}</span>
          </div>
        </div>

        <div className="rd-funnel-stages">
          {/* Stage 1 */}
          <div className="rd-funnel-step">
            <div className="rd-funnel-step__indicator rd-funnel-step__indicator--blue">
              <span className="rd-funnel-step__num">1</span>
            </div>
            <div className="rd-funnel-step__content">
              <div className="rd-funnel-step__title">New Inflow</div>
              <div className="rd-funnel-step__count">{newAppsCount} Candidates</div>
              <div className="rd-funnel-bar">
                <div
                  className="rd-funnel-fill rd-funnel-fill--blue"
                  style={{ width: `${totalApps > 0 ? (newAppsCount / totalApps) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="rd-funnel-step">
            <div className="rd-funnel-step__indicator rd-funnel-step__indicator--cyan">
              <span className="rd-funnel-step__num">2</span>
            </div>
            <div className="rd-funnel-step__content">
              <div className="rd-funnel-step__title">Shortlisted</div>
              <div className="rd-funnel-step__count">{shortlistedCount} Candidates</div>
              <div className="rd-funnel-bar">
                <div
                  className="rd-funnel-fill rd-funnel-fill--cyan"
                  style={{
                    width: `${totalApps > 0 ? (shortlistedCount / totalApps) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="rd-funnel-step">
            <div className="rd-funnel-step__indicator rd-funnel-step__indicator--amber">
              <span className="rd-funnel-step__num">3</span>
            </div>
            <div className="rd-funnel-step__content">
              <div className="rd-funnel-step__title">Interviews</div>
              <div className="rd-funnel-step__count">{interviewingCount} Candidates</div>
              <div className="rd-funnel-bar">
                <div
                  className="rd-funnel-fill rd-funnel-fill--amber"
                  style={{
                    width: `${totalApps > 0 ? (interviewingCount / totalApps) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Stage 4 */}
          <div className="rd-funnel-step">
            <div className="rd-funnel-step__indicator rd-funnel-step__indicator--emerald">
              <span className="rd-funnel-step__num">4</span>
            </div>
            <div className="rd-funnel-step__content">
              <div className="rd-funnel-step__title">Offers / Hired</div>
              <div className="rd-funnel-step__count">{offerHiredCount} Finalized</div>
              <div className="rd-funnel-bar">
                <div
                  className="rd-funnel-fill rd-funnel-fill--emerald"
                  style={{
                    width: `${totalApps > 0 ? (offerHiredCount / totalApps) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Data Split Grid ── */}
      <div className="rd-data-grid">
        {/* Left Column: Application Distribution By Role */}
        <div className="rd-data-card">
          <div className="rd-data-card__header">
            <div className="rd-data-card__header-left">
              <div className="rd-section-icon rd-section-icon--blue">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <div>
                <h2 className="rd-card-title">Application Volume by Role</h2>
                <p className="rd-card-subtext">Candidate distribution by job title</p>
              </div>
            </div>
            <Link href="/admin/collections/job-applications" className="rd-view-all-link">
              View All →
            </Link>
          </div>

          <div className="rd-graph-container">
            {Object.entries(appsPerJob).length === 0 ? (
              <div className="rd-empty-state">
                <div className="rd-empty-icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1a4b8c"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <circle cx="12" cy="14" r="3"></circle>
                    <line x1="14.5" y1="16.5" x2="18" y2="20"></line>
                  </svg>
                </div>
                <h4 className="rd-empty-title">Pipeline Ready for Inflow</h4>
                <p className="rd-empty-desc">
                  No candidate submissions recorded yet. Once applicants submit their resumes
                  through your online Careers page, volume and conversion charts will populate here.
                </p>
                <div className="rd-empty-actions">
                  <a
                    href="/careers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rd-btn-ghost"
                  >
                    Open Careers Portal ↗
                  </a>
                </div>
              </div>
            ) : (
              Object.entries(appsPerJob)
                .sort((a, b) => b[1] - a[1])
                .map(([jobTitle, count], idx) => {
                  const percentage = Math.round((count / maxApps) * 100)
                  return (
                    <div key={jobTitle} className="rd-graph-row">
                      <div className="rd-graph-label-wrap">
                        <div className="rd-graph-title-group">
                          <span className="rd-rank-pill">#{idx + 1}</span>
                          <span className="rd-graph-label">{jobTitle}</span>
                        </div>
                        <div className="rd-graph-stats">
                          <span className="rd-graph-count">{count} Applicants</span>
                          <span className="rd-graph-pct">({percentage}%)</span>
                        </div>
                      </div>
                      <div className="rd-graph-track">
                        <div className="rd-graph-fill" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  )
                })
            )}
          </div>
        </div>

        {/* Right Column: Currently Open Positions */}
        <div className="rd-data-card">
          <div className="rd-data-card__header">
            <div className="rd-data-card__header-left">
              <div className="rd-section-icon rd-section-icon--emerald">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 14 14"></polyline>
                </svg>
              </div>
              <div>
                <h2 className="rd-card-title">Currently Open Positions</h2>
                <p className="rd-card-subtext">Active roles published on Team Eyrie</p>
              </div>
            </div>
            <div className="rd-header-counter-pill">{openJobs.length} Live</div>
          </div>

          <div className="rd-job-list">
            {openJobs.length === 0 ? (
              <div className="rd-empty-state">
                <div className="rd-empty-icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <h4 className="rd-empty-title">No Active Openings</h4>
                <p className="rd-empty-desc">
                  All positions are currently either drafted or closed. Create and publish a new job
                  to start accepting candidates.
                </p>
                <div className="rd-empty-actions">
                  <Link href="/admin/collections/jobs/create" className="rd-btn-ghost">
                    + Create First Opening
                  </Link>
                </div>
              </div>
            ) : (
              openJobs.map((job: any) => {
                const jobCount = appsPerJob[job.title] || 0
                return (
                  <Link
                    key={job.id}
                    href={`/admin/collections/jobs/${job.id}`}
                    className="rd-job-card"
                  >
                    <div className="rd-job-info">
                      <div className="rd-job-title-row">
                        <span className="rd-job-title">{job.title}</span>
                        <span className="rd-job-status-dot" title="Active Opening"></span>
                      </div>
                      <div className="rd-job-meta">
                        <span className={`rd-job-type-pill rd-job-type-pill--${job.employmentType}`}>
                          {job.employmentType === 'full-time'
                            ? 'Full-time'
                            : job.employmentType === 'internship'
                              ? 'Internship / Articleship'
                              : job.employmentType === 'contract'
                                ? 'Contract'
                                : job.employmentType || 'Standard'}
                        </span>
                        {job.location && <span className="rd-job-loc">📍 {job.location}</span>}
                        <span className="rd-job-applicant-count">
                          {jobCount > 0 ? (
                            <strong>{jobCount} applicants</strong>
                          ) : (
                            '0 applicants'
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="rd-job-arrow-btn">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruitmentDashboard
