import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, localeCodes } from './i18n/config'

/**
 * Locale routing with an "as-needed" prefix.
 *
 * The public site lives under app/(frontend)/[locale]/, but we do NOT want the
 * default locale to appear in the URL — /services must keep working exactly as
 * it did before this feature existed (no redirects, no lost inbound links, no
 * SEO churn). So an unprefixed request is *rewritten* (not redirected) onto the
 * default-locale branch of the route tree: the browser still sees /services
 * while Next renders /en/services.
 *
 * Prefixed requests (/kn/services) match the [locale] segment directly and are
 * passed through untouched.
 */

// Paths that must never be rewritten: Payload's admin UI and REST/GraphQL API,
// this app's own API routes, Next internals, and anything that looks like a
// static file (has a dot in the last segment).
const EXCLUDED_PREFIXES = ['/admin', '/api', '/_next', '/_vercel', '/media']

function isExcluded(pathname: string): boolean {
  if (EXCLUDED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return true
  const lastSegment = pathname.split('/').pop() || ''
  return lastSegment.includes('.')
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isExcluded(pathname)) return NextResponse.next()

  const firstSegment = pathname.split('/')[1]
  if ((localeCodes as string[]).includes(firstSegment)) {
    // Already locale-prefixed — nothing to do.
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Cheap first-pass filter so the middleware isn't invoked for static assets.
  // The isExcluded() check above is still authoritative.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
