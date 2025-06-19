import { prisma } from "@/lib/prisma"
import type { Category, CategoryRepository as CategoryRepositoryInterface } from "@/interfaces/category"

export class CategoryRepository implements CategoryRepositoryInterface {
  async getAll(): Promise<Category[]> {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
      })
      return categories.map(this.mapToCategory)
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
      throw new Error("Falha ao buscar categorias")
    }
  }

  private mapToCategory(prismaCategory: any): Category {
    return {
      id: prismaCategory.id,
      name: prismaCategory.name,
      slug: prismaCategory.slug,
      description: prismaCategory.description,
      createdAt: prismaCategory.createdAt,
      updatedAt: prismaCategory.updatedAt,
    }
  }
}

export const createCategoryRepository = (): CategoryRepository => {
  return new CategoryRepository()
}
