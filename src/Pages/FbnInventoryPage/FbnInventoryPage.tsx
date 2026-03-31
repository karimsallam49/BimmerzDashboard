import './FbnInventoryPage.css';
import { Search, ChevronDown, Download, Info, Clock, AlignJustify } from 'lucide-react';

export const FbnInventoryPage = () => {
  return (
    <div className="fbn-inventory-container">
      {/* Page Title */}
      <div className="fbn-header">
        <h1>My Inventory</h1>
        <Info size={16} color="#6b7280" className="title-info-icon" />
      </div>

      {/* Stats Cards Row */}
      <div className="fbn-stats-row">
        <div className="fbn-stat-item">
          <div className="stat-label-wrap">
            <span className="stat-label">Total Stock</span>
            <Info size={14} color="#9ca3af" />
          </div>
          <div className="stat-value-wrap">
            <span className="stat-value">0 items</span>
            <span className="stat-sku-wrap">
              <span className="sku-icon">SKU</span> 0 SKUs
            </span>
          </div>
        </div>
        
        <div className="fbn-stat-divider"></div>

        <div className="fbn-stat-item">
          <div className="stat-label-wrap">
            <span className="stat-label">Saleable Stock</span>
            <Info size={14} color="#9ca3af" />
          </div>
          <div className="stat-value-wrap">
            <span className="stat-value">0 items</span>
          </div>
        </div>

        <div className="fbn-stat-divider"></div>

        <div className="fbn-stat-item">
          <div className="stat-label-wrap">
            <span className="stat-label">Non-Saleable Stock</span>
            <Info size={14} color="#9ca3af" />
          </div>
          <div className="stat-value-wrap">
            <span className="stat-value">0 items</span>
          </div>
        </div>
      </div>

      {/* Inventory Main Tool Area */}
      <div className="fbn-inventory-main">
        {/* Tabs Row */}
        <div className="fbn-tabs-row">
          <div className="fbn-tabs">
            <div className="fbn-tab active">
              <span>All Warehouses</span>
              <span className="tab-badge active-badge">0</span>
            </div>
            <div className="fbn-tab">
              <span>Saleable</span>
              <span className="tab-badge">0</span>
            </div>
            <div className="fbn-tab">
              <span>Non-Saleable</span>
              <span className="tab-badge">0</span>
            </div>
          </div>
          <div className="fbn-last-updated">
            <Clock size={14} />
            <span>Last Updated: 2026-03-14 10:42 AM</span>
          </div>
        </div>

        {/* Filters Row */}
        <div className="fbn-filters-row">
          <div className="fbn-search-box">
            <input type="text" placeholder="Search for SKU here..." />
            <div className="search-icon-wrap">
              <Search size={16} color="#9ca3af" />
            </div>
          </div>
          
          <div className="fbn-actions">
            <button className="fbn-dropdown-btn">
              Warehouse Name <ChevronDown size={14} color="#6b7280" />
            </button>
            <button className="fbn-dropdown-btn">
              Warehouse Type <ChevronDown size={14} color="#6b7280" />
            </button>
            <button className="fbn-export-btn">
              <Download size={14} color="#374151" /> Export
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="fbn-table">
          <div className="fbn-table-header">
            <div className="th-col th-product">Product</div>
            <div className="th-col th-dimensions">Dimensions</div>
            <div className="th-col th-sku">SKU</div>
            <div className="th-col th-pbarcode">Pbarcode</div>
            <div className="th-col th-warehouse">Warehouse</div>
            <div className="th-col th-sortable">Saleable <AlignJustify size={12} color="#9ca3af" className="sort-icon-rotated" /></div>
            <div className="th-col th-sortable">Non-Saleable <AlignJustify size={12} color="#9ca3af" className="sort-icon-rotated" /></div>
            <div className="th-col th-sortable">Total Stock <AlignJustify size={12} color="#9ca3af" className="sort-icon-rotated" /></div>
          </div>

          {/* Empty State */}
          <div className="fbn-empty-state">
            <div className="empty-icon-wrapper">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 45H55V60C55 62.2091 53.2091 64 51 64H29C26.7909 64 25 62.2091 25 60V45Z" fill="#e5e7eb"/>
                <path d="M30 40H50V52H30V40Z" fill="#f3f4f6"/>
                <path d="M35 44H45" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round"/>
                <path d="M35 48H45" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round"/>
                <path d="M25 45L30 35H50L55 45" fill="#e5e7eb"/>
                <circle cx="58" cy="30" r="8" fill="#e5e7eb"/>
                <circle cx="55" cy="30" r="1.5" fill="white"/>
                <circle cx="58" cy="30" r="1.5" fill="white"/>
                <circle cx="61" cy="30" r="1.5" fill="white"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
