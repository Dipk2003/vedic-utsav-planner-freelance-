import { MetadataRoute } from 'next';
import { createServerClient } from '@/lib/supabase/server';
import { getBaseUrl } from '@/lib/site-url';

const STATIC_PATHS = [
  '/',
  '/homepage',
  '/weddings',
  '/birthday-parties',
  '/kitty-party',
  '/corporate-events',
  '/education-events',
  '/rituals-events',
  '/blog',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));

  let blogEntries: MetadataRoute.Sitemap = [];

  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, created_at')
      .eq('status', 'published');

    blogEntries =
      data?.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updated_at
          ? new Date(post.updated_at)
          : post.created_at
            ? new Date(post.created_at)
            : now,
      })) ?? [];
  } catch {
    blogEntries = [];
  }

  return [...staticEntries, ...blogEntries];
}
