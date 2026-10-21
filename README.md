# Team Eyrie Website

Corporate website for **Team Eyrie** — Next.js (App Router) + **Payload CMS** + **PostgreSQL**.

> **Repository Status**: Synced and verified for `navanalateameyrie-cell/team_eyrie`.

## Stack
- **Next.js 15.4** (React 19) — frontend + backend API routes
- **Payload CMS 3.87** — admin panel & content API (mounted at `/admin`)
- **PostgreSQL 18** — database (self-hosted / in-house VPS in production)
- **Sharp** — image processing for the media library

## Prerequisites
- Node.js ≥ 20
- A PostgreSQL instance

## Environment (`.env`)
```
PAYLOAD_SECRET=<random 32-byte hex>
DATABASE_URI=postgres://<user>:<pass>@<host>:5432/team_eyrie
NEXT_PUBLIC_SERVER_URL=http://localhost:4000
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:4000
```
> Local dev currently uses port **4000** (port 3000 is blocked on this machine).

## Getting started
```bash
npm install
npm run dev -- -p 4000        # boots Next + Payload; auto-creates the DB schema in dev
```
Then seed the base content (services, industries, offices, admin user):
```bash
# with the dev server running:
curl http://localhost:4000/dev/seed
```

### Default admin login
- URL: `http://localhost:4000/admin`
- Email: `admin@teameyrie.local`
- Password: `Admin@12345`

**Change this password immediately** and set real credentials via `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` before seeding in any shared environment.

