'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap, initGSAP } from '@/lib/animations/gsapSetup';
import { CookieCustomizerModal } from './CookieCustomizerModal';

interface ArcProduct {
  id: string;
  name: string;
  image: string;
  // Position along U-curve (0 = far left top, 0.5 = center bottom, 1 = far right top)
  progress: number;
  sizeDesktop: number; // px diameter
  sizeMobile: number;
  // Rotation angle on the arc (degrees)
  rotation: number;
  // Initial offscreen direction for scroll animation
  entryOffset: { x: number; y: number };
}

const ARC_ITEMS: ArcProduct[] = [
  {
    id: 'double-dark',
    name: 'Double Dark Cocoa',
    image: '/images/products/pandur-double-dark.png',
    progress: 0.0,
    sizeDesktop: 190,
    sizeMobile: 110,
    rotation: 28, // tilted inward right
    entryOffset: { x: -40, y: -40 },
  },
  {
    id: 'salted-caramel',
    name: 'Salted Caramel Velvet',
    image: '/images/products/pandur-salted-caramel.png',
    progress: 0.125,
    sizeDesktop: 175,
    sizeMobile: 100,
    rotation: 20,
    entryOffset: { x: -30, y: -30 },
  },
  {
    id: 'pistachio-honey',
    name: 'Pistachio White Honey',
    image: '/images/products/pandur-pistachio-honey.png',
    progress: 0.25,
    sizeDesktop: 185,
    sizeMobile: 105,
    rotation: 12,
    entryOffset: { x: -20, y: -20 },
  },
  {
    id: 'vanilla-bean',
    name: 'Vanilla Bean Crunch',
    image: '/images/products/pandur-vanilla-bean.png',
    progress: 0.375,
    sizeDesktop: 180,
    sizeMobile: 100,
    rotation: 5,
    entryOffset: { x: -10, y: 30 },
  },
  {
    id: 'hero-master',
    name: 'Pandur Signature Custom Cookie',
    image: '/images/products/pandur-double-dark.png',
    progress: 0.50, // CENTER FEATURED COOKIE
    sizeDesktop: 260, // LARGEST AT CENTER
    sizeMobile: 150,
    rotation: 0,
    entryOffset: { x: 0, y: 60 },
  },
  {
    id: 'hazelnut-praline',
    name: 'Hazelnut Praline',
    image: '/images/products/pandur-hazelnut-praline.png',
    progress: 0.625,
    sizeDesktop: 180,
    sizeMobile: 100,
    rotation: -5,
    entryOffset: { x: 10, y: 30 },
  },
  {
    id: 'espresso-roast',
    name: 'Espresso Dark Roast',
    image: '/images/products/pandur-espresso-roast.png',
    progress: 0.75,
    sizeDesktop: 185,
    sizeMobile: 105,
    rotation: -12,
    entryOffset: { x: 20, y: -20 },
  },
  {
    id: 'ruby-berry',
    name: 'Ruby Berry Crumb',
    image: '/images/products/pandur-ruby-berry.png',
    progress: 0.875,
    sizeDesktop: 175,
    sizeMobile: 100,
    rotation: -20,
    entryOffset: { x: 30, y: -30 },
  },
  {
    id: 'spiced-pecan',
    name: 'Spiced Honey Pecan',
    image: '/images/products/pandur-spiced-pecan.png',
    progress: 1.0,
    sizeDesktop: 190,
    sizeMobile: 110,
    rotation: -28, // tilted inward left
    entryOffset: { x: 40, y: -40 },
  },
];

/**
 * U-shaped Bowl Arc positioning calculation (Oreo.com exact match):
 * progress = 0 (top left) -> 0.5 (bottom center) -> 1 (top right)
 */
function getArcCoordinates(progress: number) {
  // Horizontal %: 5% -> 95%
  const xPct = 5 + progress * 90;

  // Vertical %: t = -1 (left) -> 0 (center) -> 1 (right)
  const t = (progress - 0.5) * 2;
  const topY = 12;  // % from top of arc container
  const bottomY = 74; // % from top at lowest point (center)
  const yPct = topY + (1 - t * t) * (bottomY - topY);

  return { xPct, yPct };
}

