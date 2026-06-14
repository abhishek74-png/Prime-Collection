import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

export const CartPage = () => {
  const { items, count, updateQuantity, removeFromCart, clearCart } = useCart();
  const { requireAuth } = useAuth();

  const subtotal = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items]);
  const delivery = subtotal > 0 ? 0 : 0;
  const total = subtotal + delivery;

  return (
    <section id="cart" className="bg-[#0b0b0b] py-28 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="mb-12">
          <p className="mb-4 text-[11px] uppercase tracking-[0.42em] text-white/50">Shopping Cart</p>
          <h1 className="font-display text-balance text-4xl font-thin leading-tight tracking-[-0.05em] text-white md:text-7xl">
            {count === 0 ? 'Your cart is empty' : `${count} item${count > 1 ? 's' : ''} in your cart`}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 tracking-[0.16em] text-white/60">
            Products added from the product section or product detail modal will appear here.
          </p>
        </div>

        {count === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="luxury-card rounded-[2rem] p-10 text-center"
          >
            <p className="text-sm uppercase tracking-[0.28em] text-white/45">No products added yet</p>
            <a
              href="#products"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-xs font-medium uppercase tracking-[0.24em] text-ink transition hover:bg-white/85"
            >
              Browse Products
            </a>
          </motion.div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {items.map((item) => (
                <motion.article
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  className="luxury-card grid gap-5 rounded-2xl p-4 md:grid-cols-[120px_1fr_auto] md:items-center"
                >
                  <div className="overflow-hidden rounded-xl bg-white/5">
                    <img src={item.image} alt={item.name || item.title || item.slug} className="h-32 w-full object-cover md:h-28" />
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">{item.name || item.title}</p>
                    <h2 className="mt-2 font-display text-2xl font-thin tracking-[-0.04em] text-white">
                      {item.name || item.title}
                    </h2>
                    <p className="mt-2 text-sm tracking-[0.14em] text-white/55">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center rounded-full border border-white/10 bg-white/[0.04]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                        className="px-4 py-2 text-white/70 transition hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="min-w-10 px-2 text-center text-sm tracking-[0.16em] text-white">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                        className="px-4 py-2 text-white/70 transition hover:text-white"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.slug)}
                      className="text-xs uppercase tracking-[0.24em] text-white/45 transition hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="luxury-card h-fit rounded-[2rem] p-6"
            >
              <h2 className="font-display text-3xl font-thin tracking-[-0.04em] text-white">Order Summary</h2>

              <div className="mt-8 space-y-4 text-sm tracking-[0.14em] text-white/60">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery</span>
                  <span className="text-white">{delivery === 0 ? 'Free' : formatPrice(delivery)}</span>
                </div>
                <div className="border-t border-white/8 pt-4 text-base text-white">
                  <div className="flex items-center justify-between">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (requireAuth('#checkout')) {
                    window.location.hash = '#checkout';
                  }
                }}
                className="mt-8 w-full rounded-full bg-white px-6 py-3 text-xs font-medium uppercase tracking-[0.24em] text-ink transition hover:bg-white/85"
              >
                Proceed to Checkout
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="mt-4 w-full rounded-full border border-white/10 px-6 py-3 text-xs font-medium uppercase tracking-[0.24em] text-white/60 transition hover:border-white/24 hover:text-white"
              >
                Clear Cart
              </button>
            </motion.aside>
          </div>
        )}
      </div>
    </section>
  );
};
