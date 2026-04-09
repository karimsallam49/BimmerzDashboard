import { Modal, Badge, Row, Col } from 'react-bootstrap'
import type { VendorProduct } from '../../DTO/VendorProductDTO'
import './ProductDetailModal.css'

interface ProductDetailModalProps {
  show: boolean
  product: VendorProduct | null
  onClose: () => void
}

export const ProductDetailModal = ({ show, product, onClose }: ProductDetailModalProps) => {
  if (!product) return null

  const getConditionBadge = (condition: string | null) => {
    const cond = condition?.toLowerCase() || ''
    const isConfirmed = cond === 'confirmed'

    return (
      <Badge
        bg={isConfirmed ? 'success' : 'warning'}
        className={`condition-status-badge ${isConfirmed ? 'confirmed' : 'under-review'}`}
      >
        {isConfirmed ? 'Confirmed' : 'UnderReview'}
      </Badge>
    )
  }

  return (
    <Modal show={show} onHide={onClose} size="lg" dialogClassName="product-detail-modal" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Product Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Product Header with Image */}
        <div className="product-header">
          <div className="product-main-image">
            <img
              src={product.image_url || '/default-product.png'}
              alt={product.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-product.png'
              }}
            />
          </div>
          <div className="product-title-section">
            <h3 className="product-name">{product.name}</h3>
            <div className="product-badges">
              <Badge bg="secondary" className="sku-badge">SKU: {product.sku}</Badge>
              {getConditionBadge(product.product_condition)}
            </div>
          </div>
        </div>

        {/* Product Info Grid */}
        <div className="product-info-section">
          <h5 className="section-title">Product Information</h5>
          <Row>
            <Col md={6}>
              <div className="info-row">
                <span className="info-label">Price:</span>
                <span className="info-value price">{product.vendor_product_price} EGP</span>
              </div>
            </Col>
            <Col md={6}>
              <div className="info-row">
                <span className="info-label">Type:</span>
                <span className="info-value">{product.type || 'N/A'}</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="info-row">
                <span className="info-label">Brand:</span>
                <span className="info-value">{product.brand?.name || 'N/A'}</span>
              </div>
            </Col>
            <Col md={6}>
              <div className="info-row">
                <span className="info-label">Category:</span>
                <span className="info-value">{product.category?.name || 'N/A'}</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="info-row">
                <span className="info-label">Tax:</span>
                <span className="info-value">{product.tax ? `${product.tax}%` : 'N/A'}</span>
              </div>
            </Col>
            <Col md={6}>
              <div className="info-row">
                <span className="info-label">Stock:</span>
                <span className="info-value">
                  {product.enable_stock ? (
                    <Badge bg="success" className="stock-badge">In Stock</Badge>
                  ) : (
                    <Badge bg="danger" className="stock-badge">Out of Stock</Badge>
                  )}
                </span>
              </div>
            </Col>
          </Row>
        </div>

        {/* Warranty Section */}
        {product.warranty && (
          <div className="warranty-section">
            <h5 className="section-title">Warranty</h5>
            <div className="warranty-card">
              <div className="warranty-name">{product.warranty.name}</div>
              <div className="warranty-details">
                <span className="warranty-duration">
                  {product.warranty.duration} {product.warranty.duration_type}
                </span>
                {product.warranty.description && (
                  <span className="warranty-desc">{product.warranty.description}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Description Section */}
        {product.product_description && (
          <div className="description-section">
            <h5 className="section-title">Description</h5>
            <p className="description-text">{product.product_description}</p>
          </div>
        )}

        {/* Vendor Info Section */}
        <div className="vendor-info-section">
          <h5 className="section-title">Vendor Information</h5>
          <Row>
            {product.vendor_shipping_info && (
              <Col md={6}>
                <div className="info-row">
                  <span className="info-label">Shipping:</span>
                  <span className="info-value">{product.vendor_shipping_info}</span>
                </div>
              </Col>
            )}
            {product.vendor_return_policy && (
              <Col md={6}>
                <div className="info-row">
                  <span className="info-label">Return Policy:</span>
                  <span className="info-value">{product.vendor_return_policy}</span>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}
