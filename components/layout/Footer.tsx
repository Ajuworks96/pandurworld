'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Marquee } from '../interactions/Marquee';
import { MagneticButton } from '../interactions/MagneticButton';

export function Footer() {
  const footerMarqueeItems = [
    'GOOD COOKIES',
    'GOOD MOMENTS',
    'ARTISANAL CRAFT',
    'PANDUR WORLD',
    'GOOEY CENTERS',
    '36-HOUR AGED'
  ];

  return (
    <footer className="relative bg-pandur-card border-t border-pandur-border/80 pt-20 pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pandur-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Marquee Banner */}
      <div className="border-y border-pandur-border/40 my-8 py-2 bg-pandur-bg/40">
        <Marquee items={footerMarqueeItems} speed="slow" direction="left" />
      </div>

      <div className="max-w-8xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 pt-12">
        {/* Brand Statement */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <Link href="/" className="inline-block font-display font-black text-3xl tracking-tighter text-pandur-cream mb-6">
              PANDUR<span className="text-pandur-accent">.</span>WORLD
            </Link>
            <h2 className="font-display font-black text-3xl md:text-5xl text-pandur-cream uppercase tracking-tight leading-none mb-6">
              A LITTLE WORLD <br />
              MADE OF <span className="text-pandur-accent italic">COOKIES.</span>
            </h2>
            <p className="text-pandur-creamMuted text-sm md:text-base max-w-md font-sans leading-relaxed mb-8">
              Pandur World is an editorial cookie brand experience. We craft artisanal 36-hour aged cookies for discerning taste buds, luxury boutique cafes, and corporate gifts.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <MagneticButton href="/wholesale" variant="primary" dataCursor="B2B">
              BECOME A WHOLESALE PARTNER
            </MagneticButton>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="md:col-span-3">
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-6">
            DISCOVERY
          </h4>
          <ul className="space-y-4 font-sans text-sm">
            {[
              { label: 'Home Experience', href: '/' },
              { label: 'Our Story & Craft', href: '/about' },
              { label: 'Artisanal Collection', href: '/collections' },
              { label: 'Flavour Journal', href: '/blog' },
              { label: 'Wholesale B2B', href: '/wholesale' },
              { label: 'Frequently Asked', href: '/faqs' },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-2 text-pandur-creamMuted hover:text-pandur-cream transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pandur-accent/40 group-hover:bg-pandur-accent group-hover:scale-150 transition-all" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Details */}
        <div className="md:col-span-4">
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-6">
            ATELIER & ENQUIRIES
          </h4>
          <div className="space-y-4 font-sans text-sm text-pandur-creamMuted">
            <p>Pandur World Culinary Atelier<br />42 Artisan Way, Soho District<br />London & New York</p>
            <p className="text-pandur-cream font-medium">atelier@pandurworld.com</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-8xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-pandur-border/40 flex flex-col md:flex-row items-center justify-between text-xs text-pandur-creamMuted font-sans gap-4">
        <p>© {new Date().getFullYear()} Pandur World Inc. All Rights Reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/faqs" className="hover:text-pandur-cream transition-colors">Privacy & Terms</Link>
          <Link href="/contact" className="hover:text-pandur-cream transition-colors">Accessibility</Link>
          <Link href="/wholesale" className="hover:text-pandur-cream transition-colors">Wholesale Portal</Link>
        </div>
      </div>
    </footer>
  );
}
