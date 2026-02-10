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
  id: 'kitty_1',
  title: 'Ladies Kitty Parties',
  description: 'Elegant gatherings with games, entertainment, and networking for women groups',
  iconName: 'UserGroupIcon'
},
{
  id: 'kitty_2',
  title: 'Theme Parties',
  description: 'Bollywood, retro, ethnic, western, or custom themes with matching decor',
  iconName: 'SparklesIcon'
},
{
  id: 'kitty_3',
  title: 'Anniversary Celebrations',
  description: 'Romantic and elegant setups for couple anniversaries and milestone celebrations',
  iconName: 'HeartIcon'
},
{
  id: 'kitty_4',
  title: 'Cultural Events',
  description: 'Diwali, Holi, Navratri, and other festival celebrations with traditional touch',
  iconName: 'FireIcon'
},
{
  id: 'kitty_5',
  title: 'Entertainment & Games',
  description: 'Tambola, musical chairs, fashion shows, and interactive party games',
  iconName: 'MusicalNoteIcon'
},
{
  id: 'kitty_6',
  title: 'Catering & Decor',
  description: 'Elegant table settings, floral arrangements, and gourmet catering options',
  iconName: 'CakeIcon'
}];


const pricingPackages: PricingPackage[] = [
{
  id: 'kitty_basic',
  name: 'Cozy Gathering',
  price: '₹25,000',
  description: 'Perfect for intimate kitty parties',
  features: [
  'Up to 30 guests',
  'Basic theme decor',
  'Catering (snacks & beverages)',
  'Party games setup',
  'Photography (2 hours)',
  'Event coordination']

},
{
  id: 'kitty_premium',
  name: 'Elegant Affair',
  price: '₹75,000',
  description: 'Ideal for stylish social gatherings',
  features: [
  'Up to 80 guests',
  'Premium theme execution',
  'Elegant decor & lighting',
  'Multi-course catering',
  'Entertainment (DJ/Live music)',
  'Photography & videography',
  'Party favors & gifts',
  'Dedicated coordinator'],

  popular: true
},
{
  id: 'kitty_luxury',
  name: 'Grand Celebration',
  price: 'Custom',
  description: 'For lavish anniversary and milestone events',
  features: [
  '80+ guests',
  'Luxury venue booking',
  'Designer decor & styling',
  'Gourmet catering',
  'Live entertainment',
  'Professional photography',
  'Personalized experiences',
  'Full event management']

}];


const galleryItems: GalleryItem[] = [
{
  id: 'kitty_gal_1',
  image: "https://images.unsplash.com/photo-1685993308493-2659ff02bbef",
  alt: 'Elegant ladies kitty party with colorful table settings and floral decorations',
  title: 'Ladies Kitty Party'
},
{
  id: 'kitty_gal_2',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd595e1d-1764787541163.png",
  alt: 'Romantic anniversary celebration with candles and elegant table setup',
  title: 'Anniversary Celebration'
},
{
  id: 'kitty_gal_3',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1952b4da2-1768204871540.png",
  alt: 'Diwali celebration with traditional decorations and diyas',
  title: 'Diwali Festival Party'
},
{
  id: 'kitty_gal_4',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15ceff836-1764668936279.png",
  alt: 'Ethnic themed kitty party with traditional Indian decor',
  title: 'Ethnic Theme Party'
},
{
  id: 'kitty_gal_5',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11aa42de0-1770128172048.png",
  alt: 'Retro Bollywood themed party with vintage decorations',
  title: 'Retro Bollywood Theme'
},
{
  id: 'kitty_gal_6',
  image: "https://images.unsplash.com/photo-1661196137260-67023ff808f0",
  alt: 'Garden party setup with elegant outdoor seating and floral arrangements',
  title: 'Garden Social Gathering'
}];


export default function KittyPartyPage() {
  useSeo(
    'kitty-party',
    'Kitty Party & Social Events | VedicUtsav',
    'Elegant kitty parties and social gatherings with curated themes and experiences.'
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
            src="https://img.rocket.new/generatedImages/rocket_gen_img_1f16f95ad-1769313630218.png"
            alt="Elegant social gathering with beautiful table settings and decorations"
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
            <span className="inline-block px-4 py-1.5 rounded-full bg-success text-white text-sm font-semibold mb-4">
              Kitty Party & Social Events
            </span>
            <h1 className="text-5xl md:text-7xl font-medium text-white tracking-tight font-jakarta mb-6 leading-tight">
              Elegant Gatherings, <br />
              <span className="text-primary">Memorable Moments</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl font-geist">
              From kitty parties to anniversary celebrations, we create sophisticated social events
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
              Complete Social Event <br />
              <span className="text-success">Planning Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((offering, index) =>
            <div
              key={offering.id}
              className="bg-card rounded-3xl p-8 border border-border hover:shadow-xl transition-all duration-300 reveal-hidden reveal"
              style={{ animationDelay: `${index * 100}ms` }}>
              
                <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mb-6">
                  <Icon name={offering.iconName as any} className="w-7 h-7 text-success" />
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
              <span className="text-success">Every Occasion</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPackages.map((pkg, index) =>
            <div
              key={pkg.id}
              className={`relative bg-card rounded-3xl p-8 border-2 transition-all duration-300 reveal-hidden reveal ${
              pkg.popular ? 'border-success shadow-xl scale-105' : 'border-border hover:border-success/50'}`
              }
              style={{ animationDelay: `${index * 100}ms` }}>
              
                {pkg.popular &&
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-success text-white text-xs font-bold">
                      Most Popular
                    </span>
                  </div>
              }
                <h3 className="text-2xl font-bold font-jakarta text-card-foreground mb-2">
                  {pkg.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-success">{pkg.price}</span>
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
              'bg-success text-white hover:bg-success/90' : 'border-2 border-success text-success hover:bg-success hover:text-white'}`
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
              Social Events <br />
              <span className="text-success">We've Organized</span>
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
      <section className="w-full px-8 md:px-16 py-20 bg-success text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-medium font-jakarta mb-6">
            Ready to Host Your Next Social Event?
          </h2>
          <p className="text-white/80 text-lg font-geist mb-8">
            Let's create an elegant gathering your guests will love
          </p>
          <Link
            href="/homepage#contact-form"
            className="inline-flex items-center gap-3 bg-white text-success px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all btn-hover-lift">
            
            Plan Your Event
            <Icon name="ArrowRightIcon" className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>);

}
