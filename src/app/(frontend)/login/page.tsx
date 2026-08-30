'use client'

import React, { useState } from 'react'

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false)
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsSubmitting(false)
      return
    }
    
    try {
      const { confirmPassword, ...submitData } = formData
      const res = await fetch('/api/partner-registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const errorData = await res.json()
        setError(errorData.errors?.[0]?.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('A network error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      const endpoint = '/api/users/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        const role = data?.user?.role;
        // Strict Role-Based Redirect
        if (role === 'client') {
          window.location.href = '/client-dashboard'
        } else {
          window.location.href = '/admin' // super_admin, admin, staff, editor, recruiter
        }
      } else {
        const errorData = await res.json()
        setError(errorData.errors?.[0]?.message || 'Invalid email or password.')
      }
    } catch (err) {
      setError('A network error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="login-page" style={{ 
        minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', 
        padding: '4rem 1rem', background: 'linear-gradient(135deg, #f5f7fa 0%, #e2e8f0 100%)' 
      }}>
        <div className="login-container" style={{ 
          background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '3rem 2.5rem', 
          borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', width: '100%', maxWidth: '550px',
          border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce3', color: '#16a34a', marginBottom: '1rem' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.5rem' }}>Registration Submitted Successfully!</h2>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>Our admin team will review your details. You will receive an email notification once your account is active.</p>
          
          <button 
            onClick={() => { setSubmitted(false); setIsRegistering(false) }}
            style={{ background: '#e66a2b', color: '#fff', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="login-page" style={{ 
      minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', 
      padding: '4rem 1rem', background: 'linear-gradient(135deg, #f5f7fa 0%, #e2e8f0 100%)' 
    }}>
      <div className="login-container" style={{ 
        background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '3rem 2.5rem', 
        borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', width: '100%', maxWidth: '550px',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.2rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
            {isRegistering ? 'Register as Client' : 'Team Eyrie Portal'}
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
            {isRegistering ? 'Create your client account to access our network.' : 'Welcome back! Please sign in to access your dashboard.'}
          </p>
        </div>
        
        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            {error}
          </div>
        )}

        {isRegistering ? (
          <form className="login-form" onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div className="form-group">
              <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>Username *</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleRegisterChange} required placeholder="e.g. johndoe" style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', backgroundColor: '#f8fafc' }} />
            </div>

            <div className="form-group">
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>Email Address *</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleRegisterChange} required placeholder="john@example.com" style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', backgroundColor: '#f8fafc' }} />
            </div>

            <div className="form-group">
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>Password *</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleRegisterChange} required placeholder="••••••••" style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', backgroundColor: '#f8fafc' }} />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>Confirm Password *</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleRegisterChange} required placeholder="••••••••" style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', backgroundColor: '#f8fafc' }} />
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <button type="submit" disabled={isSubmitting} style={{ width: '100%', background: '#e66a2b', color: '#fff', padding: '1rem', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1, transition: 'background 0.2s' }}>
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
              
              <p style={{ textAlign: 'center', marginTop: '1rem', color: '#64748b' }}>
                Already have an active account?{' '}
                <button type="button" onClick={() => setIsRegistering(false)} style={{ background: 'none', border: 'none', color: '#e66a2b', fontWeight: '600', cursor: 'pointer', fontSize: '1rem', padding: 0 }}>
                  Login Here
                </button>
              </p>
            </div>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group">
              <label htmlFor="login-email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>Email Address</label>
              <input type="email" id="login-email" name="email" value={loginData.email} onChange={handleLoginChange} required placeholder="john@example.com" style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', backgroundColor: '#f8fafc' }} />
            </div>

            <div className="form-group">
              <label htmlFor="login-password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>Password</label>
              <input type="password" id="login-password" name="password" value={loginData.password} onChange={handleLoginChange} required placeholder="••••••••" style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', backgroundColor: '#f8fafc' }} />
            </div>

            <button type="submit" style={{ marginTop: '0.5rem', background: '#e66a2b', color: '#fff', padding: '1rem', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}>
              Login
            </button>
            
            <p style={{ textAlign: 'center', marginTop: '1rem', color: '#64748b' }}>
              Not a partner yet?{' '}
              <button type="button" onClick={() => setIsRegistering(true)} style={{ background: 'none', border: 'none', color: '#e66a2b', fontWeight: '600', cursor: 'pointer', fontSize: '1rem', padding: 0 }}>
                Register as a Client
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
