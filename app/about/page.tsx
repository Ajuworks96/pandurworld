'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, HeartHandshake, ShieldCheck, Flame, Users, ArrowRight, Award, Clock, Globe } from 'lucide-react';
import { gsap, initGSAP } from '@/lib/animations/gsapSetup';
import { TextReveal } from '@/components/animations/TextReveal';

const PILLARS = [
  {
    icon: Flame,
    title: '36-HOUR DOUGH MATURATION',
    desc: 'We never rush the oven. Controlled 36-hour dough aging breaks down complex starches into aromatic sugars for deep caramelization and chew.'
  },
  {
    icon: ShieldCheck,
    title: 'SINGLE-ORIGIN INGREDIENTS',
    desc: 'From Ecuadorian 70% dark cocoa pods to Sicilian Bronte pistachios, every component is directly traded with dedicated family farms.'
  },
  {
    icon: HeartHandshake,
    title: 'HAND-CRAFTED ATELIER BATCHES',
    desc: 'No mass-production conveyor belts. Every batch is hand-weighed, shaped, and precision-baked by our team of master pastry artisans.'
  },
  {
    icon: Users,
    title: 'ETHICAL COMMUNITY & SUSTAINABILITY',
    desc: 'We believe luxury hospitality starts behind the scenes—ensuring fair wages, zero food waste partnerships, and 100% compostable packaging.'
  }
];

const STATS = [
  { value: '36h', label: 'DOUGH MATURATION TIME' },
  { value: '70%', label: 'SINGLE-ORIGIN ECUADORIAN COCOA' },
  { value: '100%', label: 'GRASS-FED FRENCH BUTTER' },
  { value: '48h', label: 'BAKE-TO-DOOR FRESHNESS' }
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGSAP();
    const el = pageRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Reveal cards stagger
      gsap.fromTo('.pillar-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.pillar-section', start: 'top 75%' } }
      );

      gsap.fromTo('.stat-item',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: '.stats-section', start: 'top 80%' } }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative min-h-screen bg-pandur-bg text-pandur-cream pt-32 pb-24 overflow-hidden">

      {/* Decorative ambient background flares */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pandur-accent/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-pandur-berry/6 rounded-full blur-[140px] pointer-events-none" />

      {/* 1. HERO STATEMENT */}
      <section className="max-w-8xl mx-auto px-6 md:px-12 mb-24">
        <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-4">
          <Sparkles size={16} />
          <span>OUR CRAFT PHILOSOPHY</span>
        </div>

        <TextReveal
          as="h1"
          text="WE BELIEVE A COOKIE CAN CREATE AN UNFORGETTABLE MOMENT."
          highlightText="UNFORGETTABLE"
          className="font-display font-black text-4xl sm:text-7xl lg:text-8xl text-pandur-cream uppercase tracking-tighter leading-[0.92] max-w-5xl mb-8"
        />

        <p className="font-sans text-lg sm:text-xl text-pandur-creamMuted max-w-3xl leading-relaxed">
          Pandur World was born from a singular culinary obsession: to elevate the classic chocolate chip cookie into a Michelin-grade luxury experience.
        </p>
      </section>

      {/* 2. STATS COUNTER BARS */}
      <section className="stats-section border-y border-pandur-border/60 bg-pandur-card/40 py-12 mb-24">
        <div className="max-w-8xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <div key={i} className="stat-item text-center sm:text-left">
              <p className="font-display font-black text-4xl sm:text-6xl text-pandur-accent tracking-tight mb-1">
                {s.value}
              </p>
              <p className="font-display font-bold text-[10px] uppercase tracking-widest text-pandur-creamMuted">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EDITORIAL STORY GRID */}
      <section className="max-w-8xl mx-auto px-6 md:px-12 py-16 mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="font-display font-bold text-xs uppercase tracking-widest text-pandur-accent">
            ORIGIN STORY
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-pandur-cream uppercase tracking-tight leading-tight">
            FROM SOHO ATELIER TO GLOBAL FOOD CAMPAIGN.
          </h2>
          <p className="font-sans text-base text-pandur-creamMuted leading-relaxed">
            Founded by Chef Antoine Pandur in 2022, our journey started in a tiny 400-square-foot bakery in Soho. Disillusioned by overly sweet, factory-baked cookies, Antoine applied classic French pastry technique—specifically long cold-fermentation—to the artisanal cookie format.
          </p>
          <p className="font-sans text-base text-pandur-creamMuted leading-relaxed">
            Today, Pandur World supplies VIP turn-down amenities for 5-star boutique hotels, luxury coffee bars, and cookie connoisseurs worldwide while remaining faithful to our small-batch roots.
          </p>
          <div className="pt-4">
            <Link
              href="/collections"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-pandur-accent text-pandur-bg font-display font-black text-sm uppercase tracking-wider hover:bg-pandur-cream transition-colors shadow-lg shadow-pandur-accent/20"
            >
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 relative h-[420px] sm:h-[540px] rounded-3xl overflow-hidden border border-pandur-border/80 shadow-2xl group">
          <Image
            src="/images/products/pandur-double-dark.png"
            alt="Pandur World Atelier Craft"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pandur-bg/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-pandur-bg/80 backdrop-blur-md border border-pandur-border/60">
            <p className="font-display font-bold text-xs uppercase tracking-widest text-pandur-accent">ATELIER BATCH NO. 042</p>
            <p className="font-sans text-xs text-pandur-creamMuted">Double Dark Ecuadorian Cocoa with Maldon Sea Salt Flakes</p>
          </div>
        </div>
      </section>

      {/* 4. THE 4 PILLARS */}
      <section className="pillar-section max-w-8xl mx-auto px-6 md:px-12 py-24 border-t border-pandur-border/40">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-3 block">
            CRAFT STANDARDS
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-pandur-cream uppercase tracking-tight">
            THE FOUR PILLARS OF <span className="text-pandur-accent italic">PANDUR</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="pillar-card bg-pandur-card/90 border border-pandur-border/80 rounded-3xl p-8 hover:border-pandur-accent/60 transition-colors shadow-xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-pandur-accent/10 border border-pandur-accent/30 flex items-center justify-center text-pandur-accent mb-6">
                  <Icon size={26} />
                </div>
                <h3 className="font-display font-black text-xl text-pandur-cream uppercase tracking-tight mb-3">
                  {p.title}
                </h3>
                <p className="font-sans text-sm text-pandur-creamMuted leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
