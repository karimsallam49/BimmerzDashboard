import './DirectshipPage.css';
import { X, Info, Filter, Download, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';

export const DirectshipPage = () => {
  return (
    <div className="directship-container">
      {/* Alert Banners */}
      <div className="alert-banner warning-banner">
        <div className="alert-content">
          <div className="alert-icon-wrap warning-icon">
            <span className="exclamation-mark">!</span>
          </div>
          <span className="alert-text">You have an upcoming holiday on 19th March, please fulfill all your pending orders</span>
        </div>
        <button className="close-btn"><X size={14} color="#a16207" /></button>
      </div>

      <div className="alert-banner info-banner">
        <div className="alert-content">
          <div className="alert-icon-wrap info-icon">
            <Info size={14} color="#1d4ed8" />
          </div>
          <span className="alert-text">DirectShip is getting a new look soon! <a href="#" className="explore-link">Explore Now</a></span>
        </div>
        <button className="close-btn"><X size={14} color="#1d4ed8" /></button>
      </div>

      <div className="directship-content-card">
        {/* Header toolbar */}
        <div className="directship-toolbar">
          <div className="tabs-container">
            <div className="ds-tab active">Pending</div>
            <div className="ds-tab">Completed</div>
            <div className="ds-tab">Lost</div>
          </div>

          <div className="actions-container">
            <div className="status-tag">
              <span className="dot"></span> No Pending Shipments
            </div>
            
            <button className="ds-dropdown-btn">
              Sort by <ChevronDown size={14} color="#9ca3af" />
            </button>
            
            <button className="ds-btn">
              <Filter size={14} color="#4b5563" /> Filter
            </button>
            
            <button className="ds-btn">
              <Download size={14} color="#4b5563" /> Export
            </button>
            
            <button className="ds-dropdown-btn black-text">
              Order View <ChevronDown size={14} color="#4b5563" />
            </button>
          </div>
        </div>

        {/* Top Pagination */}
        <div className="ds-pagination-bar">
          <div className="pagination-controls">
            <button className="page-nav disabled"><ChevronLeft size={14} color="#d1d5db" /></button>
            <button className="page-num">1</button>
            <button className="page-nav disabled"><ChevronRight size={14} color="#d1d5db" /></button>
            <button className="per-page-selector">
              100 / page <ChevronDown size={14} color="#9ca3af" />
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="ds-table-header">
          <div className="th-col th-order">Order No.</div>
          <div className="th-col th-marketplace">Marketplace</div>
          <div className="th-col th-quantity">Quantity</div>
          <div className="th-col th-status">Status</div>
          <div className="th-col th-received">Received at</div>
        </div>

        {/* Empty State */}
        <div className="ds-empty-state">
          <div className="empty-icon-tray">
            {/* Minimal SVG representing the tray from the image */}
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 34H48V46C48 48.2091 46.2091 50 44 50H20C17.7909 50 16 48.2091 16 46V34Z" fill="#f3f4f6"/>
              <path d="M22 28H42V38H22V28Z" fill="#ffffff" stroke="#f3f4f6" strokeWidth="2"/>
              <path d="M16 34L22 26H42L48 34" fill="#f9fafb" stroke="#f3f4f6" strokeWidth="1"/>
              <rect x="28" y="34" width="8" height="4" rx="2" fill="#ffffff" />
            </svg>
          </div>
          <p>No data</p>
        </div>

        {/* Bottom Pagination */}
        <div className="ds-pagination-bar">
          <div className="pagination-controls">
            <button className="page-nav disabled"><ChevronLeft size={14} color="#d1d5db" /></button>
            <button className="page-num">1</button>
            <button className="page-nav disabled"><ChevronRight size={14} color="#d1d5db" /></button>
            <button className="per-page-selector">
              100 / page <ChevronDown size={14} color="#9ca3af" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
