import mongoose, { type Document, Schema } from "mongoose"

export interface IProduct extends Document {
  _id: string
  name: string
  slug: string
  description?: string
  shortDescription?: string
  sku: string
  price: number
  comparePrice?: number
  costPrice?: number
  stock: number
  images: string[]
  categoryId: mongoose.Types.ObjectId
  brand?: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
    unit: "cm" | "inch"
  }
  attributes: Array<{
    name: string
    value: string
  }>
  variants: Array<{
    name: string
    options: string[]
  }>
  isActive: boolean
  isFeatured: boolean
  tags: string[]
  seo: {
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string[]
  }
  ratings: {
    average: number
    count: number
  }
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: String,
    shortDescription: String,
    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    comparePrice: {
      type: Number,
      min: 0,
    },
    costPrice: {
      type: Number,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    images: [String],
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: String,
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        enum: ["cm", "inch"],
        default: "cm",
      },
    },
    attributes: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    variants: [
      {
        name: { type: String, required: true },
        options: [String],
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    seo: {
      metaTitle: String,
      metaDescription: String,
      metaKeywords: [String],
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better performance
ProductSchema.index({ slug: 1 })
ProductSchema.index({ sku: 1 })
ProductSchema.index({ categoryId: 1, isActive: 1 })
ProductSchema.index({ isActive: 1, isFeatured: 1 })
ProductSchema.index({ price: 1 })
ProductSchema.index({ "ratings.average": -1 })
ProductSchema.index({ createdAt: -1 })
ProductSchema.index({ name: "text", description: "text", tags: "text" })

// Pre-save middleware
ProductSchema.pre("save", function (next) {
  if (this.isModified("name") && !this.isModified("slug")) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }
  next()
})

export const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)
