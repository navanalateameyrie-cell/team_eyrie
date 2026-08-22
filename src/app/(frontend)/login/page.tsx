'use client'

import React, { useState, useEffect } from 'react'
import Select from 'react-select'

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false)
  const [servicesOptions, setServicesOptions] = useState<{ value: string, label: string }[]>([])
  
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    aadhaar: '',
    pan: '',
    mobile: '',
    email: '',
    companyName: '',
    sector: 'private',
    gst: '',
    services: [] as string[]
  })
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Fetch services from Payload CMS API
    fetch('/api/services?limit=100')
      .then(res => res.json())
      .then(data => {
        if (data && data.docs) {
          const options = data.docs.map((service: any) => ({
            value: service.id,
            label: service.title
          }))
          setServicesOptions(options)
        }
      })
      .catch(err => console.error('Error fetching services:', err))
  }, [])

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleServicesChange = (selectedOptions: any) => {
    setFormData({
      ...formData,
      services: selectedOptions ? selectedOptions.map((opt: any) => opt.value) : []
    })
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      const res = await fetch('/api/partner-registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('The Partner Dashboard is currently in development. Please wait for the official launch after your account is approved!')
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
        borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', width: '100%', maxWidth: isRegistering ? '700px' : '550px',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.2rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
            {isRegistering ? 'Register as Partner' : 'Login'}
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
            {isRegistering ? 'Join the Team Eyrie network by providing your professional details.' : 'Welcome back! Please enter your details to sign in.'}
          </p>
        </div>
        
        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            {error}
          </div>
        )}

        {isRegistering ? (
          <form className="login-form" onSubmit={handleRegisterSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>Full Name *</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleRegisterChange} required placeholder="e.g. John Doe" style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', backgroundColor: '#f8fafc' }} />
            </div>

            <div className="form-group">
              <label htmlFor="designation" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>Designation *</label>
              <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleRegisterChange} required placeholder="Partner" style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', backgroundColor: '#f8fafc' }} />
            </div>

            <div className="form-group">
              <label htmlFor="companyName" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>Company Name *</label>
              <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleRegisterChange} required placeholder="Eyrie Corp" style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', backgroundColor: '#f8fafc' }} />
            </div>

            <div className="form-group">
              <label htmlFor="mobile" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>Mobile Number *</label>
              <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleRegisterChange} required placeholder="+91 98765 43210" style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', backgroundColor: '#f8fafc' }} />
            </div>

            <div className="form-group">
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>Email Address *</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleRegisterChange} required placeholder="john@example.com" style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', backgroundColor: '#f8fafc' }} />
            </div>

            <div className="form-group">
              <label htmlFor="aadhaar" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>Aadhaar Number *</label>
              <input type="text" id="aadhaar" name="aadhaar" value={formData.aadhaar} onChange={handleRegisterChange} required placeholder="1234 5678 9012" style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', backgroundColor: '#f8fafc' }} />
            </div>

            <div className="form-group">
              <label htmlFor="pan" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>PAN Number *</label>
              <input type="text" id="pan" name="pan" value={formData.pan} onChange={handleRegisterChange} required placeholder="ABCDE1234F" style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', textTransform: 'uppercase', backgroundColor: '#f8fafc' }} />
            </div>

            <div className="form-group">
              <label htmlFor="gst" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>GST Number</label>
              <input type="text" id="gst" name="gst" value={formData.gst} onChange={handleRegisterChange} placeholder="Optional" style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', textTransform: 'uppercase', backgroundColor: '#f8fafc' }} />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>Sector *</label>
              <div style={{ display: 'flex', gap: '1.5rem', padding: '0.5rem 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="sector" value="government" checked={formData.sector === 'government'} onChange={handleRegisterChange} style={{ accentColor: '#e66a2b', width: '1.2rem', height: '1.2rem' }} />
                  <span>Government</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="sector" value="private" checked={formData.sector === 'private'} onChange={handleRegisterChange} style={{ accentColor: '#e66a2b', width: '1.2rem', height: '1.2rem' }} />
                  <span>Private</span>
                </label>
              </div>
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>Services *</label>
              <Select
                isMulti
                name="services"
                options={servicesOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select services..."
                onChange={handleServicesChange}
                menuShouldBlockScroll={true}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? '#e66a2b' : '#cbd5e1',
                    borderRadius: '8px',
                    padding: '0.25rem',
                    boxShadow: state.isFocused ? '0 0 0 1px #e66a2b' : 'none',
                    '&:hover': {
                      borderColor: '#cbd5e1'
                    }
                  }),
                  menuList: (baseStyles) => ({
                    ...baseStyles,
                    overscrollBehavior: 'contain'
                  })
                }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
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
                Register as a Partner
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
