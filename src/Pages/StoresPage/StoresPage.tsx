import { useState } from 'react'
import { Card, Button, Row, Col, Badge, Table } from 'react-bootstrap'

interface Store {
  id: string
  name: string
  type: 'online' | 'physical' | 'marketplace'
  platform: string
  status: 'active' | 'inactive' | 'maintenance'
  products: number
  orders: number
  revenue: number
  lastSync: string
  connected: boolean
}

export const StoresPage = () => {
  const [stores, _setStores] = useState<Store[]>([
    {
      id: '1',
      name: 'Main Website',
      type: 'online',
      platform: 'Custom Website',
      status: 'active',
      products: 245,
      orders: 89,
      revenue: 12450.00,
      lastSync: '2024-03-11 14:30',
      connected: true
    },
    {
      id: '2',
      name: 'Amazon Store',
      type: 'marketplace',
      platform: 'Amazon',
      status: 'active',
      products: 156,
      orders: 234,
      revenue: 28900.00,
      lastSync: '2024-03-11 15:45',
      connected: true
    },
    {
      id: '3',
      name: 'eBay Shop',
      type: 'marketplace',
      platform: 'eBay',
      status: 'active',
      products: 89,
      orders: 67,
      revenue: 8900.00,
      lastSync: '2024-03-11 16:00',
      connected: true
    },
    {
      id: '4',
      name: 'Retail Store - Downtown',
      type: 'physical',
      platform: 'POS System',
      status: 'active',
      products: 320,
      orders: 145,
      revenue: 18750.00,
      lastSync: '2024-03-11 18:00',
      connected: true
    },
    {
      id: '5',
      name: 'Facebook Shop',
      type: 'online',
      platform: 'Facebook',
      status: 'inactive',
      products: 45,
      orders: 12,
      revenue: 1200.00,
      lastSync: '2024-03-10 09:00',
      connected: false
    }
  ])

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'online': return <Badge bg="primary">Online</Badge>
      case 'physical': return <Badge bg="success">Physical</Badge>
      case 'marketplace': return <Badge bg="info">Marketplace</Badge>
      default: return <Badge bg="secondary">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': return <Badge bg="success">Active</Badge>
      case 'inactive': return <Badge bg="secondary">Inactive</Badge>
      case 'maintenance': return <Badge bg="warning">Maintenance</Badge>
      default: return <Badge bg="secondary">{status}</Badge>
    }
  }

  const totalProducts = stores.reduce((sum, s) => sum + s.products, 0)
  const totalOrders = stores.reduce((sum, s) => sum + s.orders, 0)
  const totalRevenue = stores.reduce((sum, s) => sum + s.revenue, 0)
  const activeStores = stores.filter(s => s.status === 'active').length

  return (
    <div className="stores-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Store Management</h2>
        <Button variant="primary">
          <i className="bi bi-plus-circle me-2"></i>
          Connect New Store
        </Button>
      </div>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-primary">{stores.length}</h3>
              <p className="mb-0">Total Stores</p>
              <small className="text-muted">{activeStores} active</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-info">{totalProducts.toLocaleString()}</h3>
              <p className="mb-0">Total Products</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-success">{totalOrders.toLocaleString()}</h3>
              <p className="mb-0">Total Orders</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-warning">${totalRevenue.toLocaleString()}</h3>
              <p className="mb-0">Total Revenue</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Connected Stores ({stores.length})</h5>
            <div>
              <Button variant="outline-primary" className="me-2">
                <i className="bi bi-arrow-repeat me-2"></i>
                Sync All
              </Button>
              <Button variant="outline-info">
                <i className="bi bi-download me-2"></i>
                Export Report
              </Button>
            </div>
          </div>

          <Table responsive hover>
            <thead>
              <tr>
                <th>Store Name</th>
                <th>Type</th>
                <th>Platform</th>
                <th>Status</th>
                <th>Products</th>
                <th>Orders</th>
                <th>Revenue</th>
                <th>Connection</th>
                <th>Last Sync</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stores.map(store => (
                <tr key={store.id}>
                  <td className="fw-bold">{store.name}</td>
                  <td>{getTypeBadge(store.type)}</td>
                  <td>{store.platform}</td>
                  <td>{getStatusBadge(store.status)}</td>
                  <td>{store.products.toLocaleString()}</td>
                  <td>{store.orders.toLocaleString()}</td>
                  <td className="fw-bold text-primary">${store.revenue.toLocaleString()}</td>
                  <td>
                    <Badge bg={store.connected ? 'success' : 'danger'}>
                      {store.connected ? 'Connected' : 'Disconnected'}
                    </Badge>
                  </td>
                  <td>
                    <small>{store.lastSync}</small>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <Button variant="outline-primary" size="sm">
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button variant="outline-info" size="sm">
                        <i className="bi bi-arrow-repeat"></i>
                      </Button>
                      <Button variant="outline-success" size="sm">
                        <i className="bi bi-bar-chart"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {stores.length === 0 && (
            <div className="text-center py-4">
              <i className="bi bi-shop display-4 text-muted"></i>
              <p className="text-muted mt-2">No stores connected yet</p>
              <Button variant="primary">
                <i className="bi bi-plus-circle me-2"></i>
                Connect Your First Store
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}
