'use client';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

export default function HeroSection() {
  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('portfolio');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 animate-fade">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_11334a259-1766988518820.png"
          alt="Elegant wedding venue with golden lighting and floral decorations"
          className="w-full h-full object-cover object-center scale-105" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>

      {/* Top Badges */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-10 py-8 flex justify-between items-start animate-enter delay-500">
        <div className="flex items-center gap-3">
          <span className="px-5 py-2.5 rounded-full glass-panel text-white text-sm font-medium tracking-wide font-geist flex items-center gap-2 cursor-hover">
            <span className="w-2 h-2 rounded-full bg-success"></span>
            Delhi • Greater Noida • Varanasi
          </span>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <span className="px-5 py-2.5 rounded-full glass-panel text-white text-sm font-medium tracking-wide font-geist cursor-hover">
            500+ Events Executed
          </span>
          <span className="px-5 py-2.5 rounded-full glass-panel text-white text-sm font-medium tracking-wide font-geist flex items-center gap-2 cursor-hover">
            <span className="text-primary">★</span> 4.9 Client Rating
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative w-full h-full flex flex-col justify-end pb-12 md:pb-20 px-8 md:px-16 pointer-events-none">
        <div className="pointer-events-auto max-w-5xl">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-3 mb-6 animate-enter delay-100">
            <Link href="/weddings" className="flex items-center gap-2 bg-white text-foreground px-4 py-1.5 rounded-full text-sm font-bold font-geist shadow-lg cursor-hover hover:bg-primary hover:text-primary-foreground transition-colors">
              Weddings
            </Link>
            <Link href="/corporate-events" className="flex items-center gap-2 glass-panel text-white px-4 py-1.5 rounded-full text-sm font-medium font-geist cursor-hover hover:bg-white/20 transition-colors">
              Corporate Events
            </Link>
            <Link href="/birthday-parties" className="flex items-center gap-2 glass-panel text-white px-4 py-1.5 rounded-full text-sm font-medium font-geist cursor-hover hover:bg-white/20 transition-colors">
              Birthday Parties
            </Link>
            <Link href="/kitty-party" className="flex items-center gap-2 glass-panel text-white px-4 py-1.5 rounded-full text-sm font-medium font-geist cursor-hover hover:bg-white/20 transition-colors">
              Social Gatherings
            </Link>
          </div>

          <h1 className="text-5xl md:text-8xl font-medium text-white tracking-tight font-jakarta mb-6 leading-[1.05] drop-shadow-xl animate-enter delay-200">
            Your Vision. <br />
            Our Expertise. <br />
            <span className="text-primary">Unforgettable Events.</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed font-geist mb-10 animate-enter delay-300">
            From intimate gatherings to grand celebrations, we bring your dream events to life with meticulous planning and flawless execution.
          </p>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 animate-enter delay-500">
            <button
              onClick={scrollToForm}
              className="flex items-center gap-3 bg-primary text-primary-foreground pl-8 pr-2 py-2.5 rounded-full font-semibold text-sm hover:bg-primary/90 transition font-geist group cursor-hover btn-hover-lift">
              
              Plan Your Event
              <span className="bg-primary-foreground text-primary p-2 rounded-full transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </span>
            </button>
            <button
              onClick={scrollToGallery}
              className="flex items-center gap-3 glass-panel text-white pl-8 pr-2 py-2.5 rounded-full font-medium text-sm hover:bg-white/20 transition font-geist group cursor-hover">
              
              View Our Work
              <span className="bg-white/10 text-white p-2 rounded-full border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>);

}
