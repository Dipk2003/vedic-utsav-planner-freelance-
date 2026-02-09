import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface Service {
  id: string
  title: string
  description: string
  iconName: string
  stats: string
  color: string
  bgColor: string
}

const services: Service[] = [
  {
    id: 'service_corporate',
    title: 'Corporate Events',
    description: 'Annual conferences, product launches, team offsites - handled 50+ corporate events in 2025',
    iconName: 'BriefcaseIcon',
    stats: '50+ Events',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10'
  },
  {
    id: 'service_wedding',
    title: 'Wedding Planning',
    description: 'Traditional ceremonies to destination weddings - expert in Hindu, Sikh, Christian rituals',
    iconName: 'HeartIcon',
    stats: '200+ Weddings',
    color: 'text-accent',
    bgColor: 'bg-accent/10'
  },
  {
    id: 'service_birthday',
    title: 'Birthday Parties',
    description: 'Themed celebrations for kids and adults - from intimate gatherings to 500+ guest parties',
    iconName: 'CakeIcon',
    stats: '150+ Parties',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    id: 'service_social',
    title: 'Kitty Parties & Social Events',
    description: "Ladies' gatherings, anniversary celebrations, cultural events - elegant and memorable",
    iconName: 'SparklesIcon',
    stats: '100+ Events',
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
  return (
    <section className="w-full px-8 md:px-16 py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 reveal-hidden reveal">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground font-geist tracking-wide uppercase mb-6">
              Our Services
            </span>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight font-jakarta leading-[1.1] mb-6 text-foreground">
              Every Occasion, <br />
              <span className="text-primary">Perfectly Planned.</span>
            </h2>
            <p className="text-muted-foreground text-lg font-light max-w-xl font-geist">
              From corporate conferences to intimate celebrations, we handle every detail with expertise and care.
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
                {service.title}
              </h3>
              
              <p className="text-sm text-muted-foreground font-geist leading-relaxed mb-4">
                {service.description}
              </p>
              
              <div className="flex items-center gap-2 mt-auto pt-4">
                <span className={`text-xs font-bold ${service.color} font-geist`}>
                  {service.stats}
                </span>
                <span className="text-xs text-muted-foreground">in 2025</span>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center reveal-hidden reveal">
          <p className="text-muted-foreground font-geist mb-6">
            Have a unique event in mind? We love challenges.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-hover btn-hover-lift">
            <Icon name="ChatBubbleLeftRightIcon" className="w-5 h-5" />
            Let's Discuss Your Event
          </button>
        </div>
      </div>
    </section>
  )
}