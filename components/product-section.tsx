import Image from "next/image"
import { ProductCarousel } from "./product-carousel"
import { PromoBanner } from "@/components/promo-banner"

// Sample product data
const products = [
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
  {
    id: "6",
    name: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 299000,
    originalPrice: 329000,
    discount: 10,
  },
]

export function ProductSection() {
  return (
    <div className="bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex mb-4 text-sm">
          <a href="/" className="text-gray-500 hover:text-gray-700">
            Trang chủ
          </a>
          <span className="mx-2 text-gray-500">&gt;</span>
          <a href="/products" className="text-blue-600 font-medium">
            Sản phẩm
          </a>
        </nav>

        {/* Promo Banner */}
        {/* <PromoBanner /> */}
        <Image width={2000} height={2000} alt="banner" src="/banner.png"></Image>
        {/* Product Carousel */}
        <div className="p-6 bg-blue-600 ">
          <ProductCarousel products={products} />
        </div>
      </div>
    </div>
  )
}
