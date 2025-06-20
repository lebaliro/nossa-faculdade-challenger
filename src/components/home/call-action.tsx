import Link from "next/link"
import Image from "next/image"


export function CallActionSection() {
  return (
    <section className="hero-gradient text-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transforme sua
              <span className="block text-yellow-300">Carreira Hoje</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Aprenda com os melhores profissionais do mercado e conquiste a carreira dos seus sonhos com nossos cursos
              online.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link
                href="/site/courses"
                className="bg-yellow-400 text-gray-900 font-bold py-4 px-8 rounded-lg hover:bg-yellow-300 transition-colors text-lg"
              >
                Ver Todos os Cursos
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px]">
              <Image
                src="/imgs/first-image.webp"
                alt="Estudante Cursando"
                fill
                priority
                className="rounded-lg shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
