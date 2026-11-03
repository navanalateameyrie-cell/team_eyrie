import { NextResponse, type NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

// One count per browser: the cookie marks a browser we've already counted.
const COOKIE = 'te_visitor'
const ONE_YEAR = 60 * 60 * 24 * 365

export async function POST(req: NextRequest) {
  // Returning visitor → already counted, do nothing.
  if (req.cookies.get(COOKIE)) {
    return new NextResponse(null, { status: 204 })
  }

  try {
    const payload = await getPayload({ config })
    const current = await payload.findGlobal({ slug: 'site-stats' as any, depth: 0 })
    const next = Number((current as any)?.uniqueVisits ?? 0) + 1
    await payload.updateGlobal({
      slug: 'site-stats' as any,
      data: { uniqueVisits: next, lastVisitAt: new Date().toISOString() } as any,
      overrideAccess: true,
      depth: 0,
    })
  } catch {
    // Visit tracking must never break the page — swallow and still set the cookie.
  }

  const res = new NextResponse(null, { status: 204 })
  res.cookies.set(COOKIE, '1', {
    maxAge: ONE_YEAR,
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
  })
  return res
}
