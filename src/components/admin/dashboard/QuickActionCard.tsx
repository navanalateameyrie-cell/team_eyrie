import React from 'react';
import './QuickActionCard.scss';

export interface QuickActionCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  link: string;
  bgColor: string;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({ title, icon, color, bgColor, link }) => {
  return (
    <a href={link} className="qa-card">
      <div className="qa-icon" style={{ background: bgColor, color: color }}>
        {icon}
      </div>
      <span>{title}</span>
    </a>
  );
};
