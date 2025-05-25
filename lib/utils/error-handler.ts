import type { NextRequest } from "next/server"
import { ZodError } from "zod"
import mongoose from "mongoose"

export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export function handleError(error: any) {
  console.error("Error:", error)

  // Zod validation errors
  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      message: "Validation failed",
      errors: error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    }
  }

  // Mongoose validation errors
  if (error instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(error.errors).map((err: any) => ({
      field: err.path,
      message: err.message,
    }))

    return {
      statusCode: 400,
      message: "Validation failed",
      errors,
    }
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0]
    return {
      statusCode: 409,
      message: `${field} already exists`,
    }
  }

  // Mongoose cast error (invalid ObjectId)
  if (error instanceof mongoose.Error.CastError) {
    return {
      statusCode: 400,
      message: "Invalid ID format",
    }
  }

  // Application errors
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
    }
  }

  // Default error
  return {
    statusCode: 500,
    message: "Internal server error",
  }
}

export function asyncHandler(fn: Function) {
  return async (request: NextRequest, context: any) => {
    try {
      return await fn(request, context)
    } catch (error) {
      const { statusCode, message, errors } = handleError(error)

      return Response.json(
        {
          success: false,
          error: message,
          ...(errors && { errors }),
        },
        { status: statusCode },
      )
    }
  }
}
