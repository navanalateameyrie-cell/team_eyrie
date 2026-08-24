import { getPayload } from 'payload'
import config from './src/payload.config'

async function seed() {
  const payload = await getPayload({ config })
  
  try {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: 'test26@gmail.com' } }
    })
    
    if (existing.docs.length > 0) {
      console.log('Client already exists!')
      process.exit(0)
    }

    const user = await payload.create({
      collection: 'users',
      data: {
        name: 'Test Client',
        email: 'test26@gmail.com',
        password: 'test@140',
        role: 'client'
      }
    })
    console.log('Client seeded successfully!', user.email)
  } catch (err) {
    console.error('Error seeding client:', err)
  }
  process.exit(0)
}

seed()
