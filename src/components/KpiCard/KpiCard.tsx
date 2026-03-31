import React from 'react';
import './KpiCard.css';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  footer?: string;
  icon?: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  footer,
  icon,
  className = '',
  size = 'medium'
}) => {
  return (
    <div className={`kpi-card kpi-card-${size} ${className}`}>
      <div className="kpi-card-header">
        <span className="kpi-card-title">{title}</span>
        {icon && <span className="kpi-card-icon">{icon}</span>}
      </div>
      <div className="kpi-card-value">{value}</div>
      {subtitle && <div className="kpi-card-subtitle">{subtitle}</div>}
      {trend && (
        <div className={`kpi-card-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
          {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
        </div>
      )}
      {footer && <div className="kpi-card-footer">{footer}</div>}
    </div>
  );
};

interface KpiPanelProps {
  children: React.ReactNode;
  className?: string;
}

export const KpiPanel: React.FC<KpiPanelProps> = ({ children, className = '' }) => {
  return <div className={`kpi-panel ${className}`}>{children}</div>;
};
