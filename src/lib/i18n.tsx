'use client';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'en' | 'hi';

type TranslationMap = Record<string, string>;

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
};

const translations: Record<Language, TranslationMap> = {
  en: {
    'lang.english': 'English',
    'lang.hindi': 'Hindi',
    'lang.toggle': 'Language',
    'chat.title': 'VedicUtsav Assistant',
    'chat.subtitle': 'Powered by Gemini',
    'chat.open': 'Chat with us',
    'chat.input': 'Type your message...',
    'chat.typing': 'Typing...',
    'cta.plan_event': 'Plan Your Event',
    'cta.view_work': 'View Our Work',
    'cta.discuss_event': "Let's Discuss Your Event",
    'cta.view_portfolio': 'View Complete Portfolio',
    'cta.start_planning': 'Start Planning',
    'cta.submit_inquiry': 'Submit Inquiry',
    'cta.submitting': 'Submitting...',
    'cta.next_step': 'Next Step',
    'cta.previous': 'Previous',
    'services.title': 'Our Services',
    'services.subtitle': 'Every Occasion|Perfectly Planned.',
    'services.description':
      'From corporate conferences to intimate celebrations, we handle every detail with expertise and care.',
    'services.cta': 'Have a unique event in mind? We love challenges.',
    'services.year': 'in 2025',
    'portfolio.subtitle': 'Our Portfolio',
    'portfolio.title': 'Events That Made|Lasting Memories',
    'portfolio.description':
      'From grand celebrations to intimate gatherings, explore our recent work across Delhi, Greater Noida, and Varanasi.',
    'process.title': 'Our Process',
    'process.subtitle': 'Simple Steps to|Your Dream Event',
    'process.description': 'From first call to final celebration, we make planning effortless.',
    'process.footer': 'Average planning time: 2-4 weeks',
    'testimonials.subtitle': 'Client Stories',
    'testimonials.title': 'What Our Clients|Say About Us',
    'testimonials.description':
      "Real experiences from families and businesses we've served across Delhi, Greater Noida, and Varanasi.",
    'stats.events': 'Events Executed',
    'stats.rating': 'Average Rating',
    'stats.satisfaction': 'Client Satisfaction',
    'stats.cities': 'Cities Covered',
    'contact.prefer_direct': 'Prefer to talk directly?',
    'contact.tag': 'Get Started',
    'contact.title': "Let's Plan Your|Perfect Event",
    'contact.subtitle': "Free consultation, no obligation. Share your vision and we'll make it happen.",
    'contact.step': 'Step',
    'contact.of': 'of',
    'contact.name': 'Your Name',
    'contact.name_placeholder': 'Enter your full name',
    'contact.phone_label': 'Phone Number',
    'contact.phone_placeholder': '+91 XXXXX XXXXX',
    'contact.email_label': 'Email Address',
    'contact.event_type': 'Event Type',
    'contact.event_select': 'Select event type',
    'contact.event_wedding': 'Wedding',
    'contact.event_corporate': 'Corporate Event',
    'contact.event_birthday': 'Birthday Party',
    'contact.event_kitty': 'Kitty Party',
    'contact.event_anniversary': 'Anniversary',
    'contact.event_other': 'Other',
    'contact.event_date': 'Tentative Event Date',
    'contact.guest_count': 'Expected Guest Count',
    'contact.guest_select': 'Select range',
    'contact.guest_0_50': '0-50 guests',
    'contact.guest_50_100': '50-100 guests',
    'contact.guest_100_200': '100-200 guests',
    'contact.guest_200_500': '200-500 guests',
    'contact.guest_500': '500+ guests',
    'contact.city': 'City',
    'contact.city_placeholder': 'e.g., Delhi, Greater Noida, Varanasi',
    'contact.vision': 'Tell us about your vision',
    'contact.vision_placeholder': 'Share any specific requirements, themes, or ideas you have in mind...',
    'contact.next_title': 'What happens next?',
    'contact.next_1': 'We will call you within 24 hours',
    'contact.next_2': 'Free consultation to understand your needs',
    'contact.next_3': 'Custom proposal within 48 hours',
    'contact.next_4': 'No obligation, completely free',
    'contact.whatsapp': 'WhatsApp Us',
    'contact.email': 'Email Us',
    'contact.phone': 'Call Us',
    'hero.service_areas': 'Delhi, Greater Noida, Varanasi',
    'hero.title': 'Your Vision|Our Expertise|Unforgettable Events.',
    'hero.subtitle':
      'From intimate gatherings to grand celebrations, we bring your dream events to life with meticulous planning and flawless execution.',
    'hero.rating': '4.9 Client Rating',
    'hero.events_executed': '500+ Events Executed',
    'footer.tagline': 'Creating unforgettable moments in Delhi, Greater Noida, and Varanasi',
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'admin.title': 'Admin Dashboard',
    'admin.login': 'Admin Login',
    'admin.sign_in': 'Sign In',
    'admin.sign_out': 'Sign Out',
    'admin.email': 'Email',
    'admin.password': 'Password',
    'admin.leads': 'Leads',
    'admin.blog': 'Blog',
    'admin.content': 'Site Content',
    'admin.seo': 'SEO',
    'admin.ai_tools': 'AI Tools',
    'admin.generate': 'Generate with AI',
    'admin.save': 'Save',
    'admin.publish': 'Publish',
    'admin.unpublish': 'Unpublish',
    'admin.new_post': 'New Post',
    'admin.edit_post': 'Edit Post',
    'admin.slug': 'Slug',
    'admin.title_label': 'Title',
    'admin.excerpt': 'Excerpt',
    'admin.content_label': 'Content',
    'admin.status': 'Status',
    'admin.language': 'Language',
    'admin.seo_title': 'SEO Title',
    'admin.seo_description': 'SEO Description',
    'admin.ai': 'AI Tools',
    'admin.lead_source': 'Source',
    'admin.lead_city': 'City',
    'admin.lead_event': 'Event Type',
    'admin.lead_date': 'Event Date',
    'admin.lead_guest': 'Guest Count',
    'admin.lead_message': 'Message',
    'admin.lead_contact': 'Contact',
    'admin.whatsapp': 'WhatsApp',
    'admin.email_action': 'Email',
    'admin.copy': 'Copy',
    'admin.no_data': 'No data found.'
  },
  hi: {
    'lang.english': 'English',
    'lang.hindi': 'Hindi',
    'lang.toggle': 'Bhasha',
    'chat.title': 'VedicUtsav Sahayak',
    'chat.subtitle': 'Gemini dwara sanchalit',
    'chat.open': 'Chat karein',
    'chat.input': 'Apna sandesh likhen...',
    'chat.typing': 'Typing...',
    'cta.plan_event': 'Apna Event Plan Karein',
    'cta.view_work': 'Hamara Kaam Dekhein',
    'cta.discuss_event': 'Apne Event par Baat Karein',
    'cta.view_portfolio': 'Pura Portfolio Dekhein',
    'cta.start_planning': 'Planning Shuru Karein',
    'cta.submit_inquiry': 'Jankari Bhejen',
    'cta.submitting': 'Bheja ja raha hai...',
    'cta.next_step': 'Agla Step',
    'cta.previous': 'Pichla',
    'services.title': 'Hamari Services',
    'services.subtitle': 'Har Mauka|Perfectly Planned.',
    'services.description':
      'Corporate conferences se intimate celebrations tak, hum har detail ko expertise aur care se handle karte hain.',
    'services.cta': 'Aapke mind me koi unique event hai? Hume challenges pasand hain.',
    'services.year': '2025 me',
    'portfolio.subtitle': 'Hamara Portfolio',
    'portfolio.title': 'Aise Events Jinhone|Yaadgar Pal Banaye',
    'portfolio.description':
      'Grand celebrations se intimate gatherings tak, Delhi, Greater Noida aur Varanasi me hamare recent work ko dekhein.',
    'process.title': 'Hamari Process',
    'process.subtitle': 'Simple Steps to|Aapka Dream Event',
    'process.description': 'First call se final celebration tak, planning ko hum effortless banate hain.',
    'process.footer': 'Average planning time: 2-4 weeks',
    'testimonials.subtitle': 'Client Stories',
    'testimonials.title': 'Hamare Clients|Kya Kehte Hain',
    'testimonials.description':
      'Delhi, Greater Noida aur Varanasi me hamare clients ke real experiences.',
    'stats.events': 'Events Executed',
    'stats.rating': 'Average Rating',
    'stats.satisfaction': 'Client Satisfaction',
    'stats.cities': 'Cities Covered',
    'contact.prefer_direct': 'Seedha baat karna chahte hain?',
    'contact.tag': 'Get Started',
    'contact.title': 'Aaiye Plan Karein|Perfect Event',
    'contact.subtitle': 'Free consultation, koi obligation nahi. Apna vision share karein aur hum use sach karenge.',
    'contact.step': 'Step',
    'contact.of': 'of',
    'contact.name': 'Aapka Naam',
    'contact.name_placeholder': 'Apna poora naam likhen',
    'contact.phone_label': 'Phone Number',
    'contact.phone_placeholder': '+91 XXXXX XXXXX',
    'contact.email_label': 'Email Address',
    'contact.event_type': 'Event Type',
    'contact.event_select': 'Event type select karein',
    'contact.event_wedding': 'Wedding',
    'contact.event_corporate': 'Corporate Event',
    'contact.event_birthday': 'Birthday Party',
    'contact.event_kitty': 'Kitty Party',
    'contact.event_anniversary': 'Anniversary',
    'contact.event_other': 'Other',
    'contact.event_date': 'Tentative Event Date',
    'contact.guest_count': 'Expected Guest Count',
    'contact.guest_select': 'Range select karein',
    'contact.guest_0_50': '0-50 guests',
    'contact.guest_50_100': '50-100 guests',
    'contact.guest_100_200': '100-200 guests',
    'contact.guest_200_500': '200-500 guests',
    'contact.guest_500': '500+ guests',
    'contact.city': 'City',
    'contact.city_placeholder': 'jaise, Delhi, Greater Noida, Varanasi',
    'contact.vision': 'Apne vision ke baare me batayein',
    'contact.vision_placeholder': 'Apni requirements, themes ya ideas share karein...',
    'contact.next_title': 'Aage kya hoga?',
    'contact.next_1': 'Hum 24 hours me call karenge',
    'contact.next_2': 'Aapki needs samajhne ke liye free consultation',
    'contact.next_3': '48 hours me custom proposal',
    'contact.next_4': 'Koi obligation nahi, bilkul free',
    'contact.whatsapp': 'WhatsApp Karein',
    'contact.email': 'Email Karein',
    'contact.phone': 'Call Karein',
    'hero.service_areas': 'Delhi, Greater Noida, Varanasi',
    'hero.title': 'Aapka Vision|Hamari Expertise|Yaadgar Events.',
    'hero.subtitle':
      'Chhote samman se lekar grand celebrations tak, hum aapke dream events ko flawless planning aur execution ke saath sach karte hain.',
    'hero.rating': '4.9 Client Rating',
    'hero.events_executed': '500+ Events Executed',
    'footer.tagline': 'Delhi, Greater Noida aur Varanasi me yaadgar pal',
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'admin.title': 'Admin Dashboard',
    'admin.login': 'Admin Login',
    'admin.sign_in': 'Sign In',
    'admin.sign_out': 'Sign Out',
    'admin.email': 'Email',
    'admin.password': 'Password',
    'admin.leads': 'Leads',
    'admin.blog': 'Blog',
    'admin.content': 'Site Content',
    'admin.seo': 'SEO',
    'admin.ai_tools': 'AI Tools',
    'admin.generate': 'AI se Generate',
    'admin.save': 'Save',
    'admin.publish': 'Publish',
    'admin.unpublish': 'Unpublish',
    'admin.new_post': 'New Post',
    'admin.edit_post': 'Edit Post',
    'admin.slug': 'Slug',
    'admin.title_label': 'Title',
    'admin.excerpt': 'Excerpt',
    'admin.content_label': 'Content',
    'admin.status': 'Status',
    'admin.language': 'Language',
    'admin.seo_title': 'SEO Title',
    'admin.seo_description': 'SEO Description',
    'admin.ai': 'AI Tools',
    'admin.lead_source': 'Source',
    'admin.lead_city': 'City',
    'admin.lead_event': 'Event Type',
    'admin.lead_date': 'Event Date',
    'admin.lead_guest': 'Guest Count',
    'admin.lead_message': 'Message',
    'admin.lead_contact': 'Contact',
    'admin.whatsapp': 'WhatsApp',
    'admin.email_action': 'Email',
    'admin.copy': 'Copy',
    'admin.no_data': 'Koi data nahi mila.'
  }
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    document.cookie = 'lang=en; path=/; max-age=31536000';
    document.documentElement.lang = 'en';
  }, []);

  const setLanguage = useCallback(() => {
    setLanguageState('en');
    document.cookie = 'lang=en; path=/; max-age=31536000';
    document.documentElement.lang = 'en';
  }, []);

  const t = useCallback(
    (key: string, fallback?: string) => {
      return translations[language]?.[key] || fallback || translations.en[key] || key;
    },
    [language]
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
