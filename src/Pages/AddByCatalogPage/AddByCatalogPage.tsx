import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { GetCategoriesEndpoint, GetCarByModelsAPi } from '../../Endpoints/AppEndpoints'
import type { Category } from '../../DTO/CategoryDTO'
import type { CarModel } from '../../DTO/CarModelDTO'
import "./AddBycategory.css"

const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(GetCategoriesEndpoint)
  return response.data || []
}

const fetchCarModels = async (): Promise<CarModel[]> => {
  const response = await axios.get(GetCarByModelsAPi(140))
  return response.data || []
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

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    enabled: showCategories,
  })

  const { data: carModels, isLoading: isLoadingCarModels } = useQuery({
    queryKey: ['carModels'],
    queryFn: fetchCarModels,
  })

  const selectedCarData = carModels?.find(car => car.id.toString() === selectedCar)

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

  const handleCategorySelect = (categoryId: number) => {
    navigate(`/catalog/products?car=${selectedCar}&year=${selectedYear}&category=${categoryId}`)
  }

  const filteredCategories = categories?.filter(cat => {
    if (!searchQuery) return true
    return cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  }) || []

  const isLoading = isLoadingCarModels || (showCategories && isLoadingCategories)

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
            <p className="search-card-title">Search Categories</p>
            <form onSubmit={handleCategorySearch}>
              <div className="search-row">
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
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
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
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  Search
                </button>
              </div>
            </form>
          </div>
        )}

        {showCategories && filteredCategories && (
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
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <div className="product-img-wrap">
                      <img src={category.logo} alt={category.name} />
                    </div>
                    <div className="product-name">{category.name}</div>
                    <div className="product-brand">{category.description || 'Category'}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <p>No categories found</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
