'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { TextReveal } from '../animations/TextReveal';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export function GuessFlavourDrag() {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const opacity = useTransform(x, [-180, 0, 180], [0.3, 1, 0.3]);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (Math.abs(info.offset.x) > 90 && !isRevealed) {
      setIsRevealed(true);
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E58A38', '#F7F0E6', '#C94E34'],
        });
      } catch (e) {
        // Fallback
      }
    }
  };

  const resetInteraction = () => {
    setIsRevealed(false);
    x.set(0);
  };

  return (
    <section className="relative bg-pandur-card/90 border-y border-pandur-border/80 py-20 overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Story & Status */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-3">
            <span>INTERACTIVE FLAVOUR DISCOVERY</span>
          </div>

          <TextReveal
            as="h2"
            text="GUESS THE FLAVOUR."
            highlightText="FLAVOUR"
            className="font-display font-black text-4xl sm:text-6xl text-pandur-cream uppercase tracking-tight leading-none mb-6"
          />

          <p className="font-sans text-base text-pandur-creamMuted max-w-lg leading-relaxed mb-8">
            Drag or swipe the mystery cookie card left or right to uncover the secret artisanal layers hidden inside.
          </p>

          {/* Status Box */}
          <div className="bg-pandur-bg/80 border border-pandur-border/60 rounded-2xl p-6 max-w-md">
            {!isRevealed ? (
              <div className="flex items-center gap-4 text-pandur-cream">
                <div className="w-10 h-10 rounded-full bg-pandur-accent/20 border border-pandur-accent/40 flex items-center justify-center text-pandur-accent flex-shrink-0 animate-pulse">
                  <HelpCircle size={22} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm uppercase tracking-wider">
                    WHAT&apos;S INSIDE?
                  </h4>
                  <p className="font-sans text-xs text-pandur-creamMuted">
                    Drag the card horizontally to break the mystery seal.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4 text-pandur-cream">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm uppercase tracking-wider text-pandur-accent">
                      REVEALED!
                    </h4>
                    <p className="font-sans text-xs text-pandur-creamMuted">
                      Single-Origin Cocoa + Salted Amber Caramel + Maldon Flakes
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetInteraction}
                  className="p-2 rounded-full bg-pandur-border/60 hover:bg-pandur-accent hover:text-pandur-bg transition-colors text-pandur-cream"
                  title="Try Again"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Draggable Card with Background-less PNG Cookie */}
        <div
          ref={containerRef}
          className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[380px]"
          data-cursor="DRAG CARD"
        >
          <motion.div
            style={{ x, opacity, rotate }}
            drag="x"
            dragConstraints={{ left: -140, right: 140 }}
            dragElastic={0.25}
            onDragEnd={handleDragEnd}
            whileTap={{ scale: 0.96 }}
            className="relative w-full max-w-[360px] h-[400px] bg-gradient-to-b from-[#24150D] to-pandur-bg border-2 border-pandur-accent/50 rounded-3xl p-6 shadow-2xl flex flex-col justify-between items-center cursor-grab active:cursor-grabbing select-none"
          >
            {/* Top Label */}
            <div className="w-full flex items-center justify-between text-xs font-display font-bold text-pandur-creamMuted uppercase tracking-widest">
              <span>PANDUR MYSTERY #01</span>
              <span>{isRevealed ? 'UNLOCKED' : 'LOCKED'}</span>
            </div>

            {/* Visual Center with Floating Background-less PNG Cookie */}
            <div className="relative w-[220px] h-[220px] flex items-center justify-center">
              <Image
                src="/images/products/salted-caramel.png"
                alt="Mystery Cookie"
                fill
                className={`object-contain transition-all duration-700 ${
                  isRevealed ? 'brightness-100 scale-110 drop-shadow-[0_20px_30px_rgba(229,138,56,0.4)]' : 'brightness-[0.18] blur-sm'
                }`}
              />
              {!isRevealed && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-black text-6xl text-pandur-accent/90 drop-shadow-lg animate-bounce">
                    ?
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Card Content */}
            <div className="w-full text-center">
              {!isRevealed ? (
                <p className="font-display font-bold text-xs uppercase tracking-widest text-pandur-accent animate-pulse">
                  ← DRAG HORIZONTALLY TO REVEAL →
                </p>
              ) : (
                <div className="space-y-1">
                  <p className="font-display font-black text-xl text-pandur-cream uppercase tracking-tight">
                    SALTED CARAMEL VELVET
                  </p>
                  <p className="font-sans text-xs text-pandur-creamMuted">
                    Brown Butter • Amber Caramel • Sea Salt
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
