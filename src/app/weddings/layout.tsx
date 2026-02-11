import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    page: 'weddings',
    path: '/weddings',
    title: 'Wedding Planning in Delhi, Greater Noida, Varanasi | VaidikUtsav',
    description:
      'Full-service wedding planning with traditional ceremonies, premium decor, and flawless execution.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1627156b4-1766429109564.png',
  });
}

export default function WeddingsLayout({ children }: { children: ReactNode }) {
  return children;
}
