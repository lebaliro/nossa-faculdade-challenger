export interface Course {
    id: string
    title: string
    slug: string
    description: string
    content: string
    price: number
    image: string | null
    createdAt: Date
    updatedAt: Date
    categoryId: string
    category: {
      id: string
      name: string
      slug: string
    }
  }
  
  export interface CreateCourseData {
    title: string
    description: string
    content: string
    price: number
    image?: string
    categoryId: string
  }
  
  export interface UpdateCourseData extends Partial<CreateCourseData> {
    id: string
  }
  
  export interface CourseFilters {
    search?: string
    categoryId?: string
    page?: number
    limit?: number
  }
  
  export interface PaginatedCourses {
    courses: Course[]
    total: number
    page: number
    limit: number
    totalPages: number
  }

  export interface CourseService {
    getCourses(filters: CourseFilters): Promise<PaginatedCourses>
    getCourseById(id: string): Promise<Course | null>
    createCourse(data: CreateCourseData): Promise<Course>
    updateCourse(data: UpdateCourseData): Promise<Course>
    deleteCourse(id: string): Promise<void>
  }

  export interface CourseRepository {
    findMany(filters: CourseFilters): Promise<PaginatedCourses>
    findById(id: string): Promise<Course | null>
    create(data: CreateCourseData): Promise<Course>
    update(data: UpdateCourseData): Promise<Course>
    delete(id: string): Promise<void>
  }