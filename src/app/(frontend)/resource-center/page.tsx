import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import ResourceCenterView from '@/components/resource-center/ResourceCenterView'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Resource Center — Team Eyrie | Tax Calculators, Utilities & Bare Acts',
  description:
    'Comprehensive statutory resource center for corporate leaders and taxpayers: GST calculators, Income Tax Old vs New regime estimator, TDS rate charts, Cost Inflation Index, Bare Acts, and official forms.',
}

export default function ResourceCenterPage() {
  return (
    <main className="resource-center-page" style={{ backgroundColor: 'var(--color-bg-light, #f8fafc)', minHeight: '100vh' }}>
      {/* Executive Clean Portal Header (Without Bulky Stock Image Banner) */}
      <section className="pro-portal-header-section">
        <div className="container">
          {/* Breadcrumb & Live Compliance Pill */}
          <div className="pro-portal-meta-row">
            <nav className="pro-portal-breadcrumbs" aria-label="Breadcrumbs">
              <a href="/" className="pro-portal-crumb-link">Home</a>
              <span className="pro-portal-crumb-sep">/</span>
              <span className="pro-portal-crumb-current">Resource Center</span>
            </nav>
            <div className="pro-portal-status-badge">
              <span className="pro-status-dot" />
              <span>FY 2025-26 &amp; 2026-27 Compliant</span>
            </div>
          </div>

          {/* Title & Introduction */}
          <div className="pro-portal-title-block">
            <div className="pro-portal-eyebrow">
              <span className="pro-portal-eyebrow-line" />
              <span>STATUTORY INTELLIGENCE &amp; FINANCIAL TOOLKIT</span>
            </div>
            <h1 className="pro-portal-title">Resource Center</h1>
            <p className="pro-portal-desc">
              Comprehensive suite of 17 interactive financial calculators, verified regulatory circular bulletins across 9 statutory practice areas, and authoritative tax rate schedules.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Tool Body */}
      <section className="pro-portal-body-section">
        <div className="container">
          <Suspense fallback={<div className="pro-loading-state">Loading Resource Center...</div>}>
            <ResourceCenterView />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
