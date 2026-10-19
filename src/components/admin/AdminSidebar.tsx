'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@payloadcms/ui'
import styles from './AdminSidebar.module.scss'

// ─── Navigation Config ──────────────────────────────────────────────────────

const NAV_CONFIG = [
  {
    group: 'Master',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    items: [
      {
        label: 'Add New Staff',
        href: '/admin/collections/users/create',
        key: 'add-staff',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>`,
      },
      {
        label: 'Client Mapping',
        href: '/admin/client-mapping',
        key: 'client-mapping',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      },
    ],
  },
  {
    group: 'Administration',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    items: [
      {
        label: 'Users',
        href: '/admin/collections/users',
        key: 'users',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
      },
      {
        label: 'Site Settings',
        href: '/admin/globals/site-settings',
        key: 'site-settings',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
      },
    ],
  },
  {
    group: 'Content',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    items: [
      {
        label: 'Home Page',
        href: '/admin/globals/home-page',
        key: 'home-page',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      },
      {
        label: 'Page Banners',
        href: '/admin/globals/page-banners',
        key: 'page-banners',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
      },
      {
        label: 'Services',
        href: '/admin/collections/services',
        key: 'services',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
      },
      {
        label: 'Industries',
        href: '/admin/collections/industries',
        key: 'industries',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9.01" y2="6"/><line x1="15" y1="6" x2="15.01" y2="6"/><line x1="9" y1="10" x2="9.01" y2="10"/><line x1="15" y1="10" x2="15.01" y2="10"/><line x1="9" y1="14" x2="9.01" y2="14"/><line x1="15" y1="14" x2="15.01" y2="14"/><line x1="9" y1="18" x2="15" y2="18"/></svg>`,
      },
      {
        label: 'News & Articles',
        href: '/admin/collections/announcements',
        key: 'announcements',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
      },
      {
        label: 'Testimonials',
        href: '/admin/collections/testimonials',
        key: 'testimonials',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
      },
      {
        label: 'Case Studies',
        href: '/admin/collections/case-studies',
        key: 'case-studies',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
      },
      {
        label: 'Media',
        href: '/admin/collections/media',
        key: 'media',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
      },
      {
        label: 'Gallery',
        href: '/admin/collections/gallery',
        key: 'gallery',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
      },
    ],
  },
  {
    group: 'People',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    items: [
      {
        label: 'Team Members',
        href: '/admin/collections/team-members',
        key: 'team-members',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      },
      {
        label: 'Professionals',
        href: '/admin/collections/professionals',
        key: 'professionals',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>`,
      },
      {
        label: 'Offices',
        href: '/admin/collections/offices',
        key: 'offices',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
      },
    ],
  },
  {
    group: 'Recruitment',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    items: [
      {
        label: 'Overview',
        href: '/admin/globals/recruitment-overview',
        key: 'recruitment-overview',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
      },
      {
        label: 'Qualification Master',
        href: '/admin/collections/qualifications',
        key: 'qualifications',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
      },
      {
        label: 'Job Openings',
        href: '/admin/collections/jobs',
        key: 'jobs',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
      },
      {
        label: 'Applications',
        href: '/admin/collections/job-applications',
        key: 'job-applications',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
      },
    ],
  },
  {
    group: 'Enquiries',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    items: [
      {
        label: 'Contact Leads',
        href: '/admin/collections/contact-leads',
        key: 'contact-leads',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
      },
      {
        label: 'Appointments',
        href: '/admin/collections/appointments',
        key: 'appointments',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
      },
    ],
  },
  {
    group: 'Compliance',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    items: [
      {
        label: 'Compliance Calendar',
        href: '/admin/collections/compliance-events',
        key: 'compliance-events',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="12" cy="15" r="2"/></svg>`,
      },
      {
        label: 'Consent Logs',
        href: '/admin/collections/consent-logs',
        key: 'consent-logs',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
      },
      {
        label: 'Consent Settings',
        href: '/admin/globals/consent-settings',
        key: 'consent-settings',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
      },
    ],
  },
  {
    group: 'Users & Partners',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/></svg>`,
    items: [
      {
        label: 'Partner Registrations',
        href: '/admin/collections/partner-registrations',
        key: 'partner-registrations',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/></svg>`,
      },
    ],
  },
]

// ─── NavItem Component ───────────────────────────────────────────────────────

