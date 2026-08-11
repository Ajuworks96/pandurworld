'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, initGSAP } from '@/lib/animations/gsapSetup';
import { ArrowRight } from 'lucide-react';

export function ColorBlockCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGSAP();
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Large text character split reveal (Oreo.com big CTA style)
      gsap.fromTo(
        section.querySelectorAll('.cta-char'),
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          stagger: 0.025,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: { trigger: section, start: 'top 78%' },
        }
      );

      gsap.fromTo(
        section.querySelectorAll('.cta-line'),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        section.querySelectorAll('.cta-btn'),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const bigText1 = 'ORDER';
  const bigText2 = 'A FRESH BATCH.';

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden border-t border-pandur-border/40"
      style={{ background: 'linear-gradient(135deg, #130B07 0%, #1C0F09 50%, #0A0503 100%)' }}
    >
      {/* Large decorative background circle */}
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-pandur-accent/10 pointer-events-none" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-pandur-accent/8 pointer-events-none" />
      <div className="absolute right-24 top-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-pandur-accent/15 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-8xl mx-auto px-6 md:px-12">
        {/* Massive Oreo.com-style outlined giant typography */}
        <div className="mb-10 overflow-hidden">
          <div className="overflow-hidden mb-1">
            <p className="font-display font-black text-[clamp(56px,12vw,160px)] leading-[0.88] tracking-tighter uppercase text-pandur-cream">
              {bigText1.split('').map((char, i) => (
                <span key={i} className="cta-char inline-block" style={{ display: 'inline-block' }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </p>
          </div>
          <div className="overflow-hidden">
            <p className="font-display font-black text-[clamp(32px,7vw,96px)] leading-[0.88] tracking-tighter uppercase text-transparent"
              style={{ WebkitTextStroke: '2px #E58A38' }}>
              {bigText2.split('').map((char, i) => (
                <span key={i} className="cta-char inline-block" style={{ display: 'inline-block' }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Divider lines */}
        <div className="cta-line h-px bg-pandur-border/80 mb-8 origin-left" />

        {/* Sub-row: tagline + CTAs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <p className="font-sans text-base text-pandur-creamMuted max-w-md leading-relaxed cta-btn">
            Hand-baked in small batches. Delivered to your door within 48 hours of leaving our atelier.
            <span className="block mt-1 text-pandur-accent font-medium text-sm">Minimum order: 6 cookies.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 cta-btn">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-pandur-accent text-pandur-bg font-display font-black text-sm uppercase tracking-wider hover:bg-pandur-cream transition-colors shadow-xl shadow-pandur-accent/20"
            >
              ORDER NOW
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/wholesale"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-pandur-cream/60 text-pandur-cream font-display font-bold text-sm uppercase tracking-wider hover:border-pandur-accent hover:text-pandur-accent transition-colors"
            >
              GIFT A BOX
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Second divider */}
        <div className="cta-line h-px bg-pandur-border/80 mt-8 origin-left" />

        {/* Trust badges row */}
        <div className="mt-6 flex flex-wrap items-center gap-6 cta-btn">
          {['36-HOUR AGED DOUGH', 'SINGLE-ORIGIN COCOA', 'ZERO PRESERVATIVES', 'FRESHNESS GUARANTEED'].map((badge) => (
            <span key={badge} className="font-display font-bold text-[10px] uppercase tracking-widest text-pandur-creamMuted/60 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pandur-accent" />
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
