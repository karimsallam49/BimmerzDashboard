import './TransactionViewPage.css';
import { Download, Calendar, ChevronDown, Search, ChevronRight, ChevronLeft, Filter, ArrowUpDown } from 'lucide-react';

export const TransactionViewPage = () => {
  return (
    <div className="transaction-view-container">
      {/* Header */}
      <div className="transaction-header">
        <div className="transaction-title-area">
          <h1>Transaction View</h1>
          <p>View and track all your transactions</p>
        </div>
        <div className="transaction-header-actions">
          <button className="txn-btn-outline">
            <Calendar size={16} />
            Select Date Range
            <ChevronDown size={14} />
          </button>
          <button className="txn-btn-primary">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="transaction-stats-row">
        <div className="txn-stat-card">
          <span className="stat-label">Total Transactions</span>
          <span className="stat-value">0</span>
        </div>
        <div className="txn-stat-card">
          <span className="stat-label">Total Credits</span>
          <span className="stat-value">EGP 0.00</span>
        </div>
        <div className="txn-stat-card">
          <span className="stat-label">Total Debits</span>
          <span className="stat-value">EGP 0.00</span>
        </div>
        <div className="txn-stat-card">
          <span className="stat-label">Net Balance</span>
          <span className="stat-value">EGP 0.00</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="transaction-toolbar">
        <div className="txn-search-box">
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="Search by transaction ID or order ID..." />
        </div>

        <div className="txn-filters">
          <button className="txn-filter-btn">
            Transaction Type <ChevronDown size={14} />
          </button>
          <button className="txn-filter-btn">
            Status <ChevronDown size={14} />
          </button>
          <button className="txn-filter-btn active">
            <Filter size={14} /> Filter
          </button>
        </div>

        <div className="txn-actions">
          <button className="txn-action-btn">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="transaction-table-container">
        {/* Table Header */}
        <div className="txn-table-header">
          <div className="th-col th-checkbox">
            <input type="checkbox" />
          </div>
          <div className="th-col th-date">Date <ArrowUpDown size={12} /></div>
          <div className="th-col th-txn-id">Transaction ID</div>
          <div className="th-col th-order-id">Order ID</div>
          <div className="th-col th-type">Type</div>
          <div className="th-col th-description">Description</div>
          <div className="th-col th-credit">Credit</div>
          <div className="th-col th-debit">Debit</div>
          <div className="th-col th-balance">Balance</div>
          <div className="th-col th-status">Status</div>
        </div>

        {/* Empty State */}
        <div className="txn-empty-state">
          <div className="empty-icon-wrapper">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="25" width="40" height="35" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"/>
              <circle cx="30" cy="35" r="3" fill="#9ca3af"/>
              <circle cx="40" cy="35" r="3" fill="#9ca3af"/>
              <circle cx="50" cy="35" r="3" fill="#9ca3af"/>
              <path d="M25 45H55" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round"/>
              <path d="M25 50H45" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="60" cy="20" r="6" fill="#e5e7eb"/>
              <path d="M58 20H62" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h3>No transactions found</h3>
          <p>Try adjusting your date range or filters</p>
        </div>

        {/* Table Footer */}
        <div className="txn-table-footer">
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
