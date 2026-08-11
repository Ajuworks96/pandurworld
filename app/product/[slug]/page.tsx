import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, PRODUCTS } from '@/lib/data/products';
import { IngredientStory } from '@/components/products/IngredientStory';
import { ProductCard } from '@/components/products/ProductCard';
import { MagneticButton } from '@/components/interactions/MagneticButton';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { TextReveal } from '@/components/animations/TextReveal';
import { ArrowLeft, CheckCircle2, Camera } from 'lucide-react';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found | Pandur World' };

  return {
    title: `${product.name} | Pandur World`,
    description: product.shortDescription,
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-pandur-bg text-pandur-cream pt-28 pb-20 overflow-hidden">
      {/* Back Button */}
      <div className="max-w-8xl mx-auto px-6 md:px-12 mb-8">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted hover:text-pandur-accent transition-colors"
        >
          <ArrowLeft size={16} />
          <span>BACK TO COLLECTION</span>
        </Link>
      </div>

      {/* 1. Hero Commercial Photography Stage (WHOLE COOKIE ON SURFACE) */}
      <section className="max-w-8xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        {/* Left Column: Differentiated Commercial Food Photograph */}
        <div className="lg:col-span-6 flex justify-center relative">
          <div className="relative w-full max-w-[500px] h-[360px] sm:h-[450px] rounded-3xl overflow-hidden border border-pandur-border/80 shadow-2xl select-none group">
            <Image
              src={product.heroImage}
              alt={product.name}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 600px"
            />
            {/* Photography Concept Overlay Badge */}
            <div className="absolute top-4 left-4 bg-pandur-bg/85 backdrop-blur-md border border-pandur-border/60 rounded-full px-4 py-1.5 flex items-center gap-2">
              <Camera size={13} className="text-pandur-accent" />
              <span className="font-display font-bold text-[10px] uppercase tracking-widest text-pandur-cream">
                {product.photographyConcept.surface} • {product.photographyConcept.angle}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Details */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-3">
            <span>{product.category}</span>
          </div>

          <TextReveal
            as="h1"
            text={product.name}
            highlightText="PANDUR"
            className="font-display font-black text-4xl sm:text-6xl text-pandur-cream uppercase tracking-tight mb-4"
          />

          <p className="font-display font-bold text-lg text-pandur-accent italic mb-6">
            {product.tagline}
          </p>

          <p className="font-sans text-base text-pandur-creamMuted leading-relaxed mb-8">
            {product.longDescription}
          </p>

          {/* Texture Meters */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-pandur-card border border-pandur-border/80 rounded-2xl mb-8">
            <div className="text-center border-r border-pandur-border/60 pr-2">
              <span className="font-display font-bold text-[10px] uppercase tracking-widest text-pandur-creamMuted block mb-1">
                CRUNCH
              </span>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < product.texture.crunch ? 'bg-pandur-accent' : 'bg-pandur-border'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="text-center border-r border-pandur-border/60 pr-2">
              <span className="font-display font-bold text-[10px] uppercase tracking-widest text-pandur-creamMuted block mb-1">
                CHEWINESS
              </span>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < product.texture.chewiness ? 'bg-pandur-accent' : 'bg-pandur-border'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <span className="font-display font-bold text-[10px] uppercase tracking-widest text-pandur-creamMuted block mb-1">
                RICHNESS
              </span>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < product.texture.richness ? 'bg-pandur-accent' : 'bg-pandur-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <MagneticButton href="/contact" variant="primary">
              ORDER FRESH BATCH
            </MagneticButton>
            <MagneticButton href="/wholesale" variant="outline">
              WHOLESALE INQUIRY
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 2. Visual Story Pipeline: MULTI-ANGLE CAMPAIGN VISUALS */}
      <section className="bg-pandur-card/50 border-y border-pandur-border/60 py-20 mb-24">
        <div className="max-w-8xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-display font-bold text-xs uppercase tracking-widest text-pandur-accent block mb-2">
              MULTI-ANGLE PHOTOGRAPHY CAMPAIGN
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-pandur-cream uppercase tracking-tight">
              FROM GRAIN TO <span className="text-pandur-accent italic">PERFECT BITE</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1: HERO CAMPAIGN PERSPECTIVE */}
            <ImageReveal delay={0.1}>
              <div className="bg-pandur-card border border-pandur-border/80 rounded-3xl p-6 flex flex-col justify-between min-h-[380px]">
                <div className="relative w-full h-[200px] rounded-2xl overflow-hidden mb-4 border border-pandur-border/50">
                  <Image
                    src={product.heroImage}
                    alt="Hero Photography Scene"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="font-display font-bold text-[10px] uppercase tracking-widest text-pandur-accent block mb-1">
                    01. SURFACE & COMPOSITION
                  </span>
                  <h3 className="font-display font-bold text-xl text-pandur-cream uppercase tracking-tight mb-2">
                    {product.photographyConcept.surface}
                  </h3>
                  <p className="font-sans text-xs text-pandur-creamMuted">
                    {product.flavourBreakdown.base}
                  </p>
                </div>
              </div>
            </ImageReveal>

            {/* Step 2: MACRO TEXTURE & CORE */}
            <ImageReveal delay={0.25}>
              <div className="bg-pandur-card border border-pandur-border/80 rounded-3xl p-6 flex flex-col justify-between min-h-[380px]">
                <div className="relative w-full h-[200px] rounded-2xl overflow-hidden mb-4 bg-pandur-bg/80 flex items-center justify-center border border-pandur-border/50">
                  <Image
                    src={product.macroImage}
                    alt="Macro Ingredient Texture"
                    fill
                    className="object-contain p-4 scale-110 drop-shadow-[0_15px_20px_rgba(0,0,0,0.9)]"
                  />
                </div>
                <div>
                  <span className="font-display font-bold text-[10px] uppercase tracking-widest text-pandur-accent block mb-1">
                    02. MACRO TEXTURE & FILLING
                  </span>
                  <h3 className="font-display font-bold text-xl text-pandur-cream uppercase tracking-tight mb-2">
                    {product.flavourBreakdown.core}
                  </h3>
                  <p className="font-sans text-xs text-pandur-creamMuted">
                    Single-origin cocoa folded with grass-fed French cultured butter & Maldon flakes.
                  </p>
                </div>
              </div>
            </ImageReveal>

            {/* Step 3: EDITORIAL DETAIL & BITE */}
            <ImageReveal delay={0.4}>
              <div className="bg-pandur-card border border-pandur-border/80 rounded-3xl p-6 flex flex-col justify-between min-h-[380px]">
                <div className="relative w-full h-[200px] rounded-2xl overflow-hidden mb-4 bg-pandur-bg/80 flex items-center justify-center border border-pandur-border/50">
                  <Image
                    src={product.detailImage}
                    alt="Editorial Detail Bite"
                    fill
                    className="object-contain p-4 scale-105 drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)]"
                  />
                </div>
                <div>
                  <span className="font-display font-bold text-[10px] uppercase tracking-widest text-pandur-accent block mb-1">
                    03. MOLTEN REVEAL & FINISH
                  </span>
                  <h3 className="font-display font-bold text-xl text-pandur-cream uppercase tracking-tight mb-2">
                    {product.flavourBreakdown.finish}
                  </h3>
                  <p className="font-sans text-xs text-pandur-creamMuted">
                    A warm, decadent molten center that releases upon first breaking the crust.
                  </p>
                </div>
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 3. Ingredients Checklist Section */}
      <section className="max-w-8xl mx-auto px-6 md:px-12 mb-24">
        <div className="bg-pandur-card border border-pandur-border/80 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <span className="font-display font-bold text-xs uppercase tracking-widest text-pandur-accent block mb-2">
              CURATED INGREDIENTS
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-pandur-cream uppercase tracking-tight mb-4">
              WHAT GOES INSIDE.
            </h3>
            <p className="font-sans text-sm text-pandur-creamMuted leading-relaxed">
              We believe in transparency. Zero artificial preservatives, zero palm oil, and zero shortcuts. Only pure culinary excellence.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.ingredients.map((ing, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 bg-pandur-bg/60 border border-pandur-border/50 rounded-xl"
              >
                <CheckCircle2 size={18} className="text-pandur-accent flex-shrink-0" />
                <span className="font-sans font-medium text-xs text-pandur-cream">
                  {ing}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Global Craft Story */}
      <IngredientStory />

      {/* 5. Related Products */}
      <section className="max-w-8xl mx-auto px-6 md:px-12 pt-16 border-t border-pandur-border/40">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-pandur-accent block mb-2">
              MORE FLAVOURS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-pandur-cream uppercase tracking-tight">
              EXPLORE OTHER <span className="text-pandur-accent italic">CREATIONS</span>
            </h2>
          </div>
          <Link
            href="/collections"
            className="font-display font-bold text-xs uppercase tracking-wider text-pandur-accent hover:text-pandur-cream transition-colors"
          >
            VIEW ALL COLLECTIONS →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((relProduct, idx) => (
            <ProductCard key={relProduct.id} product={relProduct} delay={idx * 0.15} />
          ))}
        </div>
      </section>
    </div>
  );
}
