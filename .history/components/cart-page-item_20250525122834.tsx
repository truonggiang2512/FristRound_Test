"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface CartPageItemProps {
  id: string
  name: string
  image: string
  price: number
  comparePrice?: number
  quantity: number
  unit: string
  discount?: number
  badge?: string
  discountInfo?: string
  isSelected: boolean
  onSelect: (id: string, selected: boolean) => void
  onQuantityChange: (id: string, quantity: number) => void
  onUnitChange: (id: string, unit: string) => void
  onRemove: (id: string) => void
}

export function CartPageItem({
  id,
  name,
  image,
  price,
  comparePrice,
  quantity,
  unit,
  discount,
  badge,
  discountInfo,
  isSelected,
  onSelect,
  onQuantityChange,
  onUnitChange,
  onRemove,
}: CartPageItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onQuantityChange(id, newQuantity)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <div className="flex items-center pt-2">
          <Checkbox checked={isSelected} onCheckedChange={(checked) => onSelect(id, checked as boolean)} />
        </div>

        {/* Product Image */}
        <div className="flex-shrink-0 relative">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={80}
            height={80}
            className="object-contain rounded"
          />
          {badge && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">{badge}</div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 mb-2">{name}</h3>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-blue-600 font-bold text-lg">{price.toLocaleString()}đ</span>
            {comparePrice && comparePrice > price && (
              <span className="text-gray-500 text-sm line-through">{comparePrice.toLocaleString()}đ</span>
            )}
          </div>
          {discountInfo && (
            <div className="flex items-center space-x-2 text-sm">
              <div className="bg-red-100 text-red-600 px-2 py-1 rounded flex items-center">
                <span className="mr-1">⚡</span>
                {discountInfo}
              </div>
            </div>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
            className="w-16 h-8 text-center"
            min="1"
          />
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(quantity + 1)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Unit Selector */}
        <div className="w-24">
          <Select value={unit} onValueChange={(value) => onUnitChange(id, value)}>
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Lốc">Lốc</SelectItem>
              <SelectItem value="Hộp">Hộp</SelectItem>
              <SelectItem value="Chai">Chai</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Remove Button */}
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500" onClick={() => onRemove(id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
