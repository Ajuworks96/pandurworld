import { ContactForm } from '@/components/forms/ContactForm';
import { Sparkles, MapPin, Mail, PhoneCall } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-pandur-bg pt-32 pb-24">
      <div className="max-w-8xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Atelier Details */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-4">
              <Sparkles size={16} />
              <span>GET IN TOUCH</span>
            </div>
            <h1 className="font-display font-black text-5xl sm:text-7xl text-pandur-cream uppercase tracking-tighter leading-none mb-6">
              LET&apos;S <span className="text-pandur-accent italic">TALK.</span>
            </h1>
            <p className="font-sans text-base text-pandur-creamMuted leading-relaxed max-w-md">
              Whether you are planning a corporate gifting campaign, inquiring about bespoke flavor formulations, or simply sharing your love for cookies, we would love to hear from you.
            </p>
          </div>

          <div className="space-y-6 pt-6 border-t border-pandur-border/60">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-pandur-card border border-pandur-border flex items-center justify-center text-pandur-accent flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-pandur-cream mb-1">
                  ATELIER LOCATION
                </h4>
                <p className="font-sans text-sm text-pandur-creamMuted leading-relaxed">
                  Pandur World Culinary Atelier<br />42 Artisan Way, Soho District<br />London & New York
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-pandur-card border border-pandur-border flex items-center justify-center text-pandur-accent flex-shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-pandur-cream mb-1">
                  EMAIL DIRECT
                </h4>
                <p className="font-sans text-sm text-pandur-cream font-medium">
                  atelier@pandurworld.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-pandur-card border border-pandur-border flex items-center justify-center text-pandur-accent flex-shrink-0">
                <PhoneCall size={20} />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-pandur-cream mb-1">
                  CONCIERGE DESK
                </h4>
                <p className="font-sans text-sm text-pandur-creamMuted">
                  +1 (800) 840-PANDUR
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-pandur-card/80 border border-pandur-border/80 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
