import './BrandCatalogPage.css';

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const EditIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="edit-icon">
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
);

const SuggestionsIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 8v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 8l-4-4H8L4 8" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="8" y="10" width="8" height="6" rx="1" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
    <path d="M10 12h4M10 14h2" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="18" cy="6" r="3" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
    <path d="M17 6h2" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export const BrandCatalogPage = () => {
  return (
    <div className="brand-catalog-page">
      <div className="catalog-header">
        <h1>Brand Catalog</h1>
      </div>

      <div className="catalog-layout">


        <div className="catalog-sidebar">

          <div className="sidebar-sticky">
            <div className="search-box">
              <SearchIcon />
              <input type="text" placeholder="Search for Partner SKU" />
            </div>
            <div className="result-count">38 result(s)</div>
          </div>

          <div className="sku-list">

            <div className="sku-item selected">
              <div className="sku-image placeholder-bg-1"></div>
              <div className="sku-details">
                <span className="sku-brand">BOSCH</span>
                <span className="sku-title">Kettle MyMoment Black<br />TWK4M223</span>
                <span className="sku-model">TWK4M223</span>
                <span className="sku-id">SKU: Z13F08D319FF480C47009Z-1</span>
              </div>
            </div>

            <div className="sku-item">
              <div className="sku-image placeholder-bg-2"></div>
              <div className="sku-details">
                <span className="sku-brand">BOSCH</span>
                <span className="sku-title">Compact toaster MyMoment<br />Black TAT4M223</span>
                <span className="sku-model">TAT4M223</span>
                <span className="sku-id">SKU: Z3879BBA4539574817CC7Z-1</span>
              </div>
            </div>

            <div className="sku-item">
              <div className="sku-image placeholder-bg-3"></div>
              <div className="sku-details">
                <span className="sku-brand">BOSCH</span>
                <span className="sku-title">free-standing freezer 172 x 59.5<br />cm Stainless steel GSN33AEE8</span>
                <span className="sku-model">GSN33AEE8</span>
                <span className="sku-id">SKU: ZD08888396B0D8A8D8015Z-1</span>
              </div>
            </div>

            <div className="sku-item">
              <div className="sku-image placeholder-bg-4"></div>
              <div className="sku-details">
                <span className="sku-brand">BOSCH</span>
                <span className="sku-title">Series 4 Induction hob 60 cm<br />surface mount without frame<br />PUE611BB5E</span>
                <span className="sku-model">PUE611BB5E</span>
                <span className="sku-id">SKU: ZB1748199250C5098585CZ-1</span>
              </div>
            </div>

            <div className="sku-item">
              <div className="sku-details">
                <span className="sku-brand">BOSCH</span>
              </div>
            </div>

          </div>
        </div>

        <div className="catalog-main">
          <div className="catalog-scroll-area">

            <div className="attributes-card">
              <div className="attributes-header">
                <div className="attr-toggles">
                  <span className="attr-title">Attributes</span>
                  <label className="radio-label">
                    <input type="radio" name="attr_view" value="mandatory" />
                    <span className="radio-custom white-center"></span>
                    Mandatory
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="attr_view" value="all" defaultChecked />
                    <span className="radio-custom blue-filled"></span>
                    All
                  </label>
                </div>
                <a href="#" className="view-details-link">View Product Details</a>
              </div>

              <div className="attr-section">
                <div className="attr-section-title">Basic Attributes</div>
                <div className="attr-grid-4">
                  <div className="attr-box border-bottom">
                    <div className="attr-label error">Feature Bullet* !! <EditIcon /></div>
                    <div className="attr-val">--</div>
                  </div>
                  <div className="attr-box border-bottom">
                    <div className="attr-label">GTIN <EditIcon /></div>
                    <div className="attr-val">--</div>
                  </div>
                  <div className="attr-box border-bottom">
                    <div className="attr-label">Long Description <EditIcon /></div>
                    <div className="attr-val">--</div>
                  </div>
                  <div className="attr-box border-bottom">
                    <div className="attr-label">Product Title* <EditIcon /></div>
                    <div className="attr-val">Kettle MyMoment Black TWK4M223</div>
                  </div>
                </div>
              </div>

              <div className="attr-section mt-6">
                <div className="attr-section-title">Product Detail Attributes</div>
                <div className="attr-grid-4">
                  <div className="attr-box border-bottom">
                    <div className="attr-label error">Capacity* !! <EditIcon /></div>
                    <div className="attr-val">--</div>
                  </div>
                  <div className="attr-box border-bottom">
                    <div className="attr-label">Colour <EditIcon /></div>
                    <div className="attr-val">Black</div>
                  </div>
                  <div className="attr-box border-bottom">
                    <div className="attr-label">Colour Name* <EditIcon /></div>
                    <div className="attr-val">Black</div>
                  </div>
                  <div className="attr-box border-bottom">
                    <div className="attr-label">Country of Origin <EditIcon /></div>
                    <div className="attr-val">--</div>
                  </div>
                </div>
              </div>

              <div className="show-all-wrapper">
                <a href="#" className="show-all-link">Show all attributes</a>
              </div>
            </div>

            <div className="suggestions-card">
              <div className="suggestions-header">
                <h3>Suggested Matches</h3>
                <p>Top matching SKU(s)</p>
              </div>

              <div className="suggestions-empty">
                <div className="empty-state-content">
                  <div className="empty-icon-wrapper">
                    <SuggestionsIcon />
                  </div>
                  <div className="empty-text">No Suggestions</div>
                </div>

                <div className="empty-divider">
                  <span>OR</span>
                </div>

                <div className="empty-action">
                  <p>Don't see any matching noon SKU?</p>
                  <button className="create-sku-btn">Create a new SKU</button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
