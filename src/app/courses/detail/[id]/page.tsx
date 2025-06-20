import { notFound } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { PurchaseButton } from "@/components/courses/purchase-button"
import { createCourseService } from "@/services/course"
import { createCourseRepository } from "@/repositories/course"
import { formatPrice } from "@/lib/utils"

interface CoursePageProps {
  params: Promise<{
    id: string
  }>
}

const courseRepository = createCourseRepository()
const courseService = createCourseService(courseRepository)

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await courseService.getCourseById((await params).id)

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <span className="bg-white/40 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {course.category.name}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{course.title}</h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">{course.description}</p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div>
                    <div className="text-4xl font-bold mb-2">{formatPrice(Number(course.price))}</div>
                    <div className="text-blue-200 line-through text-lg">{formatPrice(Number(course.price) * 1.5)}</div>
                  </div>
                  <PurchaseButton courseId={course.id} />
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={course.image || "/placeholder.svg?height=400&width=600"}
                    alt={course.title}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">O que você vai aprender</h2>
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed" style={{ whiteSpace: "pre-line" }}>
                  {course.content}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
