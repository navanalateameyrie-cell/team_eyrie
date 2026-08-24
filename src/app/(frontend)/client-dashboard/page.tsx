'use client'

import React, { useEffect, useState } from 'react'
import TeamEyrieCaLogo from '@/components/TeamEyrieCaLogo'

export default function ClientDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null)

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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#fff', fontSize: '1.2rem', fontWeight: '600' }}>
        Loading secure client portal...
      </div>
    )
  }

  if (!user) return null

  const menuSections = [
    {
      title: 'MAIN',
      items: [
        { id: 'dashboard', label: 'Overview', icon: 'M4 6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm10 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V6zM4 16a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2zm10 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2z' },
        { id: 'services', label: 'My Services', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' },
      ]
    },
    {
      title: 'FINANCE & DOCS',
      items: [
        { id: 'documents', label: 'Tax Documents', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' },
        { id: 'invoices', label: 'Invoices & Billing', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
      ]
    },
    {
      title: 'SETTINGS & HELP',
      items: [
        { id: 'support', label: 'Support Tickets', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' }
      ]
    }
  ]

  const activeLabel = menuSections.flatMap(s => s.items).find(i => i.id === activeTab)?.label || 'Dashboard'

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', backgroundColor: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Dynamic Collapsible Sidebar */}
      <div 
        style={{ 
          width: isCollapsed ? '72px' : '260px', 
          backgroundColor: '#0b1324', 
          color: '#fff', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: isCollapsed ? '4px 0 20px rgba(0, 0, 0, 0.2)' : 'none',
          zIndex: 10
        }}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          style={{
            position: 'absolute',
            top: '24px',
            right: isCollapsed ? '-14px' : '-14px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: '#0b1324',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#e66a2b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 20,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.borderColor = '#e66a2b' }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {isCollapsed ? <polyline points="9 18 15 12 9 6" /> : <polyline points="15 18 9 12 15 6" />}
          </svg>
        </button>

        {/* Sidebar Header */}
        <div style={{ 
          padding: isCollapsed ? '1.5rem 0.5rem' : '1.75rem 1.25rem', 
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isCollapsed ? 'center' : 'flex-start',
          overflow: 'hidden'
        }}>
          {isCollapsed ? (
            <div 
              style={{
                width: '42px', height: '42px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #e66a2b 0%, #b08d57 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '1.1rem', color: '#fff',
                boxShadow: '0 4px 12px rgba(230, 106, 43, 0.3)'
              }}
              title={user.name || 'Client'}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'C'}
            </div>
          ) : (
            <>
              <TeamEyrieCaLogo lightMode={true} height={36} />
              <div style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: '800' }}>
                Client Portal
              </div>
            </>
          )}
        </div>

        {/* Sidebar Menu Sections */}
        <nav style={{ flex: 1, padding: isCollapsed ? '1.5rem 0.5rem' : '1.5rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
          {menuSections.map((group, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {/* Category Header Label */}
              <div style={{
                fontSize: '0.68rem',
                fontWeight: '800',
                color: '#64748b',
                letterSpacing: '1.2px',
                padding: isCollapsed ? '0 0 6px 0' : '0 10px 6px 10px',
                textAlign: isCollapsed ? 'center' : 'left',
                borderBottom: isCollapsed ? '1px solid rgba(255,255,255,0.06)' : 'none',
                marginBottom: isCollapsed ? '6px' : '0',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}>
                {isCollapsed ? group.title.substring(0, 3) : group.title}
              </div>

              {group.items.map(item => {
                const isActive = activeTab === item.id
                return (
                  <div key={item.id} style={{ position: 'relative' }}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      onMouseEnter={() => setHoveredTooltip(item.id)}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                        gap: '0.85rem',
                        width: '100%',
                        padding: isCollapsed ? '0.85rem 0' : '0.85rem 1rem',
                        backgroundColor: isActive ? '#e66a2b' : 'transparent',
                        color: isActive ? '#ffffff' : '#cbd5e1',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.92rem',
                        fontWeight: isActive ? '700' : '500',
                        transition: 'all 0.2s ease',
                        boxShadow: isActive ? '0 4px 14px rgba(230, 106, 43, 0.35)' : 'none',
                        position: 'relative'
                      }}
                      onMouseOver={(e) => {
                        if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'
                      }}
                      onMouseOut={(e) => {
                        if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <path d={item.icon} />
                      </svg>
                      
                      {!isCollapsed && (
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.label}
                        </span>
                      )}
                    </button>

                    {/* Floating Tooltip in Closed / Mini Sidebar Mode (Image 2 style) */}
                    {isCollapsed && hoveredTooltip === item.id && (
                      <div style={{
                        position: 'fixed',
                        left: '84px',
                        top: 'auto',
                        transform: 'translateY(-36px)',
                        backgroundColor: '#0f192d',
                        color: '#ffffff',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        letterSpacing: '0.5px',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                        zIndex: 99999,
                        pointerEvents: 'none',
                        borderLeft: '3px solid #e66a2b'
                      }}>
                        {item.label}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Profile / Logout Section at Bottom */}
        <div style={{ 
          padding: isCollapsed ? '1rem 0.5rem' : '1.25rem 1rem', 
          borderTop: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: 'rgba(0,0,0,0.2)'
        }}>
          {!isCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem', color: '#fff', flexShrink: 0 }}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'C'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontWeight: '600', color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontSize: '0.9rem' }}>{user.name || 'Client'}</div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.email}</div>
              </div>
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <button 
              onClick={handleLogout} 
              onMouseEnter={() => setHoveredTooltip('logout')}
              onMouseLeave={() => setHoveredTooltip(null)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: isCollapsed ? 'center' : 'center',
                gap: '0.6rem',
                width: '100%', 
                border: 'none', 
                cursor: 'pointer', 
                backgroundColor: 'rgba(255,255,255,0.08)', 
                color: '#cbd5e1', 
                padding: isCollapsed ? '0.8rem 0' : '0.75rem', 
                borderRadius: '8px', 
                fontSize: '0.88rem', 
                fontWeight: '600', 
                transition: 'all 0.2s ease' 
              }} 
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ef4444'; e.currentTarget.style.color = '#fff' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#cbd5e1' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              {!isCollapsed && <span>Secure Logout</span>}
            </button>

            {isCollapsed && hoveredTooltip === 'logout' && (
              <div style={{
                position: 'fixed',
                left: '84px',
                top: 'auto',
                transform: 'translateY(-36px)',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4)',
                zIndex: 99999,
                pointerEvents: 'none'
              }}>
                Secure Logout
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Dynamic Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        <header style={{ backgroundColor: '#fff', padding: '1.5rem 3rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' }}>
            {activeLabel}
          </h2>
          <div style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Welcome back, <strong style={{ color: '#0f172a' }}>{user.name || 'Client'}</strong>
          </div>
        </header>

        <main style={{ padding: '3rem', flex: 1 }}>
          
          {activeTab === 'dashboard' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{ background: '#fff', padding: '2rem', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#334155', marginBottom: '1rem' }}>Active Engagements</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#e66a2b' }}>0</div>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.4' }}>Projects currently in progress</p>
                </div>
              </div>

              <div style={{ background: '#fff', padding: '2rem', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#334155', marginBottom: '1rem' }}>Pending Documents</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a' }}>0</div>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.4' }}>Files requiring your signature or upload</p>
                </div>
              </div>

              <div style={{ background: '#fff', padding: '2rem', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', gridColumn: '1 / -1' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#334155', marginBottom: '1rem' }}>Recent Activity</h3>
                <p style={{ color: '#64748b', fontSize: '1rem' }}>No recent activity found for <strong style={{ color: '#0f172a' }}>{user.email}</strong>. Start by uploading a document or requesting a new service.</p>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div style={{ background: '#fff', padding: '4rem 2rem', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <svg style={{ margin: '0 auto 1.5rem', color: '#cbd5e1' }} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>No Services Requested</h3>
              <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: '1.6' }}>You haven't enrolled in any Chartered Accountant services yet. Contact our team to begin your professional engagement.</p>
              <button style={{ background: '#e66a2b', color: '#fff', padding: '0.875rem 2.5rem', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '1.05rem', boxShadow: '0 4px 14px rgba(230, 106, 43, 0.3)' }}>Request CA Service</button>
            </div>
          )}

          {activeTab === 'documents' && (
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#334155' }}>Your Secure Tax Vault</h3>
                <button style={{ background: '#0f172a', color: '#fff', padding: '0.65rem 1.35rem', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>+ Upload Document</button>
              </div>
              <div style={{ padding: '4rem 2rem', border: '2px dashed #cbd5e1', borderRadius: '10px', textAlign: 'center', backgroundColor: '#f8fafc' }}>
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
             <div style={{ background: '#fff', padding: '4rem 2rem', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
               <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>No Data Available</h3>
               <p style={{ color: '#64748b' }}>There are currently no records here for {user.name}.</p>
             </div>
          )}

        </main>
      </div>
    </div>
  )
}
