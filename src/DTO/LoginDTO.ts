export interface SupplierLoginResponseDTO {
  success: boolean;
  message: string;
  data: SupplierDTO;
  token?: string;
}

export interface SupplierDTO {
  supplier_id: number;
  supplier_name: string;
  supplier_business_name: string | null;
  supplier_username: string;
  type: string;
  mobile: string;
  email: string;

  supplier: {
    id: number;
    name: string;
    business_name: string | null;
    username: string;
    type: string;
    mobile: string;
    email: string;
  }
}