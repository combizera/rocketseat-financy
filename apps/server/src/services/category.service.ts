import prisma from "@financy/db"
import type { CreateCategoryInput, UpdateCategoryInput } from "@/dtos/input/category.input"

export class CategoryService {
  async createCategory(data: CreateCategoryInput, userId: string) {
    return prisma.category.create({
      data: {
        name: data.name,
        description: data?.description,
        icon: data.icon,
        color: data.color,
        userId: userId,
      },
    })
  }

  async getCategoryById(id: string) {
    return prisma.category.findUnique({
      where: { 
        id
      },
    })
  }

  async listCategories(userId: string) {
    return prisma.category.findMany({
      where: {
        userId: userId,
      }
    })
  }

  async updateCategory(id: string, data: UpdateCategoryInput) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      }
    })

    if (!category) throw new Error("Category not found")

    return prisma.category.update({
      where: {
        id,
      }, 
      data: {
        name: data.name,
        description: data.description,
        icon: data.icon,
        color: data.color,
      }
    })
  }

  async deleteCategory(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      }
    })

    if (!category) throw new Error("Category not found")

    return prisma.category.delete({
      where: {
        id,
      }
    })
  }
}