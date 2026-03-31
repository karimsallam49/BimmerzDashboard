import './VireulaBundlesPage.css';
import { Download, Plus, TrendingUp, Package, Clock, ChevronRight } from 'lucide-react';

export const VireulaBundlesPage = () => {
  return (
    <div className="virtual-bundles-container">
      <div className="feedback-tab">
        <span>Give us feedback</span>
      </div>

      <div className="vb-header">
        <div className="vb-title-area">
          <h1>Virtual Bundles Guide</h1>
          <p>Everything you need to know before creating your first virtual bundle</p>
        </div>
        <div className="vb-header-actions">
          <button className="vb-btn-outline">
            <Download size={16} />
            Imports
          </button>
          <button className="vb-btn-primary">
            <Plus size={16} />
            Create Virtual Bundle
          </button>
        </div>
      </div>

      <div className="vb-card mb-4">
        <h2 className="vb-card-title">What is a Virtual Bundle?</h2>
        <p className="vb-card-desc">
          Virtual Bundles make it easy to create discounted SKU groups from your existing catalog, without the hassle of handling physical bundles.
        </p>

        <div className="vb-features-grid">
          <div className="vb-feature-card">
            <div className="feature-header">
              <div className="feature-icon green-icon">
                <TrendingUp size={16} strokeWidth={3} />
              </div>
              <h3>Increase Sales</h3>
            </div>
            <p>Drive larger orders and maximize revenue with smart product bundles</p>
          </div>

          <div className="vb-feature-card">
            <div className="feature-header">
              <div className="feature-icon orange-icon">
                <Package size={16} strokeWidth={2.5} />
              </div>
              <h3>No Inventory Changes</h3>
            </div>
            <p>Leverage your existing SKUs without the hassle of stock management</p>
          </div>

          <div className="vb-feature-card">
            <div className="feature-header">
              <div className="feature-icon blue-icon">
                <Clock size={16} strokeWidth={2.5} />
              </div>
              <h3>Quick Setup</h3>
            </div>
            <p>Create and launch bundles in minutes with our two-step flow</p>
          </div>
        </div>
      </div>

      <div className="vb-card mb-4">
        <h2 className="vb-card-title">Eligibility</h2>
        <p className="vb-section-text">
          All sellers can create virtual bundles as long as their SKUs are on the FBN fulfillment model.
        </p>
      </div>

      <div className="vb-guide-section">
        <div className="vb-guide-sidebar">
          <h2 className="vb-card-title">Detailed Guide</h2>
          <p className="vb-sidebar-desc">Select a topic to view detailed information</p>

          <div className="vb-nav-menu">
            <div className="vb-nav-item active">
              <span>How to Create Virtual Bundles (One by One)</span>
              <ChevronRight size={18} color="#2563eb" />
            </div>
            <div className="vb-nav-item">
              <span>How to Create Virtual Bundles in Bulk</span>
              <ChevronRight size={18} color="#9ca3af" />
            </div>
          </div>
        </div>

        <div className="vb-guide-content">
          <h2 className="vb-content-title">How to Create Virtual Bundles (One by One)</h2>

          <div className="vb-step">
            <p className="step-title">Step 1: Navigate to Ads & Promotions {'>'} Virtual Bundles</p>
            <p className="step-desc">Click Create Virtual Bundle at the top of this screen</p>
          </div>
        </div>
      </div>
    </div>
  );
};
