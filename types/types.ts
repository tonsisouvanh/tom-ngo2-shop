export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  sizes: string[]
  colors: string[]
  isNew?: boolean
  discount: number
  material: string
  care: string
  madeIn: string
}
