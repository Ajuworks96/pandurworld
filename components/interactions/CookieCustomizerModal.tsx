'use client';

import { useState } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { X, Check, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BASES = [
  { id: 'dark', name: '70% Ecuadorian Dark Cocoa', color: '#1A0E08', image: '/images/products/double-dark.png' },
  { id: 'butter', name: 'Toasted French Brown Butter', color: '#3D2512', image: '/images/products/salted-caramel.png' },
  { id: 'pistachio', name: 'Bronte Pistachio Sablé', color: '#202B18', image: '/images/products/pistachio-honey.png' },
];

const FILLINGS = [
  { id: 'caramel', name: 'Salted Amber Caramel', color: '#E58A38' },
  { id: 'fudge', name: 'Molten Dark Chocolate Fudge', color: '#2B170C' },
  { id: 'pistachio-cream', name: 'White Pistachio Velvet', color: '#889966' },
];

const TOPPINGS = [
  { id: 'salt', name: 'Maldon Sea Salt Flakes' },
  { id: 'hazelnut', name: 'Toasted Hazelnut Shavings' },
  { id: 'sprinkles', name: 'Artisanal Color Sprinkles' },
];

export function CookieCustomizerModal({ isOpen, onClose }: CookieCustomizerModalProps) {
  const [selectedBase, setSelectedBase] = useState(BASES[0]);
  const [selectedFilling, setSelectedFilling] = useState(FILLINGS[0]);
  const [selectedTopping, setSelectedTopping] = useState(TOPPINGS[0]);
  const [isCreated, setIsCreated] = useState(false);

  const handleFinish = () => {
    setIsCreated(true);
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#E58A38', '#F7F0E6', '#C94E34', '#889966'],
      });
    } catch (e) {
      // Fallback
    }
  };

  const handleReset = () => {
    setIsCreated(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-pandur-card border border-pandur-border/80 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-auto overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-pandur-bg/80 hover:bg-pandur-accent hover:text-pandur-bg transition-colors text-pandur-cream"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {!isCreated ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Live Custom Cookie Preview */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[300px]">
                  <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-full flex items-center justify-center">
                    <div
                      className="absolute inset-0 rounded-full blur-2xl transition-colors duration-500"
                      style={{ backgroundColor: `${selectedFilling.color}35` }}
                    />

                    <Image
                      src={selectedBase.image}
                      alt="Customized Pandur Cookie"
                      fill
                      className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] transition-all duration-500"
                    />
                  </div>

                  <span className="font-display font-bold text-[10px] uppercase tracking-widest text-pandur-accent mt-4">
                    LIVE CUSTOMIZATION PREVIEW
                  </span>
                </div>

                {/* Right Column: Customizer Controls */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-2">
                    <Sparkles size={14} />
                    <span>PANDUR COOKIE STUDIO</span>
                  </div>

                  <h3 className="font-display font-black text-3xl text-pandur-cream uppercase tracking-tight mb-6">
                    BUILD YOUR <span className="text-pandur-accent italic">COOKIE</span>
                  </h3>

                  {/* 1. Base Selection */}
                  <div className="mb-5">
                    <label className="font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted block mb-2">
                      1. SELECT DOUGH BASE
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {BASES.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setSelectedBase(b)}
                          className={`flex items-center justify-between p-3 rounded-xl border text-xs font-display font-bold uppercase transition-all ${
                            selectedBase.id === b.id
                              ? 'bg-pandur-accent text-pandur-bg border-pandur-accent'
                              : 'bg-pandur-bg/60 text-pandur-cream border-pandur-border/60 hover:border-pandur-accent/50'
                          }`}
                        >
                          <span>{b.name}</span>
                          {selectedBase.id === b.id && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Filling Selection */}
                  <div className="mb-5">
                    <label className="font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted block mb-2">
                      2. SELECT MOLTEN CORE
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {FILLINGS.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setSelectedFilling(f)}
                          className={`flex items-center justify-between p-3 rounded-xl border text-xs font-display font-bold uppercase transition-all ${
                            selectedFilling.id === f.id
                              ? 'bg-pandur-accent text-pandur-bg border-pandur-accent'
                              : 'bg-pandur-bg/60 text-pandur-cream border-pandur-border/60 hover:border-pandur-accent/50'
                          }`}
                        >
                          <span>{f.name}</span>
                          {selectedFilling.id === f.id && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Topping Selection */}
                  <div className="mb-6">
                    <label className="font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted block mb-2">
                      3. SELECT ARTISANAL GARNISH
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {TOPPINGS.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setSelectedTopping(t)}
                          className={`flex items-center justify-between p-3 rounded-xl border text-xs font-display font-bold uppercase transition-all ${
                            selectedTopping.id === t.id
                              ? 'bg-pandur-accent text-pandur-bg border-pandur-accent'
                              : 'bg-pandur-bg/60 text-pandur-cream border-pandur-border/60 hover:border-pandur-accent/50'
                          }`}
                        >
                          <span>{t.name}</span>
                          {selectedTopping.id === t.id && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleFinish}
                    className="w-full py-4 rounded-full bg-pandur-accent text-pandur-bg font-display font-black text-sm uppercase tracking-wider hover:bg-pandur-accentDark transition-colors shadow-xl"
                  >
                    CREATE MY CUSTOM COOKIE
                  </button>
                </div>
              </div>
            ) : (
              /* Success Creation Screen */
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <Check size={32} />
                </div>

                <h3 className="font-display font-black text-4xl text-pandur-cream uppercase tracking-tight mb-3">
                  YOUR CUSTOM COOKIE IS READY!
                </h3>

                <p className="font-sans text-sm text-pandur-creamMuted max-w-md mx-auto mb-8">
                  {selectedBase.name} filled with {selectedFilling.name} and garnished with {selectedTopping.name}.
                </p>

                <div className="relative w-[260px] h-[260px] mx-auto mb-8">
                  <Image
                    src={selectedBase.image}
                    alt="Custom Cookie Result"
                    fill
                    className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pandur-bg border border-pandur-border text-pandur-cream font-display font-bold text-xs uppercase hover:bg-pandur-border transition-colors"
                  >
                    <RefreshCw size={14} />
                    <span>CREATE ANOTHER</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="px-8 py-3 rounded-full bg-pandur-accent text-pandur-bg font-display font-bold text-xs uppercase hover:bg-pandur-accentDark transition-colors shadow-lg"
                  >
                    DONE & CLOSE
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
