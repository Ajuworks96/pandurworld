'use client';

import { ImageReveal } from '../ui/ImageReveal';
import { TextReveal } from '../animations/TextReveal';
import { CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

export function IngredientStory() {
  return (
    <section className="relative bg-pandur-bg py-24 border-t border-pandur-border/40 overflow-hidden">
      {/* Background Ambient Haze */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-pandur-accent/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-8xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Visual Story Canvas */}
        <div className="lg:col-span-6 relative">
          <ImageReveal>
            <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl bg-gradient-to-b from-pandur-card to-[#120B07] border border-pandur-border/80 p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-pandur-accent/20 via-transparent to-transparent opacity-60" />

              <div className="relative z-10">
                <span className="font-display font-bold text-xs uppercase tracking-widest text-pandur-accent bg-pandur-accent/10 px-3 py-1 rounded-full border border-pandur-accent/20 inline-block mb-4">
                  THE 36-HOUR SECRET
                </span>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-pandur-cream uppercase tracking-tight leading-tight">
                  SLOW DOUGH MATURATION.
                </h3>
              </div>

              <div className="relative z-10 space-y-4 border-t border-pandur-border/60 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-pandur-accent/20 border border-pandur-accent/40 flex items-center justify-center text-pandur-accent">
                    <Flame size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-pandur-cream uppercase">
                      COLD-FERMENTED DOUGH
                    </h4>
                    <p className="font-sans text-xs text-pandur-creamMuted">
                      Rested for 36 hours at 4°C to break down starches into rich caramel complexity.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-pandur-accent/20 border border-pandur-accent/40 flex items-center justify-center text-pandur-accent">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-pandur-cream uppercase">
                      SINGLE ORIGIN CACAO
                    </h4>
                    <p className="font-sans text-xs text-pandur-creamMuted">
                      100% traceably sourced from smallholder cocoa farms in Esmeraldas, Ecuador.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ImageReveal>
        </div>

        {/* Right Column: Editorial Craft Narrative */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-3">
            <span>UNCOMPROMISING CULINARY PHILOSOPHY</span>
          </div>

          <TextReveal
            as="h2"
            text="THE ANATOMY OF ECCENTRIC FLAVOUR."
            highlightText="ANATOMY"
            className="font-display font-black text-4xl sm:text-5xl text-pandur-cream uppercase tracking-tight leading-tight mb-6"
          />

          <p className="font-sans text-base text-pandur-creamMuted leading-relaxed mb-6">
            We reject mass production. Every batch of Pandur World cookies is hand-portioned, slow-aged for 36 hours, and baked in stone ovens at precise temperatures to achieve the signature crispy shell and molten interior.
          </p>

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-pandur-accent flex-shrink-0" />
              <span className="font-sans text-sm text-pandur-cream font-medium">
                Grass-fed cultured butter churned in Normandy, France
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-pandur-accent flex-shrink-0" />
              <span className="font-sans text-sm text-pandur-cream font-medium">
                Hand-harvested Maldon sea salt flakes from Essex coastlines
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-pandur-accent flex-shrink-0" />
              <span className="font-sans text-sm text-pandur-cream font-medium">
                Zero palm oils, zero artificial preservatives, 100% natural ingredients
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
