import './MyCatalogPage.css';

export const MyCatalogPage = () => {
  return (
    <div className="my-catalog-page">
      <div className="page-header">
        <h1>My Catalog</h1>
        <div className="header-actions">
          <button className="btn btn-outline">Import Products</button>
          <button className="btn btn-primary">Add Product</button>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>156</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>142</h3>
            <p>Active Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📉</div>
          <div className="stat-info">
            <h3>14</h3>
            <p>Out of Stock</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>EGP 2.5M</h3>
            <p>Total Value</p>
          </div>
        </div>
      </div>

      <div className="catalog-filters">
        <div className="filter-tabs">
          <button className="tab active">All Products</button>
          <button className="tab">Active</button>
          <button className="tab">Inactive</button>
          <button className="tab">Draft</button>
        </div>
        
        <div className="search-filter">
          <input type="text" placeholder="Search catalog..." className="search-input" />
          <select className="filter-select">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Home & Kitchen</option>
          </select>
          <select className="filter-select">
            <option>Sort by: Name</option>
            <option>Sort by: Price</option>
            <option>Sort by: Stock</option>
            <option>Sort by: Date</option>
          </select>
        </div>
      </div>

      <div className="catalog-grid">
        <div className="product-card">
          <div className="product-image">
            <div className="image-placeholder"></div>
            <span className="status-badge active">Active</span>
          </div>
          <div className="product-details">
            <h4>Bosch Washing Machine</h4>
            <p className="product-sku">SKU: BWM-001</p>
            <p className="product-description">Front Load, 8kg, Energy Efficient</p>
            <div className="product-meta">
              <span className="price">EGP 12,999</span>
              <span className="stock">45 in stock</span>
            </div>
          </div>
          <div className="product-actions">
            <button className="btn-action edit">Edit</button>
            <button className="btn-action view">View</button>
          </div>
        </div>

        <div className="product-card">
          <div className="product-image">
            <div className="image-placeholder"></div>
            <span className="status-badge active">Active</span>
          </div>
          <div className="product-details">
            <h4>Samsung TV 55"</h4>
            <p className="product-sku">SKU: STV-002</p>
            <p className="product-description">Smart TV, 4K Ultra HD, HDR</p>
            <div className="product-meta">
              <span className="price">EGP 8,999</span>
              <span className="stock">12 in stock</span>
            </div>
          </div>
          <div className="product-actions">
            <button className="btn-action edit">Edit</button>
            <button className="btn-action view">View</button>
          </div>
        </div>

        <div className="product-card">
          <div className="product-image">
            <div className="image-placeholder"></div>
            <span className="status-badge inactive">Out of Stock</span>
          </div>
          <div className="product-details">
            <h4>Sony Headphones</h4>
            <p className="product-sku">SKU: SH-003</p>
            <p className="product-description">Wireless, Noise Cancelling, 30hr Battery</p>
            <div className="product-meta">
              <span className="price">EGP 2,499</span>
              <span className="stock out-of-stock">0 in stock</span>
            </div>
          </div>
          <div className="product-actions">
            <button className="btn-action edit">Edit</button>
            <button className="btn-action view">View</button>
          </div>
        </div>

        <div className="product-card">
          <div className="product-image">
            <div className="image-placeholder"></div>
            <span className="status-badge draft">Draft</span>
          </div>
          <div className="product-details">
            <h4>LG Refrigerator</h4>
            <p className="product-sku">SKU: LRF-004</p>
            <p className="product-description">Double Door, Inverter, 450L</p>
            <div className="product-meta">
              <span className="price">EGP 15,999</span>
              <span className="stock">8 in stock</span>
            </div>
          </div>
          <div className="product-actions">
            <button className="btn-action edit">Edit</button>
            <button className="btn-action view">View</button>
          </div>
        </div>

        <div className="product-card">
          <div className="product-image">
            <div className="image-placeholder"></div>
            <span className="status-badge active">Active</span>
          </div>
          <div className="product-details">
            <h4>Philips Air Fryer</h4>
            <p className="product-sku">SKU: PAF-005</p>
            <p className="product-description">Digital Display, 4.3L Capacity</p>
            <div className="product-meta">
              <span className="price">EGP 1,299</span>
              <span className="stock">67 in stock</span>
            </div>
          </div>
          <div className="product-actions">
            <button className="btn-action edit">Edit</button>
            <button className="btn-action view">View</button>
          </div>
        </div>

        <div className="product-card">
          <div className="product-image">
            <div className="image-placeholder"></div>
            <span className="status-badge active">Active</span>
          </div>
          <div className="product-details">
            <h4>Canon Camera</h4>
            <p className="product-sku">SKU: CCA-006</p>
            <p className="product-description">DSLR, 24MP, WiFi Enabled</p>
            <div className="product-meta">
              <span className="price">EGP 8,999</span>
              <span className="stock">23 in stock</span>
            </div>
          </div>
          <div className="product-actions">
            <button className="btn-action edit">Edit</button>
            <button className="btn-action view">View</button>
          </div>
        </div>
      </div>

      <div className="pagination">
        <button className="page-btn" disabled>Previous</button>
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <button className="page-btn">...</button>
        <button className="page-btn">26</button>
        <button className="page-btn">Next</button>
      </div>
    </div>
  );
};
