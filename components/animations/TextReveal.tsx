'use client';

import { useEffect, useRef } from 'react';
import { gsap, initGSAP } from '@/lib/animations/gsapSetup';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span';
  stagger?: number;
  delay?: number;
  highlightText?: string;
  highlightClassName?: string;
}

export function TextReveal({
  text,
  className = '',
  as: Component = 'h2',
  stagger = 0.03,
  delay = 0.1,
  highlightText,
  highlightClassName = 'text-pandur-accent italic',
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    initGSAP();
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll('.char');
    if (chars.length === 0) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(chars, { opacity: 1, y: 0, rotationX: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 45,
          rotationX: -60,
          transformOrigin: '50% 100%',
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          delay,
          stagger,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text, stagger, delay]);

  // Split words and letters into individual spans
  const words = text.split(' ');

  return (
    <Component
      ref={containerRef as any}
      className={`inline-block overflow-hidden perspective-1000 ${className}`}
    >
      {words.map((word, wIdx) => {
        const isHighlight = highlightText && word.toLowerCase().includes(highlightText.toLowerCase());

        return (
          <span
            key={wIdx}
            className={`inline-block whitespace-nowrap mr-[0.28em] ${
              isHighlight ? highlightClassName : ''
            }`}
          >
            {word.split('').map((char, cIdx) => (
              <span
                key={cIdx}
                className="char inline-block transition-transform duration-200 hover:-translate-y-1 hover:text-pandur-accent"
                style={{ willChange: 'transform, opacity' }}
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </Component>
  );
}
