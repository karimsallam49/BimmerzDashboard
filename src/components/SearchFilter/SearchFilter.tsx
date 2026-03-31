import React from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import './SearchFilter.css';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  key: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

interface SearchFilterProps {
  searchLabel?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  actions?: React.ReactNode;
  className?: string;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchLabel,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters = [],
  actions,
  className = ''
}) => {
  return (
    <div className={`search-filter-container mb-4 ${className}`}>
      <Row className="g-3 align-items-end">
        <Col md={12} lg={4}>
          {searchLabel && <Form.Label className="filter-label">{searchLabel}</Form.Label>}
          <InputGroup>
            <Form.Control
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <Button variant="outline-secondary">
              <i className="bi bi-search"></i>
            </Button>
          </InputGroup>
        </Col>
        
        {filters.map((filter) => (
          <Col md={6} lg={2} key={filter.key}>
            {filter.label && <Form.Label className="filter-label">{filter.label}</Form.Label>}
            <Form.Select
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              disabled={filter.disabled}
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Col>
        ))}
        
        {actions && (
          <Col md={12} lg="auto" className="d-flex gap-2 justify-content-end ms-auto mt-3 mt-lg-0">
            {actions}
          </Col>
        )}
      </Row>
    </div>
  );
};
