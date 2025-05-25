"use client"
import Image from "next/image"
import { ProductCarousel } from "./product-carousel"
import { useProducts } from "@/lib/hooks/use-products"

export function ProductSection() {
  const { data: products, isLoading, error } = useProducts({
    page: 1,
    limit: 12,
    sort: "createdAt",
  })
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

        <Image width={2000} height={2000} alt="banner" src="/banner.png"></Image>
        {/* Product Carousel */}
        <div className="p-6 bg-blue-600 ">
          <ProductCarousel products={products} />
        </div>
      </div>
    </div>
  )
}
