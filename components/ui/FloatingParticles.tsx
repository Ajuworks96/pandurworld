'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations/gsapSetup';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  blur: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export function FloatingParticles({ count = 20, className = '' }: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Generate particle DOM nodes
    const particleElements: HTMLDivElement[] = [];
    const colors = [
      'rgba(229, 138, 56, 0.45)', // Amber caramel
      'rgba(247, 240, 230, 0.35)', // Salt flake cream
      'rgba(180, 110, 60, 0.30)', // Cocoa dust
      'rgba(225, 175, 110, 0.40)', // Golden butter speck
    ];

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const size = Math.random() * 8 + 3; // 3px to 11px
      const isForeground = i % 3 === 0;
      const blur = isForeground ? Math.random() * 3 + 2 : Math.random() * 1.5;
      const opacity = Math.random() * 0.5 + 0.2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const top = Math.random() * 100;

      el.style.position = 'absolute';
      el.style.left = `${left}%`;
      el.style.top = `${top}%`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.borderRadius = i % 2 === 0 ? '50%' : '20%';
      el.style.backgroundColor = color;
      el.style.filter = `blur(${blur}px)`;
      el.style.opacity = `${opacity}`;
      el.style.pointerEvents = 'none';
      el.style.willChange = 'transform';
      el.className = 'particle-node';

      container.appendChild(el);
      particleElements.push(el);

      // Unique floating animation per particle
      gsap.to(el, {
        y: `-=${Math.random() * 60 + 30}`,
        x: `+=${Math.random() * 40 - 20}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 6 + 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.easeInOut',
        delay: Math.random() * 3,
      });
    }

    return () => {
      particleElements.forEach((el) => el.remove());
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-20 ${className}`}
      aria-hidden="true"
    />
  );
}
