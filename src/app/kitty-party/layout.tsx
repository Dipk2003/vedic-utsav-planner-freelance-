import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    page: 'kitty-party',
    path: '/kitty-party',
    title: 'Kitty Party & Social Events | VaidikUtsav',
    description: 'Elegant kitty parties and social gatherings with curated themes and experiences.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f16f95ad-1769313630218.png',
  });
}

export default function KittyPartyLayout({ children }: { children: ReactNode }) {
  return children;
}
