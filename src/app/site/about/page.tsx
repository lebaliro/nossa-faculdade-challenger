import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Nós</h1>
            <p className="text-xl text-blue-100">Transformando vidas através da educação online de qualidade</p>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa História</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Fundada em 2020, nossa plataforma nasceu com o objetivo de democratizar o acesso à educação de
                  qualidade. Acreditamos que todos merecem a oportunidade de desenvolver suas habilidades e alcançar
                  seus objetivos profissionais.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Com mais de 10.000 alunos formados e uma taxa de satisfação de 98%, nos tornamos referência em
                  educação online no Brasil. Nossos cursos são desenvolvidos por especialistas do mercado e atualizados
                  constantemente.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Hoje, oferecemos mais de 50 cursos em diversas áreas, desde tecnologia até marketing digital, ajudando
                  profissionais a se destacarem em suas carreiras.
                </p>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Nossa equipe"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Valores */}
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

export const metadata = {
  title: "Sobre Nós - Cursos Online",
  description: "Conheça nossa história, missão e valores. Transformando vidas através da educação online de qualidade.",
}
