import './AddFbnProductPage.css';

export const AddFbnProductPage = () => {
  return (
    <div className="add-fbn-page">
      <div className="page-header">
        <h1>Add Fulfilled by Bimmerz Product</h1>
        <div className="header-actions">
          <button className="btn btn-outline">Save as Draft</button>
          <button className="btn btn-primary">Submit for Review</button>
        </div>
      </div>

      <div className="fbn-info-card">
        <div className="info-icon">📦</div>
        <div className="info-content">
          <h3>Fulfilled by Bimmerz (FBn)</h3>
          <p>Let Bimmerz handle storage, packing, and shipping for your products. You focus on selling while we handle logistics.</p>
        </div>
      </div>

      <div className="form-container">
        <div className="form-section">
          <h2>Product Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name *</label>
              <input type="text" placeholder="Enter product name" />
            </div>
            <div className="form-group">
              <label>SKU *</label>
              <input type="text" placeholder="Enter SKU" />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select>
                <option>Select category</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Home & Kitchen</option>
                <option>Sports</option>
                <option>Beauty</option>
              </select>
            </div>
            <div className="form-group">
              <label>Brand</label>
              <input type="text" placeholder="Enter brand name" />
            </div>
          </div>
          <div className="form-group full-width">
            <label>Product Description</label>
            <textarea rows={4} placeholder="Describe your product..."></textarea>
          </div>
        </div>

        <div className="form-section">
          <h2>Pricing & Inventory</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Selling Price (EGP) *</label>
              <input type="number" placeholder="0.00" step="0.01" />
            </div>
            <div className="form-group">
              <label>Cost Price (EGP)</label>
              <input type="number" placeholder="0.00" step="0.01" />
            </div>
            <div className="form-group">
              <label>Initial Stock *</label>
              <input type="number" placeholder="0" min={0} />
            </div>
            <div className="form-group">
              <label>Reorder Level</label>
              <input type="number" placeholder="10" min={0} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>FBn Settings</h2>
          <div className="fbn-options">
            <div className="option-card">
              <div className="option-header">
                <input type="radio" name="fbn-type" id="standard" defaultChecked />
                <label htmlFor="standard">
                  <div className="option-title">Standard Fulfilled by Bimmerz</div>
                  <div className="option-desc">Standard storage and fulfillment services</div>
                </label>
              </div>
              <div className="option-details">
                <div className="detail-item">
                  <span className="label">Storage Fee:</span>
                  <span className="value">EGP 5.00 per cubic meter per month</span>
                </div>
                <div className="detail-item">
                  <span className="label">Pick & Pack:</span>
                  <span className="value">EGP 3.50 per item</span>
                </div>
                <div className="detail-item">
                  <span className="label">Delivery:</span>
                  <span className="value">EGP 15.00 - 35.00 based on weight</span>
                </div>
              </div>
            </div>

            <div className="option-card">
              <div className="option-header">
                <input type="radio" name="fbn-type" id="premium" />
                <label htmlFor="premium">
                  <div className="option-title">Premium Fulfilled by Bimmerz</div>
                  <div className="option-desc">Priority handling and faster delivery</div>
                </label>
              </div>
              <div className="option-details">
                <div className="detail-item">
                  <span className="label">Storage Fee:</span>
                  <span className="value">EGP 7.50 per cubic meter per month</span>
                </div>
                <div className="detail-item">
                  <span className="label">Pick & Pack:</span>
                  <span className="value">EGP 5.00 per item</span>
                </div>
                <div className="detail-item">
                  <span className="label">Delivery:</span>
                  <span className="value">EGP 10.00 - 25.00 priority delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Product Images</h2>
          <div className="image-upload">
            <div className="upload-area">
              <div className="upload-icon">📷</div>
              <p>Drop images here or click to upload</p>
              <button className="btn btn-outline">Browse Files</button>
              <span className="upload-info">JPG, PNG, GIF up to 5MB each</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Shipping Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Weight (kg) *</label>
              <input type="number" placeholder="0.00" step="0.01" />
            </div>
            <div className="form-group">
              <label>Length (cm) *</label>
              <input type="number" placeholder="0" />
            </div>
            <div className="form-group">
              <label>Width (cm) *</label>
              <input type="number" placeholder="0" />
            </div>
            <div className="form-group">
              <label>Height (cm) *</label>
              <input type="number" placeholder="0" />
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn-outline">Cancel</button>
        <button className="btn btn-outline">Save as Draft</button>
        <button className="btn btn-primary">Submit for Review</button>
      </div>
    </div>
  );
};
