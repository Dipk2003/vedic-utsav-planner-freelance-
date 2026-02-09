'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useLanguage } from '@/lib/i18n';

export function useSiteContent(keys: string[]) {
  const { language } = useLanguage();
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!keys.length) return;
      const { data } = await supabase
        .from('site_content')
        .select('key, value')
        .in('key', keys)
        .eq('lang', language);

      if (!active) return;

      const next: Record<string, string> = {};
      (data || []).forEach((item) => {
        next[item.key] = item.value;
      });
      setContent(next);
    };

    load();

    return () => {
      active = false;
    };
  }, [language, keys.join('|')]);

  return content;
}
