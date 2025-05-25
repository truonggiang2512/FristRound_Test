"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/lib/redux/hooks"
import { addToCart, setShowCartDropdown } from "@/lib/redux/slices/cartSlice"

interface ProductCardProps {
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

export function ProductCard({
  _id,
  name,
  images,
  price,
  comparePrice,
  shortDescription,
  attributes = [],
  ratings,
  brand,
  badge = "Giá cực sốc",
}: ProductCardProps) {
  const dispatch = useAppDispatch()

  // Calculate discount percentage
  const discount = comparePrice && comparePrice > price
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        id: _id,
        name,
        image: images?.[0] || "/placeholder.svg",
        price,
        originalPrice: comparePrice,
      }),
    )

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    setTimeout(() => {
      dispatch(setShowCartDropdown(false))
    }, 3000)
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <Link href={`/product/${_id}`}>
          <div className="aspect-square relative">
            <Image src={images?.[0] || "/placeholder.svg"} alt={name} fill className="object-contain p-4" />
          </div>
        </Link>
        {badge && discount > 0 && (
          <div className="absolute -bottom-1 font-bold left-4 bg-yellow-400 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
            <span className="mr-1">🔥</span>
            {badge}
          </div>
        )}
      </div>
      <div className="p-4">
        <Link href={`/product/${_id}`} className="hover:text-blue-600">
          <h3 className="text-sm font-medium line-clamp-2 h-10">{name}</h3>
        </Link>
        {shortDescription && <div className="text-xs text-gray-500 mb-2 line-clamp-2">{shortDescription}</div>}
        {brand && <div className="text-xs text-gray-400 mb-1">Thương hiệu: {brand}</div>}
        <div className="mt-2">
          <div className="text-red-600 font-bold">{price?.toLocaleString()} đ</div>
          {comparePrice && comparePrice > price && (
            <div className="flex items-center mt-1">
              <span className="text-gray-500 text-sm line-through">{comparePrice?.toLocaleString()} đ</span>
              <span className="ml-2 text-red-600 text-sm">-{discount}%</span>
            </div>
          )}
        </div>
        {attributes && attributes.length > 0 && (
          <ul className="mt-2 text-xs text-gray-600 space-y-1">
            {attributes.map((attr, idx) => (
              <li key={idx}><span className="font-medium text-gray-700">{attr.name}:</span> {attr.value}</li>
            ))}
          </ul>
        )}
        {ratings && (
          <div className="mt-2 flex items-center text-xs text-yellow-600">
            <span className="font-semibold mr-1">★ {ratings.average?.toFixed(1)}</span>
            <span className="text-gray-400">({ratings.count})</span>
          </div>
        )}
        <Button className="w-full mt-3 bg-blue-100 hover:bg-blue-200 text-blue-700" onClick={handleBuyNow}>
          Mua ngay
        </Button>
      </div>
    </div>
  )
}
