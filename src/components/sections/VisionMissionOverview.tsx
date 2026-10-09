import React from 'react'

export default function VisionMissionOverview() {
  return (
    <section
      className="vision-mission-overview-section"
      style={{
        padding: '52px 0 44px',
        background: '#ffffff',
        borderTop: '1px solid rgba(148, 163, 184, 0.25)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 36px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(29, 78, 216, 0.08)',
              color: '#1d4ed8',
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 2,
              padding: '5px 14px',
              borderRadius: 20,
              border: '1px solid rgba(29, 78, 216, 0.2)',
              marginBottom: 10,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f26522', boxShadow: '0 0 6px #f26522' }} />
            Foundational Purpose
          </span>
          <h2
            style={{
              fontSize: 'clamp(26px, 2.5vw, 36px)',
              color: '#0f172a',
              margin: '0 0 10px',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              lineHeight: 1.25,
            }}
          >
            Empowering Enterprise Growth Through Integrity &amp; Technical Mastery
          </h2>
          <p
            style={{
              color: '#475569',
              fontSize: 15,
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 720,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Built on the bedrock of three esteemed Chartered Accountancy partnerships, our mission and vision unite traditional fiduciary ethics with modern strategic scale.
          </p>
        </div>

        {/* Vision & Mission Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 28,
            alignItems: 'stretch',
          }}
        >
          {/* ── OUR VISION CARD (Royal Blue Vibrant Theme Panel) ── */}
          <div
            className="vision-card-interactive"
            style={{
              background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 45%, #172554 100%)',
              color: '#ffffff',
              borderRadius: 20,
              padding: '38px 32px 32px',
              boxShadow: '0 16px 40px rgba(29, 78, 216, 0.28)',
              border: '1.5px solid rgba(255, 255, 255, 0.16)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Ambient Radial Accent Glow */}
            <div
              style={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(242, 101, 34, 0.25) 0%, rgba(29, 78, 216, 0) 70%)',
                pointerEvents: 'none',
              }}
            />

            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)',
                  padding: '5px 14px',
                  borderRadius: 20,
                  fontSize: 11.5,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  marginBottom: 18,
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#f26522', boxShadow: '0 0 8px #f26522' }} />
                Our Vision
              </div>

              <h3
                style={{
                  fontSize: 'clamp(22px, 2.1vw, 28px)',
                  fontWeight: 800,
                  margin: '0 0 14px',
                  color: '#ffffff',
                  lineHeight: 1.3,
                  letterSpacing: '-0.3px',
                }}
              >
                To Be India’s Most Trusted &amp; Technically Formidable Professional Services Network
              </h3>

              <p
                style={{
                  fontSize: 14.5,
                  color: '#e2e8f0',
                  lineHeight: 1.65,
                  margin: '0 0 24px',
                  fontWeight: 400,
                }}
              >
                To establish Team Eyrie as India’s foremost integrated multidisciplinary network—celebrated by enterprises, regulatory authorities, and the profession for uncompromising independence, technical mastery, and strategic value creation.
              </p>
            </div>

            {/* Vision Pillars Checklist */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: 20, marginTop: 'auto' }}>
              <div
                style={{
                  fontSize: 11.5,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: 1.2,
                  color: '#f26522',
                  marginBottom: 12,
                }}
              >
                Vision Pillars
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 10,
                  fontSize: 13.5,
                  color: '#E2E8F0',
                  fontWeight: 500,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#f26522', fontWeight: 800 }}>✓</span>
                  <span>National Scale with Local Care</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#f26522', fontWeight: 800 }}>✓</span>
                  <span>Tech-Enabled Compliance</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#f26522', fontWeight: 800 }}>✓</span>
                  <span>High-Trust Fiduciary Standard</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#f26522', fontWeight: 800 }}>✓</span>
                  <span>Sustainable Enterprise Growth</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── OUR MISSION CARD (Classic White Institutional Panel) ── */}
          <div
            className="mission-card-interactive"
            style={{
              background: '#ffffff',
              border: '1.5px solid rgba(148, 163, 184, 0.45)',
              borderTop: '5px solid #1d4ed8',
              borderRadius: 20,
              padding: '38px 32px 32px',
              boxShadow: '0 14px 36px rgba(15, 42, 74, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(29, 78, 216, 0.08)',
                  padding: '5px 14px',
                  borderRadius: 20,
                  fontSize: 11.5,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: '#1d4ed8',
                  marginBottom: 18,
                  border: '1px solid rgba(29, 78, 216, 0.2)',
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#1d4ed8' }} />
                Our Mission
              </div>

              <h3
                style={{
                  fontSize: 'clamp(22px, 2.1vw, 28px)',
                  fontWeight: 800,
                  margin: '0 0 14px',
                  color: '#0f172a',
                  lineHeight: 1.3,
                  letterSpacing: '-0.3px',
                }}
              >
                Transforming Regulatory Complexity into Strategic Confidence
              </h3>

              <p
                style={{
                  fontSize: 14.5,
                  color: '#475569',
                  lineHeight: 1.65,
                  margin: '0 0 24px',
                  fontWeight: 400,
                }}
              >
                To deliver world-class professional assurance, tax jurisprudence, and transactional advisory by fusing decades of specialized legacy expertise with modern collaborative technology—enabling clients to navigate evolving economic frontiers with complete certainty.
              </p>
            </div>

            {/* Mission Execution Checklist */}
            <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.25)', paddingTop: 20, marginTop: 'auto' }}>
              <div
                style={{
                  fontSize: 11.5,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: 1.2,
                  color: '#1d4ed8',
                  marginBottom: 12,
                }}
              >
                Mission Execution
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 10,
                  fontSize: 13.5,
                  color: '#334155',
                  fontWeight: 500,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#f26522', fontWeight: 800 }}>✓</span>
                  <span>Defensible Statutory Counsel</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#f26522', fontWeight: 800 }}>✓</span>
                  <span>Partner-Led Accountability</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#f26522', fontWeight: 800 }}>✓</span>
                  <span>Seamless Single-Window Service</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#f26522', fontWeight: 800 }}>✓</span>
                  <span>Developing Top Tier CA Talent</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Link to Full Institutional Charter */}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <a
            href="/vision-mission"
            style={{
              color: '#1d4ed8',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 22px',
              borderRadius: 24,
              background: 'rgba(29, 78, 216, 0.08)',
              border: '1px solid rgba(29, 78, 216, 0.2)',
              transition: 'all 0.25s ease',
            }}
          >
            <span>Explore Full Institutional Charter &amp; Core Values</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

