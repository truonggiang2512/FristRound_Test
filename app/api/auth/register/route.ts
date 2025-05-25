import type { NextRequest } from "next/server"
import { UserService } from "@/lib/services/user.service"
import { CreateUserSchema } from "@/lib/types/api"
import { successResponse, errorResponse, validationErrorResponse, serverErrorResponse } from "@/lib/utils/api-response"
import { logger } from "@/lib/utils/logger"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input data
    const validatedData = CreateUserSchema.parse(body)

    // Check if user already exists
    const existingUser = await UserService.getUserByEmail(validatedData.email)
    if (existingUser) {
      logger.warn("Registration attempt with existing email", { email: validatedData.email })
      return errorResponse("User with this email already exists", 409)
    }

    // Create new user
    const user = await UserService.createUser(validatedData)

    logger.info("New user registered", { userId: user._id, email: user.email })

    // Return user data without password
    const { password, ...userWithoutPassword } = user

    return successResponse(
      userWithoutPassword,
      "User registered successfully. Please check your email for verification.",
      201,
    )
  } catch (error: any) {
    if (error.name === "ZodError") {
      logger.warn("Registration validation failed", { errors: error.errors })
      return validationErrorResponse(error.errors)
    }

    logger.error("Registration error", { error: error.message, stack: error.stack })
    return serverErrorResponse("Registration failed. Please try again.")
  }
}
