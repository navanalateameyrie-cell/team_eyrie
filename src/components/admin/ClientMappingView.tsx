'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@payloadcms/ui'
import Link from 'next/link'

import { AdminSidebar } from './AdminSidebar'

export default function ClientMappingView() {
  const { user } = useAuth()
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return;
    const isStaff = user?.role === 'staff' && user?.email !== 'tedev@gmail.com' && user?.email !== 'admin@teameyrie.local'
    
    // Fetch users who are clients and have clientServices
    fetch('/api/users?where[role][equals]=client&depth=2&limit=100')
      .then(res => res.json())
      .then(data => {
        let clientsWithServices = (data.docs || []).map((c: any) => {
          if (isStaff) {
             const filteredServices = c.clientServices?.filter((cs: any) => {
               const staffId = typeof cs.assignedProfessional === 'object' ? cs.assignedProfessional?.id : cs.assignedProfessional;
               return staffId === user.id;
             }) || [];
             return { ...c, clientServices: filteredServices };
          }
          return c;
        }).filter((c: any) => c.clientServices && c.clientServices.length > 0)
        
        setClients(clientsWithServices)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user])

  if (!user) return null

  return (
    <div className="payload-default" style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <AdminSidebar />
      <main className="payload-default__main" style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div className="dashboard__wrap" style={{ maxWidth: '1000px', margin: '0 auto', minHeight: 'calc(100vh - 120px)' }}>
          <header className="doc-header" style={{ marginBottom: '30px' }}>
            <h1 style={{ marginBottom: '8px' }}>Client & Staff Mapping</h1>
            <p style={{ color: '#64748b' }}>Overview of which staff members are assigned to which clients.</p>
          </header>

          {loading ? (
            <div style={{ padding: '20px', color: '#64748b' }}>Loading mapping data...</div>
          ) : clients.length === 0 ? (
            <div className="card" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              No clients have been assigned services or staff yet.
            </div>
          ) : (
            <table className="table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Client Name</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Service Engagement</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Assigned Staff</th>
                  <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  client.clientServices.map((cs: any, idx: number) => {
                    const serviceTitle = typeof cs.service === 'object' ? cs.service?.title : 'Unknown Service'
                    const staffName = typeof cs.assignedProfessional === 'object' ? cs.assignedProfessional?.name : 'Unassigned'
                    
                    return (
                      <tr key={`${client.id}-${idx}`} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '16px', fontWeight: 600, color: '#1f3864' }}>{client.name || 'Unnamed Client'}</td>
                        <td style={{ padding: '16px' }}>{serviceTitle}</td>
                        <td style={{ padding: '16px' }}>
                          {cs.assignedProfessional ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '6px 12px', borderRadius: '20px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: 600, color: '#b08d57' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                              {staffName}
                            </span>
                          ) : (
                            <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Unassigned</span>
                          )}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          <Link href={`/admin/collections/users/${client.id}`} className="btn--style-secondary" style={{ fontSize: '13px', padding: '6px 12px' }}>
                            Manage
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}
