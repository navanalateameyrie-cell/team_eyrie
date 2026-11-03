import React from 'react'

import AdminSidebarClient from './AdminSidebar'
import CustomDashboardClient from './CustomDashboard'
import ClientMappingViewClient from './ClientMappingView'
import { LoginView as LoginViewClient } from './LoginView'

/**
 * Server shells for the custom admin components.
 *
 * WHY THESE EXIST
 * ---------------
 * Payload hands every custom Nav/view its server props — { payload, i18n,
 * user, permissions, params, searchParams, locale, ... }. Once localization is
 * enabled, `locale` is a Locale object that carries a `toString` METHOD:
 *
 *   { code: "en", label: "English", toString: function toString }
 *
 * All four custom components below are 'use client'. React cannot serialize a
 * function across the server/client boundary, so passing that object straight
 * into them throws:
 *
 *   Functions cannot be passed directly to Client Components unless you
 *   explicitly expose it by marking it with "use server".
 *
 * The whole admin panel then 500s after login. It only appeared once
 * localization was turned on, because before that `locale` was empty.
 *
 * These shells are Server Components, which may freely RECEIVE non-serializable
 * props — they simply do not forward them. Each renders its client component
 * with no props at all, which is what these components expect anyway: every one
 * of them fetches its own data through /api or holds local state.
 *
 * If a shell ever needs to pass something down, pass explicitly named
 * primitives (strings, numbers, plain objects) — never `{...props}`, and never
 * `locale` itself. Forward `locale.code`, not `locale`.
 */

/** Payload's server props. Deliberately accepted and discarded. */
type AdminServerProps = Record<string, unknown>

export function AdminNav(_props: AdminServerProps) {
  return <AdminSidebarClient />
}

export function Dashboard(_props: AdminServerProps) {
  return <CustomDashboardClient />
}

export function ClientMapping(_props: AdminServerProps) {
  return <ClientMappingViewClient />
}

export function Login(_props: AdminServerProps) {
  return <LoginViewClient />
}
