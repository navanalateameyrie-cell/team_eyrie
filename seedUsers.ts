import { getPayload } from 'payload'
import config from './src/payload.config'

async function run() {
  const payload = await getPayload({ config })

  const usersToCreate = [
    { email: 'tedev@gmail.com', password: 'dev@12345', name: 'Super Admin Dev', role: 'admin' },
    { email: 'admin@teameyrie.local', password: 'Admin@12345', name: 'Manager Admin', role: 'admin' }
  ]

  for (const user of usersToCreate) {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: user.email } }
    })
    
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role
        }
      })
      console.log(`Created user: ${user.email}`)
    } else {
      console.log(`User already exists: ${user.email}`)
    }
  }
  process.exit(0)
}
run()
