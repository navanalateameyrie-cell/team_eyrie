import React from 'react'

export default function Loading() {
  return (
    <div className="eyrie-loader-overlay" aria-live="polite" aria-busy="true">
      {/* Soft radiant ambient aura matching reference */}
      <div className="eyrie-loader-aura" />

      {/* Center Brand Group */}
      <div className="eyrie-loader-center">
        <div className="eyrie-loader-emblem-wrap">
          <img
            src="/emblem_transparent.png"
            alt="Team Eyrie Emblem"
            className="eyrie-loader-emblem"
          />
          {/* Subtle gold diamond glint sparkle */}
          <span className="eyrie-loader-sparkle" aria-hidden="true">
            ✦
          </span>
        </div>

        <div className="eyrie-loader-brand">
          <h2 className="eyrie-loader-title">TEAM EYRIE</h2>
          <p className="eyrie-loader-tagline">ELEVATE. COLLABORATE. EXCEL.</p>
        </div>
      </div>

      {/* Bottom 3-Dot Synchronized Loader matching reference */}
      <div className="eyrie-loader-dots" aria-label="Loading page...">
        <span className="eyrie-dot eyrie-dot-1" />
        <span className="eyrie-dot eyrie-dot-2" />
        <span className="eyrie-dot eyrie-dot-3" />
      </div>
    </div>
  )
}

