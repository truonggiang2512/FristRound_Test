"use client"
import { useEffect, useState } from "react"
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

export default function ProductPage({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch()
  const [selectedUnit, setSelectedUnit] = useState("Hộp")
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/products/${params.id}`)
        const data = await res.json()
        if (!res.ok || !data.success) throw new Error(data.message || "Không tìm thấy sản phẩm")
        setProduct(data.data)
      } catch (err: any) {
        setError(err.message || "Lỗi khi tải sản phẩm")
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [params.id])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Đang tải sản phẩm...</div>
  }
  if (error || !product) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error || "Không tìm thấy sản phẩm"}</div>
  }

  // Map DB images to gallery format
  const galleryImages = (product.images || []).map((img: string, idx: number) => ({
    id: String(idx),
    src: img,
    alt: product.name || "Product image",
  }))

  // Map DB attributes to specifications
  const specifications = [
    { label: "Chọn đơn vị tính", value: selectedUnit },
    { label: "SKU", value: product.sku },
    { label: "Danh mục", value: product.categoryId?.name || "-", link: product.categoryId?.slug ? `/categories/${product.categoryId.slug}` : undefined },
    { label: "Thương hiệu", value: product.brand || "-" },
    { label: "Giá gốc", value: product.comparePrice ? product.comparePrice.toLocaleString() + "đ" : "-" },
    { label: "Tồn kho", value: String(product.stock) },
    { label: "Khối lượng", value: product.weight ? `${product.weight} kg` : "-" },
    ...(product.dimensions ? [{ label: "Kích thước", value: `${product.dimensions.length}x${product.dimensions.width}x${product.dimensions.height} ${product.dimensions.unit}` }] : []),
    ...(product.attributes || []).map((attr: any) => ({ label: attr.name, value: attr.value })),
  ]

  // Example offers (can be dynamic)
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

  const discount = product.comparePrice && product.comparePrice > product.price
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        image: product.images?.[0] || "/placeholder.svg",
        price: product.price,
        originalPrice: product.comparePrice,
        quantity,
      }),
    )
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
          <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/categories" className="hover:text-blue-600">Danh mục</Link>
          {product.categoryId?.slug && <><ChevronRight className="h-4 w-4" /><Link href={`/categories/${product.categoryId.slug}`} className="hover:text-blue-600">{product.categoryId.name}</Link></>}
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">{product.name}</span>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={galleryImages} />
          </div>
          {/* Product Details */}
          <div className="space-y-6">
            {/* Brand and Title */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-600">Thương hiệu:</span>
                <span className="text-blue-600 font-medium">{product.brand}</span>
                {product.isFeatured && <div className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">Nổi bật</div>}
              </div>
              <h1 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>SKU: {product.sku}</span>
                {product.ratings && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{product.ratings.average?.toFixed(1)}</span>
                    <span>({product.ratings.count})</span>
                  </div>
                )}
                <span>Tồn kho: {product.stock}</span>
              </div>
            </div>
            {/* Price and Discount */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {discount > 0 && <span className="bg-white text-red-600 px-2 py-1 rounded text-sm font-medium">Giảm {discount}%</span>}
                  {product.isFeatured && <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm font-medium">Nổi bật</span>}
                  <span className="text-lg font-bold">FLASH SALE GIÁ TỐT</span>
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">{product.price?.toLocaleString()}đ</span>
                <span className="text-sm">/ {selectedUnit}</span>
              </div>
              {product.comparePrice && product.comparePrice > product.price && (
                <div className="text-lg line-through opacity-75">{product.comparePrice.toLocaleString()}đ</div>
              )}
              <p className="text-sm mt-2">Lưu ý: Flash sale giá sốc chỉ áp dụng với số lượng & thời gian giới hạn xem chi tiết ↗</p>
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
            {/* Short Description */}
            {product.shortDescription && <div className="text-gray-700 text-sm mb-2">{product.shortDescription}</div>}
            {/* Specifications */}
            <ProductSpecifications specifications={specifications} />
            {/* Promotional Offers */}
            <PromotionalOffers offers={offers} />
            {/* Quantity and Actions */}
            <div className="space-y-4">
              <QuantitySelector initialQuantity={1} onChange={setQuantity} />
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white py-3" onClick={handleAddToCart}>Chọn mua</Button>
                <Button variant="outline" className="py-3"><MapPin className="h-4 w-4 mr-2" />Tìm nhà thuốc</Button>
              </div>
            </div>
            {/* Product Interest */}
            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="text-sm text-orange-800">🔥 Sản phẩm đang được chú ý, có 14 người thêm vào giỏ hàng & 9 người đang xem</p>
            </div>
          </div>
        </div>
        {/* Full Description */}
        {product.description && (
          <div className="mt-10 bg-white rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold mb-2">Mô tả sản phẩm</h2>
            <div className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  )
}

