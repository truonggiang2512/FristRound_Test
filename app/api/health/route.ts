import { testConnection } from "@/lib/config/database"
import { successResponse, serverErrorResponse } from "@/lib/utils/api-response"

export async function GET() {
  try {
    const dbConnected = await testConnection()

    const health = {
      status: "ok",
      timestamp: new Date().toISOString(),
      services: {
        database: dbConnected ? "connected" : "disconnected",
      },
      environment: process.env.NODE_ENV,
    }

    return successResponse(health, "Health check successful")
  } catch (error) {
    console.error("Health check failed:", error)
    return serverErrorResponse("Health check failed")
  }
}
