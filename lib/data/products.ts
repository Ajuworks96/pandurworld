export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: 'Signature Dark' | 'Stuffed Velvet' | 'Crunch Bites' | 'Artisanal Special';
  flavour: string;
  shortDescription: string;
  longDescription: string;
  story: string;
  heroImage: string;
  macroImage: string;
  detailImage: string;
  gallery: string[];
  ingredients: string[];
  texture: {
    crunch: number; // 1 to 5
    chewiness: number; // 1 to 5
    richness: number; // 1 to 5
  };
  pairings: string[];
  flavourBreakdown: {
    base: string;
    core: string;
    finish: string;
  };
  featured: boolean;
  photographyConcept: {
    surface: string;
    angle: string;
    lighting: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    slug: 'pandur-double-dark',
    name: 'Pandur Double Dark Cocoa',
    tagline: '70% Valrhona Dark Cocoa & Fleur de Sel',
    category: 'Signature Dark',
    flavour: 'Decadent Dark Cocoa with molten 70% chocolate center',
    shortDescription: 'Slow-baked with dual-origin Ecuadorian dark cocoa, folded with hand-broken chocolate chunks and kissed with Maldon sea salt.',
    longDescription: 'The crown jewel of Pandur World. We blend rich Dutch cocoa with single-origin Ecuadorian dark chocolate, slowly resting the dough for 36 hours to let the velvety cocoa notes deepen before baking to gooey perfection.',
    story: 'Conceived in our atelier when our master baker sought to create a chocolate cookie that balances intensity with refined softness. Every bite releases a warm, molten core enveloped in crisp, dark edges.',
    heroImage: '/images/products/pandur-double-dark.png',
    macroImage: '/images/products/double-dark.png',
    detailImage: '/images/hero/hero-cookie.png',
    gallery: [
      '/images/products/pandur-double-dark.png',
      '/images/products/double-dark.png',
    ],
    ingredients: [
      '70% Single Origin Ecuadorian Dark Chocolate',
      'Dutch Processed Dark Cocoa',
      'Maldon Sea Salt Flakes',
      'French Cultured Butter',
      'Organic Cane Sugar',
      'Madagascar Bourbon Vanilla'
    ],
    texture: {
      crunch: 3,
      chewiness: 5,
      richness: 5
    },
    pairings: ['Single Origin Espresso', 'Cold Brew Oat Latte', 'Aged Port Wine'],
    flavourBreakdown: {
      base: 'Velvety Dark Cocoa Crust',
      core: 'Molten 70% Dark Chocolate Pool',
      finish: 'Fleur de Sel Crisp'
    },
    featured: true,
    photographyConcept: {
      surface: 'Dark Basalt Slate',
      angle: 'Close-Up Macro 3/4',
      lighting: 'Controlled Directional Studio Key'
    }
  },
  {
    id: 'prod-02',
    slug: 'pandur-salted-caramel',
    name: 'Pandur Salted Caramel Velvet',
    tagline: 'Golden Brown Butter & Oozing Amber Caramel',
    category: 'Stuffed Velvet',
    flavour: 'Rich brown butter dough with house-made salted amber caramel center',
    shortDescription: 'Golden browned butter dough stuffed with slow-cooked amber caramel that oozes warmly upon breaking.',
    longDescription: 'Crafted with brown butter that is toasted until hazelnut-aromatic, filled with artisanal liquid caramel, and finished with delicate coarse salt crystals for an unforgettable sweet-savory harmony.',
    story: 'Inspired by traditional Breton confectionery, our Salted Caramel Velvet requires a precise three-stage temperature bake to keep the caramel center effortlessly fluid while giving the outer shell a delicate snap.',
    heroImage: '/images/products/pandur-salted-caramel.png',
    macroImage: '/images/products/salted-caramel.png',
    detailImage: '/images/hero/hero-cookie.png',
    gallery: [
      '/images/products/pandur-salted-caramel.png',
      '/images/products/salted-caramel.png',
    ],
    ingredients: [
      'House-Cooked Amber Caramel',
      'Toasted French Brown Butter',
      'Brittany Sea Salt',
      'Golden Muscovado Sugar',
      'Pastry Wheat Flour',
      'Farm Fresh Free-Range Eggs'
    ],
    texture: {
      crunch: 2,
      chewiness: 5,
      richness: 5
    },
    pairings: ['Earl Grey Tea', 'Vanilla Bean Cappuccino', 'Bourbon Whiskey'],
    flavourBreakdown: {
      base: 'Toasted Brown Butter Dough',
      core: 'Lava Amber Caramel',
      finish: 'Coarse Brittany Salt'
    },
    featured: true,
    photographyConcept: {
      surface: 'Warm Walnut Wood Table',
      angle: '45° Tabletop Editorial',
      lighting: 'Soft Warm Golden Studio Fill'
    }
  },
  {
    id: 'prod-03',
    slug: 'pandur-pistachio-honey',
    name: 'Pandur Pistachio White Honey',
    tagline: 'Sicilian Pistachio & Wildflower Honey',
    category: 'Artisanal Special',
    flavour: 'Roasted Sicilian pistachios with Belgian white chocolate and organic honey glaze',
    shortDescription: 'Crunchy Bronte pistachios folded into silky vanilla dough with chunks of white velvet chocolate and wildflower honey glaze.',
    longDescription: 'We import whole Bronte pistachios from Sicily, lightly toast them to unleash their aromatic oils, and pair them with creamy Belgian white chocolate and raw wildflower honey.',
    story: 'Created as a tribute to Mediterranean sun and orchards. The natural green hues and nutty crunch offer a sophisticated contrast to the smooth creaminess of white chocolate.',
    heroImage: '/images/products/pandur-pistachio-honey.png',
    macroImage: '/images/products/pistachio-honey.png',
    detailImage: '/images/hero/hero-cookie.png',
    gallery: [
      '/images/products/pandur-pistachio-honey.png',
      '/images/products/pistachio-honey.png',
    ],
    ingredients: [
      'Whole Roasted Bronte Pistachios',
      'Belgian White Chocolate Chunks',
      'Raw Wildflower Honey Glaze',
      'Grass-Fed Creamery Butter',
      'Organic Wheat Flour',
      'Pure Almond Extract'
    ],
    texture: {
      crunch: 4,
      chewiness: 3,
      richness: 4
    },
    pairings: ['Matcha Latte', 'Chilled Sparkling Prosecco', 'Jasmine Green Tea'],
    flavourBreakdown: {
      base: 'Pistachio Butter Crumb',
      core: 'Belgian White Velvet Chunks',
      finish: 'Raw Honey Drizzle'
    },
    featured: true,
    photographyConcept: {
      surface: 'Cream Bakery Parchment',
      angle: 'Top-Down Flat Lay',
      lighting: 'Diffuse Soft Daylight'
    }
  },
  {
    id: 'prod-04',
    slug: 'pandur-hazelnut-praline',
    name: 'Pandur Roasted Hazelnut Praline',
    tagline: 'Piedmont Hazelnut Paste & Dark Milk Chocolate',
    category: 'Signature Dark',
    flavour: 'Roasted hazelnut crust filled with gianduja cocoa cream',
    shortDescription: 'Toasted Piedmont hazelnuts ground into silky gianduja, blended into dark milk chocolate dough with crunchy hazelnut praline top.',
    longDescription: 'A hazelnut lover’s dream. Made with 100% IGP Piedmont hazelnuts, hand-roasted in small batches to deliver intense nutty aroma paired with creamy milk-dark chocolate.',
    story: 'Piedmont hazelnuts have a distinct sweetness that elevates the classic chocolate nut pairing into an editorial culinary masterpiece.',
    heroImage: '/images/products/pandur-hazelnut-praline.png',
    macroImage: '/images/products/hazelnut-praline.png',
    detailImage: '/images/products/double-dark.png',
    gallery: ['/images/products/pandur-hazelnut-praline.png'],
    ingredients: [
      'IGP Piedmont Roasted Hazelnuts',
      'Gianduja Hazelnut Cream',
      '45% Dark Milk Chocolate',
      'Cultured Butter',
      'Raw Cane Sugar'
    ],
    texture: { crunch: 4, chewiness: 4, richness: 5 },
    pairings: ['Dark Roast Espresso', 'Hazelnut Cortado', 'Amaretto Liqueur'],
    flavourBreakdown: {
      base: 'Roasted Nut Crumb',
      core: 'Gianduja Paste Center',
      finish: 'Toasted Hazelnut Shavings'
    },
    featured: false,
    photographyConcept: {
      surface: 'Deep Espresso Oak',
      angle: 'Low-Angle Food Perspective',
      lighting: 'Atmospheric Moody Rim'
    }
  },
  {
    id: 'prod-05',
    slug: 'pandur-vanilla-bean',
    name: 'Pandur Madagascar Vanilla Crunch',
    tagline: 'Bourbon Vanilla Specks & Golden Butter Sablé',
    category: 'Crunch Bites',
    flavour: 'Pure Madagascar vanilla bean with buttery golden crisp',
    shortDescription: 'Classic French sablé elevated with real Madagascar vanilla caviar specks and golden caramelized sugar crust.',
    longDescription: 'Understated elegance. Using whole Madagascar vanilla pods, we infuse cultured butter for 48 hours to capture the full spectrum of floral, woody vanilla aroma.',
    story: 'Designed for purists who appreciate the subtle perfection of real vanilla bean and slow-churned butter.',
    heroImage: '/images/products/pandur-vanilla-bean.png',
    macroImage: '/images/products/vanilla-bean.png',
    detailImage: '/images/products/salted-caramel.png',
    gallery: ['/images/products/pandur-vanilla-bean.png'],
    ingredients: [
      'Madagascar Bourbon Vanilla Pods',
      'Churned Brittany Butter',
      'Demerara Sugar Crystals',
      'Pastry Flour',
      'Sea Salt'
    ],
    texture: { crunch: 5, chewiness: 2, richness: 4 },
    pairings: ['Chamomile Tea', 'Warm Oat Milk', 'Chardonnay'],
    flavourBreakdown: {
      base: 'Vanilla Sablé Dough',
      core: 'Aromatic Vanilla Caviar',
      finish: 'Demerara Crunch Crust'
    },
    featured: false,
    photographyConcept: {
      surface: 'Aged Bakery Peel',
      angle: '3/4 Bakery Perspective',
      lighting: 'Bright Warm Studio Sunlight'
    }
  },
  {
    id: 'prod-06',
    slug: 'pandur-espresso-roast',
    name: 'Pandur Espresso Dark Roast',
    tagline: 'Ethiopian Arabica Coffee & White Chocolate Chips',
    category: 'Signature Dark',
    flavour: 'Bold dark espresso dough balanced with sweet white chocolate specks',
    shortDescription: 'Infused with freshly roasted Ethiopian Yirgacheffe espresso grounds and sweet white chocolate chunks for coffee aficionados.',
    longDescription: 'We grind freshly roasted single-origin Arabica beans directly into dark cocoa dough, creating an intoxicating coffee aroma followed by sweet white chocolate notes.',
    story: 'Born from our morning coffee ritual in the bakery atelier—combining the rich bitter notes of dark roast with creamy cocoa butter.',
    heroImage: '/images/products/pandur-espresso-roast.png',
    macroImage: '/images/products/espresso-roast.png',
    detailImage: '/images/products/double-dark.png',
    gallery: ['/images/products/pandur-espresso-roast.png'],
    ingredients: [
      'Freshly Ground Yirgacheffe Arabica Coffee',
      'Dutch Dark Cocoa',
      'White Cocoa Butter Chunks',
      'Brown Sugar',
      'Pure Vanilla'
    ],
    texture: { crunch: 3, chewiness: 4, richness: 4 },
    pairings: ['Iced Americano', 'Flat White', 'Stout Beer'],
    flavourBreakdown: {
      base: 'Espresso Cocoa Dough',
      core: 'White Chocolate Drops',
      finish: 'Roasted Coffee Dust'
    },
    featured: false,
    photographyConcept: {
      surface: 'Café Dark Espresso Bench',
      angle: 'Café Editorial Side Angle',
      lighting: 'Deep Contrast Coffee House Light'
    }
  },
  {
    id: 'prod-07',
    slug: 'pandur-ruby-berry',
    name: 'Pandur Ruby Berry Crumb',
    tagline: 'Ruby Cacao & Wild Tart Raspberry',
    category: 'Stuffed Velvet',
    flavour: 'Naturally pink Ruby chocolate with tart wild raspberry filling',
    shortDescription: 'Stunning Ruby cocoa dough layered with tangy freeze-dried raspberries and a silky ruby chocolate cream center.',
    longDescription: 'Crafted with naturally berry-flavored Ruby cacao beans from Brazil, balanced with vibrant tart raspberries for a fresh, fruity flavor profile.',
    story: 'A playful exploration of cocoa varieties—bringing out citrus and berry notes inherent to unfermented ruby cacao.',
    heroImage: '/images/products/pandur-ruby-berry.png',
    macroImage: '/images/products/ruby-berry.png',
    detailImage: '/images/products/pistachio-honey.png',
    gallery: ['/images/products/pandur-ruby-berry.png'],
    ingredients: [
      'Ruby Cacao Chocolate Chunks',
      'Freeze-Dried Wild Raspberries',
      'Natural Berry Essence',
      'French Creamery Butter',
      'Unbleached Wheat Flour'
    ],
    texture: { crunch: 3, chewiness: 4, richness: 4 },
    pairings: ['Rosé Champagne', 'Hibiscus Iced Tea', 'Matcha Latte'],
    flavourBreakdown: {
      base: 'Ruby Cacao Dough',
      core: 'Tangy Raspberry Reduction',
      finish: 'Crisp Berry Dust'
    },
    featured: false,
    photographyConcept: {
      surface: 'Muted Neutral Linen',
      angle: 'Top-Down Flat Lay',
      lighting: 'Soft Berry Tint Accent'
    }
  },
  {
    id: 'prod-08',
    slug: 'pandur-spiced-pecan',
    name: 'Pandur Spiced Honey Pecan',
    tagline: 'Toasted Georgia Pecans & Ceylon Cinnamon',
    category: 'Artisanal Special',
    flavour: 'Butter roasted pecans infused with Ceylon cinnamon and maple honey',
    shortDescription: 'Generous halves of Georgia pecans roasted in maple syrup and cinnamon, folded into rich brown sugar dough.',
    longDescription: 'Comforting, warm, and nut-heavy. Every batch features slow-roasted pecans tossed in Ceylon cinnamon and Quebec maple syrup.',
    story: 'Reminiscent of cozy autumn mornings, offering deep caramelized nut flavours with delicate aromatic spices.',
    heroImage: '/images/products/pandur-spiced-pecan.png',
    macroImage: '/images/products/spiced-pecan.png',
    detailImage: '/images/products/salted-caramel.png',
    gallery: ['/images/products/pandur-spiced-pecan.png'],
    ingredients: [
      'Roasted Georgia Pecans',
      'Pure Quebec Maple Syrup',
      'Organic Ceylon Cinnamon',
      'Brown Butter',
      'Cane Sugar'
    ],
    texture: { crunch: 4, chewiness: 3, richness: 5 },
    pairings: ['Chai Tea Latte', 'Spiced Rum Cocktail', 'Hot Chocolate'],
    flavourBreakdown: {
      base: 'Cinnamon Maple Dough',
      core: 'Whole Toasted Pecans',
      finish: 'Warm Spice Dusting'
    },
    featured: false,
    photographyConcept: {
      surface: 'Autumn Wooden Peel',
      angle: 'Warm 45° Angle',
      lighting: 'Warm Sunset Amber Studio Key'
    }
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.featured);
}
