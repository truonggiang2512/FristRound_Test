"use client"

import Image from "next/image"
import { ChevronRight } from "lucide-react"

interface CategoryItem {
  id: string
  name: string
  icon: string
  href: string
}

interface CategorySidebarProps {
  categories?: CategoryItem[]
  activeCategory?: string
  onCategoryHover?: (categoryId: string) => void
}

const categoryItems: CategoryItem[] = [
  {
    id: "oil-filter",
    name: "Bộ Lọc Dầu",
    icon: "/Image (1).png",
    href: "/categories/oil-filter",
  },
  {
    id: "air-filter",
    name: "Bộ Lọc Không Khí",
    icon: "/Image (2).png",
    href: "/categories/air-filter",
  },
  {
    id: "fuel-filter",
    name: "Bộ Lọc Nhiên Liệu",
    icon: "/Image.png",
    href: "/categories/fuel-filter",
  },
  {
    id: "cabin-filter",
    name: "Bộ Lọc Trong Cabin",
    icon: "/img.png",
    href: "/categories/cabin-filter",
  },
  {
    id: "air-filter-2",
    name: "Bộ Lọc Không Khí",
    icon: "/img (1).png",
    href: "/categories/air-filter-2",
  },

]

export function CategorySidebar({ categories = categoryItems, activeCategory, onCategoryHover }: CategorySidebarProps) {
  return (
    <div className="w-64 min-w-[16rem] bg-gray-50 border-r border-gray-200">
      <div className="py-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`flex items-center justify-between px-4 py-3 hover:bg-white cursor-pointer transition-colors ${activeCategory === category.id ? "bg-white border-r-2 border-blue-600" : ""
              }`}
            onMouseEnter={() => onCategoryHover?.(category.id)}
          >
            <div className="flex items-center space-x-3">
              <Image
                src={category.icon || "/placeholder.svg"}
                alt={category.name}
                width={44}
                height={44}
                className="object-contain"
              />
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  )
}
