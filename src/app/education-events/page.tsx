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
    id: 'edu_1',
    title: 'Award Functions',
    description: 'Stage production, dignitary handling, and seamless award distribution flow.',
    iconName: 'TrophyIcon',
  },
  {
    id: 'edu_2',
    title: 'Education Fairs',
    description: 'Booth planning, student engagement zones, and coordinated exhibitor support.',
    iconName: 'AcademicCapIcon',
  },
  {
    id: 'edu_3',
    title: 'Education Hunt Events',
    description: 'Interactive hunts, campus activations, and curated learning experiences.',
    iconName: 'MagnifyingGlassIcon',
  },
  {
    id: 'edu_4',
    title: 'Seminars & Workshops',
    description: 'Speaker scheduling, AV setup, and attendee management end-to-end.',
    iconName: 'PresentationChartLineIcon',
  },
  {
    id: 'edu_5',
    title: 'Admissions Drives',
    description: 'Lead capture funnels, branding collateral, and conversion-ready layouts.',
    iconName: 'ClipboardDocumentCheckIcon',
  },
  {
    id: 'edu_6',
    title: 'Campus Celebrations',
    description: 'Cultural showcases, stage management, and student engagement programming.',
    iconName: 'SparklesIcon',
  },
];

const packages: PackageItem[] = [
  {
    id: 'edu_basic',
    name: 'Focused Forum',
    focus: 'Ideal for seminars & workshops',
    features: [
      'Up to 200 attendees',
      'Speaker & agenda support',
      'Stage + AV coordination',
      'Registration & help desk',
      'On-ground logistics team',
    ],
  },
  {
    id: 'edu_growth',
    name: 'Education Fair',
    focus: 'For multi-stall education expos',
    features: [
      'Up to 50 stalls',
      'Visitor flow & zone planning',
      'Branding + signage',
      'Volunteer management',
      'Lead capture setup',
    ],
  },
  {
    id: 'edu_flagship',
    name: 'Flagship Awards',
    focus: 'Premium award functions & ceremonies',
    features: [
      'Stage production & lighting',
      'VIP handling & seating',
      'Backstage coordination',
      'Media + PR support',
      'Show flow & rehearsals',
    ],
  },
];

const galleryItems: GalleryItem[] = [
  {
    id: 'edu_gal_1',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b',
    alt: 'Education conference stage with audience and presentation',
    title: 'Education Summit',
  },
  {
    id: 'edu_gal_2',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    alt: 'Workshop session with participants collaborating at tables',
    title: 'Skill Workshop',
  },
  {
    id: 'edu_gal_3',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
    alt: 'Award ceremony stage with lighting and audience seating',
    title: 'Awards Night',
  },
  {
    id: 'edu_gal_4',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
    alt: 'Education fair booths with student engagement',
    title: 'Education Fair',
  },
  {
    id: 'edu_gal_5',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    alt: 'Interactive education hunt event with teams collaborating',
    title: 'Education Hunt',
  },
  {
    id: 'edu_gal_6',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    alt: 'Seminar hall with speaker and projection screen',
    title: 'Seminar Setup',
  },
];

export default function EducationEventsPage() {
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
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b"
            alt="Education conference stage with audience"
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
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600 text-white text-sm font-semibold mb-4">
              Education Events
            </span>
            <h1 className="text-5xl md:text-7xl font-medium text-white tracking-tight font-jakarta mb-6 leading-tight">
              Education Events, <br />
              <span className="text-primary">Planned to Inspire</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl font-geist">
              Award functions, education fairs, and hunt events delivered with flawless coordination.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-8 md:px-16 py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-hidden reveal">
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground font-geist tracking-wide uppercase mb-6">
              Our Expertise
            </span>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight font-jakarta leading-tight mb-6 text-foreground">
              Education Events <br />
              <span className="text-primary">That Engage & Convert</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((offering, index) => (
              <div
                key={offering.id}
                className="bg-card rounded-3xl p-8 border border-border hover:shadow-xl transition-all duration-300 reveal-hidden reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
                  <Icon name={offering.iconName as any} className="w-7 h-7 text-indigo-600" />
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
              Scalable Education <br />
              <span className="text-primary">Event Packages</span>
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
              Education Events <br />
              <span className="text-primary">In Action</span>
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
