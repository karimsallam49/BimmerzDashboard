import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import PlaceHolderImage from "../../assets/Images/BMW_logo_(white).svg.png"
import { GetCategoriesEndpoint, GetCarByModelsAPi, ProductsByCategoryEndpoint, SubcategoriesByCategoryEndpoint } from '../../Endpoints/AppEndpoints'
import type { Category } from '../../DTO/CategoryDTO'
import type { CatalogProduct, CatalogProductsPagination } from '../../DTO/CatalogProductDTO'
import type { CarModel } from '../../DTO/CarModelDTO'
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

  const handleProductSelect = (productId: number) => {
    navigate(`/catalog/product/${productId}?car=${selectedCar}&year=${selectedYear}`)
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
            <h1>Product Catalog</h1>
            <p>Select your vehicle to browse categories</p>
          </div>
          <button className="btn-cancel">Cancel</button>
        </div>

        {showCategories ? (
          <div className="search-card">
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
            <form onSubmit={handleCategorySearch}>
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
                <div className="results-header">
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

            {categoryPath.length > 0 && filteredCategories.length > 0 && (
              <div className="subcategories-section">
                <div className="subcategories-header">
                  <span className="subcategories-title">Subcategories</span>
                  <div className="results-meta">
                    <span className="badge-count badge-total">{filteredCategories.length} found</span>
                  </div>
                </div>
                
                <div className="categories-swiper-container">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={16}
                    slidesPerView={'auto'}
                    breakpoints={{
                      320: { slidesPerView: 3, spaceBetween: 10 },
                      576: { slidesPerView: 4, spaceBetween: 15 },
                      768: { slidesPerView: 6, spaceBetween: 20 },
                      1024: { slidesPerView: 8, spaceBetween: 20 },
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    className="categories-swiper"
                  >
                    {filteredCategories.map(category => (
                      <SwiperSlide key={category.id} style={{ height: 'auto', width: 'auto' }}>
                        <div
                          className="category-circle-card"
                          onClick={() => handleCategorySelect(category)}
                        >
                          <div className="category-circle-img-wrap">
                            <img 
                              src={category.logo || PlaceHolderImage} 
                              alt={category.name} 
                              onError={(e) => { e.currentTarget.src = PlaceHolderImage }}
                            />
                          </div>
                          <div className="category-circle-name">{category.name}</div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            )}

            {categoryPath.length > 0 && categoryPath[categoryPath.length - 1]?.category_digram && (
              <div className="category-diagram-container">
                <img 
                  src={categoryPath[categoryPath.length - 1].category_digram!} 
                  alt="Category Diagram" 
                  className="category-diagram-image"
                />
              </div>
            )}

            {currentProducts.length > 0 && (
              <>
                <div className="results-header" style={{ marginTop: categoryPath.length > 0 ? '0' : '2rem' }}>
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
                      onClick={() => handleProductSelect(product.id)}
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
                      {product.default_sell_price > 0 && (
                        <div className="product-price">{product.default_sell_price.toFixed(2)} EGP</div>
                      )}
                    </div>
                  ))}
                </div>
              </>
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
