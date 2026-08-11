import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { PageTransition } from '@/components/layout/PageTransition';
import { LenisProvider } from '@/components/layout/LenisProvider';

export const metadata: Metadata = {
  title: 'PANDUR WORLD — Premium Artisanal Cookie Experience',
  description: 'Enter Pandur World: an editorial cookie brand experience. Crafting 36-hour aged artisanal cookies with single-origin Ecuadorian dark cocoa.',
  openGraph: {
    title: 'PANDUR WORLD — Premium Artisanal Cookie Experience',
    description: 'A little world made of cookies. Slow-baked with single-origin cocoa and grass-fed French butter.',
    url: 'https://pandurworld.com',
    siteName: 'Pandur World',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-pandur-bg text-pandur-cream min-h-screen antialiased selection:bg-pandur-accent selection:text-pandur-bg">
        <LenisProvider>
          <CustomCursor />
          <Header />
          <main className="relative z-10">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
