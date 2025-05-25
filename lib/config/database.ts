import mongoose from "mongoose"

// Define mongoose cache interface
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Add mongoose to global namespace
declare global {
  var mongoose: MongooseCache | undefined;
}

// MongoDB connection configuration
const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

// Global mongoose connection cache
let cached: MongooseCache = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB connected successfully")
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error(" MongoDB connection failed:", e)
    throw e
  }

  return cached.conn
}

// Test database connection
export async function testConnection() {
  try {
    await connectToDatabase()
    return true
  } catch (error) {
    console.error(" Database connection test failed:", error)
    return false
  }
}

// Graceful shutdown
export async function disconnectFromDatabase() {
  if (cached.conn) {
    await mongoose.disconnect()
    cached.conn = null
    cached.promise = null
    console.log("MongoDB disconnected")
  }
}
