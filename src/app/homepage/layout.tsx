import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    page: 'homepage',
    path: '/homepage',
    title: 'Event Planner in Delhi, Greater Noida & Varanasi | VaidikUtsav',
    description:
      'VaidikUtsav is an event planner in Delhi, Greater Noida, and Varanasi for weddings, corporate events, birthdays, and social celebrations.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11334a259-1766988518820.png',
  });
}

export default function HomepageLayout({ children }: { children: ReactNode }) {
  return children;
}
