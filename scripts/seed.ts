import { getPayload } from 'payload'
import config from '@payload-config'
import { runSeed } from '../src/seed/seedData'

const run = async () => {
  const payload = await getPayload({ config })
  const log = await runSeed(payload)
  log.forEach((item) => payload.logger.info(item))

  payload.logger.info('Seed complete.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
