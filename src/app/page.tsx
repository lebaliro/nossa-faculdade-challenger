import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"
import { HeroSection } from "@/app/components/home/hero-section"
import { BenefitsSection } from "@/app/components/home/benefits-section"
import { FeaturedCoursesSection } from "@/app/components/home/featured-courses-section"
import { TestimonialsSection } from "@/app/components/home/testimonials-section"
import { CTASection } from "@/app/components/home/cta-section"

/**
 * Página inicial do site
 * Contém todas as seções principais: Hero, Benefícios, Cursos em Destaque, Depoimentos e CTA
 */
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <FeaturedCoursesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
