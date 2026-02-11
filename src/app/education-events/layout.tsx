import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    page: 'education-events',
    path: '/education-events',
    title: 'Education Events Planning | VaidikUtsav',
    description:
      'Education events planning for award functions, education fairs, and education hunt events with smooth execution.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_136802daf-1769722235011.png',
  });
}

export default function EducationEventsLayout({ children }: { children: ReactNode }) {
  return children;
}
