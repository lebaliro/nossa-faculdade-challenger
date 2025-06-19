import type { CategoryRepository, Category, CategoryService as CategoryServiceInterface } from "@/interfaces/category"

export class CategoryService implements CategoryServiceInterface {
    constructor(private categoryRepository: CategoryRepository) { }

    async getCategories(): Promise<Category[]> {
        try {
            return await this.categoryRepository.getAll()
        } catch (error) {
            console.error("Erro no serviço de categorias:", error)
            throw error
        }
    }
}

export const createCategoryService = (categoryRepository: CategoryRepository): CategoryService => {
    return new CategoryService(categoryRepository)
}
