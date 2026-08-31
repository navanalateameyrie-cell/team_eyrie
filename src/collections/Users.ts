import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Administration',
  },
  access: {
    admin: ({ req: { user } }: any) => {
      if (!user) return false;
      return user.role !== 'client';
    },
    read: (({ req: { user } }: any) => {
      if (!user) return false
      const u = user as any
      if (u.role === 'super_admin' || u.role === 'admin') return true
      if (u.role === 'client') return { id: { equals: u.id } }
      if (u.role === 'staff') {
        return {
          or: [
            { id: { equals: u.id } },
            { 'clientServices.assignedProfessional': { equals: u.id } }
          ]
        }
      }
      return { id: { equals: u.id } }
    }) as any,
    create: ({ req: { user } }) => {
      if (!user) return false
      const u = user as any
      return u.role === 'super_admin' || u.role === 'admin'
    },
    update: (({ req: { user } }: any) => {
      if (!user) return false
      const u = user as any
      if (u.role === 'super_admin' || u.role === 'admin') return true
      return { id: { equals: u.id } }
    }) as any,
    delete: ({ req: { user } }) => {
      if (!user) return false
      const u = user as any
      return u.role === 'super_admin'
    },
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        // Auto-create team member profile for new staff
        if (operation === 'create' && doc.role === 'staff') {
          try {
            await req.payload.create({
              collection: 'team-members',
              data: {
                name: doc.name,
                designation: 'Staff Member',
                contact: {
                  email: doc.email,
                }
              }
            })
            req.payload.logger.info(`Created team-member profile for new staff: ${doc.name}`)
          } catch (err) {
            req.payload.logger.error({ err }, 'Failed to create team member for new staff')
          }
        }

        if (operation === 'update' && doc.role === 'client') {
          const previousServices = previousDoc?.clientServices || [];
          const currentServices = doc?.clientServices || [];

          for (let i = 0; i < currentServices.length; i++) {
            const currentService = currentServices[i];
            const previousService = previousServices.find((ps: any) => ps.id === currentService.id);

            // Compare assignedProfessional strings (which are IDs)
            const currentProf = typeof currentService.assignedProfessional === 'object' ? currentService.assignedProfessional?.id : currentService.assignedProfessional;
            const prevProf = typeof previousService?.assignedProfessional === 'object' ? previousService.assignedProfessional?.id : previousService?.assignedProfessional;

            if (currentProf && currentProf !== prevProf) {
              try {
                // Fetch the staff and service details for the email
                const prof = await req.payload.findByID({ collection: 'users', id: currentProf });
                const serviceDoc = await req.payload.findByID({ collection: 'services', id: typeof currentService.service === 'object' ? currentService.service?.id : currentService.service });

                if (prof && serviceDoc) {
                  await req.payload.sendEmail({
                    to: doc.email,
                    subject: `Professional Assigned: ${serviceDoc.title}`,
                    html: `
                      <div style="font-family: Arial, sans-serif; color: #0A111F; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                        <div style="background-color: #0b1324; padding: 20px; text-align: center;">
                          <h2 style="color: #C09B5A; margin: 0;">Team Eyrie</h2>
                        </div>
                        <div style="padding: 30px;">
                          <h3 style="margin-top: 0;">Hello ${doc.name || 'Client'},</h3>
                          <p>We are pleased to inform you that <strong>${prof.name || 'a dedicated staff member'}</strong> has been assigned to handle your <strong>${serviceDoc.title}</strong> service engagement.</p>
                          <p>They will be reviewing your requirements and may request specific documents through your Client Portal.</p>
                          <p style="margin-top: 30px;">
                            <a href="http://localhost:3001/client-dashboard" style="background-color: #C09B5A; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">Access Client Portal</a>
                          </p>
                        </div>
                      </div>
                    `,
                  });
                }
              } catch (err) {
                req.payload.logger.error({ err }, 'Failed to send assigned professional email');
              }
            }
          }
        }
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'staff',
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Recruiter', value: 'recruiter' },
        { label: 'Client', value: 'client' },
        { label: 'Staff', value: 'staff' },
      ],
      validate: (val: any, { req, data }: any) => {
        if (req?.user?.email === 'admin@teameyrie.local') {
          if (val === 'admin' || val === 'editor' || val === 'recruiter') {
            return 'As a Manager, you are only authorized to assign the Staff or Client roles.'
          }
        }
        return true
      },
    },
    // Client-specific profile fields
    { name: 'phone', type: 'text' },
    { name: 'pan', type: 'text', label: 'PAN Number' },
    { name: 'aadhaar', type: 'text', label: 'Aadhaar Number' },
    {
      name: 'clientServices',
      type: 'array',
      label: 'Service Engagements & Documents',
      admin: { condition: (data) => data.role === 'client' },
      fields: [
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          required: true,
          label: 'Selected Service',
        },
        {
          name: 'assignedProfessional',
          type: 'relationship',
          relationTo: 'users',
          label: 'Assigned Professional (Staff)',
          filterOptions: () => ({ role: { equals: 'staff' } }),
          admin: {
            description: 'The staff member handling this service for the client.',
          },
        },
        {
          name: 'documents',
          type: 'array',
          label: 'Service Documents',
          fields: [
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Document File',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Document Title / Description',
            },
            {
              name: 'uploadedBy',
              type: 'select',
              options: [
                { label: 'Client', value: 'client' },
                { label: 'Staff/Admin', value: 'staff' },
              ],
              defaultValue: 'client',
              label: 'Uploaded By',
            },
            {
              name: 'uploadDate',
              type: 'date',
              label: 'Upload Date',
            },
          ],
        },
      ],
    },
  ],
}
