import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Royal Forest Serum',
    category: 'Skincare',
    price: 85,
    originalPrice: 120,
    description: 'A potent blend of forest botanicals and hyaluronic acid to rejuvenate and hydrate your skin deeply.',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      'Volume': '30ml',
      'Skin Type': 'All',
      'Key Ingredients': 'Pine Extract, Vitamin C'
    },
    stock: 15
  },
  {
    id: 'p2',
    name: 'Gold Vein Elixir',
    category: 'Skincare',
    price: 150,
    description: 'An opulent botanical face oil with notes of sandalwood and amber for a radiant finish.',
    images: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7abcfe19?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1559599189-fe84dea4eb79?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      'Type': 'Face Oil',
      'Scent': 'Warm & Woody',
      'Origin': 'Kampala, Uganda'
    },
    stock: 8
  },
  {
    id: 'p3',
    name: 'Marble Smooth Body Butter',
    category: 'Body',
    price: 45,
    description: 'Whipped to perfection with shea butter and forest herbs, leaving your skin literally smooth as marble.',
    images: [
      'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      'Volume': '200ml',
      'Texture': 'Rich & Creamy'
    },
    stock: 50
  },
  {
    id: 'p4',
    name: 'Emerald Scalp Oil',
    category: 'Haircare',
    price: 60,
    description: 'Nourish your roots with the vitality of the forest. Promotes growth and intense shine.',
    images: [
      'https://images.unsplash.com/photo-1631730359585-38a4935ccbb2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1556228720-da3e3020668b?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      'Size': '50ml',
      'Action': 'Growth & Scalp Health'
    },
    stock: 25
  },
  {
    id: 'p7',
    name: 'Forest Mist Conditioner',
    category: 'Haircare',
    price: 55,
    description: 'A weightless botanical conditioner that detangles with the hydration of wild fern extracts.',
    images: [
      'https://images.unsplash.com/photo-1556229167-73130be25d97?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      'Volume': '250ml',
      'Benefits': 'Hydration & Detangling'
    },
    stock: 30
  },
  {
    id: 'p8',
    name: 'Silk Root Shampoo',
    category: 'Haircare',
    price: 50,
    description: 'Gentle cleansing that respects your scalp\'s natural ecosystem, infused with baobab oil.',
    images: [
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      'Volume': '250ml',
      'Key Active': 'Baobab Oil'
    },
    stock: 40
  },
  {
    id: 'p5',
    name: 'Botanical Detox Treatment',
    category: 'Body',
    price: 35,
    description: 'A soothing evening treatment designed to detoxify the skin and calm the mind.',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      'Servings': '1 Month Supply',
      'Caffeine': 'None'
    },
    stock: 100
  },
  {
    id: 'p6',
    name: 'Velvet Midnight Cream',
    category: 'Skincare',
    price: 95,
    description: 'Restore your natural glow overnight with our luxury repair cream infused with night-blooming jasmine.',
    images: [
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      'Volume': '50ml',
      'Time': 'Night',
      'Key Active': 'Retinol Substitute'
    },
    stock: 12
  }
];
