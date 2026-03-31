import { useSearchParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { VendorProductsEndpoint } from '../../Endpoints/AppEndpoints'
import type { Product } from '../../DTO/ProductsDTO'
import "./CatalogProductsPage.css"

interface ProductWithSelection extends Product {
  selected: boolean
}

const fetchProducts = async (carId: string, year: string, categoryId: string): Promise<ProductWithSelection[]> => {
  const response = await axios.get(`${VendorProductsEndpoint}?car_id=${carId}&year=${year}&category_id=${categoryId}`)
  return response.data?.data?.map((p: Product) => ({ ...p, selected: false })) || []
}

export const CatalogProductsPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const carId = searchParams.get('car') || ''
  const year = searchParams.get('year') || ''
  const categoryId = searchParams.get('category') || ''

  const { data: products, isLoading } = useQuery({
    queryKey: ['catalogProducts', carId, year, categoryId],
    queryFn: () => fetchProducts(carId, year, categoryId),
    enabled: !!carId && !!year && !!categoryId,
  })

  const selectedCount = products?.filter(p => p.selected).length || 0

  const handleProductSelect = (productId: number) => {
    // Toggle selection logic would go here with React Query mutation
    console.log('Selected product:', productId)
  }

  const handleAddSelected = () => {
    const selected = products?.filter(p => p.selected)
    console.log('Adding products:', selected)
  }

  const handleBack = () => {
    navigate('/Add-Product-Catalog')
  }

  if (isLoading) {
    return (
      <div className="catalog-page">
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
      `}</style>

      <div className="catalog-page">
        <div className="catalog-header">
          <div className="catalog-header-left">
            <h1>Available Products</h1>
            <p>Car ID: {carId} | Year: {year} | Category: {categoryId}</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-cancel" onClick={handleBack}>
              Back to Categories
            </button>
            <button className="btn-cancel">Cancel</button>
          </div>
        </div>

        <div className="results-header">
          <span className="results-title">Products</span>
          <div className="results-meta">
            <span className="badge-count badge-total">{products?.length || 0} found</span>
            {selectedCount > 0 && (
              <span className="badge-count badge-selected">{selectedCount} selected</span>
            )}
          </div>
        </div>

        {products && products.length > 0 ? (
          <>
            <div className="products-grid">
              {products.map(product => (
                <div
                  key={product.id}
                  className={`product-card ${product.selected ? 'selected' : ''}`}
                  onClick={() => handleProductSelect(product.id)}
                >
                  <div className="check-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="product-img-wrap">
                    <img 
                      src={product.image_url || '/placeholder-product.png'} 
                      alt={product.name} 
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-product.png' }}
                    />
                  </div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-brand">SKU: {product.sku}</div>
                </div>
              ))}
            </div>

            <div className="results-footer">
              <span className="footer-hint">Click a product to select it</span>
              <button
                className="btn-add"
                onClick={handleAddSelected}
                disabled={selectedCount === 0}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add Selected ({selectedCount})
              </button>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <p>No products found for this category</p>
          </div>
        )}
      </div>
    </>
  )
}
