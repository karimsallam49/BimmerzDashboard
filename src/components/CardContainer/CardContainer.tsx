import React from 'react';
import { Card } from 'react-bootstrap';
import './CardContainer.css';

interface CardContainerProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  noPadding?: boolean;
}

export const CardContainer: React.FC<CardContainerProps> = ({
  title,
  subtitle,
  children,
  headerActions,
  className = '',
  bodyClassName = '',
  noPadding = false
}) => {
  return (
    <Card className={`card-container ${className}`}>
      {(title || subtitle || headerActions) && (
        <Card.Header className="card-container-header d-flex justify-content-between align-items-center">
          <div>
            {title && <h5 className="card-title mb-0">{title}</h5>}
            {subtitle && <small className="text-muted">{subtitle}</small>}
          </div>
          {headerActions && <div className="header-actions">{headerActions}</div>}
        </Card.Header>
      )}
      <Card.Body className={`${bodyClassName} ${noPadding ? 'p-0' : ''}`}>
        {children}
      </Card.Body>
    </Card>
  );
};
