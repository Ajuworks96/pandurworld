import { WHOLESALE_CATEGORIES } from '@/lib/data/wholesale';
import { WholesaleForm } from '@/components/forms/WholesaleForm';
import { Sparkles, Coffee, Hotel, Gift, Store, CheckCircle, ArrowRight } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Coffee,
  Hotel,
  Gift,
  Store,
};

const PROCESS_STEPS = [
  { step: '01', title: 'APPLICATION', desc: 'Submit your wholesale inquiry with estimated weekly volumes and business details.' },
  { step: '02', title: 'TASTING SAMPLES', desc: 'Our team dispatches temperature-controlled sample boxes to your location for evaluation.' },
  { step: '03', title: 'TERMS & SETUP', desc: 'We align on delivery schedules, display hardware, and recurring invoice terms.' },
  { step: '04', title: 'FIRST DELIVERY', desc: 'Fresh 36-hour matured cookies arrive at your counter, backed by marketing POS support.' }
];

export default function WholesalePage() {
  return (
    <div className="relative min-h-screen bg-pandur-bg pt-32 pb-24">
      {/* B2B Hero */}
      <section className="max-w-8xl mx-auto px-6 md:px-12 mb-20 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-4">
          <span>B2B & WHOLESALE PARTNERSHIPS</span>
        </div>
        <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-pandur-cream uppercase tracking-tighter leading-none mb-6">
          BRING PANDUR <br />
          TO YOUR <span className="text-pandur-accent italic">BUSINESS.</span>
        </h1>
        <p className="font-sans text-base sm:text-xl text-pandur-creamMuted max-w-2xl leading-relaxed">
          Elevate your establishment with artisanal 36-hour aged cookies engineered for boutique coffee bars, 5-star hotel turn-down amenities, corporate gifting, and luxury retail.
        </p>
      </section>

      {/* Categories Grid */}
      <section className="max-w-8xl mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHOLESALE_CATEGORIES.map((cat, idx) => {
            const IconComp = ICON_MAP[cat.iconName] || Coffee;
            return (
              <div
                key={idx}
                className="bg-pandur-card border border-pandur-border/80 rounded-3xl p-8 flex flex-col justify-between hover:border-pandur-accent/60 transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-pandur-accent/10 border border-pandur-accent/30 flex items-center justify-center text-pandur-accent mb-6">
                    <IconComp size={24} />
                  </div>
                  <span className="font-display font-bold text-[10px] uppercase tracking-wider text-pandur-accent mb-2 block">
                    {cat.subtitle}
                  </span>
                  <h3 className="font-display font-black text-2xl text-pandur-cream uppercase tracking-tight mb-3">
                    {cat.title}
                  </h3>
                  <p className="font-sans text-xs text-pandur-creamMuted leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-pandur-border/60 space-y-2">
                  {cat.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 font-sans text-xs text-pandur-cream">
                      <CheckCircle size={14} className="text-pandur-accent flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How Wholesale Works Steps */}
      <section className="max-w-8xl mx-auto px-6 md:px-12 py-20 border-t border-pandur-border/40 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-3 block">
            ONBOARDING PROCESS
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-pandur-cream uppercase tracking-tight">
            HOW WHOLESALE <span className="text-pandur-accent italic">WORKS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((s) => (
            <div key={s.step} className="bg-pandur-card/60 border border-pandur-border/60 rounded-3xl p-8 relative">
              <span className="font-display font-black text-3xl text-pandur-accent mb-4 block">
                {s.step}
              </span>
              <h4 className="font-display font-bold text-xl text-pandur-cream uppercase tracking-tight mb-2">
                {s.title}
              </h4>
              <p className="font-sans text-xs text-pandur-creamMuted leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="bg-pandur-card border border-pandur-border/80 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <span className="font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-2 block">
              PARTNERSHIP APPLICATION
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-pandur-cream uppercase tracking-tight">
              SEND WHOLESALE ENQUIRY
            </h2>
          </div>
          <WholesaleForm />
        </div>
      </section>
    </div>
  );
}
