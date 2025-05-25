import type { NextRequest } from "next/server"
import { ProductService } from "@/lib/services/product.service"
import { ProductQuerySchema, CreateProductSchema } from "@/lib/types/api"
import { successResponse, validationErrorResponse, serverErrorResponse } from "@/lib/utils/api-response"
import { requireRole } from "@/lib/middleware/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const queryParams = {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      search: searchParams.get("search") || undefined,
      categoryId: searchParams.get("categoryId") || undefined,
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      brand: searchParams.get("brand") || undefined,
      tags: searchParams.get("tags") ? searchParams.get("tags")!.split(",") : undefined,
      sortBy: (searchParams.get("sortBy") as "name" | "price" | "createdAt" | "ratings.average") || "createdAt",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
      isActive: searchParams.get("isActive") ? searchParams.get("isActive") === "true" : undefined,
      isFeatured: searchParams.get("isFeatured") ? searchParams.get("isFeatured") === "true" : undefined,
    }

    const validatedQuery = ProductQuerySchema.parse(queryParams)
    const result = await ProductService.getProducts(validatedQuery)

    return successResponse(result, "Products retrieved successfully")
  } catch (error) {
    console.error("Error fetching products:", error)
    return serverErrorResponse()
  }
}

export const POST = requireRole(["admin", "manager"])(async (request: NextRequest) => {
  try {
    const body = await request.json()
    const validatedData = CreateProductSchema.parse(body)

    const product = await ProductService.createProduct(validatedData)

    return successResponse(product, "Product created successfully", 201)
  } catch (error: any) {
    if (error.name === "ZodError") {
      return validationErrorResponse(error.errors)
    }

    if (error.message.includes("already exists")) {
      return validationErrorResponse(error.message)
    }

    console.error("Error creating product:", error)
    return serverErrorResponse()
  }
})
