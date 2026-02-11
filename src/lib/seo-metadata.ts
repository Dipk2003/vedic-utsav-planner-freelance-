import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase/server';
import { getBaseUrl } from '@/lib/site-url';

type SeoConfig = {
  page: string;
  path: string;
  title: string;
  description: string;
  image?: string;
};

export async function buildPageMetadata(config: SeoConfig): Promise<Metadata> {
  const lang = cookies().get('lang')?.value === 'hi' ? 'hi' : 'en';
  let title = config.title;
  let description = config.description;

  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from('seo_pages')
      .select('title, description')
      .eq('page', config.page)
      .eq('lang', lang)
      .maybeSingle();

    if (data?.title?.trim()) {
      title = data.title.trim();
    }
    if (data?.description?.trim()) {
      description = data.description.trim();
    }
  } catch {
    // Keep fallback metadata when SEO table isn't reachable.
  }

  const baseUrl = getBaseUrl();
  const url = new URL(config.path, baseUrl).toString();
  const images = config.image
    ? [
        {
          url: config.image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: config.image ? [config.image] : undefined,
    },
  };
}
