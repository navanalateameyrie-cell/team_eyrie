import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })

    const [users, jobs, applications, teamMembers, enquiries, appointments] = await Promise.all([
      payload.count({ collection: 'users', overrideAccess: true }).catch(() => ({ totalDocs: 0 })),
      payload.count({ collection: 'jobs', overrideAccess: true }).catch(() => ({ totalDocs: 0 })),
      payload.count({ collection: 'job-applications', overrideAccess: true }).catch(() => ({ totalDocs: 0 })),
      payload.count({ collection: 'team-members', overrideAccess: true }).catch(() => ({ totalDocs: 0 })),
      payload.count({ collection: 'contact-leads', overrideAccess: true }).catch(() => ({ totalDocs: 0 })),
      payload.count({ collection: 'appointments', overrideAccess: true }).catch(() => ({ totalDocs: 0 })),
    ])

    return NextResponse.json({
      users: users.totalDocs || 0,
      jobs: jobs.totalDocs || 0,
      applications: applications.totalDocs || 0,
      teamMembers: teamMembers.totalDocs || 0,
      enquiries: enquiries.totalDocs || 0,
      appointments: appointments.totalDocs || 0,
    })
  } catch {
    return NextResponse.json({
      users: 0,
      jobs: 0,
      applications: 0,
      teamMembers: 0,
      enquiries: 0,
      appointments: 0,
    })
  }
}