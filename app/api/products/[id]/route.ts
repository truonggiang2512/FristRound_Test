import type { NextRequest } from "next/server"
import { ProductService } from "@/lib/services/product.service"
import { UpdateProductSchema } from "@/lib/types/api"
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  validationErrorResponse,
  serverErrorResponse,
} from "@/lib/utils/api-response"
import { requireRole } from "@/lib/middleware/auth"
import mongoose from "mongoose"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse("Invalid product ID")
    }

    const product = await ProductService.getProductById(id)

    if (!product) {
      return notFoundResponse("Product not found")
    }

    return successResponse(product, "Product retrieved successfully")
  } catch (error) {
    console.error("Error fetching product:", error)
    return serverErrorResponse()
  }
}

export const PUT = requireRole(["admin", "manager"])(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const { id } = params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return errorResponse("Invalid product ID")
      }

      const body = await request.json()
      const validatedData = UpdateProductSchema.parse(body)

      const product = await ProductService.updateProduct(id, validatedData)

      if (!product) {
        return notFoundResponse("Product not found")
      }

      return successResponse(product, "Product updated successfully")
    } catch (error: any) {
      if (error.name === "ZodError") {
        return validationErrorResponse(error.errors)
      }

      console.error("Error updating product:", error)
      return serverErrorResponse()
    }
  },
)

export const DELETE = requireRole(["admin"])(async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse("Invalid product ID")
    }

    await ProductService.deleteProduct(id)

    return successResponse(null, "Product deleted successfully")
  } catch (error) {
    console.error("Error deleting product:", error)
    return serverErrorResponse()
  }
})
