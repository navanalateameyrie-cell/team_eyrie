'use client'

import React, { useState, useId, useEffect } from 'react'
import { CopyIcon, CheckIcon } from '../Icons'

export type ReraMode = 'withdrawal' | 'delay-interest' | 'refund'

interface ReraCalculatorProps {
  initialMode?: ReraMode
}

export default function ReraCalculator({ initialMode = 'delay-interest' }: ReraCalculatorProps) {
  const [activeMode, setActiveMode] = useState<ReraMode>(initialMode)

  useEffect(() => {
    if (initialMode) {
      setActiveMode(initialMode)
    }
  }, [initialMode])

  // Section 18: Delay Interest & Refund state
  const [amountPaid, setAmountPaid] = useState<string>('')
  const [agreedDate, setAgreedDate] = useState<string>('')
  const [settlementDate, setSettlementDate] = useState<string>(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })
  const [interestRate, setInterestRate] = useState<string>('10.85') // SBI Highest MCLR + 2%
  const [subsequentAmount, setSubsequentAmount] = useState<string>('')
  const [subsequentDate, setSubsequentDate] = useState<string>('')
  const [showSubsequent, setShowSubsequent] = useState(false)

  // Section 4(2)(l)(D): 70% Escrow Withdrawal state
  const [estLand, setEstLand] = useState<string>('')
  const [estConst, setEstConst] = useState<string>('')
  const [actualLand, setActualLand] = useState<string>('')
  const [actualConst, setActualConst] = useState<string>('')
  const [collections, setCollections] = useState<string>('')
  const [withdrawn, setWithdrawn] = useState<string>('')

  const [copied, setCopied] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Input IDs
  const amountPaidId = useId()
  const agreedDateId = useId()
  const settlementDateId = useId()
  const rateId = useId()
  const subAmtId = useId()
  const subDateId = useId()

  const estLandId = useId()
  const estConstId = useId()
  const actLandId = useId()
  const actConstId = useId()
  const collId = useId()
  const withdrawnId = useId()

  // Reset Handlers
  const handleResetSection18 = () => {
    setAmountPaid('')
    setAgreedDate('')
    setInterestRate('10.85')
    setSubsequentAmount('')
    setSubsequentDate('')
    setShowSubsequent(false)
    setErrorMsg(null)
  }

  const handleResetWithdrawal = () => {
    setEstLand('')
    setEstConst('')
    setActualLand('')
    setActualConst('')
    setCollections('')
    setWithdrawn('')
    setErrorMsg(null)
  }

  // --- Calculations: Delay Interest & Refund ---
  const numAmountPaid = Math.max(0, parseFloat(amountPaid) || 0)
  const numSubsequentAmount = Math.max(0, parseFloat(subsequentAmount) || 0)
  const numRate = Math.max(0, parseFloat(interestRate) || 0)

  let daysPrimary = 0
  let daysSubsequent = 0

  if (agreedDate && settlementDate) {
    const dAgreed = new Date(agreedDate)
    const dSettlement = new Date(settlementDate)
    const diff = dSettlement.getTime() - dAgreed.getTime()
    if (diff > 0) {
      daysPrimary = Math.floor(diff / (1000 * 60 * 60 * 24))
    }
  }

  if (subsequentDate && settlementDate) {
    const dSub = new Date(subsequentDate)
    const dSettlement = new Date(settlementDate)
    const diff = dSettlement.getTime() - dSub.getTime()
    if (diff > 0) {
      daysSubsequent = Math.floor(diff / (1000 * 60 * 60 * 24))
    }
  }

  const interestPrimary = numAmountPaid * (daysPrimary / 365) * (numRate / 100)
  const interestSubsequent = numSubsequentAmount * (daysSubsequent / 365) * (numRate / 100)
  const totalDelayInterest = interestPrimary + interestSubsequent
  const totalPrincipal = numAmountPaid + numSubsequentAmount
  const totalRefund = totalPrincipal + totalDelayInterest

  const hasSection18Data = amountPaid !== '' && agreedDate !== ''

  // --- Calculations: 70% Escrow Withdrawal ---
  const numEstLand = Math.max(0, parseFloat(estLand) || 0)
  const numEstConst = Math.max(0, parseFloat(estConst) || 0)
  const totalEstCost = numEstLand + numEstConst

  const numActLand = Math.max(0, parseFloat(actualLand) || 0)
  const numActConst = Math.max(0, parseFloat(actualConst) || 0)
  const totalActCost = numActLand + numActConst

  const numCollections = Math.max(0, parseFloat(collections) || 0)
  const mandatory70PctEscrow = numCollections * 0.70

  const numWithdrawn = Math.max(0, parseFloat(withdrawn) || 0)

  const completionPct =
    totalEstCost > 0 ? Math.min(100, (totalActCost / totalEstCost) * 100) : 0

  const maxPermissibleWithd = (mandatory70PctEscrow * completionPct) / 100
  const eligibleWithdrawalRaw = maxPermissibleWithd - numWithdrawn
  const eligibleWithdrawal = Math.max(0, eligibleWithdrawalRaw)
  const isOverdrawn = eligibleWithdrawalRaw < 0

  const hasWithdrawalData = estLand !== '' || estConst !== '' || collections !== ''

  const formatINR = (val: number) => '₹' + Math.round(val).toLocaleString('en-IN')

  const handleCopy = () => {
    let text = ''
    if (activeMode === 'withdrawal') {
      text = `RERA SEC 4(2)(l)(D) ESCROW WITHDRAWAL SUMMARY
Project Cost Est. : ${formatINR(totalEstCost)}
Incurred to Date  : ${formatINR(totalActCost)} (${completionPct.toFixed(2)}% Complete)
70% Escrow Deposit: ${formatINR(mandatory70PctEscrow)}
Max Permissible   : ${formatINR(maxPermissibleWithd)}
Already Withdrawn : ${formatINR(numWithdrawn)}
Eligible Now      : ${formatINR(eligibleWithdrawal)}
Team Eyrie Chartered Accountants`
    } else {
      text = `RERA SEC 18 ${activeMode === 'delay-interest' ? 'DELAY INTEREST' : 'REFUND'} STATEMENT
Agreed Date       : ${agreedDate}
Calculation Date  : ${settlementDate} (${daysPrimary} Days Delay)
Rate Applied      : ${numRate.toFixed(2)}% p.a.
Principal Paid    : ${formatINR(totalPrincipal)}
Statutory Interest: ${formatINR(totalDelayInterest)}
${activeMode === 'refund' ? `Total Refund Due  : ${formatINR(totalRefund)}\n` : ''}Team Eyrie Chartered Accountants`
    }
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="inst-tool-card">
      {/* Header */}
      <div className="inst-tool-header">
        <div>
          <span className="inst-meta-tag">RERA STATUTORY TOOLKIT</span>
          <h2 className="inst-tool-title">
            {activeMode === 'withdrawal'
              ? 'RERA 70% Withdrawal Calculator'
              : activeMode === 'delay-interest'
                ? 'RERA Delay Interest Calculator'
                : 'RERA Homebuyer Refund Calculator'}
          </h2>
          <p className="inst-tool-desc">
            {activeMode === 'withdrawal'
              ? 'Calculate statutory permissible promoter withdrawals from the 70% separate RERA bank account in proportion to certified project completion.'
              : activeMode === 'delay-interest'
                ? 'Calculate monthly delayed possession compensation payable by the promoter under Section 18 at SBI MCLR + 2%.'
                : 'Calculate complete principal refund along with statutory delay compensation interest for homebuyer project cancellation.'}
          </p>
        </div>
        <div className="inst-tool-header-badge">
          <span>{activeMode === 'withdrawal' ? 'Sec 4(2)(l)(D)' : 'Sec 18 RERA'}</span>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => {
            setActiveMode('withdrawal')
            setErrorMsg(null)
          }}
          className={`inst-segmented-option ${activeMode === 'withdrawal' ? 'inst-segmented-option--active' : ''}`}
          style={{ flex: '1 1 200px', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}
        >
          70% Escrow Withdrawal (Promoter)
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveMode('delay-interest')
            setErrorMsg(null)
          }}
          className={`inst-segmented-option ${activeMode === 'delay-interest' ? 'inst-segmented-option--active' : ''}`}
          style={{ flex: '1 1 200px', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}
        >
          Delay Interest (Continuing Buyer)
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveMode('refund')
            setErrorMsg(null)
          }}
          className={`inst-segmented-option ${activeMode === 'refund' ? 'inst-segmented-option--active' : ''}`}
          style={{ flex: '1 1 200px', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}
        >
          Full Refund + Interest (Exiting Buyer)
        </button>
      </div>

      {errorMsg && (
        <div style={{ marginBottom: '16px', padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#b91c1c', fontSize: '13px' }}>
          {errorMsg}
        </div>
      )}

      {/* --- MODE 1: 70% ESCROW WITHDRAWAL --- */}
      {activeMode === 'withdrawal' ? (
        <div className="inst-tool-grid">
          {/* Inputs Column */}
          <div className="inst-form-col">
            <div className="inst-section-title" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span>Project Cost Estimates &amp; Actual Incurred</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="inst-form-row">
                <label htmlFor={estLandId} className="inst-form-label">
                  Estimated Land Cost
                  <span className="inst-currency-label">₹</span>
                </label>
                <div className="inst-currency-input-wrap">
                  <span className="inst-currency-prefix">₹</span>
                  <input
                    id={estLandId}
                    type="number"
                    min="0"
                    placeholder="e.g. 50000000"
                    value={estLand}
                    onChange={(e) => setEstLand(e.target.value)}
                    className="inst-num-input"
                  />
                </div>
              </div>

              <div className="inst-form-row">
                <label htmlFor={estConstId} className="inst-form-label">
                  Estimated Construction Cost
                  <span className="inst-currency-label">₹</span>
                </label>
                <div className="inst-currency-input-wrap">
                  <span className="inst-currency-prefix">₹</span>
                  <input
                    id={estConstId}
                    type="number"
                    min="0"
                    placeholder="e.g. 150000000"
                    value={estConst}
                    onChange={(e) => setEstConst(e.target.value)}
                    className="inst-num-input"
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="inst-form-row">
                <label htmlFor={actLandId} className="inst-form-label">
                  Actual Land Cost Incurred
                  <span className="inst-currency-label">₹</span>
                </label>
                <div className="inst-currency-input-wrap">
                  <span className="inst-currency-prefix">₹</span>
                  <input
                    id={actLandId}
                    type="number"
                    min="0"
                    placeholder="e.g. 50000000"
                    value={actualLand}
                    onChange={(e) => setActualLand(e.target.value)}
                    className="inst-num-input"
                  />
                </div>
              </div>

              <div className="inst-form-row">
                <label htmlFor={actConstId} className="inst-form-label">
                  Actual Const. Cost Incurred
                  <span className="inst-currency-label">₹</span>
                </label>
                <div className="inst-currency-input-wrap">
                  <span className="inst-currency-prefix">₹</span>
                  <input
                    id={actConstId}
                    type="number"
                    min="0"
                    placeholder="e.g. 60000000"
                    value={actualConst}
                    onChange={(e) => setActualConst(e.target.value)}
                    className="inst-num-input"
                  />
                </div>
              </div>
            </div>

            <div className="inst-section-title" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '6px' }}>
              <span>Collections &amp; Escrow Account Details</span>
            </div>

            <div className="inst-form-row">
              <label htmlFor={collId} className="inst-form-label">
                Total Realized Allottee Collections
                <span className="inst-currency-label">₹</span>
              </label>
              <div className="inst-currency-input-wrap">
                <span className="inst-currency-prefix">₹</span>
                <input
                  id={collId}
                  type="number"
                  min="0"
                  placeholder="Total amount collected from buyers"
                  value={collections}
                  onChange={(e) => setCollections(e.target.value)}
                  className="inst-num-input"
                />
              </div>
              <span className="inst-input-hint">Mandatory 70% deposit: ₹{(numCollections * 0.7).toLocaleString('en-IN')}</span>
            </div>

            <div className="inst-form-row">
              <label htmlFor={withdrawnId} className="inst-form-label">
                Cumulative Amount Already Withdrawn
                <span className="inst-currency-label">₹</span>
              </label>
              <div className="inst-currency-input-wrap">
                <span className="inst-currency-prefix">₹</span>
                <input
                  id={withdrawnId}
                  type="number"
                  min="0"
                  placeholder="e.g. 40000000"
                  value={withdrawn}
                  onChange={(e) => setWithdrawn(e.target.value)}
                  className="inst-num-input"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  if (totalEstCost <= 0) {
                    setErrorMsg('Please specify estimated land or construction costs.')
                  } else {
                    setErrorMsg(null)
                  }
                }}
                className="inst-action-btn"
                style={{ background: '#1e40af', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, flex: 1 }}
              >
                Compute Permissible Withdrawal
              </button>
              <button
                type="button"
                onClick={handleResetWithdrawal}
                style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#64748b', borderRadius: '8px', padding: '10px 18px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results Column */}
          <div className="inst-result-col">
            <div className="inst-section-title" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span>Permissible Withdrawal Assessment</span>
            </div>

            {!hasWithdrawalData || totalEstCost === 0 ? (
              <div className="inst-empty-notice" style={{ padding: '32px 20px', textAlign: 'center', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '12px', color: '#64748b' }}>
                Enter project cost estimates and realized collections on the left to determine eligible withdrawal from the 70% separate RERA account.
              </div>
            ) : (
              <>
                <div className="inst-kpi-grid">
                  <div className="inst-kpi-card">
                    <span className="inst-kpi-label">Completion %</span>
                    <span className="inst-kpi-value" style={{ color: '#1e40af' }}>{completionPct.toFixed(2)}%</span>
                  </div>
                  <div className="inst-kpi-card">
                    <span className="inst-kpi-label">70% Escrow Fund</span>
                    <span className="inst-kpi-value">{formatINR(mandatory70PctEscrow)}</span>
                  </div>
                  <div className="inst-kpi-card inst-kpi-card--primary">
                    <span className="inst-kpi-label">Eligible to Withdraw</span>
                    <span className="inst-kpi-value" style={{ color: isOverdrawn ? '#b91c1c' : '#047857' }}>
                      {formatINR(eligibleWithdrawal)}
                    </span>
                  </div>
                  <div className="inst-kpi-card">
                    <span className="inst-kpi-label">Max Allowed (Cumulative)</span>
                    <span className="inst-kpi-value">{formatINR(maxPermissibleWithd)}</span>
                  </div>
                </div>

                <div className="inst-table-wrap" style={{ marginTop: '16px' }}>
                  <table className="inst-data-table">
                    <tbody>
                      <tr>
                        <td>Total Estimated Project Cost</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatINR(totalEstCost)}</td>
                      </tr>
                      <tr>
                        <td>Total Actual Cost Incurred</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatINR(totalActCost)}</td>
                      </tr>
                      <tr>
                        <td>Proportion of Completion</td>
                        <td style={{ textAlign: 'right', color: '#1e40af', fontWeight: 700 }}>{completionPct.toFixed(2)}%</td>
                      </tr>
                      <tr>
                        <td>Realized Collections (100%)</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatINR(numCollections)}</td>
                      </tr>
                      <tr>
                        <td>Mandatory 70% Escrow Base</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatINR(mandatory70PctEscrow)}</td>
                      </tr>
                      <tr>
                        <td>Less: Withdrawn Till Date</td>
                        <td style={{ textAlign: 'right', color: '#b91c1c', fontWeight: 600 }}>-{formatINR(numWithdrawn)}</td>
                      </tr>
                      <tr style={{ background: isOverdrawn ? '#fef2f2' : '#ecfdf5' }}>
                        <td style={{ fontWeight: 700, color: isOverdrawn ? '#b91c1c' : '#047857' }}>
                          Eligible Current Withdrawal (Form 3)
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: 700, color: isOverdrawn ? '#b91c1c' : '#047857', fontSize: '15px' }}>
                          {formatINR(eligibleWithdrawal)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: '14px', display: 'flex', gap: '10px' }}>
                  <button type="button" className="inst-action-btn" onClick={handleCopy} style={{ flex: 1 }}>
                    {copied ? (
                      <>
                        <CheckIcon size={14} />
                        <span>Copied Summary</span>
                      </>
                    ) : (
                      <>
                        <CopyIcon size={14} />
                        <span>Copy Statement</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        /* --- MODE 2 & 3: DELAY INTEREST & REFUND --- */
        <div className="inst-tool-grid">
          {/* Inputs Column */}
          <div className="inst-form-col">
            <div className="inst-section-title" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span>Transaction &amp; Delay Parameters</span>
            </div>

            <div className="inst-form-row">
              <label htmlFor={amountPaidId} className="inst-form-label">
                Amount Paid to Builder
                <span className="inst-currency-label">₹</span>
              </label>
              <div className="inst-currency-input-wrap">
                <span className="inst-currency-prefix">₹</span>
                <input
                  id={amountPaidId}
                  type="number"
                  min="0"
                  placeholder="Total amount paid (e.g. 5000000)"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  className="inst-num-input"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="inst-form-row">
                <label htmlFor={agreedDateId} className="inst-form-label">
                  Agreed Handover Date
                </label>
                <input
                  id={agreedDateId}
                  type="date"
                  value={agreedDate}
                  onChange={(e) => setAgreedDate(e.target.value)}
                  className="inst-num-input"
                  style={{ paddingLeft: '12px' }}
                />
              </div>

              <div className="inst-form-row">
                <label htmlFor={settlementDateId} className="inst-form-label">
                  Calculation Date
                </label>
                <input
                  id={settlementDateId}
                  type="date"
                  value={settlementDate}
                  onChange={(e) => setSettlementDate(e.target.value)}
                  className="inst-num-input"
                  style={{ paddingLeft: '12px' }}
                />
              </div>
            </div>

            <div className="inst-form-row">
              <label htmlFor={rateId} className="inst-form-label">
                Statutory Interest Rate (% p.a.)
                <span className="inst-form-label-hint">SBI MCLR + 2%</span>
              </label>
              <input
                id={rateId}
                type="number"
                step="0.01"
                placeholder="10.85"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="inst-num-input"
                style={{ paddingLeft: '12px' }}
              />
            </div>

            {/* Optional Subsequent Payment Toggle */}
            <div>
              <button
                type="button"
                onClick={() => setShowSubsequent((v) => !v)}
                style={{ background: 'none', border: 'none', color: '#1d4ed8', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', padding: 0 }}
              >
                {showSubsequent ? '− Remove Additional Installment' : '+ Add Subsequent Installment Paid After Delay'}
              </button>

              {showSubsequent && (
                <div style={{ marginTop: '12px', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="inst-form-row">
                      <label htmlFor={subAmtId} className="inst-form-label">
                        Subsequent Amount (₹)
                      </label>
                      <input
                        id={subAmtId}
                        type="number"
                        placeholder="e.g. 500000"
                        value={subsequentAmount}
                        onChange={(e) => setSubsequentAmount(e.target.value)}
                        className="inst-num-input"
                        style={{ paddingLeft: '12px' }}
                      />
                    </div>
                    <div className="inst-form-row">
                      <label htmlFor={subDateId} className="inst-form-label">
                        Date Paid
                      </label>
                      <input
                        id={subDateId}
                        type="date"
                        value={subsequentDate}
                        onChange={(e) => setSubsequentDate(e.target.value)}
                        className="inst-num-input"
                        style={{ paddingLeft: '12px' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  if (!hasSection18Data) {
                    setErrorMsg('Please enter the consideration paid and agreed handover date.')
                  } else {
                    setErrorMsg(null)
                  }
                }}
                className="inst-action-btn"
                style={{ background: '#1e40af', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, flex: 1 }}
              >
                Calculate Compensation
              </button>
              <button
                type="button"
                onClick={handleResetSection18}
                style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#64748b', borderRadius: '8px', padding: '10px 18px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results Column */}
          <div className="inst-result-col">
            <div className="inst-section-title" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span>Section 18 Statutory Compensation</span>
            </div>

            {!hasSection18Data || daysPrimary <= 0 ? (
              <div className="inst-empty-notice" style={{ padding: '32px 20px', textAlign: 'center', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '12px', color: '#64748b' }}>
                Enter consideration paid and promised possession date to calculate delay duration and statutory compensation interest.
              </div>
            ) : (
              <>
                <div className="inst-kpi-grid">
                  <div className="inst-kpi-card">
                    <span className="inst-kpi-label">Net Delay</span>
                    <span className="inst-kpi-value" style={{ color: '#b91c1c' }}>
                      {daysPrimary} Days ({(daysPrimary / 30.42).toFixed(1)} Mo)
                    </span>
                  </div>
                  <div className="inst-kpi-card">
                    <span className="inst-kpi-label">Interest Rate</span>
                    <span className="inst-kpi-value">{numRate.toFixed(2)}% p.a.</span>
                  </div>
                  <div className="inst-kpi-card inst-kpi-card--primary">
                    <span className="inst-kpi-label">
                      {activeMode === 'refund' ? 'Total Refund Claim' : 'Delay Compensation'}
                    </span>
                    <span className="inst-kpi-value" style={{ color: '#047857' }}>
                      {formatINR(activeMode === 'refund' ? totalRefund : totalDelayInterest)}
                    </span>
                  </div>
                  <div className="inst-kpi-card">
                    <span className="inst-kpi-label">Total Principal</span>
                    <span className="inst-kpi-value">{formatINR(totalPrincipal)}</span>
                  </div>
                </div>

                <div className="inst-table-wrap" style={{ marginTop: '16px' }}>
                  <table className="inst-data-table">
                    <tbody>
                      <tr>
                        <td>Principal Consideration Paid</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatINR(numAmountPaid)}</td>
                      </tr>
                      <tr>
                        <td>Delay Compensation ({daysPrimary} Days @ {numRate}%)</td>
                        <td style={{ textAlign: 'right', color: '#047857', fontWeight: 600 }}>+{formatINR(interestPrimary)}</td>
                      </tr>
                      {numSubsequentAmount > 0 && (
                        <tr>
                          <td>Subsequent Payment Delay ({daysSubsequent} Days)</td>
                          <td style={{ textAlign: 'right', color: '#047857', fontWeight: 600 }}>+{formatINR(interestSubsequent)}</td>
                        </tr>
                      )}
                      <tr style={{ background: '#ecfdf5' }}>
                        <td style={{ fontWeight: 700, color: '#047857' }}>Total Statutory Delay Interest</td>
                        <td style={{ textAlign: 'right', fontWeight: 700, color: '#047857' }}>{formatINR(totalDelayInterest)}</td>
                      </tr>
                      {activeMode === 'refund' && (
                        <tr style={{ background: '#0f172a', color: '#ffffff' }}>
                          <td style={{ fontWeight: 700 }}>Total Refund Claim (Principal + Interest)</td>
                          <td style={{ textAlign: 'right', fontWeight: 700, fontSize: '15px' }}>{formatINR(totalRefund)}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: '14px', display: 'flex', gap: '10px' }}>
                  <button type="button" className="inst-action-btn" onClick={handleCopy} style={{ flex: 1 }}>
                    {copied ? (
                      <>
                        <CheckIcon size={14} />
                        <span>Copied Summary</span>
                      </>
                    ) : (
                      <>
                        <CopyIcon size={14} />
                        <span>Copy Statement</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
