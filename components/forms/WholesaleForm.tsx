'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2, Building2 } from 'lucide-react';
import { MagneticButton } from '../interactions/MagneticButton';

export function WholesaleForm() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    businessType: 'Boutique Café',
    location: '',
    estimatedRequirement: '50 - 200 units / week',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid business email is required';
    }
    if (!formData.location.trim()) newErrors.location = 'City / Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
    }, 1400);
  };

  if (status === 'success') {
    return (
      <div className="bg-pandur-card border border-pandur-accent/40 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-pandur-accent/20 border border-pandur-accent flex items-center justify-center text-pandur-accent mb-6">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="font-display font-black text-3xl text-pandur-cream uppercase tracking-tight mb-3">
          WHOLESALE APPLICATION RECEIVED
        </h3>
        <p className="font-sans text-sm text-pandur-creamMuted max-w-lg leading-relaxed mb-8">
          Thank you for applying to partner with Pandur World. Our B2B partnership manager will contact you within 24 hours to coordinate tasting samples and wholesale pricing terms.
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setFormData({
              businessName: '',
              contactPerson: '',
              email: '',
              phone: '',
              businessType: 'Boutique Café',
              location: '',
              estimatedRequirement: '50 - 200 units / week',
              message: '',
            });
          }}
          className="px-6 py-3 rounded-full bg-pandur-border text-pandur-cream hover:bg-pandur-accent hover:text-pandur-bg font-display font-bold text-xs uppercase tracking-wider transition-colors"
        >
          SUBMIT ANOTHER APPLICATION
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Business Name */}
        <div>
          <label htmlFor="businessName" className="block font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted mb-2">
            BUSINESS NAME *
          </label>
          <input
            id="businessName"
            type="text"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            className={`w-full bg-pandur-card border ${
              errors.businessName ? 'border-pandur-berry' : 'border-pandur-border/80'
            } rounded-2xl px-5 py-4 text-pandur-cream font-sans text-sm focus:outline-none focus:border-pandur-accent transition-colors`}
            placeholder="Artisan Espresso Bar"
          />
          {errors.businessName && <p className="text-pandur-berry text-xs mt-1 font-sans">{errors.businessName}</p>}
        </div>

        {/* Contact Person */}
        <div>
          <label htmlFor="contactPerson" className="block font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted mb-2">
            CONTACT PERSON *
          </label>
          <input
            id="contactPerson"
            type="text"
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            className={`w-full bg-pandur-card border ${
              errors.contactPerson ? 'border-pandur-berry' : 'border-pandur-border/80'
            } rounded-2xl px-5 py-4 text-pandur-cream font-sans text-sm focus:outline-none focus:border-pandur-accent transition-colors`}
            placeholder="Sarah Jenkins"
          />
          {errors.contactPerson && <p className="text-pandur-berry text-xs mt-1 font-sans">{errors.contactPerson}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <label htmlFor="w-email" className="block font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted mb-2">
            BUSINESS EMAIL *
          </label>
          <input
            id="w-email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full bg-pandur-card border ${
              errors.email ? 'border-pandur-berry' : 'border-pandur-border/80'
            } rounded-2xl px-5 py-4 text-pandur-cream font-sans text-sm focus:outline-none focus:border-pandur-accent transition-colors`}
            placeholder="orders@artisanespresso.com"
          />
          {errors.email && <p className="text-pandur-berry text-xs mt-1 font-sans">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="w-phone" className="block font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted mb-2">
            PHONE NUMBER
          </label>
          <input
            id="w-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-pandur-card border border-pandur-border/80 rounded-2xl px-5 py-4 text-pandur-cream font-sans text-sm focus:outline-none focus:border-pandur-accent transition-colors"
            placeholder="+1 (555) 234-5678"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Business Type */}
        <div>
          <label htmlFor="businessType" className="block font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted mb-2">
            BUSINESS CATEGORY
          </label>
          <select
            id="businessType"
            value={formData.businessType}
            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
            className="w-full bg-pandur-card border border-pandur-border/80 rounded-2xl px-5 py-4 text-pandur-cream font-sans text-sm focus:outline-none focus:border-pandur-accent transition-colors cursor-pointer"
          >
            <option value="Boutique Café">Boutique Café / Specialty Coffee Bar</option>
            <option value="Hotel & Resort">Hotel & Resort Hospitality</option>
            <option value="Corporate Gifting">Corporate Gifting / Brand Activation</option>
            <option value="Specialty Retail">Specialty Food Retailer</option>
            <option value="Events & Weddings">Events & Luxury Catering</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted mb-2">
            LOCATION / CITY *
          </label>
          <input
            id="location"
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className={`w-full bg-pandur-card border ${
              errors.location ? 'border-pandur-berry' : 'border-pandur-border/80'
            } rounded-2xl px-5 py-4 text-pandur-cream font-sans text-sm focus:outline-none focus:border-pandur-accent transition-colors`}
            placeholder="New York, NY or London, UK"
          />
          {errors.location && <p className="text-pandur-berry text-xs mt-1 font-sans">{errors.location}</p>}
        </div>
      </div>

      {/* Estimated Requirement */}
      <div>
        <label htmlFor="estimatedRequirement" className="block font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted mb-2">
          ESTIMATED WEEKLY VOLUME
        </label>
        <select
          id="estimatedRequirement"
          value={formData.estimatedRequirement}
          onChange={(e) => setFormData({ ...formData, estimatedRequirement: e.target.value })}
          className="w-full bg-pandur-card border border-pandur-border/80 rounded-2xl px-5 py-4 text-pandur-cream font-sans text-sm focus:outline-none focus:border-pandur-accent transition-colors cursor-pointer"
        >
          <option value="50 - 200 units / week">50 - 200 units / week</option>
          <option value="200 - 500 units / week">200 - 500 units / week</option>
          <option value="500 - 1000 units / week">500 - 1,000 units / week</option>
          <option value="1000+ units / week">1,000+ units / week (High-volume partnership)</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="w-message" className="block font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted mb-2">
          ADDITIONAL DETAILS / SPECIFIC REQUIREMENTS
        </label>
        <textarea
          id="w-message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-pandur-card border border-pandur-border/80 rounded-2xl p-5 text-pandur-cream font-sans text-sm focus:outline-none focus:border-pandur-accent transition-colors resize-none"
          placeholder="Tell us about your brand positioning, store locations, or preferred start date..."
        />
      </div>

      <MagneticButton type="submit" variant="primary" dataCursor="APPLY" className="w-full sm:w-auto">
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <Loader2 size={18} className="animate-spin" />
            SUBMITTING APPLICATION...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Building2 size={16} />
            SEND WHOLESALE ENQUIRY
          </span>
        )}
      </MagneticButton>
    </form>
  );
}
