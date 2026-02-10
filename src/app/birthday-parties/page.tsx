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
  id: 'bday_1',
  title: 'Kids Birthday Parties',
  description: 'Themed parties with cartoon characters, superheroes, princesses, and interactive games',
  iconName: 'GiftIcon'
},
{
  id: 'bday_2',
  title: 'Teen Celebrations',
  description: 'DJ nights, pool parties, gaming zones, and trendy themes for teenagers',
  iconName: 'MusicalNoteIcon'
},
{
  id: 'bday_3',
  title: 'Adult Milestone Parties',
  description: 'Elegant celebrations for 30th, 40th, 50th birthdays with sophisticated themes',
  iconName: 'StarIcon'
},
{
  id: 'bday_4',
  title: 'Theme Execution',
  description: 'Bollywood, retro, Hollywood, sports, or custom themes with complete decor',
  iconName: 'FilmIcon'
},
{
  id: 'bday_5',
  title: 'Entertainment',
  description: 'Magicians, DJs, live bands, dancers, and celebrity appearances',
  iconName: 'SparklesIcon'
},
{
  id: 'bday_6',
  title: 'Catering & Cakes',
  description: 'Custom birthday cakes, themed food stations, and diverse menu options',
  iconName: 'CakeIcon'
}];


const pricingPackages: PricingPackage[] = [
{
  id: 'bday_basic',
  name: 'Fun Start',
  price: '₹50,000',
  description: 'Perfect for intimate birthday celebrations',
  features: [
  'Up to 50 guests',
  'Basic theme decor',
  'Birthday cake',
  'Catering (snacks & meals)',
  'Photography (4 hours)',
  'Party favors']

},
{
  id: 'bday_premium',
  name: 'Grand Bash',
  price: '₹1,50,000',
  description: 'Ideal for memorable birthday parties',
  features: [
  'Up to 150 guests',
  'Premium theme execution',
  'Custom birthday cake',
  'Multi-cuisine catering',
  'Entertainment (DJ/Band)',
  'Photography & videography',
  'Party games & activities',
  'Event coordinator'],

  popular: true
},
{
  id: 'bday_luxury',
  name: 'Luxury Experience',
  price: 'Custom',
  description: 'For extravagant milestone celebrations',
  features: [
  '150+ guests',
  'Luxury venue booking',
  'Celebrity entertainment',
  'Designer decor & lighting',
  'Gourmet catering',
  'Professional production',
  'Live streaming',
  'Personalized experiences']

}];


const galleryItems: GalleryItem[] = [
{
  id: 'bday_gal_1',
  image: "https://images.unsplash.com/photo-1729442882727-0f71bd6310c7",
  alt: 'Vibrant kids birthday party with superhero themed decorations and play areas',
  title: 'Superhero Kids Party'
},
{
  id: 'bday_gal_2',
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_12e6792a6-1765898371511.png',
  alt: 'Colorful birthday party venue with Bollywood themed decorations and stage setup',
  title: 'Vintage Bollywood Bash'
},
{
  id: 'bday_gal_3',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_136802daf-1769722235011.png",
  alt: 'Elegant adult birthday party with balloon decorations and dessert table',
  title: 'Elegant Milestone Celebration'
},
{
  id: 'bday_gal_4',
  image: "https://images.unsplash.com/photo-1723343312998-2bc20decb38e",
  alt: 'Outdoor birthday party with colorful balloons and festive decorations',
  title: 'Garden Birthday Party'
},
{
  id: 'bday_gal_5',
  image: "https://images.unsplash.com/photo-1712156302170-b3b1fa8d4b48",
  alt: 'Princess themed birthday party with pink decorations and castle backdrop',
  title: 'Princess Theme Party'
},
{
  id: 'bday_gal_6',
  image: "https://images.unsplash.com/photo-1731596152912-249a2511f966",
  alt: 'Teen birthday party with DJ setup and dance floor with colorful lights',
  title: 'Teen DJ Night Party'
}];


export default function BirthdayPartiesPage() {
  useSeo(
    'birthday-parties',
    'Birthday Party Planning | VedicUtsav',
    'Themed birthday parties for kids and adults with custom decor and entertainment.'
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
            src="https://img.rocket.new/generatedImages/rocket_gen_img_15bd09b84-1767354295534.png"
            alt="Colorful birthday party venue with festive decorations and balloons"
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
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold mb-4">
              Birthday Parties
            </span>
            <h1 className="text-5xl md:text-7xl font-medium text-white tracking-tight font-jakarta mb-6 leading-tight">
              Celebrate Every <br />
              <span className="text-primary">Birthday in Style</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl font-geist">
              From kids' themed parties to milestone celebrations, we make every birthday unforgettable
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
              Complete Birthday <br />
              <span className="text-primary">Party Solutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((offering, index) =>
            <div
              key={offering.id}
              className="bg-card rounded-3xl p-8 border border-border hover:shadow-xl transition-all duration-300 reveal-hidden reveal"
              style={{ animationDelay: `${index * 100}ms` }}>
              
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Icon name={offering.iconName as any} className="w-7 h-7 text-primary" />
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
              <span className="text-primary">Every Celebration</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPackages.map((pkg, index) =>
            <div
              key={pkg.id}
              className={`relative bg-card rounded-3xl p-8 border-2 transition-all duration-300 reveal-hidden reveal ${
              pkg.popular ? 'border-primary shadow-xl scale-105' : 'border-border hover:border-primary/50'}`
              }
              style={{ animationDelay: `${index * 100}ms` }}>
              
                {pkg.popular &&
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      Most Popular
                    </span>
                  </div>
              }
                <h3 className="text-2xl font-bold font-jakarta text-card-foreground mb-2">
                  {pkg.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary">{pkg.price}</span>
                  {pkg.price !== 'Custom' && <span className="text-muted-foreground text-sm"> / party</span>}
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
              'bg-primary text-primary-foreground hover:bg-primary/90' :
              'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'}`
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
              Birthday Parties <br />
              <span className="text-primary">We've Celebrated</span>
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
      <section className="w-full px-8 md:px-16 py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-medium font-jakarta mb-6">
            Ready to Plan an Amazing Birthday?
          </h2>
          <p className="text-primary-foreground/80 text-lg font-geist mb-8">
            Let's create a celebration that will be remembered for years
          </p>
          <Link
            href="/homepage#contact-form"
            className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-semibold hover:bg-foreground/90 transition-all btn-hover-lift">
            
            Plan Your Party
            <Icon name="ArrowRightIcon" className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>);

}
