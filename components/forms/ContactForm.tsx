'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { MagneticButton } from '../interactions/MagneticButton';

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email address is required';
    }
    if (!formData.message.trim()) newErrors.message = 'Message content is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    // Simulate API network submission
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  if (status === 'success') {
    return (
      <div className="bg-pandur-card border border-pandur-accent/40 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-pandur-accent/20 border border-pandur-accent flex items-center justify-center text-pandur-accent mb-6">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="font-display font-black text-3xl text-pandur-cream uppercase tracking-tight mb-3">
          MESSAGE RECEIVED
        </h3>
        <p className="font-sans text-sm text-pandur-creamMuted max-w-md leading-relaxed mb-8">
          Thank you for reaching out to the Pandur Atelier. Our brand team will review your message and reply within 24 hours.
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
          }}
          className="px-6 py-3 rounded-full bg-pandur-border text-pandur-cream hover:bg-pandur-accent hover:text-pandur-bg font-display font-bold text-xs uppercase tracking-wider transition-colors"
        >
          SEND ANOTHER MESSAGE
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted mb-2">
            FIRST NAME *
          </label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className={`w-full bg-pandur-card border ${
              errors.firstName ? 'border-pandur-berry' : 'border-pandur-border/80'
            } rounded-2xl px-5 py-4 text-pandur-cream font-sans text-sm focus:outline-none focus:border-pandur-accent transition-colors`}
            placeholder="John"
          />
          {errors.firstName && <p className="text-pandur-berry text-xs mt-1 font-sans">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted mb-2">
            LAST NAME *
          </label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className={`w-full bg-pandur-card border ${
              errors.lastName ? 'border-pandur-berry' : 'border-pandur-border/80'
            } rounded-2xl px-5 py-4 text-pandur-cream font-sans text-sm focus:outline-none focus:border-pandur-accent transition-colors`}
            placeholder="Doe"
          />
          {errors.lastName && <p className="text-pandur-berry text-xs mt-1 font-sans">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted mb-2">
            EMAIL ADDRESS *
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full bg-pandur-card border ${
              errors.email ? 'border-pandur-berry' : 'border-pandur-border/80'
            } rounded-2xl px-5 py-4 text-pandur-cream font-sans text-sm focus:outline-none focus:border-pandur-accent transition-colors`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-pandur-berry text-xs mt-1 font-sans">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted mb-2">
            PHONE NUMBER (OPTIONAL)
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-pandur-card border border-pandur-border/80 rounded-2xl px-5 py-4 text-pandur-cream font-sans text-sm focus:outline-none focus:border-pandur-accent transition-colors"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted mb-2">
          SUBJECT
        </label>
        <select
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full bg-pandur-card border border-pandur-border/80 rounded-2xl px-5 py-4 text-pandur-cream font-sans text-sm focus:outline-none focus:border-pandur-accent transition-colors cursor-pointer"
        >
          <option value="General Enquiry">General Brand Enquiry</option>
          <option value="Event Catering">Event Catering & Gifting</option>
          <option value="Press & Media">Press & Media Relations</option>
          <option value="Other">Other Inquiry</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block font-display font-bold text-xs uppercase tracking-wider text-pandur-creamMuted mb-2">
          YOUR MESSAGE *
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`w-full bg-pandur-card border ${
            errors.message ? 'border-pandur-berry' : 'border-pandur-border/80'
          } rounded-2xl p-5 text-pandur-cream font-sans text-sm focus:outline-none focus:border-pandur-accent transition-colors resize-none`}
          placeholder="Tell us about your event or inquiry..."
        />
        {errors.message && <p className="text-pandur-berry text-xs mt-1 font-sans">{errors.message}</p>}
      </div>

      <MagneticButton type="submit" variant="primary" dataCursor="SEND" className="w-full sm:w-auto">
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <Loader2 size={18} className="animate-spin" />
            SENDING MESSAGE...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send size={16} />
            SEND MESSAGE
          </span>
        )}
      </MagneticButton>
    </form>
  );
}
