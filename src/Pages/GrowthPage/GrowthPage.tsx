import { Card, Row, Col, Badge, Button } from 'react-bootstrap'

interface Metric {
  title: string
  value: string
  change: number
  icon: string
}

interface Opportunity {
  id: string
  title: string
  description: string
  potential: string
  difficulty: 'low' | 'medium' | 'high'
  estimatedImpact: string
}

export const GrowthPage = () => {
  const metrics: Metric[] = [
    { title: 'Monthly Revenue', value: '$45,230', change: 12.5, icon: 'bi-currency-dollar' },
    { title: 'New Customers', value: '234', change: 8.2, icon: 'bi-people' },
    { title: 'Conversion Rate', value: '3.2%', change: -2.1, icon: 'bi-graph-up' },
    { title: 'Average Order Value', value: '$189', change: 5.8, icon: 'bi-cart-check' }
  ]

  const opportunities: Opportunity[] = [
    {
      id: '1',
      title: 'Expand to New Markets',
      description: 'Enter European market with localized products and marketing',
      potential: 'High',
      difficulty: 'high',
      estimatedImpact: '+$25,000/month'
    },
    {
      id: '2',
      title: 'Product Bundle Optimization',
      description: 'Create strategic product bundles to increase average order value',
      potential: 'Medium',
      difficulty: 'low',
      estimatedImpact: '+$8,000/month'
    },
    {
      id: '3',
      title: 'Email Marketing Campaign',
      description: 'Implement automated email sequences for customer retention',
      potential: 'Medium',
      difficulty: 'medium',
      estimatedImpact: '+$12,000/month'
    },
    {
      id: '4',
      title: 'SEO Enhancement',
      description: 'Improve search engine rankings for high-value keywords',
      potential: 'High',
      difficulty: 'medium',
      estimatedImpact: '+$15,000/month'
    }
  ]

  const getDifficultyBadge = (difficulty: string) => {
    switch(difficulty) {
      case 'low': return <Badge bg="success">Low</Badge>
      case 'medium': return <Badge bg="warning">Medium</Badge>
      case 'high': return <Badge bg="danger">High</Badge>
      default: return <Badge bg="secondary">{difficulty}</Badge>
    }
  }

  const getPotentialBadge = (potential: string) => {
    switch(potential) {
      case 'Low': return <Badge bg="secondary">Low</Badge>
      case 'Medium': return <Badge bg="info">Medium</Badge>
      case 'High': return <Badge bg="success">High</Badge>
      default: return <Badge bg="secondary">{potential}</Badge>
    }
  }

  return (
    <div className="growth-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Growth Analytics</h2>
        <Button variant="primary">
          <i className="bi bi-plus-circle me-2"></i>
          Create Growth Plan
        </Button>
      </div>

      {/* Key Metrics */}
      <Row className="mb-4">
        {metrics.map((metric, index) => (
          <Col md={3} key={index}>
            <Card className="text-center">
              <Card.Body>
                <i className={`bi ${metric.icon} display-6 text-primary mb-2`}></i>
                <h4 className="mb-1">{metric.value}</h4>
                <p className="mb-0 text-muted">{metric.title}</p>
                <div className={`mt-2 ${metric.change >= 0 ? 'text-success' : 'text-danger'}`}>
                  <i className={`bi bi-${metric.change >= 0 ? 'arrow-up' : 'arrow-down'}`}></i>
                  {Math.abs(metric.change)}%
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Growth Opportunities */}
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Growth Opportunities</h5>
            <Button variant="outline-primary">
              <i className="bi bi-filter me-2"></i>
              Filter
            </Button>
          </div>

          <Row>
            {opportunities.map(opp => (
              <Col md={6} className="mb-3" key={opp.id}>
                <Card className="h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="mb-0">{opp.title}</h6>
                      <div>
                        {getPotentialBadge(opp.potential)}
                      </div>
                    </div>
                    <p className="text-muted small mb-3">{opp.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted">Difficulty:</small>
                        <div className="mt-1">{getDifficultyBadge(opp.difficulty)}</div>
                      </div>
                      <div className="text-end">
                        <small className="text-muted">Est. Impact:</small>
                        <div className="fw-bold text-success">{opp.estimatedImpact}</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button variant="outline-primary" size="sm" className="w-100">
                        <i className="bi bi-arrow-right me-2"></i>
                        Learn More
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Growth Strategy */}
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <h5 className="mb-3">Growth Strategy Timeline</h5>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-marker bg-primary"></div>
                  <div className="timeline-content">
                    <h6>Q1 2024: Foundation</h6>
                    <p className="text-muted small mb-2">Optimize existing channels and improve conversion rates</p>
                    <Badge bg="primary">In Progress</Badge>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker bg-secondary"></div>
                  <div className="timeline-content">
                    <h6>Q2 2024: Expansion</h6>
                    <p className="text-muted small mb-2">Launch new product lines and enter new markets</p>
                    <Badge bg="secondary">Planned</Badge>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker bg-secondary"></div>
                  <div className="timeline-content">
                    <h6>Q3 2024: Scaling</h6>
                    <p className="text-muted small mb-2">Scale successful initiatives and optimize operations</p>
                    <Badge bg="secondary">Planned</Badge>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5 className="mb-3">Quick Actions</h5>
              <div className="d-grid gap-2">
                <Button variant="outline-primary">
                  <i className="bi bi-graph-up me-2"></i>
                  View Analytics
                </Button>
                <Button variant="outline-info">
                  <i className="bi bi-lightbulb me-2"></i>
                  Generate Ideas
                </Button>
                <Button variant="outline-success">
                  <i className="bi bi-people me-2"></i>
                  Customer Research
                </Button>
                <Button variant="outline-warning">
                  <i className="bi bi-calculator me-2"></i>
                  ROI Calculator
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style>{`
        .timeline {
          position: relative;
          padding-left: 30px;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 8px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #e9ecef;
        }
        .timeline-item {
          position: relative;
          margin-bottom: 30px;
        }
        .timeline-marker {
          position: absolute;
          left: -22px;
          top: 5px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid #fff;
        }
        .timeline-content {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  )
}
