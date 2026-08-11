export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Craft & Process' | 'Flavour Stories' | 'Masterclasses' | 'Brand Journey';
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  excerpt: string;
  content: string[];
  heroImage: string;
  featured: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-01',
    slug: 'the-art-of-36-hour-dough-aging',
    title: 'The Art of 36-Hour Dough Aging & Flavor Maturation',
    category: 'Craft & Process',
    date: 'August 8, 2026',
    readTime: '5 min read',
    author: {
      name: 'Chef Antoine Pandur',
      role: 'Founder & Head Baker',
      avatar: '/images/hero/hero-cookie.png'
    },
    excerpt: 'Why rushing dough is the biggest mistake in cookie craft. Inside our atelier process where time unlocks complex cocoa caramel notes.',
    content: [
      'In high-speed commercial baking, dough is mixed, portioned, and baked within minutes. But at Pandur World, speed is the enemy of taste. True cocoa depth, subtle nutty undertones, and velvet texture require time.',
      'When cookie dough rests at controlled temperatures (between 3°C and 5°C) for 36 hours, several enzymatic reactions take place. Starches break down into simple sugars, allowing for deeper caramelization during baking.',
      'More importantly, moisture redistributes uniformly through the flour proteins. The result? A cookie shell that bakes up with delicate micro-cracks while keeping the core molten and lush.',
      'Next time you bite into a Pandur Double Dark, remember: that rich taste was cultivated across 36 patient hours of quiet maturation.'
    ],
    heroImage: '/images/products/double-dark.png',
    featured: true
  },
  {
    id: 'post-02',
    slug: 'sourcing-single-origin-ecuadorian-cocoa',
    title: 'Sourcing Single-Origin Ecuadorian Cocoa from Smallholders',
    category: 'Flavour Stories',
    date: 'July 24, 2026',
    readTime: '4 min read',
    author: {
      name: 'Elena Rostova',
      role: 'Director of Ingredients',
      avatar: '/images/products/salted-caramel.png'
    },
    excerpt: 'Behind our signature dark chocolate: direct trade relationships with cocoa farmers in the Los Ríos province of Ecuador.',
    content: [
      'Great cookies start with uncompromising ingredients. When building Pandur World, we knew off-the-shelf chocolate chips would never meet our sensory standards.',
      'Our search led us to the Los Ríos valley in Ecuador, where heirloom Arriba Nacional cocoa trees thrive. Grown under native tree canopy, these pods yield beans with natural notes of red fruit, toasted wood, and floral jasmine.',
      'By trading directly with family co-operatives, we guarantee a fair 35% premium over market rates while ensuring our cocoa is harvested at peak maturity.',
      'This direct relationship is what gives Pandur cookies their signature editorial finish and velvet mouthfeel.'
    ],
    heroImage: '/images/hero/hero-cookie.png',
    featured: false
  },
  {
    id: 'post-03',
    slug: 'pairing-cookies-with-specialty-coffee',
    title: 'Editorial Pairings: Crafting the Perfect Coffee & Cookie Pairing',
    category: 'Masterclasses',
    date: 'June 15, 2026',
    readTime: '6 min read',
    author: {
      name: 'Marcus Vance',
      role: 'Sommelier & Flavour Consultant',
      avatar: '/images/products/pistachio-honey.png'
    },
    excerpt: 'From acidic Ethiopian pour-overs to rich Italian ristrettos—how to pair artisanal cookies like fine wine.',
    content: [
      'Pairing a cookie with a beverage is an art of contrast and complement. High-fat, brown-butter baked goods react dynamically when paired with acidic or bitter drink profiles.',
      'For the Pandur Salted Caramel Velvet, we recommend a medium roast Ethiopian Yirgacheffe pour-over. The coffee’s natural bergamot acidity cuts through the molten caramel, cleansing the palate between bites.',
      'For our Double Dark Cocoa, nothing beats an intense double ristretto or an aged port wine. The dark tannins resonate with the 70% cocoa solid depth.',
      'Experiment with temperature: enjoy our cookies slightly warmed to 40°C to release aromatic cocoa oils.'
    ],
    heroImage: '/images/products/salted-caramel.png',
    featured: false
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(b => b.slug === slug);
}
