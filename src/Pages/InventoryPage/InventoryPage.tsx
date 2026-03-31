import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { ChevronDown, Download } from 'lucide-react'
import { 
  PageHeader, 
  SearchFilter, 
  DataTable, 
  StatsCard,
  Tabs,
  CardContainer,
  type TabItem,
  type Column
} from '../../components'
import './InventoryPage.css'

interface InventoryItem {
  id: string
  product: string
  dimensions: string
  sku: string
  pbarcode: string
  warehouse: string
  saleable: number
  nonSaleable: number
  totalStock: number
}

export const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const tabs: TabItem[] = [
    { id: 'all', label: 'All Warehouses', badge: '0', badgeVariant: 'primary' },
    { id: 'saleable', label: 'Saleable', badge: '0', badgeVariant: 'secondary' },
    { id: 'non-saleable', label: 'Non-Saleable', badge: '0', badgeVariant: 'secondary' }
  ]

  const columns: Column<InventoryItem>[] = [
    { key: 'product', header: 'Product' },
    { key: 'dimensions', header: 'Dimensions' },
    { key: 'sku', header: 'SKU' },
    { key: 'pbarcode', header: 'Pbarcode' },
    { key: 'warehouse', header: 'Warehouse' },
    { key: 'saleable', header: 'Saleable' },
    { key: 'nonSaleable', header: 'Non-Saleable' },
    { key: 'totalStock', header: 'Total Stock' }
  ]

  const filterActions = (
    <>
      <Button variant="outline-secondary">
        Warehouse Name <ChevronDown size={16} />
      </Button>
      <Button variant="outline-secondary">
        Warehouse Type <ChevronDown size={16} />
      </Button>
      <div className="vr mx-2"></div>
      <Button variant="outline-secondary">
        <Download size={16} className="me-2" />
        Export
      </Button>
    </>
  )

  return (
    <div className="inventory-page-container">
      <PageHeader title="My Inventory" />

      <div className="stock-summary-container mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <StatsCard 
              title="Total Stock" 
              value="0 items" 
              icon="bi-box" 
              variant="primary"
            />
          </div>
          <div className="col-md-4">
            <StatsCard 
              title="Saleable Stock" 
              value="0 items" 
              icon="bi-check-circle" 
              variant="success"
            />
          </div>
          <div className="col-md-4">
            <StatsCard 
              title="Non-Saleable Stock" 
              value="0 items" 
              icon="bi-x-circle" 
              variant="warning"
            />
          </div>
        </div>
      </div>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        rightContent={
          <small className="text-muted">
            <i className="bi bi-info-circle me-1"></i>
            Last Updated: 2026-03-14 10:42 AM
          </small>
        }
      />

      <SearchFilter
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search for SKU here..."
        actions={filterActions}
      />

      <CardContainer>
        <DataTable
          data={[]}
          columns={columns}
          keyExtractor={(item) => item.id}
          emptyMessage="No inventory items found"
          emptyIcon="bi-box"
        />
      </CardContainer>
    </div>
  )
}
