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
  // Direction vectors for Phase 2 entry (relative to target final pos)
  entryDir: { x: number; y: number }; // e.g. x: -50 (vw), y: -20 (vh)
  // Target position on desktop canvas (% of viewport)
  targetPos: { left: number; top: number };
  // Target position on mobile canvas (%)
  mobilePos?: { left: number; top: number };
  sizeDesktop: number; // px diameter
  sizeMobile: number;  // px diameter
  rotationTarget: number; // -8 to +8 deg
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
    entryDir: { x: -60, y: -15 }, // enters from FAR LEFT
    targetPos: { left: 16, top: 22 },
    mobilePos: { left: 18, top: 18 },
    sizeDesktop: 220,
    sizeMobile: 140,
    rotationTarget: -6,
  },
  {
    id: 'salted-caramel',
    name: 'Salted Caramel Velvet',
    tag: 'STUFFED MOLTEN',
    image: '/images/products/pandur-salted-caramel.png',
    accent: '#D08830',
    layer: 'foreground',
    entryDir: { x: 60, y: -20 }, // enters from FAR RIGHT
    targetPos: { left: 84, top: 25 },
    mobilePos: { left: 82, top: 22 },
    sizeDesktop: 210,
    sizeMobile: 130,
    rotationTarget: 5,
  },
  {
    id: 'pistachio-honey',
    name: 'Pistachio White Honey',
    tag: 'BRONTE PISTACHIO',
    image: '/images/products/pandur-pistachio-honey.png',
    accent: '#8AAA60',
    layer: 'midground',
    entryDir: { x: -20, y: -70 }, // enters from TOP
    targetPos: { left: 26, top: 72 },
    mobilePos: { left: 22, top: 76 },
    sizeDesktop: 190,
    sizeMobile: 120,
    rotationTarget: 7,
  },
  {
    id: 'vanilla-bean',
    name: 'Vanilla Bean Crunch',
    tag: 'MADAGASCAR CAVIAR',
    image: '/images/products/pandur-vanilla-bean.png',
    accent: '#D4A847',
    layer: 'midground',
    entryDir: { x: 25, y: 70 }, // enters from BOTTOM
    targetPos: { left: 74, top: 70 },
    mobilePos: { left: 78, top: 74 },
    sizeDesktop: 180,
    sizeMobile: 115,
    rotationTarget: -4,
  },
  {
    id: 'ruby-berry',
    name: 'Ruby Berry Crumb',
    tag: 'WILD RASPBERRY',
    image: '/images/products/pandur-ruby-berry.png',
    accent: '#B03050',
    layer: 'background',
    entryDir: { x: -50, y: 50 }, // enters DIAGONAL BOTTOM-LEFT
    targetPos: { left: 10, top: 58 },
    sizeDesktop: 140,
    sizeMobile: 90,
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
    entryDir: { x: 50, y: -50 }, // enters DIAGONAL TOP-RIGHT
    targetPos: { left: 88, top: 52 },
    sizeDesktop: 145,
    sizeMobile: 90,
    rotationTarget: 6,
    blurPx: 3,
  },
  {
    id: 'espresso-roast',
    name: 'Espresso Dark Roast',
    tag: 'ETHIOPIAN ARABICA',
    image: '/images/products/pandur-espresso-roast.png',
    accent: '#8B5030',
    layer: 'background',
    entryDir: { x: 0, y: -80 }, // enters TOP CENTER
    targetPos: { left: 50, top: 12 },
    sizeDesktop: 135,
    sizeMobile: 85,
    rotationTarget: 2,
    blurPx: 4,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   SUB-COMPONENTS (as requested by implementation architecture)
───────────────────────────────────────────────────────────────────────────── */

export function PandurSceneBackground({ children }: { children?: ReactNode }) {
  return (
    <div className="pandur-scene-bg absolute inset-0 z-0 overflow-hidden pointer-events-none origin-center"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 50% 45%, #180D07 0%, #0D0704 55%, #060302 100%)',
        transform: 'scale(0.96)',
        opacity: 0.7,
      }}
    >
      {/* Dynamic ambient central aura */}
      <div className="pandur-aura absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full pointer-events-none transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(229,138,56,0.25) 0%, rgba(180,85,15,0.12) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Fine golden grain texture */}
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

  // Render floating card with circle crop & subtle luxury border
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
        filter: product.blurPx ? `blur(${product.blurPx}px)` : undefined,
        transform: 'translate3d(0,0,0)',
      }}
    >
      {/* Outer ambient glow on hover */}
      <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 45px ${product.accent}60`,
        }}
      />

      {/* Circle Crop Container */}
      <div
        className="relative w-full h-full overflow-hidden transition-transform duration-500 hover:scale-108"
        style={{
          borderRadius: '50%',
          border: '1.5px solid rgba(229,138,56,0.25)',
          boxShadow: '0 16px 45px rgba(0,0,0,0.85), inset 0 0 20px rgba(0,0,0,0.4)',
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
        {/* Subtle inner shadow vignette */}
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
        width: 'clamp(280px, 32vw, 440px)',
        height: 'clamp(280px, 32vw, 440px)',
        transform: 'translate3d(-50%, -50%, 0) scale(0.5)',
        opacity: 0,
      }}
    >
      {/* Hero Radial Flare Halo */}
      <div className="pandur-hero-halo absolute inset-[-30px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(229,138,56,0.45) 0%, rgba(200,90,20,0.22) 45%, transparent 70%)',
          filter: 'blur(25px)',
          animation: 'pulse-slow 4s ease-in-out infinite',
        }}
      />

      {/* Master Hero Cookie Container */}
      <div className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          border: '3px solid rgba(229,138,56,0.65)',
          boxShadow: '0 35px 90px rgba(0,0,0,0.95), 0 0 80px rgba(229,138,56,0.35)',
          background: '#160D08',
        }}
      >
        <Image
          src="/images/hero/hero-cookie-transparent.png"
          alt="Pandur Signature Master Cookie"
          fill
          className="object-contain p-2"
          priority
          sizes="440px"
        />
        <div className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.45) 100%)',
          }}
        />
      </div>

      {/* Hero Badge Floating Pill */}
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
    <div className="pandur-exp-title absolute left-1/2 top-[22%] -translate-x-1/2 -translate-y-1/2 z-50 text-center px-6 w-full max-w-5xl pointer-events-none">
      <span className="pandur-title-badge font-display font-bold text-[11px] uppercase tracking-[0.3em] text-pandur-accent block mb-3 opacity-0">
        PANDUR WORLD · CAMPAIGN COLLECTION
      </span>

      <h2 className="font-display font-black uppercase tracking-tighter leading-[0.85] text-pandur-cream">
        <span className="block overflow-hidden py-1">
          <span className="pandur-title-line inline-block transform translate-y-full" style={{ fontSize: 'clamp(36px, 7vw, 96px)' }}>
            DISCOVER THE
          </span>
        </span>
        <span className="block overflow-hidden py-1">
          <span className="pandur-title-line inline-block transform translate-y-full text-transparent"
            style={{
              fontSize: 'clamp(36px, 7vw, 96px)',
              WebkitTextStroke: '2.5px #E58A38',
            }}
          >
            PANDUR WORLD
          </span>
        </span>
        <span className="block overflow-hidden py-1">
          <span className="pandur-title-line inline-block transform translate-y-full text-pandur-accent" style={{ fontSize: 'clamp(32px, 6vw, 84px)' }}>
            COLLECTION
          </span>
        </span>
      </h2>

      <p className="pandur-title-sub font-sans text-xs sm:text-sm text-pandur-creamMuted/80 max-w-md mx-auto mt-4 tracking-wider uppercase opacity-0">
        Hand-crafted with 70% Ecuadorian Single-Origin Cocoa & French Cultured Butter
      </p>
    </div>
  );
}

export function PandurExperienceCTA() {
  return (
    <div className="pandur-exp-cta absolute left-1/2 bottom-[10%] -translate-x-1/2 z-50 text-center pointer-events-auto opacity-0 transform translate-y-8">
      <Link
        href="/collections"
        className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-pandur-accent text-pandur-bg font-display font-black text-sm uppercase tracking-wider hover:bg-pandur-cream transition-all shadow-2xl shadow-pandur-accent/30 hover:scale-105 active:scale-95"
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
      if (prefersReducedMotion) {
        // Reduced Motion: static clean layout, no pinning
        gsap.set('.pandur-scene-bg', { opacity: 1, scale: 1 });
        gsap.set('.pandur-floating-prod', { opacity: 1, scale: 1 });
        gsap.set('.pandur-hero-product', { opacity: 1, scale: 1 });
        gsap.set('.pandur-title-badge', { opacity: 1 });
        gsap.set('.pandur-title-line', { y: '0%' });
        gsap.set('.pandur-title-sub', { opacity: 1 });
        gsap.set('.pandur-exp-cta', { opacity: 1, y: 0 });
        return;
      }

      /* ─────────────────────────────────────────────────────────────────────────────
         GSAP SCROLLTRIGGER PINNED TIMELINE — EXACT 5 PHASES
      ───────────────────────────────────────────────────────────────────────────── */

      const floatingProds = Array.from(container.querySelectorAll<HTMLElement>('.pandur-floating-prod'));
      const heroProd = container.querySelector<HTMLElement>('.pandur-hero-product');
      const titleLines = Array.from(container.querySelectorAll<HTMLElement>('.pandur-title-line'));

      // Initial positions for Phase 2 entry
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

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=220%', // 2.2x viewport scroll distance for ultra smooth scrub
          pin: true,
          scrub: 1.0,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* ── PHASE 01 (0% → 20%): Background expands, Section activates ──────── */
      mainTl
        .to('.pandur-scene-bg', {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out',
        }, 0)
        .to('.pandur-aura', {
          scale: 1.2,
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out',
        }, 0);

      /* ── PHASE 02 (20% → 45%): Floating products enter from DIFFERENT directions ─ */
      floatingProds.forEach((el, idx) => {
        const prod = CAMPAIGN_PRODUCTS[idx];
        if (!prod) return;

        mainTl.to(el, {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: prod.rotationTarget,
          duration: 0.25,
          ease: 'power3.out',
        }, 0.20 + (idx % 3) * 0.04);
      });

      /* ── PHASE 03 (45% → 65%): Products arrange into 3D depth composition ─ */
      floatingProds.forEach((el, idx) => {
        const prod = CAMPAIGN_PRODUCTS[idx];
        if (!prod) return;

        // Subtle 3D floating movement & depth drift
        const depthShiftX = (idx % 2 === 0 ? 1 : -1) * (12 + idx * 4);
        const depthShiftY = (idx % 3 === 0 ? -1 : 1) * (10 + idx * 3);

        mainTl.to(el, {
          x: depthShiftX,
          y: depthShiftY,
          rotation: prod.rotationTarget * 1.2,
          duration: 0.20,
          ease: 'sine.inOut',
        }, 0.45);
      });

      /* ── PHASE 04 (65% → 85%): Central Hero Product emerges & floating push outward */
      if (heroProd) {
        mainTl.to(heroProd, {
          scale: 1.15,
          opacity: 1,
          rotation: 0,
          duration: 0.20,
          ease: 'back.out(1.4)',
        }, 0.65);
      }

      // Floating products explode/push outward to frame central hero product
      floatingProds.forEach((el, idx) => {
        const prod = CAMPAIGN_PRODUCTS[idx];
        if (!prod) return;

        // Push outward away from center (50%, 50%)
        const isLeft = prod.targetPos.left < 50;
        const isTop = prod.targetPos.top < 50;

        const pushX = (isLeft ? -1 : 1) * (40 + (idx % 3) * 15);
        const pushY = (isTop ? -1 : 1) * (30 + (idx % 2) * 15);

        mainTl.to(el, {
          x: pushX,
          y: pushY,
          scale: 0.85,
          opacity: 0.75,
          duration: 0.20,
          ease: 'power2.out',
        }, 0.65);
      });

      /* ── PHASE 05 (85% → 100%): Typography & CTA reveal & lock composition ─ */
      mainTl
        .to('.pandur-title-badge', {
          opacity: 1,
          duration: 0.05,
        }, 0.82)
        .to(titleLines, {
          y: '0%',
          stagger: 0.04,
          duration: 0.12,
          ease: 'power3.out',
        }, 0.84)
        .to('.pandur-title-sub', {
          opacity: 1,
          duration: 0.06,
        }, 0.90)
        .to('.pandur-exp-cta', {
          opacity: 1,
          y: 0,
          duration: 0.08,
          ease: 'back.out(1.5)',
        }, 0.92);

    }, section);

    // Subtle desktop mouse parallax (max 10px, non-intrusive)
    if (!isMobile && !prefersReducedMotion) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!container) return;
        const { left, top, width, height } = container.getBoundingClientRect();
        const mouseX = (e.clientX - left) / width - 0.5;
        const mouseY = (e.clientY - top) / height - 0.5;

        gsap.to('.pandur-floating-prod', {
          x: `+=${mouseX * 10}`,
          y: `+=${mouseY * 10}`,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, [isMobile]);

  // Filter products for mobile if needed
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
        {/* 1. Scene Background Component */}
        <PandurSceneBackground />

        {/* 2. Floating Products Layer */}
        {visibleProducts.map((prod) => (
          <PandurFloatingProduct key={prod.id} product={prod} isMobile={isMobile} />
        ))}

        {/* 3. Central Hero Product Component */}
        <PandurHeroProduct />

        {/* 4. Masked Experience Title Component */}
        <PandurExperienceTitle />

        {/* 5. Experience CTA Component */}
        <PandurExperienceCTA />
      </div>
    </section>
  );
}
