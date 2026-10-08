'use client'

import React, { useState } from 'react'

type Option = { id: string | number; label: string }

const DEFAULT_OFFICES: Option[] = [
  { id: 'bengaluru', label: 'Bengaluru (Karnataka)' },
  { id: 'mumbai', label: 'Mumbai (Maharashtra)' },
  { id: 'delhi', label: 'New Delhi / NCR' },
  { id: 'chennai', label: 'Chennai (Tamil Nadu)' },
  { id: 'hyderabad', label: 'Hyderabad (Telangana)' },
  { id: 'kochi', label: 'Kochi (Kerala)' },
  { id: 'pune', label: 'Pune (Maharashtra)' },
]

export default function ContactForm({
  services = [],
  offices = [],
}: {
  services?: Option[]
  offices?: Option[]
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [error, setError] = useState('')

  // Use passed offices or fallback to standard network offices
  const officeList = offices.length > 0 ? offices : DEFAULT_OFFICES
  const [selectedOffice, setSelectedOffice] = useState<string | number>(officeList[0]?.id || '')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    const fd = new FormData(e.currentTarget)
    const payload: Record<string, any> = {
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      company: fd.get('company'),
      subject: fd.get('subject'),
      message: fd.get('message'),
      office: fd.get('office') || selectedOffice,
      status: 'new',
    }
    const service = fd.get('service')
    if (service) payload.serviceInterest = [service]

    try {
      const res = await fetch('/api/contact-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('ok')
        ; (e.target as HTMLFormElement).reset()
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again or email us directly at contact@balakrishnaandco.com.')
    }
  }

  if (status === 'ok') {
    return (
      <div
        style={{
          background: '#edf4fc',
          border: '1.5px solid #bfdbfe',
          borderLeft: '5px solid #1a4b8c',
          borderRadius: 12,
          padding: '24px 20px',
          color: '#0f274a',
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 800, color: '#1a4b8c', marginBottom: 6 }}>
          ✓ Enquiry Successfully Submitted
        </div>
        <p style={{ margin: 0, fontSize: 14.5, color: '#334155', lineHeight: 1.6 }}>
          Thank you for reaching out to Team Eyrie. Your enquiry has been routed to our designated partner in <strong>{officeList.find(o => String(o.id) === String(selectedOffice))?.label || 'our network'}</strong>. We will review your requirements and respond promptly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} style={{ marginTop: 8 }}>
      {status === 'error' && (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 8,
            padding: '12px 16px',
            color: '#b91c1c',
            fontSize: 14,
            marginBottom: 18,
          }}
        >
          {error}
        </div>
      )}

      <div className="grid grid--2" style={{ gap: 0, columnGap: 20 }}>
        <div className="field">
          <label htmlFor="name" style={{ fontWeight: 600, color: '#0f274a', fontSize: 13.5 }}>
            Full Name *
          </label>
          <input id="name" name="name" required placeholder="e.g. Ramesh Kumar" />
        </div>
        <div className="field">
          <label htmlFor="email" style={{ fontWeight: 600, color: '#0f274a', fontSize: 13.5 }}>
            Official Email *
          </label>
          <input id="email" name="email" type="email" required placeholder="ramesh@company.com" />
        </div>
        <div className="field">
          <label htmlFor="phone" style={{ fontWeight: 600, color: '#0f274a', fontSize: 13.5 }}>
            Contact Number *
          </label>
          <input id="phone" name="phone" required placeholder="+91 98765 43210" />
        </div>
        <div className="field">
          <label htmlFor="company" style={{ fontWeight: 600, color: '#0f274a', fontSize: 13.5 }}>
            Company / Organization
          </label>
          <input id="company" name="company" placeholder="e.g. ABC Enterprises Pvt Ltd" />
        </div>
        <div className="field">
          <label htmlFor="office" style={{ fontWeight: 600, color: '#0f274a', fontSize: 13.5 }}>
            Select Office / Practice Branch *
          </label>
          <select
            id="office"
            name="office"
            required
            value={selectedOffice}
            onChange={(e) => setSelectedOffice(e.target.value)}
          >
            <option value="">— Select Office Location —</option>
            {officeList.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="service" style={{ fontWeight: 600, color: '#0f274a', fontSize: 13.5 }}>
            Practice Area / Service of Interest
          </label>
          <select id="service" name="service" defaultValue="">
            <option value="">— Select Practice Area —</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="subject" style={{ fontWeight: 600, color: '#0f274a', fontSize: 13.5 }}>
          Subject of Enquiry
        </label>
        <input id="subject" name="subject" placeholder="e.g. Statutory Audit & Corporate Tax Consultation" />
      </div>

      <div className="field">
        <label htmlFor="message" style={{ fontWeight: 600, color: '#0f274a', fontSize: 13.5 }}>
          Your Requirements / Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Please describe your requirements, industry, or questions so our designated partner can prepare for our introductory call..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          background: '#1a4b8c',
          color: '#ffffff',
          padding: '13px 32px',
          border: 'none',
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 700,
          cursor: status === 'sending' ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 14px rgba(26, 75, 140, 0.35)',
          transition: 'all 0.15s ease',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span>{status === 'sending' ? 'Submitting Enquiry…' : 'Send Enquiry to Office'}</span>
        <span>→</span>
      </button>
    </form>
  )
}
