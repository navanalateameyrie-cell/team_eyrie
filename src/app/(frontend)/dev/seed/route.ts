import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { runSeed } from '@/seed/seedData'

export const dynamic = 'force-dynamic'

/**
 * Is the configured database running on this machine?
 *
 * NODE_ENV alone is not a safe guard for seeding: running `next dev` against a
 * remote (production) DATABASE_URL is a normal thing to do, and in that setup
 * NODE_ENV is 'development' while the database is very much production. Gate on
 * where the data actually lives, not on how the process was started.
 */
function isLocalDatabase(): boolean {
  const url = process.env.DATABASE_URL || process.env.DATABASE_URI || process.env.POSTGRES_URL || ''
  if (!url) return true // no URL configured -> the adapter falls back to localhost
  try {
    const { hostname } = new URL(url.replace(/^postgres(ql)?:/, 'http:'))
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1'
  } catch {
    return false // unparseable -> treat as remote and require the secret
  }
}

// Convenience route to seed the database. Free against a local database;
// requires PAYLOAD_SECRET against any remote one, in production or not.
export async function GET(req: NextRequest) {
  const secretParam = req.nextUrl.searchParams.get('secret')
  const isAuthorized =
    (process.env.NODE_ENV !== 'production' && isLocalDatabase()) ||
    (Boolean(process.env.PAYLOAD_SECRET) && secretParam === process.env.PAYLOAD_SECRET)

  if (!isAuthorized) {
    return new Response(
      'Unauthorized. Seeding a remote database requires the query param ?secret=<PAYLOAD_SECRET>.',
      { status: 401 }
    )
  }
  try {
    const payload = await getPayload({ config })
    const log = await runSeed(payload)
    return Response.json({ ok: true, log })
  } catch (err) {
    return Response.json({ ok: false, error: (err as Error).message }, { status: 500 })
  }
}