interface NavItemProps {
  label: string
  href: string
  icon: string
  isActive: boolean
  collapsed: boolean
  onClick: () => void
}

const NavItem: React.FC<NavItemProps> = ({ label, href, icon, isActive, collapsed, onClick }) => {
  return (
    <a
      href={href}
      className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
      title={collapsed ? label : undefined}
      onClick={onClick}
    >
      <span
        className={styles.navIcon}
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      {!collapsed && <span className={styles.navLabel}>{label}</span>}
      {collapsed && (
        <span className={styles.tooltip}>{label}</span>
      )}
    </a>
  )
}

// ─── NavGroup Component ──────────────────────────────────────────────────────

interface NavGroupProps {
  group: string
  icon: string
  items: typeof NAV_CONFIG[0]['items']
  collapsed: boolean
  pathname: string
}

const NavGroup: React.FC<NavGroupProps> = ({
  group,
  icon,
  items,
  collapsed,
  pathname,
}) => {
  const hasActive = items.some(item => pathname.includes(item.key))
  const [open, setOpen] = useState(hasActive)

  useEffect(() => {
    if (hasActive) setOpen(true)
  }, [hasActive])

  const toggleGroup = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!collapsed) setOpen(prev => !prev)
  }

  return (
    <div className={`${styles.navGroup} ${open && !collapsed ? styles.navGroupOpen : ''}`}>
      <button
        className={`${styles.groupHeader} ${hasActive ? styles.groupHeaderActive : ''}`}
        onClick={toggleGroup}
        title={collapsed ? group : undefined}
        aria-expanded={open && !collapsed}
      >
        <span className={styles.groupIcon} dangerouslySetInnerHTML={{ __html: icon }} />
        {!collapsed && (
          <>
            <span className={styles.groupLabel}>{group}</span>
            <span className={`${styles.groupChevron} ${open ? styles.groupChevronOpen : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </>
        )}
        {collapsed && <span className={styles.tooltip}>{group}</span>}
      </button>

      {/* Collapsed: show all items as icon-only */}
      {collapsed && (
        <div className={styles.collapsedItems}>
          {items.map(item => (
            <NavItem
              key={item.key}
              label={item.label}
              href={item.href}
              icon={item.icon}
              isActive={pathname.includes(item.key)}
              collapsed={true}
              onClick={() => { }}
            />
          ))}
        </div>
      )}

      {/* Expanded: animate open/close */}
      {!collapsed && (
        <div
          className={styles.groupContent}
          style={{ maxHeight: open ? `${items.length * 52}px` : '0' }}
        >
          {items.map(item => (
            <NavItem
              key={item.key}
              label={item.label}
              href={item.href}
              icon={item.icon}
              isActive={pathname.includes(item.key)}
              collapsed={false}
              onClick={() => { }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main AdminSidebar Component ─────────────────────────────────────────────

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname()
  const { user } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Listen to viewport width
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      const tablet = window.innerWidth <= 1024 && window.innerWidth > 768
      setIsMobile(mobile)
      if (tablet) {
        setCollapsed(true)
      }
      if (!mobile) {
        setMobileOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Determine user role
  const role = user?.role || 'editor'
  const isSuperEmail = user?.email === 'tedev@gmail.com' || user?.email === 'admin@teameyrie.local'

  // Filter navigation based on role
  const filteredNavConfig = NAV_CONFIG.map(group => {
    if (role === 'super_admin' || role === 'admin' || isSuperEmail) {
      return group // Admin gets everything
    }

    if (role === 'staff') {
      const allowedStaffKeys = ['users', 'services', 'appointments', 'team-members', 'client-mapping', 'compliance-events', 'page-banners']
      const filteredItems = group.items.filter(item => allowedStaffKeys.includes(item.key))
      return { ...group, items: filteredItems }
    }

    // Default fallback for other roles, keep empty or minimal
    return { ...group, items: [] }
  }).filter(group => group.items.length > 0)

  // Emit collapsed state to <html> so _sidebar.scss can adjust the grid column
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-sidebar-collapsed',
      collapsed ? 'true' : 'false'
    )
    document.documentElement.setAttribute(
      'data-sidebar-mobile-open',
      mobileOpen ? 'true' : 'false'
    )
  }, [collapsed, mobileOpen])

  const isDashboard = pathname === '/admin' || pathname === '/admin/'

  return (
    <>
      {/* Mobile Floating Toggle Button */}
      <button
        type="button"
        className={styles.mobileToggleBtn}
        onClick={() => setMobileOpen(prev => !prev)}
        title={mobileOpen ? 'Close navigation' : 'Open navigation'}
        aria-label="Toggle navigation menu"
      >
        {mobileOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Backdrop for Mobile Drawer */}
      {mobileOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`te-sidebar ${styles.sidebar} ${collapsed && !isMobile ? styles.sidebarCollapsed : ''} ${mobileOpen ? styles.sidebarMobileOpen : ''}`}
        style={
          isMobile
            ? undefined
            : {
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100vh',
              width: collapsed ? '68px' : '260px',
              zIndex: 1001,
              transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
            }
        }
      >
        {/* ─── Header ─── */}
        <div className={styles.header}>
          <div className={styles.brand}>
            <div className={styles.brandLogo}>
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2L3 9v8c0 6.627 5.373 13 13 13s13-6.373 13-13V9L16 2z" fill="url(#brandGrad)" opacity="0.9" />
                <path d="M16 7l-8 4.5v5C8 20.5 11.582 24 16 24s8-3.5 8-7.5v-5L16 7z" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                <text x="16" y="21" textAnchor="middle" fontSize="11" fontWeight="800" fill="white" fontFamily="Arial">TE</text>
                <defs>
                  <linearGradient id="brandGrad" x1="3" y1="2" x2="29" y2="30">
                    <stop offset="0%" stopColor="#f26522" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            {(!collapsed || isMobile) && (
              <div className={styles.brandText}>
                <span className={styles.brandName}>TEAM EYRIE</span>
                <span className={styles.brandSub}>Admin Panel</span>
              </div>
            )}
          </div>
          <button
            className={styles.collapseBtn}
            onClick={() => {
              if (isMobile) {
                setMobileOpen(false)
              } else {
                setCollapsed(prev => !prev)
              }
            }}
            title={isMobile ? 'Close navigation' : collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {isMobile ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : collapsed ? (
                <polyline points="9 18 15 12 9 6" />
              ) : (
                <polyline points="15 18 9 12 15 6" />
              )}
            </svg>
          </button>
        </div>

        {/* ─── Dashboard Link ─── */}
        <div className={styles.dashboardLink}>
          <a
            href="/admin"
            className={`${styles.dashItem} ${isDashboard ? styles.dashItemActive : ''}`}
            title={collapsed && !isMobile ? 'Dashboard' : undefined}
            onClick={() => {
              if (isMobile) setMobileOpen(false)
            }}
          >
            <span className={styles.navIcon} dangerouslySetInnerHTML={{
              __html: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`
            }} />
            {(!collapsed || isMobile) && <span className={styles.navLabel}>Dashboard</span>}
            {collapsed && !isMobile && <span className={styles.tooltip}>Dashboard</span>}
          </a>
        </div>

        {/* ─── Divider ─── */}
        <div className={styles.divider} />

        {/* ─── Navigation Groups ─── */}
        <nav className={styles.nav}>
          {filteredNavConfig.map(group => (
            <NavGroup
              key={group.group}
              group={group.group}
              icon={group.icon}
              items={group.items}
              collapsed={collapsed && !isMobile}
              pathname={pathname}
            />
          ))}
        </nav>

        {/* ─── Footer ─── */}
        <div className={styles.footer}>
          <div className={styles.divider} />
          <a
            href="/admin/account"
            className={styles.footerAccount}
            title={collapsed ? 'Account Settings' : undefined}
          >
            <div className={styles.avatar}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            {!collapsed && (
              <div className={styles.accountInfo}>
                <span className={styles.accountName}>{user?.name || 'User'}</span>
                <span className={styles.accountRole}>
                  {user?.email === 'tedev@gmail.com' ? 'Super Admin' :
                    user?.email === 'admin@teameyrie.local' ? 'Manager' :
                      user?.role === 'admin' ? 'Manager' :
                        user?.role === 'staff' ? 'Staff' : 'User'}
                </span>
              </div>
            )}
            {collapsed && <span className={styles.tooltip}>Account</span>}
          </a>
          <a href="/admin/logout" className={styles.logoutBtn} title="Logout">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {!collapsed && <span>Logout</span>}
          </a>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar
