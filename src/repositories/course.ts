import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import type { 
  Course, 
  CreateCourseData, 
  UpdateCourseData, 
  CourseFilters, 
  PaginatedCourses, 
  CourseRepository as CourseRepositoryInterface,
  PrismaCourseWithCategory 
} from "@/interfaces/course"
import { generateSlug } from "@/lib/utils"


export class CourseRepository implements CourseRepositoryInterface {
  async findMany(filters: CourseFilters): Promise<PaginatedCourses> {
    const { search, categoryId, page = 1, limit = 10 } = filters
    const skip = (page - 1) * limit

    const where: Prisma.CourseWhereInput = {}

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = { ...data }
    delete updateData.id

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

  private mapToCourse(course: PrismaCourseWithCategory): Course {
    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      description: course.description,
      content: course.content,
      price: Number(course.price),
      image: course.image,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      categoryId: course.categoryId,
      category: course.category,
    }
  }
}

export const createCourseRepository = (): CourseRepositoryInterface => {
  return new CourseRepository()
}
