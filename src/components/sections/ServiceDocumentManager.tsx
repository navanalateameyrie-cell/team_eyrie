'use client'

import React, { useState } from 'react'

interface ServiceDocumentManagerProps {
  serviceTitle: string
  documents: { documentName: string }[]
  assignedProfessional?: any
  onBack: () => void
}

export default function ServiceDocumentManager({ serviceTitle, documents, assignedProfessional, onBack }: ServiceDocumentManagerProps) {
  const requiredDocs = documents?.map(d => d.documentName) || []
  
  const [uploadedDocs, setUploadedDocs] = useState<Record<number, boolean>>({})
  const [uploading, setUploading] = useState<number | null>(null)

  const handleUploadClick = (index: number) => {
    // Simulate an upload process
    setUploading(index)
    setTimeout(() => {
      setUploadedDocs(prev => ({ ...prev, [index]: true }))
      setUploading(null)
    }, 1500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'fadeIn 0.3s ease' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <button 
          onClick={onBack}
          style={{ 
            width: '40px', height: '40px', borderRadius: '50%', background: '#f8fafc', border: '1px solid rgba(0,0,0,0.05)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s',
            color: '#0A111F'
          }}
          onMouseOver={e => { e.currentTarget.style.background = '#C09B5A'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#C09B5A' }}
          onMouseOut={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#0A111F'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0A111F', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>{serviceTitle}</h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Service Engagement Details & Document Requirements</p>
        </div>
      </div>

      {/* Assigned Professional Profile Card */}
      <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fcfbf9 100%)', borderRadius: '16px', padding: '1.5rem 2rem', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', border: '1px solid rgba(192, 155, 90, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #0A111F 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C09B5A', fontSize: '1.5rem', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(10, 17, 31, 0.2)' }}>
            {assignedProfessional?.name ? assignedProfessional.name.charAt(0).toUpperCase() : 'T'}
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700', marginBottom: '0.25rem' }}>Your Assigned Professional</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0A111F' }}>
              {assignedProfessional?.name || 'Team Eyrie Expert'}
            </div>
            {assignedProfessional?.email && (
              <div style={{ fontSize: '0.9rem', color: '#475569', marginTop: '0.25rem' }}>{assignedProfessional.email}</div>
            )}
          </div>
        </div>
        <div>
          <button className="royal-shine royal-glow" style={{ background: '#C09B5A', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(192, 155, 90, 0.3)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Contact Now
          </button>
        </div>
      </div>

      {requiredDocs.length === 0 ? (
        <div style={{ background: '#fff', padding: '4rem 2rem', borderRadius: '16px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.03)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0A111F', marginBottom: '1rem' }}>No specific documents mapped</h3>
          <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto' }}>Your dedicated professional will contact you if any specific documents are required for this engagement.</p>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', border: '1px solid rgba(192, 155, 90, 0.15)', overflow: 'hidden' }}>
          <div style={{ padding: '2rem', borderBottom: '1px solid rgba(192, 155, 90, 0.15)', background: 'linear-gradient(to right, rgba(192, 155, 90, 0.05), transparent)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0A111F', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C09B5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
              Required Documentation
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Please upload the following documents to initiate your engagement.</p>
          </div>
          
          <div style={{ padding: '1rem' }}>
            {requiredDocs.map((doc, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1rem', borderBottom: idx === requiredDocs.length - 1 ? 'none' : '1px solid #f1f5f9', gap: '1rem', transition: 'background 0.2s', borderRadius: '8px' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: uploadedDocs[idx] ? '#10b981' : '#f1f5f9', color: uploadedDocs[idx] ? '#fff' : '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}>
                    {uploadedDocs[idx] ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                      <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>{idx + 1}</span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.95rem', color: uploadedDocs[idx] ? '#475569' : '#0A111F', fontWeight: '500', lineHeight: '1.4' }}>{doc}</span>
                </div>
                
                {uploadedDocs[idx] ? (
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '0.4rem 0.75rem', borderRadius: '20px' }}>Uploaded</span>
                ) : (
                  <button 
                    onClick={() => handleUploadClick(idx)}
                    disabled={uploading === idx}
                    className="royal-shine royal-glow"
                    style={{ 
                      flexShrink: 0, padding: '0.5rem 1.25rem', background: '#C09B5A', color: '#fff', borderRadius: '6px', border: 'none', 
                      fontSize: '0.85rem', fontWeight: '600', cursor: uploading === idx ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: uploading === idx ? 0.7 : 1
                    }}
                  >
                    {uploading === idx ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        Upload
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
