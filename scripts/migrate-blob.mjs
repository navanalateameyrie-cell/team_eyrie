import fs from 'fs'
import path from 'path'
import { put } from '@vercel/blob'

// Usage: node scripts/migrate-blob.mjs <NEW_BLOB_READ_WRITE_TOKEN>
const token = process.argv[2] || process.env.NEW_BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN

if (!token) {
  console.error('❌ Error: No Blob token provided!')
  console.error('Usage: node scripts/migrate-blob.mjs <NEW_BLOB_READ_WRITE_TOKEN>')
  process.exit(1)
}

const backupDir = path.resolve('blob_migration_backup')

if (!fs.existsSync(backupDir)) {
  console.error('❌ Error: blob_migration_backup directory not found!')
  process.exit(1)
}

const files = fs.readdirSync(backupDir).filter((f) => !f.startsWith('.'))

console.log(`🚀 Starting migration of ${files.length} files to new Vercel Blob store...`)

async function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase()
  if (['.jpg', '.jpeg'].includes(ext)) return 'image/jpeg'
  if (ext === '.png') return 'image/png'
  if (ext === '.webp') return 'image/webp'
  if (ext === '.mp4') return 'video/mp4'
  if (ext === '.pdf') return 'application/pdf'
  return 'application/octet-stream'
}

let completed = 0
let failed = 0

for (const file of files) {
  const filePath = path.join(backupDir, file)
  const buffer = fs.readFileSync(filePath)
  const mimeType = await getMimeType(file)

  try {
    const blob = await put(file, buffer, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 31536000,
      contentType: mimeType,
      token,
    })
    completed++
    console.log(`[${completed}/${files.length}] ✅ Uploaded: ${file} -> ${blob.url}`)
  } catch (err) {
    failed++
    console.error(`❌ Failed to upload ${file}:`, err.message)
  }
}

console.log('\n========================================')
console.log(`🎉 Migration Completed! Total: ${files.length}, Succeeded: ${completed}, Failed: ${failed}`)
console.log('========================================\n')

