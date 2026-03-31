import './BimmerzCatalogPage.css';
import { Search, ChevronDown } from 'lucide-react';

export const BimmerzCatalogPage = () => {
  return (
    <div className="bimmerz-catalog-container">
      <div className="bimmerz-catalog-content">
        <p className="catalog-header-text">Find and map products of gated brands directly.</p>

        <div className="catalog-filters-bar">
          
          <div className="filter-group sku-group">
            <label>SKU or noon URL</label>
            <div className="input-wrapper search-wrapper">
              <input type="text" placeholder="SKU or noon URL" />
              <div className="icon-container">
                <Search size={16} color="#9ca3af" />
              </div>
            </div>
          </div>

          <div className="filter-group brand-group">
            <label>Brand</label>
            <div className="input-wrapper select-wrapper">
              <input type="text" placeholder="Select brand" readOnly />
              <div className="icon-container">
                <ChevronDown size={16} color="#9ca3af" />
              </div>
            </div>
          </div>

          <div className="filter-group generic-group">
            <label>Product Family</label>
            <div className="input-wrapper select-wrapper disabled">
              <input type="text" value="All" readOnly disabled />
              <div className="icon-container">
                <ChevronDown size={16} color="#d1d5db" />
              </div>
            </div>
          </div>

          <div className="filter-group generic-group">
            <label>Product Type</label>
            <div className="input-wrapper select-wrapper disabled">
              <input type="text" value="All" readOnly disabled />
              <div className="icon-container">
                <ChevronDown size={16} color="#d1d5db" />
              </div>
            </div>
          </div>

          <div className="filter-group generic-group">
            <label>Product Subtype</label>
            <div className="input-wrapper select-wrapper disabled">
              <input type="text" value="All" readOnly disabled />
              <div className="icon-container">
                <ChevronDown size={16} color="#d1d5db" />
              </div>
            </div>
          </div>

        </div>

        <div className="catalog-empty-state">
          <div className="empty-icon-wrapper">
            {/* Using a custom SVG to closely match the image's inbox/tray icon */}
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
          <h3>Search</h3>
          <p>Search for an item or choose your brand to continue.</p>
        </div>

      </div>
    </div>
  );
};
