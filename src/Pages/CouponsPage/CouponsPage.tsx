import './CouponsPage.css';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const CouponsPage = () => {
  return (
    <div className="coupons-page-container">
      <div className="coupons-header">
        <h1>Coupons</h1>
      </div>

      {/* Main Top Tabs */}
      <div className="coupons-top-tabs-container">
        <div className="coupons-top-tabs">
          <button className="top-tab-btn active">Clickable Coupons</button>
          <button className="top-tab-btn">Promo Codes</button>
          <button className="top-tab-btn">Imports</button>
        </div>
        
        <button className="learn-more-btn">
          <HelpCircle size={16} /> Learn more
        </button>
      </div>

      {/* Main Content Area */}
      <div className="coupons-main-content">
        <div className="coupons-card">
          
          {/* Inner Tabs */}
          <div className="inner-tabs">
            <button className="inner-tab-btn active">All Coupons</button>
            <button className="inner-tab-btn">My Coupons</button>
          </div>

          <div className="coupons-filters-bar">
            <span className="total-items-text">Total 0 items</span>
            
            <div className="filter-dropdowns">
              <div className="dropdown-btn status-dropdown">
                Status <ChevronDown size={16} color="#6b7280" />
              </div>
              <div className="dropdown-btn type-dropdown">
                Coupon type <ChevronDown size={16} color="#6b7280" />
              </div>
            </div>
          </div>

          {/* Table Header */}
          <div className="coupons-table-header">
            <div className="th-col th-name">Coupon name</div>
            <div className="th-col th-desc">Description</div>
            <div className="th-col th-date">Running date</div>
          </div>

          {/* Empty State */}
          <div className="coupons-empty-state">
            <div className="empty-icon-wrap">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 24V40C16 44.4183 19.5817 48 24 48H40C44.4183 48 48 44.4183 48 40V24" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 24H48L44 14H20L16 24Z" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M28 32H36" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p>No data</p>
          </div>

        </div>
      </div>
    </div>
  );
};
