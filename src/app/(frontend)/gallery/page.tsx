import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/layout/PageHero'
import SectionHeader from '@/components/layout/SectionHeader'
import CtaBanner from '@/components/layout/CtaBanner'
import GalleryView, { type GalleryItem } from '@/components/gallery/GalleryView'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Photo & Media Gallery — Team Eyrie | Moments & Milestones',
  description:
    'Explore conferences, leadership summits, firm celebrations, and our state-of-the-art office infrastructure across India.',
}

const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'def-1',
    title: 'National Leadership & Strategy Summit',
    category: 'conferences',
    imageUrl: '/images/indian-ca-boardroom.png',
    images: [
      '/images/indian-ca-boardroom.png',
      '/images/indian-business-bkc.png',
      '/images/indian-advisory-team.png',
      '/hero/hero-1.png',
    ],
    location: 'Mumbai (BKC)',
    date: '2026',
    caption: 'Founding partners and practice heads convening for the annual strategic road-mapping conclave.',
  },
  {
    id: 'def-2',
    title: 'Corporate Financial Advisory & Governance Conclave',
    category: 'conferences',
    imageUrl: '/images/indian-business-bkc.png',
    images: [
      '/images/indian-business-bkc.png',
      '/images/indian-ca-boardroom.png',
      '/hero/hero-2.png',
    ],
    location: 'New Delhi',
    date: '2026',
    caption: 'Keynote panels and technical deliberations on cross-border tax jurisprudence and MCA regulatory shifts.',
  },
  {
    id: 'def-3',
    title: 'Multi-Discipline Advisory Group & Senior Associates',
    category: 'team',
    imageUrl: '/images/indian-advisory-team.png',
    images: [
      '/images/indian-advisory-team.png',
      '/images/Aboutus.png',
      '/images/Why.png',
    ],
    location: 'Bengaluru',
    date: '2026',
    caption: 'Our multidisciplinary talent across chartered accountancy, corporate secretarial practice, and legal advisory.',
  },
  {
    id: 'def-4',
    title: 'Commercial Hub Practice & Executive Infrastructure',
    category: 'office',
    imageUrl: '/images/Aboutus.png',
    images: [
      '/images/Aboutus.png',
      '/images/Why.png',
      '/hero/hero-3.png',
    ],
    location: 'Chennai',
    date: '2026',
    caption: 'Modern, tech-enabled boardroom facilities designed for confidential client advisory and fiduciary audits.',
  },
  {
    id: 'def-5',
    title: 'Client Fiduciary Review & Regulatory Briefing',
    category: 'client',
    imageUrl: '/images/Why.png',
    images: [
      '/images/Why.png',
      '/images/services.png',
      '/images/industries.png',
    ],
    location: 'Hyderabad',
    date: '2026',
    caption: 'Interactive engagement sessions with enterprise founders, audit committees, and board advisors.',
  },
  {
    id: 'def-6',
    title: 'National Articleship & Trainee Induction Program',
    category: 'events',
    imageUrl: '/images/about.png',
    images: [
      '/images/about.png',
      '/images/indian-advisory-team.png',
      '/hero/hero-4.png',
    ],
    location: 'Bengaluru',
    date: '2026',
    caption: 'Welcoming the new batch of ICAI article assistants into comprehensive multi-disciplinary audit rotations.',
  },
  {
    id: 'def-7',
    title: 'Pan-India Assurance & Quality Review Practice',
    category: 'team',
    imageUrl: '/images/services.png',
    images: [
      '/images/services.png',
      '/images/industries.png',
      '/images/indian-ca-boardroom.png',
    ],
    location: 'Mumbai & Chennai',
    date: '2026',
    caption: 'Statutory and internal audit review teams collaborating on multi-entity assurance assignments.',
  },
  {
    id: 'def-8',
    title: 'Industrial Advisory & Regulatory Compliance Wing',
    category: 'office',
    imageUrl: '/images/industries.png',
    images: [
      '/images/industries.png',
      '/images/Aboutus.png',
      '/images/Why.png',
    ],
    location: 'Salem & Madurai',
    date: '2026',
    caption: 'Regional branch infrastructure delivering rapid localized compliance support across Southern India.',
  },
]

