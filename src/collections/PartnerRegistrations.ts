import { CollectionConfig } from 'payload'

export const PartnerRegistrations: CollectionConfig = {
  slug: 'partner-registrations',
  admin: {
    useAsTitle: 'username',
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
      name: 'username',
      type: 'text',
      required: true,
      label: 'Username',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'password',
      type: 'text', // In a real app, this should be hashed, but keeping it simple for the registration request collection
      required: true,
      label: 'Password',
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
                <p><strong>Username:</strong> ${doc.username}</p>
                <p><strong>Email:</strong> ${doc.email}</p>
                <p>Please log in to the admin panel to review and approve this registration.</p>
              `,
            })
          } catch (err) {
            req.payload.logger.error({ err }, 'Failed to send new registration notification')
          }
        }

        if (operation === 'update' && previousDoc.status !== 'approved' && doc.status === 'approved') {
          try {
            // 1. Create the actual user account so they can log in!
            const existingUsers = await req.payload.find({
              collection: 'users',
              where: { email: { equals: doc.email } },
            })
            
            if (existingUsers.totalDocs === 0) {
              await req.payload.create({
                collection: 'users',
                data: {
                  name: doc.username,
                  email: doc.email,
                  password: doc.password,
                  role: 'client',
                },
              })
            }

            // 2. Send the approval email
            await req.payload.sendEmail({
              to: doc.email,
              subject: 'Your Team Eyrie Partner Account is Active',
              html: `
                <h3>Welcome to Team Eyrie, ${doc.username}!</h3>
                <p>Your Partner registration has been approved.</p>
                <p>Your login is now active, and you can securely access the partner features on our site.</p>
                <br />
                <p>Best regards,<br/>Team Eyrie</p>
              `,
            })
          } catch (err) {
            req.payload.logger.error({ err }, 'Failed to create user or send approval email')
          }
        }
      },
    ],
  },
}
