import { ProductCard } from "./product-card"

interface Product {
  _id: string
  name: string
  images: string[]
  price: number
  comparePrice?: number
  shortDescription?: string
  attributes?: { name: string; value: string }[]
  ratings?: { average: number; count: number }
  brand?: string
  badge?: string
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products?.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  )
}
