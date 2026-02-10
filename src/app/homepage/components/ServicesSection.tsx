'use client';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { useSiteContent } from '@/lib/site-content';

interface Service {
  id: string
  title: { en: string; hi: string }
  description: { en: string; hi: string }
  iconName: string
  stats: { en: string; hi: string }
  color: string
  bgColor: string
}

const services: Service[] = [
  {
    id: 'service_corporate',
    title: { en: 'Corporate Events', hi: 'Corporate Events' },
    description: {
      en: 'Annual conferences, product launches, team offsites - handled 50+ corporate events in 2025',
      hi: 'Annual conferences, product launches, team offsites - 2025 me 50+ corporate events handle kiye'
    },
    iconName: 'BriefcaseIcon',
    stats: { en: '50+ Events', hi: '50+ Events' },
    color: 'text-secondary',
    bgColor: 'bg-secondary/10'
  },
  {
    id: 'service_wedding',
    title: { en: 'Wedding Planning', hi: 'Wedding Planning' },
    description: {
      en: 'Traditional ceremonies to destination weddings - expert in Hindu, Sikh, Christian rituals',
      hi: 'Traditional ceremonies se destination weddings tak - Hindu, Sikh, Christian rituals me expertise'
    },
    iconName: 'HeartIcon',
    stats: { en: '200+ Weddings', hi: '200+ Weddings' },
    color: 'text-accent',
    bgColor: 'bg-accent/10'
  },
  {
    id: 'service_birthday',
    title: { en: 'Birthday Parties', hi: 'Birthday Parties' },
    description: {
      en: 'Themed celebrations for kids and adults - from intimate gatherings to 500+ guest parties',
      hi: 'Kids aur adults ke liye themed celebrations - chhote gatherings se 500+ guest parties tak'
    },
    iconName: 'CakeIcon',
    stats: { en: '150+ Parties', hi: '150+ Parties' },
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    id: 'service_social',
    title: { en: 'Kitty Parties & Social Events', hi: 'Kitty Parties aur Social Events' },
    description: {
      en: "Ladies' gatherings, anniversary celebrations, cultural events - elegant and memorable",
      hi: 'Ladies gatherings, anniversary celebrations, cultural events - elegant aur memorable'
    },
    iconName: 'SparklesIcon',
    stats: { en: '100+ Events', hi: '100+ Events' },
    color: 'text-success',
    bgColor: 'bg-success/10'
  }
]

const serviceLinks: Record<string, string> = {
  'service_corporate': '/corporate-events',
  'service_wedding': '/weddings',
  'service_birthday': '/birthday-parties',
  'service_social': '/kitty-party'
}

export default function ServicesSection() {
  const { language, t } = useLanguage();
  const content = useSiteContent(['services_title', 'services_subtitle', 'services_description', 'services_cta']);
  const title = content.services_title || t('services.title', 'Our Services');
  const subtitle = content.services_subtitle || t('services.subtitle', 'Every Occasion|Perfectly Planned.');
  const subtitleParts = subtitle.split('|');
  const description =
    content.services_description ||
    t(
      'services.description',
      'From corporate conferences to intimate celebrations, we handle every detail with expertise and care.'
    );
  const ctaText = content.services_cta || t('services.cta', 'Have a unique event in mind? We love challenges.');
  return (
    <section id="services" className="w-full px-8 md:px-16 py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 reveal-hidden reveal">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground font-geist tracking-wide uppercase mb-6">
              {title}
            </span>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight font-jakarta leading-[1.1] mb-6 text-foreground">
              {subtitleParts[0]} <br />
              <span className="text-primary">{subtitleParts[1] || ''}</span>
            </h2>
            <p className="text-muted-foreground text-lg font-light max-w-xl font-geist">
              {description}
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min">
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={serviceLinks[service.id]}
              className={`relative bg-card rounded-[2rem] p-8 border border-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group reveal-hidden reveal ${
                index % 2 === 1 ? 'md:mt-12' : ''
              }`}
            >
              <div className={`w-14 h-14 ${service.bgColor} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={service.iconName as any} className={`w-7 h-7 ${service.color}`} />
              </div>
              
              <h3 className="text-xl font-semibold font-jakarta text-card-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title[language]}
              </h3>
              
              <p className="text-sm text-muted-foreground font-geist leading-relaxed mb-4">
                {service.description[language]}
              </p>
              
              <div className="flex items-center gap-2 mt-auto pt-4">
                <span className={`text-xs font-bold ${service.color} font-geist`}>
                  {service.stats[language]}
                </span>
                <span className="text-xs text-muted-foreground">{t('services.year', 'in 2025')}</span>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center reveal-hidden reveal">
          <p className="text-muted-foreground font-geist mb-6">
            {ctaText}
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-hover btn-hover-lift">
            <Icon name="ChatBubbleLeftRightIcon" className="w-5 h-5" />
            {t('cta.discuss_event', "Let's Discuss Your Event")}
          </button>
        </div>
      </div>
    </section>
  )
}
