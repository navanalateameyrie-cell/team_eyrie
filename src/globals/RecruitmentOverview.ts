import { GlobalConfig } from 'payload'

export const RecruitmentOverview: GlobalConfig = {
  slug: 'recruitment-overview',
  label: 'Overview Dashboard',
  admin: {
    group: 'Recruitment',
    components: {
      views: {
        edit: {
          default: {
            Component: '/components/admin/RecruitmentDashboard#RecruitmentDashboard',
          },
        },
      },
    },
  },
  access: {
    read: () => true,
    update: () => false,
  },
  fields: [
    {
      name: 'dummyField',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
}
