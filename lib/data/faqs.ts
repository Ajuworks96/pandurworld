export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Products & Ingredients' | 'Wholesale' | 'Care & Storage';
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'Is Pandur World an e-commerce website?',
    answer: 'No. Pandur World is a luxury brand experience platform. We partner exclusively with premium boutique cafes, luxury hotels, corporate gift programs, and specialty retailers for wholesale orders and event activations.'
  },
  {
    id: 'faq-2',
    category: 'Products & Ingredients',
    question: 'What makes Pandur World cookies unique?',
    answer: 'Every Pandur cookie undergoes a 36-hour dough maturation process using 100% grass-fed French cultured butter, single-origin dark chocolate, and organic unbleached flours. We bake in small artisan batches to ensure microscopic precision in texture and flavour density.'
  },
  {
    id: 'faq-3',
    category: 'Care & Storage',
    question: 'How should Pandur cookies be stored for peak freshness?',
    answer: 'Keep cookies stored in their sealed Pandur airtight tins at room temperature for up to 7 days. For an elevated experience, warm your cookie in a preheated oven at 160°C (320°F) for 2 to 3 minutes to reactivate the molten chocolate core.'
  },
  {
    id: 'faq-4',
    category: 'Products & Ingredients',
    question: 'Do you offer gluten-free or vegan options?',
    answer: 'While our core collection uses traditional French wheat flour and cultured dairy butter, we craft custom dietary formulations (such as gluten-reduced and plant-based cocoa bites) exclusively for wholesale clients upon request.'
  },
  {
    id: 'faq-5',
    category: 'Wholesale',
    question: 'How can our cafe or boutique carry Pandur World cookies?',
    answer: 'Visit our Wholesale page and submit an enquiry form. Our brand partnership team reviews applications within 24 hours to arrange tasting samples, display equipment, and recurring supply terms.'
  },
  {
    id: 'faq-6',
    category: 'Wholesale',
    question: 'What is the minimum order quantity (MOQ) for B2B orders?',
    answer: 'Our standard wholesale minimum starts at 50 freshly baked units per order for local boutique accounts, with daily or weekly temperature-controlled delivery options.'
  }
];
