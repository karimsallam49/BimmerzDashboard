import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import './EditModal.css';

export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'select' | 'textarea';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface EditModalProps<T> {
  show: boolean;
  onHide: () => void;
  title: string;
  data: T | null;
  fields: FieldConfig[];
  onSave: (data: Partial<T>) => Promise<void>;
}

export function EditModal<T extends Record<string, any>>({
  show,
  onHide,
  title,
  data,
  fields,
  onSave
}: EditModalProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({});
    }
  }, [data, show]);

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      onHide();
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaving(false);
    }
  };

  const renderField = (field: FieldConfig) => {
    const value = formData[field.key] ?? '';

    switch (field.type) {
      case 'select':
        return (
          <Form.Select
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
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
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      default:
        return (
          <Form.Control
            type={field.type}
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {fields.map(field => (
            <Form.Group className="mb-3" key={field.key}>
              <Form.Label>{field.label}{field.required && ' *'}</Form.Label>
              {renderField(field)}
            </Form.Group>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={saving}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={saving}>
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
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
