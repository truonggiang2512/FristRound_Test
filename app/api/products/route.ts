import { connectToDatabase } from "@/lib/config/database"
import { Product } from "@/lib/models"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const skip = (page - 1) * limit

    const filters: any = {}
    const sort: any = {}

    const featured = searchParams.get("featured")
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const sortParam = searchParams.get("sort")

    // Filters
    if (featured === "true") filters.isFeatured = true
    if (category) filters.categoryId = category
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ]
    }

    // Sort
    if (sortParam === "price_asc") sort.price = 1
    else if (sortParam === "price_desc") sort.price = -1
    else if (sortParam === "newest") sort.createdAt = -1
    else sort.createdAt = -1 // default sort

    // Fetch total before pagination
    const total = await Product.countDocuments(filters)

    // Fetch products
    const products = await Product.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()

    return NextResponse.json({
      success: true,
      data: products,
      total,
      page,
      limit,
    })
  } catch (error) {
    console.error("GET /api/products error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()
    const body = await request.json()

    const newProduct = await Product.create(body)

    return NextResponse.json({ success: true, data: newProduct })
  } catch (error) {
    console.error("POST /api/products error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    )
  }
}
