import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })

    const [
      users,
      jobs,
      applications,
      teamMembers,
      enquiries,
      appointments,
      services,
      offices,
      announcements,
      recentLeads,
      recentApps,
    ] = await Promise.all([
      payload.count({ collection: 'users', overrideAccess: true }).catch(() => ({ totalDocs: 0 })),
      payload.count({ collection: 'jobs', overrideAccess: true }).catch(() => ({ totalDocs: 0 })),
      payload.count({ collection: 'job-applications', overrideAccess: true }).catch(() => ({ totalDocs: 0 })),
      payload.count({ collection: 'team-members', overrideAccess: true }).catch(() => ({ totalDocs: 0 })),
      payload.count({ collection: 'contact-leads', overrideAccess: true }).catch(() => ({ totalDocs: 0 })),
      payload.count({ collection: 'appointments', overrideAccess: true }).catch(() => ({ totalDocs: 0 })),
      payload.count({ collection: 'services', overrideAccess: true }).catch(() => ({ totalDocs: 0 })),
      payload.count({ collection: 'offices', overrideAccess: true }).catch(() => ({ totalDocs: 0 })),
      payload.count({ collection: 'announcements', overrideAccess: true }).catch(() => ({ totalDocs: 0 })),
      payload.find({
        collection: 'contact-leads',
        limit: 5,
        sort: '-createdAt',
        overrideAccess: true,
      }).catch(() => ({ docs: [] })),
      payload.find({
        collection: 'job-applications',
        limit: 5,
        sort: '-createdAt',
        depth: 1,
        overrideAccess: true,
      }).catch(() => ({ docs: [] })),
    ])

    return NextResponse.json({
      users: users.totalDocs || 0,
      jobs: jobs.totalDocs || 0,
      applications: applications.totalDocs || 0,
      teamMembers: teamMembers.totalDocs || 0,
      enquiries: enquiries.totalDocs || 0,
      appointments: appointments.totalDocs || 0,
      services: services.totalDocs || 0,
      offices: offices.totalDocs || 0,
      announcements: announcements.totalDocs || 0,
      recentLeads: recentLeads.docs.map((lead: any) => ({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        company: lead.company || 'Individual',
        subject: lead.subject || 'General Consultation',
        status: lead.status || 'new',
        createdAt: lead.createdAt,
      })),
      recentApps: recentApps.docs.map((app: any) => ({
        id: app.id,
        fullName: app.fullName,
        email: app.email,
        jobTitle: typeof app.job === 'object' && app.job?.title ? app.job.title : 'General Mandate',
        stage: app.stage || 'new',
        createdAt: app.createdAt,
      })),
    })
  } catch {
    return NextResponse.json({
      users: 0,
      jobs: 0,
      applications: 0,
      teamMembers: 0,
      enquiries: 0,
      appointments: 0,
      services: 0,
      offices: 0,
      announcements: 0,
      recentLeads: [],
      recentApps: [],
    })
  }
}