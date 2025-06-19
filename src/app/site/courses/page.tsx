import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { CourseFilters } from "@/components/courses/site/course-filters"
import { CourseGrid } from "@/components/courses/site/course-grid"
import { createCourseService } from "@/services/course"
import { createCourseRepository } from "@/repositories/course"
import { createCategoryService } from "@/services/category"
import { createCategoryRepository } from "@/repositories/category"

const courseRepository = createCourseRepository()
const courseService = createCourseService(courseRepository)
const categoryRepository = createCategoryRepository()
const categoryService = createCategoryService(categoryRepository)

export interface SearchParams {
  category?: string
  search?: string
  page?: string
}

export interface CoursesPageProps {
  searchParams: SearchParams
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  try {
    const categories = await categoryService.getCategories()
    
    const page = Number.parseInt(searchParams.page || "1")
    const search = searchParams.search || ""
    const categorySlug = searchParams.category || ""

    let categoryId = ""
    let currentCategory = undefined
    if (categorySlug) {
      const category = categories.find((cat) => cat.slug === categorySlug)
      categoryId = category?.id || ""
      currentCategory = category
    }

    const coursesResult = await courseService.getCourses({
      search: search || undefined,
      categoryId: categoryId || undefined,
      page,
      limit: 12,
    })

    const currentFilters = {
      search,
      categorySlug,
      page,
    }

    const buildPaginationUrl = (pageNum: number) => {
      const params = new URLSearchParams()

      if (search) params.set("search", search)
      if (categorySlug) params.set("category", categorySlug)
      if (pageNum > 1) params.set("page", pageNum.toString())

      const queryString = params.toString()
      return `/site/courses${queryString ? `?${queryString}` : ""}`
    }

    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <div className="bg-gray-50 min-h-screen">
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Todos os Cursos
                  </h1>
                  <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                    Encontre o curso perfeito para impulsionar sua carreira profissional
                  </p>
                </div>
              </div>
            </section>

            <section className="py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <CourseFilters categories={categories} currentFilters={currentFilters} />

                <div className="flex justify-between items-center mb-6 mt-8">
                  <div>
                    <p className="text-gray-600 mt-1">
                      {coursesResult.total} {coursesResult.total === 1 ? "curso encontrado" : "cursos encontrados"}
                    </p>
                  </div>
                </div>

                <CourseGrid courses={coursesResult.courses} />

                {coursesResult.totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      {page > 1 && (
                        <a
                          href={buildPaginationUrl(page - 1)}
                          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Anterior
                        </a>
                      )}

                      {Array.from({ length: coursesResult.totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <a
                          key={pageNum}
                          href={buildPaginationUrl(pageNum)}
                          className={`px-3 py-2 text-sm font-medium rounded-md ${pageNum === page
                              ? "text-white bg-blue-600 border border-blue-600"
                              : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                          {pageNum}
                        </a>
                      ))}

                      {page < coursesResult.totalPages && (
                        <a
                          href={buildPaginationUrl(page + 1)}
                          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Próxima
                        </a>
                      )}
                    </nav>
                  </div>
                )}

                {coursesResult.courses.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum curso encontrado</h3>
                    <p className="text-gray-600 mb-4">Tente ajustar os filtros ou fazer uma nova busca.</p>
                    <a
                      href="/site/courses"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Ver todos os cursos
                    </a>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error("Erro ao carregar página de cursos:", error)

    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Erro ao carregar cursos</h1>
            <p className="text-gray-600 mb-8">Ocorreu um erro ao carregar os cursos. Tente novamente mais tarde.</p>
            <a href="/site/courses" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Tentar novamente
            </a>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}
