import type { Payload } from 'payload'

export interface RoleQualificationSeed {
  roleTitle: string
  department: string
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship'
  experienceMin: number
  experienceMax: number
  summary: string
  order?: number
  qualifications: {
    name: string
    description?: string
  }[]
}

export const ROLE_QUALIFICATIONS_DATA: RoleQualificationSeed[] = [
  {
    roleTitle: 'Company secretary Articles/Interns',
    order: 1,
    department: 'Corporate & Regulatory Advisory',
    employmentType: 'internship',
    experienceMin: 0,
    experienceMax: 1,
    summary:
      'ICSI Articleship and internship training covering secretarial audits, MCA V3 compliances, board documentation, and regulatory filings under senior CS guidance.',
    qualifications: [
      { name: 'CS Executive Completed' },
      { name: 'CS Professional Completed' },
    ],
  },
  {
    roleTitle: 'Corporate & Secretarial Compliance Manager',
    order: 2,
    department: 'Corporate & Regulatory Advisory',
    employmentType: 'full-time',
    experienceMin: 3,
    experienceMax: 7,
    summary:
      'Oversee company law compliance, secretarial audits, RBI/FEMA reporting, and ROC filings for domestic and cross-border entities.',
    qualifications: [
      { name: 'ACS Qualified' },
      { name: 'CS Intermediate experiance - 3 years above' },
    ],
  },
  {
    roleTitle: 'Virtual CFO & Business Consulting Lead',
    order: 3,
    department: 'Business Consulting',
    employmentType: 'full-time',
    experienceMin: 5,
    experienceMax: 10,
    summary:
      'Drive strategic financial planning, cash flow optimization, financial modeling, and Virtual CFO services for growth-stage companies.',
    qualifications: [
      { name: 'CA/CMA Qualified' },
      { name: 'MBA Qualified' },
    ],
  },
  {
    roleTitle: 'Articleship Trainee / CA Article Assistant',
    order: 4,
    department: 'Multi-disciplinary Practice',
    employmentType: 'internship',
    experienceMin: 0,
    experienceMax: 1,
    summary:
      'Gain hands-on practical exposure across Statutory Audit, Tax Advisory, GST Filings, and Corporate Law under senior CA mentors.',
    qualifications: [
      { name: 'CA Intermediate Completed' },
    ],
  },
  {
    roleTitle: 'GST & Indirect Taxation Specialist',
    order: 5,
    department: 'GST & Indirect Taxes',
    employmentType: 'full-time',
    experienceMin: 1,
    experienceMax: 4,
    summary:
      'Manage GST compliance, health checks, export refunds, departmental audit support, and advisory for enterprise clients.',
    qualifications: [
      { name: 'CA/CMA Qualified' },
      { name: 'CA/CMA Inter Qualified' },
    ],
  },
  {
    roleTitle: 'Direct Tax Advisory — Senior Associate',
    order: 6,
    department: 'Tax Advisory',
    employmentType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    summary:
      'Deliver end-to-end direct tax advisory, corporate tax compliance, income tax litigation support, and international tax structuring.',
    qualifications: [
      { name: 'CA/CMA Qualified' },
    ],
  },
  {
    roleTitle: 'Audit & Assurance — Manager',
    order: 7,
    department: 'Assurance & Audit',
    employmentType: 'full-time',
    experienceMin: 3,
    experienceMax: 6,
    summary:
      'Lead statutory, internal, and tax audit engagements for a diverse portfolio of corporate clients across manufacturing, finance, and healthcare.',
    qualifications: [
      { name: 'CA/CMA Intermediate Completed' },
    ],
  },
  {
    roleTitle: 'HR Manager',
    order: 8,
    department: 'Human Resources & Talent Management',
    employmentType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    summary:
      'Lead talent acquisition, article trainee engagement, employee relations, performance reviews, and human capital strategy.',
    qualifications: [
      { name: 'MBA HR' },
    ],
  },
  {
    roleTitle: 'Law Interns',
    order: 9,
    department: 'Legal Jurisprudence & Corporate Law',
    employmentType: 'internship',
    experienceMin: 0,
    experienceMax: 1,
    summary:
      'Engage in legal research, corporate contract drafting, litigation support, and regulatory representations before tribunals.',
    qualifications: [
      { name: 'LLB/LLM Pursuing' },
      { name: 'LLB/LLM Completed' },
    ],
  },
  {
    roleTitle: 'General Interns',
    order: 10,
    department: 'Operations & Business Support',
    employmentType: 'internship',
    experienceMin: 0,
    experienceMax: 1,
    summary:
      'Gain broad multi-disciplinary professional exposure across accounting operations, document administration, and client servicing.',
    qualifications: [
      { name: 'Any Degree' },
    ],
  },
]

