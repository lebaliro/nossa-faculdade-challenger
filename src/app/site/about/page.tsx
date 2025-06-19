import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Nós</h1>
            <p className="text-xl text-blue-100">Transformando vidas através da educação online de qualidade</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa História</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                  anim id est laborum.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                  dicta sunt explicabo.
                </p>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt=""
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Valores</h2>
              <p className="text-xl text-gray-600">Os princípios que guiam nossa missão</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Excelência</h3>
                <p className="text-gray-600">
                  Buscamos sempre a mais alta qualidade em nossos cursos e atendimento aos alunos.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Acessibilidade</h3>
                <p className="text-gray-600">
                  Tornamos a educação de qualidade acessível a todos, independente da localização ou condição social.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Inovação</h3>
                <p className="text-gray-600">
                  Utilizamos as mais modernas tecnologias e metodologias para proporcionar a melhor experiência de
                  aprendizado.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
