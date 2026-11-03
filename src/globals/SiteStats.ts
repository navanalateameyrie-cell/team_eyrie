import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'

/**
 * Site visit statistics, shown to admins in the top-right of the admin header.
 * `uniqueVisits` is incremented once per browser (see /api/track-visit, which
 * dedupes with the `te_visitor` cookie). Writes happen only from that route via
 * the local API with overrideAccess — never from the admin UI — so `update` is
 * closed and the fields are read-only. Hidden from the sidebar; surfaced via the
 * VisitCount header action instead.
 */
export const SiteStats: GlobalConfig = {
  slug: 'site-stats',
  admin: { group: 'Administration', hidden: true },
  access: { read: isAdmin, update: () => false },
  fields: [
    {
      name: 'uniqueVisits',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: { readOnly: true, description: 'Unique visitors (one per browser).' },
    },
    {
      name: 'lastVisitAt',
      type: 'date',
      admin: { readOnly: true, description: 'When the last new visitor was counted.' },
    },
  ],
}
