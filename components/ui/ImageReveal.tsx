'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap, initGSAP } from '@/lib/animations/gsapSetup';

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  insetAmount?: string;
}

export function ImageReveal({
  children,
  className = '',
  delay = 0,
  insetAmount = '8%',
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGSAP();
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Container clip-path reveal + child scale down
      const imgTarget = el.querySelector('img') || el.firstElementChild;

      gsap.fromTo(
        el,
        {
          clipPath: `inset(${insetAmount} ${insetAmount} ${insetAmount} ${insetAmount} round 1.5rem)`,
        },
        {
          clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
          duration: 1.1,
          delay,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      if (imgTarget) {
        gsap.fromTo(
          imgTarget,
          { scale: 1.12 },
          {
            scale: 1,
            duration: 1.2,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [delay, insetAmount]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden will-change-transform ${className}`}
      style={{ clipPath: `inset(${insetAmount} ${insetAmount} ${insetAmount} ${insetAmount} round 1.5rem)` }}
    >
      {children}
    </div>
  );
}
