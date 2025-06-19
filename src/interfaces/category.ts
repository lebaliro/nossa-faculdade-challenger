export interface Category {
    id: string
    name: string
    slug: string
    description: string | null
    createdAt: Date
    updatedAt: Date
  }
  
  export interface CategoryRepository {
    getAll(): Promise<Category[]>
  }
  
  export interface CategoryService {
    getCategories(): Promise<Category[]>
  }
  