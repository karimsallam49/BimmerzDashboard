export interface Warranty {
  id: number;
  name: string;
  duration: number;
  duration_type: 'days' | 'months' | 'years';
  description: string | null;
  created_at: string;
  updated_at: string; 
}

export interface WarrantyPagination {
  data: Warranty[];
  current_page?: number;    
  per_page?: number;
  total?: number;
}