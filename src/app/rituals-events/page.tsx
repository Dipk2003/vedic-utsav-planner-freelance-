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

interface PackageItem {
  id: string;
  name: string;
  focus: string;
  features: string[];
}

interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  title: string;
}

const offerings: Offering[] = [
  {
    id: 'rit_1',
    title: 'Gawan Ceremonies',
    description: 'Traditional gawan setups with authentic rituals, decor, and family coordination.',
    iconName: 'FireIcon',
  },
  {
    id: 'rit_2',
    title: 'Puja Events',
    description: 'Complete puja planning with pandit coordination, samagri, and sacred decor.',
    iconName: 'SparklesIcon',
  },
  {
    id: 'rit_3',
    title: 'Havan & Yagna',
    description: 'Sacred fire rituals with proper arrangements, seating, and safety setup.',
    iconName: 'SunIcon',
  },
  {
    id: 'rit_4',
    title: 'Griha Pravesh',
    description: 'Housewarming rituals with vastu alignment and traditional welcome setup.',
    iconName: 'HomeModernIcon',
  },
  {
    id: 'rit_5',
    title: 'Festive Pujas',
    description: 'Navratri, Diwali, and seasonal pujas with cultural decor themes.',
    iconName: 'StarIcon',
  },
  {
    id: 'rit_6',
    title: 'Family Blessings',
    description: 'Personalized blessings and rituals for milestones and family gatherings.',
    iconName: 'HeartIcon',
  },
];

const packages: PackageItem[] = [
  {
    id: 'rit_basic',
    name: 'Sacred Essentials',
    focus: 'For small family rituals',
    features: [
      'Pandit coordination',
      'Samagri arrangement',
      'Basic decor setup',
      'Ritual flow guidance',
      'On-site support',
    ],
  },
  {
    id: 'rit_premium',
    name: 'Divine Celebration',
    focus: 'Ideal for gawan & havan ceremonies',
    features: [
      'Premium decor themes',
      'Seating + stage setup',
      'Traditional music support',
      'Photography coordination',
      'Guest hospitality',
    ],
  },
  {
    id: 'rit_grand',
    name: 'Grand Ritual Experience',
    focus: 'For large sacred events & community pujas',
    features: [
      'Full-scale event production',
      'Multiple pandit teams',
      'Lighting + ambiance setup',
      'Event flow management',
      'Custom ritual planning',
    ],
  },
];

const galleryItems: GalleryItem[] = [
  {
    id: 'rit_gal_1',
    image: 'https://images.unsplash.com/photo-1525857597365-5f9a75d7d5b9',
    alt: 'Traditional puja setup with diyas and flowers',
    title: 'Sacred Puja Setup',
  },
  {
    id: 'rit_gal_2',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe',
    alt: 'Havan ceremony with sacred fire and offerings',
    title: 'Havan Ceremony',
  },
  {
    id: 'rit_gal_3',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
    alt: 'Traditional floral decor for rituals',
    title: 'Ritual Decor',
  },
  {
    id: 'rit_gal_4',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    alt: 'Griha pravesh ceremony setup',
    title: 'Griha Pravesh',
  },
  {
    id: 'rit_gal_5',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    alt: 'Festive puja arrangements',
    title: 'Festive Puja',
  },
  {
    id: 'rit_gal_6',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe',
    alt: 'Family blessings and ritual prayers',
    title: 'Family Blessings',
  },
];

export default function RitualsEventsPage() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
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
      <section className="relative w-full h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <AppImage
            src="https://images.unsplash.com/photo-1525857597365-5f9a75d7d5b9"
            alt="Traditional puja setup with diyas and flowers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-10 py-6 flex justify-between items-center">
          <Link href="/homepage" className="text-white font-bold text-xl font-jakarta hover:text-primary transition-colors">
            VaidikUtsav
          </Link>
          <Link href="/homepage" className="px-5 py-2.5 rounded-full glass-panel text-white text-sm font-medium">
            Back to Home
          </Link>
        </nav>

        <div className="relative w-full h-full flex flex-col justify-end pb-16 px-8 md:px-16">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-600 text-white text-sm font-semibold mb-4">
              Rituals Events
            </span>
            <h1 className="text-5xl md:text-7xl font-medium text-white tracking-tight font-jakarta mb-6 leading-tight">
              Sacred Rituals, <br />
              <span className="text-primary">Beautifully Orchestrated</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl font-geist">
              Gawan, puja, havan, and traditional ceremonies handled with devotion and detail.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-8 md:px-16 py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-hidden reveal">
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground font-geist tracking-wide uppercase mb-6">
              Ritual Services
            </span>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight font-jakarta leading-tight mb-6 text-foreground">
              Traditional Rituals <br />
              <span className="text-primary">Planned With Care</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((offering, index) => (
              <div
                key={offering.id}
                className="bg-card rounded-3xl p-8 border border-border hover:shadow-xl transition-all duration-300 reveal-hidden reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                  <Icon name={offering.iconName as any} className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold font-jakarta text-card-foreground mb-3">
                  {offering.title}
                </h3>
                <p className="text-sm text-muted-foreground font-geist leading-relaxed">
                  {offering.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-8 md:px-16 py-20 lg:py-28 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-hidden reveal">
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground font-geist tracking-wide uppercase mb-6">
              Packages
            </span>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight font-jakarta leading-tight mb-6 text-foreground">
              Rituals Event <br />
              <span className="text-primary">Packages</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className="bg-card rounded-3xl p-8 border border-border hover:shadow-xl transition-all duration-300 reveal-hidden reveal"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <h3 className="text-2xl font-semibold font-jakarta text-card-foreground mb-2">
                  {pkg.name}
                </h3>
                <p className="text-sm text-muted-foreground font-geist mb-6">
                  {pkg.focus}
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground font-geist">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-8 md:px-16 py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-hidden reveal">
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground font-geist tracking-wide uppercase mb-6">
              Gallery
            </span>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight font-jakarta leading-tight mb-6 text-foreground">
              Rituals & Ceremonies <br />
              <span className="text-primary">Highlights</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-3xl border border-border reveal-hidden reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <AppImage
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover img-hover-scale"
                  />
                </div>
                <div className="p-5 bg-card">
                  <h3 className="text-lg font-semibold font-jakarta text-card-foreground">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
