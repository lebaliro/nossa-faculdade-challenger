import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import { CourseImage } from "@/components/courses/site/course-image"
import { Course } from "@/interfaces/course"


interface CourseGridProps {
  courses: Course[]
}

export function CourseGrid({ courses }: CourseGridProps) {
  if (!courses.length) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum curso encontrado</h3>
        <p className="text-gray-600">Tente ajustar os filtros ou buscar por outros termos.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses?.map((course) => (
        <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
          <div className="relative h-48">
            <CourseImage
              src={course.image || "/placeholder.svg?height=300&width=400&text=Curso"}
              alt={course.title}
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {course.category.name}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">{formatPrice(Number(course.price))}</span>
              <Link
                href={`/cursos/${course.slug}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Ver Detalhes
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
