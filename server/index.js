import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Product } from './models/Product.js';
import { User } from './models/User.js';
import { Cart } from './models/Cart.js';
import { Order } from './models/Order.js';
import { auth } from './middleware/auth.js';

mongoose.set('strictQuery', true);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

let databaseStatus = MONGODB_URI ? 'connecting' : 'missing_uri';
let databaseError = null;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '2mb' }));

const connectDatabase = async () => {
  if (!MONGODB_URI) {
    databaseStatus = 'missing_uri';
    databaseError = 'MONGODB_URI is missing in .env';
    console.warn(databaseError);
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    databaseStatus = 'connected';
    databaseError = null;
    console.log('MongoDB connected');
  } catch (error) {
    databaseStatus = 'disconnected';
    databaseError = error instanceof Error ? error.message : 'Unknown MongoDB error';
    console.error('MongoDB connection failed:', databaseError);
  }
};

const issueToken = (user) => jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '14d' });

const normalizeCartItem = (item) => ({
  product: item.product?._id || item.product || item._id,
  slug: item.slug,
  name: item.name || item.title || item.slug,
  price: Number(item.price),
  image: item.image || '',
  quantity: Math.max(1, Number(item.quantity || 1))
});

const syncCartWithGuestItems = async (userId, guestItems = []) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const items = Array.isArray(guestItems) ? guestItems : [];

  for (const guestItem of items) {
    const normalized = normalizeCartItem(guestItem);

    if (!normalized.slug || !normalized.price) continue;

    const existing = cart.items.find((item) => item.slug === normalized.slug);

    if (existing) {
      existing.quantity += normalized.quantity;
      continue;
    }

    let product = null;
    try {
      product = await Product.findOne({ slug: normalized.slug });
    } catch {
      product = null;
    }

    cart.items.push({
      product: product?._id || undefined,
      slug: normalized.slug,
      name: normalized.name,
      price: normalized.price,
      image: normalized.image,
      quantity: normalized.quantity
    });
  }

  await cart.save();
  return cart;
};

app.get('/api/health', (_req, res) => {
  res.json({
    status: databaseStatus === 'connected' ? 'ok' : 'degraded',
    database: databaseStatus,
    readyState: mongoose.connection.readyState,
    error: databaseError
  });
});

app.get('/api/products', async (_req, res) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({
      message: 'MongoDB is not connected',
      database: databaseStatus,
      error: databaseError
    });
    return;
  }

  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch products' });
  }
});

app.get('/api/products/:slug', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({
      message: 'MongoDB is not connected',
      database: databaseStatus,
      error: databaseError
    });
    return;
  }

  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch product' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: 'Name, email, and password are required' });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(409).json({ message: 'Email already registered' });
      return;
    }

    const user = await User.create({ name, email: email.toLowerCase(), password });
    const token = issueToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to register user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = issueToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to login user' });
  }
});

app.get('/api/auth/me', auth, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });
});

app.get('/api/cart', auth, async (_req, res) => {
  try {
    const cart = await Cart.findOne({ user: _req.user._id }).populate('items.product', 'name title slug price image');
    res.json(cart?.items || []);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch cart' });
  }
});

app.post('/api/cart/sync', auth, async (req, res) => {
  try {
    const cart = await syncCartWithGuestItems(req.user._id, req.body.guestCart || []);
    res.json(cart.items || []);
  } catch (error) {
    res.status(500).json({ message: 'Unable to sync cart' });
  }
});

app.put('/api/cart', auth, async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const normalizedItems = items.map(normalizeCartItem).filter((item) => item.slug && item.price);
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $set: { items: normalizedItems } },
      { upsert: true, new: true }
    );

    res.json(cart.items || []);
  } catch (error) {
    res.status(500).json({ message: 'Unable to update cart' });
  }
});

app.delete('/api/cart', auth, async (_req, res) => {
  try {
    await Cart.deleteOne({ user: _req.user._id });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to clear cart' });
  }
});

app.post('/api/orders', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart || !cart.items.length) {
      res.status(400).json({ message: 'Cart is empty' });
      return;
    }

    const subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const delivery = 0;
    const total = subtotal + delivery;

    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map((item) => ({
        product: item.product,
        slug: item.slug,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity
      })),
      subtotal,
      delivery,
      total,
      shipping: req.body.shipping || {},
      payment: req.body.payment || { method: 'cod', status: 'pending' }
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Unable to place order' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ message: 'Name, email, and message are required' });
      return;
    }

    res.status(201).json({ message: 'Message received', data: { name, email } });
  } catch (error) {
    res.status(500).json({ message: 'Unable to submit message' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

void connectDatabase();
