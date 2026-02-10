'use client';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/lib/i18n';
import { useSiteContent } from '@/lib/site-content';

interface ProcessStep {
  id: string
  number: string
  title: { en: string; hi: string }
  description: { en: string; hi: string }
  iconName: string
  timeline: { en: string; hi: string }
}

const processSteps: ProcessStep[] = [
  {
    id: 'step_consultation',
    number: '01',
    title: { en: 'Free Consultation', hi: 'Free Consultation' },
    description: {
      en: 'Share your vision with us in a detailed 30-minute call. We listen, understand, and brainstorm initial ideas.',
      hi: '30-minute call me apna vision share karein. Hum sunte hain, samajhte hain, aur initial ideas brainstorm karte hain.'
    },
    iconName: 'ChatBubbleLeftRightIcon',
    timeline: { en: '30 minutes', hi: '30 minutes' }
  },
  {
    id: 'step_proposal',
    number: '02',
    title: { en: 'Custom Proposal', hi: 'Custom Proposal' },
    description: {
      en: 'Receive a detailed plan with theme concepts, vendor recommendations, and transparent pricing within 48 hours.',
      hi: '48 hours ke andar theme concepts, vendor recommendations aur transparent pricing ke saath detailed plan milega.'
    },
    iconName: 'DocumentTextIcon',
    timeline: { en: '48 hours', hi: '48 hours' }
  },
  {
    id: 'step_coordination',
    number: '03',
    title: { en: 'Vendor Coordination', hi: 'Vendor Coordination' },
    description: {
      en: 'We handle everything - from booking venues to coordinating with caterers, decorators, and entertainment.',
      hi: 'Venue booking se lekar caterers, decorators aur entertainment coordination tak, sab kuch hum handle karte hain.'
    },
    iconName: 'UsersIcon',
    timeline: { en: 'Pre-event', hi: 'Pre-event' }
  },
  {
    id: 'step_execution',
    number: '04',
    title: { en: 'Flawless Execution', hi: 'Flawless Execution' },
    description: {
      en: 'Relax and enjoy your event while our team manages setup, timing, and ensures everything runs perfectly.',
      hi: 'Aap relax karein, humari team setup, timing aur flawless execution manage karti hai.'
    },
    iconName: 'CheckCircleIcon',
    timeline: { en: 'Event day', hi: 'Event day' }
  }
]

export default function ProcessSection() {
  const { language, t } = useLanguage();
  const content = useSiteContent(['process_title', 'process_subtitle', 'process_description', 'process_footer']);
  const title = content.process_title || t('process.title', 'Our Process');
  const subtitle = content.process_subtitle || t('process.subtitle', 'Simple Steps to|Your Dream Event');
  const subtitleParts = subtitle.split('|');
  const description =
    content.process_description ||
    t('process.description', 'From first call to final celebration, we make planning effortless.');
  const footer =
    content.process_footer || t('process.footer', 'Average planning time: 2-4 weeks');
  const footerParts = footer.split(':');
  return (
    <section className="w-full px-8 md:px-16 py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 reveal-hidden reveal">
          <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground font-geist tracking-wide uppercase mb-6">
            {title}
          </span>
          <h2 className="text-4xl lg:text-5xl font-medium tracking-tight font-jakarta leading-[1.1] mb-6 text-foreground">
            {subtitleParts[0]} <br />
            <span className="text-primary">{subtitleParts[1] || ''}</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto font-geist">
            {description}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className={`relative reveal-hidden reveal`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Step Card */}
                <div className="bg-card rounded-[2rem] p-8 border border-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group relative z-10">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg font-jakarta shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon name={step.iconName as any} className="w-7 h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold font-jakarta text-card-foreground mb-3 group-hover:text-primary transition-colors">
                    {step.title[language]}
                  </h3>

                  <p className="text-sm text-muted-foreground font-geist leading-relaxed mb-4">
                    {step.description[language]}
                  </p>

                  {/* Timeline Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground font-geist">
                    <Icon name="ClockIcon" className="w-3.5 h-3.5" />
                    {step.timeline[language]}
                  </div>
                </div>

                {/* Connection Dot (Desktop) */}
                <div className="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-20"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center reveal-hidden reveal">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-muted border border-border">
            <Icon name="SparklesIcon" className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground font-geist">
              {footerParts[0]}: <span className="font-bold text-primary">{footerParts[1] || ' 2-4 weeks'}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
