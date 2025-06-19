import type {
  Course,
  CreateCourseData,
  UpdateCourseData,
  CourseFilters,
  PaginatedCourses,
  CourseService as CourseServiceInterface,
  CourseRepository
} from "@/interfaces/course"


export class CourseService implements CourseServiceInterface {
  constructor(private courseRepository: CourseRepository) { }

  async getCourses(filters: CourseFilters): Promise<PaginatedCourses> {
    return this.courseRepository.findMany(filters)
  }

  async getCourseById(id: string): Promise<Course | null> {
    if (!id) {
      throw new Error("ID do curso é obrigatório")
    }

    return this.courseRepository.findById(id)
  }

  async createCourse(data: CreateCourseData): Promise<Course> {
    if (!data.title || !data.description || !data.categoryId) {
      throw new Error("Título, descrição e categoria são obrigatórios")
    }

    if (data.price < 0) {
      throw new Error("Preço deve ser maior ou igual a zero")
    }

    return this.courseRepository.create(data)
  }

  async updateCourse(data: UpdateCourseData): Promise<Course> {
    if (!data.id) {
      throw new Error("ID do curso é obrigatório")
    }

    const existingCourse = await this.courseRepository.findById(data.id)
    if (!existingCourse) {
      throw new Error("Curso não encontrado")
    }

    if (data.price !== undefined && data.price < 0) {
      throw new Error("Preço deve ser maior ou igual a zero")
    }

    return this.courseRepository.update(data)
  }

  async deleteCourse(id: string): Promise<void> {
    if (!id) {
      throw new Error("ID do curso é obrigatório")
    }

    const existingCourse = await this.courseRepository.findById(id)
    if (!existingCourse) {
      throw new Error("Curso não encontrado")
    }

    await this.courseRepository.delete(id)
  }
}

export const createCourseService = (courseRepository: CourseRepository): CourseService => {
  return new CourseService(courseRepository)
}
