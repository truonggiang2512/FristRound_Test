import type { NextRequest } from "next/server"
import { CategoryService } from "@/lib/services/category.service"
import { CreateCategorySchema } from "@/lib/types/api"
import { successResponse, validationErrorResponse, serverErrorResponse } from "@/lib/utils/api-response"
import { requireRole } from "@/lib/middleware/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const parentId = searchParams.get("parentId") || undefined
    const tree = searchParams.get("tree") === "true"

    let categories
    if (tree) {
      categories = await CategoryService.getCategoryTree()
    } else {
      categories = await CategoryService.getCategories(parentId)
    }

    return successResponse(categories, "Categories retrieved successfully")
  } catch (error) {
    console.error("Error fetching categories:", error)
    return serverErrorResponse()
  }
}

export const POST = requireRole(["admin", "manager"])(async (request: NextRequest) => {
  try {
    const body = await request.json()
    const validatedData = CreateCategorySchema.parse(body)

    const category = await CategoryService.createCategory(validatedData)

    return successResponse(category, "Category created successfully", 201)
  } catch (error: any) {
    if (error.name === "ZodError") {
      return validationErrorResponse(error.errors)
    }

    if (error.message.includes("already exists")) {
      return validationErrorResponse(error.message)
    }

    console.error("Error creating category:", error)
    return serverErrorResponse()
  }
})
