'use client';

import { Cookie } from 'lucide-react';

interface MarqueeProps {
  items: string[];
  speed?: 'slow' | 'medium' | 'fast';
  direction?: 'left' | 'right';
  accent?: boolean;
  className?: string;
}

const SPEED_MAP = {
  slow: '50s',
  medium: '32s',
  fast: '18s',
};

export function Marquee({
  items,
  speed = 'medium',
  direction = 'left',
  accent = false,
  className = '',
}: MarqueeProps) {
  const duration = SPEED_MAP[speed];
  const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div className={`overflow-hidden w-full ${className}`}>
      <div
        className={`flex items-center gap-0 w-max ${animClass}`}
        style={{ animationDuration: duration }}
        aria-hidden="true"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-4">
            <Cookie
              size={13}
              className={accent ? 'text-pandur-bg/60' : 'text-pandur-accent'}
            />
            <span
              className={`font-display font-black text-xs uppercase tracking-widest whitespace-nowrap ${
                accent ? 'text-pandur-bg' : 'text-pandur-creamMuted'
              }`}
            >
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Dual bidirectional marquee (Oreo.com style — two rows moving opposite directions)
interface DualMarqueeProps {
  row1: string[];
  row2: string[];
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

export function DualMarquee({ row1, row2, speed = 'medium', className = '' }: DualMarqueeProps) {
  return (
    <div className={`flex flex-col gap-0 ${className}`}>
      <Marquee items={row1} speed={speed} direction="left" />
      <Marquee items={row2} speed={speed} direction="right" accent />
    </div>
  );
}
