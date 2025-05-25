import Image from "next/image"
import Link from "next/link"

interface CategoryGridItem {
  id: string
  name: string
  icon: string
  href: string
}

interface CategoryGridProps {
  items?: CategoryGridItem[]
}

const gridItems: CategoryGridItem[] = [
  {
    id: "air-filter-1",
    name: "Bộ lọc gió",
    icon: "/Image (1).png",
    href: "/categories/air-filter-1",
  },
  {
    id: "air-filter-2",
    name: "Bộ lọc gió",
    icon: "/Image (1).png",
    href: "/categories/air-filter-2",
  },
  {
    id: "air-filter-3",
    name: "Bộ lọc gió",
    icon: "/Image (1).png",
    href: "/categories/air-filter-3",
  },
  {
    id: "air-filter-4",
    name: "Bộ lọc gió",
    icon: "/Image (1).png",
    href: "/categories/air-filter-4",
  },
  {
    id: "air-filter-5",
    name: "Bộ lọc gió",
    icon: "/Image (1).png",
    href: "/categories/air-filter-5",
  },
  {
    id: "air-filter-6",
    name: "Bộ lọc gió",
    icon: "/Image (2).png",
    href: "/categories/air-filter-6",
  },
]

export function CategoryGrid({ items = gridItems }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <div className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform">
            <Image
              src={item.icon || "/placeholder.svg"}
              alt={item.name}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <span className="text-sm font-medium text-gray-700 text-center">{item.name}</span>
        </Link>
      ))}
    </div>
  )
}
