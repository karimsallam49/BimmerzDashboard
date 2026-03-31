import './StoreDashboard.css';

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const StarIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#fbbf24" : "none"} stroke={filled ? "#fbbf24" : "#d1d5db"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export const StoreDashboard = () => {
  return (
    <div className="store-dashboard">

      <div className="dashboard-header">
        <div className="header-left">
          <h1>Store Dashboard</h1>
          <div className="store-badge">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect width='3' height='2' fill='%23fff'/%3E%3Crect width='3' height='0.666' fill='%23ce1126'/%3E%3Crect y='1.333' width='3' height='0.667' fill='%23000'/%3E%3Cpath d='M1.5 1c0.1-.1.2-.1.2 0s0 .2-.2.2-.2-.1-.2-.2.1-.1.2 0z' fill='%23c09300'/%3E%3C/svg%3E" alt="EG" className="flag-icon" />
            Bosch Home Appliances
          </div>
        </div>
      </div>

      <div className="dashboard-layout">

        <div className="dashboard-main">

          <div className="kpi-panels-grid">

            <div className="kpi-panel">
              <div className="kpi-panel-top">
                <div className="kpi-title">Sales <InfoIcon /></div>
                <div className="kpi-sales-content">
                  <div className="sales-left">
                    <div className="kpi-value-large">EGP 122.98K</div>
                    <div className="pill-positive">↑ +27.15%</div>
                  </div>
                  <div className="sales-right-chart">
                    <div className="sales-chart-y-axis">
                      <span>160.0k -</span>
                      <span>80.0k -</span>
                      <span>0 -</span>
                    </div>
                    <div className="sales-chart">
                      <div className="sales-bar" style={{ height: '5%' }}></div>
                      <div className="sales-bar" style={{ height: '8%' }}></div>
                      <div className="sales-bar" style={{ height: '2%' }}></div>
                      <div className="sales-bar" style={{ height: '5%' }}></div>
                      <div className="sales-bar" style={{ height: '4%' }}></div>
                      <div className="sales-bar" style={{ height: '25%' }}></div>
                      <div className="sales-bar" style={{ height: '5%' }}></div>
                      <div className="sales-bar" style={{ height: '3%' }}></div>
                      <div className="sales-bar" style={{ height: '6%' }}></div>
                      <div className="sales-bar" style={{ height: '45%' }}></div>
                      <div className="sales-bar" style={{ height: '20%' }}></div>
                      <div className="sales-bar" style={{ height: '70%' }}></div>
                      <div className="sales-bar" style={{ height: '40%' }}></div>
                      <div className="sales-bar" style={{ height: '90%' }}></div>
                      <div className="sales-bar" style={{ height: '60%' }}></div>
                    </div>
                    <div className="sales-chart-labels">
                      <span>11 Feb</span>
                      <span>20 Feb</span>
                      <span>01 Mar</span>
                      <span>10 Mar</span>
                    </div>
                  </div>
                </div>
                <div className="kpi-footer-absolute">Yesterday</div>
              </div>
              <div className="kpi-panel-bottom">
                <div className="kpi-panel-bottom-half">
                  <div className="kpi-title">Live SKUs <InfoIcon /></div>
                  <div className="kpi-value-medium">43</div>
                  <div className="tag-row mt-auto">
                    <span className="express-pill">express</span>
                    <span className="tag-val font-bold">35</span>
                  </div>
                  <div className="tag-row">
                    <span className="supermall-pill">supermall</span>
                    <span className="tag-val font-bold">0</span>
                  </div>
                </div>
                <div className="kpi-panel-bottom-half">
                  <div className="kpi-title">Product Impressions <InfoIcon /></div>
                  <div className="kpi-value-medium">67.51K</div>
                  <div className="pill-positive w-fit">↑ +23.91%</div>
                  <div className="kpi-footer-mt-auto">Yesterday</div>
                </div>
              </div>
            </div>

            <div className="kpi-panel">
              <div className="kpi-panel-top">
                <div className="kpi-title">Ad Sales <InfoIcon /></div>
                <div className="kpi-value-large mb-4">EGP 68.39K</div>
                <div className="sales-contribution-row">
                  <div className="sc-label">Sales<br />Contribution</div>
                  <div className="sc-val">55.61%</div>
                </div>
                <div className="kpi-footer-absolute">Yesterday</div>
              </div>
              <div className="kpi-panel-bottom">
                <div className="kpi-panel-bottom-half">
                  <div className="kpi-title">Conversion Rate <InfoIcon /></div>
                  <div className="kpi-value-medium">1.12%</div>
                  <div className="pill-positive w-fit">↑ +49.33%</div>
                  <div className="kpi-footer-mt-auto">Yesterday</div>
                </div>
                <div className="kpi-panel-bottom-half">
                  <div className="kpi-title">Units Sold <InfoIcon /></div>
                  <div className="kpi-value-medium">18</div>
                  <div className="pill-positive w-fit">↑ +82.28%</div>
                  <div className="kpi-footer-mt-auto">Yesterday</div>
                </div>
              </div>
            </div>

            <div className="kpi-panel">
              <div className="kpi-panel-top">
                <div className="kpi-title">Seller Rating <InfoIcon /></div>
                <div className="rating-row">
                  <div className="rating-pill">4.7</div>
                  <div className="stars-row">
                    <StarIcon filled />
                    <StarIcon filled />
                    <StarIcon filled />
                    <StarIcon filled />
                    <StarIcon />
                  </div>
                </div>
                <div className="rating-sub">Based on 47 reviews</div>
                <button className="see-more-pill">See more →</button>
              </div>
              <div className="kpi-panel-bottom">
                <div className="kpi-panel-bottom-half">
                  <div className="kpi-title">Pending Orders <InfoIcon /></div>
                  <div className="kpi-value-medium">0</div>
                  <div className="tag-row text-muted mt-auto">
                    <span>Pending Shipments</span>
                    <span className="font-bold text-dark">0</span>
                  </div>
                  <div className="tag-row text-muted">
                    <span>Pending Handover</span>
                    <span className="font-bold text-dark">0</span>
                  </div>
                </div>
                <div className="kpi-panel-bottom-half">
                  <div className="kpi-title">IDR <InfoIcon /></div>
                  <div className="kpi-value-medium">1.10%</div>
                  <div className="tag-row text-muted mt-auto">
                    <span>Negative Feedback</span>
                    <span className="font-bold text-dark">1.10%</span>
                  </div>
                  <div className="tag-row text-muted">
                    <span>SCR</span>
                    <span className="font-bold text-dark">0.00%</span>
                  </div>
                  <div className="kpi-footer-mt-auto mt-2">Last 60 days</div>
                </div>
              </div>
            </div>

          </div>

          <div className="promo-banner">
            <div className="promo-left-graphics">
              <div className="tilted-badge">
                <div className="percent-circle">%</div>
                PRICE DROP
              </div>
            </div>

            <div className="promo-center-content">
              <div className="new-feature-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                New feature
              </div>
              <h2>Drop Price, Boost Visibility</h2>
              <p>noon shares the cost & you get premium visibility</p>
              <button className="enroll-btn-white">Enroll your SKUs →</button>
            </div>

            <div className="promo-right-graphics">
              <div className="mega-deal-card">
                <div className="mega-deal-badge">Mega Deal</div>
                <div className="product-image-placeholder">JBL</div>
                <div className="deal-text">11% OFF AED 194.20</div>
                <div className="code-text">Extra 10% OFF CODE: FAB10</div>
              </div>
            </div>

            <div className="star-deco star-1">✨</div>
            <div className="star-deco star-2">✨</div>
            <div className="star-deco star-3">✨</div>
          </div>

        </div>

        <div className="dashboard-side">
          <div className="announcements-card">
            <div className="announcements-header">
              <h3>Announcements</h3>
              <a href="#">See all →</a>
            </div>
            <div className="announcements-body">
              <div className="mega-phone-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20h2"></path>
                  <path d="M7 10v4.a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4"></path>
                  <path d="M12 2v2"></path>
                  <path d="M4.93 4.93l1.41 1.41"></path>
                  <path d="M19.07 4.93l-1.41 1.41"></path>
                </svg>
              </div>
              <p>No new announcements</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};