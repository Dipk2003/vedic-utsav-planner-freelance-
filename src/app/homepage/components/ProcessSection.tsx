import Icon from '@/components/ui/AppIcon';

interface ProcessStep {
  id: string
  number: string
  title: string
  description: string
  iconName: string
  timeline: string
}

const processSteps: ProcessStep[] = [
  {
    id: 'step_consultation',
    number: '01',
    title: 'Free Consultation',
    description: 'Share your vision with us in a detailed 30-minute call. We listen, understand, and brainstorm initial ideas.',
    iconName: 'ChatBubbleLeftRightIcon',
    timeline: '30 minutes'
  },
  {
    id: 'step_proposal',
    number: '02',
    title: 'Custom Proposal',
    description: 'Receive a detailed plan with theme concepts, vendor recommendations, and transparent pricing within 48 hours.',
    iconName: 'DocumentTextIcon',
    timeline: '48 hours'
  },
  {
    id: 'step_coordination',
    number: '03',
    title: 'Vendor Coordination',
    description: 'We handle everything - from booking venues to coordinating with caterers, decorators, and entertainment.',
    iconName: 'UsersIcon',
    timeline: 'Pre-event'
  },
  {
    id: 'step_execution',
    number: '04',
    title: 'Flawless Execution',
    description: 'Relax and enjoy your event while our team manages setup, timing, and ensures everything runs perfectly.',
    iconName: 'CheckCircleIcon',
    timeline: 'Event day'
  }
]

export default function ProcessSection() {
  return (
    <section className="w-full px-8 md:px-16 py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 reveal-hidden reveal">
          <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground font-geist tracking-wide uppercase mb-6">
            Our Process
          </span>
          <h2 className="text-4xl lg:text-5xl font-medium tracking-tight font-jakarta leading-[1.1] mb-6 text-foreground">
            Simple Steps to <br />
            <span className="text-primary">Your Dream Event</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto font-geist">
            From first call to final celebration, we make planning effortless.
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
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted-foreground font-geist leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Timeline Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground font-geist">
                    <Icon name="ClockIcon" className="w-3.5 h-3.5" />
                    {step.timeline}
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
              Average planning time: <span className="font-bold text-primary">2-4 weeks</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}