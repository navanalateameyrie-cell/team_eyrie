import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHero from '@/components/PageHero'
import WithdrawConsent from '@/components/WithdrawConsent'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Withdraw Consent — Team Eyrie',
  robots: { index: false },
}

async function findByToken(token: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'job-applications',
    where: { withdrawalToken: { equals: token } },
    limit: 1,
    depth: 1,
    overrideAccess: true,
  })
  return docs[0] as any | undefined
}

export default async function WithdrawPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams
  const app = token ? await findByToken(token) : undefined
  const jobTitle = typeof app?.job === 'object' ? app.job?.title : 'your application'

  return (
    <main>
      <PageHero
        title="Withdraw Consent"
        subtitle="Manage the consent you gave for your job application under the DPDP Act, 2023."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Careers', href: '/careers' }, { label: 'Withdraw Consent' }]}
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          {!token || !app ? (
            <div className="alert alert--error">
              This withdrawal link is invalid or has expired. If you need to withdraw your consent, please
              contact us via the <a href="/contact">contact page</a>.
            </div>
          ) : app.consentStatus === 'withdrawn' ? (
            <div className="alert alert--success">
              Your consent for the application to <em>{jobTitle}</em> has already been withdrawn. No further
              action is needed.
            </div>
          ) : (
            <WithdrawConsent token={token} jobTitle={jobTitle} />
          )}
        </div>
      </section>
    </main>
  )
}
