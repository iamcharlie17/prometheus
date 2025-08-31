import Hero from "@/components/homepage/Hero";
import Features from "@/components/homepage/Features";
import CTA from "@/components/homepage/CTA";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar/>
      <Hero/>
      <Features/>
      <CTA/>
      <Footer/>
    </div>
  );
}
