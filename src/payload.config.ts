import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Industries } from './collections/Industries'
import { Offices } from './collections/Offices'
import { TeamMembers } from './collections/TeamMembers'
import { Jobs } from './collections/Jobs'
import { JobApplications } from './collections/JobApplications'
import { ContactLeads } from './collections/ContactLeads'
import { Announcements } from './collections/Announcements'
import { Testimonials } from './collections/Testimonials'
import { CaseStudies } from './collections/CaseStudies'
import { ConsentLogs } from './collections/ConsentLogs'
import { PartnerRegistrations } from './collections/PartnerRegistrations'
import { Appointments } from './collections/Appointments'
import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { ConsentSettings } from './globals/ConsentSettings'
import { RecruitmentOverview } from './globals/RecruitmentOverview'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const dbUrl =
  process.env.DATABASE_URL ||
  process.env.DATABASE_URI ||
  process.env.POSTGRES_URL ||
  ''

const isLocalDb = !dbUrl || dbUrl.includes('127.0.0.1') || dbUrl.includes('localhost')

if (dbUrl) {
  try {
    const sanitized = dbUrl.replace(/^postgres(ql)?:/, 'http:')
    const parsed = new URL(sanitized)
    console.log(`[Payload DB] Connecting to database host: ${parsed.hostname}`)
  } catch {
    console.log('[Payload DB] Connecting with provided connection string.')
  }
} else {
  console.warn('[Payload DB] ⚠️ WARNING: No DATABASE_URL found in environment variables! Falling back to localhost:5432.')
}

export default buildConfig({
  serverURL:
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined),
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    'https://te1-topaz.vercel.app',
    'http://localhost:3000',
  ].filter(Boolean),
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    'https://te1-topaz.vercel.app',
    'http://localhost:3000',
  ].filter(Boolean),
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    components: {
      beforeNavLinks: [
        '/components/admin/BackButton#BackButton',
        '/components/admin/SidebarBranding#SidebarBranding',
      ],
      graphics: {
        Logo: '/components/admin/Logo#Logo',
        Icon: '/components/admin/Icon#Icon',
      },
      views: {
        login: {
          Component: '/components/admin/LoginView#LoginView',
        },
      },
    },
    meta: {
      titleSuffix: '— Team Eyrie CMS',
    },
  },
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  collections: [
    Users,
    Media,
    Services,
    Industries,
    Offices,
    TeamMembers,
    Jobs,
    JobApplications,
    ContactLeads,
    Announcements,
    Testimonials,
    CaseStudies,
    ConsentLogs,
    PartnerRegistrations,
    Appointments,
  ],
  globals: [SiteSettings, HomePage, ConsentSettings, RecruitmentOverview],
  editor: lexicalEditor(),
  // Real email is sent when SMTP_* env vars are present; otherwise Payload falls
  // back to its console transport (emails are logged, not delivered).
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'no-reply@teameyrie.in',
        defaultFromName: process.env.EMAIL_FROM_NAME || 'Team Eyrie',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === 'true',
          auth:
            process.env.SMTP_USER && process.env.SMTP_PASS
              ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
              : undefined,
        },
      })
    : undefined,
  secret: process.env.PAYLOAD_SECRET || 'team-eyrie-payload-secret-key-prod-2026-safe',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: dbUrl,
      ssl: isLocalDb ? false : { rejectUnauthorized: false },
      connectionTimeoutMillis: 15000,
      idleTimeoutMillis: 30000,
      max: 10,
    },
    push: true,
  }),
  sharp,
  upload: {
    limits: {
      fileSize: 10_000_000, // 10 MB
    },
  },
})
