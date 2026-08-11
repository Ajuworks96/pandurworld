'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, initGSAP } from '@/lib/animations/gsapSetup';
import { MagneticButton } from './MagneticButton';
import { TextReveal } from '../animations/TextReveal';

export function SignatureWorldReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cookieRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGSAP();
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Oreo.com Pinned Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // 1. Giant Background Text floating expansion
      tl.fromTo(
        bgTextRef.current,
        { scale: 0.85, opacity: 0.15, y: 30 },
        { scale: 1.12, opacity: 0.45, y: -20, duration: 1 },
        0
      )
      // 2. Background-less PNG Cookie levitates, rotates & scales directly over background text
      .fromTo(
        cookieRef.current,
        { scale: 0.75, rotation: -12, y: 50 },
        { scale: 1.15, rotation: 8, y: -25, duration: 1.2 },
        0.1
      )
      // 3. Card reveal
      .fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.5
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] overflow-hidden bg-[#080503] flex items-center justify-center border-t border-pandur-border/40"
      data-cursor="ENTER WORLD"
    >
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-pandur-accent/20 blur-[160px] pointer-events-none" />

      {/* Giant Background Typography (Layered Behind Floating PNG Cookie) */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none"
      >
        <h2 className="font-display font-black text-6xl sm:text-9xl lg:text-[14rem] uppercase text-pandur-cream/25 tracking-tighter text-center leading-none">
          PANDUR <br /> UNIVERSE
        </h2>
      </div>

      {/* Background-less Levitating Transparent PNG Cookie (No Photo Frame Box) */}
      <div
        ref={cookieRef}
        className="relative z-10 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] select-none pointer-events-none drop-shadow-[0_40px_60px_rgba(0,0,0,0.95)]"
      >
        <Image
          src="/images/products/double-dark.png"
          alt="Pandur World Floating Signature Cookie"
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 350px, 600px"
        />
      </div>

      {/* Foreground Interactive Content Card */}
      <div
        ref={contentRef}
        className="absolute bottom-8 z-20 max-w-2xl mx-auto px-6 text-center flex flex-col items-center justify-center bg-pandur-card/90 border border-pandur-border/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl"
      >
        <div className="inline-flex items-center gap-2 text-pandur-accent font-display font-bold text-xs uppercase tracking-widest mb-3">
          <span>SIGNATURE WORLD EXPERIENCE</span>
        </div>

        <TextReveal
          as="h3"
          text="ENTER THE PANDUR WORLD."
          highlightText="PANDUR"
          className="font-display font-black text-2xl sm:text-4xl text-pandur-cream uppercase tracking-tight mb-3"
        />

        <p className="font-sans text-xs sm:text-sm text-pandur-creamMuted max-w-lg leading-relaxed mb-6">
          Where 36 hours of dough maturation meet single-origin Ecuadorian dark chocolate. Each cookie is a crafted portal into culinary ecstasy.
        </p>

        <MagneticButton href="/collections" variant="primary" dataCursor="EXPLORE">
          EXPLORE THE COLLECTION
        </MagneticButton>
      </div>
    </section>
  );
}
