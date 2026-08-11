'use client';

import { useState } from 'react';
import { FAQS, FAQItem } from '@/lib/data/faqs';
import { Accordion } from '@/components/ui/Accordion';
import { HelpCircle } from 'lucide-react';
import { MagneticButton } from '@/components/interactions/MagneticButton';

const FAQ_CATEGORIES = ['All', 'General', 'Products & Ingredients', 'Wholesale', 'Care & Storage'] as const;

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredFaqs = activeCategory === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-pandur-bg pt-32 pb-24">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 mb-12 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-4">
          <span>HELP & FREQUENTLY ASKED</span>
        </div>
        <h1 className="font-display font-black text-5xl sm:text-7xl text-pandur-cream uppercase tracking-tighter leading-none mb-6">
          FREQUENTLY ASKED <span className="text-pandur-accent italic">QUESTIONS.</span>
        </h1>
        <p className="font-sans text-base sm:text-lg text-pandur-creamMuted max-w-2xl leading-relaxed">
          Find answers regarding our 36-hour dough maturation process, wholesale application terms, dietary standards, and storage recommendations.
        </p>
      </div>

      {/* Category Pills */}
      <div className="max-w-4xl mx-auto px-6 mb-10 flex flex-wrap gap-2">
        {FAQ_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-display font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-pandur-accent text-pandur-bg shadow-md'
                  : 'bg-pandur-card border border-pandur-border text-pandur-creamMuted hover:border-pandur-accent hover:text-pandur-cream'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Accordions Container */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-pandur-card border border-pandur-border/80 rounded-3xl p-6 sm:p-10 space-y-2">
          {filteredFaqs.map((faq) => (
            <Accordion key={faq.id} item={faq} />
          ))}
        </div>
      </div>

      {/* Support CTA */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-r from-pandur-card via-[#1e110b] to-pandur-card border border-pandur-border/80 rounded-3xl p-8 sm:p-12 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-pandur-accent/20 border border-pandur-accent/40 flex items-center justify-center text-pandur-accent mb-4">
            <HelpCircle size={24} />
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-pandur-cream uppercase tracking-tight mb-3">
            STILL HAVE QUESTIONS?
          </h3>
          <p className="font-sans text-sm text-pandur-creamMuted max-w-md leading-relaxed mb-6">
            Our brand team is standing by to answer your specific event, custom gift, or wholesale questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <MagneticButton href="/contact" variant="primary" dataCursor="CONTACT">
              CONTACT US
            </MagneticButton>
            <MagneticButton href="/wholesale" variant="outline" dataCursor="WHOLESALE">
              WHOLESALE PORTAL
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
