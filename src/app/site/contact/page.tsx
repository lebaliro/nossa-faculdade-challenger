import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"
import { ContactInfo } from "@/app/components/contacts/contact-info"
import { ContactForm } from "@/app/components/contacts/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Entre em Contato</h1>
            <p className="text-xl text-blue-100">Estamos aqui para ajudar você a alcançar seus objetivos</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactInfo />
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie sua Mensagem</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
