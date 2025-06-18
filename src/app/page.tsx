import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"
import { CallActionSection } from "@/app/components/home/call-action"
import { BenefitsSection } from "@/app/components/home/benefits-section"
import { FeaturedCoursesSection } from "@/app/components/home/featured-courses-section"
import { TestimonialsSection } from "@/app/components/home/testimonials-section"


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CallActionSection />
        <BenefitsSection />
        <FeaturedCoursesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
