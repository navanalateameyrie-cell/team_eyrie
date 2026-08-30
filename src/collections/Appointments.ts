import type { CollectionConfig } from 'payload'
import { anyone, isEditor } from '../access'

export const Appointments: CollectionConfig = {
  slug: 'appointments',
  admin: {
    useAsTitle: 'appointmentDate',
    defaultColumns: ['client', 'appointmentDate', 'status'],
    group: 'Client Portal',
  },
  access: {
    read: anyone, // Allow client to read their own
    create: anyone, // Allow client to create
    update: anyone, // Usually restricted, but keeping anyone for simplicity; hooks should enforce security
    delete: isEditor,
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        if (doc.status === 'confirmed' && previousDoc.status !== 'confirmed') {
          try {
            const clientId = typeof doc.client === 'string' ? doc.client : doc.client?.id;
            if (!clientId) return;
            const client = await req.payload.findByID({ collection: 'users', id: clientId });
            if (client && client.email) {
              const formattedDate = new Date(doc.appointmentDate).toLocaleString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                hour: 'numeric', minute: '2-digit'
              });
              
              await req.payload.sendEmail({
                to: client.email,
                subject: 'Your Appointment is Confirmed - Team Eyrie',
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
                    <h2 style="color: #0f192d;">Appointment Confirmed!</h2>
                    <p>Hello ${client.name || 'there'},</p>
                    <p>Your appointment has been successfully confirmed. We look forward to speaking with you!</p>
                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #C09B5A;">
                      <p style="margin: 0 0 10px 0;"><strong>Date & Time:</strong> ${formattedDate}</p>
                      <p style="margin: 0;"><strong>Status:</strong> <span style="color: #10b981;">Confirmed</span></p>
                    </div>
                    ${doc.adminNotes ? `<p style="padding: 15px; border: 1px solid #e2e8f0; border-radius: 6px; background: #fff;"><strong>Note from Admin:</strong><br/>${doc.adminNotes}</p>` : ''}
                    <p style="margin-top: 30px; font-size: 0.9em; color: #64748b;">Best regards,<br/><strong style="color: #0f192d;">Team Eyrie</strong></p>
                  </div>
                `
              });
            }
          } catch (error) {
            console.error('Error sending confirmation email:', error);
          }
        }
      }
    ]
  },
  fields: [
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'The client who booked the appointment.',
      }
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        description: 'The service this appointment is related to (optional).',
      }
    },
    {
      name: 'appointmentDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        }
      }
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending Approval', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Client Notes / Agenda',
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'Admin Internal Notes',
      admin: {
        description: 'Private notes for admins only.',
      }
    }
  ],
}
