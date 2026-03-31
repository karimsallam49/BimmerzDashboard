export interface Category {
  id: number
  name: string
  logo: string
  description: string
  parent_id: number
  short_code: string | null
  category_type: string
  category_digram?: string | null
}