export default async function GalleryPage() {
  let bannerTitle = 'Photo & Media Gallery'
  let bannerSubtitle =
    'Moments, Milestones, Infrastructure, and Culture Across Our Pan-India Professional Network'
  let bannerEyebrow = 'Life at Team Eyrie'
  let bannerImage = '/hero/hero-2.png'
  let bannerFocal = 'right center'

  let cmsItems: GalleryItem[] = []

  try {
    const payload = await getPayload({ config })

    const [galleryRes, pageBannersRes] = await Promise.all([
      payload
        .find({
          collection: 'gallery' as any,
          sort: 'order -createdAt',
          limit: 100,
          depth: 2,
        })
        .catch(() => ({ docs: [] })),
      payload.findGlobal({ slug: 'page-banners' as any, depth: 1 }).catch(() => null),
    ])

    const gBanner = (pageBannersRes as any)?.gallery
    if (gBanner) {
      if (gBanner.title) bannerTitle = gBanner.title
      if (gBanner.subtitle) bannerSubtitle = gBanner.subtitle
      if (gBanner.eyebrow) bannerEyebrow = gBanner.eyebrow
      if (typeof gBanner.bgImage === 'object' && gBanner.bgImage?.url) {
        bannerImage = gBanner.bgImage.url
      } else if (typeof gBanner.bgImage === 'string') {
        bannerImage = gBanner.bgImage
      }
      if (gBanner.focalPosition) bannerFocal = gBanner.focalPosition
    }

    if (Array.isArray(galleryRes?.docs) && galleryRes.docs.length > 0) {
      cmsItems = galleryRes.docs.map((doc: any) => {
        const extractUrl = (val: any): string => {
          if (!val) return ''
          if (typeof val === 'string' && val.trim()) return val.trim()
          if (typeof val === 'object') {
            if (typeof val.url === 'string' && val.url.trim()) return val.url.trim()
            if (typeof val.image === 'object' && val.image?.url) return val.image.url.trim()
            if (typeof val.image === 'string' && val.image.trim()) return val.image.trim()
          }
          return ''
        }

        const gatheredImages: string[] = []

        // Priority 1: Multi-image upload field (hasMany: true) - exactly what admin uploaded
        if (Array.isArray(doc.images) && doc.images.length > 0) {
          for (const item of doc.images) {
            const u = extractUrl(item)
            if (u && !gatheredImages.includes(u)) {
              gatheredImages.push(u)
            }
          }
        }

        // Priority 2: Custom photo slides array (galleryImages)
        if (gatheredImages.length === 0 && Array.isArray(doc.galleryImages) && doc.galleryImages.length > 0) {
          for (const slide of doc.galleryImages) {
            const u = extractUrl(slide.imageUrl) || extractUrl(slide.image)
            if (u && !gatheredImages.includes(u)) {
              gatheredImages.push(u)
            }
          }
        }

        // Priority 3: Multiple static URLs (imageUrls textarea, one per line)
        if (gatheredImages.length === 0 && typeof doc.imageUrls === 'string' && doc.imageUrls.trim()) {
          const lines = doc.imageUrls
            .split('\n')
            .map((l: string) => l.trim())
            .filter(Boolean)
          for (const line of lines) {
            if (!gatheredImages.includes(line)) {
              gatheredImages.push(line)
            }
          }
        }

        // Priority 4: Fall back to single primary image (image upload or imageUrl text)
        if (gatheredImages.length === 0) {
          const single = extractUrl(doc.imageUrl) || extractUrl(doc.image)
          if (single) {
            gatheredImages.push(single)
          }
        }

        const finalMain = gatheredImages[0] || '/images/indian-advisory-team.png'
        const finalImagesList = gatheredImages.length > 0 ? gatheredImages : [finalMain]

        return {
          id: doc.id,
          title: doc.title || 'Gallery Photograph',
          category: doc.category || 'events',
          imageUrl: finalMain,
          images: finalImagesList,
          caption: doc.caption || null,
          location: doc.location || null,
          date: doc.date ? new Date(doc.date).getFullYear().toString() : null,
        }
      })
    }
  } catch {
    // Fall back to defaults
  }

  // Combine CMS items with defaults, placing CMS items first
  const displayItems: GalleryItem[] = cmsItems.length > 0 ? cmsItems : DEFAULT_GALLERY_ITEMS

  return (
    <main>
      <PageHero
        title={bannerTitle}
        subtitle={bannerSubtitle}
        eyebrow={bannerEyebrow}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
        bgImage={bannerImage}
        bgPosition={bannerFocal}
      />

      <section className="section" style={{ padding: '60px 0', background: '#ffffff' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Visual Journey"
            title="Moments, Events &amp; Infrastructure"
            subtitle="Explore snapshots of our national team engagements, technical conferences, corporate milestones, and professional spaces."
          />

          <GalleryView items={displayItems} />
        </div>
      </section>

      <CtaBanner
        eyebrow="Join Our Growing Network"
        title="Experience the Professional Standard of Team Eyrie"
        description="Connect with senior chartered accountants, explore articleship opportunities, or schedule a strategic consultation."
        primaryLabel="Get in Touch"
        primaryHref="/contact"
      />
    </main>
  )
}
