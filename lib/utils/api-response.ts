import { NextResponse } from "next/server"
import type { ApiResponse } from "@/lib/types/api"

export function successResponse<T>(data: T, message?: string, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status },
  )
}

export function errorResponse(error: string, status = 400): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status },
  )
}

export function validationErrorResponse(errors: any): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: "Validation failed",
      data: errors,
    },
    { status: 422 },
  )
}

export function notFoundResponse(message = "Resource not found"): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 404 },
  )
}

export function unauthorizedResponse(message = "Unauthorized"): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 401 },
  )
}

export function serverErrorResponse(message = "Internal server error"): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 500 },
  )
}
