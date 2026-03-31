import { Card, Row, Col, Badge, Button } from 'react-bootstrap'

interface App {
  id: string
  name: string
  description: string
  category: 'analytics' | 'marketing' | 'productivity' | 'integration' | 'security'
  status: 'installed' | 'available' | 'trial' | 'expired'
  price: string
  rating: number
  users: number
  icon: string
}

export const AppsServicesPage = () => {
  const apps: App[] = [
    {
      id: '1',
      name: 'Google Analytics',
      description: 'Track website traffic and user behavior',
      category: 'analytics',
      status: 'installed',
      price: 'Free',
      rating: 4.5,
      users: 234,
      icon: 'bi-graph-up'
    },
    {
      id: '2',
      name: 'Mailchimp',
      description: 'Email marketing automation platform',
      category: 'marketing',
      status: 'installed',
      price: '$29/month',
      rating: 4.3,
      users: 156,
      icon: 'bi-envelope'
    },
    {
      id: '3',
      name: 'Slack',
      description: 'Team communication and collaboration',
      category: 'productivity',
      status: 'trial',
      price: '$8/user/month',
      rating: 4.6,
      users: 12,
      icon: 'bi-chat-dots'
    },
    {
      id: '4',
      name: 'Shopify Integration',
      description: 'Connect with Shopify store',
      category: 'integration',
      status: 'available',
      price: '$49/month',
      rating: 4.2,
      users: 0,
      icon: 'bi-shop'
    },
    {
      id: '5',
      name: 'Two-Factor Auth',
      description: 'Enhanced security for your account',
      category: 'security',
      status: 'installed',
      price: 'Free',
      rating: 4.8,
      users: 89,
      icon: 'bi-shield-check'
    },
    {
      id: '6',
      name: 'QuickBooks',
      description: 'Accounting and financial management',
      category: 'integration',
      status: 'available',
      price: '$25/month',
      rating: 4.4,
      users: 0,
      icon: 'bi-calculator'
    }
  ]

  const getCategoryBadge = (category: string) => {
    switch(category) {
      case 'analytics': return <Badge bg="primary">Analytics</Badge>
      case 'marketing': return <Badge bg="success">Marketing</Badge>
      case 'productivity': return <Badge bg="info">Productivity</Badge>
      case 'integration': return <Badge bg="warning">Integration</Badge>
      case 'security': return <Badge bg="danger">Security</Badge>
      default: return <Badge bg="secondary">{category}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'installed': return <Badge bg="success">Installed</Badge>
      case 'available': return <Badge bg="info">Available</Badge>
      case 'trial': return <Badge bg="warning">Trial</Badge>
      case 'expired': return <Badge bg="danger">Expired</Badge>
      default: return <Badge bg="secondary">{status}</Badge>
    }
  }

  const installedApps = apps.filter(app => app.status === 'installed')
  const availableApps = apps.filter(app => app.status === 'available')
  const trialApps = apps.filter(app => app.status === 'trial')

  return (
    <div className="apps-services-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Apps & Services</h2>
        <Button variant="primary">
          <i className="bi bi-plus-circle me-2"></i>
          Browse Marketplace
        </Button>
      </div>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-success">{installedApps.length}</h3>
              <p className="mb-0">Installed Apps</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-info">{availableApps.length}</h3>
              <p className="mb-0">Available Apps</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-warning">{trialApps.length}</h3>
              <p className="mb-0">Trial Apps</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-primary">${apps.reduce((sum, app) => {
                if (app.price === 'Free') return sum
                const price = parseFloat(app.price.replace(/[^0-9.]/g, ''))
                return sum + price
              }, 0).toFixed(0)}/month</h3>
              <p className="mb-0">Monthly Cost</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

   
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">Installed Applications</h5>
          <Row>
            {installedApps.map(app => (
              <Col md={4} className="mb-3" key={app.id}>
                <Card className="h-100">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <i className={`bi ${app.icon} display-6 text-primary me-3`}></i>
                      <div>
                        <h6 className="mb-0">{app.name}</h6>
                        {getStatusBadge(app.status)}
                      </div>
                    </div>
                    <p className="text-muted small mb-2">{app.description}</p>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        {getCategoryBadge(app.category)}
                      </div>
                      <div className="text-end">
                        <small className="text-muted">{app.price}</small>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted">
                          <i className="bi bi-star text-warning"></i> {app.rating}
                        </small>
                      </div>
                      <div>
                        <small className="text-muted">{app.users} users</small>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Button variant="outline-primary" size="sm" className="w-100">
                        <i className="bi bi-gear me-2"></i>
                        Configure
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">Available Applications</h5>
          <Row>
            {availableApps.map(app => (
              <Col md={4} className="mb-3" key={app.id}>
                <Card className="h-100">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <i className={`bi ${app.icon} display-6 text-info me-3`}></i>
                      <div>
                        <h6 className="mb-0">{app.name}</h6>
                        {getStatusBadge(app.status)}
                      </div>
                    </div>
                    <p className="text-muted small mb-2">{app.description}</p>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        {getCategoryBadge(app.category)}
                      </div>
                      <div className="text-end">
                        <small className="text-muted">{app.price}</small>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted">
                          <i className="bi bi-star text-warning"></i> {app.rating}
                        </small>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Button variant="primary" size="sm" className="w-100">
                        <i className="bi bi-download me-2"></i>
                        Install
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Trial Apps */}
      {trialApps.length > 0 && (
        <Card>
          <Card.Body>
            <h5 className="mb-3">Trial Applications</h5>
            <Row>
              {trialApps.map(app => (
                <Col md={4} className="mb-3" key={app.id}>
                  <Card className="h-100">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <i className={`bi ${app.icon} display-6 text-warning me-3`}></i>
                        <div>
                          <h6 className="mb-0">{app.name}</h6>
                          {getStatusBadge(app.status)}
                        </div>
                      </div>
                      <p className="text-muted small mb-2">{app.description}</p>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                          {getCategoryBadge(app.category)}
                        </div>
                        <div className="text-end">
                          <small className="text-muted">{app.price}</small>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <small className="text-muted">
                            <i className="bi bi-star text-warning"></i> {app.rating}
                          </small>
                        </div>
                        <div>
                          <small className="text-muted">{app.users} users</small>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Button variant="success" size="sm" className="w-100">
                          <i className="bi bi-credit-card me-2"></i>
                          Upgrade
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}
    </div>
  )
}
