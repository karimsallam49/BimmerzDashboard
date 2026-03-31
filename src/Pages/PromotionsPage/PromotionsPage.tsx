import './PromotionsPage.css';

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export const PromotionsPage = () => {
  return (
    <div className="promotions-dashboard">
      {/* Top Banner */}
      <div className="promo-banner">
        <div className="promo-banner-content">
          <h1>March deals are LIVE!</h1>
          <p>Enroll now - sale ongoing</p>
        </div>
        <button className="btn-enroll">
          Enroll <ChevronRight />
        </button>
      </div>

      <div className="promo-grid">
        {/* Column 1: Deals */}
        <div className="promo-column">
          <div className="promo-card">
            <div className="promo-card-header-main">
              <h2>Deals</h2>
            </div>
            
            <div className="promo-item">
              <div className="promo-item-header">
                <h3>Category Deals <ChevronRight /></h3>
                <span className="badge-count">5 ongoing</span>
              </div>
              <p>Join seasonal & category-wide promotions curated by noon</p>
              <div className="badge-green">Featured on category pages</div>
            </div>

            <div className="promo-item border-top">
              <div className="promo-item-header">
                <h3>Flash Deals <ChevronRight /></h3>
                <span className="badge-count">27 upcoming</span>
              </div>
              <p>Limited-time offers (4-24hrs) with deep discounts</p>
              <div className="badge-yellow">Urgency + FOMO</div>
            </div>
          </div>

          <div className="promo-card noon-co-funded-card">
            <div className="noon-co-funded-header">
              <span className="noon-logo-mock">noon</span> CO-FUNDED
            </div>
            
            <div className="promo-item pad-top">
              <div className="promo-item-header">
                <h3>Price Drop <ChevronRight /></h3>
              </div>
              <p>Share the discount with noon</p>
              <div className="badge-yellow-light">noon co-funds final price</div>
            </div>

            <div className="promo-item border-top">
              <div className="promo-item-header">
                <h3>Commission Drop <ChevronRight /></h3>
              </div>
              <p>Price competitively and pay less commission</p>
              <div className="badge-yellow-light">Unlock lower commission</div>
            </div>
          </div>
        </div>

        {/* Column 2: Coupons */}
        <div className="promo-column">
          <div className="promo-card">
            <div className="promo-card-header-main">
              <h2>Coupons</h2>
            </div>

            <div className="promo-item">
              <div className="promo-item-header">
                <h3>Clickable Coupons <ChevronRight /></h3>
                <span className="badge-count">28 ongoing</span>
              </div>
              <p>Customers clip on product pages before checkout</p>
              <div className="badge-blue">3.6x revenue</div>
            </div>

            <div className="promo-item border-top">
              <div className="promo-item-header">
                <h3>Promo Codes <ChevronRight /></h3>
                <span className="badge-count">2 ongoing</span>
              </div>
              <p>Share via social media, email, or influencers</p>
              <div className="badge-blue">Targeted reach</div>
            </div>
          </div>
        </div>

        {/* Column 3: Bundles */}
        <div className="promo-column">
          <div className="promo-card">
            <div className="promo-card-header-main">
              <h2>Bundles</h2>
            </div>

            <div className="promo-item">
              <div className="promo-item-header">
                <h3>Virtual Bundles <ChevronRight /></h3>
                <span className="badge-count">Create new</span>
              </div>
              <p>Group SKUs with no physical re-packing needed</p>
              <div className="badge-green">+13% conversion on units sold</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
