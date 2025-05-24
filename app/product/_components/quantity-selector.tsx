"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface QuantitySelectorProps {
  initialQuantity?: number
  min?: number
  max?: number
  onChange?: (quantity: number) => void
}

export function QuantitySelector({ initialQuantity = 1, min = 1, max = 99, onChange }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= min && newQuantity <= max) {
      setQuantity(newQuantity)
      onChange?.(newQuantity)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Chọn số lượng</span>
      <div className="flex items-center border border-gray-300 rounded-lg">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-l-lg"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= min}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || min)}
          className="w-16 h-8 text-center border-0 border-l border-r border-gray-300"
          min={min}
          max={max}
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-r-lg"
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={quantity >= max}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
