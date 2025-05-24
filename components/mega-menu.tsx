"use client"

import { useState } from "react"
import { CategorySidebar } from "@/components/category-sidebar"
import { CategoryGrid } from "@/components/category-grid"
import { BestSellingSection } from "@/components/best-selling-section"
import { randomBytes, randomInt } from "crypto"

interface MegaMenuProps {
  isVisible: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function MegaMenu({ isVisible, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string>("oil-filter")

  if (!isVisible) return null

  return (
    <div
      className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto">
        <div className="flex">
          <CategorySidebar activeCategory={activeCategory} onCategoryHover={setActiveCategory} />
          <div className="flex-1 p-6">
            <CategoryGrid items={[]} />
            <BestSellingSection products={[]} />
          </div>
        </div>
      </div>
    </div>
  )
}
