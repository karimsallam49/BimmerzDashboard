import { useMemo } from 'react';
import type { VendorProduct } from '../DTO/VendorProductDTO';
import type { Product } from '../DTO/ProductsDTO';
import type { CarModel } from '../DTO/CarModelDTO';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

interface UseProductFiltersProps {
  products: VendorProduct[] | Product[];
  carModels?: CarModel[];
  isLoadingCarModels?: boolean;
  filters: {
    brand_id: string;
    category_id: string;
    model_id: string;
    year: string;
    [key: string]: any;
  };
  onFilterChange: (key: string, value: string) => void;
  onBrandChange?: (value: string) => void;
}

export const useProductFilters = ({
  products,
  carModels = [],
  isLoadingCarModels = false,
  filters,
  onFilterChange,
  onBrandChange,
}: UseProductFiltersProps): FilterConfig[] => {
  const brandOptions = useMemo(() => {
    const brandNames = [...new Set(products.map((p: any) => p.brand?.name).filter(Boolean))];
    return [
      { value: '', label: 'All Brands' },
      ...brandNames.map((name: string) => ({ value: name, label: name }))
    ];
  }, [products]);

  const categoryOptions = useMemo(() => {
    const categoryNames = [...new Set(products.map((p: any) => p.category?.name).filter(Boolean))];
    return [
      { value: '', label: 'All Categories' },
      ...categoryNames.map((name: string) => ({ value: name, label: name }))
    ];
  }, [products]);

  const modelOptions = useMemo(() => {
    return [
      { value: '', label: 'All Models' },
      ...(carModels?.map((m: CarModel) => ({ value: String(m.id), label: m.name })) || [])
    ];
  }, [carModels]);

  const yearOptions = useMemo(() => {
    return [
      { value: '', label: 'All Years' },
      ...Array.from({ length: 35 }, (_, i) => {
        const year = 2025 - i;
        return { value: String(year), label: String(year) };
      })
    ];
  }, []);

  const unitOptions = useMemo(() => {
    const units = [...new Set(products.map((p: any) => p.unit?.short_name).filter(Boolean))];
    return [
      { value: '', label: 'All Units' },
      ...units.map((name: string) => ({ value: name, label: name }))
    ];
  }, [products]);

  return [
    {
      key: 'brand_id',
      label: 'Brand',
      options: brandOptions,
      value: filters.brand_id,
      onChange: (value: string) => {
        onBrandChange ? onBrandChange(value) : onFilterChange('brand_id', value);
        onFilterChange('model_id', '');
      },
      placeholder: 'All Brands'
    },
    {
      key: 'category_id',
      label: 'Category',
      options: categoryOptions,
      value: filters.category_id,
      onChange: (value: string) => onFilterChange('category_id', value),
      placeholder: 'All Categories'
    },
    {
      key: 'unit_id',
      label: 'Unit',
      options: unitOptions,
      value: filters.unit_id || '',
      onChange: (value: string) => onFilterChange('unit_id', value),
      placeholder: 'All Units'
    },
    {
      key: 'model_id',
      label: 'Car Model',
      options: modelOptions,
      value: filters.model_id,
      onChange: (value: string) => onFilterChange('model_id', value),
      placeholder: 'All Models',
      disabled: isLoadingCarModels
    },
    {
      key: 'year',
      label: 'Year',
      options: yearOptions,
      value: filters.year,
      onChange: (value: string) => onFilterChange('year', value),
      placeholder: 'All Years'
    }
  ];
};

export type { FilterConfig, FilterOption, UseProductFiltersProps };
