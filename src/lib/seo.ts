'use client';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useLanguage } from '@/lib/i18n';

function setMetaDescription(content: string) {
  const name = 'description';
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function useSeo(page: string, fallbackTitle: string, fallbackDescription: string) {
  const { language } = useLanguage();

  useEffect(() => {
    let isActive = true;

    const loadSeo = async () => {
      const { data } = await supabase
        .from('seo_pages')
        .select('title, description')
        .eq('page', page)
        .eq('lang', language)
        .maybeSingle();

      if (!isActive) return;

      const title = data?.title?.trim() || fallbackTitle;
      const description = data?.description?.trim() || fallbackDescription;

      document.title = title;
      setMetaDescription(description);
    };

    loadSeo();

    return () => {
      isActive = false;
    };
  }, [page, language, fallbackTitle, fallbackDescription]);
}
