'use client'

import React, { useState } from 'react'

export default function WithdrawConsent({ token, jobTitle }: { token: string; jobTitle: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [error, setError] = useState('')

  async function withdraw() {
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/withdraw-consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Request failed')
      setStatus('ok')
    } catch (err) {
      setStatus('error')
      setError((err as Error).message)
    }
  }

  if (status === 'ok') {
    return (
      <div className="alert alert--success">
        <strong>Consent withdrawn.</strong> Your consent for the application to <em>{jobTitle}</em> has been
        withdrawn and it will no longer be considered. Team Eyrie will cease processing your application data.
      </div>
    )
  }

  return (
    <div>
      <p className="lead" style={{ marginBottom: 20 }}>
        You are about to withdraw your consent for your application to <strong>{jobTitle}</strong>. This will
        stop Team Eyrie from processing your application, and it will no longer be considered.
      </p>
      {status === 'error' && <div className="alert alert--error">{error}</div>}
      <button className="btn btn--primary" onClick={withdraw} disabled={status === 'sending'}>
        {status === 'sending' ? 'Withdrawing…' : 'Confirm withdrawal of consent'}
      </button>
    </div>
  )
}
