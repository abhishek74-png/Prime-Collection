const frame = (sequence: 1 | 2, index: number) =>
  `/sequence-${sequence}/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

export const heroFrames = 120;
export const morphFrames = 120;

export const collections = [
  {
    title: 'Electronics',
    description: 'Premium audio, smart devices, and everyday technology with refined performance.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80',
    accent: 'High-fidelity living'
  },
  {
    title: 'Kitchen',
    description: 'Precise tools and elevated essentials for considered daily rituals.',
    image: 'https://m.media-amazon.com/images/I/710KoJMG2lL.jpg',
    accent: 'Culinary precision'
  },
  {
    title: 'Accessories',
    description: 'Minimal carry essentials, bottles, bags, and details that complete the day.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&q=80',
    accent: 'Everyday carry'
  },
  {
    title: 'Apparel',
    description: 'Comfort-first garments crafted from soft, responsible, long-wearing materials.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80',
    accent: 'Soft structure'
  },
  {
    title: 'Home',
    description: 'Lighting, surfaces, and objects that bring calm order to modern interiors.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&q=80',
    accent: 'Quiet interiors'
  }
];

export const showcaseSections = [
  {
    eyebrow: 'Electronics',
    title: 'Sound, signal, and silence engineered with restraint.',
    body: 'A focused edit of audio and smart devices selected for premium performance, durable materials, and intuitive daily use.',
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=1400&q=80',
    stats: ['Adaptive Audio', 'Premium Sound', 'Daily Utility']
  },
  {
    eyebrow: 'Kitchen',
    title: 'Tools that make everyday preparation feel composed.',
    body: 'From pour-over rituals to multi-purpose cooking, the kitchen edit balances function, form, and quiet reliability.',
    image: 'https://images.unsplash.com/photo-1637299945697-03b75ca03480?q=80&w=1992&auto=format&fit=crop',
    stats: ['Brew Rituals', 'Smart Cooking', 'Durable Design']
  },
  {
    eyebrow: 'Accessories',
    title: 'Small objects with a large effect on daily rhythm.',
    body: 'Bags, bottles, and carry essentials chosen for clean silhouettes, reliable function, and understated refinement.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1400&q=80',
    stats: ['Leak-proof', 'Lightweight', 'Refined Carry']
  },
  {
    eyebrow: 'Apparel',
    title: 'Soft essentials designed to live in rotation.',
    body: 'Garment-dyed basics and relaxed silhouettes made for comfort, durability, and effortless everyday styling.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1400&q=80',
    stats: ['Organic Cotton', 'Pre-shrunk', 'Relaxed Fit']
  },
  {
    eyebrow: 'Home',
    title: 'Lighting and objects that shape a calmer residence.',
    body: 'A considered home edit of warm illumination, tactile surfaces, and objects that bring order without spectacle.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1400&q=80',
    stats: ['Warm Light', 'Tactile Form', 'Quiet Utility']
  }
];

export const storySections = [
  {
    title: 'A marketplace built around intention.',
    body: 'Luxor curates products with a gallery-like discipline, pairing scarcity with service and design with enduring utility.',
    image: '/image.jpeg',
    label: 'Curated Selection'
  },
  {
    title: 'Every object earns its place.',
    body: 'We partner with brands that respect material, craft, and proportion, creating a catalog that feels edited rather than endless.',
    image: '/im.jpeg',
    label: 'Material Integrity'
  },
  {
    title: 'Premium service without spectacle.',
    body: 'From concierge support to worldwide delivery, the experience is designed to feel effortless, personal, and exacting.',
    image: '/a.mp4',
    label: 'Global Delivery'
  }
];

export const bestSellers = [
  {
    title: 'WH-1000XM5 Wireless Headphones',
    category: 'Electronics',
    price: '₹29,999',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80',
    description: 'Industry-leading noise canceling with premium sound.'
  },
  {
    title: 'AirPods Pro (2nd Generation)',
    category: 'Electronics',
    price: '₹19,999',
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=900&auto=format&fit=crop&q=80',
    description: 'Adaptive Audio, Active Noise Cancellation, USB-C case.'
  },
  {
    title: 'Instant Pot Cooker',
    category: 'Kitchen',
    price: '₹6,999',
    image: 'https://m.media-amazon.com/images/I/710KoJMG2lL.jpg',
    description: 'Multi-purpose electric cooker for precise everyday meals.'
  },
  {
    title: 'ColorFit Pro 4 Smartwatch',
    category: 'Electronics',
    price: '₹4,999',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80',
    description: 'AMOLED display, health tracking, and Bluetooth calling.'
  }
];

export const collectionProducts = [
  {
    collection: 'Electronics',
    title: 'WH-1000XM5 Wireless Headphones',
    brand: 'Sony',
    rating: 4.8,
    reviews: '12,402',
    price: 29999,
    originalPrice: 34999,
    delivery: 'Free delivery Tomorrow',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80'
  },
  {
    collection: 'Electronics',
    title: 'Airdopes 141 Bluetooth Earbuds',
    brand: 'boAt',
    rating: 4.3,
    reviews: '6,801',
    price: 2499,
    originalPrice: 3999,
    delivery: 'Free delivery Tomorrow',
    badge: 'Deal',
    image: 'https://m.media-amazon.com/images/I/61KNJav3S9L._AC_SL1500_.jpg'
  },
  {
    collection: 'Electronics',
    title: 'Tune 760NC Wireless Headphones',
    brand: 'JBL',
    rating: 4.6,
    reviews: '9,244',
    price: 7999,
    originalPrice: 10999,
    delivery: 'Free delivery by Sunday',
    badge: 'Premium Pick',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&q=80'
  },
  {
    collection: 'Electronics',
    title: 'AirPods Pro (2nd Generation)',
    brand: 'Apple',
    rating: 4.9,
    reviews: '18,920',
    price: 19999,
    originalPrice: 24900,
    delivery: 'Free delivery Tomorrow',
    badge: 'Premium Pick',
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=900&auto=format&fit=crop&q=80'
  },
  {
    collection: 'Electronics',
    title: 'ColorFit Pro 4 Smartwatch',
    brand: 'Noise',
    rating: 4.4,
    reviews: '8,301',
    price: 4999,
    originalPrice: 7999,
    delivery: 'Free delivery by Sunday',
    badge: 'Deal',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80'
  },
  {
    collection: 'Electronics',
    title: 'Buds T Pro Bluetooth Earbuds',
    brand: 'Realme',
    rating: 4.5,
    reviews: '5,732',
    price: 3999,
    originalPrice: 5999,
    delivery: 'Free delivery Tomorrow',
    badge: 'Limited Deal',
    image: 'https://static.toiimg.com/thumb/resizemode-4,msid-105837975,width-1070/105837975.jpg'
  },
  {
    collection: 'Electronics',
    title: 'LG Refrigerator',
    brand: 'LG',
    rating: 4.5,
    reviews: '2,118',
    price: 45999,
    originalPrice: 59999,
    delivery: 'Free delivery by Monday',
    badge: 'Appliance',
    image: 'https://www.buysmarte.com.au/media/catalog/product/cache/c06a6715a76923de6cf22934d9d75ff7/l/g/lg_gf-v708bsl.jpeg'
  },
  {
    collection: 'Electronics',
    title: 'Philips Hair Dryer',
    brand: 'Philips',
    rating: 4.2,
    reviews: '3,906',
    price: 1499,
    originalPrice: 2499,
    delivery: 'Free delivery Tomorrow',
    badge: 'Personal Care',
    image: 'https://m.media-amazon.com/images/I/61IL8SeIL4L._AC_SL1500_.jpg'
  },
  {
    collection: 'Electronics',
    title: 'Noise Bluetooth Speaker',
    brand: 'Noise',
    rating: 4.3,
    reviews: '4,201',
    price: 1999,
    originalPrice: 3499,
    delivery: 'Free delivery by Sunday',
    badge: 'Portable',
    image: 'https://m.media-amazon.com/images/I/81djh1gfUwL._AC_.jpg'
  },
  {
    collection: 'Electronics',
    title: 'Mi Smart Watch',
    brand: 'Xiaomi',
    rating: 4.5,
    reviews: '7,662',
    price: 5999,
    originalPrice: 7999,
    delivery: 'Free delivery Tomorrow',
    badge: 'Smart Wearable',
    image: 'https://i01.appmifile.com/webfile/globalimg/de-wm/Mi-Watch-Lite.png'
  },
  {
    collection: 'Kitchen',
    title: 'Instant Pot Cooker',
    brand: 'Instant Pot',
    rating: 4.6,
    reviews: '5,184',
    price: 6999,
    originalPrice: 9999,
    delivery: 'Free delivery Tomorrow',
    badge: 'Limited Deal',
    image: 'https://m.media-amazon.com/images/I/710KoJMG2lL.jpg'
  },
  {
    collection: 'Kitchen',
    title: 'Ceramic Pour-Over Set',
    brand: 'Kinto',
    rating: 4.7,
    reviews: '2,904',
    price: 2999,
    originalPrice: 3999,
    delivery: 'Free delivery by Monday',
    badge: 'Editor Choice',
    image: 'https://images.unsplash.com/photo-1637299945697-03b75ca03480?q=80&w=1992&auto=format&fit=crop'
  },
  {
    collection: 'Accessories',
    title: 'Stainless Water Bottle',
    brand: 'Hydro',
    rating: 4.8,
    reviews: '14,770',
    price: 1299,
    originalPrice: 1999,
    delivery: 'Free delivery Tomorrow',
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=80'
  },
  {
    collection: 'Accessories',
    title: 'Linen Tote',
    brand: 'Field',
    rating: 4.4,
    reviews: '1,826',
    price: 1999,
    originalPrice: 2499,
    delivery: 'Free delivery by Sunday',
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80'
  },
  {
    collection: 'Apparel',
    title: 'Organic Cotton Tee',
    brand: 'Basics',
    rating: 4.3,
    reviews: '9,441',
    price: 1499,
    originalPrice: 1999,
    delivery: 'Free delivery Tomorrow',
    badge: 'Essential',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80'
  },
  {
    collection: 'Home',
    title: 'Minimal Desk Lamp',
    brand: 'Luma',
    rating: 4.6,
    reviews: '3,218',
    price: 3999,
    originalPrice: 5499,
    delivery: 'Free delivery by Monday',
    badge: 'Home Pick',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=80'
  }
];
