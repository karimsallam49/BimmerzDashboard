import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Modal, Button, Form, Spinner, Row, Col, Badge } from 'react-bootstrap'
import type { Product } from '../../DTO/ProductsDTO'
import axios from 'axios'
import { GetAllwarranties, ProductCompatibilityEndpoint, AddCompatibilityEndpoint, GetCountriesEndpoint } from '../../Endpoints/AppEndpoints'
import type { Warranty } from '../../DTO/warrantyDTO'
import type { ProductCompatibility } from '../../DTO/ProductCompatibilityDTO'
import type { Country } from '../../DTO/CountryDTO'
import './AddProductModal.css'
import BMWicone from "../../assets/Images/BMW_logo_(white).svg.png"
interface AddProductModalProps {
  show: boolean
  product: Product | null
  onClose: () => void
  onSubmit: (payload: {
    product_id: number
    Vendor_id: number
    Product_price: number
    warranty_id?: number | null
    shipping_information?: string
    Return_policy?: string
    country_id?: string
    vendor_roduct_image?: File[]
  }) => Promise<void>
  vendorId: number
}

const fetchWarranties = async (): Promise<Warranty[]> => {
  const response = await axios.get(GetAllwarranties)
  return response.data || []
}

const fetchProductCompatibility = async (productId: number): Promise<ProductCompatibility[]> => {
  const response = await axios.get(ProductCompatibilityEndpoint(productId))
  return response.data?.data || []
}

const fetchCountries = async (): Promise<Country[]> => {
  const response = await axios.get(GetCountriesEndpoint)
  return response.data || []
}

