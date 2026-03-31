import { useState } from 'react'
import { Card, Form, Button, Row, Col, Badge, Table, Dropdown } from 'react-bootstrap'

interface Report {
  id: string
  name: string
  type: 'sales' | 'inventory' | 'financial' | 'customer' | 'performance'
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  lastGenerated: string
  status: 'ready' | 'generating' | 'scheduled'
  size: string
  format: 'pdf' | 'excel' | 'csv'
}

export const ReportsPage = () => {
  const [selectedType, setSelectedType] = useState('')
  const [selectedFrequency, setSelectedFrequency] = useState('')
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      name: 'Monthly Sales Report',
      type: 'sales',
      frequency: 'monthly',
      lastGenerated: '2024-03-01 09:00',
      status: 'ready',
      size: '2.4 MB',
      format: 'pdf'
    },
    {
      id: '2',
      name: 'Inventory Status Report',
      type: 'inventory',
      frequency: 'weekly',
      lastGenerated: '2024-03-11 08:30',
      status: 'ready',
      size: '1.8 MB',
      format: 'excel'
    },
    {
      id: '3',
      name: 'Financial Summary Q1',
      type: 'financial',
      frequency: 'quarterly',
      lastGenerated: '2024-03-10 14:15',
      status: 'ready',
      size: '3.2 MB',
      format: 'pdf'
    },
    {
      id: '4',
      name: 'Customer Analytics',
      type: 'customer',
      frequency: 'monthly',
      lastGenerated: '2024-03-05 11:00',
      status: 'generating',
      size: '1.2 MB',
      format: 'csv'
    },
    {
      id: '5',
      name: 'Performance Metrics',
      type: 'performance',
      frequency: 'daily',
      lastGenerated: '2024-03-11 06:00',
      status: 'ready',
      size: '856 KB',
      format: 'excel'
    }
  ])

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'sales': return <Badge bg="primary">Sales</Badge>
      case 'inventory': return <Badge bg="info">Inventory</Badge>
      case 'financial': return <Badge bg="success">Financial</Badge>
      case 'customer': return <Badge bg="warning">Customer</Badge>
      case 'performance': return <Badge bg="secondary">Performance</Badge>
      default: return <Badge bg="secondary">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'ready': return <Badge bg="success">Ready</Badge>
      case 'generating': return <Badge bg="warning">Generating</Badge>
      case 'scheduled': return <Badge bg="info">Scheduled</Badge>
      default: return <Badge bg="secondary">{status}</Badge>
    }
  }

  const getFormatBadge = (format: string) => {
    switch(format) {
      case 'pdf': return <Badge bg="danger">PDF</Badge>
      case 'excel': return <Badge bg="success">Excel</Badge>
      case 'csv': return <Badge bg="info">CSV</Badge>
      default: return <Badge bg="secondary">{format}</Badge>
    }
  }

  const filteredReports = reports.filter(report => {
    const matchesType = !selectedType || report.type === selectedType
    const matchesFrequency = !selectedFrequency || report.frequency === selectedFrequency
    return matchesType && matchesFrequency
  })

  const handleGenerateReport = (reportId: string) => {
    setReports(prev => 
      prev.map(report => 
        report.id === reportId 
          ? { ...report, status: 'generating' }
          : report
      )
    )
  }

  return (
    <div className="reports-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Reports & Analytics</h2>
        <Button variant="primary">
          <i className="bi bi-plus-circle me-2"></i>
          Create New Report
        </Button>
      </div>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-primary">{reports.length}</h3>
              <p className="mb-0">Total Reports</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-success">{reports.filter(r => r.status === 'ready').length}</h3>
              <p className="mb-0">Ready to Download</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-warning">{reports.filter(r => r.status === 'generating').length}</h3>
              <p className="mb-0">Generating</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-info">{reports.filter(r => r.frequency === 'daily').length}</h3>
              <p className="mb-0">Daily Reports</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="sales">Sales</option>
                <option value="inventory">Inventory</option>
                <option value="financial">Financial</option>
                <option value="customer">Customer</option>
                <option value="performance">Performance</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Select
                value={selectedFrequency}
                onChange={(e) => setSelectedFrequency(e.target.value)}
              >
                <option value="">All Frequencies</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <div className="d-flex gap-2">
                <Button variant="outline-primary">
                  <i className="bi bi-download me-2"></i>
                  Bulk Download
                </Button>
                <Button variant="outline-info">
                  <i className="bi bi-clock me-2"></i>
                  Schedule
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Available Reports ({filteredReports.length})</h5>
            <div>
              <Button variant="outline-secondary" className="me-2">
                <i className="bi bi-arrow-repeat me-2"></i>
                Refresh
              </Button>
              <Button variant="outline-primary">
                <i className="bi bi-gear me-2"></i>
                Settings
              </Button>
            </div>
          </div>

          <Table responsive hover>
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Type</th>
                <th>Frequency</th>
                <th>Last Generated</th>
                <th>Status</th>
                <th>Format</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map(report => (
                <tr key={report.id}>
                  <td className="fw-bold">{report.name}</td>
                  <td>{getTypeBadge(report.type)}</td>
                  <td>
                    <Badge bg="outline-secondary" className="text-capitalize">
                      {report.frequency}
                    </Badge>
                  </td>
                  <td>{report.lastGenerated}</td>
                  <td>{getStatusBadge(report.status)}</td>
                  <td>{getFormatBadge(report.format)}</td>
                  <td>{report.size}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-primary" size="sm">
                        <i className="bi bi-three-dots"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <i className="bi bi-download me-2"></i>
                          Download
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleGenerateReport(report.id)}>
                          <i className="bi bi-arrow-repeat me-2"></i>
                          Regenerate
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <i className="bi bi-clock me-2"></i>
                          Schedule
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <i className="bi bi-share me-2"></i>
                          Share
                        </Dropdown.Item>
                        <Dropdown.Item className="text-danger">
                          <i className="bi bi-trash me-2"></i>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {filteredReports.length === 0 && (
            <div className="text-center py-4">
              <i className="bi bi-file-earmark-bar-graph display-4 text-muted"></i>
              <p className="text-muted mt-2">No reports found</p>
              <Button variant="primary">
                <i className="bi bi-plus-circle me-2"></i>
                Create Your First Report
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}
