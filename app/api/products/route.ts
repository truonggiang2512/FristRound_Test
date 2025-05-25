import { connectToDatabase } from "@/lib/config/database"
import { Product } from "@/lib/models"
import { NextRequest, NextResponse } from "next/server"

// GET /api/products
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const filters: any = {}

    const featured = searchParams.get("featured")
    const search = searchParams.get("search")
    const category = searchParams.get("category")

    if (featured === "true") filters.featured = true
    if (category) filters.category = category

    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ]
    }

    const products = await Product.find(filters).lean()

    return NextResponse.json({ success: true, data: products })
  } catch (error) {
    console.error("GET /api/products error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()
    const body = await request.json()

    const newProduct = await Product.create(body)

    return NextResponse.json({ success: true, data: newProduct })
  } catch (error) {
    console.error("POST /api/products error:", error)
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 })
  }
}
