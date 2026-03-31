import { useState, useMemo } from 'react'
import { Button, Row, Col, Badge, Card } from 'react-bootstrap'
import { 
  PageHeader, 
  SearchFilter, 
  DataTable, 
  StatsCard,
  StatusBadge,
  CardContainer,
  type Column
} from '../../components'

interface Transaction {
  id: string
  transactionId: string
  date: string
  customer: string
  amount: number
  method: 'credit-card' | 'paypal' | 'bank-transfer' | 'cash'
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  orderNumber: string
  fees: number
  netAmount: number
}

interface PaymentMethod {
  id: string
  name: string
  type: string
  status: 'active' | 'inactive'
  transactions: number
  revenue: number
}

export const PaymentsPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedMethod, setSelectedMethod] = useState('')
  
  const [transactions, _setTransactions] = useState<Transaction[]>([
    { id: '1', transactionId: 'TXN-001234', date: '2024-03-11 14:30', customer: 'John Doe', amount: 245.99, method: 'credit-card', status: 'completed', orderNumber: 'ORD-2024-001', fees: 7.38, netAmount: 238.61 },
    { id: '2', transactionId: 'TXN-001235', date: '2024-03-11 13:15', customer: 'Jane Smith', amount: 189.50, method: 'paypal', status: 'completed', orderNumber: 'ORD-2024-002', fees: 5.69, netAmount: 183.81 },
    { id: '3', transactionId: 'TXN-001236', date: '2024-03-11 11:45', customer: 'Bob Johnson', amount: 425.00, method: 'bank-transfer', status: 'pending', orderNumber: 'ORD-2024-003', fees: 12.75, netAmount: 412.25 },
    { id: '4', transactionId: 'TXN-001237', date: '2024-03-10 16:20', customer: 'Alice Brown', amount: 156.75, method: 'credit-card', status: 'failed', orderNumber: 'ORD-2024-004', fees: 0, netAmount: 0 },
    { id: '5', transactionId: 'TXN-001238', date: '2024-03-10 09:30', customer: 'Charlie Wilson', amount: 89.99, method: 'paypal', status: 'refunded', orderNumber: 'ORD-2024-005', fees: 2.70, netAmount: -92.69 }
  ])

  const paymentMethods: PaymentMethod[] = [
    { id: '1', name: 'Credit Card', type: 'Stripe', status: 'active', transactions: 234, revenue: 45600 },
    { id: '2', name: 'PayPal', type: 'PayPal', status: 'active', transactions: 156, revenue: 28900 },
    { id: '3', name: 'Bank Transfer', type: 'Direct', status: 'active', transactions: 45, revenue: 12300 },
    { id: '4', name: 'Cash on Delivery', type: 'Manual', status: 'inactive', transactions: 0, revenue: 0 }
  ]

  const filteredTransactions = useMemo(() => transactions.filter(transaction => {
    const matchesStatus = !selectedStatus || transaction.status === selectedStatus
    const matchesMethod = !selectedMethod || transaction.method === selectedMethod
    return matchesStatus && matchesMethod
  }), [transactions, selectedStatus, selectedMethod])

  const totalRevenue = transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.netAmount, 0)
  const pendingAmount = transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0)
  const totalFees = transactions.reduce((sum, t) => sum + t.fees, 0)

  const headerActions = useMemo(() => [
    { label: 'Process Refund', variant: 'primary' as const, icon: 'bi-plus-circle' }
  ], [])

  const statusOptions = useMemo(() => [
    { value: '', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' }
  ], [])

  const methodOptions = useMemo(() => [
    { value: '', label: 'All Methods' },
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank-transfer', label: 'Bank Transfer' },
    { value: 'cash', label: 'Cash' }
  ], [])

  const columns: Column<Transaction>[] = useMemo(() => [
    { key: 'transactionId', header: 'Transaction ID', render: (t) => <span className="fw-bold">{t.transactionId}</span> },
    { key: 'date', header: 'Date' },
    { key: 'customer', header: 'Customer' },
    { key: 'orderNumber', header: 'Order' },
    { key: 'amount', header: 'Amount', render: (t) => `$${t.amount.toFixed(2)}` },
    { key: 'method', header: 'Method', render: (t) => <MethodBadge method={t.method} /> },
    { key: 'status', header: 'Status', render: (t) => <StatusBadge status={t.status} /> },
    { key: 'fees', header: 'Fees', render: (t) => `$${t.fees.toFixed(2)}` },
    { key: 'netAmount', header: 'Net Amount', render: (t) => <span className="fw-bold">${t.netAmount.toFixed(2)}</span> }
  ], [])

  const filterActions = (
    <>
      <Button variant="outline-primary">
        <i className="bi bi-download me-2"></i>
        Export
      </Button>
      <Button variant="outline-info">
        <i className="bi bi-arrow-repeat me-2"></i>
        Sync
      </Button>
    </>
  )

  return (
    <div className="payments-page">
      <PageHeader title="Payment Management" actions={headerActions} />

      <Row className="mb-4">
        <Col md={3}>
          <StatsCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon="bi-cash-stack" variant="success" />
        </Col>
        <Col md={3}>
          <StatsCard title="Pending Amount" value={`$${pendingAmount.toLocaleString()}`} icon="bi-clock" variant="warning" />
        </Col>
        <Col md={3}>
          <StatsCard title="Total Fees" value={`$${totalFees.toLocaleString()}`} icon="bi-credit-card" variant="info" />
        </Col>
        <Col md={3}>
          <StatsCard title="Transactions" value={transactions.length} icon="bi-arrow-left-right" variant="primary" />
        </Col>
      </Row>

      <CardContainer title="Payment Methods" className="mb-4">
        <Row>
          {paymentMethods.map(method => (
            <Col md={3} key={method.id}>
              <Card className={`h-100 ${method.status === 'inactive' ? 'opacity-50' : ''}`}>
                <Card.Body className="text-center">
                  <i className={`bi bi-credit-card display-6 ${method.status === 'active' ? 'text-primary' : 'text-muted'} mb-2`}></i>
                  <h6>{method.name}</h6>
                  <p className="text-muted small mb-1">{method.type}</p>
                  <Badge bg={method.status === 'active' ? 'success' : 'secondary'}>
                    {method.status}
                  </Badge>
                  <div className="mt-2">
                    <small className="text-muted">{method.transactions} transactions</small><br/>
                    <small className="text-muted">${method.revenue.toLocaleString()} revenue</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </CardContainer>

      <SearchFilter
        searchValue=""
        onSearchChange={() => {}}
        searchPlaceholder="Search transactions..."
        filters={[
          { key: 'status', options: statusOptions, value: selectedStatus, onChange: setSelectedStatus },
          { key: 'method', options: methodOptions, value: selectedMethod, onChange: setSelectedMethod }
        ]}
        actions={filterActions}
      />

      <CardContainer title={`Recent Transactions (${filteredTransactions.length})`}>
        <DataTable
          data={filteredTransactions}
          columns={columns}
          keyExtractor={(t) => t.id}
          emptyMessage="No transactions found"
          emptyIcon="bi-credit-card"
        />
      </CardContainer>
    </div>
  )
}

const MethodBadge = ({ method }: { method: string }) => {
  const config: Record<string, { bg: string; label: string }> = {
    'credit-card': { bg: 'primary', label: 'Credit Card' },
    'paypal': { bg: 'info', label: 'PayPal' },
    'bank-transfer': { bg: 'success', label: 'Bank Transfer' },
    'cash': { bg: 'secondary', label: 'Cash' }
  }
  const { bg, label } = config[method] || { bg: 'secondary', label: method }
  return <Badge bg={bg}>{label}</Badge>
}
