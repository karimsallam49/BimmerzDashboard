import { useState, useMemo } from 'react'
import { Button, Row, Col, Modal } from 'react-bootstrap'
import { 
  PageHeader, 
  SearchFilter, 
  DataTable, 
  StatsCard,
  StatusBadge,
  CardContainer,
  type Column
} from '../../components'

interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  orderDate: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  totalAmount: number
  itemCount: number
  paymentMethod: string
  shippingAddress: string
}

export const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [orders, _setOrders] = useState<Order[]>([
    { id: '1', orderNumber: 'ORD-2024-001', customerName: 'John Doe', customerEmail: 'john@example.com', orderDate: '2024-03-10', status: 'pending', totalAmount: 245.99, itemCount: 3, paymentMethod: 'Credit Card', shippingAddress: '123 Main St, City, State 12345' },
    { id: '2', orderNumber: 'ORD-2024-002', customerName: 'Jane Smith', customerEmail: 'jane@example.com', orderDate: '2024-03-11', status: 'processing', totalAmount: 189.50, itemCount: 2, paymentMethod: 'PayPal', shippingAddress: '456 Oak Ave, Town, State 67890' },
    { id: '3', orderNumber: 'ORD-2024-003', customerName: 'Bob Johnson', customerEmail: 'bob@example.com', orderDate: '2024-03-09', status: 'shipped', totalAmount: 425.00, itemCount: 5, paymentMethod: 'Credit Card', shippingAddress: '789 Pine Rd, Village, State 11111' },
    { id: '4', orderNumber: 'ORD-2024-004', customerName: 'Alice Brown', customerEmail: 'alice@example.com', orderDate: '2024-03-08', status: 'delivered', totalAmount: 156.75, itemCount: 2, paymentMethod: 'Bank Transfer', shippingAddress: '321 Elm St, City, State 22222' },
    { id: '5', orderNumber: 'ORD-2024-005', customerName: 'Charlie Wilson', customerEmail: 'charlie@example.com', orderDate: '2024-03-07', status: 'cancelled', totalAmount: 89.99, itemCount: 1, paymentMethod: 'Credit Card', shippingAddress: '654 Maple Dr, Town, State 33333' }
  ])

  const filteredOrders = useMemo(() => orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !selectedStatus || order.status === selectedStatus
    return matchesSearch && matchesStatus
  }), [orders, searchTerm, selectedStatus])

  const statusFilters = useMemo(() => [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ], [])

  const columns: Column<Order>[] = useMemo(() => [
    { key: 'orderNumber', header: 'Order Number', render: (order) => <span className="fw-bold">{order.orderNumber}</span> },
    { key: 'customerName', header: 'Customer' },
    { key: 'customerEmail', header: 'Email' },
    { key: 'orderDate', header: 'Order Date' },
    { key: 'status', header: 'Status', render: (order) => <StatusBadge status={order.status} /> },
    { key: 'itemCount', header: 'Items' },
    { key: 'totalAmount', header: 'Total Amount', render: (order) => <span className="fw-bold text-primary">${order.totalAmount.toFixed(2)}</span> },
    { key: 'paymentMethod', header: 'Payment Method' }
  ], [])

  const headerActions = useMemo(() => [
    { label: 'Create Order', variant: 'primary' as const, icon: 'bi-plus-circle' }
  ], [])

  const filterActions = (
    <>
      <Button variant="outline-primary">
        <i className="bi bi-download me-2"></i>
        Export
      </Button>
      <Button variant="outline-info">
        <i className="bi bi-truck me-2"></i>
        Bulk Ship
      </Button>
      <Button variant="outline-success">
        <i className="bi bi-envelope me-2"></i>
        Send Notifications
      </Button>
    </>
  )

  const orderStats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  }), [orders])

  return (
    <div className="orders-page">
      <PageHeader 
        title="Order Management" 
        actions={headerActions}
      />

      <Row className="mb-4">
        <Col md={2}>
          <StatsCard title="Total Orders" value={orderStats.total} icon="bi-bag" variant="primary" />
        </Col>
        <Col md={2}>
          <StatsCard title="Pending" value={orderStats.pending} icon="bi-clock" variant="warning" />
        </Col>
        <Col md={2}>
          <StatsCard title="Processing" value={orderStats.processing} icon="bi-gear" variant="info" />
        </Col>
        <Col md={2}>
          <StatsCard title="Shipped" value={orderStats.shipped} icon="bi-box-seam" variant="primary" />
        </Col>
        <Col md={2}>
          <StatsCard title="Delivered" value={orderStats.delivered} icon="bi-check-circle" variant="success" />
        </Col>
        <Col md={2}>
          <StatsCard title="Cancelled" value={orderStats.cancelled} icon="bi-x-circle" variant="danger" />
        </Col>
      </Row>

      <SearchFilter
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search orders..."
        filters={[
          { key: 'status', options: statusFilters, value: selectedStatus, onChange: setSelectedStatus }
        ]}
        actions={filterActions}
      />

      <CardContainer title={`Orders (${filteredOrders.length})`}>
        <DataTable
          data={filteredOrders}
          columns={columns}
          keyExtractor={(order) => order.id}
          emptyMessage="No orders found"
          emptyIcon="bi-bag-check"
        />
      </CardContainer>

      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details - {selectedOrder?.orderNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <Row>
              <Col md={6}>
                <h6>Customer Information</h6>
                <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</p>
              </Col>
              <Col md={6}>
                <h6>Order Information</h6>
                <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
                <p><strong>Status:</strong> <StatusBadge status={selectedOrder.status} /></p>
                <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                <p><strong>Total Amount:</strong> ${selectedOrder.totalAmount.toFixed(2)}</p>
                <p><strong>Items:</strong> {selectedOrder.itemCount}</p>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
          <Button variant="primary">
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
