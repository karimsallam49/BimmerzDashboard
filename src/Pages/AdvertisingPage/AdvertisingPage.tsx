import { useState } from 'react'
import { Card, Button, Row, Col, Badge, Table } from 'react-bootstrap'

interface Campaign {
  id: string
  name: string
  type: 'search' | 'display' | 'social' | 'email'
  status: 'active' | 'paused' | 'draft' | 'completed'
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  startDate: string
  endDate: string
  ctr: number
  cpc: number
}

export const AdvertisingPage = () => {
  const [campaigns, _setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Spring Brake Pads Sale',
      type: 'search',
      status: 'active',
      budget: 5000,
      spent: 2340,
      impressions: 45000,
      clicks: 890,
      conversions: 45,
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      ctr: 1.98,
      cpc: 2.63
    },
    {
      id: '2',
      name: 'Oil Filter Bundle Deal',
      type: 'display',
      status: 'active',
      budget: 3000,
      spent: 1200,
      impressions: 32000,
      clicks: 456,
      conversions: 23,
      startDate: '2024-03-10',
      endDate: '2024-04-10',
      ctr: 1.43,
      cpc: 2.63
    },
    {
      id: '3',
      name: 'Brand Awareness Campaign',
      type: 'social',
      status: 'paused',
      budget: 2000,
      spent: 1800,
      impressions: 67000,
      clicks: 1234,
      conversions: 12,
      startDate: '2024-02-15',
      endDate: '2024-03-15',
      ctr: 1.84,
      cpc: 1.46
    },
    {
      id: '4',
      name: 'Email Newsletter March',
      type: 'email',
      status: 'completed',
      budget: 500,
      spent: 450,
      impressions: 15000,
      clicks: 890,
      conversions: 67,
      startDate: '2024-03-01',
      endDate: '2024-03-01',
      ctr: 5.93,
      cpc: 0.51
    }
  ])

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'search': return <Badge bg="primary">Search</Badge>
      case 'display': return <Badge bg="info">Display</Badge>
      case 'social': return <Badge bg="success">Social</Badge>
      case 'email': return <Badge bg="warning">Email</Badge>
      default: return <Badge bg="secondary">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': return <Badge bg="success">Active</Badge>
      case 'paused': return <Badge bg="warning">Paused</Badge>
      case 'draft': return <Badge bg="secondary">Draft</Badge>
      case 'completed': return <Badge bg="info">Completed</Badge>
      default: return <Badge bg="secondary">{status}</Badge>
    }
  }

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0)
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0)
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0)
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0)
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0)

  return (
    <div className="advertising-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Advertising Campaigns</h2>
        <Button variant="primary">
          <i className="bi bi-plus-circle me-2"></i>
          Create Campaign
        </Button>
      </div>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-primary">${totalSpent.toLocaleString()}</h3>
              <p className="mb-0">Total Spent</p>
              <small className="text-muted">of ${totalBudget.toLocaleString()} budget</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-info">{(totalImpressions / 1000).toFixed(0)}K</h3>
              <p className="mb-0">Impressions</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-success">{totalClicks.toLocaleString()}</h3>
              <p className="mb-0">Total Clicks</p>
              <small className="text-muted">CTR: {((totalClicks / totalImpressions) * 100).toFixed(2)}%</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-warning">{totalConversions}</h3>
              <p className="mb-0">Conversions</p>
              <small className="text-muted">CPC: ${(totalSpent / totalClicks).toFixed(2)}</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Active Campaigns ({campaigns.length})</h5>
            <div>
              <Button variant="outline-primary" className="me-2">
                <i className="bi bi-download me-2"></i>
                Export Report
              </Button>
              <Button variant="outline-info">
                <i className="bi bi-graph-up me-2"></i>
                Analytics
              </Button>
            </div>
          </div>

          <Table responsive hover>
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Budget / Spent</th>
                <th>Impressions</th>
                <th>Clicks</th>
                <th>CTR</th>
                <th>CPC</th>
                <th>Conversions</th>
                <th>Date Range</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(campaign => (
                <tr key={campaign.id}>
                  <td className="fw-bold">{campaign.name}</td>
                  <td>{getTypeBadge(campaign.type)}</td>
                  <td>{getStatusBadge(campaign.status)}</td>
                  <td>
                    <div>${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</div>
                    <div className="progress" style={{ height: '6px' }}>
                      <div 
                        className="progress-bar" 
                        style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td>{campaign.impressions.toLocaleString()}</td>
                  <td>{campaign.clicks.toLocaleString()}</td>
                  <td>{campaign.ctr.toFixed(2)}%</td>
                  <td>${campaign.cpc.toFixed(2)}</td>
                  <td className="fw-bold">{campaign.conversions}</td>
                  <td>
                    <small>{campaign.startDate}</small><br/>
                    <small>{campaign.endDate}</small>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <Button variant="outline-primary" size="sm">
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button variant="outline-info" size="sm">
                        <i className="bi bi-bar-chart"></i>
                      </Button>
                      <Button variant="outline-success" size="sm">
                        <i className="bi bi-play"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {campaigns.length === 0 && (
            <div className="text-center py-4">
              <i className="bi bi-megaphone display-4 text-muted"></i>
              <p className="text-muted mt-2">No advertising campaigns found</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}
