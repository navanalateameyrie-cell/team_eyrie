import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function run() {
  const payload = await getPayload({ config: configPromise })
  
  const partners = await payload.find({
    collection: 'partner-registrations',
    limit: 100
  })
  
  for (const partner of partners.docs) {
    if (partner.status === 'approved' && partner.password) {
      const users = await payload.find({
        collection: 'users',
        where: { email: { equals: partner.email } }
      })
      
      if (users.docs.length > 0) {
        const user = users.docs[0]
        console.log(`Updating password for ${user.email}`)
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            password: partner.password
          }
        })
      }
    }
  }
  console.log('Done fixing passwords!')
  process.exit(0)
}

run()
