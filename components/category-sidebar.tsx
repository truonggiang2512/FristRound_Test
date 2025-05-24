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
    icon: "/placeholder.svg?height=24&width=24",
    href: "/categories/oil-filter",
  },
  {
    id: "air-filter",
    name: "Bộ Lọc Không Khí",
    icon: "/placeholder.svg?height=24&width=24",
    href: "/categories/air-filter",
  },
  {
    id: "fuel-filter",
    name: "Bộ Lọc Nhiên Liệu",
    icon: "/placeholder.svg?height=24&width=24",
    href: "/categories/fuel-filter",
  },
  {
    id: "cabin-filter",
    name: "Bộ Lọc Trong Cabin",
    icon: "/placeholder.svg?height=24&width=24",
    href: "/categories/cabin-filter",
  },
  {
    id: "air-filter-2",
    name: "Bộ Lọc Không Khí",
    icon: "/placeholder.svg?height=24&width=24",
    href: "/categories/air-filter-2",
  },
  {
    id: "cabin-filter-2",
    name: "Bộ Lọc Trong Cabin",
    icon: "/placeholder.svg?height=24&width=24",
    href: "/categories/cabin-filter-2",
  },
  {
    id: "fuel-filter-2",
    name: "Bộ Lọc Nhiên Liệu",
    icon: "/placeholder.svg?height=24&width=24",
    href: "/categories/fuel-filter-2",
  },
  {
    id: "air-filter-3",
    name: "Bộ Lọc Không Khí",
    icon: "/placeholder.svg?height=24&width=24",
    href: "/categories/air-filter-3",
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
                width={24}
                height={24}
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
