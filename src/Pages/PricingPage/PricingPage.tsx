import { useState } from 'react'
import { Card, Form, Button, Row, Col, Table, Badge, InputGroup } from 'react-bootstrap'

interface PricingRule {
  id: string
  productName: string
  sku: string
  basePrice: number
  currentPrice: number
  discountPercent: number
  profitMargin: number
  category: string
  status: 'active' | 'inactive'
  validUntil: string
}

export const PricingPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([
    { id: '1', productName: 'Brake Pads Front', sku: 'BP-001', basePrice: 75.00, currentPrice: 89.99, discountPercent: 0, profitMargin: 20, category: 'Brakes', status: 'active', validUntil: '2024-12-31' },
    { id: '2', productName: 'Oil Filter', sku: 'OF-002', basePrice: 12.00, currentPrice: 15.99, discountPercent: 0, profitMargin: 33, category: 'Filters', status: 'active', validUntil: '2024-12-31' },
    { id: '3', productName: 'Spark Plugs', sku: 'SP-003', basePrice: 35.00, currentPrice: 41.99, discountPercent: 10, profitMargin: 20, category: 'Ignition', status: 'active', validUntil: '2024-11-30' },
    { id: '4', productName: 'Air Filter', sku: 'AF-004', basePrice: 20.00, currentPrice: 25.99, discountPercent: 0, profitMargin: 30, category: 'Filters', status: 'inactive', validUntil: '2024-10-31' },
    { id: '5', productName: 'Brake Discs', sku: 'BD-005', basePrice: 100.00, currentPrice: 120.99, discountPercent: 5, profitMargin: 21, category: 'Brakes', status: 'active', validUntil: '2024-12-31' }
  ])

  const categories = ['All', 'Brakes', 'Filters', 'Ignition', 'Cooling', 'Suspension']

  const filteredRules = pricingRules.filter(rule => {
    const matchesSearch = rule.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || rule.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleStatusToggle = (id: string) => {
    setPricingRules(prev => 
      prev.map(rule => 
        rule.id === id 
          ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
          : rule
      )
    )
  }

  const handleBulkDiscount = () => {
    // TODO: Implement bulk discount functionality
    console.log('Apply bulk discount')
  }

  return (
    <div className="pricing-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Pricing Management</h2>
        <div>
          <Button variant="outline-primary" className="me-2" onClick={handleBulkDiscount}>
            <i className="bi bi-percent me-2"></i>
            Bulk Discount
          </Button>
          <Button variant="primary">
            <i className="bi bi-plus-circle me-2"></i>
            Add Pricing Rule
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-primary">{pricingRules.length}</h3>
              <p className="mb-0">Total Rules</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-success">{pricingRules.filter(rule => rule.status === 'active').length}</h3>
              <p className="mb-0">Active Rules</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-warning">{pricingRules.filter(rule => rule.discountPercent > 0).length}</h3>
              <p className="mb-0">On Discount</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-info">{Math.round(pricingRules.reduce((acc, rule) => acc + rule.profitMargin, 0) / pricingRules.length)}%</h3>
              <p className="mb-0">Avg Margin</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <InputGroup>
                <Form.Control
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-secondary">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
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
                <Button variant="outline-secondary">
                  <i className="bi bi-upload me-2"></i>
                  Import
                </Button>
                <Button variant="outline-info">
                  <i className="bi bi-calculator me-2"></i>
                  Price Calculator
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h5 className="mb-3">Pricing Rules ({filteredRules.length})</h5>

          <Table responsive hover>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Base Price</th>
                <th>Current Price</th>
                <th>Discount</th>
                <th>Profit Margin</th>
                <th>Valid Until</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.map(rule => (
                <tr key={rule.id}>
                  <td>{rule.sku}</td>
                  <td>{rule.productName}</td>
                  <td>{rule.category}</td>
                  <td>${rule.basePrice.toFixed(2)}</td>
                  <td className="fw-bold text-primary">${rule.currentPrice.toFixed(2)}</td>
                  <td>
                    {rule.discountPercent > 0 ? (
                      <Badge bg="success">-{rule.discountPercent}%</Badge>
                    ) : (
                      <Badge bg="secondary">No Discount</Badge>
                    )}
                  </td>
                  <td>
                    <Badge bg={rule.profitMargin >= 30 ? 'success' : rule.profitMargin >= 20 ? 'warning' : 'danger'}>
                      {rule.profitMargin}%
                    </Badge>
                  </td>
                  <td>{rule.validUntil}</td>
                  <td>
                    <Badge bg={rule.status === 'active' ? 'success' : 'secondary'}>
                      {rule.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <Button variant="outline-primary" size="sm">
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button 
                        variant={rule.status === 'active' ? 'outline-warning' : 'outline-success'} 
                        size="sm"
                        onClick={() => handleStatusToggle(rule.id)}
                      >
                        <i className={`bi bi-${rule.status === 'active' ? 'pause' : 'play'}`}></i>
                      </Button>
                      <Button variant="outline-info" size="sm">
                        <i className="bi bi-graph-up"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {filteredRules.length === 0 && (
            <div className="text-center py-4">
              <i className="bi bi-tags display-4 text-muted"></i>
              <p className="text-muted mt-2">No pricing rules found</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}
