'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '../interactions/MagneticButton';

const NAV_LINKS = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '/about' },
  { name: 'COLLECTIONS', href: '/collections' },
  { name: 'BLOG', href: '/blog' },
  { name: 'CONTACT', href: '/contact' },
  { name: 'FAQS', href: '/faqs' },
  { name: 'WHOLESALE', href: '/wholesale' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 250 && currentScrollY > lastScrollY && !mobileMenuOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          isScrolled
            ? 'bg-pandur-bg/95 backdrop-blur-md border-b border-pandur-border/40 py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-8xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 font-display font-black text-xl md:text-2xl tracking-tighter text-pandur-cream"
            data-cursor="PANDUR"
          >
            <span className="w-3 h-3 rounded-full bg-pandur-accent group-hover:scale-150 transition-transform duration-300" />
            <span>PANDUR<span className="text-pandur-accent">.</span>WORLD</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 bg-pandur-card/70 px-7 py-2.5 rounded-full border border-pandur-border/60 backdrop-blur-md shadow-lg">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-display font-bold text-[11px] uppercase tracking-widest transition-colors duration-300 relative py-1 ${
                    isActive ? 'text-pandur-accent' : 'text-pandur-cream/80 hover:text-pandur-cream'
                  }`}
                  data-cursor="GO"
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-pandur-accent rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden lg:flex items-center gap-4">
            <MagneticButton href="/wholesale" variant="primary" dataCursor="B2B">
              WHOLESALE ENQUIRY
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-full bg-pandur-card border border-pandur-border text-pandur-cream hover:border-pandur-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-pandur-bg/98 backdrop-blur-2xl flex flex-col justify-between p-8 lg:hidden"
          >
            <div className="pt-20 flex flex-col gap-5">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: idx * 0.05 + 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between font-display font-extrabold text-2xl text-pandur-cream hover:text-pandur-accent transition-colors py-2 border-b border-pandur-border/30"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={20} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4 pb-6"
            >
              <Link
                href="/wholesale"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 rounded-full bg-pandur-accent text-pandur-bg font-display font-bold text-center text-sm uppercase tracking-wider shadow-lg shadow-pandur-accent/20"
              >
                WHOLESALE ENQUIRY
              </Link>
              <p className="text-center font-sans text-xs text-pandur-creamMuted">
                © {new Date().getFullYear()} Pandur World. Crafted for cookie connoisseurs.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
