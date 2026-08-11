'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, initGSAP } from '@/lib/animations/gsapSetup';

// Lifestyle / social proof photo tiles — using product images styled as social cards
const ROW1 = [
  { id: 1, image: '/images/products/pandur-double-dark.png', label: '@foodie_arjun', likes: '2.4K' },
  { id: 2, image: '/images/products/pandur-salted-caramel.png', label: '@luxe_bites', likes: '1.8K' },
  { id: 3, image: '/images/products/pandur-pistachio-honey.png', label: '@sweettooth_co', likes: '3.1K' },
  { id: 4, image: '/images/products/pandur-hazelnut-praline.png', label: '@cravings.daily', likes: '988' },
  { id: 5, image: '/images/products/pandur-vanilla-bean.png', label: '@bakersguild', likes: '4.2K' },
  { id: 6, image: '/images/products/pandur-espresso-roast.png', label: '@morningcoffee', likes: '2.7K' },
];

const ROW2 = [
  { id: 7, image: '/images/products/pandur-ruby-berry.png', label: '@dessertclub', likes: '5.3K' },
  { id: 8, image: '/images/products/pandur-spiced-pecan.png', label: '@autumnbakes', likes: '1.2K' },
  { id: 9, image: '/images/products/pandur-double-dark.png', label: '@darkchoc.lover', likes: '3.9K' },
  { id: 10, image: '/images/products/pandur-salted-caramel.png', label: '@caramel.diaries', likes: '2.1K' },
  { id: 11, image: '/images/products/pandur-pistachio-honey.png', label: '@nutella_vibes', likes: '890' },
  { id: 12, image: '/images/products/pandur-hazelnut-praline.png', label: '@praline.world', likes: '6.1K' },
];

function PhotoTile({ image, label, likes }: { image: string; label: string; likes: string }) {
  return (
    <div className="relative w-[200px] h-[220px] shrink-0 rounded-2xl overflow-hidden border border-pandur-border/70 group hover:border-pandur-accent/60 transition-colors">
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="200px"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-pandur-bg/90 via-transparent to-transparent" />
      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="font-display font-bold text-[10px] text-pandur-cream uppercase tracking-wider truncate">{label}</p>
        <p className="font-sans text-[10px] text-pandur-accent">♡ {likes}</p>
      </div>
    </div>
  );
}

export function FanPhotoTicker() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGSAP();
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        section.querySelectorAll('.fan-word'),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-pandur-card/30 border-t border-pandur-border/40 overflow-hidden"
    >
      <div className="max-w-8xl mx-auto px-6 md:px-12 mb-12 text-center">
        <span className="font-display font-bold text-xs uppercase tracking-widest text-pandur-accent block mb-3">
          PANDUR COMMUNITY
        </span>
        <h2 className="font-display font-black text-4xl sm:text-6xl text-pandur-cream uppercase tracking-tighter leading-none overflow-hidden">
          {['MADE', 'WITH', 'PANDUR', 'LOVE.'].map((word, i) => (
            <span key={i} className="fan-word inline-block mr-3">{word}</span>
          ))}
        </h2>
      </div>

      {/* Row 1 — scrolls LEFT (CSS animation) */}
      <div className="mb-5 overflow-hidden">
        <div
          ref={row1Ref}
          className="flex gap-4 w-max animate-marquee-left"
          style={{ animationDuration: '40s' }}
        >
          {[...ROW1, ...ROW1].map((item, i) => (
            <PhotoTile key={`r1-${i}`} {...item} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls RIGHT (CSS animation) */}
      <div className="overflow-hidden">
        <div
          ref={row2Ref}
          className="flex gap-4 w-max animate-marquee-right"
          style={{ animationDuration: '36s' }}
        >
          {[...ROW2, ...ROW2].map((item, i) => (
            <PhotoTile key={`r2-${i}`} {...item} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <p className="font-sans text-sm text-pandur-creamMuted">
          Tag us{' '}
          <span className="text-pandur-accent font-bold">#PandurWorld</span>
          {' '}to be featured
        </p>
      </div>
    </section>
  );
}
