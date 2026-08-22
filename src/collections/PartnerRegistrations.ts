import { CollectionConfig } from 'payload'

export const PartnerRegistrations: CollectionConfig = {
  slug: 'partner-registrations',
  admin: {
    useAsTitle: 'name',
    group: 'Users & Partners',
    description: 'Partner registration requests',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'designation',
      type: 'text',
      required: true,
      label: 'Designation',
    },
    {
      name: 'aadhaar',
      type: 'text',
      required: true,
      label: 'Aadhaar Number',
    },
    {
      name: 'pan',
      type: 'text',
      required: true,
      label: 'PAN Number',
    },
    {
      name: 'mobile',
      type: 'text',
      required: true,
      label: 'Mobile Number',
    },
    {
      name: 'companyName',
      type: 'text',
      required: true,
      label: 'Company Name',
    },
    {
      name: 'sector',
      type: 'radio',
      required: true,
      label: 'Sector',
      options: [
        { label: 'Government', value: 'government' },
        { label: 'Private', value: 'private' },
      ],
    },
    {
      name: 'gst',
      type: 'text',
      label: 'GST Number',
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
      label: 'Services',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'pending',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        if (operation === 'create') {
          try {
            await req.payload.sendEmail({
              to: 'contact@balakrishnaandco.com',
              subject: 'New Partner Registration',
              html: `
                <h3>New Partner Registration</h3>
                <p><strong>Name:</strong> ${doc.name}</p>
                <p><strong>Designation:</strong> ${doc.designation}</p>
                <p><strong>Company Name:</strong> ${doc.companyName}</p>
                <p><strong>Mobile:</strong> ${doc.mobile}</p>
                <p><strong>Email:</strong> ${doc.email}</p>
                <p><strong>Aadhaar:</strong> ${doc.aadhaar}</p>
                <p><strong>PAN:</strong> ${doc.pan}</p>
                <p><strong>Sector:</strong> ${doc.sector}</p>
                <p><strong>GST:</strong> ${doc.gst || 'N/A'}</p>
                <p>Please log in to the admin panel to review and approve this registration.</p>
              `,
            })
          } catch (err) {
            req.payload.logger.error({ err }, 'Failed to send new registration notification')
          }
        }

        if (operation === 'update' && previousDoc.status !== 'approved' && doc.status === 'approved') {
          try {
            await req.payload.sendEmail({
              to: doc.email,
              subject: 'Your Team Eyrie Partner Account is Active',
              html: `
                <h3>Welcome to Team Eyrie, ${doc.name}!</h3>
                <p>Your Partner registration has been approved.</p>
                <p>Your login is now active, and you can securely access the partner features on our site.</p>
                <br />
                <p>Best regards,<br/>Team Eyrie</p>
              `,
            })
          } catch (err) {
            req.payload.logger.error({ err }, 'Failed to send approval email')
          }
        }
      },
    ],
  },
}
