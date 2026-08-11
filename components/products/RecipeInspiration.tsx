'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap, initGSAP } from '@/lib/animations/gsapSetup';
import { ArrowUpRight, Clock, Star } from 'lucide-react';

const RECIPES = [
  {
    id: 1,
    title: 'PANDUR DARK COCOA MILKSHAKE',
    subtitle: 'Double Dark Cocoa + Vanilla Bean Ice Cream',
    description: 'Blend two Double Dark Cocoa cookies with rich vanilla gelato and cold brew for a decadent midnight shake.',
    image: '/images/products/pandur-double-dark.png',
    time: '5 MIN',
    difficulty: 'EASY',
    tag: 'DRINK',
    accent: '#E58A38',
    bg: '#160F0B',
  },
  {
    id: 2,
    title: 'PANDUR NO-BAKE CHEESECAKE',
    subtitle: 'Salted Caramel Velvet Base + Cream Cheese',
    description: 'Crush Salted Caramel Velvet cookies into a buttery crust, layer with mascarpone cream and amber caramel drizzle.',
    image: '/images/products/pandur-salted-caramel.png',
    time: '30 MIN',
    difficulty: 'MEDIUM',
    tag: 'DESSERT',
    accent: '#C94E34',
    bg: '#1A0E08',
  },
  {
    id: 3,
    title: 'PISTACHIO HONEY AFFOGATO',
    subtitle: 'Pistachio White Honey + Espresso + Gelato',
    description: 'Drop a Pistachio White Honey cookie into a double espresso shot poured over Sicilian pistachio gelato.',
    image: '/images/products/pandur-pistachio-honey.png',
    time: '3 MIN',
    difficulty: 'EASY',
    tag: 'CAFÉ',
    accent: '#889966',
    bg: '#141A10',
  },
];

export function RecipeInspiration() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    initGSAP();
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered clip-path reveal from bottom on scroll
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, y: 40 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.15,
          }
        );
      });

      // Section headline stagger
      gsap.fromTo(
        section.querySelectorAll('.recipe-headline-word'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: 'top 80%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 bg-pandur-bg border-t border-pandur-border/40 overflow-hidden"
    >
      {/* Background accent glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pandur-berry/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-8xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-pandur-accent block mb-3">
              PANDUR INSPIRATION
            </span>
            <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-pandur-cream uppercase tracking-tighter leading-none overflow-hidden">
              {['MAKE', 'SOMETHING', 'INCREDIBLE.'].map((word, i) => (
                <span key={i} className="recipe-headline-word inline-block mr-4">
                  {word}
                </span>
              ))}
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-display font-bold text-sm uppercase tracking-wider text-pandur-accent hover:text-pandur-cream transition-colors self-end lg:self-auto shrink-0"
          >
            SEE ALL RECIPES <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Wavy Masonry Recipe Grid (Oreo.com style — alternating vertical offsets) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {RECIPES.map((recipe, idx) => (
            <div
              key={recipe.id}
              ref={(el) => { if (el) cardsRef.current[idx] = el; }}
              className={`group relative rounded-3xl overflow-hidden border border-pandur-border/70 hover:border-pandur-accent/60 transition-all duration-500 hover:shadow-2xl ${
                idx === 1 ? 'md:mt-12' : idx === 2 ? 'md:mt-6' : ''
              }`}
              style={{ background: recipe.bg }}
            >
              {/* Card Top: Recipe Image */}
              <div className="relative w-full h-[240px] overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Tag pill */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-display font-black uppercase tracking-widest"
                  style={{ backgroundColor: `${recipe.accent}25`, color: recipe.accent, border: `1px solid ${recipe.accent}40` }}>
                  {recipe.tag}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-display font-bold text-[10px] uppercase tracking-wider text-pandur-creamMuted">
                    <Clock size={11} /> {recipe.time}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-pandur-border" />
                  <span className="flex items-center gap-1 font-display font-bold text-[10px] uppercase tracking-wider text-pandur-creamMuted">
                    <Star size={11} /> {recipe.difficulty}
                  </span>
                </div>

                <h3 className="font-display font-black text-xl text-pandur-cream uppercase tracking-tight leading-snug group-hover:text-pandur-accent transition-colors duration-300">
                  {recipe.title}
                </h3>

                <p className="font-sans text-xs text-pandur-creamMuted leading-relaxed line-clamp-2">
                  {recipe.description}
                </p>

                <div className="pt-4 border-t border-pandur-border/50 flex items-center justify-between">
                  <span className="font-sans text-[11px] text-pandur-creamMuted/70 italic">
                    {recipe.subtitle}
                  </span>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1 font-display font-bold text-[10px] uppercase tracking-wider hover:gap-2 transition-all"
                    style={{ color: recipe.accent }}
                  >
                    VIEW <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
