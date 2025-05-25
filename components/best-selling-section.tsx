import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"

interface Product {
  _id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  sku: string
  price: number
  comparePrice: number
  stock: number
  images: string[]
  categoryId: string
  brand: string
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
    unit: string
  }
  attributes: {
    name: string
    value: string
    _id: string
  }[]
  isActive: boolean
  isFeatured: boolean
  tags: string[]
  ratings: {
    average: number
    count: number
  }
  createdAt: string
  updatedAt: string
}

interface BestSellingSectionProps {
  products?: Product[]
}

const bestSellingProducts: Product[] = [
  {
    _id: "68328e9e6b7490884dc9b316",
    name: "Lọc Dầu Suzuki Universal",
    slug: "lc-du-suzuki-universal-173",
    description: "Lọc Dầu Suzuki Universal chính hãng, chất lượng cao giúp bảo vệ động cơ tối ưu",
    shortDescription: "Lọc Dầu Suzuki Universal chính hãng",
    sku: "OIL-FILTER-SUZ-174",
    price: 211294,
    comparePrice: 293465,
    stock: 82,
    images: ["/img (1).png"],
    categoryId: "68328e9e6b7490884dc9afab",
    brand: "WIX",
    weight: 1.0137652859500337,
    dimensions: {
      length: 14.730423220094767,
      width: 26.33510750112563,
      height: 16.833291308237374,
      unit: "cm",
    },
    attributes: [
      {
        name: "Thương hiệu xe",
        value: "Suzuki",
        _id: "68328e9e6b7490884dc9b317",
      },
      {
        name: "Dòng xe",
        value: "Universal",
        _id: "68328e9e6b7490884dc9b318",
      },
      {
        name: "Xuất xứ",
        value: "Việt Nam",
        _id: "68328e9e6b7490884dc9b319",
      },
      {
        name: "Bảo hành",
        value: "12 tháng",
        _id: "68328e9e6b7490884dc9b31a",
      },
    ],
    isActive: true,
    isFeatured: false,
    tags: ["suzuki", "universal", "oil-filter", "chinh-hang"],
    ratings: {
      average: 3.651981831346376,
      count: 11,
    },
    createdAt: "2025-05-25T03:29:34.760Z",
    updatedAt: "2025-05-25T03:29:34.760Z",
  },
  {
    _id: "68328e9e6b7490884dc9b3126",
    name: "Lọc Dầu Suzuki Universal",
    slug: "lc-du-suzuki-universal-173",
    description: "Lọc Dầu Suzuki Universal chính hãng, chất lượng cao giúp bảo vệ động cơ tối ưu",
    shortDescription: "Lọc Dầu Suzuki Universal chính hãng",
    sku: "OIL-FILTER-SUZ-174",
    price: 211294,
    comparePrice: 293465,
    stock: 82,
    images: ["/img.png"],
    categoryId: "68328e9e6b7490884dc9afab",
    brand: "WIX",
    weight: 1.0137652859500337,
    dimensions: {
      length: 14.730423220094767,
      width: 26.33510750112563,
      height: 16.833291308237374,
      unit: "cm",
    },
    attributes: [
      {
        name: "Thương hiệu xe",
        value: "Suzuki",
        _id: "68328e9e6b7490884dc9b317",
      },
      {
        name: "Dòng xe",
        value: "Universal",
        _id: "68328e9e6b7490884dc9b318",
      },
      {
        name: "Xuất xứ",
        value: "Việt Nam",
        _id: "68328e9e6b7490884dc9b319",
      },
      {
        name: "Bảo hành",
        value: "12 tháng",
        _id: "68328e9e6b7490884dc9b31a",
      },
    ],
    isActive: true,
    isFeatured: false,
    tags: ["suzuki", "universal", "oil-filter", "chinh-hang"],
    ratings: {
      average: 3.651981831346376,
      count: 11,
    },
    createdAt: "2025-05-25T03:29:34.760Z",
    updatedAt: "2025-05-25T03:29:34.760Z",
  },
  {
    _id: "68328e9e6b7490884dc429b316",
    name: "Lọc Dầu Suzuki Universal",
    slug: "lc-du-suzuki-universal-173",
    description: "Lọc Dầu Suzuki Universal chính hãng, chất lượng cao giúp bảo vệ động cơ tối ưu",
    shortDescription: "Lọc Dầu Suzuki Universal chính hãng",
    sku: "OIL-FILTER-SUZ-174",
    price: 211294,
    comparePrice: 293465,
    stock: 82,
    images: ["/Image.png"],
    categoryId: "68328e9e6b7490884dc9afab",
    brand: "WIX",
    weight: 1.0137652859500337,
    dimensions: {
      length: 14.730423220094767,
      width: 26.33510750112563,
      height: 16.833291308237374,
      unit: "cm",
    },
    attributes: [
      {
        name: "Thương hiệu xe",
        value: "Suzuki",
        _id: "68328e9e6b7490884dc9b317",
      },
      {
        name: "Dòng xe",
        value: "Universal",
        _id: "68328e9e6b7490884dc9b318",
      },
      {
        name: "Xuất xứ",
        value: "Việt Nam",
        _id: "68328e9e6b7490884dc9b319",
      },
      {
        name: "Bảo hành",
        value: "12 tháng",
        _id: "68328e9e6b7490884dc9b31a",
      },
    ],
    isActive: true,
    isFeatured: false,
    tags: ["suzuki", "universal", "oil-filter", "chinh-hang"],
    ratings: {
      average: 3.651981831346376,
      count: 11,
    },
    createdAt: "2025-05-25T03:29:34.760Z",
    updatedAt: "2025-05-25T03:29:34.760Z",
  },

]

export function BestSellingSection({ products = bestSellingProducts }: BestSellingSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Sản Phẩm Bán Chạy</h3>
        <Link href="/best-selling" className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
          <span className="text-sm font-medium">Xem tất cả</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product._id} className="min-w-0">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  )
}
