export interface WholesaleCategory {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  highlights: string[];
}

export const WHOLESALE_CATEGORIES: WholesaleCategory[] = [
  {
    title: 'Boutique Cafés & Coffee Bars',
    subtitle: 'Elevate your coffee pairing counter',
    description: 'Complement your specialty espresso program with artisanal cookies engineered to pair with high-grade pour-overs and oat milk lattes.',
    iconName: 'Coffee',
    highlights: ['Daily fresh delivery', 'Branded acrylic displays', 'Barista pairing guide']
  },
  {
    title: 'Luxury Hotels & Hospitality',
    subtitle: 'Unforgettable turn-down luxury',
    description: 'Provide guests with a signature evening amenity that creates lasting brand loyalty. Wrapped in individually sealed foil-embossed pouches.',
    iconName: 'Hotel',
    highlights: ['Custom room amenities', 'VIP welcome gifts', 'Mini-bar collections']
  },
  {
    title: 'Corporate Gifting & Events',
    subtitle: 'Premium impression for clients',
    description: 'Make a statement at executive retreats, product launches, and festive corporate celebrations with branded gift tins and custom flavor sleeves.',
    iconName: 'Gift',
    highlights: ['Custom logo debossing', 'Direct multi-recipient shipping', 'Dedicated account manager']
  },
  {
    title: 'Specialty Retailers',
    subtitle: 'High-margin luxury confectionery',
    description: 'Curate your gourmet food aisle with eye-catching packaging designed for premium shelf impact and high impulse purchase velocity.',
    iconName: 'Store',
    highlights: ['Barcoded retail tins', 'Long shelf-life seal', 'Marketing POS kit']
  }
];
