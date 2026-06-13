import 'dotenv/config';
import mongoose from 'mongoose';
import { Product } from './models/Product.js';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is required in .env');
}

const samples = [
  {
    name: 'Minimal Desk Lamp',
    slug: 'minimal-desk-lamp',
    description: 'Adjustable LED lamp with warm and cool modes.',
    price: 3999,
    category: 'home',
    stock: 24,
    brand: 'Luma',
    rating: 4.6,
    featured: false,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'
  },
  {
    name: 'Ceramic Pour-Over Set',
    slug: 'ceramic-pour-over-set',
    description: 'Dripper and carafe for everyday brewing.',
    price: 2999,
    category: 'kitchen',
    stock: 40,
    brand: 'Kinto',
    rating: 4.7,
    featured: false,
    image: 'https://images.unsplash.com/photo-1637299945697-03b75ca03480?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Linen Tote',
    slug: 'linen-tote',
    description: 'Lightweight everyday carry with inner pocket.',
    price: 1999,
    category: 'accessories',
    stock: 60,
    brand: 'Field',
    rating: 4.4,
    featured: false,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80'
  },
  {
    name: 'Mi Smart Watch',
    slug: 'mi-smart-watch',
    description: 'Fitness tracking smartwatch.',
    price: 5999,
    category: 'electronics',
    stock: 100,
    brand: 'Xiaomi',
    rating: 4.5,
    featured: false,
    image: 'https://i01.appmifile.com/webfile/globalimg/de-wm/Mi-Watch-Lite.png'
  },
  {
    name: 'Organic Cotton Tee',
    slug: 'organic-cotton-tee',
    description: 'Relaxed fit, garment dyed, pre-shrunk.',
    price: 1499,
    category: 'apparel',
    stock: 120,
    brand: 'Basics',
    rating: 4.3,
    featured: false,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'
  },
  {
    name: 'Stainless Water Bottle',
    slug: 'stainless-water-bottle',
    description: 'Insulated 24oz, leak-proof cap.',
    price: 1299,
    category: 'accessories',
    stock: 200,
    brand: 'Hydro',
    rating: 4.8,
    featured: false,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80'
  },
  {
    name: 'WH-1000XM5 Wireless Headphones',
    slug: 'sony-wh-1000xm5-wireless-headphones',
    description: 'Industry-leading noise canceling with premium sound.',
    price: 29999,
    category: 'electronics',
    stock: 45,
    brand: 'Sony',
    rating: 4.8,
    featured: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
  },
  {
    name: 'Airdopes 141 Bluetooth Earbuds',
    slug: 'boat-airdopes-141-bluetooth-earbuds',
    description: 'True wireless earbuds with massive 42H playback and IPX4 water resistance.',
    price: 2499,
    category: 'electronics',
    stock: 120,
    brand: 'boAt',
    rating: 4.3,
    featured: true,
    image: 'https://m.media-amazon.com/images/I/61KNJav3S9L._AC_SL1500_.jpg'
  },
  {
    name: 'Tune 760NC Wireless Headphones',
    slug: 'jbl-tune-760nc-wireless-headphones',
    description: 'Active noise cancelling, lightweight foldable design.',
    price: 7999,
    category: 'electronics',
    stock: 80,
    brand: 'JBL',
    rating: 4.6,
    featured: true,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'
  },
  {
    name: 'AirPods Pro (2nd Generation)',
    slug: 'apple-airpods-pro-2nd-generation',
    description: 'Adaptive Audio, Active Noise Cancellation, USB-C case.',
    price: 19999,
    category: 'electronics',
    stock: 120,
    brand: 'Apple',
    rating: 4.9,
    featured: true,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycG9kc3xlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'ColorFit Pro 4 Smartwatch',
    slug: 'noise-colorfit-pro-4-smartwatch',
    description: 'AMOLED display, health tracking, Bluetooth calling.',
    price: 4999,
    category: 'electronics',
    stock: 150,
    brand: 'Noise',
    rating: 4.4,
    featured: true,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
  },
  {
    name: 'Buds T Pro Bluetooth Earbuds',
    slug: 'realme-buds-t-pro-bluetooth-earbuds',
    description: 'Hybrid ANC, low-latency gaming mode, fast charge.',
    price: 3999,
    category: 'electronics',
    stock: 90,
    brand: 'Realme',
    rating: 4.5,
    featured: true,
    image: 'https://static.toiimg.com/thumb/resizemode-4,msid-105837975,width-1070/105837975.jpg'
  },
  {
    name: 'LG Refrigerator',
    slug: 'lg-refrigerator',
    description: 'Double door smart fridge.',
    price: 45999,
    image: 'https://www.buysmarte.com.au/media/catalog/product/cache/c06a6715a76923de6cf22934d9d75ff7/l/g/lg_gf-v708bsl.jpeg',
    category: 'electronics',
    stock: 9,
    brand: 'LG',
    rating: 4.5,
    featured: false
  },
  {
    name: 'Philips Hair Dryer',
    slug: 'philips-hair-dryer',
    description: 'Compact hair dryer.',
    price: 1499,
    image: 'https://m.media-amazon.com/images/I/61IL8SeIL4L._AC_SL1500_.jpg',
    category: 'electronics',
    stock: 28,
    brand: 'Philips',
    rating: 4.2,
    featured: false
  },
  {
    name: 'Instant Pot Cooker',
    slug: 'instant-pot-cooker',
    description: 'Multi-purpose electric cooker.',
    price: 6999,
    image: 'https://m.media-amazon.com/images/I/710KoJMG2lL.jpg',
    category: 'kitchen',
    stock: 11,
    brand: 'Instant Pot',
    rating: 4.6,
    featured: true
  },
  {
    name: 'Noise Bluetooth Speaker',
    slug: 'noise-bluetooth-speaker',
    description: 'Portable wireless speaker.',
    price: 1999,
    image: 'https://m.media-amazon.com/images/I/81djh1gfUwL._AC_.jpg',
    category: 'electronics',
    stock: 26,
    brand: 'Noise',
    rating: 4.3,
    featured: false
  }
];

await mongoose.connect(MONGODB_URI);
await Product.deleteMany({ slug: { $in: samples.map((sample) => sample.slug) } });
await Product.insertMany(samples);
console.log(`Seeded ${samples.length} products`);
await mongoose.disconnect();
