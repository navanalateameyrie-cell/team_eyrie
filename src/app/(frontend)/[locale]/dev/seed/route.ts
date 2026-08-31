import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { runSeed } from '@/seed/seedData'

export const dynamic = 'force-dynamic'

// Convenience route to seed the database (secured with PAYLOAD_SECRET in production)
export async function GET(req: NextRequest) {
  const secretParam = req.nextUrl.searchParams.get('secret')
  const isAuthorized =
    process.env.NODE_ENV !== 'production' ||
    (Boolean(process.env.PAYLOAD_SECRET) && secretParam === process.env.PAYLOAD_SECRET)

  if (!isAuthorized) {
    return new Response(
      'Unauthorized. In production, provide the query param ?secret=<PAYLOAD_SECRET> to trigger seeding.',
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
