import mongoose, { type Document, Schema } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
  _id: string
  email: string
  name?: string
  password?: string
  phone?: string
  avatar?: string
  role: "customer" | "admin" | "manager"
  isActive: boolean
  emailVerified?: Date
  addresses: Array<{
    type: "shipping" | "billing"
    name: string
    address: string
    city: string
    state: string
    postalCode: string
    country: string
    phone?: string
    isDefault: boolean
  }>
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const AddressSchema = new Schema({
  type: {
    type: String,
    enum: ["shipping", "billing"],
    required: true,
  },
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true, default: "Vietnam" },
  phone: String,
  isDefault: { type: Boolean, default: false },
})

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: String,
    role: {
      type: String,
      enum: ["customer", "admin", "manager"],
      default: "customer",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    emailVerified: Date,
    addresses: [AddressSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password
        return ret
      },
    },
  },
)

// Index for better performance
UserSchema.index({ email: 1 })
UserSchema.index({ role: 1, isActive: 1 })

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12)
  }
  next()
})

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false
  return bcrypt.compare(candidatePassword, this.password)
}

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
