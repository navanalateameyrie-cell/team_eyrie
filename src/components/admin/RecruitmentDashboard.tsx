import React from 'react'
import './RecruitmentDashboard.scss';
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'

export const RecruitmentDashboard = async () => {
  const payload = await getPayload({ config: configPromise })
  
  // Fetch Jobs
  const { docs: openJobs, totalDocs: totalJobs } = await payload.find({
    collection: 'jobs',
    where: { status: { equals: 'open' } },
    depth: 0,
    limit: 100,
  })
  
  // Fetch Applications
  const { docs: applications, totalDocs: totalApps } = await payload.find({
    collection: 'job-applications',
    depth: 1,
    limit: 1000,
  })
  
  // Calculate applications per job for the graph
  const appsPerJob: Record<string, number> = {}
  applications.forEach((app: any) => {
    const jobTitle = app.job?.title || 'Unknown Job'
    appsPerJob[jobTitle] = (appsPerJob[jobTitle] || 0) + 1
  })
  
  const maxApps = Math.max(...Object.values(appsPerJob), 1)
  const interviewingCount = applications.filter((a: any) => a.stage === 'interview').length

  return (
    <div className="rd-container">
      
      {/* Header Area */}
      <div className="rd-header">
        <div>
          <h1 className="rd-title">Recruitment Dashboard</h1>
          <p className="rd-subtitle">High-level overview of active job openings and candidate pipeline.</p>
        </div>
        <div className="rd-header-actions">
          <Link href="/admin/collections/jobs" className="rd-btn-secondary">
            Manage Jobs
          </Link>
          <Link href="/admin/collections/job-applications" className="rd-btn-primary">
            View Applications
          </Link>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="rd-kpi-grid">
        
        {/* KPI 1 */}
        <div className="rd-card">
          <h3 className="rd-kpi-label">Active Job Openings</h3>
          <div className="rd-kpi-value-wrap">
            <div className="rd-kpi-value rd-kpi-value--navy">{totalJobs}</div>
            <div className="rd-kpi-subtext rd-kpi-subtext--green">Live</div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="rd-card">
          <h3 className="rd-kpi-label">Total Applications Received</h3>
          <div className="rd-kpi-value-wrap">
            <div className="rd-kpi-value rd-kpi-value--gold">{totalApps}</div>
            <div className="rd-kpi-subtext rd-kpi-subtext--gray">Candidates</div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="rd-card">
          <h3 className="rd-kpi-label">Currently Interviewing</h3>
          <div className="rd-kpi-value-wrap">
            <div className="rd-kpi-value rd-kpi-value--blue">{interviewingCount}</div>
            <div className="rd-kpi-subtext rd-kpi-subtext--gray">Active Stages</div>
          </div>
        </div>

      </div>
      
      {/* Visual Data & Lists Area */}
      <div className="rd-data-grid">
        
        {/* Bar Graph: Applications By Role */}
        <div className="rd-data-card">
          <h2 className="rd-data-title">Application Volume by Role</h2>
          
          <div className="rd-graph-container">
            {Object.entries(appsPerJob).length === 0 ? (
               <p className="rd-empty-text">No applications received yet.</p>
            ) : (
              Object.entries(appsPerJob).sort((a,b) => b[1] - a[1]).map(([jobTitle, count]) => {
                const percentage = (count / maxApps) * 100;
                return (
                  <div key={jobTitle} className="rd-graph-row">
                    <div className="rd-graph-label-wrap">
                      <span className="rd-graph-label">{jobTitle}</span>
                      <span className="rd-graph-count">{count} Apps</span>
                    </div>
                    <div className="rd-graph-track">
                      <div 
                        className="rd-graph-fill" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Live Active Openings List */}
        <div className="rd-data-card">
          <h2 className="rd-data-title">Currently Open Positions</h2>
          
          <div className="rd-job-list">
            {openJobs.length === 0 ? (
               <p className="rd-empty-text">No roles currently marked as 'Open'.</p>
            ) : (
              openJobs.map((job: any) => (
                <div key={job.id} className="rd-job-list-item">
                  <div>
                    <div className="rd-job-title">{job.title}</div>
                    <div className="rd-job-meta">
                      <span className="rd-job-badge">{job.employmentType}</span>
                    </div>
                  </div>
                  <Link href={`/admin/collections/jobs/${job.id}`} className="rd-job-arrow">
                    →
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
    </div>
  )
}
