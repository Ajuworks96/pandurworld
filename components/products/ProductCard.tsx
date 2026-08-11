'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Camera } from 'lucide-react';
import { Product } from '@/lib/data/products';
import { ImageReveal } from '../ui/ImageReveal';

interface ProductCardProps {
  product: Product;
  className?: string;
  delay?: number;
}

export function ProductCard({ product, className = '', delay = 0 }: ProductCardProps) {
  return (
    <ImageReveal delay={delay} className="h-full">
      <div
        className={`group relative bg-pandur-card border border-pandur-border/80 rounded-3xl p-6 flex flex-col justify-between transition-all duration-500 hover:border-pandur-accent/70 hover:shadow-2xl hover:shadow-pandur-accent/15 min-h-[500px] h-full ${className}`}
        data-cursor="VIEW"
      >
        {/* Subtle Hover Atmospheric Background Gradient */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-pandur-accent/5 via-transparent to-pandur-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Category & Badge Bar */}
        <div className="flex items-center justify-between z-10 mb-3">
          <span className="font-display font-bold text-[10px] uppercase tracking-widest text-pandur-accent bg-pandur-accent/10 px-3 py-1 rounded-full border border-pandur-accent/20">
            {product.category}
          </span>
          {product.featured && (
            <span className="inline-flex items-center gap-1 font-display font-bold text-[9px] uppercase tracking-wider text-pandur-cream bg-pandur-berry/20 px-2.5 py-0.5 rounded-full border border-pandur-berry/30">
              SIGNATURE
            </span>
          )}
        </div>

        {/* Differentiated Commercial Food Photography Visual */}
        <div className="relative w-full h-[220px] sm:h-[240px] rounded-2xl overflow-hidden my-2 select-none z-10 border border-pandur-border/40 shadow-xl group-hover:border-pandur-accent/50 transition-colors">
          <Image
            src={product.heroImage}
            alt={`${product.name} - ${product.photographyConcept.surface}`}
            fill
            className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Photography Concept Overlay Tag */}
          <div className="absolute bottom-2 left-2 right-2 bg-pandur-bg/80 backdrop-blur-md border border-pandur-border/60 rounded-xl px-3 py-1.5 flex items-center justify-between opacity-85 group-hover:opacity-100 transition-opacity">
            <span className="font-display font-bold text-[9px] uppercase tracking-wider text-pandur-creamMuted flex items-center gap-1">
              <Camera size={11} className="text-pandur-accent" />
              {product.photographyConcept.surface}
            </span>
            <span className="font-sans text-[9px] text-pandur-accent font-medium">
              {product.photographyConcept.angle}
            </span>
          </div>
        </div>

        {/* Product Details Section (Hover moves text 4-8px) */}
        <div className="flex flex-col justify-between flex-grow mt-3 z-10 transition-transform duration-500 group-hover:translate-x-1">
          <div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-pandur-cream uppercase tracking-tight leading-snug group-hover:text-pandur-accent transition-colors duration-300 mb-2">
              {product.name}
            </h3>
            <p className="font-sans text-xs text-pandur-creamMuted line-clamp-2 leading-relaxed mb-4">
              {product.shortDescription}
            </p>
          </div>

          {/* Flavour notes & Explore CTA */}
          <div className="pt-4 border-t border-pandur-border/60 flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="font-display font-bold text-[9px] uppercase tracking-wider text-pandur-creamMuted/70">
                FLAVOUR PROFILE
              </span>
              <span className="font-sans font-medium text-xs text-pandur-cream truncate max-w-[170px]">
                {product.flavourBreakdown.core}
              </span>
            </div>

            <Link
              href={`/product/${product.slug}`}
              className="inline-flex items-center gap-1 font-display font-bold text-xs uppercase tracking-wider text-pandur-bg bg-pandur-accent group-hover:bg-pandur-cream transition-colors px-4 py-2.5 rounded-full shadow-md"
              aria-label={`Explore ${product.name}`}
            >
              <span>EXPLORE</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </ImageReveal>
  );
}
