'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, initGSAP } from '@/lib/animations/gsapSetup';

interface ScrollRevealOptions {
  translateY?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  threshold?: string;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options: ScrollRevealOptions = {}) {
  const elementRef = useRef<T | null>(null);

  const {
    translateY = 40,
    scale = 1,
    duration = 0.9,
    delay = 0,
    stagger = 0.1,
    threshold = 'top 85%'
  } = options;

  useEffect(() => {
    initGSAP();
    const el = elementRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const children = el.children.length > 0 && el.hasAttribute('data-reveal-children')
      ? Array.from(el.children)
      : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        {
          opacity: 0,
          y: translateY,
          scale: scale !== 1 ? scale : 1,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          delay,
          stagger: children.length > 1 ? stagger : 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: threshold,
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [translateY, scale, duration, delay, stagger, threshold]);

  return elementRef;
}
