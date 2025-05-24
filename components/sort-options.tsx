"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SortOption {
  id: string
  name: string
}

interface SortOptionsProps {
  options: SortOption[]
  defaultOption?: string
  onSort?: (sortId: string) => void
}

export function SortOptions({ options, defaultOption, onSort }: SortOptionsProps) {
  const [activeSort, setActiveSort] = useState<string>(defaultOption || options[0]?.id || "")
  const [showPriceOptions, setShowPriceOptions] = useState(false)

  const handleSortClick = (sortId: string) => {
    setActiveSort(sortId)
    if (onSort) {
      onSort(sortId)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Sắp xếp theo</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSortClick(option.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md border transition-colors",
              activeSort === option.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
            )}
          >
            {option.name}
          </button>
        ))}
        <div className="relative">
          <button
            onClick={() => setShowPriceOptions(!showPriceOptions)}
            className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 flex items-center gap-1"
          >
            <span>Giá: Thấp → Cao</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          {showPriceOptions && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                onClick={() => {
                  setShowPriceOptions(false)
                }}
              >
                Giá: Thấp → Cao
              </button>
              <button
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                onClick={() => {
                  setShowPriceOptions(false)
                }}
              >
                Giá: Cao → Thấp
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
