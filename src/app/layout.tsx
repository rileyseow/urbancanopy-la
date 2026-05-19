import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Providers from '@/app/providers';

import 'maplibre-gl/dist/maplibre-gl.css';
import './globals.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'UrbanCanopy LA',
  description:
    'Real-time geospatial map for analyzing car-free accessible urban spaces across Los Angeles.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
