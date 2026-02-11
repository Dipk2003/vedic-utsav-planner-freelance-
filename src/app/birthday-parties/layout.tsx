import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    page: 'birthday-parties',
    path: '/birthday-parties',
    title: 'Birthday Party Planning | VaidikUtsav',
    description: 'Themed birthday parties for kids and adults with custom decor and entertainment.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_15bd09b84-1767354295534.png',
  });
}

export default function BirthdayPartiesLayout({ children }: { children: ReactNode }) {
  return children;
}
