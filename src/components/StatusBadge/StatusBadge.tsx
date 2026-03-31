import React from 'react';
import { Badge } from 'react-bootstrap';
import './StatusBadge.css';

export type StatusType = 
  | 'active' | 'inactive' | 'pending' | 'processing' | 'shipped' | 'delivered' 
  | 'cancelled' | 'completed' | 'ongoing' | 'upcoming' | 'draft' | 'outofstock'
  | 'success' | 'warning' | 'danger' | 'info' | 'secondary'
  | 'failed' | 'refunded';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

const statusConfig: Record<StatusType, { bg: string; label: string }> = {
  active: { bg: 'success', label: 'Active' },
  inactive: { bg: 'secondary', label: 'Inactive' },
  pending: { bg: 'warning', label: 'Pending' },
  processing: { bg: 'info', label: 'Processing' },
  shipped: { bg: 'primary', label: 'Shipped' },
  delivered: { bg: 'success', label: 'Delivered' },
  cancelled: { bg: 'danger', label: 'Cancelled' },
  completed: { bg: 'success', label: 'Completed' },
  ongoing: { bg: 'success', label: 'Ongoing' },
  upcoming: { bg: 'info', label: 'Upcoming' },
  draft: { bg: 'secondary', label: 'Draft' },
  outofstock: { bg: 'danger', label: 'Out of Stock' },
  success: { bg: 'success', label: 'Success' },
  warning: { bg: 'warning', label: 'Warning' },
  danger: { bg: 'danger', label: 'Danger' },
  info: { bg: 'info', label: 'Info' },
  secondary: { bg: 'secondary', label: 'Secondary' },
  failed: { bg: 'danger', label: 'Failed' },
  refunded: { bg: 'info', label: 'Refunded' }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  className = ''
}) => {
  const config = statusConfig[status] || statusConfig.secondary;
  
  return (
    <Badge bg={config.bg} className={`status-badge ${className}`}>
      {label || config.label}
    </Badge>
  );
};

interface StatusPillProps {
  status: StatusType;
  label?: string;
  className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  label,
  className = ''
}) => {
  const config = statusConfig[status] || statusConfig.secondary;
  
  const pillColors: Record<string, string> = {
    success: '#198754',
    warning: '#ffc107',
    danger: '#dc3545',
    info: '#0dcaf0',
    primary: '#0d6efd',
    secondary: '#6c757d'
  };

  const color = pillColors[config.bg] || pillColors.secondary;
  
  return (
    <span 
      className={`status-pill ${className}`}
      style={{ 
        backgroundColor: `${color}20`, 
        color: color,
        border: `1px solid ${color}40`
      }}
    >
      {label || config.label}
    </span>
  );
};
