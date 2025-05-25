"use client"
import { use } from "react"
import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductGallery } from "@/app/product/_components/product-gallery"
import { ProductSpecifications } from "@/app/product/_components/product-specifications"
import { PromotionalOffers } from "@/app/product/_components/promotional-offers"
import { QuantitySelector } from "@/app/product/_components/quantity-selector"
import { useAppDispatch } from "@/lib/redux/hooks"
import { addToCart, setShowCartDropdown } from "@/lib/redux/slices/cartSlice"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const dispatch = useAppDispatch()
  const [selectedUnit, setSelectedUnit] = useState("Hộp")
  const [quantity, setQuantity] = useState(1)
  const { id } = use(params)
  // Sample product data
  const product = {
    id: id,
    name: "Sữa bột Nepro 1 Gold VitaDairy bổ sung dinh dưỡng giảm protein dành cho người bệnh đái tháo đường (400g)",
    brand: "VITADAIRY",
    code: "00016524",
    rating: 5,
    reviewCount: 6,
    commentCount: 100,
    currentPrice: 193600,
    originalPrice: 242000,
    discount: 20,
    flashSaleEndTime: "2024-05-25T23:59:59",
    images: [
      { id: "1", src: "/placeholder.svg?height=400&width=400", alt: "Product main image" },
      { id: "2", src: "/placeholder.svg?height=400&width=400", alt: "Product image 2" },
      { id: "3", src: "/placeholder.svg?height=400&width=400", alt: "Product image 3" },
      { id: "4", src: "/placeholder.svg?height=400&width=400", alt: "Product image 4" },
    ],
  }

  const specifications = [
    { label: "Chọn đơn vị tính", value: selectedUnit },
    { label: "Tên chính hãng", value: "SỮA NEPRO 1 GOLD 400G" },
    { label: "Danh mục", value: "Sữa", link: "#" },
    { label: "Số đăng ký", value: "123/2019/ĐKSP" },
    { label: "Xem giấy công bố sản phẩm", value: "📋", link: "#" },
    { label: "Dạng bào chế", value: "Dạng bột" },
    { label: "Quy cách", value: "Hộp x 400g" },
    { label: "Xuất xứ thương hiệu", value: "Việt Nam" },
    { label: "Nhà sản xuất", value: "NHÀ MÁY VITADAIRY BÌNH DƯƠNG" },
    { label: "Nước sản xuất", value: "Việt Nam" },
    {
      label: "Thành phần",
      value:
        "FOS, Năng lượng, Protein, Chất béo, Carbohydrate, Fructose, Vitamin tổng hợp, Khoáng chất, Palatinose, Polyols",
    },
  ]

  const offers = [
    {
      id: "1",
      icon: <span className="text-blue-600 text-xs">💳</span>,
      title: "Giảm ngay 10% áp dụng đến 31/05",
      description: "",
      type: "discount" as const,
    },
    {
      id: "2",
      icon: <span className="text-red-600 text-xs">⚡</span>,
      title: "Giảm ngay 20% khi mua Online áp dụng đến 25/05",
      description: "",
      type: "flash" as const,
    },
  ]

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        image: product.images[0].src,
        currentPrice: product.currentPrice,
        originalPrice: product.originalPrice,
      }),
    )

    // Auto-hide cart dropdown after 3 seconds
    setTimeout(() => {
      dispatch(setShowCartDropdown(false))
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/categories" className="hover:text-blue-600">
            Thực phẩm chức năng
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/categories/nutrition" className="hover:text-blue-600">
            Dinh dưỡng
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">Sữa</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images} />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Brand and Title */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-600">Thương hiệu:</span>
                <span className="text-blue-600 font-medium">{product.brand}</span>
                <div className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">CHÍNH HÃNG</div>
              </div>
              <h1 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{product.code}</span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span>{product.rating}</span>
                </div>
                <span>{product.reviewCount} đánh giá</span>
                <span>{product.commentCount} bình luận</span>
              </div>
            </div>

            {/* Flash Sale Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="bg-white text-blue-600 px-2 py-1 rounded text-sm font-medium">
                    ÁP DỤNG ĐẶT HÀNG ONLINE
                  </span>
                  <span className="text-lg font-bold">FLASH SALE GIÁ TỐT</span>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <span>Kết thúc sau:</span>
                  <span className="bg-white text-blue-600 px-1 rounded">00</span>
                  <span>:</span>
                  <span className="bg-white text-blue-600 px-1 rounded">00</span>
                  <span>:</span>
                  <span className="bg-white text-blue-600 px-1 rounded">00</span>
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">{product.currentPrice.toLocaleString()}đ</span>
                <span className="text-sm">/ Hộp</span>
              </div>
              <div className="text-lg line-through opacity-75">{product.originalPrice.toLocaleString()}đ</div>
              <p className="text-sm mt-2">
                Lưu ý: Flash sale giá sốc chỉ áp dụng với số lượng & thời gian giới hạn xem chi tiết ↗
              </p>
            </div>

            {/* Unit Selection */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Chọn đơn vị tính</span>
              <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hộp">Hộp</SelectItem>
                  <SelectItem value="Lốc">Lốc</SelectItem>
                  <SelectItem value="Thùng">Thùng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Specifications */}
            <ProductSpecifications specifications={specifications} />

            {/* Promotional Offers */}
            <PromotionalOffers offers={offers} />

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <QuantitySelector onChange={setQuantity} />

              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white py-3" onClick={handleAddToCart}>
                  Chọn mua
                </Button>
                <Button variant="outline" className="py-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  Tìm nhà thuốc
                </Button>
              </div>
            </div>

            {/* Product Interest */}
            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="text-sm text-orange-800">
                🔥 Sản phẩm đang được chú ý, có 14 người thêm vào giỏ hàng & 9 người đang xem
              </p>
            </div>

          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
