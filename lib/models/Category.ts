import mongoose, { type Document, Schema } from "mongoose"

export interface ICategory extends Document {
  _id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: mongoose.Types.ObjectId
  children: mongoose.Types.ObjectId[]
  isActive: boolean
  sortOrder: number
  seo: {
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string[]
  }
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>(
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
    image: String,
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      metaKeywords: [String],
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
CategorySchema.index({ slug: 1 })
CategorySchema.index({ parentId: 1, isActive: 1 })
CategorySchema.index({ isActive: 1, sortOrder: 1 })

// Pre-save middleware to generate slug
CategorySchema.pre("save", function (next) {
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

export const Category = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema)
