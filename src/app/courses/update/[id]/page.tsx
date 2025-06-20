import { notFound } from "next/navigation"
import { CreateUpdateCourseForm } from "@/components/courses/create-update-form"
import { createCourseService } from "@/services/course"
import { createCourseRepository } from "@/repositories/course"
import { createCategoryService } from "@/services/category"
import { createCategoryRepository } from "@/repositories/category"

interface EditCoursesProps {
  params: Promise<{id: string}>
}

const courseRepository = createCourseRepository()
const courseService = createCourseService(courseRepository)
const categoryRepository = createCategoryRepository()
const categoryService = createCategoryService(categoryRepository)

export default async function EditCoursePage({ params }: EditCoursesProps) {
  const [course, categories] = await Promise.all([
    courseService.getCourseById((await params).id),
    categoryService.getCategories()
  ])

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Editar Curso: {course.title}</h1>
          </div>
        </div>
      </header>

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <CreateUpdateCourseForm
          categories={categories}
          initialData={{
            title: course.title,
            description: course.description,
            content: course.content,
            price: course.price.toString(),
            image: course.image || "",
            categoryId: course.categoryId,
          }}
          isEditing={true}
          courseId={course.id}
        />
      </main>
    </div>
  )
}
