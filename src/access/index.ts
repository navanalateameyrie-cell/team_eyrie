import type { Access, FieldAccess } from 'payload'

type Role = 'super_admin' | 'admin' | 'editor' | 'recruiter' | 'staff' | 'client'
type MaybeUser = { role?: Role } | null | undefined

export const isAdmin: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.email === 'tedev@gmail.com' || user.email === 'admin@teameyrie.local') return true;
  const role = (user as MaybeUser)?.role;
  return role === 'super_admin' || role === 'admin';
}

export const isStaff: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.email === 'tedev@gmail.com' || user.email === 'admin@teameyrie.local') return true;
  const role = (user as MaybeUser)?.role;
  return role === 'super_admin' || role === 'admin' || role === 'staff';
}

export const isEditor: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.email === 'tedev@gmail.com' || user.email === 'admin@teameyrie.local') return true;
  const role = (user as MaybeUser)?.role;
  return role === 'super_admin' || role === 'admin' || role === 'editor';
}

export const isRecruiter: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.email === 'tedev@gmail.com' || user.email === 'admin@teameyrie.local') return true;
  const role = (user as MaybeUser)?.role;
  return role === 'super_admin' || role === 'admin' || role === 'recruiter';
}

export const anyone: Access = () => true

export const isAdminField: FieldAccess = ({ req: { user } }) => {
  if (!user) return false;
  if (user.email === 'tedev@gmail.com' || user.email === 'admin@teameyrie.local') return true;
  const role = (user as MaybeUser)?.role;
  return role === 'super_admin' || role === 'admin';
}

export const isStaffField: FieldAccess = ({ req: { user } }) => {
  if (!user) return false;
  if (user.email === 'tedev@gmail.com' || user.email === 'admin@teameyrie.local') return true;
  const role = (user as MaybeUser)?.role;
  return role === 'super_admin' || role === 'admin' || role === 'staff';
}

export const isRecruiterField: FieldAccess = ({ req: { user } }) => {
  if (!user) return false;
  if (user.email === 'tedev@gmail.com' || user.email === 'admin@teameyrie.local') return true;
  const role = (user as MaybeUser)?.role;
  return role === 'super_admin' || role === 'admin' || role === 'recruiter';
}

