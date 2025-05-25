import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import { env } from "@/lib/config/env"
import { UserService } from "@/lib/services/user.service"

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: number
    email: string
    role: string
  }
}

export async function authenticateToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as any
    const userData = await UserService.getUserById(decoded.userId)

    // Handle case where userData could be an array
    const user = Array.isArray(userData) ? userData[0] : userData

    if (!user) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    }
  } catch (error) {
    return null
  }
}

export function requireAuth(handler: Function) {
  return async (request: NextRequest, context: any) => {
    const user = await authenticateToken(request)

    if (!user) {
      return Response.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }
    // Add user to request object
    ; (request as AuthenticatedRequest).user = user

    return handler(request, context)
  }
}

export function requireRole(roles: string[]) {
  return (handler: Function) => async (request: NextRequest, context: any) => {
    const user = await authenticateToken(request)

    if (!user) {
      return Response.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    if (!roles.includes(user.role)) {
      return Response.json({ success: false, error: "Forbidden" }, { status: 403 })
    }
    ; (request as AuthenticatedRequest).user = user
    return handler(request, context)
  }
}
