import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/layout/PageHero'
import RichText from '@/components/ui/RichText'
import CtaBanner from '@/components/layout/CtaBanner'

export const dynamic = 'force-dynamic'

async function getPost(slug: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'announcements',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 2,
  })
  return docs[0] as any | undefined
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = await getPost(slug)
  return { title: p ? `${p.title} — Team Eyrie` : 'News & Articles — Team Eyrie', description: p?.excerpt }
}

export default async function InsightDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const img = typeof post.coverImage === 'object' && post.coverImage?.url ? post.coverImage.url : null
  const pdfUrl =
    typeof post.pdfFile === 'object' && post.pdfFile?.url
      ? post.pdfFile.url
      : typeof post.pdfUrl === 'string' && post.pdfUrl.trim().length > 0
        ? post.pdfUrl
        : null

  const pdfFilename =
    typeof post.pdfFile === 'object' && post.pdfFile?.filename
      ? post.pdfFile.filename
      : `${post.slug || 'document'}.pdf`

  const pdfFilesize =
    typeof post.pdfFile === 'object' && post.pdfFile?.filesize
      ? post.pdfFile.filesize > 1048576
        ? `${(post.pdfFile.filesize / 1048576).toFixed(1)} MB`
        : `${Math.round(post.pdfFile.filesize / 1024)} KB`
      : null

  const isNews = post.category === 'news' || Boolean(pdfUrl)

  return (
    <main>
      <PageHero
        title={post.title}
        subtitle={post.excerpt}
        eyebrow={isNews ? 'Official News & Circular' : 'Article & Thought Leadership'}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'News and Articles', href: '/insights' }, { label: post.title }]}
        bgImage="/hero/hero-2.png"
      />
      <section className="section section-mobile-compact" style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  background: isNews ? 'rgba(15,39,74,0.08)' : 'rgba(26,75,140,0.08)',
                  color: isNews ? '#0f274a' : '#1a4b8c',
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                  padding: '4px 10px',
                  borderRadius: 6,
                }}
              >
                {isNews ? 'News Circular' : 'Article'}
              </span>
              {post.publishedDate && (
                <span style={{ color: '#64748b', fontSize: 13.5, fontWeight: 600 }}>
                  Published: {new Date(post.publishedDate).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              )}
            </div>
            <a href="/insights" style={{ color: '#1a4b8c', fontWeight: 700, fontSize: 14.5, textDecoration: 'none' }}>
              ← Back to all News &amp; Articles
            </a>
          </div>

          {img && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img}
              alt={post.title}
              loading="lazy"
              style={{
                width: '100%',
                maxHeight: 460,
                objectFit: 'cover',
                borderRadius: 14,
                marginBottom: 32,
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e2e8f0',
              }}
            />
          )}

          {/* Dedicated Download & Read Box for News with PDF */}
          {pdfUrl && (
            <div
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                border: '1.5px solid #cbd5e1',
                borderLeft: '5px solid #1a4b8c',
                borderRadius: 12,
                padding: '24px 26px',
                marginBottom: 36,
                boxShadow: '0 4px 16px rgba(15, 39, 74, 0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 24 }}>📄</span>
                    <h3 style={{ margin: 0, fontSize: 18, color: '#0f274a', fontWeight: 800 }}>
                      Official News Document / Notification (PDF)
                    </h3>
                  </div>
                  <p style={{ margin: 0, color: '#64748b', fontSize: 13.5 }}>
                    {pdfFilename} {pdfFilesize ? `· ${pdfFilesize}` : ''}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a
                    href={pdfUrl}
                    download={pdfFilename}
                    className="btn btn--primary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '11px 22px',
                      fontSize: 14.5,
                      fontWeight: 700,
                      textDecoration: 'none',
                      borderRadius: 8,
                    }}
                  >
                    <span>📥</span>
                    <span>Download PDF</span>
                  </a>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '11px 20px',
                      fontSize: 14.5,
                      fontWeight: 700,
                      textDecoration: 'none',
                      borderRadius: 8,
                      background: '#ffffff',
                    }}
                  >
                    <span>👁️</span>
                    <span>Open in Fullscreen</span>
                  </a>
                </div>
              </div>

              {/* Embedded Document Reader View */}
              <div style={{ marginTop: 22 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#475569', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Document Reader:
                </p>
                <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #cbd5e1', background: '#e2e8f0' }}>
                  <iframe
                    src={`${pdfUrl}#toolbar=1&navpanes=0`}
                    title={post.title}
                    style={{ width: '100%', height: 620, border: 'none', display: 'block' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Article Body: Read directly on the website */}
          <div style={{ fontSize: 17, lineHeight: 1.8, color: '#334155' }}>
            {post.body ? (
              <RichText data={post.body} />
            ) : (
              !pdfUrl && <p className="lead" style={{ fontSize: 18, color: '#475569' }}>{post.excerpt}</p>
            )}
          </div>

          <CtaBanner
            eyebrow="Advisory Support"
            title="Have Questions Regarding this Regulatory Topic?"
            description="Our partner practice teams can provide detailed impact assessments customized for your entity."
            primaryLabel="Consult Specialist"
            primaryHref="/contact"
          />
        </div>
      </section>
    </main>
  )
}

