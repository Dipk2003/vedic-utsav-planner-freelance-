import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    page: 'corporate-events',
    path: '/corporate-events',
    title: 'Corporate Event Planner in Delhi, Greater Noida & Varanasi | VaidikUtsav',
    description:
      'Corporate event planner in Delhi, Greater Noida, and Varanasi for conferences, product launches, offsites, and hybrid events.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11c8db986-1766988519257.png',
  });
}

export default function CorporateEventsLayout({ children }: { children: ReactNode }) {
  return children;
}
