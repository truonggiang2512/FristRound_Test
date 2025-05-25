"use client"

import Image from "next/image"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CartItemProps {
  id: string
  name: string
  image: string
  currentPrice: number
  originalPrice: number
  quantity: number
  onRemove?: (id: string) => void
}

export function CartItem({ id, name, image, currentPrice, originalPrice, quantity, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center space-x-3 py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex-shrink-0">
        <Image src={image || "/placeholder.svg"} alt={name} width={60} height={60} className="object-contain rounded" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{name}</h4>
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 font-semibold">{currentPrice.toLocaleString()}đ</span>
          <span className="text-gray-500 text-sm line-through">{originalPrice.toLocaleString()}đ</span>
        </div>
        <div className="text-sm text-gray-600 mt-1">x{quantity} Hộp</div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="flex-shrink-0 text-gray-400 hover:text-red-500"
        onClick={() => onRemove?.(id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
