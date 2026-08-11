'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { gsap, initGSAP } from '@/lib/animations/gsapSetup';
import { MagneticButton } from '../interactions/MagneticButton';
import { TextReveal } from '../animations/TextReveal';
import { FloatingParticles } from '../ui/FloatingParticles';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGSAP();
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Section 11: Hero Entry Timeline (Layered Reveal)
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Layer 1: Background scale 1.05 -> 1
        tl.fromTo(bgRef.current, { scale: 1.05, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 }, 0)
          // Layer 2: Hero Cookie scale 0.92 -> 1, opacity 0 -> 1, rotation -3deg -> 0deg
          .fromTo(productRef.current, { scale: 0.92, opacity: 0, rotation: -3, y: 30 }, { scale: 1, opacity: 1, rotation: 0, y: 0, duration: 1.1 }, 0.1)
          .fromTo(subtextRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.4)
          .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.55)
          .fromTo(scrollIndRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.7);

        // Section 12: Hero Scroll Transformation (Multi-layer Parallax)
        // Hero Cookie: scale 1 -> 1.08, translateY 0 -> -40px, rotation 0 -> 3deg
        gsap.to(productRef.current, {
          scale: 1.08,
          y: -40,
          rotation: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });

        // Layer 1 Background: Slower parallax
        gsap.to(bgRef.current, {
          y: -15,
          scale: 0.98,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });

        // Layer 3 Foreground Particles: Faster parallax
        if (foregroundRef.current) {
          gsap.to(foregroundRef.current, {
            y: -70,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
            },
          });
        }
      } else {
        gsap.set([bgRef.current, productRef.current, subtextRef.current, ctaRef.current, scrollIndRef.current], {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
        });
      }
    }, container);

    // Desktop Mouse Parallax (Lerped)
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouch && !prefersReducedMotion && productRef.current) {
      const prodEl = productRef.current;
      const xTo = gsap.quickTo(prodEl, 'x', { duration: 0.6, ease: 'power2.out' });
      const yTo = gsap.quickTo(prodEl, 'y', { duration: 0.6, ease: 'power2.out' });
      const rotTo = gsap.quickTo(prodEl, 'rotation', { duration: 0.6, ease: 'power2.out' });

      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const mouseX = (e.clientX / innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / innerHeight - 0.5) * 2;

        xTo(mouseX * 20);
        yTo(mouseY * 20);
        rotTo(mouseX * 4);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-pandur-bg pt-20 pb-12"
    >
      {/* LAYER 1: Background Controlled Atmospheric Environment */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-tr from-pandur-accent/20 via-pandur-accent/5 to-transparent rounded-full blur-[160px]" />
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-pandur-berry/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
      </div>

      {/* LAYER 3: Foreground Floating Particles & Depth of Field Particles */}
      <div ref={foregroundRef} className="absolute inset-0 pointer-events-none z-20">
        <FloatingParticles count={24} />
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100svh-120px)]">
        {/* Left Column: Staggered Floating Letter Headline & Content */}
        <div className="lg:col-span-7 flex flex-col justify-center pt-8 lg:pt-0 text-center lg:text-left">
          <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-pandur-accent font-display font-bold text-xs md:text-sm uppercase tracking-widest mb-4">
            <span>ARTISANAL 36-HOUR AGED COOKIES</span>
          </div>

          {/* Oreo.com Staggered Floating Letter Headline */}
          <div className="mb-6">
            <TextReveal
              as="h1"
              text="WELCOME TO PANDUR WORLD."
              highlightText="PANDUR"
              className="font-display font-black text-5xl sm:text-7xl xl:text-8xl text-pandur-cream uppercase tracking-tighter leading-[0.9]"
            />
          </div>

          <p
            ref={subtextRef}
            className="font-sans text-base sm:text-xl text-pandur-creamMuted max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
          >
            A little world made of cookies. Slow-baked with single-origin Ecuadorian cocoa, grass-fed French cultured butter, and unyielding culinary passion.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <MagneticButton href="/collections" variant="primary" dataCursor="DISCOVER">
              EXPLORE COLLECTION
            </MagneticButton>

            <MagneticButton href="/wholesale" variant="outline" dataCursor="B2B">
              WHOLESALE ENQUIRY
            </MagneticButton>
          </div>
        </div>

        {/* LAYER 2: Hero Levitating Cookie (Commercial Campaign Visual) */}
        <div className="lg:col-span-5 flex items-center justify-center relative z-10">
          <div
            ref={productRef}
            className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] select-none"
            data-cursor="PANDUR COOKIE"
          >
            {/* Studio Rim Light Halo Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pandur-accent/30 via-pandur-berry/15 to-transparent blur-3xl" />
            
            <Image
              src="/images/hero/hero-cookie.png"
              alt="Pandur World Commercial Campaign Hero Cookie"
              fill
              priority
              className="object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.95)] transition-transform duration-300"
              sizes="(max-width: 768px) 350px, 600px"
            />
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        ref={scrollIndRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-display font-bold text-[10px] uppercase tracking-widest text-pandur-creamMuted/70">
          SCROLL TO EXPLORE
        </span>
        <ChevronDown size={18} className="text-pandur-accent animate-bounce" />
      </div>
    </section>
  );
}
