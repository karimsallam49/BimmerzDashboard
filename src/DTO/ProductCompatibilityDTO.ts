export interface ProductCompatibility {
  id: number;
  brand_category_id: number;
  brand_category_name: string;
  model_id: number;
  model_name: string;
  from_year: number;
  to_year: number;
}

export interface ProductCompatibilityResponse {
  success: boolean;
  data: ProductCompatibility[];
}
