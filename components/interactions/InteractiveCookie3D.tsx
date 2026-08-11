'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, initGSAP } from '@/lib/animations/gsapSetup';

export function InteractiveCookie3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cookieRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGSAP();
    const section = sectionRef.current;
    const cookie = cookieRef.current;
    if (!section || !cookie) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Headline stagger words
      gsap.fromTo(
        section.querySelectorAll('.story-word'),
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );

      if (!prefersReducedMotion) {
        // Scroll-scrubbed cookie split reveal (top half rises, bottom half drops, molten fill appears)
        const splitTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
          },
        });

        splitTl
          // Phase 1: Cookie entry scale in
          .fromTo(cookie, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2 }, 0)
          // Phase 2: Top half lifts up (cookie split)
          .to(topHalfRef.current, { y: -120, rotation: -8, ease: 'power2.inOut', duration: 0.35 }, 0.2)
          // Phase 2: Bottom half drops slightly
          .to(bottomHalfRef.current, { y: 80, rotation: 6, ease: 'power2.inOut', duration: 0.35 }, 0.2)
          // Phase 3: Molten filling reveal
          .fromTo(
            fillRef.current,
            { scaleY: 0, opacity: 0 },
            { scaleY: 1, opacity: 1, ease: 'elastic.out(1, 0.5)', duration: 0.3 },
            0.4
          )
          // Phase 4: Text fade in
          .fromTo(
            headlineRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.3 },
            0.55
          );
      }
    }, section);

    // Desktop mouse 3D tilt tracking
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouch && !prefersReducedMotion) {
      const xTo = gsap.quickTo(cookie, 'rotateY', { duration: 0.5, ease: 'power2.out' });
      const yTo = gsap.quickTo(cookie, 'rotateX', { duration: 0.5, ease: 'power2.out' });

      const handleMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        xTo(mx * 18);
        yTo(-my * 12);
      };

      const handleLeave = () => { xTo(0); yTo(0); };
      section.addEventListener('mousemove', handleMove);
      section.addEventListener('mouseleave', handleLeave);

      return () => {
        section.removeEventListener('mousemove', handleMove);
        section.removeEventListener('mouseleave', handleLeave);
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] bg-gradient-to-b from-[#0A0503] via-[#100806] to-[#0A0503] flex flex-col items-center justify-center overflow-hidden border-t border-pandur-border/40"
      style={{ perspective: '1000px' }}
    >
      {/* Atmospheric ambient glow behind cookie */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-pandur-accent/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pandur-berry/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Section label */}
      <span className="relative z-10 font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-6">
        THE INSIDE STORY
      </span>

      {/* 3D Cookie (split into top/bottom halves for scroll reveal) */}
      <div
        ref={cookieRef}
        className="relative z-10 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] mb-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Bottom Half */}
        <div ref={bottomHalfRef} className="absolute inset-0 overflow-hidden" style={{ clipPath: 'inset(50% 0 0 0)' }}>
          <Image
            src="/images/hero/hero-cookie.png"
            alt="Pandur cookie bottom"
            fill
            className="object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.95)]"
            sizes="500px"
            priority
          />
        </div>

        {/* Molten Filling revealed between halves */}
        <div
          ref={fillRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[28%] rounded-full overflow-hidden z-20 origin-center"
          style={{ opacity: 0, transform: 'scaleY(0)' }}
        >
          <div className="w-full h-full bg-gradient-to-r from-pandur-accent via-amber-400 to-pandur-accentDark rounded-full blur-sm animate-pulse" />
          <div className="absolute inset-1 bg-gradient-to-b from-amber-300 to-pandur-accent rounded-full opacity-80" />
        </div>

        {/* Top Half */}
        <div ref={topHalfRef} className="absolute inset-0 overflow-hidden" style={{ clipPath: 'inset(0 0 50% 0)' }}>
          <Image
            src="/images/hero/hero-cookie.png"
            alt="Pandur cookie top"
            fill
            className="object-contain drop-shadow-[0_-20px_40px_rgba(0,0,0,0.8)]"
            sizes="500px"
          />
        </div>
      </div>

      {/* Revealed text after split */}
      <div ref={headlineRef} className="relative z-10 text-center px-6 opacity-0">
        <h2 className="font-display font-black text-4xl sm:text-6xl text-pandur-cream uppercase tracking-tighter leading-none mb-4">
          36 HOURS OF <span className="text-pandur-accent italic">PURE CRAFT.</span>
        </h2>
        <p className="font-sans text-base text-pandur-creamMuted max-w-md mx-auto leading-relaxed">
          Every Pandur cookie begins as a cold dough rested 36 hours, developing deep caramel flavour notes before a single-flash bake unlocks that perfect molten center.
        </p>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-60">
        <span className="font-display font-bold text-[9px] uppercase tracking-widest text-pandur-creamMuted">SCROLL TO REVEAL</span>
        <div className="w-px h-10 bg-gradient-to-b from-pandur-accent/80 to-transparent" />
      </div>
    </section>
  );
}
