export interface CatalogProduct {
  id: number;
  name: string;
  sku: string;
  variation_id: number;
  default_sell_price: number;
  brand_id: number;
  category_id: number;
  sub_category_id: number;
  description: string;
  image_url: string;
}

export interface CatalogProductsPagination {
  current_page: number;
  data: CatalogProduct[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
