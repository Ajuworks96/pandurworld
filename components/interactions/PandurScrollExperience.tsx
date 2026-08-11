'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { gsap, initGSAP } from '@/lib/animations/gsapSetup';

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────────────────────────────────────── */

export interface ProductVisual {
  id: string;
  name: string;
  tag: string;
  image: string;
  accent: string;
  layer: 'background' | 'midground' | 'foreground';
  // Direction vectors for Phase 2 entry
  entryDir: { x: number; y: number };
  // Target position on desktop canvas (% of viewport)
  targetPos: { left: number; top: number };
  // Target position on mobile canvas (%)
  mobilePos?: { left: number; top: number };
  sizeDesktop: number;
  sizeMobile: number;
  rotationTarget: number;
  blurPx?: number;
}

const CAMPAIGN_PRODUCTS: ProductVisual[] = [
  {
    id: 'double-dark',
    name: 'Double Dark Cocoa',
    tag: '70% ECUADORIAN',
    image: '/images/products/pandur-double-dark.png',
    accent: '#E58A38',
    layer: 'foreground',
    entryDir: { x: -60, y: -15 },
    targetPos: { left: 16, top: 22 },
    mobilePos: { left: 15, top: 15 },
    sizeDesktop: 220,
    sizeMobile: 110,
    rotationTarget: -6,
  },
  {
    id: 'salted-caramel',
    name: 'Salted Caramel Velvet',
    tag: 'STUFFED MOLTEN',
    image: '/images/products/pandur-salted-caramel.png',
    accent: '#D08830',
    layer: 'foreground',
    entryDir: { x: 60, y: -20 },
    targetPos: { left: 84, top: 25 },
    mobilePos: { left: 85, top: 18 },
    sizeDesktop: 210,
    sizeMobile: 105,
    rotationTarget: 5,
  },
  {
    id: 'pistachio-honey',
    name: 'Pistachio White Honey',
    tag: 'BRONTE PISTACHIO',
    image: '/images/products/pandur-pistachio-honey.png',
    accent: '#8AAA60',
    layer: 'midground',
    entryDir: { x: -20, y: -70 },
    targetPos: { left: 26, top: 72 },
    mobilePos: { left: 20, top: 82 },
    sizeDesktop: 190,
    sizeMobile: 95,
    rotationTarget: 7,
  },
  {
    id: 'vanilla-bean',
    name: 'Vanilla Bean Crunch',
    tag: 'MADAGASCAR CAVIAR',
    image: '/images/products/pandur-vanilla-bean.png',
    accent: '#D4A847',
    layer: 'midground',
    entryDir: { x: 25, y: 70 },
    targetPos: { left: 74, top: 70 },
    mobilePos: { left: 80, top: 80 },
    sizeDesktop: 180,
    sizeMobile: 90,
    rotationTarget: -4,
  },
  {
    id: 'ruby-berry',
    name: 'Ruby Berry Crumb',
    tag: 'WILD RASPBERRY',
    image: '/images/products/pandur-ruby-berry.png',
    accent: '#B03050',
    layer: 'background',
    entryDir: { x: -50, y: 50 },
    targetPos: { left: 10, top: 58 },
    sizeDesktop: 140,
    sizeMobile: 75,
    rotationTarget: -8,
    blurPx: 3,
  },
  {
    id: 'hazelnut-praline',
    name: 'Hazelnut Praline',
    tag: 'PIEDMONT IGP',
    image: '/images/products/pandur-hazelnut-praline.png',
    accent: '#B07840',
    layer: 'background',
    entryDir: { x: 50, y: -50 },
    targetPos: { left: 88, top: 52 },
    sizeDesktop: 145,
    sizeMobile: 75,
    rotationTarget: 6,
    blurPx: 3,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

export function PandurSceneBackground({ children }: { children?: ReactNode }) {
  return (
    <div className="pandur-scene-bg absolute inset-0 z-0 overflow-hidden pointer-events-none origin-center"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 50% 45%, #180D07 0%, #0D0704 55%, #060302 100%)',
      }}
    >
      {/* Dynamic ambient central aura */}
      <div className="pandur-aura absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(229,138,56,0.25) 0%, rgba(180,85,15,0.12) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="absolute inset-0 bg-grain opacity-40 mix-blend-overlay" />
      {children}
    </div>
  );
}

export function PandurFloatingProduct({
  product,
  isMobile,
}: {
  product: ProductVisual;
  isMobile: boolean;
}) {
  const pos = isMobile && product.mobilePos ? product.mobilePos : product.targetPos;
  const size = isMobile ? product.sizeMobile : product.sizeDesktop;

  return (
    <div
      className={`pandur-floating-prod pandur-prod-${product.id} absolute pointer-events-auto cursor-pointer select-none`}
      style={{
        left: `${pos.left}%`,
        top: `${pos.top}%`,
        width: `${size}px`,
        height: `${size}px`,
        marginLeft: `-${size / 2}px`,
        marginTop: `-${size / 2}px`,
        zIndex: product.layer === 'foreground' ? 30 : product.layer === 'midground' ? 20 : 10,
        filter: !isMobile && product.blurPx ? `blur(${product.blurPx}px)` : undefined,
        transform: 'translate3d(0,0,0)',
      }}
    >
      <div
        className="relative w-full h-full rounded-full overflow-hidden transition-transform duration-500 hover:scale-110"
        style={{
          borderRadius: '50%',
          border: '1.5px solid rgba(229,138,56,0.3)',
          boxShadow: '0 16px 45px rgba(0,0,0,0.85)',
          background: '#120A06',
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes={`${size}px`}
        />
        <div className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background: 'radial-gradient(circle, transparent 45%, rgba(0,0,0,0.55) 100%)',
          }}
        />
      </div>
    </div>
  );
}

