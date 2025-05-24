"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/lib/redux/hooks"
import { addToCart, setShowCartDropdown } from "@/lib/redux/slices/cartSlice"

interface ProductCardProps {
  id: string
  name: string
  image: string
  currentPrice: number
  originalPrice: number
  discount: number
  badge?: string
}

export function ProductCard({
  id,
  name,
  image,
  currentPrice,
  originalPrice,
  discount,
  badge = "Giá cực sốc",
}: ProductCardProps) {
  const dispatch = useAppDispatch()

  const handleBuyNow = () => {
    // Add product to cart
    dispatch(
      addToCart({
        id,
        name,
        image,
        currentPrice,
        originalPrice,
      }),
    )

    // Scroll to top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    // Auto-hide cart dropdown after 3 seconds
    setTimeout(() => {
      dispatch(setShowCartDropdown(false))
    }, 3000)
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <Link href={`/product/${id}`}>
          <div className="aspect-square relative">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-contain p-4" />
          </div>
        </Link>
        {badge && (
          <div className="absolute -bottom-1 font-bold left-4 bg-yellow-400 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
            <span className="mr-1">🔥</span>
            {badge}
          </div>
        )}
      </div>
      <div className="p-4">
        <Link href={`/product/${id}`} className="hover:text-blue-600">
          <h3 className="text-sm font-medium line-clamp-2 h-10">{name}</h3>
        </Link>
        <div className="mt-2">
          <div className="text-red-600 font-bold">{currentPrice.toLocaleString()} đ</div>
          <div className="flex items-center mt-1">
            <span className="text-gray-500 text-sm line-through">{originalPrice.toLocaleString()} đ</span>
            <span className="ml-2 text-red-600 text-sm">-{discount}%</span>
          </div>
        </div>
        <Button className="w-full mt-3 bg-blue-100 hover:bg-blue-200 text-blue-700" onClick={handleBuyNow}>
          Mua ngay
        </Button>
      </div>
    </div>
  )
}
