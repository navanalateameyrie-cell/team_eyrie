import React from 'react'

export const Icon = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    minWidth: '150px'
  }}>
    <img 
      src="/logo.png" 
      alt="Team Eyrie Icon" 
      style={{
        maxWidth: '100%',
        height: 'auto',
        maxHeight: '48px',
        objectFit: 'contain',
        objectPosition: 'left center'
      }}
    />
  </div>
)
