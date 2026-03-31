import './StatementsPage.css';
import { Download, Calendar, ChevronDown, Search, ChevronRight, ChevronLeft, Filter } from 'lucide-react';

export const StatementsPage = () => {
  return (
    <div className="statements-container">
      {/* Header */}
      <div className="statements-header">
        <div className="statements-title-area">
          <h1>Statements</h1>
          <p>View and download your payment statements</p>
        </div>
        <div className="statements-header-actions">
          <button className="stmt-btn-outline">
            <Calendar size={16} />
            Select Date Range
            <ChevronDown size={14} />
          </button>
          <button className="stmt-btn-primary">
            <Download size={16} />
            Download All
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="statements-stats-row">
        <div className="stmt-stat-card">
          <span className="stat-label">Total Payments</span>
          <span className="stat-value">EGP 0.00</span>
        </div>
        <div className="stmt-stat-card">
          <span className="stat-label">Total Orders</span>
          <span className="stat-value">0</span>
        </div>
        <div className="stmt-stat-card">
          <span className="stat-label">Total Fees</span>
          <span className="stat-value">EGP 0.00</span>
        </div>
        <div className="stmt-stat-card">
          <span className="stat-label">Net Payout</span>
          <span className="stat-value">EGP 0.00</span>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="statements-toolbar">
        <div className="stmt-search-box">
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="Search by statement ID..." />
        </div>

        <div className="stmt-filters">
          <button className="stmt-filter-btn">
            Status <ChevronDown size={14} />
          </button>
          <button className="stmt-filter-btn">
            Payment Method <ChevronDown size={14} />
          </button>
          <button className="stmt-filter-btn active">
            <Filter size={14} /> Filter
          </button>
        </div>

        <div className="stmt-actions">
          <button className="stmt-action-btn">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="statements-table-container">
        {/* Table Header */}
        <div className="stmt-table-header">
          <div className="th-col th-checkbox">
            <input type="checkbox" />
          </div>
          <div className="th-col th-id">Statement ID</div>
          <div className="th-col th-period">Period</div>
          <div className="th-col th-orders">Orders</div>
          <div className="th-col th-payments">Payments</div>
          <div className="th-col th-fees">Fees</div>
          <div className="th-col th-net">Net Amount</div>
          <div className="th-col th-status">Status</div>
          <div className="th-col th-actions">Actions</div>
        </div>

        {/* Empty State */}
        <div className="stmt-empty-state">
          <div className="empty-icon-wrapper">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="30" width="40" height="30" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"/>
              <path d="M25 35L35 45L45 35" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="55" cy="25" r="8" fill="#e5e7eb"/>
              <path d="M52 25H58M55 22V28" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h3>No statements found</h3>
          <p>Try adjusting your filters or date range</p>
        </div>

        {/* Table Footer */}
        <div className="stmt-table-footer">
          <span className="total-text">Total 0 items</span>
          <div className="pagination">
            <button className="page-nav disabled">
              <ChevronLeft size={16} />
            </button>
            <button className="page-num active">1</button>
            <button className="page-nav disabled">
              <ChevronRight size={16} />
            </button>
            <button className="per-page-select">
              50 / page <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Tab */}
      <div className="feedback-tab-vertical">
        <span>Rate this page</span>
      </div>
    </div>
  );
};
