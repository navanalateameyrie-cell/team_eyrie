'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import TeamEyrieCaLogo from '@/components/TeamEyrieCaLogo'

export default function ClientDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', { method: 'POST' })
    } catch (e) {
      console.error(e)
    } finally {
      window.location.href = '/'
    }
  }

  useEffect(() => {
    // Fetch the logged-in user profile from Payload CMS
    fetch('/api/users/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user)
        } else {
          window.location.href = '/login'
        }
      })
      .catch(() => {
        window.location.href = '/login'
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: '#0f172a', fontSize: '1.2rem', fontWeight: '500' }}>
        Loading secure profile...
      </div>
    )
  }

  if (!user) return null

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: 'M4 6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm10 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V6zM4 16a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2zm10 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2z' },
    { id: 'services', label: 'My Services', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' },
    { id: 'documents', label: 'Tax Documents', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' },
    { id: 'invoices', label: 'Invoices & Billing', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
    { id: 'support', label: 'Support Tickets', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' }
  ]

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', backgroundColor: '#f1f5f9' }}>
      
      {/* Professional Sidebar */}
      <div style={{ width: '280px', backgroundColor: '#0f172a', color: '#fff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <TeamEyrieCaLogo lightMode={true} height={42} />
          <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Client Portal</div>
        </div>

        <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', padding: '0.875rem 1rem',
                backgroundColor: activeTab === item.id ? '#e66a2b' : 'transparent',
                color: activeTab === item.id ? '#fff' : '#cbd5e1',
                border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
                fontSize: '1rem', fontWeight: '500', transition: 'all 0.2s'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Profile specific bottom section */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>
              {user.name ? user.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: '600', color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontSize: '0.95rem' }}>{user.name || 'Client'}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{ display: 'block', width: '100%', border: 'none', cursor: 'pointer', textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.08)', color: '#cbd5e1', padding: '0.75rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'all 0.2s' }} 
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ef4444'; e.currentTarget.style.color = '#fff' }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#cbd5e1' }}
          >
            Secure Logout
          </button>
        </div>
      </div>

      {/* Main Dynamic Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        <header style={{ backgroundColor: '#fff', padding: '1.5rem 3rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0f172a' }}>
            {menuItems.find(i => i.id === activeTab)?.label}
          </h2>
          <div style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Welcome back, <strong style={{ color: '#0f172a' }}>{user.name || 'Client'}</strong>
          </div>
        </header>

        <main style={{ padding: '3rem', flex: 1 }}>
          
          {activeTab === 'dashboard' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#334155', marginBottom: '1rem' }}>Active Engagements</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#e66a2b' }}>0</div>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.4' }}>Projects currently in progress</p>
                </div>
              </div>

              <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#334155', marginBottom: '1rem' }}>Pending Documents</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#0f172a' }}>0</div>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.4' }}>Files requiring your signature or upload</p>
                </div>
              </div>

              <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', gridColumn: '1 / -1' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#334155', marginBottom: '1rem' }}>Recent Activity</h3>
                <p style={{ color: '#64748b', fontSize: '1rem' }}>No recent activity found for <strong style={{ color: '#0f172a' }}>{user.email}</strong>. Start by uploading a document or requesting a new service.</p>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div style={{ background: '#fff', padding: '4rem 2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <svg style={{ margin: '0 auto 1.5rem', color: '#cbd5e1' }} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>No Services Requested</h3>
              <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: '1.6' }}>You haven't enrolled in any Chartered Accountant services yet. Contact our team to begin your professional engagement.</p>
              <button style={{ background: '#e66a2b', color: '#fff', padding: '0.875rem 2.5rem', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '1.05rem' }}>Request CA Service</button>
            </div>
          )}

          {activeTab === 'documents' && (
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#334155' }}>Your Secure Tax Vault</h3>
                <button style={{ background: '#0f172a', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: '6px', border: 'none', fontWeight: '500', cursor: 'pointer' }}>+ Upload Document</button>
              </div>
              <div style={{ padding: '4rem 2rem', border: '2px dashed #cbd5e1', borderRadius: '8px', textAlign: 'center', backgroundColor: '#f8fafc' }}>
                <svg style={{ margin: '0 auto 1rem', color: '#94a3b8' }} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p style={{ color: '#64748b', fontSize: '1.05rem' }}>This secure area is uniquely encrypted for <strong>{user.name}</strong> to upload and receive sensitive financial documents.</p>
              </div>
            </div>
          )}

          {(activeTab === 'invoices' || activeTab === 'support') && (
             <div style={{ background: '#fff', padding: '4rem 2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
               <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>No Data Available</h3>
               <p style={{ color: '#64748b' }}>There are currently no records here for {user.name}.</p>
             </div>
          )}

        </main>
      </div>
    </div>
  )
}
