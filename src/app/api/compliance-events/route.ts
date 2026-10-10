import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const { docs: events } = await payload.find({
      collection: 'compliance-events' as any,
      where: {
        status: {
          not_equals: 'archived',
        },
      },
      limit: 300,
      sort: 'date',
      depth: 0,
    })

    return NextResponse.json({
      success: true,
      events,
    })
  } catch (error: any) {
    console.error('Failed to fetch compliance events:', error)
    return NextResponse.json(
      {
        success: false,
        events: [],
        error: error?.message || 'Failed to fetch compliance events',
      },
      { status: 500 }
    )
  }
}
