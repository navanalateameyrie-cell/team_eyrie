import React from 'react'

export const Icon = () => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'auto',
      height: 'auto',
    }}
  >
    <img
      src="/logo-trimmed.png"
      alt="Team Eyrie"
      style={{
        display: 'block',
        height: '28px',
        maxHeight: '28px',
        width: 'auto',
        maxWidth: 'none',
        objectFit: 'contain',
      }}
    />
  </div>
)
