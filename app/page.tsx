import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

// Core sections
import { Hero } from '@/components/hero/Hero';
import { Marquee, DualMarquee } from '@/components/interactions/Marquee';

// Oreo.com signature animation sections & Full-Bleed Campaign Experience
import { SignatureWorldReveal } from '@/components/interactions/SignatureWorldReveal';
import { CurvedArcSection } from '@/components/interactions/CurvedArcSection';
import { PandurScrollExperience } from '@/components/interactions/PandurScrollExperience';
import { InteractiveCookie3D } from '@/components/interactions/InteractiveCookie3D';
import { FanPhotoTicker } from '@/components/interactions/FanPhotoTicker';
import { ColorBlockCTA } from '@/components/interactions/ColorBlockCTA';
import { TakeABiteDrag } from '@/components/interactions/TakeABiteDrag';
import { GuessFlavourDrag } from '@/components/interactions/GuessFlavourDrag';

// Product & content sections
import { RecipeInspiration } from '@/components/products/RecipeInspiration';
import { IngredientStory } from '@/components/products/IngredientStory';

import { TextReveal } from '@/components/animations/TextReveal';

export const metadata: Metadata = {
  title: 'Pandur World | Artisanal 36-Hour Aged Luxury Cookies',
  description:
    'Step into Pandur World — a premium cookie experience crafted with single-origin Ecuadorian cocoa, grass-fed French butter, and 36-hour dough maturation.',
  openGraph: {
    title: 'Pandur World | Artisanal 36-Hour Aged Luxury Cookies',
    description: 'Premium artisanal cookies crafted with single-origin cocoa and French cultured butter.',
    siteName: 'Pandur World',
  },
};

const MARQUEE_ROW1 = [
  '36-HOUR DOUGH MATURATION',
  'SINGLE-ORIGIN ECUADORIAN COCOA',
  'FRENCH CULTURED BUTTER',
  'MALDON SEA SALT FLAKES',
];

const MARQUEE_ROW2 = [
  'HAND-CRAFTED ARTISANAL BATCHES',
  'NO ARTIFICIAL PRESERVATIVES',
  'BRONTE SICILIAN PISTACHIOS',
  'PIEDMONT IGP HAZELNUTS',
];

export default function HomePage() {
  return (
    <div className="relative w-full bg-pandur-bg text-pandur-cream overflow-hidden">

      {/* ─────────────────────────────────────────────────────
          1. CINEMATIC HERO — Full viewport with 3-layer parallax
      ───────────────────────────────────────────────────── */}
      <Hero />

      {/* ─────────────────────────────────────────────────────
          2. DUAL BIDIRECTIONAL MARQUEE TICKER
      ───────────────────────────────────────────────────── */}
      <div className="border-y border-pandur-border/60 bg-pandur-card/40">
        <div className="py-2.5">
          <Marquee items={MARQUEE_ROW1} speed="medium" direction="left" />
        </div>
        <div className="py-2.5 border-t border-pandur-border/40">
          <Marquee items={MARQUEE_ROW2} speed="slow" direction="right" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────
          3. SIGNATURE WORLD REVEAL (Pinned Scroll Portal)
      ───────────────────────────────────────────────────── */}
      <SignatureWorldReveal />

      {/* ─────────────────────────────────────────────────────
          4. CURVED ARC BOWL SECTION ("DESIGN YOUR OWN PANDUR COOKIE")
          Exact Oreo.com match: Title + 2 Action Pills + U-Curve of isolated products
          (NO SLIDER, NO CAROUSEL, NO DOTS, NO SLIDER BUTTONS)
      ───────────────────────────────────────────────────── */}
      <CurvedArcSection />

      {/* ─────────────────────────────────────────────────────
          5. PANDUR FULL-BLEED CINEMATIC CAMPAIGN EXPERIENCE
          (Pinned 5-phase 3D depth scroll-controlled animation)
      ───────────────────────────────────────────────────── */}
      <PandurScrollExperience />

      {/* ─────────────────────────────────────────────────────
          6. INTERACTIVE 3D COOKIE SPLIT REVEAL
      ───────────────────────────────────────────────────── */}
      <InteractiveCookie3D />

      {/* ─────────────────────────────────────────────────────
          7. COLOR BLOCK CTA — "ORDER A FRESH BATCH"
      ───────────────────────────────────────────────────── */}
      <ColorBlockCTA />

      {/* ─────────────────────────────────────────────────────
          8. RECIPE / FLAVOUR INSPIRATION GRID
      ───────────────────────────────────────────────────── */}
      <RecipeInspiration />

      {/* ─────────────────────────────────────────────────────
          9. SENSORY INTERACTIONS
      ───────────────────────────────────────────────────── */}
      <TakeABiteDrag />
      <GuessFlavourDrag />

      {/* ─────────────────────────────────────────────────────
          10. FAN PHOTO TICKER (Social Proof)
      ───────────────────────────────────────────────────── */}
      <FanPhotoTicker />

      {/* ─────────────────────────────────────────────────────
          11. INGREDIENT STORY & CRAFTSMANSHIP
      ───────────────────────────────────────────────────── */}
      <IngredientStory />

      {/* ─────────────────────────────────────────────────────
          12. B2B & WHOLESALE CALLOUT
      ───────────────────────────────────────────────────── */}
      <section className="relative py-24 bg-gradient-to-b from-pandur-bg via-pandur-card to-pandur-bg border-t border-pandur-border/40 overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-pandur-accent/8 pointer-events-none" />
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-pandur-accent/8 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-4">
            <span>LUXURY HOSPITALITY & CORPORATE</span>
          </div>

          <TextReveal
            as="h2"
            text="ELEVATE YOUR GUEST EXPERIENCE."
            highlightText="GUEST"
            className="font-display font-black text-4xl sm:text-6xl text-pandur-cream uppercase tracking-tight mb-6"
          />

          <p className="font-sans text-base text-pandur-creamMuted max-w-2xl mx-auto leading-relaxed mb-10">
            Partner with Pandur World for luxury hotel turn-down amenities, boutique café supply,
            bespoke corporate gifting, and private culinary events.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10 text-left">
            {[
              { label: 'BOUTIQUE HOTELS', desc: 'Custom foil-wrapped room amenities & VIP turn-down boxes.' },
              { label: 'SPECIALTY CAFÉS', desc: 'Weekly fresh cookie shipments with display merchandising.' },
              { label: 'CORPORATE EVENTS', desc: 'Custom branded tin packaging and curated gift assortments.' },
            ].map((item) => (
              <div key={item.label} className="bg-pandur-bg/80 border border-pandur-border/60 p-5 rounded-2xl hover:border-pandur-accent/40 transition-colors">
                <div className="flex items-center gap-2 font-display font-bold text-sm text-pandur-accent mb-1">
                  <CheckCircle2 size={16} />
                  <span>{item.label}</span>
                </div>
                <p className="font-sans text-xs text-pandur-creamMuted">{item.desc}</p>
              </div>
            ))}
          </div>

          <Link
            href="/wholesale"
            className="inline-flex items-center gap-2 font-display font-bold text-sm uppercase tracking-wider text-pandur-bg bg-pandur-accent hover:bg-pandur-cream transition-colors px-8 py-4 rounded-full shadow-xl shadow-pandur-accent/20"
          >
            <span>APPLY FOR WHOLESALE</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
