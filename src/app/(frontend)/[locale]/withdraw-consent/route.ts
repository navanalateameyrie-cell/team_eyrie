import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

/**
 * Performs a DPDP consent withdrawal. Possession of the unique, emailed token
 * serves as identity verification. On withdrawal the application is marked
 * consent-withdrawn and removed from the active recruitment pipeline (decision:
 * "mark withdrawn"). The résumé/PII is retained per policy but no longer processed.
 */
export async function POST(req: Request) {
  try {
    const { token } = await req.json().catch(() => ({}))
    if (!token || typeof token !== 'string') {
      return Response.json({ ok: false, error: 'Missing token.' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'job-applications',
      where: { withdrawalToken: { equals: token } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    const app = docs[0] as any
    if (!app) {
      return Response.json({ ok: false, error: 'This withdrawal link is invalid or has expired.' }, { status: 404 })
    }

    if (app.consentStatus !== 'withdrawn') {
      await payload.update({
        collection: 'job-applications',
        id: app.id,
        overrideAccess: true,
        data: {
          consentStatus: 'withdrawn',
          withdrawnAt: new Date().toISOString(),
          stage: 'rejected', // remove from the active pipeline
        },
      })
    }

    return Response.json({ ok: true })
  } catch (err) {
    return Response.json({ ok: false, error: (err as Error).message }, { status: 500 })
  }
}
