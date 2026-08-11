'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, Product } from '@/lib/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { Sparkles } from 'lucide-react';
import { TextReveal } from '@/components/animations/TextReveal';

const CATEGORIES = ['All', 'Signature Dark', 'Stuffed Velvet', 'Crunch Bites', 'Artisanal Special'] as const;

export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProducts = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-pandur-bg pt-32 pb-24 text-pandur-cream overflow-hidden">

      {/* Decorative Background Flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-pandur-accent/8 rounded-full blur-[180px] pointer-events-none" />

      {/* Hero Header */}
      <div className="max-w-8xl mx-auto px-6 md:px-12 mb-16 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-4">
          <Sparkles size={16} />
          <span>ARTISANAL COOKIE CATALOGUE</span>
        </div>

        <TextReveal
          as="h1"
          text="EXPLORE THE PANDUR WORLD COLLECTION."
          highlightText="COLLECTION"
          className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-pandur-cream uppercase tracking-tighter leading-none mb-6"
        />

        <p className="font-sans text-base sm:text-lg text-pandur-creamMuted max-w-2xl leading-relaxed">
          Every cookie in our collection is single-batch baked after a 36-hour dough maturation process. Browse our 8 signature flavor profiles below.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-8xl mx-auto px-6 md:px-12 mb-12 flex flex-wrap items-center gap-3">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-display font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-pandur-accent text-pandur-bg shadow-lg shadow-pandur-accent/25 scale-105'
                  : 'bg-pandur-card border border-pandur-border text-pandur-creamMuted hover:border-pandur-accent/60 hover:text-pandur-cream'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
