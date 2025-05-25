import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  MONGODB_URI: z.string().min(1, "MongoDB URI is required"),
  NEXTAUTH_SECRET: z.string().min(1, "NextAuth secret is required"),
  NEXTAUTH_URL: z.string().url().optional(),
  JWT_SECRET: z.string().min(1, "JWT secret is required"),
})

export const env = envSchema.parse(process.env)

export function validateEnv() {
  try {
    envSchema.parse(process.env)
    console.log(" Environment variables validated")
    return true
  } catch (error) {
    console.error(" Environment validation failed:", error)
    return false
  }
}
