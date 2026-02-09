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
    'contact.prefer_direct': 'Prefer to talk directly?',
    'contact.whatsapp': 'WhatsApp Us',
    'contact.email': 'Email Us',
    'contact.phone': 'Call Us',
    'hero.service_areas': 'Delhi • Greater Noida • Varanasi',
    'hero.rating': '4.9 Client Rating',
    'hero.events_executed': '500+ Events Executed',
    'footer.tagline': 'Creating unforgettable moments in Delhi, Greater Noida, and Varanasi',
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
    'cta.submit_inquiry': 'Jankari Bhejें',
    'cta.submitting': 'Bheja ja raha hai...',
    'cta.next_step': 'Agla Step',
    'cta.previous': 'Pichla',
    'contact.prefer_direct': 'Seedha baat karna chahte hain?',
    'contact.whatsapp': 'WhatsApp Karein',
    'contact.email': 'Email Karein',
    'contact.phone': 'Call Karein',
    'hero.service_areas': 'Delhi • Greater Noida • Varanasi',
    'hero.rating': '4.9 Client Rating',
    'hero.events_executed': '500+ Events Executed',
    'footer.tagline': 'Delhi, Greater Noida aur Varanasi me yaadgar pal',
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
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const stored = window.localStorage.getItem('lang');
    if (stored === 'en' || stored === 'hi') {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('lang', language);
    document.cookie = `lang=${language}; path=/; max-age=31536000`;
  }, [language]);

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
