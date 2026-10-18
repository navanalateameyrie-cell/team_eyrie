'use client'

import React, { useState, useId } from 'react'
import { CopyIcon, CheckIcon } from '../Icons'

export default function HraCalculator() {
  const [basicSalary, setBasicSalary] = useState<string>('')
  const [da, setDa] = useState<string>('')
  const [hraReceived, setHraReceived] = useState<string>('')
  const [rentPaid, setRentPaid] = useState<string>('')
  const [isMetro, setIsMetro] = useState<boolean>(true)
  const [copied, setCopied] = useState(false)
  const basicSalaryInputId = useId()
  const daInputId = useId()
  const hraReceivedInputId = useId()
  const rentPaidInputId = useId()

  const numBasicSalary = Math.max(0, parseFloat(basicSalary) || 0)
  const numDa = Math.max(0, parseFloat(da) || 0)
  const numHraReceived = Math.max(0, parseFloat(hraReceived) || 0)
  const numRentPaid = Math.max(0, parseFloat(rentPaid) || 0)

  const formatInr = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  // Statutory Calculations u/s 10(13A) read with Rule 2A
  const salaryForHra = numBasicSalary + numDa
  const limb1ActualHra = numHraReceived
  const limb2RentMinusTenPercent = Math.max(0, numRentPaid - 0.1 * salaryForHra)
  const metroMultiplier = isMetro ? 0.5 : 0.4
  const limb3PercentOfSalary = Math.max(0, salaryForHra * metroMultiplier)

  const exemptHra = numHraReceived > 0 ? Math.min(limb1ActualHra, limb2RentMinusTenPercent, limb3PercentOfSalary) : 0
  const taxableHra = Math.max(0, numHraReceived - exemptHra)

  const handleCopy = () => {
    const text = `HRA EXEMPTION COMPUTATION CERTIFICATE (RULE 2A)
─────────────────────────────────────────────────
Basic Salary      : ${formatInr(numBasicSalary)}
Dearness Allowance: ${formatInr(numDa)}
Relevant Salary   : ${formatInr(salaryForHra)}
HRA Received      : ${formatInr(numHraReceived)}
Total Rent Paid   : ${formatInr(numRentPaid)}
City Category     : ${isMetro ? 'Metro City (50% rule)' : 'Non-Metro (40% rule)'}
─────────────────────────────────────────────────
Statutory Limbs (Least is exempt):
1. Actual HRA Received        : ${formatInr(limb1ActualHra)}
2. Rent Paid minus 10% Salary : ${formatInr(limb2RentMinusTenPercent)}
3. ${isMetro ? '50%' : '40%'} of Annual Salary       : ${formatInr(limb3PercentOfSalary)}
─────────────────────────────────────────────────
EXEMPTED HRA (TAX-FREE)       : ${formatInr(exemptHra)}
TAXABLE HRA (TAXABLE SALARY)  : ${formatInr(taxableHra)}
─────────────────────────────────────────────────
Team Eyrie Statutory Resource Center • Rule 2A Compliance`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="inst-tool-card">
      <div className="inst-tool-header">
        <div>
          <span className="inst-meta-tag">SALARIED TAXATION • SECTION 10(13A) &amp; RULE 2A</span>
          <h2 className="inst-tool-title">House Rent Allowance (HRA) Exemption Calculator</h2>
          <p className="inst-tool-desc">
            Determine statutory tax-free House Rent Allowance exemption using the 3-limb statutory test prescribed under Rule 2A of the Income-tax Rules.
          </p>
        </div>
        <div className="inst-tool-header-badge">
          <span>Old Tax Regime</span>
        </div>
      </div>

      <div className="inst-tool-grid">
        <div className="inst-form-col">
          <div className="inst-form-row">
            <label className="inst-form-label" htmlFor={basicSalaryInputId}>
              <span>Annual Basic Salary</span>
              <span className="inst-currency-label">INR (₹)</span>
            </label>
            <div className="inst-currency-input-wrap">
              <span className="inst-currency-prefix">₹</span>
              <input
                id={basicSalaryInputId}
                type="number"
                min="0"
                step="any"
                value={basicSalary}
                onChange={(e) => setBasicSalary(e.target.value)}
                className="inst-num-input"
                placeholder="Enter annual basic salary (e.g. 600000)"
              />
            </div>
          </div>

          <div className="inst-form-row">
            <label className="inst-form-label" htmlFor={daInputId}>
              <span>Dearness Allowance (DA forming part of retirement)</span>
              <span className="inst-currency-label">INR (₹)</span>
            </label>
            <div className="inst-currency-input-wrap">
              <span className="inst-currency-prefix">₹</span>
              <input
                id={daInputId}
                type="number"
                min="0"
                step="any"
                value={da}
                onChange={(e) => setDa(e.target.value)}
                className="inst-num-input"
                style={{ fontSize: 16 }}
                placeholder="0"
              />
            </div>
          </div>

          <div className="inst-form-row">
            <label className="inst-form-label" htmlFor={hraReceivedInputId}>
              <span>Actual HRA Received from Employer (Annual)</span>
              <span className="inst-currency-label">INR (₹)</span>
            </label>
            <div className="inst-currency-input-wrap">
              <span className="inst-currency-prefix">₹</span>
              <input
                id={hraReceivedInputId}
                type="number"
                min="0"
                step="any"
                value={hraReceived}
                onChange={(e) => setHraReceived(e.target.value)}
                className="inst-num-input"
                style={{ fontSize: 16 }}
                placeholder="Enter actual HRA received (e.g. 240000)"
              />
            </div>
          </div>

          <div className="inst-form-row">
            <label className="inst-form-label" htmlFor={rentPaidInputId}>
              <span>Total Actual Rent Paid (Annual)</span>
              <span className="inst-currency-label">INR (₹)</span>
            </label>
            <div className="inst-currency-input-wrap">
              <span className="inst-currency-prefix">₹</span>
              <input
                id={rentPaidInputId}
                type="number"
                min="0"
                step="any"
                value={rentPaid}
                onChange={(e) => setRentPaid(e.target.value)}
                className="inst-num-input"
                style={{ fontSize: 16 }}
                placeholder="Enter total annual rent paid (e.g. 300000)"
              />
            </div>
          </div>

          <div className="inst-form-row">
            <label className="inst-form-label">Accommodation City Category</label>
            <div className="inst-segmented-control">
              <button
                type="button"
                className={`inst-segmented-option ${isMetro ? 'inst-segmented-option--active' : ''}`}
                onClick={() => setIsMetro(true)}
              >
                Metro City (50% of Salary) — Mumbai, Delhi, Kolkata, Chennai
              </button>
              <button
                type="button"
                className={`inst-segmented-option ${!isMetro ? 'inst-segmented-option--active' : ''}`}
                onClick={() => setIsMetro(false)}
              >
                Non-Metro City (40% of Salary) — All Other Indian Cities
              </button>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="inst-results-col">
          <div className="inst-statement-card">
            <div className="inst-statement-header">
              <div>
                <span className="inst-statement-sub">RULE 2A STATUTORY EVALUATION</span>
                <h3 className="inst-statement-title">Statutory Exemption Limbs</h3>
              </div>
              <span className="inst-statement-pill">LEAST OF 3 LIMBS</span>
            </div>

            <div className="inst-statement-ledger">
              <div
                className="inst-ledger-line"
                style={exemptHra === limb1ActualHra ? { background: '#f0fdf4', padding: '6px 8px', borderRadius: 4 } : {}}
              >
                <span className="inst-ledger-item">1. Actual HRA Received</span>
                <span className="inst-ledger-num">{formatInr(limb1ActualHra)}</span>
              </div>
              <div
                className="inst-ledger-line"
                style={exemptHra === limb2RentMinusTenPercent ? { background: '#f0fdf4', padding: '6px 8px', borderRadius: 4 } : {}}
              >
                <span className="inst-ledger-item">2. Rent minus 10% Salary</span>
                <span className="inst-ledger-num">{formatInr(limb2RentMinusTenPercent)}</span>
              </div>
              <div
                className="inst-ledger-line"
                style={exemptHra === limb3PercentOfSalary ? { background: '#f0fdf4', padding: '6px 8px', borderRadius: 4 } : {}}
              >
                <span className="inst-ledger-item">3. {isMetro ? '50%' : '40%'} of Annual Salary</span>
                <span className="inst-ledger-num">{formatInr(limb3PercentOfSalary)}</span>
              </div>

              <div className="inst-ledger-rule" />

              <div className="inst-ledger-line inst-ledger-line--highlight">
                <span className="inst-ledger-item">Taxable HRA Addition</span>
                <span className="inst-ledger-num inst-ledger-num--accent">{formatInr(taxableHra)}</span>
              </div>
            </div>

            {/* Hero Exemption Box */}
            <div className="inst-total-box" style={{ background: 'linear-gradient(135deg, #052e16 0%, #14532d 100%)' }}>
              <span className="inst-total-eyebrow" style={{ color: '#86efac' }}>STATUTORY TAX-FREE HRA EXEMPTION</span>
              <div className="inst-total-figure" style={{ color: '#ffffff' }}>{formatInr(exemptHra)}</div>
              <div className="inst-total-meta" style={{ color: '#bbf7d0' }}>
                <span>Claimable under Section 10(13A) (Old Tax Regime)</span>
              </div>
            </div>

            <button
              type="button"
              className={`inst-copy-btn ${copied ? 'inst-copy-btn--copied' : ''}`}
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <CheckIcon size={16} />
                  <span>Computation Copied</span>
                </>
              ) : (
                <>
                  <CopyIcon size={16} />
                  <span>Copy HRA Exemption Sheet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
