import type { Access, FieldAccess } from 'payload'

type Role = 'super_admin' | 'admin' | 'editor' | 'recruiter' | 'staff' | 'client'
type MaybeUser = { role?: Role } | null | undefined

export const isAdmin: Access = ({ req: { user } }) => {
  const role = (user as MaybeUser)?.role;
  return role === 'super_admin' || role === 'admin';
}

export const isStaff: Access = ({ req: { user } }) => Boolean(user)

export const isEditor: Access = ({ req: { user } }) => {
  const role = (user as MaybeUser)?.role
  return role === 'super_admin' || role === 'admin' || role === 'editor' || role === 'recruiter' || Boolean(user)
}

export const isRecruiter: Access = ({ req: { user } }) => {
  const role = (user as MaybeUser)?.role
  return role === 'super_admin' || role === 'admin' || role === 'recruiter' || role === 'editor' || Boolean(user)
}

export const anyone: Access = () => true

export const isAdminField: FieldAccess = ({ req: { user } }) => {
  const role = (user as MaybeUser)?.role;
  return role === 'super_admin' || role === 'admin';
}

export const isStaffField: FieldAccess = ({ req: { user } }) => Boolean(user)

export const isRecruiterField: FieldAccess = ({ req: { user } }) => {
  const role = (user as MaybeUser)?.role
  return role === 'super_admin' || role === 'admin' || role === 'recruiter' || role === 'editor' || Boolean(user)
}

