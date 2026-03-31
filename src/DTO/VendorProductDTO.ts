export interface Warranty {
  id: number;
  name: string;
  business_id: number;
  description: string;
  duration: number;
  duration_type: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  business_id: number;
  type: string;
  unit_id: number;
  secondary_unit_id: number | null;
  sub_unit_ids: number[] | null;
  brand_id: number;
  product_specifications: string;
  "key features": string;
  product_condition: string;
  sub_category_id: number;
  sub_sub_category_id: number | null;
  sub_sub_sub_category_id: number | null;
  tax: string | null;
  tax_type: string;
  enable_stock: number;
  is_external: number;
  is_labour: number;
  virtual_product: boolean;
  is_client_flagged: number;
  alert_quantity: number | null;
  sku: string;
  barcode_type: string;
  expiry_period: number | null;
  expiry_period_type: string | null;
  enable_sr_no: number;
  weight: number | null;
  product_custom_field1: string | null;
  product_custom_field2: string | null;
  product_custom_field3: string | null;
  product_custom_field4: string | null;
  product_custom_field5: string | null;
  product_custom_field6: string | null;
  product_custom_field7: string | null;
  product_custom_field8: string | null;
  product_custom_field9: string | null;
  product_custom_field10: string | null;
  product_custom_field11: string | null;
  product_custom_field12: string | null;
  product_custom_field13: string | null;
  product_custom_field14: string | null;
  product_custom_field15: string | null;
  product_custom_field16: string | null;
  product_custom_field17: string | null;
  product_custom_field18: string | null;
  product_custom_field19: string | null;
  product_custom_field20: string | null;
  image: string | null;
  product_description: string | null;
  created_by: number;
  preparation_time_in_minutes: number | null;
  warranty_id: number | null;
  is_inactive: number;
  not_for_selling: number;
  is_ecom: number;
  created_at: string;
  updated_at: string;
  manufacturing_year: number | null;
  brand_category: number | null;
  category_id: number;
  repair_model_id: number | null;
  ai_flag: number;
  workshop_ref: string | null;
  serviceHours: number | null;
  image_url: string;
}

export interface Brand {
  id: number;
  name: string;
  business_id: number;
  description: string | null;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  business_id: number;
  short_code: string | null;
  parent_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface VendorProduct {
  id: number;
  name: string;
  sku: string;
  image_url: string;
  type: string;
  unit_id: number;
  brand_id: number;
  category_id: number;
  sub_category_id: number;
  tax: string | null;
  enable_stock: number;
  alert_quantity: number | null;
  product_description: string | null;
  product_custom_field1: string | null;
  product_custom_field2: string | null;
  product_custom_field3: string | null;
  product_custom_field4: string | null;
  is_inactive: number;
  product_condition: string;
  vendor_product_price: number;
  vendor_shipping_info: string;
  vendor_return_policy: string;
  vendor_country_of_origin: number;
  warranty: Warranty;
  warranty_id: number;
  brand: Brand;
  category: Category;
}

export interface VendorProductsPagination {
  data: VendorProduct[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
