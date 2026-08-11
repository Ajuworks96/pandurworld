'use client';

import React from 'react';
import Link from 'next/link';
import { useMagnetic } from '@/hooks/useMagnetic';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  className?: string;
  dataCursor?: string;
  type?: 'button' | 'submit';
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  dataCursor = 'EXPLORE',
  type = 'button',
}: MagneticButtonProps) {
  const magneticRef = useMagnetic<HTMLDivElement>(8);

  const baseStyles =
    'relative inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-xs md:text-sm px-7 py-4 rounded-full transition-all duration-300 overflow-hidden group select-none cursor-pointer';

  const variants = {
    primary: 'bg-pandur-accent text-pandur-bg hover:bg-pandur-accentDark shadow-lg shadow-pandur-accent/20',
    secondary: 'bg-pandur-cream text-pandur-bg hover:bg-white',
    outline: 'border border-pandur-cream/30 text-pandur-cream hover:border-pandur-accent hover:text-pandur-accent',
    dark: 'bg-pandur-card border border-pandur-border text-pandur-cream hover:border-pandur-accent',
  };

  const content = (
    <div
      ref={magneticRef}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      data-cursor={dataCursor}
    >
      <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
        {children}
      </span>
      <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className="inline-block focus:outline-none">
      {content}
    </button>
  );
}
