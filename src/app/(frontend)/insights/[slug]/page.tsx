import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/PageHero'
import RichText from '@/components/RichText'
import CtaBanner from '@/components/CtaBanner'

export const dynamic = 'force-dynamic'

async function getPost(slug: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'announcements',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 1,
  })
  return docs[0] as any | undefined
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = await getPost(slug)
  return { title: p ? `${p.title} — Team Eyrie` : 'Insight — Team Eyrie', description: p?.excerpt }
}

export default async function InsightDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const img = typeof post.coverImage === 'object' && post.coverImage?.url ? post.coverImage.url : null

  return (
    <main>
      <PageHero
        title={post.title}
        subtitle={post.excerpt}
        eyebrow="Knowledge &amp; Thought Leadership"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Insights', href: '/insights' }, { label: post.title }]}
        bgImage="/hero/hero-2.png"
      />
      <section className="section section-mobile-compact" style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            {post.publishedDate && (
              <span style={{ color: '#b08d57', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                Published: {new Date(post.publishedDate).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
            <a href="/insights" style={{ color: '#1f3864', fontWeight: 700, fontSize: 14.5, textDecoration: 'none' }}>
              ← Back to all Insights
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

          <div style={{ fontSize: 17, lineHeight: 1.8, color: '#334155' }}>
            {post.body ? <RichText data={post.body} /> : <p className="lead">{post.excerpt}</p>}
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
