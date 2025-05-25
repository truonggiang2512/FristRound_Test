import { z } from "zod"

// Common validation schemas
export const ObjectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
})

export const SortQuerySchema = z.object({
  sortBy: z.string().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
})

// Product validation
export const ProductFilterSchema = z.object({
  search: z.string().optional(),
  categoryId: ObjectIdSchema.optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  brand: z.string().optional(),
  tags: z
    .string()
    .transform((val) => val.split(","))
    .optional(),
  isActive: z.coerce.boolean().optional(),
  isFeatured: z.coerce.boolean().optional(),
})

// Order validation
export const OrderStatusSchema = z.enum([
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
])

export const PaymentStatusSchema = z.enum(["pending", "paid", "failed", "refunded"])

// File upload validation
export const ImageUploadSchema = z.object({
  file: z.instanceof(File),
  maxSize: z.number().default(5 * 1024 * 1024), // 5MB
  allowedTypes: z.array(z.string()).default(["image/jpeg", "image/png", "image/webp"]),
})

// Email validation
export const EmailSchema = z.string().email().toLowerCase()

// Phone validation (Vietnamese format)
export const PhoneSchema = z.string().regex(/^(\+84|84|0)[3|5|7|8|9][0-9]{8}$/, "Invalid Vietnamese phone number")

// Password validation
export const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one lowercase, uppercase, and number")
