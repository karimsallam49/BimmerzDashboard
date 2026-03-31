import { Card, Row, Col, Badge, Button } from 'react-bootstrap'

interface KPI {
  title: string
  value: string
  target: string
  change: number
  icon: string
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

interface Metric {
  name: string
  current: number
  target: number
  previous: number
  unit: string
  trend: 'up' | 'down' | 'stable'
}

export const PerformancePage = () => {
  const kpis: KPI[] = [
    { title: 'Revenue Growth', value: '23.5%', target: '25%', change: 12.3, icon: 'bi-graph-up-arrow', color: 'success' },
    { title: 'Customer Satisfaction', value: '4.8/5', target: '4.7/5', change: 5.2, icon: 'bi-emoji-smile', color: 'primary' },
    { title: 'Inventory Turnover', value: '8.2x', target: '10x', change: -8.1, icon: 'bi-box-seam', color: 'warning' },
    { title: 'Profit Margin', value: '18.3%', target: '20%', change: 3.7, icon: 'bi-currency-dollar', color: 'info' }
  ]

  const metrics: Metric[] = [
    { name: 'Conversion Rate', current: 3.2, target: 4.0, previous: 2.8, unit: '%', trend: 'up' },
    { name: 'Average Order Value', current: 189, target: 200, previous: 175, unit: '$', trend: 'up' },
    { name: 'Customer Acquisition Cost', current: 45, target: 40, previous: 48, unit: '$', trend: 'down' },
    { name: 'Return Rate', current: 2.1, target: 2.0, previous: 2.3, unit: '%', trend: 'down' },
    { name: 'Website Traffic', current: 12500, target: 15000, previous: 11800, unit: 'visits', trend: 'up' },
    { name: 'Email Open Rate', current: 24.5, target: 25.0, previous: 22.1, unit: '%', trend: 'up' }
  ]

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up': return <i className="bi bi-arrow-up text-success"></i>
      case 'down': return <i className="bi bi-arrow-down text-danger"></i>
      case 'stable': return <i className="bi bi-arrow-right text-warning"></i>
      default: return <i className="bi bi-dash text-muted"></i>
    }
  }

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100
    if (percentage >= 100) return 'success'
    if (percentage >= 80) return 'info'
    if (percentage >= 60) return 'warning'
    return 'danger'
  }

  return (
    <div className="performance-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Performance Dashboard</h2>
        <div>
          <Button variant="outline-primary" className="me-2">
            <i className="bi bi-download me-2"></i>
            Export Report
          </Button>
          <Button variant="primary">
            <i className="bi bi-gear me-2"></i>
            Configure
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <Row className="mb-4">
        {kpis.map((kpi, index) => (
          <Col md={3} key={index}>
            <Card className={`border-${kpi.color} border-2`}>
              <Card.Body className="text-center">
                <i className={`bi ${kpi.icon} display-6 text-${kpi.color} mb-2`}></i>
                <h4 className="mb-1">{kpi.value}</h4>
                <p className="mb-0 text-muted">{kpi.title}</p>
                <div className="mt-2">
                  <small className="text-muted">Target: {kpi.target}</small>
                  <div className={`mt-1 ${kpi.change >= 0 ? 'text-success' : 'text-danger'}`}>
                    <i className={`bi bi-${kpi.change >= 0 ? 'arrow-up' : 'arrow-down'}`}></i>
                    {Math.abs(kpi.change)}%
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Detailed Metrics */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">Performance Metrics</h5>
          <Row>
            {metrics.map((metric, index) => (
              <Col md={6} className="mb-3" key={index}>
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">{metric.name}</h6>
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="d-flex justify-content-between align-items-end">
                      <div>
                        <h4 className="mb-0">
                          {metric.current}{metric.unit}
                        </h4>
                        <small className="text-muted">
                          Target: {metric.target}{metric.unit} | 
                          Previous: {metric.previous}{metric.unit}
                        </small>
                      </div>
                      <div className="text-end">
                        <small className="text-muted">Progress</small>
                        <div className="progress" style={{ width: '100px', height: '8px' }}>
                          <div 
                            className={`progress-bar bg-${getProgressColor(metric.current, metric.target)}`}
                            style={{ width: `${Math.min((metric.current / metric.target) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Performance Score */}
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <h5 className="mb-3">Overall Performance Score</h5>
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <div className="display-1 fw-bold text-primary">82</div>
                  <div className="text-muted">/ 100</div>
                </div>
                <div className="mt-3">
                  <Badge bg="success" className="px-3 py-2">
                    <i className="bi bi-trophy me-2"></i>
                    Good Performance
                  </Badge>
                </div>
              </div>
              
              <Row>
                <Col md={4}>
                  <div className="text-center">
                    <h6 className="text-muted">Strengths</h6>
                    <ul className="list-unstyled">
                      <li><i className="bi bi-check-circle text-success me-2"></i>Customer Satisfaction</li>
                      <li><i className="bi bi-check-circle text-success me-2"></i>Revenue Growth</li>
                      <li><i className="bi bi-check-circle text-success me-2"></i>Conversion Rate</li>
                    </ul>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center">
                    <h6 className="text-muted">Areas to Improve</h6>
                    <ul className="list-unstyled">
                      <li><i className="bi bi-exclamation-circle text-warning me-2"></i>Inventory Turnover</li>
                      <li><i className="bi bi-exclamation-circle text-warning me-2"></i>Profit Margin</li>
                      <li><i className="bi bi-exclamation-circle text-warning me-2"></i>Website Traffic</li>
                    </ul>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center">
                    <h6 className="text-muted">Recommendations</h6>
                    <ul className="list-unstyled">
                      <li><i className="bi bi-lightbulb text-info me-2"></i>Optimize pricing</li>
                      <li><i className="bi bi-lightbulb text-info me-2"></i>Reduce inventory</li>
                      <li><i className="bi bi-lightbulb text-info me-2"></i>SEO improvement</li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5 className="mb-3">Quick Actions</h5>
              <div className="d-grid gap-2">
                <Button variant="outline-primary">
                  <i className="bi bi-target me-2"></i>
                  Set New Goals
                </Button>
                <Button variant="outline-info">
                  <i className="bi bi-graph-up me-2"></i>
                  View Trends
                </Button>
                <Button variant="outline-success">
                  <i className="bi bi-people me-2"></i>
                  Team Performance
                </Button>
                <Button variant="outline-warning">
                  <i className="bi bi-bell me-2"></i>
                  Set Alerts
                </Button>
                <Button variant="outline-secondary">
                  <i className="bi bi-calendar me-2"></i>
                  Schedule Review
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
