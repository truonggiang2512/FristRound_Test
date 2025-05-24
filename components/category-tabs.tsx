"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface CategoryTab {
  id: string
  name: string
}

interface CategoryTabsProps {
  categories: CategoryTab[]
  onSelectCategory?: (categoryId: string) => void
}

export function CategoryTabs({ categories, onSelectCategory }: CategoryTabsProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || "")

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    if (onSelectCategory) {
      onSelectCategory(categoryId)
    }
  }

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex space-x-2 pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors",
              activeCategory === category.id ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100",
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}
