import { ICategory, IProduct, IOrder, IUser } from '@/lib/models';
import { z } from "zod"

// Common response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// User types
export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
  phone: z.string().optional(),
})

export const UpdateUserSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
})

export const AddressSchema = z.object({
  type: z.enum(["shipping", "billing"]),
  name: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().default("Vietnam"),
  phone: z.string().optional(),
  isDefault: z.boolean().default(false),
})

export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
export type AddressInput = z.infer<typeof AddressSchema>

// Product types
export const CreateProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  sku: z.string().min(1),
  price: z.number().positive(),
  comparePrice: z.number().positive().optional(),
  costPrice: z.number().positive().optional(),
  stock: z.number().int().min(0),
  categoryId: z.string(),
  brand: z.string().optional(),
  images: z.array(z.string()).optional(),
  weight: z.number().positive().optional(),
  dimensions: z
    .object({
      length: z.number().positive(),
      width: z.number().positive(),
      height: z.number().positive(),
      unit: z.enum(["cm", "inch"]).default("cm"),
    })
    .optional(),
  attributes: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
})

export const UpdateProductSchema = CreateProductSchema.partial()

export type CreateProductInput = z.infer<typeof CreateProductSchema>
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>

// Category types
export const CreateCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().optional(),
  sortOrder: z.number().int().default(0),
})

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>

// Order types
export const CreateOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
    }),
  ),
  shippingAddress: z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string().default("Vietnam"),
    phone: z.string().optional(),
  }),
  billingAddress: z
    .object({
      name: z.string(),
      address: z.string(),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
      country: z.string().default("Vietnam"),
      phone: z.string().optional(),
    })
    .optional(),
  paymentMethod: z.string(),
  notes: z.string().optional(),
})

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>

// Query parameters
export const PaginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
})

export const ProductQuerySchema = PaginationSchema.extend({
  search: z.string().optional(),
  categoryId: z.string().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  brand: z.string().optional(),
  tags: z.array(z.string()).optional(),
  sortBy: z.enum(["name", "price", "createdAt", "ratings.average"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
})

export type ProductQuery = z.infer<typeof ProductQuerySchema>

// Export model types
export type { IUser, IProduct, ICategory, IOrder }
