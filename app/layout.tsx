import type { Metadata } from 'next';
import { getPublicSiteUrl } from '../lib/site-url';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css';

const siteUrl = getPublicSiteUrl();
const title = 'Librería Daisy | Librería en Recoleta, CABA';
const description =
  'Librería escolar y de oficina en Recoleta, CABA. Fotocopias, impresiones, anillados, textos escolares, sellos, embalaje y formularios automotor.';

export const metadata: Metadata = {
  applicationName: 'Librería Daisy',
  title,
  description,
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(siteUrl ?? 'http://localhost:3000'),
  ...(siteUrl
    ? {
        alternates: {
          canonical: siteUrl,
        },
      }
    : {}),
  openGraph: {
    title,
    description,
    siteName: 'Librería Daisy',
    locale: 'es_AR',
    type: 'website',
    ...(siteUrl ? { url: siteUrl } : {}),
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Librería Daisy - Un montón de ideas, cerquita tuyo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.jpg'],
  },
};

const businessStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Librería Daisy',
  description,
  ...(siteUrl ? { url: siteUrl.toString() } : {}),
  telephone: '+54 11 5763-3750',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Las Heras 2444',
    addressLocality: 'Recoleta',
    addressRegion: 'CABA',
    addressCountry: 'AR',
  },
  sameAs: ['https://www.instagram.com/libreriadaisy_/'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessStructuredData).replace(/</g, '\\u003c'),
          }}
        />
        {children}
      </body>
    </html>
  );
}
