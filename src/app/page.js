import CTA from "@/components/homepage/CTA"
import Features from "@/components/homepage/Features"
import Hero from "@/components/homepage/Hero"
import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  )
}
