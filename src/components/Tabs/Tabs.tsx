import React from 'react';
import './Tabs.css';

export interface TabItem {
  id: string;
  label: string;
  badge?: string;
  badgeVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
  rightContent?: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  className = '',
  rightContent
}) => {
  const variantClass = `tabs-${variant}`;

  return (
    <div className={`tabs-container ${variantClass} ${className}`}>
      <div className="tabs-wrapper">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
            onClick={() => !tab.disabled && onTabChange(tab.id)}
            disabled={tab.disabled}
          >
            {tab.label}
            {tab.badge && (
              <span className={`tab-badge bg-${tab.badgeVariant || 'primary'}`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      {rightContent && <div className="tabs-right-content">{rightContent}</div>}
    </div>
  );
};
