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
            <a href="/careers">Careers</a>
            <a href="/gallery">Gallery</a>
          </div>

          <div>
            <h4>Our Presence</h4>
            <p style={{ margin: '0 0 10px' }}>
              {offices.map((o) => o.city).join(' • ')}
            </p>
            {contact.phone && <a href={`tel:${contact.phone}`}>📞 {contact.phone}</a>}
            {contact.email && <a href={`mailto:${contact.email}`}>✉️ {contact.email}</a>}
            <a href="/contact">Contact Us →</a>
            <a href="tel:+918618259712" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>📞 8618259712</a>
            <a href="tel:+919845721255" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>📞 9845721255</a>
            {(social.linkedin || social.twitter || social.facebook) && (
              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                {social.linkedin && <a href={social.linkedin}>LinkedIn</a>}
                {social.twitter && <a href={social.twitter}>Twitter</a>}
                {social.facebook && <a href={social.facebook}>Facebook</a>}
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-bottom__left">© {year} Team Eyrie. All rights reserved.</span>
          <span className="footer-bottom__center">Together, We Create Value. Together, We Build Trust.</span>
          <span className="footer-bottom__right">
            Designed and Managed by <a href="https://www.navanalatech.com/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline', padding: 0 }}>NavaNala Technologies</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
