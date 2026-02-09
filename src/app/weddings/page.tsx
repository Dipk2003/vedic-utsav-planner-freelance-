'use client';
import { useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import Footer from '@/components/common/Footer';
import Link from 'next/link';

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
  id: 'wed_1',
  title: 'Traditional Ceremonies',
  description: 'Expert in Hindu, Sikh, Christian, Muslim rituals with proper customs and traditions',
  iconName: 'FireIcon'
},
{
  id: 'wed_2',
  title: 'Destination Weddings',
  description: 'Signature venues in Delhi, Greater Noida, and Varanasi with complete planning and accommodation support',
  iconName: 'GlobeAltIcon'
},
{
  id: 'wed_3',
  title: 'Venue Selection',
  description: 'Palaces, resorts, banquet halls, and outdoor venues curated to match your vision',
  iconName: 'BuildingLibraryIcon'
},
{
  id: 'wed_4',
  title: 'Decor & Styling',
  description: 'Floral arrangements, lighting design, stage setup, and thematic decorations',
  iconName: 'SparklesIcon'
},
{
  id: 'wed_5',
  title: 'Catering Services',
  description: 'Multi-cuisine menus, live counters, traditional spreads, and dietary accommodations',
  iconName: 'CakeIcon'
},
{
  id: 'wed_6',
  title: 'Photography & Videography',
  description: 'Cinematic wedding films, candid photography, and drone coverage',
  iconName: 'CameraIcon'
}];


const pricingPackages: PricingPackage[] = [
{
  id: 'wed_basic',
  name: 'Intimate',
  price: '₹5,00,000',
  description: 'Perfect for small family weddings',
  features: [
  'Up to 150 guests',
  'Venue coordination',
  'Basic decor package',
  'Catering management',
  'Photography (8 hours)',
  'Event day coordination']

},
{
  id: 'wed_premium',
  name: 'Grand Celebration',
  price: '₹15,00,000',
  description: 'Ideal for traditional big fat weddings',
  features: [
  'Up to 500 guests',
  'Premium venue selection',
  'Luxury decor & lighting',
  'Multi-cuisine catering',
  'Photography & videography',
  'Entertainment coordination',
  'Guest accommodation',
  'Dedicated wedding planner'],

  popular: true
},
{
  id: 'wed_royal',
  name: 'Royal Experience',
  price: 'Custom',
  description: 'For destination and palace weddings',
  features: [
  '500+ guests',
  'Destination wedding planning',
  'Palace/resort bookings',
  'Multi-day celebrations',
  'Celebrity entertainment',
  'Complete travel management',
  'Luxury hospitality',
  'Personal concierge service']

}];


const galleryItems: GalleryItem[] = [
{
  id: 'wed_gal_1',
  image: "https://images.unsplash.com/photo-1602223300970-f93df0a2f672",
  alt: 'Luxurious wedding venue with golden decorations and floral arrangements',
  title: 'Royal Wedding Celebration'
},
{
  id: 'wed_gal_2',
  image: 'https://images.unsplash.com/photo-1684552675694-69737d7902fc',
  alt: 'Elegant outdoor wedding setup with white chairs and floral arch at sunset',
  title: 'Riverside Wedding Celebration'
},
{
  id: 'wed_gal_3',
  image: "https://images.unsplash.com/photo-1726068449701-4e11c5d64b11",
  alt: 'Traditional Indian wedding ceremony with bride and groom in traditional attire',
  title: 'Traditional Hindu Ceremony'
},
{
  id: 'wed_gal_4',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11334a259-1766988518820.png",
  alt: 'Elegant wedding reception hall with crystal chandeliers and floral centerpieces',
  title: 'Grand Reception Setup'
},
{
  id: 'wed_gal_5',
  image: "https://images.unsplash.com/photo-1644418846614-b55195dc04f7",
  alt: 'Outdoor wedding venue with fairy lights and romantic ambiance',
  title: 'Garden Wedding Evening'
},
{
  id: 'wed_gal_6',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_130cf2000-1765277601594.png",
  alt: 'Mehendi ceremony setup with colorful decorations and seating arrangements',
  title: 'Mehendi Celebration'
}];


export default function WeddingsPage() {
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
            src="https://img.rocket.new/generatedImages/rocket_gen_img_1627156b4-1766429109564.png"
            alt="Luxurious wedding venue with golden decorations and romantic lighting"
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
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-white text-sm font-semibold mb-4">
              Wedding Planning
            </span>
            <h1 className="text-5xl md:text-7xl font-medium text-white tracking-tight font-jakarta mb-6 leading-tight">
              Your Dream Wedding, <br />
              <span className="text-primary">Perfectly Planned</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl font-geist">
              From intimate ceremonies to grand celebrations, we bring your love story to life
            </p>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="w-full px-8 md:px-16 py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-hidden reveal">
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground font-geist tracking-wide uppercase mb-6">
              Our Services
            </span>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight font-jakarta leading-tight mb-6 text-foreground">
              Complete Wedding <br />
              <span className="text-accent">Planning Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((offering, index) =>
            <div
              key={offering.id}
              className="bg-card rounded-3xl p-8 border border-border hover:shadow-xl transition-all duration-300 reveal-hidden reveal"
              style={{ animationDelay: `${index * 100}ms` }}>
              
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                  <Icon name={offering.iconName as any} className="w-7 h-7 text-accent" />
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
              Packages for <br />
              <span className="text-accent">Every Celebration</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPackages.map((pkg, index) =>
            <div
              key={pkg.id}
              className={`relative bg-card rounded-3xl p-8 border-2 transition-all duration-300 reveal-hidden reveal ${
              pkg.popular ? 'border-accent shadow-xl scale-105' : 'border-border hover:border-accent/50'}`
              }
              style={{ animationDelay: `${index * 100}ms` }}>
              
                {pkg.popular &&
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-accent text-white text-xs font-bold">
                      Most Popular
                    </span>
                  </div>
              }
                <h3 className="text-2xl font-bold font-jakarta text-card-foreground mb-2">
                  {pkg.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-accent">{pkg.price}</span>
                  {pkg.price !== 'Custom' && <span className="text-muted-foreground text-sm"> / wedding</span>}
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
              'bg-accent text-white hover:bg-accent/90' : 'border-2 border-accent text-accent hover:bg-accent hover:text-white'}`
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
              Our Portfolio
            </span>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight font-jakarta leading-tight mb-6 text-foreground">
              Weddings We've <br />
              <span className="text-accent">Brought to Life</span>
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
      <section className="w-full px-8 md:px-16 py-20 bg-accent text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-medium font-jakarta mb-6">
            Ready to Plan Your Dream Wedding?
          </h2>
          <p className="text-white/80 text-lg font-geist mb-8">
            Let's create the celebration you've always imagined
          </p>
          <Link
            href="/homepage#contact-form"
            className="inline-flex items-center gap-3 bg-white text-accent px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all btn-hover-lift">
            
            Start Planning
            <Icon name="ArrowRightIcon" className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>);

}
