import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { createCategoryRepository } from "@/repositories/category"
import { CreateUpdateCourseForm } from "@/components/courses/create-update-form"
import { createCategoryService } from "@/services/category"

const categoryRepository = createCategoryRepository()
const categoryService = createCategoryService(categoryRepository)

export default async function CreateCoursePage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/auth/login")
  }

  const categories = await categoryService.getCategories()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Criar Novo Curso</h1>
          </div>
        </div>
      </header>

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <CreateUpdateCourseForm categories={categories} />
      </main>
    </div>
  )
}
