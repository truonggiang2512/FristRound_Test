import { connectToDatabase } from "@/lib/config/database"
import { Category } from "@/lib/models"
import type { CreateCategoryInput } from "@/lib/types/api"
import { generateSlug } from "@/lib/utils/slug"

export class CategoryService {
  static async getCategories(parentId?: string) {
    await connectToDatabase()

    const filter = parentId ? { parentId } : { parentId: null }

    const categories = await Category.find(filter)
      .populate("children", "name slug image")
      .sort({ sortOrder: 1, name: 1 })
      .lean()

    return categories
  }

  static async getCategoryById(id: string) {
    await connectToDatabase()

    const category = await Category.findById(id)
      .populate("parent", "name slug")
      .populate("children", "name slug image")
      .lean()

    return category
  }

  static async getCategoryBySlug(slug: string) {
    await connectToDatabase()

    const category = await Category.findOne({ slug, isActive: true })
      .populate("parent", "name slug")
      .populate("children", "name slug image")
      .lean()

    return category
  }

  static async createCategory(data: CreateCategoryInput) {
    await connectToDatabase()

    const slug = generateSlug(data.name)

    // Check if slug already exists
    const existingCategory = await Category.findOne({ slug })
    if (existingCategory) {
      throw new Error("Category with this name already exists")
    }

    const category = new Category({
      ...data,
      slug,
    })

    await category.save()

    // If this category has a parent, add it to parent's children array
    if (data.parentId) {
      await Category.findByIdAndUpdate(data.parentId, {
        $addToSet: { children: category._id },
      })
    }

    return category.toObject()
  }

  static async updateCategory(id: string, data: Partial<CreateCategoryInput>) {
    await connectToDatabase()

    const updateData: any = { ...data }

    if (data.name) {
      updateData.slug = generateSlug(data.name)
    }

    const category = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).lean()

    return category
  }

  static async deleteCategory(id: string) {
    await connectToDatabase()

    // Check if category has children
    const hasChildren = await Category.findOne({ parentId: id })
    if (hasChildren) {
      throw new Error("Cannot delete category with subcategories")
    }

    // Remove from parent's children array
    const category = await Category.findById(id)
    if (category?.parentId) {
      await Category.findByIdAndUpdate(category.parentId, {
        $pull: { children: id },
      })
    }

    await Category.findByIdAndDelete(id)
    return true
  }

  static async getCategoryTree() {
    await connectToDatabase()

    const categories = await Category.find({ isActive: true })
      .populate("children", "name slug image")
      .sort({ sortOrder: 1, name: 1 })
      .lean() as unknown as (CategoryTreeNode & { _id: { toString(): string } })[]

    // Build tree structure
    const categoryMap = new Map()
    interface CategoryTreeNode {
      _id: string;
      name: string;
      slug: string;
      image?: string;
      parentId?: string | null;
      isActive: boolean;
      sortOrder?: number;
      children: CategoryTreeNode[];
      [key: string]: any; // For other properties
    }

    const rootCategories: CategoryTreeNode[] = []

    // First pass: create map of all categories
    categories.forEach((category) => {
      categoryMap.set(category._id.toString(), { ...category, children: [] })
    })

    // Second pass: build tree
    categories.forEach((category) => {
      if (category.parentId) {
        const parent = categoryMap.get(category.parentId.toString())
        if (parent) {
          parent.children.push(categoryMap.get(category._id.toString()))
        }
      } else {
        rootCategories.push(categoryMap.get(category._id.toString()))
      }
    })

    return rootCategories
  }
}
