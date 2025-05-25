"use client"
import { CategoryTabs } from "@/components/category-tabs"
import { SortOptions } from "@/components/sort-options"
import { FilterSidebar } from "@/components/filter-sidebar"
import { ProductGrid } from "./product-grid"
import { useState, useMemo } from "react"
import { useProducts } from "@/lib/hooks/use-products"

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
      { id: "Việt Nam", label: "Việt Nam", count: 24 },
    ],
  },
]

const priceRanges = [
  { id: "under-100k", label: "Dưới 100,000 đ", max: 100000 },
  { id: "100k-300k", label: "100,000 đ - 300,000 đ", min: 100000, max: 300000 },
  { id: "300k-500k", label: "300,000 đ - 500,000 đ", min: 300000, max: 500000 },
  { id: "over-500k", label: "Trên 500,000 đ", min: 500000 },
]

// Helper to map DB product to ProductCard/ProductGrid props
function mapProductFromDB(dbProduct: any) {
  return {
    _id: dbProduct._id,
    name: dbProduct.name,
    images: dbProduct.images,
    price: dbProduct.price,
    comparePrice: dbProduct.comparePrice,
    shortDescription: dbProduct.shortDescription,
    attributes: dbProduct.attributes,
    ratings: dbProduct.ratings,
    brand: dbProduct.brand,
    badge: dbProduct.isFeatured ? "Nổi bật" : undefined,
    categoryId: dbProduct.categoryId,
    tags: dbProduct.tags,
    origin: dbProduct.attributes?.find((a: any) => a.name === "Origin")?.value,
    year: dbProduct.attributes?.find((a: any) => a.name === "Year")?.value,
  }
}

// Sample DB product data
const productsFromDB = [
  {
    _id: "68328e9e6b7490884dc9afb2",
    name: "Ford Universal Air Filter",
    slug: "ford-universal-air-filter-0",
    description: "Genuine Ford Universal air filter, high quality to protect engine optimally",
    shortDescription: "Genuine Ford Universal air filter",
    sku: "AIR-FILTER-FOR-001",
    price: 143161,
    comparePrice: 201636,
    stock: 62,
    images: ["/placeholder.svg?height=400&width=400"],
    categoryId: "air-filter",
    brand: "SAKURA",
    weight: 1.5172273155247904,
    dimensions: {
      length: 29.448051213888128,
      width: 11.730423988688505,
      height: 19.706525347700357,
      unit: "cm"
    },
    attributes: [
      { name: "Car Brand", value: "Ford" },
      { name: "Car Model", value: "Universal" },
      { name: "Origin", value: "Vietnam" },
      { name: "Warranty", value: "12 months" },
      { name: "Year", value: "2021" },
    ],
    isActive: true,
    isFeatured: false,
    tags: ["ford", "universal", "air-filter", "genuine"],
    ratings: { average: 4.73, count: 35 },
    createdAt: "2025-05-25T03:29:34.371Z",
    updatedAt: "2025-05-25T03:29:34.371Z"
  },
  // ... more products
]

