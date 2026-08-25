import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const payload = await getPayload({ config: configPromise })
  
  const partners = await payload.find({
    collection: 'partner-registrations',
    limit: 100
  })
  
  const fixed = []
  
  for (const partner of partners.docs) {
    if (partner.status === 'approved' && partner.password) {
      const users = await payload.find({
        collection: 'users',
        where: { email: { equals: partner.email } }
      })
      
      if (users.docs.length > 0) {
        const user = users.docs[0]
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            password: partner.password
          }
        })
        fixed.push(user.email)
      }
    }
  }
  
  return NextResponse.json({ success: true, fixed })
}
