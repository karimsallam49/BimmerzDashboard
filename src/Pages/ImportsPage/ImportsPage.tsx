import './ImportsPage.css';

export const ImportsPage = () => {
  return (
    <div className="imports-page">
      <div className="page-header">
        <h1>Import Products</h1>
        <div className="header-actions">
          <button className="btn btn-outline">Download Template</button>
          <button className="btn btn-primary">New Import</button>
        </div>
      </div>

      <div className="import-steps">
        <div className="step-card">
          <div className="step-number">1</div>
          <div className="step-content">
            <h3>Download Template</h3>
            <p>Download our Excel template and fill it with your product information</p>
            <button className="btn btn-outline">Download Excel Template</button>
          </div>
        </div>

        <div className="step-card">
          <div className="step-number">2</div>
          <div className="step-content">
            <h3>Fill Product Data</h3>
            <p>Complete all required fields in the template including product names, SKUs, prices, and stock levels</p>
            <div className="template-info">
              <span className="required">Required fields: Name, SKU, Price, Stock</span>
              <span className="optional">Optional: Description, Category, Brand</span>
            </div>
          </div>
        </div>

        <div className="step-card">
          <div className="step-number">3</div>
          <div className="step-content">
            <h3>Upload File</h3>
            <p>Upload your completed Excel file to import products</p>
            <div className="upload-area">
              <div className="upload-icon">📁</div>
              <p>Drag and drop your Excel file here or</p>
              <button className="btn btn-outline">Browse Files</button>
              <span className="file-types">Supported formats: .xlsx, .xls (Max 10MB)</span>
            </div>
          </div>
        </div>

        <div className="step-card">
          <div className="step-number">4</div>
          <div className="step-content">
            <h3>Review & Import</h3>
            <p>Review the imported data and confirm to add products to your catalog</p>
            <div className="review-section">
              <div className="review-stats">
                <div className="stat">
                  <span className="number">156</span>
                  <span className="label">Products Found</span>
                </div>
                <div className="stat">
                  <span className="number">142</span>
                  <span className="label">Valid</span>
                </div>
                <div className="stat">
                  <span className="number">14</span>
                  <span className="label">Errors</span>
                </div>
              </div>
              <button className="btn btn-primary">Import Products</button>
            </div>
          </div>
        </div>
      </div>

      <div className="recent-imports">
        <h2>Recent Imports</h2>
        <div className="imports-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>File Name</th>
                <th>Products</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-03-15 14:30</td>
                <td>products_march_2024.xlsx</td>
                <td>156</td>
                <td><span className="status success">Completed</span></td>
                <td>
                  <button className="btn-action">View Details</button>
                </td>
              </tr>
              <tr>
                <td>2024-03-10 09:15</td>
                <td>electronics_batch.xlsx</td>
                <td>89</td>
                <td><span className="status success">Completed</span></td>
                <td>
                  <button className="btn-action">View Details</button>
                </td>
              </tr>
              <tr>
                <td>2024-03-05 16:45</td>
                <td>clothing_items.xlsx</td>
                <td>45</td>
                <td><span className="status error">Failed</span></td>
                <td>
                  <button className="btn-action">View Error</button>
                </td>
              </tr>
              <tr>
                <td>2024-02-28 11:20</td>
                <td>home_products.xlsx</td>
                <td>234</td>
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
