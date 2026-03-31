import { useState, useMemo } from 'react'
import { 
  PageHeader, 
  SearchFilter, 
  DataTable, 
  StatusBadge,
  CardContainer,
  Pagination,
  ProductSelector,
  type Column,
  type SelectableProduct,
  type AdditionalField
} from '../../components'
import './ProductListPage.css'

interface Product {
  id: string
  name: string
  description: string
  sku: string
  price: string
  stock: number
  status: 'active' | 'inactive'
  brand: string
}

export const ProductListPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showSelector, setShowSelector] = useState(false)
  
  const products: Product[] = [
    { id: '1', name: 'Bosch Washing Machine', description: 'Front Load, 8kg', sku: 'BWM-001', price: 'EGP 12,999', stock: 45, status: 'active', brand: 'Bosch' },
    { id: '2', name: 'Samsung TV 55"', description: 'Smart TV, 4K', sku: 'STV-002', price: 'EGP 8,999', stock: 12, status: 'active', brand: 'Samsung' },
    { id: '3', name: 'Sony Headphones', description: 'Wireless, Noise Cancelling', sku: 'SH-003', price: 'EGP 2,499', stock: 0, status: 'inactive', brand: 'Sony' }
  ]

  const categories = useMemo(() => [
    { value: '', label: 'All Categories' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Clothing', label: 'Clothing' },
    { value: 'Home & Kitchen', label: 'Home & Kitchen' }
  ], [])

  const statusOptions = useMemo(() => [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ], [])

  const brandOptions = useMemo(() => [
    { value: '', label: 'All Brands' },
    { value: 'Bosch', label: 'Bosch' },
    { value: 'Samsung', label: 'Samsung' },
    { value: 'Sony', label: 'Sony' }
  ], [])

  const filteredProducts = useMemo(() => products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !selectedStatus || product.status === selectedStatus
    return matchesSearch && matchesStatus
  }), [products, searchTerm, selectedStatus])

  const headerActions = useMemo(() => [
    { label: 'Export', variant: 'outline-primary' as const, icon: 'bi-download' },
    { label: 'Add Product', variant: 'primary' as const, icon: 'bi-plus-circle' }
  ], [])

  const columns: Column<Product>[] = useMemo(() => [
    { 
      key: 'product', 
      header: 'Product',
      render: (product) => (
        <div className="product-cell">
          <div className="product-image"></div>
          <div className="product-info">
            <h4>{product.name}</h4>
            <p>{product.description}</p>
          </div>
        </div>
      )
    },
    { key: 'sku', header: 'SKU' },
    { key: 'price', header: 'Price' },
    { key: 'stock', header: 'Stock' },
    { key: 'status', header: 'Status', render: (product) => <StatusBadge status={product.status} /> },
    { key: 'brand', header: 'Brand' }
  ], [])

  const filters = useMemo(() => [
    { key: 'category', options: categories, value: selectedCategory, onChange: setSelectedCategory, placeholder: 'All Categories' },
    { key: 'status', options: statusOptions, value: selectedStatus, onChange: setSelectedStatus, placeholder: 'All Status' },
    { key: 'brand', options: brandOptions, value: selectedBrand, onChange: setSelectedBrand, placeholder: 'All Brands' }
  ], [selectedCategory, selectedStatus, selectedBrand])

  const selectableProducts: SelectableProduct[] = useMemo(() => 
    filteredProducts.map(p => ({ 
      id: p.id,
      name: p.name,
      sku: p.sku,
      price: 0,
      category: p.brand
    })), 
    [filteredProducts]
  )

  const additionalFields: AdditionalField[] = useMemo(() => [
    { key: 'quantity', label: 'Quantity', type: 'number', required: true },
    { 
      key: 'warehouse', 
      label: 'Warehouse', 
      type: 'select', 
      required: true,
      options: [
        { value: 'cairo', label: 'Cairo Warehouse' },
        { value: 'alex', label: 'Alexandria Warehouse' }
      ]
    },
    { key: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Optional notes...' }
  ], [])

  const handleRowClick = () => {
    setShowSelector(true)
  }

  const handleSave = async (selectedProducts: SelectableProduct[], additionalData: Record<string, any>) => {
    const payload = {
      products: selectedProducts.map(p => ({ id: p.id, name: p.name })),
      ...additionalData
    }
    
    console.log('Sending to API:', payload)
  }

  return (
    <div className="product-list-page">
      <PageHeader 
        title="Product List" 
        actions={headerActions}
      />

      <SearchFilter
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search products..."
        filters={filters}
      />

      <CardContainer>
        <DataTable
          data={filteredProducts}
          columns={columns}
          keyExtractor={(product) => product.id}
          selectable
          onRowClick={handleRowClick}
          emptyMessage="No products found"
          emptyIcon="bi-box"
        />
        <Pagination
          currentPage={currentPage}
          totalPages={3}
          onPageChange={setCurrentPage}
          totalItems={156}
          itemsPerPage={10}
        />
      </CardContainer>

      <ProductSelector
        show={showSelector}
        onHide={() => setShowSelector(false)}
        title="Select Products & Add Information"
        products={selectableProducts}
        additionalFields={additionalFields}
        onSave={handleSave}
      />
    </div>
  )
}
