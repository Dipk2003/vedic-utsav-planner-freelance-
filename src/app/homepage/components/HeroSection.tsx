'use client';
import AppImage from '@/components/ui/AppImage';
import { useLanguage } from '@/lib/i18n';
import { useSiteContent } from '@/lib/site-content';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const { t } = useLanguage();
  const router = useRouter();
  const content = useSiteContent(['hero_badge', 'hero_title', 'hero_subtitle']);
  const badgeText = content.hero_badge || t('hero.service_areas', 'Delhi, Greater Noida, Varanasi');
  const heroTitle =
    content.hero_title ||
    t('hero.title', 'Your Vision|Our Expertise|Unforgettable Events.');
  const heroTitleParts = heroTitle.split('|');
  const heroSubtitle =
    content.hero_subtitle ||
    t(
      'hero.subtitle',
      'From intimate gatherings to grand celebrations, we bring your dream events to life with meticulous planning and flawless execution.'
    );
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

  const scrollToTestimonials = () => {
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goTo = (path: string) => {
    router.push(path);
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden isolate">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 animate-fade pointer-events-none">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_11334a259-1766988518820.png"
          alt="Elegant wedding venue with golden lighting and floral decorations"
          className="w-full h-full object-cover object-center scale-105" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>

      {/* Top Badges */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-10 py-8 flex flex-wrap justify-between items-start gap-3 md:gap-4 animate-enter delay-500">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={scrollToForm}
            className="px-5 py-2.5 rounded-full glass-panel text-white text-sm font-medium tracking-wide font-geist flex items-center gap-2 cursor-pointer cursor-hover hover:bg-white/20 transition-colors"
            aria-label="See service areas and contact form"
          >
            <span className="w-2 h-2 rounded-full bg-success"></span>
            {badgeText}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={scrollToGallery}
            className="px-5 py-2.5 rounded-full glass-panel text-white text-sm font-medium tracking-wide font-geist cursor-pointer cursor-hover hover:bg-white/20 transition-colors"
            aria-label="View events executed in portfolio"
          >
            {t('hero.events_executed', '500+ Events Executed')}
          </button>
          <button
            type="button"
            onClick={scrollToTestimonials}
            className="px-5 py-2.5 rounded-full glass-panel text-white text-sm font-medium tracking-wide font-geist flex items-center gap-2 cursor-pointer cursor-hover hover:bg-white/20 transition-colors"
            aria-label="See client ratings and testimonials"
          >
            <span className="text-primary">★</span> {t('hero.rating', '4.9 Client Rating')}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-end pb-12 md:pb-20 px-8 md:px-16 pt-28 md:pt-32">
        <div className="max-w-5xl">
          {/* Category Pills */}
          <div className="relative z-20 pointer-events-auto flex flex-wrap items-center gap-3 mb-6 animate-enter delay-100">
            <button
              type="button"
              onClick={() => goTo('/weddings')}
              className="relative z-20 flex items-center gap-2 bg-white text-foreground px-4 py-1.5 rounded-full text-sm font-bold font-geist shadow-lg cursor-pointer cursor-hover hover:bg-primary hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 pointer-events-auto"
              aria-label="Open weddings page"
            >
              Weddings
            </button>
            <button
              type="button"
              onClick={() => goTo('/corporate-events')}
              className="relative z-20 flex items-center gap-2 glass-panel text-white px-4 py-1.5 rounded-full text-sm font-medium font-geist cursor-pointer cursor-hover hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 pointer-events-auto"
              aria-label="Open corporate events page"
            >
              Corporate Events
            </button>
            <button
              type="button"
              onClick={() => goTo('/birthday-parties')}
              className="relative z-20 flex items-center gap-2 glass-panel text-white px-4 py-1.5 rounded-full text-sm font-medium font-geist cursor-pointer cursor-hover hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 pointer-events-auto"
              aria-label="Open birthday parties page"
            >
              Birthday Parties
            </button>
            <button
              type="button"
              onClick={() => goTo('/kitty-party')}
              className="relative z-20 flex items-center gap-2 glass-panel text-white px-4 py-1.5 rounded-full text-sm font-medium font-geist cursor-pointer cursor-hover hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 pointer-events-auto"
              aria-label="Open social gatherings page"
            >
              Social Gatherings
            </button>
          </div>

          <h1 className="text-5xl md:text-8xl font-medium text-white tracking-tight font-jakarta mb-6 leading-[1.05] drop-shadow-xl animate-enter delay-200">
            {heroTitleParts.map((line, index) => (
              <span key={index} className={index === 2 ? 'text-primary' : undefined}>
                {line}
                {index < heroTitleParts.length - 1 && <><br /></>}
              </span>
            ))}
          </h1>

          <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed font-geist mb-10 animate-enter delay-300">
            {heroSubtitle}
          </p>
          <p className="text-white/70 text-sm md:text-base font-geist mb-8 animate-enter delay-350">
            Event planner in Delhi, Greater Noida, and Varanasi for weddings, corporate events, birthdays, and social gatherings.
          </p>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 animate-enter delay-500">
            <button
              onClick={scrollToForm}
              className="flex items-center gap-3 bg-primary text-primary-foreground pl-8 pr-2 py-2.5 rounded-full font-semibold text-sm hover:bg-primary/90 transition font-geist group cursor-hover btn-hover-lift">
              
              {t('cta.plan_event', 'Plan Your Event')}
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
              
              {t('cta.view_work', 'View Our Work')}
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
