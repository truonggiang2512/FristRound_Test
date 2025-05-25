import mongoose, { type Document, Schema } from "mongoose"

export interface IOrderItem {
  productId: mongoose.Types.ObjectId
  name: string
  sku: string
  price: number
  quantity: number
  total: number
  image?: string
}

export interface IOrder extends Document {
  _id: string
  orderNumber: string
  userId: mongoose.Types.ObjectId
  items: IOrderItem[]
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: string
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  paymentMethod?: string
  paymentId?: string
  shippingAddress: {
    name: string
    address: string
    city: string
    state: string
    postalCode: string
    country: string
    phone?: string
  }
  billingAddress?: {
    name: string
    address: string
    city: string
    state: string
    postalCode: string
    country: string
    phone?: string
  }
  notes?: string
  trackingNumber?: string
  estimatedDelivery?: Date
  deliveredAt?: Date
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  image: String,
})

const AddressSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true, default: "Vietnam" },
  phone: String,
})

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [OrderItemSchema],
    status: {
      type: String,
      enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"],
      default: "pending",
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    shipping: {
      type: Number,
      default: 0,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "VND",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: String,
    paymentId: String,
    shippingAddress: {
      type: AddressSchema,
      required: true,
    },
    billingAddress: AddressSchema,
    notes: String,
    trackingNumber: String,
    estimatedDelivery: Date,
    deliveredAt: Date,
  },
  {
    timestamps: true,
  },
)

// Indexes
OrderSchema.index({ orderNumber: 1 })
OrderSchema.index({ userId: 1, createdAt: -1 })
OrderSchema.index({ status: 1 })
OrderSchema.index({ paymentStatus: 1 })
OrderSchema.index({ createdAt: -1 })

// Pre-save middleware to generate order number
OrderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model("Order").countDocuments()
    this.orderNumber = `ORD-${Date.now()}-${(count + 1).toString().padStart(4, "0")}`
  }
  next()
})

export const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema)
