import React from 'react'

export const Logo = () => (
  <div className="custom-logo" style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center',
    padding: '4px 0'
  }}>
    <img 
      src="/logo.png" 
      alt="Team Eyrie Logo" 
      style={{
        maxWidth: '100%',
        maxHeight: '44px',
        objectFit: 'contain',
        objectPosition: 'left center'
      }}
    />
  </div>
)
