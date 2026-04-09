import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DataTable, PageHeader, SearchFilter, CardContainer } from '../../components'
import { Button, ButtonGroup } from 'react-bootstrap'
import axios from 'axios'
import { GetCarByModelsAPi, GetProductsByVendorEndpoint } from '../../Endpoints/AppEndpoints'
import type { VendorProduct } from '../../DTO/VendorProductDTO'
import type { CarModel } from '../../DTO/CarModelDTO'
import type { Column } from '../../components'
import { useAppSelector } from '../../hooks/hooks'
import { useProductFilters } from '../../hooks/useProductFilters'
import { ProductDetailModal } from '../../components/ProductDetailModal/ProductDetailModal'
import './CatalogPage.css'

const fetchVendorProducts = async (filters: Record<string, any> = {}, supplierId: number = 0): Promise<VendorProduct[]> => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== '' && value !== undefined) {
      params.append(key, String(value))
    }
  })

  const response = await axios.get(`${GetProductsByVendorEndpoint(supplierId)}?${params.toString()}`)
  return response.data
}

const fetchCarModels = async (brandId: string | number): Promise<CarModel[]> => {
  const response = await axios.get(GetCarByModelsAPi(brandId))
  return response.data || []
}

export const CatalogPage = () => {
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

  const [selectedProduct, setSelectedProduct] = useState<VendorProduct | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

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
    queryKey: ['vendor-products', filters, user?.supplier?.id],
    queryFn: () => fetchVendorProducts(filters, user?.supplier?.id || 0), 
  })

  const { 
    data: carModels,
    isLoading: isLoadingCarModels
  } = useQuery({
    queryKey: ['car-models', filters.brand_id],
    queryFn: () => fetchCarModels(filters.brand_id || 140),
    enabled: true,
  })
console.log(pagination);

  const vendorProducts = pagination || []
  const currentPage = 1
  const totalPages = 1
  const totalItems = vendorProducts.length

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const filterConfigs = useProductFilters({
    products: vendorProducts,
    carModels,
    isLoadingCarModels,
    filters,
    onFilterChange: handleFilterChange,
  })

  const getConditionStyle = (condition: string) => {
    const normalize = condition?.toLowerCase().replace(/[\s_]+/g, '') || '';
    if (normalize.includes('inreview') || normalize.includes('underreview')) return 'condition-inreview';
    if (normalize === 'active' || normalize === 'approved' || normalize === 'published') return 'condition-active';
    if (normalize === 'inactive' || normalize === 'rejected') return 'condition-inactive';
    return 'condition-default';
  };

  const columns: Column<VendorProduct>[] = [
    { key: 'name', header: 'Product Name', render: (p) => <span className="fw-bold">{p.name}</span> },
    { key: 'sku', header: 'SKU' },
    { key: 'vendor_product_price', header: 'Price', render: (p) => `${p.vendor_product_price} EGP` },
    {
      key: 'product_condition',
      header: 'Condition',
      render: (p) => {
        const cond = p.product_condition || 'Pending';
        // Show UnderReview for anything other than confirmed
        const displayCond = cond.toLowerCase() === 'confirmed' ? 'Confirmed' : 'UnderReview';

        return (
          <span className={`condition-badge ${getConditionStyle(displayCond)}`}>
            {displayCond}
          </span>
        );
      }
    },
  ]

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

  const handleRowClick = (vendorProduct: VendorProduct) => {
    setSelectedProduct(vendorProduct)
    setShowDetailModal(true)
  }

  const handleCloseDetailModal = () => {
    setShowDetailModal(false)
    setSelectedProduct(null)
  }



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
        subtitle="Your Product List As A supplier"
      />
      
      <SearchFilter {...searchFilterProps} />
      
      {isLoading && <p>Loading catalog...</p>}
      {isError && <p>Error: {error instanceof Error ? error.message : 'Failed to load'}</p>}
      
      {!isLoading && !isError && (
        <>
          <CardContainer>
            <DataTable
              data={vendorProducts}
              columns={columns}
              keyExtractor={(p) => p.id.toString()}
              onRowClick={handleRowClick}
              emptyMessage="No products found"
              emptyIcon="bi-box"
            />
          </CardContainer>

          <ProductDetailModal
            show={showDetailModal}
            product={selectedProduct}
            onClose={handleCloseDetailModal}
          />
          
          <div className="d-flex justify-content-between align-items-center mt-3 px-3">
            <div className="text-muted">
              Showing {vendorProducts.length} of {totalItems} items | Page {currentPage} of {totalPages}
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


    </div>
  )
}