export function ProductListing() {
  // Filter state
  const [activeFilters, setActiveFilters] = useState<{ [groupId: string]: Set<string> }>({})
  const [activePriceRange, setActivePriceRange] = useState<string | null>(null)

  // Fetch all products from backend
  const { data, isLoading, error } = useProducts()
  const products = useMemo(() => (data?.data || []).map(mapProductFromDB), [data])

  // Helper: categoryId to name
  const categoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach((cat) => {
      map.set(cat.id, cat.name);
    });
    return map;
  }, []);

  // Generate filter options dynamically from products
  const categoryOptions = useMemo(() => {
    const map = new Map();
    products.forEach((p: any) => {
      if (p.categoryId) {
        map.set(p.categoryId, (map.get(p.categoryId) || 0) + 1);
      }
    });
    return Array.from(map.entries()).map(([id, count]) => ({
      id,
      label: categoryMap.get(id) || id,
      count,
    }));
  }, [products, categoryMap]);

  const brandOptions = useMemo(() => {
    const map = new Map();
    products.forEach((p: any) => {
      if (p.brand) {
        map.set(p.brand, (map.get(p.brand) || 0) + 1);
      }
    });
    return Array.from(map.entries()).map(([id, count]) => ({
      id: id.toLowerCase(),
      label: id,
      count,
    }));
  }, [products]);

  // Attribute-based filter options
  function getAttributeOptions(attrName: string) {
    const map = new Map();
    products.forEach((p: any) => {
      p.attributes?.forEach((attr: any) => {
        if (attr.name === attrName) {
          map.set(attr.value, (map.get(attr.value) || 0) + 1);
        }
      });
    });
    return Array.from(map.entries()).map(([id, count]) => ({
      id,
      label: id,
      count,
    }));
  }
  const carBrandOptions = useMemo(() => getAttributeOptions("Car Brand"), [products]);
  const modelOptions = useMemo(() => getAttributeOptions("Car Model"), [products]);
  const yearOptions = useMemo(() => getAttributeOptions("Year"), [products]);
  const originOptions = useMemo(() => getAttributeOptions("Origin"), [products]);
  const warrantyOptions = useMemo(() => getAttributeOptions("Warranty"), [products]);

  // Price range min/max
  const minPrice = useMemo(() => Math.min(...products.map((p: any) => p.price)), [products])
  const maxPrice = useMemo(() => Math.max(...products.map((p: any) => p.price)), [products])

  // Build filterGroups for the sidebar
  const filterGroups = [
    { id: "categories", title: "Danh mục sản phẩm", options: categoryOptions },
    { id: "brands", title: "Thương hiệu", options: brandOptions },
    { id: "carBrand", title: "Hãng xe", options: carBrandOptions },
    { id: "model", title: "Model", options: modelOptions },
    { id: "year", title: "Năm sản xuất", options: yearOptions },
    { id: "origin", title: "Xuất xứ", options: originOptions },
    { id: "warranty", title: "Bảo hành", options: warrantyOptions },
  ];

  // Filtering logic
  const filteredProducts = useMemo(() => products.filter((product: any) => {
    for (const group of filterGroups) {
      const active = activeFilters[group.id]
      if (active && active.size > 0) {
        if (group.id === "categories" && !active.has(product.categoryId)) return false
        if (group.id === "brands" && product.brand && !active.has(product.brand.toLowerCase())) return false
        if (group.id === "carBrand" && product.attributes?.find((a: any) => a.name === "Car Brand") && !active.has(product.attributes.find((a: any) => a.name === "Car Brand")?.value)) return false
        if (group.id === "model" && product.attributes?.find((a: any) => a.name === "Car Model") && !active.has(product.attributes.find((a: any) => a.name === "Car Model")?.value)) return false
        if (group.id === "year" && product.year && !active.has(product.year)) return false
        if (group.id === "origin" && product.origin && !active.has(product.origin)) return false
        if (group.id === "warranty" && product.attributes?.find((a: any) => a.name === "Warranty") && !active.has(product.attributes.find((a: any) => a.name === "Warranty")?.value)) return false
      }
    }
    // Price range (if you want to add a slider, implement here)
    if (activePriceRange) {
      const range = priceRanges.find((r) => r.id === activePriceRange)
      if (range) {
        if (typeof range.min === "number" && product.price < range.min) return false
        if (typeof range.max === "number" && product.price > range.max) return false
      }
    }
    return true
  }), [products, filterGroups, activeFilters, activePriceRange])

  // Handlers
  const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
    setActiveFilters((prev) => {
      const set = new Set(prev[groupId] || [])
      if (checked) set.add(optionId)
      else set.delete(optionId)
      return { ...prev, [groupId]: set }
    })
  }
  const handlePriceRangeChange = (rangeId: string) => {
    setActivePriceRange(rangeId)
  }
  const handleClearFilters = () => {
    setActiveFilters({})
    setActivePriceRange(null)
  }

  // Active filter chips
  const activeChips: { label: string; onRemove: () => void }[] = []
  filterGroups.forEach((group) => {
    const active = activeFilters[group.id]
    if (active && active.size > 0) {
      group.options.forEach((option) => {
        if (active.has(option.id)) {
          activeChips.push({
            label: option.label,
            onRemove: () => handleFilterChange(group.id, option.id, false),
          })
        }
      })
    }
  })
  if (activePriceRange) {
    const range = priceRanges.find((r) => r.id === activePriceRange)
    if (range) {
      activeChips.push({
        label: range.label,
        onRemove: () => setActivePriceRange(null),
      })
    }
  }

  // Loading and error states
  if (isLoading) {
    return <div className="flex justify-center items-center h-64 text-gray-500">Đang tải sản phẩm...</div>
  }
  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">Lỗi tải sản phẩm</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-24 h-fit">
          <FilterSidebar
            filterGroups={filterGroups}
            priceRanges={[]}
            onFilterChange={handleFilterChange}
            onPriceRangeChange={handlePriceRangeChange}
          />
          {(activeChips.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {activeChips.map((chip, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  {chip.label}
                  <button onClick={chip.onRemove} className="ml-1 text-blue-500 hover:text-red-500">×</button>
                </span>
              ))}
              <button onClick={handleClearFilters} className="ml-2 text-xs text-gray-500 underline hover:text-blue-600">Xóa tất cả</button>
            </div>
          )}
        </div>
        {/* Product listing */}
        <div className="flex-1">
          <div className="flex ">
            <h1 className="text-2xl font-bold mb-6">Danh sách sản phẩm</h1>
          </div>
          {/* Sort options */}
          <div className="mb-6">
            <SortOptions options={sortOptions} defaultOption="relevant" />
          </div>
          {/* Product grid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  )
}
