'use client';
import { useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import Footer from '@/components/common/Footer';
import Link from 'next/link';
import { useSeo } from '@/lib/seo';

interface Offering {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

interface PricingPackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  title: string;
}

const offerings: Offering[] = [
{
  id: 'corp_1',
  title: 'Annual Conferences',
  description: 'Large-scale conferences with keynote speakers, breakout sessions, and networking zones',
  iconName: 'PresentationChartLineIcon'
},
{
  id: 'corp_2',
  title: 'Product Launches',
  description: 'Brand activations with immersive experiences, media coverage, and VIP guest management',
  iconName: 'RocketLaunchIcon'
},
{
  id: 'corp_3',
  title: 'Team Building Events',
  description: 'Offsites, retreats, and team bonding activities designed to boost morale and collaboration',
  iconName: 'UserGroupIcon'
},
{
  id: 'corp_4',
  title: 'Award Ceremonies',
  description: 'Elegant award nights with stage production, entertainment, and recognition programs',
  iconName: 'TrophyIcon'
},
{
  id: 'corp_5',
  title: 'Hybrid Events',
  description: 'Seamless integration of in-person and virtual experiences with live streaming',
  iconName: 'VideoCameraIcon'
},
{
  id: 'corp_6',
  title: 'Trade Shows',
  description: 'Exhibition booth design, setup, and management for maximum brand visibility',
  iconName: 'BuildingStorefrontIcon'
}];


const pricingPackages: PricingPackage[] = [
{
  id: 'corp_basic',
  name: 'Essential',
  price: '₹2,50,000',
  description: 'Perfect for small corporate gatherings',
  features: [
  'Up to 100 attendees',
  'Venue coordination',
  'Basic AV setup',
  'Catering management',
  'Event day coordination']

},
{
  id: 'corp_premium',
  name: 'Professional',
  price: '₹7,50,000',
  description: 'Ideal for mid-size corporate events',
  features: [
  'Up to 500 attendees',
  'Premium venue selection',
  'Advanced AV & stage production',
  'Branding & signage',
  'Photography & videography',
  'Entertainment coordination',
  'Dedicated event manager'],

  popular: true
},
{
  id: 'corp_enterprise',
  name: 'Enterprise',
  price: 'Custom',
  description: 'For large-scale conferences and launches',
  features: [
  '500+ attendees',
  'Multi-day event management',
  'Hybrid event capabilities',
  'Celebrity/speaker management',
  'Full production team',
  'Media & PR coordination',
  'Post-event analytics',
  '24/7 support team']

}];


const galleryItems: GalleryItem[] = [
{
  id: 'corp_gal_1',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c75419f2-1764666356653.png",
  alt: 'Modern corporate conference hall with stage lighting and audience seating',
  title: 'Tech Company Annual Meet'
},
{
  id: 'corp_gal_2',
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f9f6b8ca-1766852583977.png',
  alt: 'Elegant product launch event with luxury car display and sophisticated lighting',
  title: 'Luxury Car Product Launch'
},
{
  id: 'corp_gal_3',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e6ee50f3-1767703416252.png",
  alt: 'Corporate team building event with outdoor activities',
  title: 'Team Building Retreat'
},
{
  id: 'corp_gal_4',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1628b1aad-1766796004835.png",
  alt: 'Award ceremony stage with dramatic lighting and trophy display',
  title: 'Annual Awards Night'
},
{
  id: 'corp_gal_5',
  image: "https://images.unsplash.com/photo-1710949013100-132d93d416d4",
  alt: 'Trade show exhibition booth with modern design',
  title: 'Industry Trade Show'
},
{
  id: 'corp_gal_6',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_10d5b3b72-1765677523587.png",
  alt: 'Hybrid event setup with cameras and screens for virtual attendees',
  title: 'Hybrid Conference Setup'
}];


export default function CorporateEventsPage() {
  useSeo(
    'corporate-events',
    'Corporate Event Planner in Delhi, Greater Noida & Varanasi | VedicUtsav',
    'Corporate event planner in Delhi, Greater Noida, and Varanasi for conferences, product launches, offsites, and hybrid events.'
  );
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove('reveal-hidden');
          e.target.classList.add('active');
        }
      }),
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_11c8db986-1766988519257.png"
            alt="Professional corporate event venue with modern stage setup"
            className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-10 py-6 flex justify-between items-center">
          <Link href="/homepage" className="text-white font-bold text-xl font-jakarta hover:text-primary transition-colors">
            VedicUtsav
          </Link>
          <Link href="/homepage" className="px-5 py-2.5 rounded-full glass-panel text-white text-sm font-medium">
            Back to Home
          </Link>
        </nav>

        <div className="relative w-full h-full flex flex-col justify-end pb-16 px-8 md:px-16">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-white text-sm font-semibold mb-4">
              Corporate Events
            </span>
            <h1 className="text-5xl md:text-7xl font-medium text-white tracking-tight font-jakarta mb-6 leading-tight">
              Elevate Your <br />
              <span className="text-primary">Corporate Presence</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl font-geist">
              From conferences to product launches, we create professional events that leave lasting impressions.
              Corporate event planner in Delhi, Greater Noida, and Varanasi for every scale.
            </p>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="w-full px-8 md:px-16 py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-hidden reveal">
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground font-geist tracking-wide uppercase mb-6">
              Our Offerings
            </span>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight font-jakarta leading-tight mb-6 text-foreground">
              Comprehensive Corporate <br />
              <span className="text-secondary">Event Solutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((offering, index) =>
            <div
              key={offering.id}
              className="bg-card rounded-3xl p-8 border border-border hover:shadow-xl transition-all duration-300 reveal-hidden reveal"
              style={{ animationDelay: `${index * 100}ms` }}>
              
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                  <Icon name={offering.iconName as any} className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold font-jakarta text-card-foreground mb-3">
                  {offering.title}
                </h3>
                <p className="text-sm text-muted-foreground font-geist leading-relaxed">
                  {offering.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full px-8 md:px-16 py-20 lg:py-28 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-hidden reveal">
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground font-geist tracking-wide uppercase mb-6">
              Pricing Packages
            </span>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight font-jakarta leading-tight mb-6 text-foreground">
              Flexible Plans for <br />
              <span className="text-secondary">Every Scale</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPackages.map((pkg, index) =>
            <div
              key={pkg.id}
              className={`relative bg-card rounded-3xl p-8 border-2 transition-all duration-300 reveal-hidden reveal ${
              pkg.popular ? 'border-secondary shadow-xl scale-105' : 'border-border hover:border-secondary/50'}`
              }
              style={{ animationDelay: `${index * 100}ms` }}>
              
                {pkg.popular &&
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-secondary text-white text-xs font-bold">
                      Most Popular
                    </span>
                  </div>
              }
                <h3 className="text-2xl font-bold font-jakarta text-card-foreground mb-2">
                  {pkg.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-secondary">{pkg.price}</span>
                  {pkg.price !== 'Custom' && <span className="text-muted-foreground text-sm"> / event</span>}
                </div>
                <p className="text-muted-foreground text-sm font-geist mb-6">
                  {pkg.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) =>
                <li key={idx} className="flex items-start gap-2 text-sm font-geist">
                      <Icon name="CheckCircleIcon" className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                )}
                </ul>
                <button className={`w-full py-3 rounded-full font-semibold text-sm transition-all ${
              pkg.popular ?
              'bg-secondary text-white hover:bg-secondary/90' : 'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white'}`
              }>
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="w-full px-8 md:px-16 py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-hidden reveal">
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground font-geist tracking-wide uppercase mb-6">
              Our Work
            </span>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight font-jakarta leading-tight mb-6 text-foreground">
              Corporate Events <br />
              <span className="text-secondary">We've Executed</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) =>
            <div
              key={item.id}
              className="group cursor-pointer reveal-hidden reveal"
              style={{ animationDelay: `${index * 100}ms` }}>
              
                <div className="relative overflow-hidden rounded-3xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="aspect-[4/3] overflow-hidden">
                    <AppImage
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover img-hover-scale" />
                  
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-lg font-semibold font-jakarta">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-8 md:px-16 py-20 bg-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-medium font-jakarta mb-6">
            Ready to Plan Your Corporate Event?
          </h2>
          <p className="text-white/80 text-lg font-geist mb-8">
            Let's discuss your requirements and create an unforgettable experience
          </p>
          <Link
            href="/homepage#contact-form"
            className="inline-flex items-center gap-3 bg-white text-secondary px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all btn-hover-lift">
            
            Get in Touch
            <Icon name="ArrowRightIcon" className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>);

}
