import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import 'swiper/swiper-bundle.css'
import PlaceHolderImage from "../../assets/Images/BMW_logo_(white).svg.png"
import { GetCategoriesEndpoint, GetCarByModelsAPi, ProductsByCategoryEndpoint, SubcategoriesByCategoryEndpoint } from '../../Endpoints/AppEndpoints'
import type { Category } from '../../DTO/CategoryDTO'
import type { CatalogProduct, CatalogProductsPagination } from '../../DTO/CatalogProductDTO'
import type { CarModel } from '../../DTO/CarModelDTO'
import { addToCart } from '../../store/Cart/cartSlice'
import type { RootState } from '../../store/store'
import "./AddBycategory.css"

const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(GetCategoriesEndpoint, { params: { business_id: 1 } })
  return response.data || []
}

const fetchCarModels = async (): Promise<CarModel[]> => {
  const response = await axios.get(GetCarByModelsAPi(140), { params: { business_id: 1 } })
  return response.data || []
}

const fetchSubcategories = async (categoryId: number): Promise<Category[]> => {
  const response = await axios.get<{ data: Category[] }>(SubcategoriesByCategoryEndpoint(categoryId), { params: { business_id: 1 } })
  return response.data.data || []
}

const fetchProductsByCategory = async (categoryId: number, carBrandId: number, carYear: number): Promise<CatalogProduct[]> => {
  const response = await axios.get<CatalogProductsPagination>(ProductsByCategoryEndpoint(categoryId), { 
    params: { 
      business_id: 1,
      car_brand_id: carBrandId,
      car_year: carYear
    } 
  })
  return response.data.data || []
}

const getYears = () => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let year = currentYear; year >= currentYear - 30; year--) years.push(year)
  return years
}

