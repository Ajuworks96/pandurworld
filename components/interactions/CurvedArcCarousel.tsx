'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap, initGSAP } from '@/lib/animations/gsapSetup';
import { CookieCustomizerModal } from './CookieCustomizerModal';
import { ArrowUpRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
const ARC_COOKIES = [
  { id:'1', name:'Double Dark Cocoa',     image:'/images/products/pandur-double-dark.png',      tag:'SIGNATURE DARK',    slug:'pandur-double-dark',      desc:'70% Ecuadorian cocoa with Maldon sea salt flakes',        accent:'#C08040' },
  { id:'2', name:'Salted Caramel Velvet', image:'/images/products/pandur-salted-caramel.png',   tag:'STUFFED VELVET',    slug:'pandur-salted-caramel',   desc:'Brown butter dough with molten amber caramel core',       accent:'#D08830' },
  { id:'3', name:'Pistachio White Honey', image:'/images/products/pandur-pistachio-honey.png',  tag:'ARTISANAL SPECIAL', slug:'pandur-pistachio-honey',  desc:'Bronte pistachios with Belgian white chocolate shards',   accent:'#8AAA60' },
  { id:'4', name:'Hazelnut Praline',      image:'/images/products/pandur-hazelnut-praline.png', tag:'SIGNATURE DARK',    slug:'pandur-hazelnut-praline', desc:'IGP Piedmont hazelnuts with gianduja cream center',       accent:'#B07840' },
  { id:'5', name:'Vanilla Bean Crunch',   image:'/images/products/pandur-vanilla-bean.png',     tag:'CRUNCH BITES',      slug:'pandur-vanilla-bean',     desc:'Madagascar vanilla caviar in golden sablé crust',         accent:'#D4A847' },
  { id:'6', name:'Espresso Dark Roast',   image:'/images/products/pandur-espresso-roast.png',   tag:'SIGNATURE DARK',    slug:'pandur-espresso-roast',   desc:'Ethiopian Yirgacheffe arabica in dark cocoa dough',       accent:'#8B5030' },
  { id:'7', name:'Ruby Berry Crumb',      image:'/images/products/pandur-ruby-berry.png',       tag:'STUFFED VELVET',    slug:'pandur-ruby-berry',       desc:'Ruby cacao with wild raspberry reduction center',         accent:'#B03050' },
  { id:'8', name:'Spiced Honey Pecan',    image:'/images/products/pandur-spiced-pecan.png',     tag:'ARTISANAL SPECIAL', slug:'pandur-spiced-pecan',     desc:'Georgia pecans with Ceylon cinnamon maple glaze',         accent:'#C07830' },
];
const TOTAL = ARC_COOKIES.length;

/* ─────────────────────────────────────────────────────────────────────────────
   BOWL ARC GEOMETRY  (U-shape — edges TOP, center BOTTOM)
   Matching Oreo.com: top-left → dip → bottom-center → dip → top-right
───────────────────────────────────────────────────────────────────────────── */
function arcPos(idx: number) {
  const t = (idx / (TOTAL - 1)) * 2 - 1;          // −1 … +1

  const xPct    = 6 + (idx / (TOTAL - 1)) * 88;   // 6% → 94%

  const edgeY   = 5;    // edge cookies near TOP  (%)
  const centerY = 72;   // center cookie near BOTTOM (%)
  const yPct    = centerY - t * t * (centerY - edgeY);  // bowl formula

  // Tangent angle: left leans right (+), right leans left (−)
  const rotDeg  = Math.atan2(-2 * t * (centerY - edgeY), 88) * (180 / Math.PI) * 0.80;

  return { xPct, yPct, rotDeg };
}

/* Cookie sizes along arc */
function arcSize(idx: number, activeIdx: number) {
  const dist = Math.abs(idx - activeIdx);
  return Math.max(80, 210 - dist * 20);
}

/* ─────────────────────────────────────────────────────────────────────────────
   START & END positions for scroll-in animation (Oreo.com style)
   Each cookie starts OFF-SCREEN and slides to its arc position.
───────────────────────────────────────────────────────────────────────────── */
function arcStartPos(idx: number) {
  // Left-half cookies come from far LEFT, right-half from far RIGHT
  // Center-most cookies come from BELOW
  const center = (TOTAL - 1) / 2;
  const side   = idx < center ? -1 : 1;          // left = −1, right = +1
  const dist   = Math.abs(idx - center);

  if (dist <= 0.6) {
    // center cookie rises from below
    return { x: 0, y: 180 };
  }
  // side cookies slide in from left/right and slightly above
  const xOff = side * (80 + dist * 35);          // vw units handled via % on parent
  const yOff = -80 + dist * 30;                  // slight vertical offset
  return { x: xOff, y: yOff };
}

/* Ambient specks */
const SPECKS = Array.from({ length: 20 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  r: 1.5 + Math.random() * 2.8, delay: Math.random() * 7,
  dur: 5 + Math.random() * 9,   op: 0.05 + Math.random() * 0.15,
}));

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export function CurvedArcCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const archRef    = useRef<HTMLDivElement>(null);
  const detailRef  = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(3);
  const [modal,  setModal]  = useState(false);

  const handleSelect = useCallback((idx: number) => {
    setActive(idx);
    if (detailRef.current) {
      gsap.fromTo(detailRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' }
      );
    }
  }, []);

  /* ── GSAP: PINNED SCROLL ANIMATION ──────────────────────────────────── */
  useEffect(() => {
    initGSAP();
    const section = sectionRef.current;
    const arch    = archRef.current;
    if (!section || !arch) return;

    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      /* 1 ── Headline words slide up (scroll-triggered, NOT scrubbed) */
      gsap.fromTo('.arch-word',
        { y: 70, opacity: 0, skewY: 4 },
        { y: 0, opacity: 1, skewY: 0, stagger: 0.06, duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: section, start: 'top 80%' } }
      );
      gsap.fromTo('.arch-btn',
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 72%' } }
      );

      if (noMotion) return;

      /* 2 ── OREO.COM STYLE: PINNED SCROLL-SCRUBBED COOKIE ARC ANIMATION
              Section is pinned for the duration of the scrub.
              Cookies start off-screen and slide to their arc positions.
      */
      const cookies = Array.from(arch.querySelectorAll<HTMLElement>('.arc-cookie'));

      // Set initial OFF-SCREEN positions
      cookies.forEach((el, idx) => {
        const { x, y } = arcStartPos(idx);
        gsap.set(el, { x, y, opacity: 0, scale: 0.55 });
      });

      // Stagger order: edges first (like Oreo.com), then inward, center last
      const ORDER = [0, 7, 1, 6, 2, 5, 3, 4];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',        // pin starts when section hits top of viewport
          end:   '+=100%',         // scroll 100vh worth to complete the animation
          pin: true,               // PIN the section — key Oreo.com feature!
          scrub: 1.2,              // smooth scrubbing
          anticipatePin: 1,
        },
      });

      /* Phase 1 (0%–30%): first two edge cookies slide in */
      tl.to(
        [cookies[ORDER[0]], cookies[ORDER[1]]].filter(Boolean),
        { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' },
        0
      );

      /* Phase 2 (20%–60%): inner cookies slide in */
      tl.to(
        [cookies[ORDER[2]], cookies[ORDER[3]], cookies[ORDER[4]], cookies[ORDER[5]]].filter(Boolean),
        { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out', stagger: 0.05 },
        0.20
      );

      /* Phase 3 (55%–100%): center cookies rise into position */
      tl.to(
        [cookies[ORDER[6]], cookies[ORDER[7]]].filter(Boolean),
        { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.5)' },
        0.55
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const cookie = ARC_COOKIES[active];

  return (
    <>
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-t border-pandur-border/30"
    >
      {/* ── Dark stage ── */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #080402 0%, #0C0604 50%, #060201 100%)',
      }} />

      {/* ── Floating cocoa dust ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {SPECKS.map(s => (
          <div key={s.id} className="absolute rounded-full" style={{
            left:`${s.x}%`, top:`${s.y}%`,
            width:`${s.r}px`, height:`${s.r}px`,
            background:'#E58A38', opacity:s.op,
            animation:`float ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }} />
        ))}
      </div>

      {/* ── Warm glow at BOTTOM CENTER (arc lowest point) ── */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 z-0" style={{
        width:'70%', height:'55%',
        background:`radial-gradient(ellipse at 50% 100%,
          rgba(210,110,20,0.32) 0%, rgba(160,72,10,0.16) 30%,
          rgba(90,38,5,0.05) 60%, transparent 75%)`,
      }} />

      {/* ════════════════════════════════════════════════════════
          HEADLINE + BUTTONS — top of section
      ════════════════════════════════════════════════════════ */}
      <div className="relative z-10 pt-16 pb-0 text-center px-6">
        <span className="arch-word font-display font-bold text-[11px] uppercase tracking-[0.3em] text-pandur-accent block mb-6">
          PANDUR WORLD · COOKIE STUDIO
        </span>

        <div className="mb-10 overflow-hidden">
          <div className="overflow-hidden mb-0">
            <p className="arch-word font-display font-black text-pandur-cream uppercase tracking-tighter leading-[0.86]"
               style={{ fontSize:'clamp(40px, 7.5vw, 108px)' }}>
              DESIGN YOUR OWN
            </p>
          </div>
          <div className="overflow-hidden">
            <p className="arch-word font-display font-black uppercase tracking-tighter leading-[0.86]"
               style={{ fontSize:'clamp(40px, 7.5vw, 108px)', color:'transparent', WebkitTextStroke:'2.5px #E58A38' }}>
              PANDUR COOKIE
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setModal(true)}
            className="arch-btn group relative rounded-full px-12 py-4 font-display font-black text-sm uppercase tracking-wider text-pandur-bg shadow-2xl shadow-pandur-accent/30 hover:scale-105 active:scale-95 transition-transform overflow-hidden"
            style={{ background:'linear-gradient(135deg, #E58A38 0%, #C86C18 100%)' }}
          >
            <span className="relative z-10">START CREATING</span>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>
          <Link
            href="/collections"
            className="arch-btn rounded-full px-12 py-4 border-2 border-pandur-cream/55 text-pandur-cream font-display font-bold text-sm uppercase tracking-wider hover:border-pandur-accent hover:text-pandur-accent transition-colors"
          >
            BROWSE POPULAR DESIGNS
          </Link>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          BOWL ARC — all 8 cookies in U-shape, full viewport width
          Edges at top-left / top-right, center at bottom-center
      ════════════════════════════════════════════════════════ */}
      <div
        ref={archRef}
        className="relative w-full"
        style={{ height:'clamp(300px, 42vw, 500px)' }}
      >
        {/* Subtle SVG bowl guide (dashed arc path) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ opacity:0.10 }}
        >
          <path
            d="M 6 5 Q 50 90 94 5"
            fill="none" stroke="#E58A38"
            strokeWidth="0.5" strokeDasharray="1.8 3.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Edge vignettes */}
        <div className="pointer-events-none absolute left-0 top-0 h-full z-20"
          style={{ width:'7%', background:'linear-gradient(to right, #060201, transparent)' }} />
        <div className="pointer-events-none absolute right-0 top-0 h-full z-20"
          style={{ width:'7%', background:'linear-gradient(to left, #060201, transparent)' }} />

        {/* ── Cookie nodes ── */}
        {ARC_COOKIES.map((ck, idx) => {
          const { xPct, yPct, rotDeg } = arcPos(idx);
          const isActive = idx === active;
          const dist     = Math.abs(idx - active);
          const sz       = arcSize(idx, active);
          const bri      = isActive ? 1.12 : Math.max(0.38, 0.86 - dist * 0.14);
          const sat      = isActive ? 1.12 : Math.max(0.58, 0.90 - dist * 0.10);
          const borderOp = isActive ? 0.78 : Math.max(0.04, 0.18 - dist * 0.04);

          return (
            <div
              key={ck.id}
              className="arc-cookie absolute cursor-pointer select-none"
              style={{
                left:`${xPct}%`, top:`${yPct}%`,
                width:`${sz}px`, height:`${sz}px`,
                marginLeft:`-${sz/2}px`, marginTop:`-${sz/2}px`,
                transform:`rotate(${rotDeg}deg)`,
                zIndex: isActive ? 30 : Math.max(1, 20 - dist),
                transition:[
                  'width 0.48s cubic-bezier(0.34,1.56,0.64,1)',
                  'height 0.48s cubic-bezier(0.34,1.56,0.64,1)',
                  'margin 0.48s cubic-bezier(0.34,1.56,0.64,1)',
                ].join(', '),
              }}
              onClick={() => handleSelect(idx)}
            >
              {/* Glow halo — active only */}
              {isActive && (
                <div className="absolute pointer-events-none rounded-full" style={{
                  inset:'-22px',
                  background:`radial-gradient(circle, ${cookie.accent}50 0%, transparent 70%)`,
                  filter:'blur(16px)',
                  animation:'pulse 3s ease-in-out infinite',
                  transform:`rotate(${-rotDeg}deg)`,
                }} />
              )}

              {/* Circle crop */}
              <div className="relative w-full h-full overflow-hidden" style={{
                borderRadius:'50%',
                border:`${isActive ? 2.5 : 1.2}px solid rgba(229,138,56,${borderOp})`,
                boxShadow: isActive
                  ? `0 28px 85px rgba(0,0,0,0.92), 0 0 60px ${cookie.accent}42`
                  : '0 10px 40px rgba(0,0,0,0.75)',
                transition:'border 0.4s ease, box-shadow 0.5s ease',
              }}>
                <Image
                  src={ck.image} alt={ck.name} fill
                  className="object-cover"
                  style={{
                    filter:`brightness(${bri}) saturate(${sat})`,
                    transform: isActive ? 'scale(1.08)' : 'scale(1.0)',
                    transition:'transform 0.55s cubic-bezier(0.34,1.56,0.64,1), filter 0.4s ease',
                  }}
                  sizes={`${sz}px`}
                />
                {/* Inner vignette */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  borderRadius:'50%',
                  background:'radial-gradient(circle, transparent 42%, rgba(0,0,0,0.55) 100%)',
                }} />
              </div>

              {/* Active name (counter-rotated) */}
              {isActive && (
                <div className="absolute left-1/2 pointer-events-none whitespace-nowrap"
                  style={{ bottom:`-${Math.round(sz*0.16)}px`, transform:`translateX(-50%) rotate(${-rotDeg}deg)` }}>
                  <span className="font-display font-black text-[10px] uppercase tracking-[0.22em]"
                    style={{ color:cookie.accent }}>
                    {ck.name}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Flavor detail + dot nav ── */}
      <div ref={detailRef} className="relative z-10 text-center px-6 pt-4 pb-16">
        <p className="font-display font-black text-xs uppercase tracking-[0.26em] mb-1" style={{ color:cookie.accent }}>
          {cookie.tag}
        </p>
        <p className="font-display font-black text-2xl sm:text-3xl text-pandur-cream uppercase tracking-tight mb-2">
          {cookie.name}
        </p>
        <p className="font-sans text-sm text-pandur-creamMuted/70 mb-5 max-w-sm mx-auto leading-relaxed">
          {cookie.desc}
        </p>
        <Link
          href={`/product/${cookie.slug}`}
          className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full border transition-all hover:scale-105"
          style={{ borderColor:`${cookie.accent}65`, color:cookie.accent }}
        >
          EXPLORE <ArrowUpRight size={13} />
        </Link>

        {/* Pill dots */}
        <div className="flex items-center justify-center gap-2.5 mt-7">
          {ARC_COOKIES.map((_, i) => (
            <button key={i} onClick={() => handleSelect(i)}
              className="rounded-full focus:outline-none transition-all duration-300"
              style={{
                width: i === active ? '26px' : '7px', height:'7px',
                background: i === active ? cookie.accent : 'rgba(255,255,255,0.18)',
              }}
              aria-label={ARC_COOKIES[i].name}
            />
          ))}
        </div>
      </div>
    </section>

    <CookieCustomizerModal isOpen={modal} onClose={() => setModal(false)} />
    </>
  );
}
