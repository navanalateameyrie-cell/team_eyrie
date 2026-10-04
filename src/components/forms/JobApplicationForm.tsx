'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Consent = { label: string; reassurance?: string; grievanceContact?: string }

const MAX_SIZE = 5 * 1024 * 1024
const ACCEPT = '.pdf,.doc,.docx'

function validateFile(f: File): string | null {
  if (f.size > MAX_SIZE) return 'File must be 5 MB or smaller.'
  if (!/\.(pdf|docx?)$/i.test(f.name)) return 'Please upload a PDF or Word document.'
  return null
}

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default function JobApplicationForm({
  jobId,
  jobTitle,
  consent,
}: {
  jobId: string | number
  jobTitle: string
  consent: Consent
}) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [error, setError] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Lock body scroll while the modal is open + close on Escape.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  function pickFile(f: File | undefined | null) {
    if (!f) return
    const err = validateFile(f)
    if (err) {
      setError(err)
      return
    }
    setError('')
    setFile(f)
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!file) {
      setError('Please attach your résumé.')
      return
    }
    if (!agreed) {
      setError('Please provide your consent to continue.')
      return
    }
    setStatus('sending')
    setError('')
    const fd = new FormData(e.currentTarget)
    fd.set('job', String(jobId))
    fd.set('consent', agreed ? 'true' : 'false')
    fd.set('resume', file)
    try {
      const res = await fetch('/apply', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Request failed')
      setStatus('ok')
    } catch (err) {
      setStatus('error')
      setError((err as Error).message)
    }
  }

  const applied = status === 'ok'

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        className="btn btn--primary"
        style={{ width: '100%', textAlign: 'center', fontSize: 16, padding: '14px 24px' }}
        onClick={() => setOpen(true)}
        disabled={applied}
      >
        {applied ? '✓ Application Submitted' : 'Apply Now'}
      </button>
      <p style={{ margin: '10px 0 0', fontSize: 12.5, color: 'var(--muted, #5a6472)', textAlign: 'center' }}>
        Takes ~2 minutes · PDF or Word résumé
      </p>

      {/* Modal — portaled to <body> so it escapes any transformed ancestor
          (e.g. ScrollReveal) and stays fixed to the real viewport. */}
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Apply for ${jobTitle}`}
            onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15,23,42,0.55)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            {applied ? (
              <div style={cardStyle}>
                <ModalHeader jobTitle={jobTitle} onClose={() => setOpen(false)} />
                <div style={{ padding: '20px 24px', overflowY: 'auto' }}>
                  <div className="alert alert--success" style={{ marginBottom: 16 }}>
                    <strong>Application received.</strong> Thank you for applying for <em>{jobTitle}</em>. Our
                    recruitment team will review your profile and be in touch. A confirmation with a
                    consent-withdrawal link has been emailed to you.
                  </div>
                  <button className="btn btn--primary" onClick={() => setOpen(false)} style={{ width: '100%' }}>
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} style={cardStyle}>
                <ModalHeader jobTitle={jobTitle} onClose={() => setOpen(false)} />

                {/* Scrollable body */}
                <div style={{ padding: '18px 24px', overflowY: 'auto', overflowX: 'hidden', flex: '1 1 auto' }}>
                  {status === 'error' && <div className="alert alert--error">{error}</div>}

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                      columnGap: 16,
                    }}
                  >
                    <div className="field">
                      <label htmlFor="fullName">Full name *</label>
                      <input id="fullName" name="fullName" required placeholder="e.g. Ananya Sharma" />
                    </div>
                    <div className="field">
                      <label htmlFor="email">Email *</label>
                      <input id="email" name="email" type="email" required placeholder="ananya@example.com" />
                    </div>
                    <div className="field">
                      <label htmlFor="phone">Phone *</label>
                      <input id="phone" name="phone" required placeholder="+91 98765 43210" />
                    </div>
                    <div className="field">
                      <label htmlFor="qualification">Professional Qualification / Track *</label>
                      <select id="qualification" name="qualification" defaultValue="" required>
                        <option value="">— Select Qualification / Track —</option>
                        <option value="qualified_ca">Chartered Accountant (ACA / FCA)</option>
                        <option value="ca_finalist">Semi-Qualified (CA Final / Inter)</option>
                        <option value="articleship">ICAI Article Trainee (Both/Single Group)</option>
                        <option value="cs_llb">Company Secretary / Legal Counsel (CS/LLB)</option>
                        <option value="audit_exec">Audit & Tax Executive (B.Com/M.Com/MBA)</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="preferredLocation">Preferred Office Location *</label>
                      <select id="preferredLocation" name="preferredLocation" defaultValue="">
                        <option value="">— Select Office —</option>
                        <option value="bengaluru">Bengaluru (Karnataka)</option>
                        <option value="mumbai">Mumbai (Maharashtra)</option>
                        <option value="delhi">New Delhi / NCR</option>
                        <option value="chennai">Chennai (Tamil Nadu)</option>
                        <option value="hyderabad">Hyderabad (Telangana)</option>
                        <option value="kochi">Kochi (Kerala)</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="totalExperience">Total experience (yrs)</label>
                      <input id="totalExperience" name="totalExperience" type="number" min="0" step="0.5" placeholder="e.g. 2" />
                    </div>
                    <div className="field">
                      <label htmlFor="noticePeriod">Notice period</label>
                      <input id="noticePeriod" name="noticePeriod" placeholder="e.g. Immediate / 30 days" />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="linkedin">LinkedIn Profile URL</label>
                    <input id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/username" />
                  </div>

                  {/* Drag & drop résumé upload */}
                  <div className="field">
                    <label>Upload Curriculum Vitae (PDF, DOCX) *</label>
                    <div
                      onClick={() => inputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault()
                        setDragOver(true)
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault()
                        setDragOver(false)
                        pickFile(e.dataTransfer.files?.[0])
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
                      style={{
                        border: `2px dashed ${dragOver ? '#1a4b8c' : '#cbd5e1'}`,
                        borderRadius: 10,
                        background: dragOver ? 'rgba(26,75,140,0.06)' : '#f8fafc',
                        padding: '22px 16px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'border-color .15s, background .15s',
                      }}
                    >
                      <input
                        ref={inputRef}
                        type="file"
                        accept={ACCEPT}
                        style={{ display: 'none' }}
                        onChange={(e) => pickFile(e.target.files?.[0])}
                      />
                      {file ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 22 }}>📄</span>
                          <span style={{ fontWeight: 600, color: '#0f274a', wordBreak: 'break-all' }}>{file.name}</span>
                          <span style={{ color: '#5a6472', fontSize: 13 }}>({humanSize(file.size)})</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setFile(null)
                              if (inputRef.current) inputRef.current.value = ''
                            }}
                            style={{ background: 'none', border: 'none', color: '#c0392b', cursor: 'pointer', fontSize: 13 }}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontSize: 28, marginBottom: 4 }}>📄</div>
                          <div style={{ fontWeight: 600, color: '#0f274a' }}>Drag &amp; drop or click to upload CV</div>
                          <div style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>PDF, DOCX up to 5&nbsp;MB</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="coverLetter">Cover note</label>
                    <textarea id="coverLetter" name="coverLetter" placeholder="Tell us why you’re a great fit (optional)" />
                  </div>

                  {/* DPDP consent — required, unticked by default, re-enforced server-side */}
                  <div style={{ border: '1px solid #e6e9ef', borderRadius: 10, padding: 16, background: '#f8fafc' }}>
                    <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer', fontWeight: 400 }}>
                      <input
                        type="checkbox"
                        name="consent"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        style={{ marginTop: 4, width: 18, height: 18, flexShrink: 0 }}
                      />
                      <span style={{ fontSize: 13.5, lineHeight: 1.55, color: '#222' }}>
                        <strong>DPDP Consent:</strong> {consent.label}
                      </span>
                    </label>
                    {consent.grievanceContact && (
                      <p style={{ margin: '10px 0 0 30px', fontSize: 12, color: '#5a6472' }}>
                        Grievance Officer: {consent.grievanceContact}
                      </p>
                    )}
                    {consent.reassurance && (
                      <p style={{ margin: '8px 0 0 30px', fontSize: 12, color: '#5a6472' }}>🔒 {consent.reassurance}</p>
                    )}
                  </div>
                </div>

                {/* Sticky footer — submit always visible */}
                <div style={{ padding: '14px 24px', borderTop: '1px solid #e6e9ef', flexShrink: 0, background: '#fff' }}>
                  {!agreed && (
                    <p style={{ margin: '0 0 8px', fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
                      Please attach your résumé and tick the consent box to submit.
                    </p>
                  )}
                  <button
                    type="submit"
                    className="btn btn--primary"
                    style={{ width: '100%', padding: '13px 24px', fontSize: 16 }}
                    disabled={status === 'sending' || !agreed || !file}
                  >
                    {status === 'sending' ? 'Submitting…' : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </div>,
          document.body,
        )}
    </>
  )
}

const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 14,
  width: '100%',
  maxWidth: 600,
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  boxShadow: '0 24px 70px rgba(0,0,0,0.35)',
}

function ModalHeader({ jobTitle, onClose }: { jobTitle: string; onClose: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '20px 24px',
        borderBottom: '1px solid #e6e9ef',
        flexShrink: 0,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <h3 style={{ margin: 0, color: '#0f274a', fontSize: 20, fontWeight: 700 }}>Apply for this role</h3>
        <p style={{ margin: '4px 0 0', color: '#5a6472', fontSize: 14 }}>{jobTitle}</p>
      </div>
      <button
        aria-label="Close"
        onClick={onClose}
        style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#333', lineHeight: 1, flexShrink: 0 }}
      >
        ✕
      </button>
    </div>
  )
}
