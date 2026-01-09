import prisma from "@financy/db"
import type { CreateCategoryInput } from "@/dtos/input/category.input"

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
}
