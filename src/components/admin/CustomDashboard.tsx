'use client';

import React, { useEffect, useState } from 'react';
import './CustomDashboard.scss';
import { StatCard } from './stats/StatCard';
import { QuickActionCard } from './dashboard/QuickActionCard';

const CustomDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    users: 0,
    jobs: 0,
    applications: 0,
    teamMembers: 0,
    enquiries: 0,
    appointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, jobsRes, appsRes, teamRes, enqRes, aptRes] = await Promise.all([
          fetch('/api/users?limit=1'),
          fetch('/api/jobs?limit=1'),
          fetch('/api/job-applications?limit=1'),
          fetch('/api/team-members?limit=1'),
          fetch('/api/contact-leads?limit=1'),
          fetch('/api/appointments?limit=1'),
        ]);

        const [users, jobs, apps, team, enq, apt] = await Promise.all([
          usersRes.json(),
          jobsRes.json(),
          appsRes.json(),
          teamRes.json(),
          enqRes.json(),
          aptRes.json(),
        ]);

        setStats({
          users: users.totalDocs || 0,
          jobs: jobs.totalDocs || 0,
          applications: apps.totalDocs || 0,
          teamMembers: team.totalDocs || 0,
          enquiries: enq.totalDocs || 0,
          appointments: apt.totalDocs || 0,
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Total Users',
      value: stats.users,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      ),
      color: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
      link: '/admin/collections/users'
    },
    {
      title: 'Active Jobs',
      value: stats.jobs,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
      ),
      color: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
      link: '/admin/collections/jobs'
    },
    {
      title: 'Job Applications',
      value: stats.applications,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      ),
      color: 'linear-gradient(135deg, #DB2777 0%, #F43F5E 100%)',
      link: '/admin/collections/job-applications'
    },
    {
      title: 'Staff & Team',
      value: stats.teamMembers,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      ),
      color: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
      link: '/admin/collections/team-members'
    },
    {
      title: 'Enquiries',
      value: stats.enquiries,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      ),
      color: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
      link: '/admin/collections/contact-leads'
    },
    {
      title: 'Appointments',
      value: stats.appointments,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      ),
      color: 'linear-gradient(135deg, #C09B5A 0%, #E6C181 100%)', // Team Eyrie Gold
      link: '/admin/collections/appointments'
    },
  ];

  if (loading) {
    return (
      <div className="custom-dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="custom-dashboard-wrapper">
      <div className="custom-dashboard-header">
        <h1>Welcome to Team Eyrie</h1>
        <p>Here is an overview of your platform metrics today.</p>
      </div>

      <div className="custom-dashboard-grid">
        {cards.map((card, idx) => (
          <StatCard
            key={idx}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            link={card.link}
          />
        ))}
      </div>

      <div className="custom-dashboard-quick-actions">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          <QuickActionCard
            title="New Appointment"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>}
            color="#C09B5A"
            bgColor="rgba(192,155,90,0.1)"
            link="/admin/collections/appointments/create"
          />
          <QuickActionCard
            title="Add User"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>}
            color="#2563EB"
            bgColor="rgba(37,99,235,0.1)"
            link="/admin/collections/users/create"
          />
          <QuickActionCard
            title="Post Job"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>}
            color="#059669"
            bgColor="rgba(5,150,105,0.1)"
            link="/admin/collections/jobs/create"
          />
          <QuickActionCard
            title="Edit Home Page"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 17 22 12"></polyline></svg>}
            color="#DB2777"
            bgColor="rgba(219,39,119,0.1)"
            link="/admin/globals/home-page"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomDashboard;
