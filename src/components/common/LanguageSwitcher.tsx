'use client';
import { useLanguage } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
      className="fixed top-4 right-4 z-[9999] px-3 py-2 rounded-full bg-foreground text-background text-xs font-semibold shadow-lg hover:bg-foreground/90 transition"
      aria-label={t('lang.toggle', 'Language')}
    >
      {language === 'en' ? t('lang.hindi', 'Hindi') : t('lang.english', 'English')}
    </button>
  );
}
