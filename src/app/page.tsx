import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import AboutSection from "@/components/about-section"
import TechStackSection from "@/components/tech-stack-section"
import { VelocityScroll } from "@/components/ui/scroll-based-velocity"
import Portfolio from "@/components/portfolio-section"
import ProcessSection from "@/components/process-section"
import TestimonialsSection from "@/components/testimonials-section"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent text-white overflow-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Container principal */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 relative z-10">
        {/* Hero Section */}
        <Hero />
        
        {/* Scroll Based Velocity */}
        <div className="py-6 md:py-2">
          <VelocityScroll 
            text="RUBY ON RAILS - REACT - NEXT.JS - TYPESCRIPT - NODE.JS - REACT NATIVE - TAILWIND - " 
            default_velocity={3}
            className="font-archivo text-4xl md:text-5xl"
          />
        </div>
        <AboutSection />
        <TechStackSection />
        <Portfolio />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <div className="mb-12">
          <Footer />
        </div>
      </div>

    </main>
  )
}