import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"

interface Product {
  id: string
  name: string
  image: string
  currentPrice: number
  originalPrice: number
  discount: number
}

interface BestSellingSectionProps {
  products: Product[]
}

const bestSellingProducts: Product[] = [
  {
    id: "1",
    name: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 299000,
    originalPrice: 329000,
    discount: 10,
  },
  {
    id: "2",
    name: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 299000,
    originalPrice: 329000,
    discount: 10,
  },
  {
    id: "3",
    name: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 299000,
    originalPrice: 329000,
    discount: 10,
  },
  {
    id: "4",
    name: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 299000,
    originalPrice: 329000,
    discount: 10,
  },
  {
    id: "5",
    name: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 299000,
    originalPrice: 329000,
    discount: 10,
  },
]

export function BestSellingSection({ products = bestSellingProducts }: BestSellingSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Sản Phẩm Bán Chạy</h3>
        <Link href="/best-selling" className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
          <span className="text-sm font-medium">Xem tất cả</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product.id} className="min-w-0">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  )
}
