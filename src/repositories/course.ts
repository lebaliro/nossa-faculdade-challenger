import { prisma } from "@/lib/prisma"
import type { Course, CreateCourseData, UpdateCourseData, CourseFilters, PaginatedCourses, CourseRepository as CourseRepositoryInterface } from "@/interfaces/course"
import { generateSlug } from "@/lib/utils"


export class PrismaCourseRepository implements CourseRepositoryInterface {
  async findMany(filters: CourseFilters): Promise<PaginatedCourses> {
    const { search, categoryId, page = 1, limit = 10 } = filters
    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.course.count({ where }),
    ])

    return {
      courses: courses.map(this.mapToCourse),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findById(id: string): Promise<Course | null> {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    return course ? this.mapToCourse(course) : null
  }

  async create(data: CreateCourseData): Promise<Course> {
    const slug = generateSlug(data.title)

    const course = await prisma.course.create({
      data: {
        ...data,
        slug,
        price: data.price,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    return this.mapToCourse(course)
  }

  async update(data: UpdateCourseData): Promise<Course> {
    const updateData: any = { ...data }
    delete updateData.id

    // Gerar novo slug se título mudou
    if (data.title) {
      updateData.slug = generateSlug(data.title)
    }

    const course = await prisma.course.update({
      where: { id: data.id },
      data: updateData,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    return this.mapToCourse(course)
  }

  async delete(id: string): Promise<void> {
    await prisma.course.delete({
      where: { id },
    })
  }

  private mapToCourse(prismaCourse: any): Course {
    return {
      id: prismaCourse.id,
      title: prismaCourse.title,
      slug: prismaCourse.slug,
      description: prismaCourse.description,
      content: prismaCourse.content,
      price: Number(prismaCourse.price),
      image: prismaCourse.image,
      createdAt: prismaCourse.createdAt,
      updatedAt: prismaCourse.updatedAt,
      categoryId: prismaCourse.categoryId,
      category: prismaCourse.category,
    }
  }
}

export const createCourseRepository = (): CourseRepository => {
  return new PrismaCourseRepository()
}