export function PandurHeroProduct() {
  return (
    <div className="pandur-hero-product absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
      style={{
        width: 'clamp(240px, 30vw, 420px)',
        height: 'clamp(240px, 30vw, 420px)',
        transform: 'translate3d(-50%, -50%, 0)',
      }}
    >
      <div className="pandur-hero-halo absolute inset-[-25px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(229,138,56,0.45) 0%, rgba(200,90,20,0.22) 45%, transparent 70%)',
          filter: 'blur(25px)',
          animation: 'pulse-slow 4s ease-in-out infinite',
        }}
      />

      <div className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          borderRadius: '50%',
          border: '3px solid rgba(229,138,56,0.75)',
          boxShadow: '0 30px 85px rgba(0,0,0,0.95), 0 0 70px rgba(229,138,56,0.35)',
          background: '#160D08',
        }}
      >
        <Image
          src="/images/products/pandur-double-dark.png"
          alt="Pandur Signature Master Cookie"
          fill
          className="object-cover"
          priority
          sizes="420px"
        />
        <div className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.45) 100%)',
          }}
        />
      </div>

      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full border border-pandur-accent/80 bg-pandur-bg/90 shadow-xl backdrop-blur-md">
        <span className="font-display font-black text-[10px] uppercase tracking-[0.25em] text-pandur-accent flex items-center gap-1.5">
          <Sparkles size={11} className="animate-spin" style={{ animationDuration: '6s' }} />
          SIGNATURE 36-HOUR AGED MASTER BATCH
        </span>
      </div>
    </div>
  );
}

export function PandurExperienceTitle() {
  return (
    <div className="pandur-exp-title absolute left-1/2 top-[22%] -translate-x-1/2 -translate-y-1/2 z-50 text-center px-4 w-full max-w-5xl pointer-events-none">
      <span className="pandur-title-badge font-display font-bold text-[11px] uppercase tracking-[0.3em] text-pandur-accent block mb-3">
        PANDUR WORLD · CAMPAIGN COLLECTION
      </span>

      {/* Clean full line height title block — NO overflow clipping cutoffs */}
      <h2 className="font-display font-black uppercase tracking-tighter leading-tight sm:leading-none text-pandur-cream">
        <span className="block py-0.5">
          <span className="pandur-title-line inline-block" style={{ fontSize: 'clamp(28px, 6.5vw, 92px)' }}>
            DISCOVER THE
          </span>
        </span>
        <span className="block py-0.5">
          <span
            className="pandur-title-line inline-block text-transparent"
            style={{
              fontSize: 'clamp(28px, 6.5vw, 92px)',
              WebkitTextStroke: '2px #E58A38',
            }}
          >
            PANDUR WORLD
          </span>
        </span>
        <span className="block py-0.5">
          <span className="pandur-title-line inline-block text-pandur-accent" style={{ fontSize: 'clamp(26px, 5.5vw, 80px)' }}>
            COLLECTION
          </span>
        </span>
      </h2>

      <p className="pandur-title-sub font-sans text-xs sm:text-sm text-pandur-creamMuted/80 max-w-md mx-auto mt-4 tracking-wider uppercase">
        Hand-crafted with 70% Ecuadorian Single-Origin Cocoa & French Cultured Butter
      </p>
    </div>
  );
}

