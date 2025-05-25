import { CategoryTabs } from "@/components/category-tabs"
import { SortOptions } from "@/components/sort-options"
import { FilterSidebar } from "@/components/filter-sidebar"
import { ProductGrid } from "./product-grid"

// Sample data
const categories = [
  { id: "all", name: "Tất cả" },
  { id: "air-filter", name: "Lọc gió động cơ" },
  { id: "fuel-filter", name: "Lọc nhiên liệu" },
  { id: "oil-filter", name: "Lọc dầu" },
  { id: "cabin-filter", name: "Lọc gió điều hòa" },
]

const sortOptions = [
  { id: "relevant", name: "Liên quan" },
  { id: "bestseller", name: "Bán chạy" },
  { id: "newest", name: "Mới nhất" },
  { id: "popular", name: "Nổi bật" },
]

const filterGroups = [
  {
    id: "categories",
    title: "Danh mục sản phẩm",
    options: [
      { id: "air-filter", label: "Lọc gió động cơ - Air Filter", count: 24, checked: true },
      { id: "fuel-filter", label: "Lọc nhiên liệu - Fuel Filter", count: 24, checked: true },
      { id: "oil-filter", label: "Bộ lọc dầu", count: 24, checked: true },
      { id: "uncategorized", label: "Chưa phân loại", count: 24 },
      { id: "other", label: "Khác", count: 24 },
    ],
  },
  {
    id: "brands",
    title: "Thương hiệu",
    options: [
      { id: "asakashi", label: "Asakashi", count: 24 },
      { id: "bosch", label: "Bosch", count: 24 },
      { id: "hyundai", label: "Hyundai", count: 24 },
    ],
  },
  {
    id: "year",
    title: "Năm sản xuất",
    options: [
      { id: "2021", label: "2021", count: 24 },
      { id: "2020", label: "2020", count: 24 },
      { id: "2019", label: "2019", count: 24 },
      { id: "2018", label: "2018", count: 24 },
    ],
  },
  {
    id: "origin",
    title: "Xuất xứ",
    options: [
      { id: "germany", label: "Đức", count: 24 },
      { id: "japan", label: "Nhật Bản", count: 24 },
      { id: "korea", label: "Trung Quốc", count: 24 },
    ],
  },
]

const priceRanges = [
  { id: "under-100k", label: "Dưới 100,000 đ", max: 100000 },
  { id: "100k-300k", label: "100,000 đ - 300,000 đ", min: 100000, max: 300000 },
  { id: "300k-500k", label: "300,000 đ - 500,000 đ", min: 300000, max: 500000 },
  { id: "over-500k", label: "Trên 500,000 đ", min: 500000 },
]

// Sample product data
const products = [
  {
    id: "1",
    name: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 299000,
    originalPrice: 329000,
    discount: 10,
    badge: "Giá cực sốc",
  },
  {
    id: "2",
    name: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 299000,
    originalPrice: 329000,
    discount: 10,
    badge: "Giá cực sốc",
  },
  {
    id: "3",
    name: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 299000,
    originalPrice: 329000,
    discount: 10,
    badge: "Giá cực sốc",
  },
  {
    id: "4",
    name: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 299000,
    originalPrice: 329000,
    discount: 10,
    badge: "Giá cực sốc",
  },
  {
    id: "5",
    name: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 299000,
    originalPrice: 329000,
    discount: 10,
    badge: "Giá cực sốc",
  },
  {
    id: "6",
    name: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 299000,
    originalPrice: 329000,
    discount: 10,
    badge: "Giá cực sốc",
  },
  {
    id: "7",
    name: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 299000,
    originalPrice: 329000,
    discount: 10,
    badge: "Giá cực sốc",
  },
  {
    id: "8",
    name: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 299000,
    originalPrice: 329000,
    discount: 10,
    badge: "Giá cực sốc",
  },
]

export function ProductListing() {
  return (
    <div className="container mx-auto px-4 py-8">


      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <FilterSidebar filterGroups={filterGroups} priceRanges={priceRanges} />
        </div>

        {/* Product listing */}
        <div className="flex-1">
          <div className="flex ">
            <h1 className="text-2xl font-bold mb-6">Danh sách sản phẩm</h1>

            {/* Categories at the top */}
            {/* <div className="mb-6">
              <CategoryTabs categories={categories} />
            </div> */}
          </div>
          {/* Sort options */}
          <div className="mb-6">
            <SortOptions options={sortOptions} defaultOption="relevant" />
          </div>

          {/* Product grid */}
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}
