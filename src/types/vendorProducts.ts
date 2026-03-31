// Types for Vendor Products API

export interface Product {
  id: number;
  name: string;
  sku: string;
}

export interface Warranty {
  id: number;
  name: string;
  duration?: number;
  duration_type?: string;
}

export interface VendorProduct {
  id: number;
  product_id: number;
  Vendor_id: number;
  Product_price: number;
  warranty_id?: number;
  shipping_information?: string;
  Return_policy?: string;
  Country_of_Origin?: string;
  product_specifications?: string;
  key_features?: string;
  product_condition?: string;
  created_at: string;
  updated_at: string;
  product: Product;
  warranty?: Warranty;
}

export interface CreateVendorProductRequest {
  product_id: number;
  Vendor_id: number;
  Product_price: number;
  warranty_id?: number;
  shipping_information?: string;
  Return_policy?: string;
  country_id?: string;
  product_specifications?: string;
  key_features?: string;
  product_condition?: string;
}

export interface UpdateVendorProductRequest {
  product_id?: number;
  Vendor_id?: number;
  Product_price?: number;
  warranty_id?: number;
  shipping_information?: string;
  Return_policy?: string;
  country_id?: string;
  product_specifications?: string;
  key_features?: string;
  product_condition?: string;
}
