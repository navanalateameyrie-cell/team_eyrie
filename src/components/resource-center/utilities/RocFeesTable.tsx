'use client'

import React, { useState } from 'react'
import { ROC_NORMAL_FEES, ROC_DELAY_ADDITIONAL_FEES } from '@/data/resource-center/rocFeesData'

export default function RocFeesTable() {
  const [selectedCapitalSlab, setSelectedCapitalSlab] = useState<number>(300)
  const [delayDays, setDelayDays] = useState<number>(0)

  // Compute fee
  let delayMultiple = 0
  if (delayDays > 180) {
    delayMultiple = 12
  } else if (delayDays > 90) {
    delayMultiple = 10
  } else if (delayDays > 60) {
    delayMultiple = 6
  } else if (delayDays > 30) {
    delayMultiple = 4
  } else if (delayDays > 0) {
    delayMultiple = 2
  }

  const baseFee = selectedCapitalSlab
  const totalPayableFee = delayMultiple > 0 ? baseFee * delayMultiple : baseFee
  const additionalLateFee = totalPayableFee - baseFee

  const formatInr = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  return (
    <div className="utility-card">
      <div className="utility-header">
        <div>
          <span className="calculator-badge">Corporate Secretarial Utility</span>
          <h3 className="calculator-title">MCA / RoC Statutory Filing Fee Schedule</h3>
          <p className="calculator-subtitle">
            Statutory normal filing fees and additional delay fee slabs prescribed under the Companies (Registration Offices and Fees) Rules.
          </p>
        </div>
      </div>

      {/* Interactive Estimator */}
      <div className="cii-calculator-box">
        <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-navy, #0f274a)', marginBottom: 14, letterSpacing: '0.2px' }}>
          RoC Statutory Form Filing Fee Estimator
        </h4>

        <div className="cii-inputs-grid">
          <div className="form-group">
            <label className="form-label">Company Nominal / Authorized Capital</label>
            <select
              className="form-select"
              value={selectedCapitalSlab}
              onChange={(e) => setSelectedCapitalSlab(parseInt(e.target.value, 10))}
            >
              {ROC_NORMAL_FEES.map((slab) => (
                <option key={slab.normalFee} value={slab.normalFee}>
                  {slab.capitalRange} (Normal Fee: ₹{slab.normalFee})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Days Delayed Beyond Statutory Due Date</label>
            <select
              className="form-select"
              value={delayDays}
              onChange={(e) => setDelayDays(parseInt(e.target.value, 10))}
            >
              <option value="0">0 Days (Timely Filing - No Delay)</option>
              <option value="15">Up to 30 days delay (2x fee)</option>
              <option value="45">31 to 60 days delay (4x fee)</option>
              <option value="75">61 to 90 days delay (6x fee)</option>
              <option value="120">91 to 180 days delay (10x fee)</option>
              <option value="200">More than 180 days delay (12x fee)</option>
            </select>
          </div>
        </div>

        <div className="cii-output-card">
          <div className="cii-stat">
            <span className="cii-stat-title">Base Statutory Fee</span>
            <span className="cii-stat-val">{formatInr(baseFee)}</span>
          </div>
          <div className="cii-stat">
            <span className="cii-stat-title">Delay Multiplier</span>
            <span className="cii-stat-val">{delayMultiple > 0 ? `${delayMultiple}x normal fee` : 'Normal (1x)'}</span>
          </div>
          <div className="cii-stat">
            <span className="cii-stat-title">Additional Late Fee</span>
            <span className="cii-stat-val text-accent">+{formatInr(additionalLateFee)}</span>
          </div>
          <div className="cii-stat cii-stat--highlight">
            <span className="cii-stat-title">Total Fee Payable</span>
            <span className="cii-stat-val text-accent">{formatInr(totalPayableFee)}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginTop: 28 }}>
        <div>
          <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0f274a', marginBottom: 12 }}>
            Normal RoC Filing Fee Slabs
          </h4>
          <table className="resource-table">
            <thead>
              <tr>
                <th>Authorized Capital Slab</th>
                <th>Normal Fee</th>
              </tr>
            </thead>
            <tbody>
              {ROC_NORMAL_FEES.map((f) => (
                <tr key={f.normalFee}>
                  <td>{f.capitalRange}</td>
                  <td><strong>₹{f.normalFee}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0f274a', marginBottom: 12 }}>
            Additional Late Fee for Delayed Filings
          </h4>
          <table className="resource-table">
            <thead>
              <tr>
                <th>Delay Duration</th>
                <th>Additional Fee Multiple</th>
              </tr>
            </thead>
            <tbody>
              {ROC_DELAY_ADDITIONAL_FEES.map((d, i) => (
                <tr key={i}>
                  <td>{d.delayPeriod}</td>
                  <td className="text-accent"><strong>{d.multipleOfNormalFee}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

