'use client'

import React, { useEffect, useState } from 'react'
import TeamEyrieCaLogo from '@/components/ui/TeamEyrieCaLogo'
import ServiceDocumentManager from '@/components/sections/ServiceDocumentManager'

export default function ClientDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null)
  const [allServices, setAllServices] = useState<any[]>([])
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedServiceForDocs, setSelectedServiceForDocs] = useState<any>(null)
  const [profileForm, setProfileForm] = useState({ phone: '', pan: '', aadhaar: '', selectedServices: [] as string[] })
  const [searchQuery, setSearchQuery] = useState('')
  const [appointments, setAppointments] = useState<any[]>([])
  const [aptForm, setAptForm] = useState({ service: '', date: '', notes: '' })
  const [isBooking, setIsBooking] = useState(false)
  const [calendarView, setCalendarView] = useState('calendar')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isAppointmentDrawerOpen, setIsAppointmentDrawerOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null)

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  }


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
          if (data.user.role !== 'client') {
            // Strictly block admins/staff from the client dashboard.
            fetch('/api/users/logout', { method: 'POST' }).then(() => {
              window.location.href = '/login'
            })
            return
          }
          setUser(data.user)
          setProfileForm({
            phone: data.user.phone || '',
            pan: data.user.pan || '',
            aadhaar: data.user.aadhaar || '',
            selectedServices: data.user.clientServices?.map((cs: any) => {
              const s = cs.service;
              return typeof s === 'string' ? s : s?.id;
            }).filter(Boolean) || []
          })
          fetch(`/api/appointments?where[client][equals]=${data.user.id}&sort=-appointmentDate`)
            .then(r => r.json())
            .then(d => { if (d.docs) setAppointments(d.docs) })
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

    fetch('/api/services?limit=100')
      .then(res => res.json())
      .then(data => {
        if (data.docs) setAllServices(data.docs)
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

  
  const calculateCompletion = () => {
    if (!user) return 0
    const fields = ['name', 'email', 'phone', 'pan', 'aadhaar']
    let filled = 0
    fields.forEach(f => {
      if (user[f] && user[f].trim() !== '') filled++
    })
    if (user.clientServices && user.clientServices.length > 0) filled++
    const total = fields.length + 1
    return Math.round((filled / total) * 100)
  }
  const completionPercent = calculateCompletion()

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    try {
      const updatedClientServices = profileForm.selectedServices.map(serviceId => {
         const existing = user.clientServices?.find((cs: any) => (typeof cs.service === 'string' ? cs.service : cs.service?.id) === serviceId);
         return existing || { service: serviceId };
      });
      const patchData = { ...profileForm, clientServices: updatedClientServices };
      delete (patchData as any).selectedServices;

      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patchData)
      })
      const data = await res.json()
      if (data.doc) {
        setUser(data.doc)
        showNotification('Profile updated successfully!', 'success')
      }
    } catch (err) {
      console.error(err)
      showNotification('Failed to update profile', 'error')
    } finally {
      setIsUpdating(false)
    }
  }


  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} style={{ padding: '1rem', background: 'transparent', borderRadius: '12px' }} />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const isToday = date.toDateString() === today.toDateString();
      const dayAppointments = appointments.filter(apt => new Date(apt.appointmentDate).toDateString() === date.toDateString());

      days.push(
        <div key={`day-${d}`} style={{ 
          padding: '0.85rem', 
          minHeight: '120px', 
          background: isToday ? 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
          borderRadius: '16px',
          boxShadow: isToday ? '0 4px 15px rgba(245, 158, 11, 0.15), inset 0 2px 4px rgba(255,255,255,0.8)' : '0 4px 10px rgba(0,0,0,0.03), inset 0 2px 4px rgba(255,255,255,0.8)',
          border: '1px solid rgba(255,255,255,0.6)',
          display: 'flex', flexDirection: 'column', gap: '0.5rem', 
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
          cursor: 'pointer', 
          position: 'relative',
          overflow: 'hidden'
        }} 
        onMouseOver={e => { 
          e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; 
          e.currentTarget.style.boxShadow = isToday ? '0 15px 30px rgba(245, 158, 11, 0.25), inset 0 2px 4px rgba(255,255,255,0.8)' : '0 15px 30px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.8)'; 
          e.currentTarget.style.zIndex = '10'; 
          e.currentTarget.style.borderColor = isToday ? '#fbbf24' : '#C09B5A';
        }} 
        onMouseOut={e => { 
          e.currentTarget.style.transform = 'none'; 
          e.currentTarget.style.boxShadow = isToday ? '0 4px 15px rgba(245, 158, 11, 0.15), inset 0 2px 4px rgba(255,255,255,0.8)' : '0 4px 10px rgba(0,0,0,0.03), inset 0 2px 4px rgba(255,255,255,0.8)'; 
          e.currentTarget.style.zIndex = '1'; 
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
        }} 
        onClick={() => { setAptForm(prev => ({...prev, date: `${year}-${String(month+1).padStart(2, '0')}-${String(d).padStart(2, '0')}T09:00`})); setIsAppointmentDrawerOpen(true); }}>
          
          <div style={{ fontWeight: '800', fontSize: '1rem', color: isToday ? '#b45309' : '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: isToday ? 'rgba(245, 158, 11, 0.2)' : 'rgba(241, 245, 249, 0.8)', alignSelf: 'flex-start', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5)' }}>{d}</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
            {dayAppointments.map(apt => (
              <div key={apt.id} style={{ 
                fontSize: '0.75rem', padding: '0.4rem 0.6rem', 
                background: apt.status === 'confirmed' ? 'linear-gradient(90deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 100%)' : 'linear-gradient(90deg, rgba(192, 155, 90, 0.15) 0%, rgba(192, 155, 90, 0.05) 100%)', 
                color: apt.status === 'confirmed' ? '#047857' : '#92400e', 
                borderRadius: '8px', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', 
                borderLeft: `4px solid ${apt.status === 'confirmed' ? '#10b981' : '#C09B5A'}`, 
                display: 'flex', alignItems: 'center', gap: '6px', 
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                cursor: 'pointer'
              }} 
              onClick={(e) => { e.stopPropagation(); setSelectedEvent(apt); }}
              onMouseOver={e => { e.stopPropagation(); e.currentTarget.style.transform='translateX(6px)' }} 
              onMouseOut={e => { e.stopPropagation(); e.currentTarget.style.transform='none' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: apt.status === 'confirmed' ? '#10b981' : '#C09B5A', flexShrink: 0, boxShadow: `0 0 4px ${apt.status === 'confirmed' ? '#10b981' : '#C09B5A'}` }}></span>
                {new Date(apt.appointmentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return days;
  }

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsBooking(true)
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: user.id,
          service: aptForm.service || null,
          appointmentDate: new Date(aptForm.date).toISOString(),
          notes: aptForm.notes,
          status: 'pending'
        })
      })
      const data = await res.json()
      if (data.doc) {
        setAppointments(prev => [data.doc, ...prev].sort((a,b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime()))
        setAptForm({ service: '', date: '', notes: '' })
        showNotification('Appointment requested successfully! We will confirm shortly.', 'success')
        setIsAppointmentDrawerOpen(false)
      } else {
        showNotification('Failed to book appointment.', 'error')
      }
    } catch (err) {
      console.error(err)
      showNotification('An error occurred while booking.', 'error')
    } finally {
      setIsBooking(false)
    }
  }

  const toggleServiceSelection = (serviceId: string) => {
    setProfileForm(prev => {
      const current = prev.selectedServices
      if (current.includes(serviceId)) {
        return { ...prev, selectedServices: current.filter(id => id !== serviceId) }
      } else {
        return { ...prev, selectedServices: [...current, serviceId] }
      }
    })
  }

  const menuSections = [
    {
      title: 'MAIN',
      items: [
        { id: 'dashboard', label: 'Overview', icon: 'M4 6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm10 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V6zM4 16a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2zm10 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2z' },
        { id: 'services', label: 'My Services', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' },
        { id: 'appointments', label: 'Appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
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

  const activeLabel = menuSections.flatMap(s => s.items).find(i => i.id === activeTab)?.label || (activeTab === "profile" ? "My Profile" : "Dashboard")

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', backgroundColor: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed', top: '24px', right: '50%', transform: 'translateX(50%)', zIndex: 99999,
          background: notification.type === 'success' ? '#10b981' : '#ef4444',
          color: '#fff', padding: '12px 24px', borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '12px',
          fontWeight: '600', fontSize: '0.95rem', animation: 'slideDown 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          {notification.type === 'success' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          )}
          {notification.message}
        </div>
      )}


      <style>{`
        @keyframes goldShine {
          0% { transform: translateX(-150%) skewX(-25deg); opacity: 0; }
          20% { opacity: 0.7; }
          80% { opacity: 0.7; }
          100% { transform: translateX(250%) skewX(-25deg); opacity: 0; }
        }
        @keyframes royalPulse {
          0% { box-shadow: 0 0 0 0 rgba(192, 155, 90, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(192, 155, 90, 0); }
          100% { box-shadow: 0 0 0 0 rgba(192, 155, 90, 0); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideDown {
          from { transform: translate(50%, -100%); opacity: 0; }
          to { transform: translate(50%, 0); opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .royal-shine {
          position: relative;
          overflow: hidden;
        }
        .royal-shine::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(228, 200, 142, 0.5) 50%, rgba(255,255,255,0) 100%);
          transform: translateX(-150%) skewX(-25deg);
          pointer-events: none;
          z-index: 10;
        }
        .royal-shine:hover::after {
          animation: goldShine 0.8s ease-in-out;
        }
        .royal-glow:hover {
          animation: royalPulse 1.5s infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(241, 245, 249, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(192, 155, 90, 0.4);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(192, 155, 90, 0.7);
        }
      `}</style>

      
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
          zIndex: 100
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
            color: '#C09B5A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 20,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.borderColor = '#C09B5A' }}
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
                background: 'linear-gradient(135deg, #123B6D 0%, #071A3A 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '1.1rem', color: '#fff',
                boxShadow: '0 4px 12px rgba(7, 26, 58, 0.3)'
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
                      className="royal-shine"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                        gap: '0.85rem',
                        width: '100%',
                        padding: isCollapsed ? '0.85rem 0' : '0.85rem 1rem',
                        backgroundColor: isActive ? 'rgba(192, 155, 90, 0.1)' : 'transparent',
                        color: isActive ? '#C09B5A' : '#94a3b8',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.92rem',
                        fontWeight: isActive ? '700' : '500',
                        transition: 'all 0.2s ease',
                        boxShadow: isActive ? 'none' : 'none', borderLeft: isActive ? '3px solid #C09B5A' : '3px solid transparent',
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
                        borderLeft: '3px solid #C09B5A'
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
      <div className="custom-scrollbar" id="main-scroll-area" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
          <header style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', padding: '1.25rem 3rem', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
          
          {/* Left Side: Breadcrumb & Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: '500' }}>
              <span>Client Portal</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              <span style={{ color: '#C09B5A', fontWeight: '600' }}>{activeLabel}</span>
            </div>
            
            <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                placeholder="Search services, documents..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.25rem', borderRadius: '20px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s', color: '#0A111F' }}
                onFocus={e => { e.target.style.borderColor = '#C09B5A'; e.target.style.boxShadow = '0 0 0 3px rgba(192, 155, 90, 0.1)'; e.target.style.backgroundColor = '#fff' }}
                onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.backgroundColor = '#f8fafc' }}
              />
            </div>
          </div>

          {/* Right Side: Notifications & Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', color: '#64748b', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#C09B5A'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid #fff' }}></span>
            </button>

            <div style={{ width: '1px', height: '24px', backgroundColor: '#e2e8f0' }}></div>

            <div onClick={() => setActiveTab("profile")} className="royal-shine" style={{ color: "#64748b", fontSize: "0.95rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 1rem", borderRadius: "8px", transition: "background 0.2s", position: "relative", overflow: "hidden" }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
              title="Click to view/edit profile"
            >
              <div>Welcome back, <strong style={{ color: '#0f172a' }}>{user.name || 'Client'}</strong></div>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #123B6D 0%, #071A3A 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 2px 8px rgba(7, 26, 58, 0.3)' }}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'C'}
              </div>
            </div>
          </div>
        </header>

        <main style={{ padding: '1.5rem 3rem', flex: 1 }}>
          
                    {activeTab === 'profile' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
              <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '2rem' }}>Profile Information</h3>
                <form onSubmit={handleProfileUpdate}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Phone Number</label>
                      <input type="text" value={profileForm.phone} onChange={e => setProfileForm({...profileForm, phone: e.target.value})} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.95rem' }} placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>PAN Number</label>
                      <input type="text" value={profileForm.pan} onChange={e => setProfileForm({...profileForm, pan: e.target.value.toUpperCase()})} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.95rem' }} placeholder="ABCDE1234F" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Aadhaar Number</label>
                      <input type="text" value={profileForm.aadhaar} onChange={e => setProfileForm({...profileForm, aadhaar: e.target.value})} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.95rem' }} placeholder="1234 5678 9012" />
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '1.5rem' }}>Select Services</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                    {allServices.map(service => {
                      const isSelected = profileForm.selectedServices.includes(service.id)
                      return (
                        <div 
                          key={service.id}
                          onClick={() => toggleServiceSelection(service.id)}
                          style={{
                            padding: '1rem',
                            border: `1px solid ${isSelected ? '#C09B5A' : '#e2e8f0'}`, boxShadow: isSelected ? '0 4px 15px rgba(192, 155, 90, 0.15)' : 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                            backgroundColor: isSelected ? 'rgba(230, 106, 43, 0.05)' : '#fff',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: `2px solid ${isSelected ? '#C09B5A' : '#cbd5e1'}`, backgroundColor: isSelected ? '#C09B5A' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                            {isSelected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                          </div>
                          <div style={{ fontSize: '0.95rem', fontWeight: isSelected ? '700' : '500', color: isSelected ? '#0f172a' : '#475569', lineHeight: '1.4' }}>
                            {service.title}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <button type="submit" disabled={isUpdating} style={{ background: '#C09B5A', color: '#fff', padding: '0.875rem 2.5rem', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: isUpdating ? 'not-allowed' : 'pointer', fontSize: '1rem', boxShadow: '0 4px 14px rgba(230, 106, 43, 0.3)', opacity: isUpdating ? 0.7 : 1 }}>
                    {isUpdating ? 'Saving...' : 'Save Profile Details'}
                  </button>
                </form>
              </div>

              {/* Profile Completion Sidebar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.03)' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '1.5rem' }}>Profile Completion</h3>
                  
                  <div style={{ position: 'relative', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <svg viewBox="0 0 36 36" style={{ width: '140px', height: '140px' }}>
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={completionPercent === 100 ? '#10b981' : '#C09B5A'} strokeWidth="3" strokeDasharray={`${completionPercent}, 100`} style={{ transition: 'stroke-dasharray 1s ease-out' }} />
                    </svg>
                    <div style={{ position: 'absolute', fontSize: '1.75rem', fontWeight: '800', color: '#0f172a' }}>{completionPercent}%</div>
                  </div>

                  <p style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center', lineHeight: '1.5' }}>
                    {completionPercent === 100 ? 'Your profile is fully complete. Thank you!' : 'Complete your profile to unlock all features and seamless service delivery.'}
                  </p>
                </div>
                
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C09B5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>Why is this important?</h4>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.6' }}>
                    Providing your PAN and Aadhaar details ensures we comply with regulatory requirements for CA services and helps us fast-track your document processing.
                  </p>
                </div>
              </div>
            </div>
          )}
{activeTab === 'dashboard' && (() => {
            const userServicesIds = (user.clientServices || []).map((cs: any) => {
              const us = cs.service;
              return typeof us === 'string' ? us : us?.id;
            }).filter(Boolean);
            const userFullServices = allServices.filter(s => userServicesIds.includes(s.id));
            const totalRequiredDocs = userFullServices.reduce((sum, service) => sum + (service.requiredDocuments?.length || 0), 0);
            const uploadedDocsCount = 0; // Mocked for now until backend supports document tracking
            const pendingDocsCount = totalRequiredDocs - uploadedDocsCount;
            const docCompletionPercentage = totalRequiredDocs > 0 ? Math.round((uploadedDocsCount / totalRequiredDocs) * 100) : (userServicesIds.length > 0 ? 100 : 0);
            
            return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#334155', marginBottom: '1rem' }}>Active Engagements</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#C09B5A' }}>{userServicesIds.length}</div>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.4' }}>Projects currently in progress</p>
                </div>
              </div>

              <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#334155', marginBottom: '1rem' }}>Pending Documents</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a' }}>{pendingDocsCount}</div>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.4' }}>Files requiring your signature or upload</p>
                  </div>
                  {totalRequiredDocs > 0 && (
                    <div style={{ background: 'rgba(192, 155, 90, 0.1)', color: '#C09B5A', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: '700', fontSize: '0.85rem' }}>
                      {docCompletionPercentage}% Uploaded
                    </div>
                  )}
                </div>
              </div>

              <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.03)', gridColumn: '1 / -1' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#334155', marginBottom: '1rem' }}>Recent Activity</h3>
                {userServicesIds.length > 0 ? (
                  <p style={{ color: '#64748b', fontSize: '1rem' }}>You have <strong style={{ color: '#0f172a' }}>{pendingDocsCount} documents pending</strong> for your {userServicesIds.length} active service(s). Navigate to "My Services" to upload them.</p>
                ) : (
                  <p style={{ color: '#64748b', fontSize: '1rem' }}>No recent activity found for <strong style={{ color: '#0f172a' }}>{user.email}</strong>. Start by uploading a document or requesting a new service.</p>
                )}
              </div>
            </div>
            )
          })()}

          {activeTab === 'services' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {selectedServiceForDocs ? (
                (() => {
                  const clientServiceMatch = (user.clientServices || []).find((cs: any) => {
                    const us = cs.service;
                    return (typeof us === 'string' ? us : us?.id) === selectedServiceForDocs.id;
                  });
                  return (
                    <ServiceDocumentManager 
                      serviceTitle={selectedServiceForDocs.title} 
                      documents={selectedServiceForDocs.requiredDocuments || []} 
                      assignedProfessional={clientServiceMatch?.assignedProfessional}
                      onBack={() => setSelectedServiceForDocs(null)} 
                    />
                  );
                })()
              ) : (
                user.clientServices && user.clientServices.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {allServices
                      .filter(s => (user.clientServices || []).some((cs: any) => {
                         const us = cs.service;
                         return (typeof us === 'string' ? us : us?.id) === s.id;
                      }))
                      .filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || (s.summary && s.summary.toLowerCase().includes(searchQuery.toLowerCase())))
                      .map(service => (
                      <div key={service.id} style={{ background: "#fff", padding: "2.5rem 2rem", borderRadius: "16px", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.06)", border: "1px solid rgba(0, 0, 0, 0.04)", display: "flex", flexDirection: "column", height: "100%", position: "relative", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseOver={e => {e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 15px 50px -10px rgba(0,0,0,0.08)"}} onMouseOut={e => {e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 40px -10px rgba(0,0,0,0.06)"}}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#0A111F', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#C09B5A' }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0A111F', marginBottom: '0.75rem', letterSpacing: '-0.01em', lineHeight: '1.3' }}>{service.title}</h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6', flex: 1 }}>{service.summary}</p>
                        
                        <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500' }}>Active Service</span>
                          <button onClick={() => setSelectedServiceForDocs(service)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: "transparent", border: "none", color: "#C09B5A", fontWeight: "700", cursor: "pointer", transition: "all 0.2s", fontSize: "0.9rem", padding: 0 }} onMouseOver={e => {e.currentTarget.style.color = "#0A111F"; e.currentTarget.style.transform = "translateX(4px)"}} onMouseOut={e => {e.currentTarget.style.color = "#C09B5A"; e.currentTarget.style.transform = "none"}}>
                            View Details 
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ background: '#fff', padding: '4rem 2rem', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <svg style={{ margin: '0 auto 1.5rem', color: '#cbd5e1' }} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>No Services Requested</h3>
                    <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: '1.6' }}>You haven't enrolled in any Chartered Accountant services yet. Contact our team to begin your professional engagement.</p>
                    <button onClick={() => setActiveTab('profile')} className="royal-shine royal-glow" style={{ background: '#C09B5A', color: '#fff', padding: '0.875rem 2.5rem', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '1.05rem', boxShadow: '0 4px 14px rgba(192, 155, 90, 0.4)' }}>Request CA Service</button>
                  </div>
                )
              )}
            </div>
          )}

          {activeTab === 'appointments' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0A111F' }}>Your Schedule</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.25rem', borderRadius: '8px' }}>
                    <button onClick={() => setCalendarView('list')} style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', background: calendarView === 'list' ? '#fff' : 'transparent', color: calendarView === 'list' ? '#0f172a' : '#64748b', fontWeight: '600', cursor: 'pointer', boxShadow: calendarView === 'list' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s' }}>List</button>
                    <button onClick={() => setCalendarView('calendar')} style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', background: calendarView === 'calendar' ? '#fff' : 'transparent', color: calendarView === 'calendar' ? '#0f172a' : '#64748b', fontWeight: '600', cursor: 'pointer', boxShadow: calendarView === 'calendar' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s' }}>Calendar</button>
                  </div>
                  <button onClick={() => setIsAppointmentDrawerOpen(true)} className="royal-shine royal-glow" style={{ background: '#0A111F', color: '#fff', padding: '0.65rem 1.25rem', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(10, 17, 31, 0.3)', transition: 'all 0.3s' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add Appointment
                  </button>
                </div>
              </div>

              {calendarView === 'list' ? (
                appointments.length === 0 ? (
                  <div style={{ background: '#fff', padding: '3rem 2rem', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <svg style={{ margin: '0 auto 1rem', color: '#cbd5e1' }} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', fontWeight: '500' }}>No upcoming appointments scheduled.</p>
                  </div>
                ) : (
                  <div className="custom-scrollbar" style={{ display: 'block', overflowY: 'auto', height: '500px', overscrollBehavior: 'contain', paddingRight: '0.5rem', paddingBottom: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {appointments.map(apt => (
                      <div key={apt.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0', borderLeft: apt.status === 'confirmed' ? '4px solid #10b981' : '4px solid #C09B5A', transition: 'transform 0.2s, box-shadow 0.2s' }} onMouseOver={e => {e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.05)'}} onMouseOut={e => {e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                          <div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              {new Date(apt.appointmentDate).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                            </div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0A111F' }}>{apt.service ? (typeof apt.service === 'string' ? 'Service Consultation' : apt.service.title) : 'General Discussion'}</div>
                          </div>
                          <div style={{ display: 'inline-block', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', background: apt.status === 'confirmed' ? 'rgba(16,185,129,0.1)' : apt.status === 'completed' ? 'rgba(59,130,246,0.1)' : apt.status === 'cancelled' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)', color: apt.status === 'confirmed' ? '#10b981' : apt.status === 'completed' ? '#3b82f6' : apt.status === 'cancelled' ? '#ef4444' : '#f59e0b' }}>
                            {apt.status}
                          </div>
                        </div>
                        {apt.notes && <p style={{ marginTop: '1rem', color: '#475569', fontSize: '0.9rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #f1f5f9' }}>{apt.notes}</p>}
                      </div>
                    ))}
                    </div>
                  </div>
                )
              ) : (
                <div style={{ background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '24px', padding: '1.5rem', overflow: 'hidden', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.5)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem 1.5rem 1rem', borderBottom: '2px solid rgba(0,0,0,0.03)' }}>
                    <h4 style={{ fontWeight: '800', color: '#0f172a', margin: 0, fontSize: '1.4rem', textShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                      <span style={{ color: '#C09B5A' }}>{currentMonth.toLocaleString('default', { month: 'long' })}</span> {currentMonth.getFullYear()}
                    </h4>
                    <div style={{ display: 'flex', gap: '0.75rem', background: '#fff', padding: '0.35rem', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05), inset 0 2px 4px rgba(255,255,255,0.5)' }}>
                      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} style={{ padding: '0.5rem', background: '#f8fafc', borderRadius: '8px', border: 'none', cursor: 'pointer', color: '#475569', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.background = '#C09B5A'; e.currentTarget.style.color = '#fff'}} onMouseOut={e => {e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#475569'}}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                      </button>
                      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} style={{ padding: '0.5rem', background: '#f8fafc', borderRadius: '8px', border: 'none', cursor: 'pointer', color: '#475569', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.background = '#C09B5A'; e.currentTarget.style.color = '#fff'}} onMouseOut={e => {e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#475569'}}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </button>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem', textAlign: 'center', padding: '1.5rem 0 1rem 0' }}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => <div key={day} style={{ fontSize: '0.85rem', fontWeight: '800', color: idx === 0 || idx === 6 ? '#C09B5A' : '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{day}</div>)}
                  </div>
                  <div className="custom-scrollbar" style={{ display: 'block', overflowY: 'auto', height: '500px', overscrollBehavior: 'contain', paddingRight: '0.5rem', paddingBottom: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem' }}>
                      {renderCalendar()}
                    </div>
                  </div>
                </div>
              )}

              {/* Event Details Popup */}
              {selectedEvent && (
                <>
                  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 100002 }} onClick={() => setSelectedEvent(null)}></div>
                  <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', borderRadius: '16px', padding: '2.5rem', zIndex: 100003, width: '450px', maxWidth: '90vw', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', animation: 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800', color: '#0f172a' }}>Meeting Details</h3>
                      <button onClick={() => setSelectedEvent(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.backgroundColor = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'}} onMouseOut={e => {e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#64748b'}}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    </div>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Date & Time</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0f172a' }}>
                        {new Date(selectedEvent.appointmentDate).toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Service / Context</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0f172a' }}>
                        {selectedEvent.service ? (typeof selectedEvent.service === 'string' ? 'Service Consultation' : selectedEvent.service.title) : 'General Discussion'}
                      </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Status</div>
                      <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', background: selectedEvent.status === 'confirmed' ? 'rgba(16,185,129,0.15)' : selectedEvent.status === 'completed' ? 'rgba(59,130,246,0.15)' : selectedEvent.status === 'cancelled' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)', color: selectedEvent.status === 'confirmed' ? '#047857' : selectedEvent.status === 'completed' ? '#1d4ed8' : selectedEvent.status === 'cancelled' ? '#b91c1c' : '#b45309' }}>
                        {selectedEvent.status}
                      </div>
                    </div>

                    {selectedEvent.notes && (
                      <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>NOTES</div>
                        <p style={{ margin: 0, color: '#334155', fontSize: '0.95rem', lineHeight: '1.5' }}>{selectedEvent.notes}</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Right Side Drawer for Add Appointment */}
              {isAppointmentDrawerOpen && (
                <>
                  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 10000 }} onClick={() => setIsAppointmentDrawerOpen(false)}></div>
                  <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '450px', maxWidth: '100vw', backgroundColor: '#fff', zIndex: 10001, boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', animation: 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                    <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0A111F', margin: 0 }}>Schedule Appointment</h3>
                      <button onClick={() => setIsAppointmentDrawerOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: '50%', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.backgroundColor = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'}} onMouseOut={e => {e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#64748b'}}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    </div>
                    <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>Request a dedicated slot to discuss your services with our team.</p>
                      <form onSubmit={handleBookAppointment}>
                        <div style={{ marginBottom: '1.5rem' }}>
                          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Service Context (Optional)</label>
                          <select value={aptForm.service} onChange={e => setAptForm({...aptForm, service: e.target.value})} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', backgroundColor: '#f8fafc', transition: 'all 0.2s' }} onFocus={e => {e.currentTarget.style.borderColor='#C09B5A'; e.currentTarget.style.backgroundColor='#fff'}}>
                            <option value="">General Discussion</option>
                            {allServices.filter(s => (user.selectedServices || []).some((us: any) => (typeof us === 'string' ? us : us.id) === s.id)).map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                          </select>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Preferred Date & Time</label>
                          <input type="datetime-local" required value={aptForm.date} onChange={e => setAptForm({...aptForm, date: e.target.value})} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontFamily: 'inherit', backgroundColor: '#f8fafc', transition: 'all 0.2s' }} onFocus={e => {e.currentTarget.style.borderColor='#C09B5A'; e.currentTarget.style.backgroundColor='#fff'}} />
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Agenda / Notes</label>
                          <textarea rows={5} value={aptForm.notes} onChange={e => setAptForm({...aptForm, notes: e.target.value})} placeholder="What would you like to discuss?" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', resize: 'none', fontFamily: 'inherit', backgroundColor: '#f8fafc', transition: 'all 0.2s' }} onFocus={e => {e.currentTarget.style.borderColor='#C09B5A'; e.currentTarget.style.backgroundColor='#fff'}}></textarea>
                        </div>
                        <button type="submit" disabled={isBooking} className="royal-shine royal-glow" style={{ background: '#0A111F', color: '#fff', padding: '1rem', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: isBooking ? 'not-allowed' : 'pointer', fontSize: '1rem', width: '100%', opacity: isBooking ? 0.7 : 1, transition: 'all 0.3s', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                          {isBooking ? (
                            <>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                              Scheduling...
                            </>
                          ) : 'Request Appointment'}
                        </button>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.03)' }}>
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
    </div>
  )
}
