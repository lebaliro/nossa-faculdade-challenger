import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { formatPrice } from "@/lib/utils"


export async function FeaturedCoursesSection() {
  const featuredCourses = await prisma.course.findMany({
    where: {
      featured: true,
      published: true,
    },
    include: {
      category: true,
    },
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cursos Mais Populares</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra os cursos que estão transformando carreiras e impulsionando profissionais para o sucesso
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <div className="relative h-48">
                <Image
                  src={course.image || "/placeholder.svg?height=300&width=400"}
                  alt={course.title}
                  fill
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
                    href={`/courses/detail/${course.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/cursos"
            className="bg-gray-900 text-white font-bold py-4 px-8 rounded-lg hover:bg-gray-800 transition-colors text-lg"
          >
            Ver Todos os Cursos
          </Link>
        </div>
      </div>
    </section>
  )
}
