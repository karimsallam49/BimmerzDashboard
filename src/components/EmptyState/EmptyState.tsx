import React from 'react';
import { Button } from 'react-bootstrap';
import './EmptyState.css';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionIcon?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'bi-box',
  title,
  description,
  actionLabel,
  actionIcon,
  onAction,
  className = ''
}) => {
  return (
    <div className={`empty-state-container ${className}`}>
      <i className={`bi ${icon} empty-state-icon`}></i>
      <h5 className="empty-state-title">{title}</h5>
      {description && <p className="empty-state-description">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionIcon && <i className={`bi ${actionIcon} me-2`}></i>}
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
