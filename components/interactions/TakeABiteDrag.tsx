'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Utensils, RotateCcw } from 'lucide-react';
import { TextReveal } from '../animations/TextReveal';

export function TakeABiteDrag() {
  const [hasBitten, setHasBitten] = useState(false);
  const dragY = useMotionValue(0);

  const rotate = useTransform(dragY, [0, 150], [0, 25]);
  const scale = useTransform(dragY, [0, 150], [1, 1.12]);
  const creamOpacity = useTransform(dragY, [0, 100], [0, 1]);

  const handleDragEnd = (_: any, info: { offset: { y: number } }) => {
    if (info.offset.y > 80 || info.offset.y < -80) {
      setHasBitten(true);
    }
  };

  const handleReset = () => {
    setHasBitten(false);
    dragY.set(0);
  };

  return (
    <section className="relative bg-pandur-bg py-20 border-t border-pandur-border/40 overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Interactive Visual Canvas */}
        <div
          className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[420px] order-2 lg:order-1"
          data-cursor="PULL COOKIE"
        >
          <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">
            {/* Inner Cream Reveal Backdrop */}
            <motion.div
              style={{ opacity: creamOpacity }}
              className="absolute inset-0 rounded-full bg-pandur-accent/25 blur-2xl pointer-events-none"
            />

            {/* Background-less Draggable PNG Cookie */}
            <motion.div
              style={{ y: dragY, rotate, scale }}
              drag="y"
              dragConstraints={{ top: -100, bottom: 150 }}
              dragElastic={0.25}
              onDragEnd={handleDragEnd}
              whileTap={{ scale: 1.05 }}
              className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
            >
              <Image
                src="/images/hero/hero-cookie.png"
                alt="Take a Bite Interactive Cookie"
                fill
                priority
                className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)]"
              />
            </motion.div>
          </div>

          <p className="mt-4 font-display font-bold text-xs uppercase tracking-widest text-pandur-creamMuted/70">
            {hasBitten ? 'CRUMB & CREAM UNLOCKED' : 'PULL DOWN TO BREAK THE CRUST'}
          </p>
        </div>

        {/* Story Copy & Staggered Heading */}
        <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-3">
            <span>SIGNATURE SENSORY INTERACTION</span>
          </div>

          <TextReveal
            as="h2"
            text="TAKE A BITE."
            highlightText="BITE"
            className="font-display font-black text-4xl sm:text-6xl text-pandur-cream uppercase tracking-tight leading-none mb-6"
          />

          <p className="font-sans text-base text-pandur-creamMuted max-w-lg leading-relaxed mb-8">
            Experience the tactile satisfaction of breaking open a 36-hour aged Pandur cookie. Drag the cookie vertically to reveal the warm, molten core and crisp butter crumbs.
          </p>

          <div className="bg-pandur-card border border-pandur-border/80 rounded-2xl p-6 max-w-md">
            {hasBitten ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pandur-accent/20 border border-pandur-accent/40 flex items-center justify-center text-pandur-accent">
                    <Utensils size={20} />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-lg text-pandur-cream uppercase tracking-tight">
                      PERFECT BITE.
                    </h4>
                    <p className="font-sans text-xs text-pandur-creamMuted">
                      Single-origin Ecuadorian molten center revealed.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-full bg-pandur-border/60 hover:bg-pandur-accent hover:text-pandur-bg transition-colors text-pandur-cream"
                  title="Reset cookie"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-pandur-creamMuted">
                <div className="w-10 h-10 rounded-full bg-pandur-border/40 flex items-center justify-center text-pandur-cream font-display font-bold text-xs">
                  01
                </div>
                <p className="font-sans text-xs">
                  Grab and drag the cookie down to trigger the crumb expansion.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
