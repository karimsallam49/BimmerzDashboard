import './MyBrandsPage.css';

export const MyBrandsPage = () => {
  return (
    <div className="my-brands-page">
      <div className="page-header">
        <h1>My Brands</h1>
        <div className="header-actions">
          <button className="btn btn-outline">Import Brands</button>
          <button className="btn btn-primary">Add New Brand</button>
        </div>
      </div>

      <div className="brands-summary">
        <div className="summary-card">
          <div className="summary-icon">🏢</div>
          <div className="summary-content">
            <h3>Brand Management</h3>
            <p>Manage your brand portfolio and product lines</p>
          </div>
        </div>
        <div className="summary-stats">
          <div className="summary-stat">
            <span className="stat-number">12</span>
            <span className="stat-label">Total Brands</span>
          </div>
          <div className="summary-stat">
            <span className="stat-number">8</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="summary-stat">
            <span className="stat-number">3</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="summary-stat">
            <span className="stat-number">1</span>
            <span className="stat-label">Inactive</span>
          </div>
        </div>
      </div>

      <div className="brands-filters">
        <div className="search-section">
          <input type="text" placeholder="Search your brands..." className="search-input" />
          <button className="search-btn">🔍</button>
        </div>
        
        <div className="filter-options">
          <select className="filter-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Inactive</option>
          </select>
          
          <select className="filter-select">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home & Garden</option>
            <option>Sports</option>
          </select>
          
          <select className="filter-select">
            <option>Sort by: Name</option>
            <option>Sort by: Products</option>
            <option>Sort by: Revenue</option>
            <option>Sort by: Date Created</option>
          </select>
        </div>
      </div>

      <div className="brands-list">
        <div className="brand-item">
          <div className="brand-main">
            <div className="brand-logo">
              <div className="logo-placeholder">BM</div>
            </div>
            <div className="brand-details">
              <h3>Bimmerz Electronics</h3>
              <p className="brand-description">Premium electronics and accessories</p>
              <div className="brand-meta">
                <span className="category">Electronics</span>
                <span className="created">Created: Jan 15, 2024</span>
              </div>
            </div>
            <div className="brand-stats">
              <div className="stat-item">
                <span className="value">234</span>
                <span className="label">Products</span>
              </div>
              <div className="stat-item">
                <span className="value">EGP 2.5M</span>
                <span className="label">Revenue</span>
              </div>
            </div>
            <div className="brand-status">
              <span className="status active">Active</span>
            </div>
          </div>
          
          <div className="brand-actions">
            <button className="action-btn primary">Manage</button>
            <button className="action-btn secondary">View Products</button>
            <button className="action-btn secondary">Edit</button>
            <button className="action-btn danger">Deactivate</button>
          </div>
        </div>

        <div className="brand-item">
          <div className="brand-main">
            <div className="brand-logo">
              <div className="logo-placeholder">TH</div>
            </div>
            <div className="brand-details">
              <h3>Tech Haven</h3>
              <p className="brand-description">Smart home devices and IoT solutions</p>
              <div className="brand-meta">
                <span className="category">Smart Home</span>
                <span className="created">Created: Feb 20, 2024</span>
              </div>
            </div>
            <div className="brand-stats">
              <div className="stat-item">
                <span className="value">156</span>
                <span className="label">Products</span>
              </div>
              <div className="stat-item">
                <span className="value">EGP 1.8M</span>
                <span className="label">Revenue</span>
              </div>
            </div>
            <div className="brand-status">
              <span className="status active">Active</span>
            </div>
          </div>
          
          <div className="brand-actions">
            <button className="action-btn primary">Manage</button>
            <button className="action-btn secondary">View Products</button>
            <button className="action-btn secondary">Edit</button>
            <button className="action-btn danger">Deactivate</button>
          </div>
        </div>

        <div className="brand-item">
          <div className="brand-main">
            <div className="brand-logo">
              <div className="logo-placeholder">FS</div>
            </div>
            <div className="brand-details">
              <h3>Fashion Studio</h3>
              <p className="brand-description">Trendy clothing and fashion accessories</p>
              <div className="brand-meta">
                <span className="category">Fashion</span>
                <span className="created">Created: Mar 10, 2024</span>
              </div>
            </div>
            <div className="brand-stats">
              <div className="stat-item">
                <span className="value">89</span>
                <span className="label">Products</span>
              </div>
              <div className="stat-item">
                <span className="value">EGP 890K</span>
                <span className="label">Revenue</span>
              </div>
            </div>
            <div className="brand-status">
              <span className="status pending">Pending</span>
            </div>
          </div>
          
          <div className="brand-actions">
            <button className="action-btn primary">Complete Setup</button>
            <button className="action-btn secondary">View Products</button>
            <button className="action-btn secondary">Edit</button>
            <button className="action-btn danger">Delete</button>
          </div>
        </div>

        <div className="brand-item">
          <div className="brand-main">
            <div className="brand-logo">
              <div className="logo-placeholder">HG</div>
            </div>
            <div className="brand-details">
              <h3>Home Goods Co</h3>
              <p className="brand-description">Quality home and kitchen products</p>
              <div className="brand-meta">
                <span className="category">Home & Garden</span>
                <span className="created">Created: Dec 5, 2023</span>
              </div>
            </div>
            <div className="brand-stats">
              <div className="stat-item">
                <span className="value">267</span>
                <span className="label">Products</span>
              </div>
              <div className="stat-item">
                <span className="value">EGP 3.2M</span>
                <span className="label">Revenue</span>
              </div>
            </div>
            <div className="brand-status">
              <span className="status active">Active</span>
            </div>
          </div>
          
          <div className="brand-actions">
            <button className="action-btn primary">Manage</button>
            <button className="action-btn secondary">View Products</button>
            <button className="action-btn secondary">Edit</button>
            <button className="action-btn danger">Deactivate</button>
          </div>
        </div>

        <div className="brand-item">
          <div className="brand-main">
            <div className="brand-logo">
              <div className="logo-placeholder">SA</div>
            </div>
            <div className="brand-details">
              <h3>Sports Arena</h3>
              <p className="brand-description">Sports equipment and fitness gear</p>
              <div className="brand-meta">
                <span className="category">Sports</span>
                <span className="created">Created: Nov 12, 2023</span>
              </div>
            </div>
            <div className="brand-stats">
              <div className="stat-item">
                <span className="value">145</span>
                <span className="label">Products</span>
              </div>
              <div className="stat-item">
                <span className="value">EGP 1.1M</span>
                <span className="label">Revenue</span>
              </div>
            </div>
            <div className="brand-status">
              <span className="status inactive">Inactive</span>
            </div>
          </div>
          
          <div className="brand-actions">
            <button className="action-btn primary">Reactivate</button>
            <button className="action-btn secondary">View Products</button>
            <button className="action-btn secondary">Edit</button>
            <button className="action-btn danger">Delete</button>
          </div>
        </div>
      </div>

      <div className="add-brand-section">
        <div className="add-brand-card">
          <div className="add-icon">➕</div>
          <h3>Add New Brand</h3>
          <p>Create a new brand to organize your products</p>
          <button className="btn btn-primary">Create Brand</button>
        </div>
      </div>
    </div>
  );
};
