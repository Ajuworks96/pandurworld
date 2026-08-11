'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { ProductCard } from './ProductCard';
import { TextReveal } from '../animations/TextReveal';
import { gsap, initGSAP } from '@/lib/animations/gsapSetup';

export function HorizontalProductDiscovery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGSAP();
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const isDesktop = window.innerWidth >= 1024;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isDesktop || prefersReduced) return;

    const ctx = gsap.context(() => {
      const totalWidth = container.scrollWidth - window.innerWidth + 120;

      gsap.to(container, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-pandur-bg py-16 lg:py-24 overflow-hidden border-t border-pandur-border/40 min-h-[100svh] flex flex-col justify-center"
    >
      {/* Section Header */}
      <div className="max-w-8xl mx-auto px-6 md:px-12 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
        <div>
          <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-2">
            <span>ARTISANAL CREATIONS</span>
          </div>
          <TextReveal
            as="h2"
            text="DISCOVER THE COLLECTION"
            highlightText="COLLECTION"
            className="font-display font-black text-4xl sm:text-6xl text-pandur-cream uppercase tracking-tight leading-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <p className="font-sans text-xs text-pandur-creamMuted max-w-sm hidden md:block">
            Drag, scroll or swipe to explore our limited-run 36-hour matured artisanal cookie profiles.
          </p>
          <Link
            href="/collections"
            className="group inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-wider text-pandur-accent hover:text-pandur-cream transition-colors"
          >
            <span>VIEW ALL ({PRODUCTS.length})</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Horizontal Cards Track */}
      <div className="w-full overflow-x-auto lg:overflow-hidden no-scrollbar py-4">
        <div
          ref={containerRef}
          className="flex gap-6 md:gap-8 px-6 md:px-12 w-max items-stretch"
        >
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="w-[84vw] sm:w-[380px] lg:w-[420px] flex-shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}

          {/* Wholesale Callout Card */}
          <div className="w-[84vw] sm:w-[320px] lg:w-[360px] flex-shrink-0 bg-pandur-card/60 border border-dashed border-pandur-accent/40 rounded-3xl p-8 flex flex-col justify-between items-center text-center">
            <div className="w-14 h-14 rounded-full bg-pandur-accent/10 border border-pandur-accent/30 flex items-center justify-center text-pandur-accent my-auto font-display font-bold text-lg">
              B2B
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-pandur-cream uppercase tracking-tight mb-2">
                WANT CUSTOM BATCHES?
              </h3>
              <p className="font-sans text-xs text-pandur-creamMuted mb-6">
                Explore our wholesale program for bespoke corporate events, hotel amenities, and cafe supply.
              </p>
              <Link
                href="/wholesale"
                className="inline-block w-full py-3 rounded-full bg-pandur-accent text-pandur-bg font-display font-bold text-xs uppercase tracking-wider hover:bg-pandur-accentDark transition-colors"
              >
                WHOLESALE ENQUIRY
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
