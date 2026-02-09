'use client';
import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FormData {
  name: string
  phone: string
  email: string
  eventType: string
  eventDate: string
  guestCount: string
  city: string
  message: string
}

export default function ContactFormSection() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    city: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'contact_form'
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Failed to submit form')
      }

      alert('Thank you! We will contact you within 24 hours.')
      setFormData({
        name: '',
        phone: '',
        email: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        city: '',
        message: ''
      })
      setStep(1)
    } catch (error) {
      alert('Sorry, something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const progressPercentage = (step / 3) * 100

  return (
    <section id="contact-form" className="w-full px-8 md:px-16 py-20 lg:py-28 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 reveal-hidden reveal">
          <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground font-geist tracking-wide uppercase mb-6">
            Get Started
          </span>
          <h2 className="text-4xl lg:text-5xl font-medium tracking-tight font-jakarta leading-[1.1] mb-6 text-foreground">
            Let's Plan Your <br />
            <span className="text-primary">Perfect Event</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto font-geist">
            Free consultation, no obligation. Share your vision and we'll make it happen.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 border border-border/50 shadow-xl reveal-hidden reveal">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-foreground font-geist">Step {step} of 3</span>
              <span className="text-sm font-medium text-primary font-geist">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6 animate-fade">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground font-geist mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground font-geist input-focus"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground font-geist mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground font-geist input-focus"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground font-geist mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground font-geist input-focus"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Event Details */}
            {step === 2 && (
              <div className="space-y-6 animate-fade">
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-foreground font-geist mb-2">
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground font-geist input-focus"
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="kitty">Kitty Party</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-foreground font-geist mb-2">
                      Tentative Event Date
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground font-geist input-focus"
                    />
                  </div>

                  <div>
                    <label htmlFor="guestCount" className="block text-sm font-medium text-foreground font-geist mb-2">
                      Expected Guest Count
                    </label>
                    <select
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground font-geist input-focus"
                    >
                      <option value="">Select range</option>
                      <option value="0-50">0-50 guests</option>
                      <option value="50-100">50-100 guests</option>
                      <option value="100-200">100-200 guests</option>
                      <option value="200-500">200-500 guests</option>
                      <option value="500+">500+ guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-foreground font-geist mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground font-geist input-focus"
                    placeholder="e.g., Delhi, Greater Noida, Varanasi"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Additional Details */}
            {step === 3 && (
              <div className="space-y-6 animate-fade">
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground font-geist mb-2">
                    Tell us about your vision
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground font-geist input-focus resize-none"
                    placeholder="Share any specific requirements, themes, or ideas you have in mind..."
                  ></textarea>
                </div>

                <div className="bg-success/10 border border-success/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircleIcon" className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <div className="text-sm text-foreground font-geist">
                      <p className="font-semibold mb-1">What happens next?</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• We'll call you within 24 hours</li>
                        <li>• Free consultation to understand your needs</li>
                        <li>• Custom proposal within 48 hours</li>
                        <li>• No obligation, completely free</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all cursor-hover ${
                  step === 1
                    ? 'opacity-50 cursor-not-allowed bg-muted text-muted-foreground'
                    : 'bg-card border border-border text-foreground hover:bg-muted'
                }`}
              >
                <Icon name="ChevronLeftIcon" className="w-4 h-4" />
                Previous
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all cursor-hover btn-hover-lift"
                >
                  Next Step
                  <Icon name="ChevronRightIcon" className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-all cursor-hover btn-hover-lift ${
                    isSubmitting ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  <Icon name="PaperAirplaneIcon" className="w-4 h-4" />
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Contact Options */}
        <div className="mt-12 text-center reveal-hidden reveal">
          <p className="text-muted-foreground font-geist mb-6">
            Prefer to talk directly?
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="tel:+919369190920"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-border text-foreground font-semibold text-sm hover:bg-card transition-all cursor-hover btn-hover-lift"
            >
              <Icon name="PhoneIcon" className="w-5 h-5" />
              +91 93691 90920
            </a>
            <a
              href="mailto:vaidikutsav03@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-border text-foreground font-semibold text-sm hover:bg-card transition-all cursor-hover btn-hover-lift"
            >
              <Icon name="EnvelopeIcon" className="w-5 h-5" />
              vaidikutsav03@gmail.com
            </a>
            <a
              href="https://wa.me/919369190920"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-success text-success-foreground font-semibold text-sm hover:bg-success/90 transition-all cursor-hover btn-hover-lift"
            >
              <Icon name="ChatBubbleLeftRightIcon" className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
