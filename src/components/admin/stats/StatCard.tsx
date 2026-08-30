import React from 'react';
import './StatCard.scss';

export interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, link }) => {
  const isGold = color.includes('C09B5A');
  return (
    <a href={link} className="dashboard-stat-card">
      <div className="stat-card-bg" style={{ background: color }}></div>
      <div className="stat-card-content">
        <div 
          className="stat-card-icon" 
          style={{ background: color, color: isGold ? '#0A111F' : '#ffffff' }}
        >
          {icon}
        </div>
        <div className="stat-card-info">
          <h3>{title}</h3>
          <h2>{value}</h2>
        </div>
      </div>
      <div className="stat-card-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </a>
  );
};