export function CurvedArcSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      // Headline entrance
      gsap.fromTo(
        section.querySelectorAll('.arc-title-word'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        section.querySelectorAll('.arc-btn-action'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%' },
        }
      );

      if (prefersReducedMotion) return;

      // PINNED SCROLL ANIMATION (Oreo.com style):
      // As the user scrolls vertically, the cookies animate into their U-shaped bowl arc formation
      const items = Array.from(container.querySelectorAll<HTMLElement>('.arc-cookie-item'));

      // Set initial off-screen / scattered positions
      items.forEach((el, idx) => {
        const item = ARC_ITEMS[idx];
        if (!item) return;
        gsap.set(el, {
          x: `${item.entryOffset.x}vw`,
          y: `${item.entryOffset.y}vh`,
          opacity: 0,
          scale: 0.5,
        });
      });

      // Pin timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate all cookies smoothly into their U-shaped arc positions
      items.forEach((el, idx) => {
        const item = ARC_ITEMS[idx];
        if (!item) return;

        tl.to(
          el,
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
          },
          idx * 0.05
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full min-h-[100svh] bg-[#070402] text-pandur-cream overflow-hidden border-t border-pandur-border/30 flex flex-col justify-between"
      >
        {/* Dark stage gradient background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 30%, #1A0D06 0%, #0C0603 55%, #050201 100%)',
          }}
        />

        {/* Ambient warm amber glow behind center cookie */}
        <div
          className="absolute left-1/2 bottom-[15%] -translate-x-1/2 z-0 pointer-events-none"
          style={{
            width: '60vw',
            height: '40vh',
            background:
              'radial-gradient(ellipse at 50% 100%, rgba(229,138,56,0.30) 0%, rgba(180,85,15,0.12) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* ── 1. HEADER & BUTTONS (Oreo.com Exact Copy & Structure) ── */}
        <div className="relative z-10 pt-16 md:pt-20 text-center px-6 max-w-5xl mx-auto">
          {/* Main Headline Stack */}
          <h2 className="font-display font-black text-4xl sm:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.88] mb-8 overflow-hidden">
            <span className="arc-title-word block text-pandur-cream">
              DESIGN YOUR OWN
            </span>
            <span className="arc-title-word block text-pandur-cream">
              PANDUR COOKIE
            </span>
          </h2>

          {/* Action Buttons: START CREATING (gradient pill) + BROWSE POPULAR DESIGNS (outlined pill) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="arc-btn-action group relative overflow-hidden rounded-full px-10 py-4 font-display font-black text-sm uppercase tracking-wider text-pandur-bg shadow-2xl shadow-pandur-accent/30 hover:scale-105 active:scale-95 transition-all"
              style={{
                background: 'linear-gradient(135deg, #E58A38 0%, #C86C18 100%)',
              }}
            >
              <span className="relative z-10">START CREATING</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-full" />
            </button>

            <Link
              href="/collections"
              className="arc-btn-action rounded-full px-10 py-4 border-2 border-pandur-cream/70 text-pandur-cream font-display font-bold text-sm uppercase tracking-wider hover:border-pandur-accent hover:text-pandur-accent transition-colors"
            >
              BROWSE POPULAR DESIGNS
            </Link>
          </div>
        </div>

        {/* ── 2. U-SHAPED BOWL ARC OF PRODUCTS (PERFECT CIRCULAR CLIP MASKS) ── */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden flex-1 min-h-[420px] md:min-h-[520px]"
        >
          {/* Subtle SVG U-shaped guide line */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-10 z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 5 12 Q 50 82 95 12"
              fill="none"
              stroke="#E58A38"
              strokeWidth="0.5"
              strokeDasharray="2 3"
            />
          </svg>

          {ARC_ITEMS.map((item) => {
            const { xPct, yPct } = getArcCoordinates(item.progress);
            const size = isMobile ? item.sizeMobile : item.sizeDesktop;
            const isCenterHero = item.id === 'hero-master';

            return (
              <div
                key={item.id}
                className="arc-cookie-item absolute group cursor-pointer"
                style={{
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  marginLeft: `-${size / 2}px`,
                  marginTop: `-${size / 2}px`,
                  transform: `rotate(${item.rotation}deg)`,
                  zIndex: isCenterHero ? 30 : 20,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Glow Halo behind center hero or on hover */}
                {isCenterHero && (
                  <div
                    className="absolute inset-[-20px] rounded-full pointer-events-none animate-pulse-slow"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(229,138,56,0.45) 0%, transparent 70%)',
                      filter: 'blur(15px)',
                    }}
                  />
                )}

                {/* Cookie Image Container — PERFECT CIRCULAR CROP & BORDER */}
                <div
                  className="relative w-full h-full overflow-hidden transition-transform duration-500 group-hover:scale-115"
                  style={{
                    borderRadius: '50%',
                    border: isCenterHero
                      ? '3px solid rgba(229, 138, 56, 0.85)'
                      : '1.8px solid rgba(229, 138, 56, 0.35)',
                    boxShadow: isCenterHero
                      ? '0 25px 75px rgba(0,0,0,0.95), 0 0 55px rgba(229,138,56,0.45)'
                      : '0 15px 45px rgba(0,0,0,0.88)',
                    background: '#120A06',
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes={`${size}px`}
                  />
                  {/* Subtle inner dark vignette for luxury circular food depth */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.58) 100%)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cookie Customizer Modal triggered by "START CREATING" */}
      <CookieCustomizerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
