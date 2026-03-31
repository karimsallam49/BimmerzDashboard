import React from 'react';
import { Button } from 'react-bootstrap';
import './PageHeader.css';

interface ActionButton {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary' | 'success' | 'danger';
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ActionButton[];
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions = [],
  className = ''
}) => {
  return (
    <div className={`page-header d-flex justify-content-between align-items-center mb-4 ${className}`}>
      <div>
        <h2 className="page-title">{title}</h2>
        {subtitle && <p className="page-subtitle text-muted">{subtitle}</p>}
      </div>
      {actions.length > 0 && (
        <div className="header-actions d-flex gap-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'primary'}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.icon && <i className={`bi ${action.icon} me-2`}></i>}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
