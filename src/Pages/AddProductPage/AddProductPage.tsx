import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DataTable, PageHeader, SearchFilter, CardContainer } from '../../components'
import { Button, ButtonGroup } from 'react-bootstrap'
import axios from 'axios'
import { VendorProductsEndpoint, VendorProductsStoreEndpoint, GetCarByModelsAPi } from '../../Endpoints/AppEndpoints'
import './AddProductPage.css'
import type { ProductsPagination, Product } from '../../DTO/ProductsDTO'
import type { CarModel } from '../../DTO/CarModelDTO'
import type { Column } from '../../components'
import { AddProductModal } from '../../Component/AddProductModal/AddProductModal'
import { useAppSelector } from '../../hooks/hooks'
import { useProductFilters } from '../../hooks/useProductFilters'

const fetchProducts = async (filters: Record<string, any> = {}): Promise<ProductsPagination> => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== '' && value !== undefined) {
      params.append(key, String(value))
    }
  })

  const response = await axios.get(`${VendorProductsEndpoint}?${params.toString()}`)
  return response.data
}

const fetchCarModels = async (brandId: string | number): Promise<CarModel[]> => {
  const response = await axios.get(GetCarByModelsAPi(brandId))
  return response.data || []
}

export const AddProductPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const {user}=useAppSelector((state)=>state.auth)
  const [searchInput, setSearchInput] = useState('')
  
  const [filters, setFilters] = useState({
    search: '',
    brand_id: '',
    category_id: '',
    model_id: '',
    year: '',
    page: 1,
    per_page: 15,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchInput }))
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [searchInput])

  const { 
    data: pagination, 
    isLoading, 
    isError, 
    error
  } = useQuery({
    queryKey: ['vendor-products', filters],
    queryFn: () => fetchProducts(filters), 
  })

  const { 
    data: carModels,
    isLoading: isLoadingCarModels
  } = useQuery({
    queryKey: ['car-models', filters.brand_id],
    queryFn: () => fetchCarModels(filters.brand_id || 140),
    enabled: true,
  })

  const products = pagination?.data || []
  const currentPage = pagination?.current_page || 1
  const totalPages = pagination?.last_page || 1
  const totalItems = pagination?.total || 0

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setFilters(prev => ({ ...prev, page: currentPage - 1 }))
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setFilters(prev => ({ ...prev, page: currentPage + 1 }))
    }
  }

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedProduct(null)
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const filterConfigs = useProductFilters({
    products: products,
    carModels,
    isLoadingCarModels,
    filters,
    onFilterChange: handleFilterChange,
  })

  const columns: Column<Product>[] = [
    { key: 'name', header: 'Product Name', render: (p) => <span className="fw-bold">{p.name}</span> },
    { key: 'sku', header: 'SKU' },
    { key: 'brand', header: 'Brand', render: (p) => p.brand?.name || '-' },
    { key: 'category', header: 'Category', render: (p) => p.category?.name || '-' },
    { key: 'unit', header: 'Unit', render: (p) => p.unit?.short_name || '-' },
  ]

  const searchFilterProps = {
    searchLabel: 'Search Catalog',
    searchValue: searchInput,
    onSearchChange: setSearchInput,
    searchPlaceholder: 'Search by name or SKU...',
    filters: filterConfigs
  }

  return (
    <div className="add-product-container flex-column">
      <PageHeader 
        title="Product List" 
        subtitle="Prduct List To Add "
      />
      
      <SearchFilter {...searchFilterProps} />
      
      {isLoading && <p>Loading catalog...</p>}
      {isError && <p>Error: {error instanceof Error ? error.message : 'Failed to load'}</p>}
      
      {!isLoading && !isError && (
        <>
          <CardContainer>
            <DataTable 
              data={products} 
              columns={columns}
              keyExtractor={(p) => p.id.toString()}
              onRowClick={handleRowClick}
              emptyMessage="No products found"
              emptyIcon="bi-box"
            />
          </CardContainer>
          
          <div className="d-flex justify-content-between align-items-center mt-3 px-3">
            <div className="text-muted">
              Showing {products.length} of {totalItems} items | Page {currentPage} of {totalPages}
            </div>
            <ButtonGroup>
              <Button 
                variant="outline-primary" 
                onClick={handlePrevPage} 
                disabled={currentPage === 1 || isLoading}
              >
                Previous
              </Button>
              <Button 
                variant="outline-primary" 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages || isLoading}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        </>
      )}

      <AddProductModal
        show={showModal}
        product={selectedProduct}
        onClose={handleCloseModal}
        vendorId={user?.supplier.id || 0} 
        onSubmit={async (payload) => {
          await axios.post(VendorProductsStoreEndpoint, payload)
          alert('Product added successfully!')
        }}
      />
    </div>
  )
}
