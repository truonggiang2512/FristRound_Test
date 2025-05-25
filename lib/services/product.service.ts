import { connectToDatabase } from "@/lib/config/database"
import { Product } from "@/lib/models"
import type { CreateProductInput, UpdateProductInput, ProductQuery } from "@/lib/types/api"
import { generateSlug } from "@/lib/utils/slug"

export class ProductService {
  static async getProducts(query: ProductQuery) {
    await connectToDatabase()

    const {
      page,
      limit,
      search,
      categoryId,
      minPrice,
      maxPrice,
      brand,
      tags,
      sortBy,
      sortOrder,
      isActive,
      isFeatured,
    } = query

    // Build filter object
    const filter: any = {}

    if (search) {
      filter.$text = { $search: search }
    }

    if (categoryId) {
      filter.categoryId = categoryId
    }

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = minPrice
      if (maxPrice) filter.price.$lte = maxPrice
    }

    if (brand) {
      filter.brand = new RegExp(brand, "i")
    }

    if (tags && tags.length > 0) {
      filter.tags = { $in: tags }
    }

    if (isActive !== undefined) {
      filter.isActive = isActive
    }

    if (isFeatured !== undefined) {
      filter.isFeatured = isFeatured
    }

    // Build sort object
    const sort: any = {}
    sort[sortBy] = sortOrder === "asc" ? 1 : -1

    const skip = (page - 1) * limit

    const [products, total] = await Promise.all([
      Product.find(filter).populate("categoryId", "name slug").sort(sort).skip(skip).limit(limit).lean(),
      Product.countDocuments(filter),
    ])

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    }
  }

  static async getProductById(id: string) {
    await connectToDatabase()

    const product = await Product.findById(id).populate("name slug").lean()

    return product
  }

  static async getProductBySlug(slug: string) {
    await connectToDatabase()

    const product = await Product.findOne({ slug, isActive: true }).populate("categoryId", "name slug").lean()

    return product
  }

  static async createProduct(data: CreateProductInput) {
    await connectToDatabase()

    const slug = generateSlug(data.name)

    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku: data.sku })
    if (existingProduct) {
      throw new Error("Product with this SKU already exists")
    }

    const product = new Product({
      ...data,
      slug,
    })

    await product.save()
    return product.toObject()
  }

  static async updateProduct(id: string, data: UpdateProductInput) {
    await connectToDatabase()

    const updateData: any = { ...data }

    if (data.name) {
      updateData.slug = generateSlug(data.name)
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("categoryId", "name slug")
      .lean()

    return product
  }

  static async deleteProduct(id: string) {
    await connectToDatabase()

    await Product.findByIdAndDelete(id)
    return true
  }


}
