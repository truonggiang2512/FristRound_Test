import { connectToDatabase } from "@/lib/config/database"
import { User } from "@/lib/models"
import type { CreateUserInput, UpdateUserInput, AddressInput } from "@/lib/types/api"

export class UserService {
  static async createUser(data: CreateUserInput) {
    await connectToDatabase()

    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email })
    if (existingUser) {
      throw new Error("User with this email already exists")
    }

    const user = new User(data)
    await user.save()

    return user.toObject()
  }

  static async getUserById(id: string) {
    await connectToDatabase()

    const user = await User.findById(id).select("-password").lean()
    return user
  }

  static async getUserByEmail(email: string) {
    await connectToDatabase()

    const user = await User.findOne({ email }).lean()
    return user
  }

  static async updateUser(id: string, data: UpdateUserInput) {
    await connectToDatabase()

    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .select("-password")
      .lean()

    return user
  }

  static async verifyPassword(email: string, password: string) {
    await connectToDatabase()

    const user = await User.findOne({ email, isActive: true })
    if (!user) return null

    const isValid = await user.comparePassword(password)
    if (!isValid) return null

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    }
  }

  static async addAddress(userId: string, address: AddressInput) {
    await connectToDatabase()

    // If this is the default address, unset other default addresses
    if (address.isDefault) {
      await User.updateOne({ _id: userId }, { $set: { "addresses.$[].isDefault": false } })
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: address } },
      { new: true, runValidators: true },
    )
      .select("-password")
      .lean()

    return user
  }

  static async updateAddress(userId: string, addressId: string, address: Partial<AddressInput>) {
    await connectToDatabase()

    // If this is being set as default, unset other default addresses
    if (address.isDefault) {
      await User.updateOne({ _id: userId }, { $set: { "addresses.$[].isDefault": false } })
    }

    const user = await User.findOneAndUpdate(
      { _id: userId, "addresses._id": addressId },
      { $set: { "addresses.$": { ...address, _id: addressId } } },
      { new: true, runValidators: true },
    )
      .select("-password")
      .lean()

    return user
  }

  static async deleteAddress(userId: string, addressId: string) {
    await connectToDatabase()

    const user = await User.findByIdAndUpdate(userId, { $pull: { addresses: { _id: addressId } } }, { new: true })
      .select("-password")
      .lean()

    return user
  }
}