## Scripts
| Script | Purpose |
|---|---|
| `npm run dev` | Start the dev server (schema auto-push) |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run generate:types` | Regenerate `src/payload-types.ts` |
| `npm run seed` | Seed via Payload CLI (use the `/dev/seed` route if the CLI is non-interactive) |

## Data model (Payload collections)
- **Users** — admin / editor / recruiter roles (auth)
- **Media** — images, video, PDFs (with generated sizes)
- **Services** — 8 practice areas + sub-services, SEO fields
- **Industries** — 17 sectors served
- **Offices** — 9 locations with lat/lng + Google Maps embed
- **Team Members** — professionals with photo, bio, expertise
- **Jobs** — job openings (draft/open/closed) — recruitment
- **Job Applications** — public apply + recruiter pipeline (new → hired/rejected)
- **Contact Leads** — public enquiries + status tracking
- **Announcements** — news / insights (draft/published)
- **Testimonials** — client quotes (homepage carousel)
- **Case Studies** — engagement stories with metrics
- **Consent Logs** — append-only GDPR audit trail of cookie-consent events
- **Global: Site Settings** — org info, contact, social, notification emails
- **Global: Home Page** — hero, intro, stats counters, process model
- **Global: Consent Settings** — DPDP consent notice (versioned), grievance officer, retention period, withdrawal-email template (admin-only, version history)

## DPDP consent (job applications)
Candidates give explicit **DPDP Act 2023** consent when applying, and can withdraw it later:
- Un-ticked consent checkbox on the application form; **enforced server-side** in `/apply` (submission rejected without it).
- The exact notice text + version is **snapshotted onto each application** (`consentTextSnapshot`) — immutable proof even if the notice is later edited (**Safeguard 1**). The notice is managed in the admin **Consent Settings** page, which keeps **version history** (**Safeguard 2**).
- Consent proof stored on the application: `consentGiven`, `consentAt`, `consentVersion`, `consentIp`, `consentUserAgent`, `consentStatus`, `withdrawalToken`, `withdrawnAt`.
- On submission the candidate is emailed an acknowledgement with a unique **withdrawal link** (`/careers/withdraw?token=…`). Confirming it marks the application `consentStatus: withdrawn` and removes it from the active pipeline (`POST /withdraw-consent`). Possession of the emailed token is the identity check.
- Email is best-effort (console transport until an email adapter is configured — see Production notes).

> Build note: the committed `TEAM_EYRIE/` duplicate tree is excluded in `tsconfig.json` because its stale generated types shadowed the real ones. That nested copy and `TEAM_EYRIE.zip` should be removed from the repo.

## Public pages (frontend)
All under `src/app/(frontend)/`, server-rendered from the CMS:

| Route | Page |
|---|---|
| `/` | Home — hero, stats, services, process, testimonials, presence |
| `/about`, `/vision-mission`, `/why-team-eyrie` | Company pages |
| `/services`, `/services/[slug]` | Services listing + detail (sub-services, related industries) |
| `/industries` | Industries grid |
| `/people`, `/people/[slug]` | Professional profiles (photo, bio, expertise) |
| `/presence` | Offices + Google Maps embeds (no API key needed) |
| `/insights`, `/insights/[slug]` | News / articles |
| `/careers`, `/careers/[slug]` | Openings + application form |
| `/contact` | Enquiry form |

Shared chrome: `SiteChrome.tsx` (header + footer), `SiteHeader.tsx` (client nav with
services mega-menu + mobile toggle), `PageHero.tsx`, `RichText.tsx` (Lexical renderer).

**Forms & submissions**
- **Contact** posts JSON to Payload's public `POST /api/contact-leads`.
- **Job applications** post multipart to `POST /apply` (`src/app/(frontend)/apply/route.ts`),
  which uploads the résumé to `media` and creates a `job-applications` record server-side
  (with `overrideAccess`, cleaning up the upload if the application fails to save).

## Cookie consent
A self-hosted consent widget (`src/components/CookieConsent.tsx`) modelled on the
Cookiebot UX — categories (Necessary / Preferences / Statistics / Marketing), a
first-visit banner (Deny / Allow selection / Allow all / Customize), and a reopenable
panel showing the **current state, consent date, and consent ID** with **Withdraw**
and **Change** options. Client state lives in a 1-year `te-cookie-consent` cookie;
every accept/change/withdraw is also POSTed to the `consent-logs` collection for
server-side proof of consent.

> **Production follow-up:** gate real analytics/marketing scripts (e.g. Google
> Analytics) on the stored consent so they only load when `statistics` / `marketing`
> is granted. The widget records consent; wiring the scripts to it is the next step.

## Multi-language support
The public site is available in English plus eight Indian languages (Hindi, Tamil,
Telugu, Kannada, Malayalam, Marathi, Bengali, Gujarati).

- **URLs.** The default locale is *unprefixed* — `/services` stays `/services`.
  `src/middleware.ts` rewrites (never redirects) unprefixed requests onto the
  `app/(frontend)/[locale]/` tree, so existing English URLs and their SEO are
  untouched. Other locales are prefixed: `/kn/services`.
- **Static UI strings** (nav, footer, buttons) live in `src/i18n/dictionaries/*.json`.
  `en.json` defines the shape; every other file must have the same keys.
- **CMS content** is translated by Payload localization on fields marked
  `localized: true`. `fallback: true` means an untranslated field renders the
  English value, so pages are never half-blank. Slugs are *not* localized — one
  URL key resolves the same document in every language.
- **Adding a language:** add it to `src/i18n/config.ts`, to
  `localization.locales` in `payload.config.ts`, and add a dictionary file.
  It also needs a new value in the Postgres `_locales` enum.
- **Translating content:** open `/admin`, edit a document, switch locale in the
  admin UI, and save. Only English rows exist today — the other locales are
  empty and fall back until someone fills them in.

## Production notes (Vercel)
- **Localization schema change (required before deploying multi-language).**
  Prod runs `push: false`, so the `*_locales` tables must be created explicitly.
  Run `scripts/sql/001_add_localization.sql` — it copies existing content into
  the `en` locale *before* dropping the old columns (Payload's own `push` does
  not, and would silently lose it). It is idempotent and runs in one transaction.
  Back up and dry-run against a clone first:
  ```
  pg_dump -Fc -d "$DATABASE_URL" -f pre_localization.dump
  psql "$DATABASE_URL" -v ON_ERROR_STOP=1 --single-transaction -f scripts/sql/001_add_localization.sql
  ```
- **Known toolchain issue:** `payload migrate:create` and `payload generate:types`
  fail on Node 24 (`ERR_REQUIRE_ASYNC_MODULE` — tsx cannot `require`
  `richtext-lexical`'s top-level await). Pin Node 22 to use the Payload CLI;
  until then the SQL script above stands in for a generated migration.
- Switch Postgres from dev `push` to **migrations**: `payload migrate:create` then `payload migrate` in the deploy pipeline.
- **Email:** the nodemailer adapter is wired in `payload.config.ts`. Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM_ADDRESS`, `EMAIL_FROM_NAME` (see `.env`) to send real emails (e.g. the application withdrawal link). Without `SMTP_HOST`, emails are logged to the console.
- Move media storage to disk/object storage and put the app behind a reverse proxy (Nginx) with HTTPS.
- Set `NODE_ENV=production`; the `/dev/seed` route is disabled automatically.
```