export const AddProductModal = ({ show, product, onClose, onSubmit, vendorId }: AddProductModalProps) => {
  const [productPrice, setProductPrice] = useState('')
  const [warrantyId, setWarrantyId] = useState('')
  const [shippingInfo, setShippingInfo] = useState('')
  const [returnPolicy, setReturnPolicy] = useState('')
  const [, setCountryOfOrigin] = useState('')
  const [countryId, setCountryId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { data: warranties, isLoading: isLoadingWarranties } = useQuery({
    queryKey: ['vendor-warranties'],
    queryFn: fetchWarranties,
    enabled: show,
  })

  const { 
    data: countries, 
    isLoading: isLoadingCountries 
  } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    enabled: show,
  })

  const { 
    data: compatibility, 
    isLoading: isLoadingCompatibility 
  } = useQuery({
    queryKey: ['product-compatibility', product?.id],
    queryFn: () => fetchProductCompatibility(product!.id),
    enabled: show && !!product,
  })

  useEffect(() => {
    if (product) {
      setProductPrice('')
      setWarrantyId('')
      setShippingInfo('')
      setReturnPolicy('')
      setCountryOfOrigin('')
      setCountryId('')
      setSelectedImages([])
      setImagePreviewUrls([])
    }
  }, [product])

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)
      setSelectedImages(prev => [...prev, ...newFiles])
      
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file))
      setImagePreviewUrls(prev => [...prev, ...newPreviewUrls])
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
    URL.revokeObjectURL(imagePreviewUrls[index])
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index))
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async () => {
    if (!product) return
    setIsSubmitting(true)

    try {

      // if (compatibility && compatibility.length > 0) {
      //   for (const item of compatibility) {
      //     await axios.post(AddCompatibilityEndpoint, {
      //       product_id: product.id,
      //       brand_category_id: item.brand_category_id,
      //       model_id: item.model_id,
      //       from_year: item.from_year,
      //       to_year: item.to_year
      //     })
      //   }
      // }


      await onSubmit({
        product_id: product.id,
        Vendor_id: vendorId,
        Product_price: parseFloat(productPrice),
        warranty_id: warrantyId ? parseInt(warrantyId) : null,
        shipping_information: shippingInfo,
        Return_policy: returnPolicy,
        country_id: countryId,
        vendor_roduct_image: selectedImages.length > 0 ? selectedImages : undefined,
      })
      onClose()
    } catch (err) {
      alert('Failed to add product')
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <Modal show={show} onHide={onClose} size="lg" dialogClassName="noon-modal" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {product ? `List Product: ${product.name}` : 'List Product'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {product && (
          <Form>
 
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Product Images</Form.Label>
              <div className="product-images-container">
         
                <div className="main-image-wrapper mb-3">
                  <img
                    src={product.image_url || '/default-product.png'}
                    alt={product.name}
                    className="main-product-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/default-product.png';
                    }}
                  />
                </div>
                
                {product.gallery_images_urls && product.gallery_images_urls.length > 0 && (
                  <div className="gallery-images-grid">
                    {product.gallery_images_urls.map((imgUrl, index) => (
                      <div key={index} className="gallery-image-wrapper">
                        <img
                          src={imgUrl}
                          alt={`${product.name} - ${index + 1}`}
                          className="gallery-image"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Form.Group>

        
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Product Information</Form.Label>
              <div className="product-info-grid">
                <Row>
                  <Col md={6}>
                    <div className="info-item">
                      <span className="info-label">Product Name:</span>
                      <span className="info-value">{product.name}</span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="info-item">
                      <span className="info-label">SKU:</span>
                      <span className="info-value">{product.sku}</span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="info-item">
                      <span className="info-label">Brand:</span>
                      <span className="info-value">
                        {product.brand?.name || 'N/A'}
                      </span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="info-item">
                      <span className="info-label">Category:</span>
                      <span className="info-value">
                        {product.category?.name || 'N/A'}
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="info-item">
                      <span className="info-label">Unit:</span>
                      <span className="info-value">
                        {product.unit?.actual_name || 'N/A'}
                      </span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="info-item">
                      <span className="info-label">Barcode Type:</span>
                      <span className="info-value">{product.barcode_type}</span>
                    </div>
                  </Col>
                </Row>
                {product.product_condition && (
                  <Row>
                    <Col md={6}>
                      <div className="info-item">
                        <span className="info-label">Condition:</span>
                        <Badge bg="info">{product.product_condition}</Badge>
                      </div>
                    </Col>
                  </Row>
                )}
              </div>
            </Form.Group>

            {product.product_description && (
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Description</Form.Label>
                <div className="product-description">
                  {product.product_description}
                </div>
              </Form.Group>
            )}

            {product.product_specifications && (
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Specifications</Form.Label>
                <div className="product-specifications">
                  {product.product_specifications}
                </div>
              </Form.Group>
            )}

            {product.key_features && (
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Key Features</Form.Label>
                <div className="key-features">
                  {product.key_features}
                </div>
              </Form.Group>
            )}

            {/* Image Upload Section */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Upload Product Images</Form.Label>
              <div className="image-upload-section">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outline-primary"
                  onClick={triggerFileInput}
                  className="upload-btn"
                >
                  <i className="bi bi-camera-fill me-2"></i>
                  Add Images
                </Button>
                
                {/* Selected Images Preview */}
                {(imagePreviewUrls.length > 0 || selectedImages.length > 0) && (
                  <div className="selected-images-grid mt-3">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="selected-image-wrapper">
                        <img src={url} alt={`Selected ${index + 1}`} className="selected-image" />
                        <button
                          type="button"
                          className="remove-image-btn"
                          onClick={() => removeImage(index)}
                        >
                          <i className="bi bi-x-circle-fill"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Form.Group>

            <div className="form-row">
              <Form.Group className="form-group">
                <Form.Label>Product Price (EGP) *</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter competitive price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>Warranty</Form.Label>
                <Form.Select
                  value={warrantyId}
                  onChange={(e) => setWarrantyId(e.target.value)}
                  disabled={isLoadingWarranties}
                >
                  <option value="">No Warranty</option>
                  {warranties?.map((warranty) => (
                    <option key={warranty.id} value={warranty.id}>
                      {warranty.name}
                      {warranty.duration && ` (${warranty.duration} ${warranty.duration_type || 'months'})`}
                    </option>
                  ))}
                </Form.Select>
                {isLoadingWarranties && <Form.Text className="text-muted d-block mt-1">Loading warranties...</Form.Text>}
              </Form.Group>
            </div>

            <div className="form-row">
              <Form.Group className="form-group">
                <Form.Label>Shipping Information</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Ships next business day"
                  value={shippingInfo}
                  onChange={(e) => setShippingInfo(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>Return Policy</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. 14 Days Free Return"
                  value={returnPolicy}
                  onChange={(e) => setReturnPolicy(e.target.value)}
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Country of Origin *</Form.Label>
              <Form.Select
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
                disabled={isLoadingCountries}
                required
              >
                <option value="">Select Country</option>

                {countries?.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </Form.Select>
              {isLoadingCountries && <Form.Text className="text-muted d-block mt-1">Loading countries...</Form.Text>}
            </Form.Group>

            {isLoadingCompatibility && (
              <div className="d-flex align-items-center gap-2 mb-3">
                <Spinner size="sm" />
                <span className="text-muted">Loading compatibility...</span>
              </div>
            )}

            {compatibility && compatibility.length > 0 && (
              <Form.Group className="mb-3">
                <Form.Label className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-success"></i>
                  Compatible Vehicles
                </Form.Label>
                <div className="compatibility-grid">
                  {compatibility.map((item, index) => {
                    const brandName = item.brand_category_name?.toLowerCase() || '';
                    const isBmw = brandName.includes('bmw');

                    const iconUrl = isBmw
                      ? BMWicone
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Car_icon_black.svg/2048px-Car_icon_black.svg.png";

                    return (
                      <div key={index} className="compatibility-card">
                        <div className="compatibility-icon-wrapper">
                          <img src={iconUrl} alt={item.brand_category_name} className="compatibility-icon" />
                        </div>
                        <div className="compatibility-details">
                          <div className="compatibility-brand-model">
                            <span className="comp-brand">{item.brand_category_name}</span>
                            <span className="comp-model">{item.model_name}</span>
                          </div>
                          <div className="compatibility-years">
                            <i className="bi bi-calendar3"></i>
                            {item.from_year} - {item.to_year}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Form.Group>
            )}
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting || !productPrice}>
          {isSubmitting ? (
            <>
              <Spinner size="sm" className="me-2" />
              Saving...
            </>
          ) : (
            'List Product'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}