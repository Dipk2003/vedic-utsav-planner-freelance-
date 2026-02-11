import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    page: 'rituals-events',
    path: '/rituals-events',
    title: 'Rituals Events Planning | VaidikUtsav',
    description:
      'Traditional rituals planning for gawan, puja ceremonies, and sacred events with authentic decor and coordination.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1dd595e1d-1764787541163.png',
  });
}

export default function RitualsEventsLayout({ children }: { children: ReactNode }) {
  return children;
}