export async function seedQualifications(payload: Payload) {
  try {
    let orderIndex = 1

    for (const item of ROLE_QUALIFICATIONS_DATA) {
      const roleOrder = item.order || (ROLE_QUALIFICATIONS_DATA.indexOf(item) + 1)

      // 1. Locate or create Job opening
      let jobRes = await payload.find({
        collection: 'jobs',
        where: {
          title: { equals: item.roleTitle },
        },
        limit: 1,
      })

      let jobId: string | number | undefined = jobRes.docs[0]?.id

      if (!jobId) {
        // Try case-insensitive or trimmed match
        const allJobs = await payload.find({
          collection: 'jobs',
          limit: 100,
        })
        const matched = allJobs.docs.find(
          (j: any) =>
            j.title?.trim().toLowerCase() === item.roleTitle.trim().toLowerCase(),
        )
        if (matched) {
          jobId = matched.id
        } else {
          // Create job opening so all 10 jobs are active and mapped
          const newJob = await payload.create({
            collection: 'jobs',
            overrideAccess: true,
            data: {
              title: item.roleTitle,
              order: roleOrder,
              department: item.department,
              employmentType: item.employmentType,
              status: 'open',
              experienceMin: item.experienceMin,
              experienceMax: item.experienceMax,
              openings: item.employmentType === 'internship' ? 5 : 2,
              summary: item.summary,
              responsibilities: [
                { item: `Execute assigned duties and key initiatives for ${item.roleTitle}.` },
                { item: 'Collaborate with senior partners, practice leads, and client representatives.' },
              ],
              requirements: item.qualifications.map((q) => ({
                item: q.name,
              })),
            },
          })
          jobId = newJob.id
        }
      }

      // Ensure existing jobs have their display order synchronized
      if (jobId) {
        try {
          await payload.update({
            collection: 'jobs',
            id: jobId,
            overrideAccess: true,
            data: {
              order: roleOrder,
            },
          })
        } catch {
          // ignore
        }
      }

      // 2. Ensure each qualification exists in Qualification Master
      const qualIdsForJob: (string | number)[] = []

      for (const q of item.qualifications) {
        const existingQual = await payload.find({
          collection: 'qualifications',
          where: {
            and: [
              { name: { equals: q.name } },
              { roleName: { equals: item.roleTitle } },
            ],
          },
          limit: 1,
        })

        if (existingQual.totalDocs === 0) {
          const created = await payload.create({
            collection: 'qualifications',
            overrideAccess: true,
            data: {
              name: q.name,
              roleName: item.roleTitle,
              role: jobId ? (jobId as any) : undefined,
              description: q.description || `Required qualification for ${item.roleTitle}`,
              status: 'active',
              order: orderIndex++,
            },
          })
          qualIdsForJob.push(created.id)
        } else {
          const existingId = existingQual.docs[0].id
          qualIdsForJob.push(existingId)
          // Update mapped role if missing
          if (jobId && !existingQual.docs[0].role) {
            await payload.update({
              collection: 'qualifications',
              id: existingId,
              overrideAccess: true,
              data: {
                role: jobId as any,
              },
            })
          }
        }
      }

      // 3. Link qualifications to the job opening if not already linked
      if (jobId && qualIdsForJob.length > 0) {
        try {
          await payload.update({
            collection: 'jobs',
            id: jobId,
            overrideAccess: true,
            data: {
              qualifications: qualIdsForJob as any,
            },
          })
        } catch {
          // If update fails, continue
        }
      }
    }

    payload.logger.info('Qualification Master seeded and mapped successfully.')
  } catch (err) {
    payload.logger.error({ err }, 'Error seeding Qualification Master')
  }
}

