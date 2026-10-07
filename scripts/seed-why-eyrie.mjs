import pg from 'pg'
import crypto from 'crypto'

const { Pool } = pg

const connectionString =
  process.env.DATABASE_URL ||
  process.env.DATABASE_URI ||
  process.env.POSTGRES_URL

if (!connectionString) {
  console.error('No DATABASE_URL found in environment')
  process.exit(1)
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
})

const items = [
  {
    tag: 'Synergy',
    title: 'Collective Intelligence',
    description:
      'A powerful alliance of senior Chartered Accountants and multidisciplinary specialists delivering unified, high-impact solutions across all financial and regulatory domains.',
    image_url: '/images/indian-ca-boardroom.png',
    link: '/why-team-eyrie',
    link_label: 'Explore Network Advantage',
    show_on_home: true,
    bullets: [
      'Multi-firm advisory integration under one umbrella',
      '20+ senior partners with decades of combined practice',
      'Cross-disciplinary counsel spanning tax, audit & legal',
    ],
  },
  {
    tag: 'National Reach',
    title: 'Strong PAN-India Presence',
    description:
      'Strategically positioned across India’s premier financial and industrial corridors, offering clients seamless local accessibility backed by national institutional scale.',
    image_url: '/images/indian-business-bkc.png',
    link: '/presence',
    link_label: 'View Our Pan-India Offices',
    show_on_home: true,
    bullets: [
      'Hub offices in New Delhi, Chennai, Bengaluru & Salem',
      'Pan-India execution across major metro & tier-2 circuits',
      'Unified service quality standards nationwide',
    ],
  },
  {
    tag: 'Domain Depth',
    title: 'Specialised Sector Expertise',
    description:
      'Deep technical knowledge and hands-on advisory tailored across 17+ core industries, navigating complex regulatory shifts and industry-specific mandates.',
    image_url: '/images/industries.png',
    link: '/industries',
    link_label: 'Discover 17+ Sectors',
    show_on_home: true,
    bullets: [
      'Dedicated vertical practice heads for each sector',
      'Established regulatory precedent and NCLT/ITAT insights',
      'Customized enterprise frameworks for MSMEs to conglomerates',
    ],
  },
  {
    tag: 'Innovation',
    title: 'Technology-Driven Delivery',
    description:
      'Harnessing digital audit platforms, secure client collaboration portals, AI-assisted data analytics, and automated tax compliance for precision and speed.',
    image_url: '/images/services.png',
    link: '/services',
    link_label: 'Explore Tech-Enabled Services',
    show_on_home: true,
    bullets: [
      'Automated compliance tracking and audit trail verifications',
      'Secure, encrypted document exchange & client portals',
      'Data-driven financial modelling & Virtual CFO systems',
    ],
  },
  {
    tag: 'Integrity & Trust',
    title: 'Client-Centric Philosophy',
    description:
      'Built upon an uncompromising foundation of professional ethics, direct partner involvement, transparency, and long-term partnership with every client.',
    image_url: '/images/indian-advisory-team.png',
    link: '/about',
    link_label: 'Read Our Governance Principles',
    show_on_home: true,
    bullets: [
      'Direct, hands-on involvement of senior founding partners',
      'Proactive risk mitigation and compliance foresight',
      'Clear, transparent communication with measurable results',
    ],
  },
  {
    tag: 'Global Reach',
    title: 'Global Business Perspective',
    description:
      'Guiding enterprises, startups, and NRI investors through cross-border structuring, foreign direct investments (FDI), transfer pricing, and overseas expansion.',
    image_url: '/images/Why.png',
    link: '/services#global-business',
    link_label: 'Explore Cross-Border Advisory',
    show_on_home: true,
    bullets: [
      'Cross-border M&A, JV structuring, and FDI compliance',
      'Comprehensive FEMA, RBI, and international tax planning',
      'Dedicated NRI taxation, repatriation, and estate governance',
    ],
  },
]

async function seed() {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    console.log('Clearing existing Why Team Eyrie showcase data...')
    await client.query(`
      DELETE FROM home_page_why_eyrie_items_bullets
      WHERE _parent_id IN (SELECT id FROM home_page_why_eyrie_items WHERE _parent_id = 1);
    `)
    await client.query(`
      DELETE FROM home_page_why_eyrie_items
      WHERE _parent_id = 1;
    `)

    console.log('Ensuring home_page header fields are set...')
    await client.query(`
      UPDATE home_page
      SET
        why_eyrie_tagline = 'The Team Eyrie Advantage',
        why_eyrie_heading = 'Why Team Eyrie?',
        why_eyrie_subheading = 'A single umbrella combining senior leadership, multidisciplinary intelligence, and technology-assisted execution.'
      WHERE id = 1;
    `)

    console.log('Inserting 6 Why Team Eyrie items...')
    for (let i = 0; i < items.length; i++) {
      const it = items[i]
      const itemId = crypto.randomBytes(12).toString('hex')
      const order = i + 1

      await client.query(
        `INSERT INTO home_page_why_eyrie_items
          (id, _parent_id, _order, show_on_home, tag, title, description, image_url, link, link_label)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          itemId,
          1,
          order,
          it.show_on_home,
          it.tag,
          it.title,
          it.description,
          it.image_url,
          it.link,
          it.link_label,
        ]
      )

      for (let b = 0; b < it.bullets.length; b++) {
        const bulletId = crypto.randomBytes(12).toString('hex')
        const bulletOrder = b + 1
        await client.query(
          `INSERT INTO home_page_why_eyrie_items_bullets
            (id, _parent_id, _order, text)
           VALUES ($1, $2, $3, $4)`,
          [bulletId, itemId, bulletOrder, it.bullets[b]]
        )
      }
    }

    await client.query('COMMIT')
    console.log('Seeding transaction committed successfully!')

    const itemsCount = await client.query('SELECT count(*) FROM home_page_why_eyrie_items')
    const bulletsCount = await client.query('SELECT count(*) FROM home_page_why_eyrie_items_bullets')
    console.log(`Verification: ${itemsCount.rows[0].count} items and ${bulletsCount.rows[0].count} bullets in DB.`)
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Seeding error, rolled back:', err)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

seed()
