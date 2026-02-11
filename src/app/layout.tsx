import React from 'react';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '../styles/index.css';
import Chatbot from '@/components/common/Chatbot';
import { LanguageProvider } from '@/lib/i18n';
import { getBaseUrl } from '@/lib/site-url';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const siteUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'VaidikUtsav | Premium Event Planning',
  description: 'Plan weddings, corporate events, birthdays, and social gatherings in Delhi, Greater Noida, and Varanasi.',
  keywords: [
    'event planner in delhi',
    'event planner in greater noida',
    'event planner in varanasi',
    'corporate event planner in delhi',
    'corporate event planner in greater noida',
    'corporate event planner in varanasi',
    'event management company in delhi',
    'event management company in greater noida',
    'event management company in varanasi',
  ],
  verification: {
    google: 'HXWZ3P8ckAWhrHUmUMatdeNYrGhoAl9AYAnES4DHbsc',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
  openGraph: {
    title: 'VaidikUtsav | Premium Event Planning',
    description:
      'Plan weddings, corporate events, birthdays, and social gatherings in Delhi, Greater Noida, and Varanasi.',
    url: siteUrl,
    siteName: 'VaidikUtsav',
    type: 'website',
    images: [
      {
        url: 'https://img.rocket.new/generatedImages/rocket_gen_img_11334a259-1766988518820.png',
        width: 1200,
        height: 630,
        alt: 'VaidikUtsav event planning showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VaidikUtsav | Premium Event Planning',
    description:
      'Plan weddings, corporate events, birthdays, and social gatherings in Delhi, Greater Noida, and Varanasi.',
    images: ['https://img.rocket.new/generatedImages/rocket_gen_img_11334a259-1766988518820.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const enableGoogleAnalytics =
    !!gaMeasurementId && gaMeasurementId !== 'your-google-analytics-id-here';

  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
          <Chatbot />
        </LanguageProvider>
        {enableGoogleAnalytics && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2FVaidikUtsav2254back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.17" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
      </body>
    </html>
  );
}

