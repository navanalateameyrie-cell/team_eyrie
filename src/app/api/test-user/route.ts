import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET(req: Request) {
  const payload = await getPayload({ config: configPromise })
  
  const users = await payload.find({
    collection: 'users',
    where: { role: { equals: 'client' } },
    showHiddenFields: true
  })
  
  return NextResponse.json({
    users: users.docs.map(u => ({ id: u.id, email: u.email, role: u.role, hash: (u as any).hash ? 'exists' : 'missing' })),
  })
}
