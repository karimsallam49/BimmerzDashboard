import { useState } from 'react'
import { Card, Form, Button, Row, Col, Badge, Table } from 'react-bootstrap'

interface Brand {
  id: string
  name: string
  logo: string
  description: string
  category: string
  status: 'active' | 'inactive' | 'pending'
  products: number
  revenue: number
  established: string
  website: string
  contact: string
}

export const BrandsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [brands, _setBrands] = useState<Brand[]>([
    {
      id: '1',
      name: 'Brembo',
      logo: '🏁',
      description: 'High-performance braking systems for automotive applications',
      category: 'Brakes',
      status: 'active',
      products: 45,
      revenue: 125000,
      established: '1961',
      website: 'www.brembo.com',
      contact: 'info@brembo.com'
    },
    {
      id: '2',
      name: 'Bosch',
      logo: '⚙️',
      description: 'Automotive parts and systems for vehicles and machinery',
      category: 'Electronics',
      status: 'active',
      products: 156,
      revenue: 289000,
      established: '1886',
      website: 'www.bosch.com',
      contact: 'sales@bosch.com'
    },
    {
      id: '3',
      name: 'NGK',
      logo: '🔥',
      description: 'Spark plugs and sensors for internal combustion engines',
      category: 'Ignition',
      status: 'active',
      products: 89,
      revenue: 89000,
      established: '1936',
      website: 'www.ngk.com',
      contact: 'contact@ngk.com'
    },
    {
      id: '4',
      name: 'Mann-Filter',
      logo: '🛡️',
      description: 'Oil, air, fuel, and cabin filters for vehicles',
      category: 'Filters',
      status: 'pending',
      products: 67,
      revenue: 45000,
      established: '1941',
      website: 'www.mann-filter.com',
      contact: 'info@mann-filter.com'
    },
    {
      id: '5',
      name: 'Aisin',
      logo: '🚗',
      description: 'Automotive components including transmissions and water pumps',
      category: 'Cooling',
      status: 'active',
      products: 34,
      revenue: 67000,
      established: '1965',
      website: 'www.aisin.com',
      contact: 'sales@aisin.com'
    }
  ])

  const categories = ['All', 'Brakes', 'Electronics', 'Ignition', 'Filters', 'Cooling', 'Suspension']

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || brand.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': return <Badge bg="success">Active</Badge>
      case 'inactive': return <Badge bg="secondary">Inactive</Badge>
      case 'pending': return <Badge bg="warning">Pending</Badge>
      default: return <Badge bg="secondary">{status}</Badge>
    }
  }

  const totalRevenue = brands.reduce((sum, brand) => sum + brand.revenue, 0)
  const totalProducts = brands.reduce((sum, brand) => sum + brand.products, 0)

  return (
    <div className="brands-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Brand Management</h2>
        <Button variant="primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Brand
        </Button>
      </div>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-primary">{brands.length}</h3>
              <p className="mb-0">Total Brands</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-success">{brands.filter(b => b.status === 'active').length}</h3>
              <p className="mb-0">Active Brands</p>
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
              <h3 className="text-warning">${(totalRevenue / 1000).toFixed(0)}K</h3>
              <p className="mb-0">Total Revenue</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Control
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md={5}>
              <div className="d-flex gap-2">
                <Button variant="outline-primary">
                  <i className="bi bi-download me-2"></i>
                  Export
                </Button>
                <Button variant="outline-info">
                  <i className="bi bi-upload me-2"></i>
                  Import
                </Button>
                <Button variant="outline-success">
                  <i className="bi bi-envelope me-2"></i>
                  Contact All
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h5 className="mb-3">Brand Portfolio ({filteredBrands.length})</h5>

          <Table responsive hover>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Category</th>
                <th>Status</th>
                <th>Products</th>
                <th>Revenue</th>
                <th>Established</th>
                <th>Website</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.map(brand => (
                <tr key={brand.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="fs-4 me-2">{brand.logo}</span>
                      <div>
                        <div className="fw-bold">{brand.name}</div>
                        <small className="text-muted">{brand.description.substring(0, 50)}...</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge bg="outline-primary">{brand.category}</Badge>
                  </td>
                  <td>{getStatusBadge(brand.status)}</td>
                  <td>{brand.products}</td>
                  <td className="fw-bold text-primary">${brand.revenue.toLocaleString()}</td>
                  <td>{brand.established}</td>
                  <td>
                    <a href={`https://${brand.website}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                      <small>{brand.website}</small>
                    </a>
                  </td>
                  <td>
                    <small>{brand.contact}</small>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <Button variant="outline-primary" size="sm">
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button variant="outline-info" size="sm">
                        <i className="bi bi-eye"></i>
                      </Button>
                      <Button variant="outline-success" size="sm">
                        <i className="bi bi-envelope"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {filteredBrands.length === 0 && (
            <div className="text-center py-4">
              <i className="bi bi-bookmark-star display-4 text-muted"></i>
              <p className="text-muted mt-2">No brands found</p>
              <Button variant="primary">
                <i className="bi bi-plus-circle me-2"></i>
                Add Your First Brand
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}
