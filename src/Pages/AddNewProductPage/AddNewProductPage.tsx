import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Spinner, Card } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { 
  GetAllwarranties, 
  GetCountriesEndpoint,
  GetBrandsEndpoint,
  GetCategoriesEndpoint,
  GetUnitsEndpoint,
  AddNewProductEndpoint
} from '../../Endpoints/AppEndpoints'
import type { Warranty } from '../../DTO/warrantyDTO'
import type { Country } from '../../DTO/CountryDTO'
import type { Unit } from '../../DTO/UnitDTO'
import type { Category } from '../../DTO/CategoryDTO'
import type { Brand } from '../../DTO/BrandDTO'
import './AddNewProductPage.css'
import { useAppSelector } from '../../hooks/hooks'

const fetchWarranties = async (): Promise<Warranty[]> => {
  const response = await axios.get(GetAllwarranties)
  return response.data || []
}

const fetchCountries = async (): Promise<Country[]> => {
  const response = await axios.get(GetCountriesEndpoint)
  return response.data || []
}

const fetchBrands = async (): Promise<Brand[]> => {
  const response = await axios.get(GetBrandsEndpoint)
  return response.data || []
}

const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(GetCategoriesEndpoint)
  return response.data || []
}

const fetchUnits = async (): Promise<Unit[]> => {
  const response = await axios.get(GetUnitsEndpoint)
  return response.data || []
}

