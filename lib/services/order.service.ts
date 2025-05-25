import { connectToDatabase } from "@/lib/config/database"
import { Order, Product } from "@/lib/models"
import { ProductService } from "./product.service"
import type { CreateOrderInput } from "@/lib/types/api"

export class OrderService {
  static async createOrder(userId: string, data: CreateOrderInput) {
    await connectToDatabase()

    // Validate products and calculate totals
    const orderItems = []
    let subtotal = 0

    for (const item of data.items) {
      const product = await Product.findById(item.productId)
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`)
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`)
      }

      const itemTotal = product.price * item.quantity

      orderItems.push({
        productId: product._id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        quantity: item.quantity,
        total: itemTotal,
        image: product.images?.[0],
      })

      subtotal += itemTotal
    }

    // Calculate tax and shipping (you can customize this logic)
    const tax = subtotal * 0.1 // 10% tax
    const shipping = subtotal > 1000000 ? 0 : 50000 // Free shipping over 1M VND
    const total = subtotal + tax + shipping

    // Create order
    const order = new Order({
      userId,
      items: orderItems,
      subtotal,
      tax,
      shipping,
      total,
      shippingAddress: data.shippingAddress,
      billingAddress: data.billingAddress || data.shippingAddress,
      paymentMethod: data.paymentMethod,
      notes: data.notes,
    })

    await order.save()

    // Update product stock
    for (const item of data.items) {
      await ProductService.updateStock(item.productId, item.quantity)
    }

    return order.toObject()
  }

  static async getOrderById(id: string) {
    await connectToDatabase()

    const order = await Order.findById(id)
      .populate("userId", "name email phone")
      .populate("items.productId", "name slug images")
      .lean()

    return order
  }

  static async getUserOrders(userId: string, page = 1, limit = 10) {
    await connectToDatabase()

    const skip = (page - 1) * limit

    const [orders, total] = await Promise.all([
      Order.find({ userId })
        .populate("items.productId", "name slug images")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments({ userId }),
    ])

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    }
  }

  static async updateOrderStatus(id: string, status: string) {
    await connectToDatabase()

    const order = await Order.findByIdAndUpdate(
      id,
      { status, ...(status === "delivered" && { deliveredAt: new Date() }) },
      { new: true, runValidators: true },
    ).lean()

    return order
  }

  static async updatePaymentStatus(id: string, paymentStatus: string, paymentId?: string) {
    await connectToDatabase()

    const updateData: any = { paymentStatus }
    if (paymentId) updateData.paymentId = paymentId

    const order = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).lean()

    return order
  }

  static async getOrderStats(userId?: string) {
    await connectToDatabase()

    const matchStage = userId ? { userId } : {}

    const stats = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$total" },
          averageOrderValue: { $avg: "$total" },
          statusBreakdown: {
            $push: "$status",
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalOrders: 1,
          totalRevenue: 1,
          averageOrderValue: 1,
          statusBreakdown: 1,
        },
      },
    ])

    return stats[0] || { totalOrders: 0, totalRevenue: 0, averageOrderValue: 0, statusBreakdown: [] }
  }
}
