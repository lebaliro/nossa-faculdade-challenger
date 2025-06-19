import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { CallActionSection } from "@/components/home/call-action"
import { BenefitsSection } from "@/components/home/benefits-section"
import { ListHomeCoursesSection } from "@/components/home/list-home-courses-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CallActionSection />
        <BenefitsSection />
        <ListHomeCoursesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
