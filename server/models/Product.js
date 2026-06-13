import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    brand: { type: String, default: 'Luxor' },
    rating: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

productSchema.index({ category: 1, featured: -1 });
productSchema.index({ name: 'text', brand: 'text', description: 'text' });

export const Product = mongoose.model('Product', productSchema);
