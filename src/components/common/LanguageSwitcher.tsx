'use client';
import { useLanguage } from '@/lib/i18n';
import { useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        const next = language === 'en' ? 'hi' : 'en';
        setLanguage(next);
        router.refresh();
      }}
      className="fixed top-4 right-4 z-[9999] px-3 py-2 rounded-full bg-foreground text-background text-xs font-semibold shadow-lg hover:bg-foreground/90 transition"
      aria-label={t('lang.toggle', 'Language')}
    >
      {language === 'en' ? t('lang.hindi', 'Hindi') : t('lang.english', 'English')}
    </button>
  );
}
