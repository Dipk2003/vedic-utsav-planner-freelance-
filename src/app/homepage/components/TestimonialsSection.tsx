'use client';
import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/lib/i18n';
import { useSiteContent } from '@/lib/site-content';

interface Testimonial {
  id: string;
  name: string;
  event: string;
  location: string;
  date: string;
  rating: number;
  quote: string;
  image: string;
  alt: string;
  details: string;
}

const testimonials: Testimonial[] = [
{
  id: 'testimonial_priya_rajesh',
  name: 'Priya & Rajesh',
  event: "Wedding - 600 guests",
  location: 'Delhi',
  date: 'December 2025',
  rating: 5,
  quote: "VaidikUtsav managed our 600-guest wedding flawlessly. Every ritual was perfect, the coordination was seamless, and our families were amazed. They truly understood our vision and made it a reality beyond our expectations.",
  image: "https://images.unsplash.com/photo-1726068449701-4e11c5d64b11",
  alt: 'Happy Indian bride and groom in traditional wedding attire',
  details: 'Traditional Hindu ceremony with 3-day celebration'
},
{
  id: 'testimonial_techcorp',
  name: 'Amit Sharma, TechCorp',
  event: 'Annual Conference',
  location: 'Greater Noida',
  date: 'November 2025',
  rating: 5,
  quote: "Professional execution from start to finish. Zero glitches during our hybrid event with 1200 attendees. Our CEO personally commended the team's attention to detail and brand alignment. Highly recommended for corporate events.",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ddd943a4-1768649602455.png",
  alt: 'Professional businessman in corporate attire at conference',
  details: 'Hybrid format with live streaming and interactive sessions'
},
{
  id: 'testimonial_meera',
  name: 'Meera Kapoor',
  event: "Aarav's 1st Birthday",
  location: 'Delhi',
  date: 'January 2026',
  rating: 5,
  quote: "The jungle theme was beyond our imagination! 150 guests including 80 kids, and every child had a blast. The activity zones, custom decorations, and entertainment were top-notch. Worth every rupee!",
  image: "https://images.unsplash.com/photo-1608561435915-874b68cfc209",
  alt: 'Smiling young mother with baby at birthday celebration',
  details: 'Themed party with interactive games and entertainment zones'
},
{
  id: 'testimonial_sanjay_anita',
  name: 'Sanjay & Anita',
  event: '25th Anniversary',
  location: 'Varanasi',
  date: 'October 2025',
  rating: 5,
  quote: "Celebrating 25 years deserved something special, and VaidikUtsav delivered! The royal palace venue, the elegant decor, and the surprise elements they planned left our 200 guests in awe. Truly memorable.",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15e7c974f-1766924254270.png",
  alt: 'Elegant mature couple in formal attire at anniversary celebration',
  details: 'Elegant celebration at a heritage venue with live music'
}];


export default function TestimonialsSection() {
  const { t } = useLanguage();
  const content = useSiteContent(['testimonials_title', 'testimonials_subtitle', 'testimonials_description']);
  const subtitle = content.testimonials_subtitle || t('testimonials.subtitle', 'Client Stories');
  const title = content.testimonials_title || t('testimonials.title', 'What Our Clients|Say About Us');
  const titleParts = title.split('|');
  const description =
    content.testimonials_description ||
    t(
      'testimonials.description',
      "Real experiences from families and businesses we've served across Delhi, Greater Noida, and Varanasi."
    );
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="w-full px-8 md:px-16 py-20 lg:py-28 bg-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 reveal-hidden reveal">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-white/70 font-geist tracking-wide uppercase mb-6">
            {subtitle}
          </span>
          <h2 className="text-4xl lg:text-5xl font-medium tracking-tight font-jakarta leading-[1.1] mb-6">
            {titleParts[0]} <br />
            <span className="text-primary">{titleParts[1] || ''}</span>
          </h2>
          <p className="text-white/70 text-lg font-light max-w-2xl mx-auto font-geist">
            {description}
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-5xl mx-auto reveal-hidden reveal">
          <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Client Image */}
              <div className="lg:col-span-1">
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden ring-4 ring-primary/30">
                  <AppImage
                    src={currentTestimonial.image}
                    alt={currentTestimonial.alt}
                    className="w-full h-full object-cover" />
                  
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) =>
                  <Icon key={`star_${i}`} name="StarIcon" variant="solid" className="w-5 h-5 text-primary" />
                  )}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-white font-geist italic">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Client Info */}
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-white font-jakarta">
                    {currentTestimonial.name}
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-white/70 font-geist">
                    <span className="flex items-center gap-1">
                      <Icon name="CalendarIcon" className="w-4 h-4" />
                      {currentTestimonial.event}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Icon name="MapPinIcon" className="w-4 h-4" />
                      {currentTestimonial.location}
                    </span>
                    <span>•</span>
                    <span>{currentTestimonial.date}</span>
                  </div>
                  <p className="text-sm text-white/60 font-geist">
                    {currentTestimonial.details}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full glass-panel-dark flex items-center justify-center hover:bg-white/10 transition-all cursor-hover"
              aria-label="Previous testimonial">
              
              <Icon name="ChevronLeftIcon" className="w-6 h-6 text-white" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) =>
              <button
                key={`dot_${index}`}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all cursor-hover ${
                index === currentIndex ? 'bg-primary w-8' : 'bg-white/30'}`
                }
                aria-label={`Go to testimonial ${index + 1}`} />

              )}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full glass-panel-dark flex items-center justify-center hover:bg-white/10 transition-all cursor-hover"
              aria-label="Next testimonial">
              
              <Icon name="ChevronRightIcon" className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 reveal-hidden reveal">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary font-jakarta mb-2">500+</p>
            <p className="text-sm text-white/70 font-geist">{t('stats.events', 'Events Executed')}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary font-jakarta mb-2">4.9</p>
            <p className="text-sm text-white/70 font-geist">{t('stats.rating', 'Average Rating')}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary font-jakarta mb-2">98%</p>
            <p className="text-sm text-white/70 font-geist">{t('stats.satisfaction', 'Client Satisfaction')}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary font-jakarta mb-2">3</p>
            <p className="text-sm text-white/70 font-geist">{t('stats.cities', 'Cities Covered')}</p>
          </div>
        </div>
      </div>
    </section>);

}

