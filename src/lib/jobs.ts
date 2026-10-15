/**
 * Utilities for job posting deadlines and auto-expiry.
 */

function getISTDateStr(date: string | Date): string | null {
  const d = typeof date === 'string' ? new Date(date) : date
  if (!d || isNaN(d.getTime())) return null
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d)
}

/**
 * Checks whether a job has passed its closing date.
 * If closingDate is Oct 31st, it remains active throughout Oct 31st (IST)
 * and automatically expires on Nov 1st.
 */
export function isJobExpired(closingDate?: string | Date | null): boolean {
  if (!closingDate) return false
  const d = typeof closingDate === 'string' ? new Date(closingDate) : closingDate
  if (!d || isNaN(d.getTime())) return false

  // If the raw timestamp is in the future, it is definitely active
  if (d.getTime() > Date.now()) {
    return false
  }

  // Check calendar day in IST:
  // Stays active all through the closing date and expires on the next day
  const closingIST = getISTDateStr(d)
  const todayIST = getISTDateStr(new Date())
  if (!closingIST || !todayIST) return false

  return todayIST > closingIST
}

/**
 * Formats a closing date into a user-friendly string (e.g., "31 Oct 2026").
 */
export function formatClosingDate(closingDate?: string | Date | null): string | null {
  if (!closingDate) return null
  const d = typeof closingDate === 'string' ? new Date(closingDate) : closingDate
  if (!d || isNaN(d.getTime())) return null

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(d)
}

export interface JobClosingInfo {
  formatted: string
  isUrgent: boolean
  daysLeft: number
  urgencyText: string | null
}

/**
 * Calculates deadline metadata for presentation in cards and badges.
 */
export function getClosingDateInfo(closingDate?: string | Date | null): JobClosingInfo | null {
  if (!closingDate) return null
  const d = typeof closingDate === 'string' ? new Date(closingDate) : closingDate
  if (!d || isNaN(d.getTime())) return null

  const formatted = formatClosingDate(d)
  if (!formatted) return null

  const closingIST = getISTDateStr(d)
  const todayIST = getISTDateStr(new Date())
  if (!closingIST || !todayIST) return null

  const cParts = closingIST.split('-').map(Number)
  const tParts = todayIST.split('-').map(Number)
  const cUtc = Date.UTC(cParts[0], cParts[1] - 1, cParts[2])
  const tUtc = Date.UTC(tParts[0], tParts[1] - 1, tParts[2])
  const daysLeft = Math.round((cUtc - tUtc) / (24 * 3600 * 1000))

  if (daysLeft < 0) return null

  let urgencyText: string | null = null
  let isUrgent = false

  if (daysLeft === 0) {
    isUrgent = true
    urgencyText = 'Closes today'
  } else if (daysLeft === 1) {
    isUrgent = true
    urgencyText = '1 day left'
  } else if (daysLeft <= 3) {
    isUrgent = true
    urgencyText = `${daysLeft} days left`
  }

  return {
    formatted,
    isUrgent,
    daysLeft,
    urgencyText,
  }
}

