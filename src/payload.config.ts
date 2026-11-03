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
import { ComplianceEvents } from './collections/ComplianceEvents'
import { Gallery } from './collections/Gallery'
import { Qualifications } from './collections/Qualifications'
import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { ConsentSettings } from './globals/ConsentSettings'
import { RecruitmentOverview } from './globals/RecruitmentOverview'
import { PageBanners } from './globals/PageBanners'
import { runSeed } from './seed/seedData'
import { seedQualifications } from './seed/seedQualifications'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const dbUrl =
  process.env.DATABASE_URL ||
  process.env.DATABASE_URI ||
  process.env.POSTGRES_URL ||
  ''

// Runtime ALWAYS connects via DATABASE_URL (the Supabase transaction pooler,
// port 6543, on serverless). Migrations/schema-push are run as a separate
// command with DATABASE_URL pointed at the direct/session connection (port
// 5432) — never baked into the runtime pool, so a stray PAYLOAD_DB_PUSH or a
// bad DATABASE_URL_DIRECT can't break the running app.
const isLocalDb =
  !dbUrl || dbUrl.includes('127.0.0.1') || dbUrl.includes('localhost')

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

if (typeof process !== 'undefined' && process.on) {
  process.on('unhandledRejection', (reason) => {
    if (!reason) {
      // Suppress unhandled undefined rejection from DB reconnect
      return
    }
  })
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
    'https://te1-steel.vercel.app',
    'http://localhost:3000',
  ].filter(Boolean),
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    'https://te1-topaz.vercel.app',
    'https://te1-steel.vercel.app',
    'http://localhost:3000',
  ].filter(Boolean),
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    // These point at SERVER shells in components/admin/shells.tsx, not at the
    // client components directly. Payload passes each custom view its server
    // props, and with localization enabled those include a Locale object
    // carrying a toString method — which React cannot serialize into a Client
    // Component, 500ing the whole admin panel after login. The shells absorb
    // those props and render the client components with none.
    components: {
      Nav: '/components/admin/shells#AdminNav',
      graphics: {
        // Logo and Icon are Server Components already, so they are safe to
        // reference directly.
        Logo: '/components/admin/Logo#Logo',
        Icon: '/components/admin/Icon#Icon',
      },
      views: {
        ClientMapping: {
          Component: '/components/admin/shells#ClientMapping',
          path: '/client-mapping',
        },
        Dashboard: {
          Component: '/components/admin/shells#Dashboard',
        },
        dashboard: {
          Component: '/components/admin/shells#Dashboard',
        },
        login: {
          Component: '/components/admin/shells#Login',
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
    ComplianceEvents,
    Gallery,
    Qualifications,
  ],
  globals: [SiteSettings, HomePage, ConsentSettings, RecruitmentOverview, PageBanners],
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
  // A hardcoded fallback secret in source lets anyone who can read the repo
  // forge admin sessions, so production must supply its own; dev keeps a
  // throwaway. Set PAYLOAD_SECRET in Vercel BEFORE deploying.
  secret:
    process.env.PAYLOAD_SECRET ||
    (process.env.NODE_ENV === 'production'
      ? (() => {
          throw new Error('PAYLOAD_SECRET environment variable is required in production')
        })()
      : 'dev-only-insecure-payload-secret'),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      // Runtime uses the Supabase transaction pooler (6543) via DATABASE_URL.
      connectionString: dbUrl,
      ssl: isLocalDb ? false : { rejectUnauthorized: false },
      connectionTimeoutMillis: 30000, // remote Supabase latency headroom
      idleTimeoutMillis: 60000,
      // Serverless: each warm Vercel function holds its own pool against the
      // shared transaction pooler, so keep this tiny and release on idle.
      max: Number(process.env.DB_POOL_MAX || 3),
      allowExitOnIdle: true,
    },
    push: process.env.PAYLOAD_DB_PUSH === 'true',
  }),
  sharp,
  upload: {
    limits: {
      fileSize: 10_000_000, // 10 MB
    },
  },
  onInit: async (payload) => {
    // ── Seed: tedev@gmail.com ────────────────────────────────────────────────
    try {
      const existingSuperAdmin = await payload.find({
        collection: 'users',
        where: { email: { equals: 'tedev@gmail.com' } },
      })
      if (existingSuperAdmin.totalDocs === 0 && process.env.PAYLOAD_SEED_ADMINS === 'true') {
        await payload.create({
          collection: 'users',
          data: {
            name: 'Super Admin Developer',
            email: 'tedev@gmail.com',
            password: process.env.SEED_SUPER_ADMIN_PASSWORD || '',
            role: 'super_admin' as any,
          },
        })
        payload.logger.info('Seeded super_admin user: tedev@gmail.com')
      }
    } catch (err) {
      payload.logger.error({ err }, 'Failed to seed super admin')
    }

    // ── Seed: admin@teameyrie.local ──────────────────────────────────────────
    // This account is the UAT/production manager login. Seeding it on every
    // cold start ensures it exists in any environment (UAT, staging, prod)
    // without needing a manual DB operation.
    try {
      const existingAdmin = await payload.find({
        collection: 'users',
        where: { email: { equals: 'admin@teameyrie.local' } },
      })
      if (existingAdmin.totalDocs === 0 && process.env.PAYLOAD_SEED_ADMINS === 'true') {
        await payload.create({
          collection: 'users',
          data: {
            name: 'Admin',
            email: 'admin@teameyrie.local',
            password: process.env.SEED_ADMIN_PASSWORD || '',
            role: 'admin' as any,
          },
        })
        payload.logger.info('Seeded admin user: admin@teameyrie.local')
      }
    } catch (err) {
      payload.logger.error({ err }, 'Failed to seed admin@teameyrie.local')
    }

    // ── Seed: Initial Data (Services, Offices, Team Members, Jobs, etc.) ───
    try {
      const log = await runSeed(payload)
      payload.logger.info(`[Database Seed] ${log.join(' | ')}`)
    } catch (err) {
      payload.logger.warn({ err }, 'Seed initialization warning')
    }

    // ── Seed: Qualification Master ──────────────────────────────────────
    try {
      await seedQualifications(payload)
    } catch (err) {
      payload.logger.warn({ err }, 'Qualification Master seed warning')
    }
  },
})