export function PandurExperienceCTA() {
  return (
    <div className="pandur-exp-cta absolute left-1/2 bottom-[8%] -translate-x-1/2 z-50 text-center pointer-events-auto">
      <Link
        href="/collections"
        className="group inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-pandur-accent text-pandur-bg font-display font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-pandur-cream transition-all shadow-2xl shadow-pandur-accent/30 hover:scale-105 active:scale-95"
      >
        <span>EXPLORE COLLECTION</span>
        <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN ORCHESTRATOR COMPONENT: PandurScrollExperience
───────────────────────────────────────────────────────────────────────────── */

export function PandurScrollExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    initGSAP();
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const floatingProds = Array.from(container.querySelectorAll<HTMLElement>('.pandur-floating-prod'));
      const heroProd = container.querySelector<HTMLElement>('.pandur-hero-product');
      const titleLines = Array.from(container.querySelectorAll<HTMLElement>('.pandur-title-line'));

      if (isMobile || prefersReducedMotion) {
        // MOBILE & REDUCED MOTION: Clean static/scroll reveal layout (NO locking, NO clipping)
        gsap.set('.pandur-scene-bg', { opacity: 1, scale: 1 });
        gsap.set(floatingProds, { opacity: 1, scale: 1, x: 0, y: 0 });
        if (heroProd) gsap.set(heroProd, { opacity: 1, scale: 1 });
        gsap.set('.pandur-title-badge', { opacity: 1 });
        gsap.set(titleLines, { opacity: 1, y: 0 });
        gsap.set('.pandur-title-sub', { opacity: 1 });
        gsap.set('.pandur-exp-cta', { opacity: 1, y: 0 });

        // Simple smooth entrance on scroll for mobile
        gsap.fromTo(container,
          { opacity: 0, y: 25 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 75%' }
          }
        );
        return;
      }

      /* ─────────────────────────────────────────────────────────────────────────────
         DESKTOP PINNED SCROLL ANIMATION
      ───────────────────────────────────────────────────────────────────────────── */

      // Dynamically set initial state for desktop scrub animation
      floatingProds.forEach((el, idx) => {
        const prod = CAMPAIGN_PRODUCTS[idx];
        if (!prod) return;
        gsap.set(el, {
          x: `${prod.entryDir.x}vw`,
          y: `${prod.entryDir.y}vh`,
          opacity: 0,
          scale: 0.6,
          rotation: prod.rotationTarget * 2,
        });
      });

      if (heroProd) {
        gsap.set(heroProd, { opacity: 0, scale: 0.5 });
      }

      gsap.set('.pandur-title-badge', { opacity: 0 });
      gsap.set(titleLines, { opacity: 0, y: 40 });
      gsap.set('.pandur-title-sub', { opacity: 0 });
      gsap.set('.pandur-exp-cta', { opacity: 0, y: 20 });

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.0,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* Phase 01: Background & Aura */
      mainTl
        .to('.pandur-scene-bg', { scale: 1, opacity: 1, duration: 0.2, ease: 'power2.out' }, 0)
        .to('.pandur-aura', { scale: 1.2, opacity: 1, duration: 0.2, ease: 'power2.out' }, 0);

      /* Phase 02: Floating products enter from directions */
      floatingProds.forEach((el, idx) => {
        const prod = CAMPAIGN_PRODUCTS[idx];
        if (!prod) return;

        mainTl.to(el, {
          x: 0, y: 0, opacity: 1, scale: 1, rotation: prod.rotationTarget,
          duration: 0.25, ease: 'power3.out',
        }, 0.20 + (idx % 3) * 0.04);
      });

      /* Phase 03: Depth composition */
      floatingProds.forEach((el, idx) => {
        const prod = CAMPAIGN_PRODUCTS[idx];
        if (!prod) return;

        const depthShiftX = (idx % 2 === 0 ? 1 : -1) * (12 + idx * 4);
        const depthShiftY = (idx % 3 === 0 ? -1 : 1) * (10 + idx * 3);

        mainTl.to(el, {
          x: depthShiftX, y: depthShiftY, rotation: prod.rotationTarget * 1.2,
          duration: 0.20, ease: 'sine.inOut',
        }, 0.45);
      });

      /* Phase 04: Central Hero Product emerges */
      if (heroProd) {
        mainTl.to(heroProd, {
          scale: 1.15, opacity: 1, rotation: 0, duration: 0.20, ease: 'back.out(1.4)',
        }, 0.65);
      }

      floatingProds.forEach((el, idx) => {
        const prod = CAMPAIGN_PRODUCTS[idx];
        if (!prod) return;

        const isLeft = prod.targetPos.left < 50;
        const isTop = prod.targetPos.top < 50;
        const pushX = (isLeft ? -1 : 1) * (40 + (idx % 3) * 15);
        const pushY = (isTop ? -1 : 1) * (30 + (idx % 2) * 15);

        mainTl.to(el, {
          x: pushX, y: pushY, scale: 0.85, opacity: 0.75, duration: 0.20, ease: 'power2.out',
        }, 0.65);
      });

      /* Phase 05: Typography & CTA reveal */
      mainTl
        .to('.pandur-title-badge', { opacity: 1, duration: 0.05 }, 0.82)
        .to(titleLines, { opacity: 1, y: 0, stagger: 0.04, duration: 0.12, ease: 'power3.out' }, 0.84)
        .to('.pandur-title-sub', { opacity: 1, duration: 0.06 }, 0.90)
        .to('.pandur-exp-cta', { opacity: 1, y: 0, duration: 0.08, ease: 'back.out(1.5)' }, 0.92);

    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  const visibleProducts = isMobile
    ? CAMPAIGN_PRODUCTS.slice(0, 4)
    : CAMPAIGN_PRODUCTS;

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] overflow-hidden bg-[#060302] text-pandur-cream"
    >
      <div
        ref={containerRef}
        className="relative w-full h-[100svh] overflow-hidden flex flex-col items-center justify-center"
      >
        <PandurSceneBackground />

        {visibleProducts.map((prod) => (
          <PandurFloatingProduct key={prod.id} product={prod} isMobile={isMobile} />
        ))}

        <PandurHeroProduct />
        <PandurExperienceTitle />
        <PandurExperienceCTA />
      </div>
    </section>
  );
}
