import React from 'react';
import { Card } from 'react-bootstrap';
import './StatsCard.css';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  variant = 'primary',
  trend,
  className = ''
}) => {
  const variantColors = {
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#198754',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#0dcaf0'
  };

  return (
    <Card className={`stats-card ${className}`}>
      <Card.Body className="d-flex align-items-center">
        {icon && (
          <div 
            className="stats-icon me-3"
            style={{ backgroundColor: `${variantColors[variant]}20`, color: variantColors[variant] }}
          >
            <i className={`bi ${icon}`}></i>
          </div>
        )}
        <div className="flex-grow-1">
          <p className="stats-title mb-1">{title}</p>
          <h3 className="stats-value mb-0" style={{ color: variantColors[variant] }}>
            {value}
          </h3>
          {trend && (
            <small className={`trend ${trend.isPositive ? 'text-success' : 'text-danger'}`}>
              <i className={`bi bi-arrow-${trend.isPositive ? 'up' : 'down'}`}></i>
              {Math.abs(trend.value)}%
            </small>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
