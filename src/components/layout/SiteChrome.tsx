import React, { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import SiteHeader from './SiteHeader'
import TeamEyrieCaLogo from '@/components/ui/TeamEyrieCaLogo'
import AccessibilityWidget from '@/components/accessibility'
import Chatbot from '@/components/chatbot/Chatbot'

type Office = {
  city: string
  addressLine1?: string | null
  phone?: string | null
  email?: string | null
}

const getChromeData = cache(async () => {
  try {
    const payload = await getPayload({ config })
    const [services, offices, settings] = await Promise.all([
      payload.find({ collection: 'services', limit: 12, sort: 'order', depth: 0 }).catch(() => ({ docs: [] })),
      payload.find({ collection: 'offices', limit: 20, sort: 'order', depth: 0 }).catch(() => ({ docs: [] })),
      payload.findGlobal({ slug: 'site-settings', depth: 1 }).catch(() => null),
    ])

    return {
      services: (services?.docs || []).map((s: any) => ({ title: s.title, slug: s.slug, summary: s.summary })),
      offices: (offices?.docs || []) as Office[],
      settings: settings || null,
    }
  } catch {
    return { services: [], offices: [] as Office[], settings: null }
  }
})

export async function SiteWidgetsServer() {
  const { settings } = await getChromeData()
  const showAccessibility = (settings as any)?.features?.enableAccessibilityWidget ?? true
  const showChatbot = (settings as any)?.features?.enableChatbot ?? true

  return (
    <>
      {showAccessibility && <AccessibilityWidget position="bottom-left" />}
      {showChatbot && <Chatbot />}
    </>
  )
}

export async function SiteHeaderServer() {
  const { services, settings } = await getChromeData()
  const logoUrl =
    typeof settings?.logo === 'object' && settings?.logo?.url ? settings.logo.url : null

  return (
    <SiteHeader
      orgName={settings?.organizationName || 'Team Eyrie'}
      services={services}
      contact={settings?.contact}
      logoUrl={logoUrl}
    />
  )
}

export async function SiteFooter() {
  const { services, offices, settings } = await getChromeData()
  const year = new Date().getFullYear()
  const contact = settings?.contact || {}
  const social = settings?.social || {}
  const logoUrl =
    typeof settings?.logo === 'object' && settings?.logo?.url ? settings.logo.url : null

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ marginBottom: 16 }}>
              <a href="/" style={{ textDecoration: 'none' }}>
                <TeamEyrieCaLogo height={48} lightMode={true} customLogoUrl={logoUrl} />
              </a>
            </div>
            <p style={{ margin: 0, maxWidth: 320 }}>
              {settings?.tagline || 'Together, We Create Value. Together, We Build Trust.'}
            </p>
            <p style={{ marginTop: 14 }}>
              An integrated network of independent chartered accountants, tax advisors, and corporate strategists delivering excellence across India.
            </p>
          </div>

          <div>
            <h4>Practice Areas</h4>
            {services.slice(0, 8).map((s) => (
              <a key={s.slug} href={`/services/${s.slug}`}>
                {s.title}
              </a>
            ))}
          </div>

          <div>
            <h4>Company</h4>
            <a href="/about">About Us</a>
            <a href="/vision-mission">Vision &amp; Mission</a>
            <a href="/why-team-eyrie">Why Team Eyrie</a>
            <a href="/industries">Industries</a>
            <a href="/people">Our People</a>
            <a href="/insights">Insights &amp; Updates</a>
            <a href="/knowledge-bank">Knowledge Bank</a>
            <a href="/careers">Careers</a>
            <a href="/gallery">Gallery</a>
          </div>

          <div>
            <h4>Our Presence</h4>
            <p style={{ margin: '0 0 10px' }}>
              {offices.map((o) => o.city).join(' • ')}
            </p>
            <a href="/contact">Contact Us →</a>
            {contact.phone && <a href={`tel:${contact.phone}`}>📞 {contact.phone}</a>}
            <a href="tel:+919845721255">📞 +91 9845721255</a>
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0 }}
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {contact.email}
              </a>
            )}
            {(social.linkedin || social.twitter || social.facebook) && (
              <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                {social.linkedin && (
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" style={{ display: 'inline-flex', padding: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {social.twitter && (
                  <a href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" title="Twitter / X" style={{ display: 'inline-flex', padding: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
                    </svg>
                  </a>
                )}
                {social.facebook && (
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook" style={{ display: 'inline-flex', padding: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-bottom__left">© {year} Team Eyrie. All rights reserved.</span>
          <span className="footer-bottom__center">Together, We Create Value. Together, We Build Trust.</span>
          <span className="footer-bottom__right">
            Designed and Managed by <a href="https://www.navanalatech.com/?source=casalem" target="_blank" rel="noopener noreferrer" style={{ display: 'inline', padding: 0 }}>NavaNala Technologies</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