export const AddByCatalogPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const cartCount = useSelector((state: RootState) => state.cart.totalQuantity)
  const [selectedCar, setSelectedCar] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [showCategories, setShowCategories] = useState(false)
  const [categorySearch, setCategorySearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const [categoryPath, setCategoryPath] = useState<Category[]>([])
  const [currentSubcategories, setCurrentSubcategories] = useState<Category[]>([])
  const [currentProducts, setCurrentProducts] = useState<CatalogProduct[]>([])
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    enabled: showCategories,
  })

  const { data: carModels, isLoading: isLoadingCarModels } = useQuery({
    queryKey: ['carModels'],
    queryFn: fetchCarModels,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCar && selectedYear) {
      setShowCategories(true)
    }
  }

  const handleCategorySearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery(categorySearch)
  }

  const loadCategoryData = async (category: Category) => {
    setIsLoadingSubcategories(true)
    setIsLoadingProducts(true)

    try {
      const carBrandId = parseInt(selectedCar)
      const carYear = parseInt(selectedYear)
      
      const [subcategories, products] = await Promise.all([
        fetchSubcategories(category.id),
        fetchProductsByCategory(category.id, carBrandId, carYear)
      ])

      setCurrentSubcategories(subcategories)
      setCurrentProducts(products)
    } catch (error) {
      console.error('Error loading category data:', error)
    } finally {
      setIsLoadingSubcategories(false)
      setIsLoadingProducts(false)
    }
  }

  const handleCategorySelect = (category: Category) => {
    console.log('Selected category:', category)
    console.log('Category diagram:', category.category_digram)
    setCategoryPath(prev => [...prev, category])
    setCategorySearch('')
    setSearchQuery('')
    loadCategoryData(category)
  }

  const handleNavigateBack = (index: number) => {
    const newPath = categoryPath.slice(0, index + 1)
    setCategoryPath(newPath)

    if (newPath.length === 0) {
      setCurrentSubcategories([])
      setCurrentProducts([])
    } else {
      loadCategoryData(newPath[newPath.length - 1])
    }
  }

  const handleProductSelect = (product: CatalogProduct) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      sku: product.sku,
      image_url: product.image_url,
      price: product.default_sell_price || 0,
      quantity: 1,
      category_id: categoryPath.length > 0 ? categoryPath[categoryPath.length - 1].id : undefined,
      category_name: categoryPath.length > 0 ? categoryPath[categoryPath.length - 1].name : undefined
    }))
    alert(`${product.name} added to cart!`)
  }

  const getDisplayCategories = () => {
    if (categoryPath.length === 0) {
      return categories || []
    }
    return currentSubcategories
  }

  const filteredCategories = getDisplayCategories().filter(cat => {
    if (!searchQuery) return true
    return cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const isLoading = isLoadingCarModels || (showCategories && isLoadingCategories) || isLoadingSubcategories || isLoadingProducts

  if (isLoading) {
    return (
      <div className="catalog-page">
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading...</p>
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
            <h1>Add Product By Catalog</h1>
            <p>Select your vehicle to browse categories</p>
          </div>
        </div>

        {showCategories ? (
          <div className="search-card compact-search-card">
            <div className="compact-search-header">
              <p className="search-card-title">
                {categoryPath.length > 0 ? (
                  <span className="breadcrumb">
                    <span className="breadcrumb-link" onClick={() => handleNavigateBack(-1)}>All Categories</span>
                    {categoryPath.map((cat, index) => (
                      <span key={cat.id}>
                        <span className="breadcrumb-separator"> / </span>
                        {index === categoryPath.length - 1 ? (
                          <span className="breadcrumb-current">{cat.name}</span>
                        ) : (
                          <span className="breadcrumb-link" onClick={() => handleNavigateBack(index)}>{cat.name}</span>
                        )}
                      </span>
                    ))}
                  </span>
                ) : 'Search Categories'}
              </p>
              <form onSubmit={handleCategorySearch} className="compact-search-form">
                <div className="search-row search-category-row">
                  <div className="field-group">
                    <input
                      type="text"
                      className="field-input"
                      value={categorySearch}
                      onChange={(e) => setCategorySearch(e.target.value)}
                      placeholder="Enter category name..."
                    />
                  </div>
                  <button className="btn-search" type="submit">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="search-card">
            <p className="search-card-title">Select Vehicle</p>
            <form onSubmit={handleSearch}>
              <div className="search-row">
                <div className="field-group">
                  <label>Car Model *</label>
                  <select
                    className="field-select"
                    value={selectedCar}
                    onChange={(e) => { setSelectedCar(e.target.value); setSelectedYear('') }}
                    required
                  >
                    <option value="">Select car model</option>
                    {carModels?.map(car => (
                      <option key={car.id} value={car.id}>{car.name}</option>
                    ))}
                  </select>
                </div>

                <div className="field-group">
                  <label>Year *</label>
                  <select
                    className="field-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    required
                    disabled={!selectedCar}
                  >
                    <option value="">Select year</option>
                    {getYears().map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <button className="btn-search" type="submit">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Search
                </button>
              </div>
            </form>
          </div>
        )}

        {showCategories && (
          <>
            {categoryPath.length === 0 && (
              <>
                <div className="results-header" style={{ marginTop: '0', marginBottom: '16px' }}>
                  <span className="results-title">Categories</span>
                  <div className="results-meta">
                    <span className="badge-count badge-total">{filteredCategories.length} found</span>
                  </div>
                </div>
                {filteredCategories.length > 0 ? (
                  <div className="products-grid">
                    {filteredCategories.map(category => (
                      <div
                        key={category.id}
                        className="product-card"
                        onClick={() => handleCategorySelect(category)}
                      >
                        <div className="product-img-wrap">
                          <img 
                            src={category.logo || PlaceHolderImage} 
                            alt={category.name} 
                            onError={(e) => { e.currentTarget.src = PlaceHolderImage }}
                          />
                        </div>
                        <div className="product-name">{category.name}</div>
                        <div className="product-brand">{category.description || 'Category'}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <p>No categories found</p>
                  </div>
                )}
              </>
            )}

            {categoryPath.length > 0 && (
              <div className="catalog-layout">
                {/* Sidebar - Subcategories */}
                {filteredCategories.length > 0 && (
                  <div className="subcategories-sidebar">
                    <div className="subcategories-sidebar-header">
                      <span className="subcategories-sidebar-title">Subcategories</span>
                      <span className="badge-count badge-total">{filteredCategories.length}</span>
                    </div>
                    <div className="subcategories-list">
                      {filteredCategories.map(category => (
                        <div
                          key={category.id}
                          className="subcategory-item"
                          onClick={() => handleCategorySelect(category)}
                        >
                          <div className="subcategory-item-img">
                            <img 
                              src={category.logo || PlaceHolderImage} 
                              alt={category.name} 
                              onError={(e) => { e.currentTarget.src = PlaceHolderImage }}
                            />
                          </div>
                          <span className="subcategory-item-name">{category.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Main Area - Diagram + Products */}
                <div className="products-area">
                  {categoryPath[categoryPath.length - 1]?.category_digram ? (
                    <div className="category-diagram-container">
                      <img 
                        src={categoryPath[categoryPath.length - 1].category_digram!} 
                        alt="Category Diagram" 
                        className="category-diagram-image"
                        onError={(e) => console.error('Failed to load diagram image:', e)}
                      />
                    </div>
                  ) : (
                    <div style={{ padding: '10px', background: '#ffe4e4', borderRadius: '8px', marginBottom: '16px' }}>
                      No diagram for this category
                    </div>
                  )}
                  
                  {currentProducts.length > 0 && (
                    <>
                      <div className="results-header" style={{ marginTop: '0', marginBottom: '16px' }}>
                        <span className="results-title">Products</span>
                        <div className="results-meta">
                          <span className="badge-count badge-total">{currentProducts.length} found</span>
                        </div>
                      </div>
                      <div className="products-grid">
                        {currentProducts.map(product => (
                          <div
                            key={product.id}
                            className="product-card"
                            onClick={() => handleProductSelect(product)}
                          >
                            <div className="product-img-wrap">
                              <img 
                                src={product.image_url || PlaceHolderImage} 
                                alt={product.name} 
                                onError={(e) => { e.currentTarget.src = PlaceHolderImage }}
                              />
                            </div>
                            <div className="product-name">{product.name}</div>
                            <div className="product-brand">{product.sku}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {currentProducts.length === 0 && (
                    <div className="empty-state">
                      <p>No products in this category</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentSubcategories.length === 0 && currentProducts.length === 0 && categoryPath.length > 0 && !isLoadingSubcategories && !isLoadingProducts && (
              <div className="empty-state" style={{ marginTop: '2rem' }}>
                <p>No subcategories or products found in this category</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
