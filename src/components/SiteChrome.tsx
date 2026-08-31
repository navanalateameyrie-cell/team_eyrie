import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import SiteHeader from './SiteHeader'

import TeamEyrieCaLogo from './TeamEyrieCaLogo'
import { defaultLocale, localizePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

type Office = {
  city: string
  addressLine1?: string | null
  phone?: string | null
  email?: string | null
}

async function getChromeData(locale: Locale) {
  try {
    const payload = await getPayload({ config })
    // `locale` selects the translated values; `fallbackLocale` fills in English
    // wherever a translation has not been written yet.
    const [services, offices, settings] = await Promise.all([
      payload.find({
        collection: 'services',
        limit: 12,
        sort: 'order',
        depth: 0,
        locale,
        fallbackLocale: defaultLocale,
      }),
      payload.find({ collection: 'offices', limit: 20, sort: 'order', depth: 0 }),
      payload
        .findGlobal({ slug: 'site-settings', depth: 1, locale, fallbackLocale: defaultLocale })
        .catch(() => null),
    ])
    return {
      services: services.docs.map((s: any) => ({ title: s.title, slug: s.slug, summary: s.summary })),
      offices: offices.docs as Office[],
      settings,
    }
  } catch {
    return { services: [], offices: [] as Office[], settings: null as any }
  }
}

export async function SiteHeaderServer({ locale = defaultLocale }: { locale?: Locale }) {
  const { services, settings } = await getChromeData(locale)
  const dict = getDictionary(locale)
  const logoUrl =
    typeof settings?.logo === 'object' && settings?.logo?.url ? settings.logo.url : null

  return (
    <SiteHeader
      orgName={settings?.organizationName || 'Team Eyrie'}
      services={services}
      contact={settings?.contact}
      logoUrl={logoUrl}
      locale={locale}
      dict={dict}
    />
  )
}

export async function SiteFooter({ locale = defaultLocale }: { locale?: Locale }) {
  const { services, offices, settings } = await getChromeData(locale)
  const dict = getDictionary(locale)
  const year = new Date().getFullYear()
  const contact = settings?.contact || {}
  const social = settings?.social || {}
  const logoUrl =
    typeof settings?.logo === 'object' && settings?.logo?.url ? settings.logo.url : null
  const href = (path: string) => localizePath(path, locale)

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ marginBottom: 16 }}>
              <a href={href('/')} style={{ textDecoration: 'none' }}>
                <TeamEyrieCaLogo height={48} lightMode={true} customLogoUrl={logoUrl} />
              </a>
            </div>
            <p style={{ margin: 0, maxWidth: 320 }}>
              {settings?.tagline || 'Together, We Create Value. Together, We Build Trust.'}
            </p>
            <p style={{ marginTop: 14 }}>{dict.footer.blurb}</p>
          </div>

          <div>
            <h4>{dict.footer.services}</h4>
            {services.slice(0, 8).map((s) => (
              <a key={s.slug} href={href(`/services/${s.slug}`)}>
                {s.title}
              </a>
            ))}
          </div>

          <div>
            <h4>{dict.footer.company}</h4>
            <a href={href('/about')}>{dict.footer.about}</a>
            <a href={href('/vision-mission')}>{dict.footer.visionMission}</a>
            <a href={href('/why-team-eyrie')}>{dict.footer.why}</a>
            <a href={href('/industries')}>{dict.footer.industries}</a>
            <a href={href('/people')}>{dict.footer.people}</a>
            <a href={href('/insights')}>{dict.footer.insights}</a>
            <a href={href('/careers')}>{dict.footer.careers}</a>
          </div>

          <div>
            <h4>{dict.footer.presence}</h4>
            <p style={{ margin: '0 0 10px' }}>
              {offices.map((o) => o.city).join(' • ')}
            </p>
            {contact.phone && <a href={`tel:${contact.phone}`}>📞 {contact.phone}</a>}
            {contact.email && <a href={`mailto:${contact.email}`}>✉️ {contact.email}</a>}
            <a href={href('/contact')}>{dict.footer.contactUs} →</a>
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
          <span className="footer-bottom__left">© {year} Team Eyrie. {dict.footer.rights}</span>
          <span className="footer-bottom__center">{dict.footer.motto}</span>
          <span className="footer-bottom__right">
            {dict.footer.designedBy} <a href="https://www.navanalatech.com/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline', padding: 0 }}>NavaNala Technologies</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
