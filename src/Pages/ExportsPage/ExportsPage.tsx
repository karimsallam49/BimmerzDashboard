import './ExportsPage.css';

export const ExportsPage = () => {
  return (
    <div className="exports-page">
      <div className="page-header">
        <h1>Export Products</h1>
        <div className="header-actions">
          <button className="btn btn-outline">Schedule Export</button>
          <button className="btn btn-primary">Export Now</button>
        </div>
      </div>

      <div className="export-options">
        <h2>Export Options</h2>
        <div className="export-grid">
          <div className="export-card">
            <div className="export-icon">📊</div>
            <h3>Full Catalog</h3>
            <p>Export all products from your catalog including all details</p>
            <div className="export-stats">
              <span>156 products</span>
              <span>All categories</span>
            </div>
            <button className="btn btn-outline">Export All</button>
          </div>

          <div className="export-card">
            <div className="export-icon">📱</div>
            <h3>Active Products Only</h3>
            <p>Export only currently active and in-stock products</p>
            <div className="export-stats">
              <span>142 products</span>
              <span>Active status</span>
            </div>
            <button className="btn btn-outline">Export Active</button>
          </div>

          <div className="export-card">
            <div className="export-icon">📦</div>
            <h3>By Category</h3>
            <p>Export products from specific categories</p>
            <div className="category-select">
              <select className="filter-select">
                <option>Select Category</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Home & Kitchen</option>
                <option>Sports</option>
              </select>
            </div>
            <button className="btn btn-outline">Export Category</button>
          </div>

          <div className="export-card">
            <div className="export-icon">🏷️</div>
            <h3>By Brand</h3>
            <p>Export products from specific brands</p>
            <div className="category-select">
              <select className="filter-select">
                <option>Select Brand</option>
                <option>Bosch</option>
                <option>Samsung</option>
                <option>Sony</option>
                <option>LG</option>
              </select>
            </div>
            <button className="btn btn-outline">Export Brand</button>
          </div>
        </div>
      </div>

      <div className="export-formats">
        <h2>Export Format</h2>
        <div className="format-options">
          <label className="format-option">
            <input type="radio" name="format" value="excel" defaultChecked />
            <div className="format-info">
              <div className="format-icon">📈</div>
              <div className="format-details">
                <h4>Excel (.xlsx)</h4>
                <p>Best for data analysis and editing</p>
              </div>
            </div>
          </label>

          <label className="format-option">
            <input type="radio" name="format" value="csv" />
            <div className="format-info">
              <div className="format-icon">📋</div>
              <div className="format-details">
                <h4>CSV (.csv)</h4>
                <p>Universal format for data import</p>
              </div>
            </div>
          </label>

          <label className="format-option">
            <input type="radio" name="format" value="pdf" />
            <div className="format-info">
              <div className="format-icon">📄</div>
              <div className="format-details">
                <h4>PDF Report</h4>
                <p>Formatted report for sharing and printing</p>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="export-fields">
        <h2>Select Fields to Export</h2>
        <div className="fields-grid">
          <label className="field-checkbox">
            <input type="checkbox" defaultChecked />
            <span>Product Name</span>
          </label>
          <label className="field-checkbox">
            <input type="checkbox" defaultChecked />
            <span>SKU</span>
          </label>
          <label className="field-checkbox">
            <input type="checkbox" defaultChecked />
            <span>Price</span>
          </label>
          <label className="field-checkbox">
            <input type="checkbox" defaultChecked />
            <span>Stock Quantity</span>
          </label>
          <label className="field-checkbox">
            <input type="checkbox" defaultChecked />
            <span>Category</span>
          </label>
          <label className="field-checkbox">
            <input type="checkbox" />
            <span>Description</span>
          </label>
          <label className="field-checkbox">
            <input type="checkbox" defaultChecked />
            <span>Brand</span>
          </label>
          <label className="field-checkbox">
            <input type="checkbox" />
            <span>Weight</span>
          </label>
          <label className="field-checkbox">
            <input type="checkbox" />
            <span>Dimensions</span>
          </label>
          <label className="field-checkbox">
            <input type="checkbox" />
            <span>Created Date</span>
          </label>
          <label className="field-checkbox">
            <input type="checkbox" />
            <span>Last Updated</span>
          </label>
          <label className="field-checkbox">
            <input type="checkbox" />
            <span>Images</span>
          </label>
        </div>
      </div>

      <div className="recent-exports">
        <h2>Recent Exports</h2>
        <div className="exports-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>File Name</th>
                <th>Products</th>
                <th>Format</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-03-15 14:30</td>
                <td>full_catalog_march.xlsx</td>
                <td>156</td>
                <td>Excel</td>
                <td><span className="status success">Ready</span></td>
                <td>
                  <button className="btn-action">Download</button>
                </td>
              </tr>
              <tr>
                <td>2024-03-12 09:15</td>
                <td>active_products.csv</td>
                <td>142</td>
                <td>CSV</td>
                <td><span className="status success">Ready</span></td>
                <td>
                  <button className="btn-action">Download</button>
                </td>
              </tr>
              <tr>
                <td>2024-03-10 16:45</td>
                <td>electronics_report.pdf</td>
                <td>89</td>
                <td>PDF</td>
                <td><span className="status processing">Processing</span></td>
                <td>
                  <button className="btn-action">View Progress</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
