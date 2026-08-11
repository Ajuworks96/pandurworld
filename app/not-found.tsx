import Link from 'next/link';
import { MagneticButton } from '@/components/interactions/MagneticButton';
import { Sparkles, Cookie } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pandur-bg flex items-center justify-center px-6 py-32 text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-pandur-accent/20 border border-pandur-accent flex items-center justify-center text-pandur-accent mb-8 animate-bounce">
          <Cookie size={40} />
        </div>

        <span className="font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-4 block">
          ERROR 404 — PAGE NOT FOUND
        </span>

        <h1 className="font-display font-black text-5xl sm:text-7xl text-pandur-cream uppercase tracking-tighter mb-6 leading-none">
          LOST IN THE <br />
          <span className="text-pandur-accent italic">PANDUR UNIVERSE.</span>
        </h1>

        <p className="font-sans text-base text-pandur-creamMuted max-w-md leading-relaxed mb-8">
          The cookie crumb you are looking for has crumbled or moved to another dimension. Return home to continue exploring.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <MagneticButton href="/" variant="primary" dataCursor="HOME">
            RETURN HOME
          </MagneticButton>
          <MagneticButton href="/collections" variant="outline" dataCursor="COOKIES">
            EXPLORE COLLECTION
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
