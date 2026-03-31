export interface Country {
  id: number
  name: string
  iso_code_2: string
  iso_code_3: string
}

export interface CountriesResponse {
  success: boolean;
  data: Country[];
}