export const AddNewProductPage = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {user} = useAppSelector((state)=>state.auth)
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    brand_id: '',
    category_id: '',
    sub_category_id: '',
    unit_id: '',
    type: 'single',
    tax_type: 'inclusive',
    tax: '',
    price: '',
    enable_stock: '1',
    alert_quantity: '',
    product_description: '',
    product_specifications: '',
    key_features: '',
    product_condition: 'new',
    warranty_id: '',
    country_id: '',
    manufacturing_year: ''
  })
  const [selectedImages, setSelectedImages] = useState<File[]>([])

  const { data: warranties, isLoading: isLoadingWarranties } = useQuery({
    queryKey: ['warranties'],
    queryFn: fetchWarranties,
  })

  const { data: countries, isLoading: isLoadingCountries } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  })

  const { data: brands, isLoading: isLoadingBrands } = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
  })

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const { data: units, isLoading: isLoadingUnits } = useQuery({
    queryKey: ['units'],
    queryFn: fetchUnits,
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setSelectedImages(prev => [...prev, ...files])
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('sku', formData.sku)
      formDataToSend.append('brand_id', formData.brand_id || '')
      formDataToSend.append('category_id', formData.category_id || '')
      formDataToSend.append('sub_category_id', formData.sub_category_id || '')
      formDataToSend.append('unit_id', formData.unit_id || '')
      formDataToSend.append('type', formData.type)
      formDataToSend.append('tax_type', formData.tax_type)
      formDataToSend.append('tax', formData.tax || '')
      formDataToSend.append('price', formData.price)
      formDataToSend.append('enable_stock', formData.enable_stock === '1' ? '1' : '0')
      formDataToSend.append('alert_quantity', formData.alert_quantity || '')
      formDataToSend.append('product_description', formData.product_description)
      formDataToSend.append('product_specifications', formData.product_specifications)
      formDataToSend.append('key_features', formData.key_features)
      formDataToSend.append('product_condition', formData.product_condition)
      formDataToSend.append('warranty_id', formData.warranty_id || '')
      formDataToSend.append('country_id', formData.country_id || '')
      formDataToSend.append('manufacturing_year', formData.manufacturing_year || '')
      formDataToSend.append('vendor_id', String(user?.supplier.id || 1))
      
      selectedImages.forEach((image, index) => {
        formDataToSend.append(`image[${index}]`, image)
      })

      await axios.post(AddNewProductEndpoint, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      navigate('/Product-List')
    } catch (err) {
      alert('Failed to add product')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLoading = isLoadingWarranties || isLoadingCountries || isLoadingBrands || isLoadingCategories || isLoadingUnits
  console.log(units);
  
  return (
    <div className="add-new-product-container">
      <PageHeader 
        title="Add New Product" 
        subtitle="Create a new product in the master catalog"
      />

      <Card className="form-card">
        <Card.Body>
          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
              <p className="mt-2 text-muted">Loading form data...</p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              {/* Product Images */}
              <h5 className="section-title mb-3">Product Images</h5>
              <Row className="mb-4">
                {selectedImages.map((image, index) => (
                  <Col md={3} sm={4} xs={6} key={index} className="mb-3">
                    <div 
                      className="position-relative d-flex align-items-center justify-content-center rounded"
                      style={{ 
                        width: '100%', 
                        height: '120px', 
                        border: '2px dashed #dee2e6',
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        className="position-absolute top-0 end-0 m-1"
                        style={{ padding: '2px 6px', fontSize: '12px' }}
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </Button>
                    </div>
                  </Col>
                ))}
                <Col md={3} sm={4} xs={6} className="mb-3">
                  <div
                    className="d-flex flex-column align-items-center justify-content-center rounded cursor-pointer"
                    style={{ 
                      width: '100%', 
                      height: '120px', 
                      border: '2px dashed #adb5bd',
                      backgroundColor: '#f8f9fa'
                    }}
                    onClick={() => document.getElementById('image-input')?.click()}
                  >
                    <span style={{ fontSize: '24px', color: '#adb5bd' }}>+</span>
                    <span style={{ fontSize: '12px', color: '#6c757d' }}>Add Image</span>
                  </div>
                  <Form.Control
                    id="image-input"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </Col>
              </Row>

              {/* Basic Information */}
              <h5 className="section-title mb-3">Basic Information</h5>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Product Name *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      placeholder="Enter product name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>SKU *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.sku}
                      onChange={(e) => handleChange('sku', e.target.value)}
                      required
                      placeholder="Enter SKU"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Brand</Form.Label>
                    <Form.Select
                      value={formData.brand_id}
                      onChange={(e) => handleChange('brand_id', e.target.value)}
                    >
                      <option value="">Select Brand</option>
                      {brands?.map((brand) => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={formData.category_id}
                      onChange={(e) => handleChange('category_id', e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {categories?.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Sub Category</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.sub_category_id}
                      onChange={(e) => handleChange('sub_category_id', e.target.value)}
                      placeholder="Enter sub category ID"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Unit</Form.Label>
                    <Form.Select
                      value={formData.unit_id}
                      onChange={(e) => handleChange('unit_id', e.target.value)}
                    >
                      <option value="">Select Unit</option>
                      {units?.map((unit) => (
                        <option key={unit.id} value={unit.id}>{unit.short_name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Product Type</Form.Label>
                    <Form.Select
                      value={formData.type}
                      onChange={(e) => handleChange('type', e.target.value)}
                    >
                      <option value="single">Single</option>
                      <option value="variable">Variable</option>
                      <option value="combo">Combo</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Tax Type</Form.Label>
                    <Form.Select
                      value={formData.tax_type}
                      onChange={(e) => handleChange('tax_type', e.target.value)}
                    >
                      <option value="inclusive">Inclusive</option>
                      <option value="exclusive">Exclusive</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Tax (%)</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.tax}
                      onChange={(e) => handleChange('tax', e.target.value)}
                      placeholder="Enter tax percentage"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Price *</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleChange('price', e.target.value)}
                      required
                      placeholder="Enter price"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Stock Settings */}
              <h5 className="section-title mb-3">Stock Settings</h5>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Enable Stock</Form.Label>
                    <Form.Select
                      value={formData.enable_stock}
                      onChange={(e) => handleChange('enable_stock', e.target.value)}
                    >
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Alert Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.alert_quantity}
                      onChange={(e) => handleChange('alert_quantity', e.target.value)}
                      placeholder="Enter alert quantity"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Product Details */}
              <h5 className="section-title mb-3">Product Details</h5>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Warranty</Form.Label>
                    <Form.Select
                      value={formData.warranty_id}
                      onChange={(e) => handleChange('warranty_id', e.target.value)}
                    >
                      <option value="">No Warranty</option>
                      {warranties?.map((warranty) => (
                        <option key={warranty.id} value={warranty.id}>
                          {warranty.name}
                          {warranty.duration && ` (${warranty.duration} ${warranty.duration_type || 'months'})`}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Country of Origin</Form.Label>
                    <Form.Select
                      value={formData.country_id}
                      onChange={(e) => handleChange('country_id', e.target.value)}
                    >
                      <option value="">Select Country</option>
                      {countries?.map((country) => (
                        <option key={country.id} value={country.id}>{country.name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Manufacturing Year</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.manufacturing_year}
                      onChange={(e) => handleChange('manufacturing_year', e.target.value)}
                      placeholder="e.g. 2023"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Descriptions */}
              <h5 className="section-title mb-3">Descriptions</h5>
              <Form.Group className="mb-3">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.product_description}
                  onChange={(e) => handleChange('product_description', e.target.value)}
                  placeholder="Enter product description"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product Specifications</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={formData.product_specifications}
                  onChange={(e) => handleChange('product_specifications', e.target.value)}
                  placeholder="Enter product specifications"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Key Features</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={formData.key_features}
                  onChange={(e) => handleChange('key_features', e.target.value)}
                  placeholder="Enter key features"
                />
              </Form.Group>

              {/* Submit Buttons */}
              <div className="d-flex gap-2 justify-content-end">
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/Product-List')}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Saving...
                    </>
                  ) : (
                    'Add Product'
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}
