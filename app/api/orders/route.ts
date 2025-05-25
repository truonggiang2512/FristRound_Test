import { OrderService } from "@/lib/services/order.service"
import { CreateOrderSchema } from "@/lib/types/api"
import { successResponse, validationErrorResponse, serverErrorResponse } from "@/lib/utils/api-response"
import { requireAuth, type AuthenticatedRequest } from "@/lib/middleware/auth"

export const GET = requireAuth(async (request: AuthenticatedRequest) => {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 10

    const result = await OrderService.getUserOrders(request.user!.id.toString(), page, limit)

    return successResponse(result, "Orders retrieved successfully")
  } catch (error) {
    console.error("Error fetching orders:", error)
    return serverErrorResponse()
  }
})

export const POST = requireAuth(async (request: AuthenticatedRequest) => {
  try {
    const body = await request.json()
    const validatedData = CreateOrderSchema.parse(body)

    const order = await OrderService.createOrder(request.user!.id.toString(), validatedData)

    return successResponse(order, "Order created successfully", 201)
  } catch (error: any) {
    if (error.name === "ZodError") {
      return validationErrorResponse(error.errors)
    }

    if (error.message.includes("not found") || error.message.includes("Insufficient")) {
      return validationErrorResponse(error.message)
    }

    console.error("Error creating order:", error)
    return serverErrorResponse()
  }
})
