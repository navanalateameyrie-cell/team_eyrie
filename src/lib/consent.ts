import type { Payload } from 'payload'

/** Default DPDP consent notice (initial value; admin can edit via Consent Settings). */
export const DEFAULT_CONSENT = {
  version: 'v1',
  checkboxLabel:
    'I explicitly consent to Team Eyrie storing and processing my personal data — including my name, email address, phone number and uploaded résumé — in its secure candidate database for the purpose of evaluating my job application, under the Digital Personal Data Protection (DPDP) Act, 2023. I understand that I may withdraw this consent and request deletion of my data at any time using the link in my application acknowledgement email, or by contacting Team Eyrie’s Grievance Officer. I understand that withdrawing consent will mean my application is no longer considered.',
  reassuranceLine:
    'Your application details are transmitted over a secure, encrypted (HTTPS/TLS) connection and are not shared with third parties for marketing.',
}

export type ConsentNotice = {
  version: string
  checkboxLabel: string
  reassuranceLine?: string
  grievanceContact?: string
}

/** Read the admin-managed consent notice, falling back to defaults. */
export async function getConsentNotice(payload: Payload): Promise<ConsentNotice> {
  try {
    const s: any = await payload.findGlobal({ slug: 'consent-settings', depth: 0 })
    const grievance = s?.grievanceOfficer || {}
    const grievanceContact = [grievance.name, grievance.email, grievance.phone].filter(Boolean).join(' · ')
    return {
      version: s?.notice?.version || DEFAULT_CONSENT.version,
      checkboxLabel: s?.notice?.checkboxLabel || DEFAULT_CONSENT.checkboxLabel,
      reassuranceLine: s?.notice?.reassuranceLine || DEFAULT_CONSENT.reassuranceLine,
      grievanceContact: grievanceContact || undefined,
    }
  } catch {
    return { ...DEFAULT_CONSENT }
  }
}

export function baseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://te1-steel.vercel.app')
  ).replace(/\/$/, '')
}

export function withdrawUrl(token: string): string {
  return `${baseUrl()}/careers/withdraw?token=${encodeURIComponent(token)}`
}

/** Build the acknowledgement / withdrawal email from the (optional) admin template. */
export async function buildAckEmail(
  payload: Payload,
  args: { name: string; jobTitle: string; token: string },
): Promise<{ subject: string; text: string }> {
  const url = withdrawUrl(args.token)
  let subject = 'Your application to Team Eyrie'
  let body = ''
  try {
    const s: any = await payload.findGlobal({ slug: 'consent-settings', depth: 0 })
    subject = s?.withdrawalEmail?.subject || subject
    body = s?.withdrawalEmail?.body || ''
  } catch {
    /* use defaults */
  }
  if (!body) {
    body =
      `Dear {{name}},\n\n` +
      `Thank you for applying for {{jobTitle}} at Team Eyrie. We have received your application.\n\n` +
      `Under the DPDP Act, 2023 you may withdraw your consent and have your application removed at any time using this link:\n{{withdrawUrl}}\n\n` +
      `Regards,\nTeam Eyrie`
  }
  const text = body
    .replaceAll('{{name}}', args.name)
    .replaceAll('{{jobTitle}}', args.jobTitle)
    .replaceAll('{{withdrawUrl}}', url)
    .concat(body.includes('{{withdrawUrl}}') ? '' : `\n\nWithdraw your consent: ${url}`)
  return { subject, text }
}
