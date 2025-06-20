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

  private mapToCategory(category: Category): Category {
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }
  }
}

export const createCategoryRepository = (): CategoryRepository => {
  return new CategoryRepository()
}
