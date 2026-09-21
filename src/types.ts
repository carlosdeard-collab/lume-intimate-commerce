export type ProductTag = 'NUEVO' | 'MÁS VENDIDO' | 'OFERTA' | 'EXCLUSIVO'

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice?: number
  category: string
  images: string[]
  rating: number
  reviews: number
  stock: number
  tags: ProductTag[]
  specifications: Record<string, string>
}

export type CartItem = Product & { quantity: number }
