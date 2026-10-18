import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/documentation-suite',
        destination: 'https://apps.teameyrie.com/',
        permanent: false,
      },
      {
        source: '/knowledge-bank',
        destination: '/resource-center',
        permanent: true,
      },
    ]
  },
}

export default withPayload(nextConfig)

