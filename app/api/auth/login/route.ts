import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import { z } from "zod"
import { UserService } from "@/lib/services/user.service"
import { env } from "@/lib/config/env"
import { successResponse, errorResponse, validationErrorResponse, serverErrorResponse } from "@/lib/utils/api-response"

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = LoginSchema.parse(body)

    const user = await UserService.verifyPassword(email, password)

    if (!user) {
      return errorResponse("Invalid email or password", 401)
    }

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, env.JWT_SECRET, { expiresIn: "7d" })

    return successResponse(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
      "Login successful",
    )
  } catch (error: any) {
    if (error.name === "ZodError") {
      return validationErrorResponse(error.errors)
    }

    console.error("Error during login:", error)
    return serverErrorResponse()
  }
}
