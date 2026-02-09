'use client';
import { useEffect } from 'react';
 import HeroSection from'./components/HeroSection';
 import ServicesSection from'./components/ServicesSection';
 import PortfolioSection from'./components/PortfolioSection';
 import ProcessSection from'./components/ProcessSection';
 import TestimonialsSection from'./components/TestimonialsSection';
 import ContactFormSection from'./components/ContactFormSection';
 import Footer from'@/components/common/Footer';


export default function Homepage() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    if (!reveals.length) return
    
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove('reveal-hidden')
          e.target.classList.add('active')
        }
      }),
      { threshold: 0.1 }
    )
    reveals.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactFormSection />
      <Footer />
    </main>
  )
}