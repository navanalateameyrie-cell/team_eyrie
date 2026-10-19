import type { CollectionConfig } from 'payload'
import { anyone, isRecruiter, isAdmin, isRecruiterField } from '../access'

export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  labels: { singular: 'Application', plural: 'Applications' },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'job', 'qualification', 'preferredLocation', 'stage', 'createdAt'],
    group: 'Recruitment',
  },
  access: {
    // Public can APPLY (create) but never read; recruiters manage.
    create: anyone,
    read: isRecruiter,
    update: isRecruiter,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'job',
      type: 'relationship',
      relationTo: 'jobs',
      required: true,
    },
    { name: 'jobTitle', type: 'text', label: 'Position / Role' },
    { name: 'fullName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'qualification', type: 'text', label: 'Professional Qualification' },
    { name: 'preferredLocation', type: 'text', label: 'Office Location' },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Uploaded résumé / CV (PDF or document).' },
    },
    { name: 'currentEmployer', type: 'text' },
    { name: 'totalExperience', type: 'number', label: 'Total experience (yrs)' },
    { name: 'noticePeriod', type: 'text' },
    { name: 'coverLetter', type: 'textarea' },
    { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
    {
      name: 'stage',
      type: 'select',
      defaultValue: 'new',
      admin: { position: 'sidebar', description: 'Recruitment pipeline stage.' },
      access: { create: isRecruiterField, update: isRecruiterField },
      options: [
        { label: 'New', value: 'new' },
        { label: 'Shortlisted', value: 'shortlisted' },
        { label: 'Interview', value: 'interview' },
        { label: 'Offer', value: 'offer' },
        { label: 'Hired', value: 'hired' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: { position: 'sidebar' },
      access: { create: isRecruiterField, update: isRecruiterField },
    },
    {
      name: 'notes',
      type: 'array',
      admin: { description: 'Internal recruiter notes / interview feedback.' },
      access: { create: isRecruiterField, update: isRecruiterField, read: isRecruiterField },
      fields: [
        { name: 'note', type: 'textarea', required: true },
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
          admin: { readOnly: true },
        },
      ],
    },
    // ---- DPDP consent (captured server-side by /apply) ----
    {
      name: 'consentStatus',
      type: 'select',
      defaultValue: 'active',
      admin: { position: 'sidebar', description: 'DPDP consent state.', readOnly: true },
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Withdrawn', value: 'withdrawn' },
      ],
    },
    { name: 'withdrawnAt', type: 'date', admin: { position: 'sidebar', readOnly: true } },
    {
      type: 'collapsible',
      label: 'Consent record (DPDP)',
      admin: { initCollapsed: true },
      fields: [
        { name: 'consentGiven', type: 'checkbox', defaultValue: false, admin: { readOnly: true } },
        { name: 'consentAt', type: 'date', admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } } },
        { name: 'consentVersion', type: 'text', admin: { readOnly: true } },
        {
          name: 'consentTextSnapshot',
          type: 'textarea',
          admin: { readOnly: true, description: 'Immutable copy of the exact notice the candidate agreed to (Safeguard 1).' },
        },
        { name: 'consentIp', type: 'text', admin: { readOnly: true } },
        { name: 'consentUserAgent', type: 'text', admin: { readOnly: true } },
      ],
    },
    {
      name: 'withdrawalToken',
      type: 'text',
      index: true,
      admin: { hidden: true },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        // Public applications always start at "new"; force it on create.
        if (operation === 'create' && !req.user) {
          return { ...data, stage: 'new' }
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        // Trigger email notification when the application stage is updated by the admin
        if (operation === 'update' && previousDoc.stage !== doc.stage) {
          try {
            let subject = 'Update on your Job Application at Team Eyrie'
            let body = `<h3>Update on your application</h3><p>Hi ${doc.fullName},</p>`
            
            if (doc.stage === 'shortlisted') {
              body += `<p>Great news! Your application has been shortlisted. Our recruitment team will contact you shortly regarding the next steps.</p>`
            } else if (doc.stage === 'interview') {
              body += `<p>We would like to invite you for an interview. Our team will reach out to schedule a convenient time.</p>`
            } else if (doc.stage === 'offer') {
              body += `<p>Congratulations! We are thrilled to extend an offer to you. Please check your emails for the official offer details.</p>`
            } else if (doc.stage === 'hired') {
              body += `<p>Welcome to Team Eyrie! Your hiring process is now complete.</p>`
            } else if (doc.stage === 'rejected') {
              body += `<p>Thank you for your interest in joining Team Eyrie. After careful consideration, we have decided to move forward with other candidates at this time. We will keep your profile on file for future opportunities.</p>`
            } else {
              body += `<p>Your application status has been updated to: <strong>${doc.stage}</strong>.</p>`
            }

            body += `<br /><p>Best regards,<br/>Team Eyrie Recruitment Team</p>`

            await req.payload.sendEmail({
              to: doc.email,
              subject,
              html: body,
            })
          } catch (err) {
            req.payload.logger.error({ err }, 'Failed to send applicant status email')
          }
        }
      },
    ],
  },
}
