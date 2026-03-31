export interface Brand {
  id: number;
  business_id: number;
  name: string;
  description: string | null;
  created_by: number;
  use_for_repair?: number;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Unit {
  id: number;
  business_id: number;
  actual_name: string;
  short_name: string;
  allow_decimal: number;
  base_unit_id?: number | null;
  base_unit_multiplier?: number | null;
  created_by: number;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  business_id: number;
  short_code?: string | null;
  vin_category_code?: string | null;
  parent_id: number;
  created_by: number;
  category_type: string;
  description?: string | null;
  slug?: string | null;
  logo?: string | null;
  is_ecom?: number;
  country_of_origin?: string | null;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Warranty {
  id: number;
  name?: string;
  duration?: number;
  duration_type?: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  business_id: number;
  type: string;
  unit_id?: number | null;
  secondary_unit_id?: number | null;
  sub_unit_ids?: string | null;
  brand_id?: number | null;
  product_specifications?: string;
  key_features?: string;
  product_condition?: string;
  sub_category_id?: number | null;
  sub_sub_category_id?: number | null;
  sub_sub_sub_category_id?: number | null;
  tax?: number | null;
  tax_type: string;
  enable_stock: boolean;
  is_external: boolean;
  is_labour: boolean;
  virtual_product: boolean;
  is_client_flagged: boolean;
  alert_quantity?: number | null;
  sku: string;
  barcode_type: string;
  expiry_period?: number | null;
  expiry_period_type?: string | null;
  enable_sr_no: boolean;
  weight?: string | null;
  product_description?: string | null;
  created_by: number;
  preparation_time_in_minutes?: number | null;
  warranty_id?: number | null;
  is_inactive: boolean;
  not_for_selling: boolean;
  is_ecom: boolean;
  manufacturing_year?: string | null;
  brand_category?: string | null;
  category_id?: number | null;
  repair_model_id?: string | null;
  ai_flag: boolean;
  workshop_ref?: number | null;
  serviceHours?: number | null;
  image_url: string;
  brand?: Brand | null;
  unit?: Unit | null;
  category?: Category | null;
  warranty?: Warranty | null;
}

export interface ProductsPagination {
  current_page: number;
  data: Product[];
  last_page?: number;
  total?: number;
  per_page?: number;
}