import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Badge } from 'react-bootstrap';
import { DataTable, type Column } from '../DataTable/DataTable';
import './ProductSelector.css';

export interface SelectableProduct {
  id: string;
  name: string;
  sku?: string;
  price?: number;
  category?: string;
  image?: string;
  [key: string]: any;
}

export interface AdditionalField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'date';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface ProductSelectorProps {
  show: boolean;
  onHide: () => void;
  title: string;
  products: SelectableProduct[];
  additionalFields: AdditionalField[];
  onSave: (selectedProducts: SelectableProduct[], additionalData: Record<string, any>) => Promise<void>;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  show,
  onHide,
  title,
  products,
  additionalFields,
  onSave
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedProducts, setSelectedProducts] = useState<SelectableProduct[]>([]);
  const [additionalData, setAdditionalData] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (show) {
      setStep(1);
      setSelectedProducts([]);
      setAdditionalData({});
    }
  }, [show]);

  const handleProductToggle = (product: SelectableProduct) => {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedProducts(products);
    } else {
      setSelectedProducts([]);
    }
  };

  const handleNext = () => {
    if (selectedProducts.length > 0) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleAdditionalChange = (key: string, value: any) => {
    setAdditionalData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(selectedProducts, additionalData);
      onHide();
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaving(false);
    }
  };

  const productColumns: Column<SelectableProduct>[] = [
    {
      key: 'select',
      header: '',
      width: '50px',
      render: (product) => (
        <Form.Check
          type="checkbox"
          checked={selectedProducts.some(p => p.id === product.id)}
          onChange={() => handleProductToggle(product)}
        />
      )
    },
    {
      key: 'product',
      header: 'Product',
      render: (product) => (
        <div className="d-flex align-items-center">
          {product.image && (
            <img 
              src={product.image} 
              alt={product.name}
              className="product-thumb me-2"
              width="40"
              height="40"
            />
          )}
          <div>
            <div className="fw-bold">{product.name}</div>
            {product.sku && <small className="text-muted">{product.sku}</small>}
          </div>
        </div>
      )
    },
    { key: 'category', header: 'Category' },
    {
      key: 'price',
      header: 'Price',
      render: (product) => product.price ? `$${product.price}` : '-'
    }
  ];

  const renderAdditionalField = (field: AdditionalField) => {
    const value = additionalData[field.key] ?? '';

    switch (field.type) {
      case 'select':
        return (
          <Form.Select
            value={value}
            onChange={(e) => handleAdditionalChange(field.key, e.target.value)}
            required={field.required}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Form.Select>
        );
      case 'textarea':
        return (
          <Form.Control
            as="textarea"
            rows={3}
            value={value}
            onChange={(e) => handleAdditionalChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      case 'date':
        return (
          <Form.Control
            type="date"
            value={value}
            onChange={(e) => handleAdditionalChange(field.key, e.target.value)}
            required={field.required}
          />
        );
      default:
        return (
          <Form.Control
            type={field.type}
            value={value}
            onChange={(e) => handleAdditionalChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {title}
          {step === 2 && (
            <Badge bg="primary" className="ms-2">
              {selectedProducts.length} selected
            </Badge>
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {step === 1 ? (
          <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <Form.Check
                type="checkbox"
                label="Select All"
                checked={selectedProducts.length === products.length && products.length > 0}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              <span className="text-muted">
                {selectedProducts.length} of {products.length} selected
              </span>
            </div>

            <DataTable
              data={products}
              columns={productColumns}
              keyExtractor={(p) => p.id}
              emptyMessage="No products available"
              emptyIcon="bi-box"
            />
          </>
        ) : (
          <Form onSubmit={handleSubmit} id="additional-info-form">
            <div className="mb-4">
              <h6 className="mb-3">Selected Products:</h6>
              <div className="selected-products-preview">
                {selectedProducts.map(product => (
                  <Badge bg="light" text="dark" className="me-2 mb-2 p-2" key={product.id}>
                    {product.name}
                  </Badge>
                ))}
              </div>
            </div>

            <hr className="my-4" />

            <h6 className="mb-3">Additional Information:</h6>
            {additionalFields.map(field => (
              <Form.Group className="mb-3" key={field.key}>
                <Form.Label>{field.label}{field.required && ' *'}</Form.Label>
                {renderAdditionalField(field)}
              </Form.Group>
            ))}
          </Form>
        )}
      </Modal.Body>

      <Modal.Footer>
        {step === 2 && (
          <Button variant="outline-secondary" onClick={handleBack} disabled={saving}>
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </Button>
        )}
        
        <Button variant="secondary" onClick={onHide} disabled={saving}>
          Cancel
        </Button>

        {step === 1 ? (
          <Button 
            variant="primary" 
            onClick={handleNext}
            disabled={selectedProducts.length === 0}
          >
            Next
            <i className="bi bi-arrow-right ms-2"></i>
          </Button>
        ) : (
          <Button 
            variant="primary" 
            type="submit"
            form="additional-info-form"
            disabled={saving}
          >
            {saving ? (
              <>
                <Spinner size="sm" className="me-2" />
                Saving...
              </>
            ) : (
              <>
                <i className="bi bi-check-lg me-2"></i>
                Save
              </>
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
