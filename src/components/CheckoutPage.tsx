import { FormEvent, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const API_URL = 'http://localhost:5000';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

export const CheckoutPage = () => {
  const { user, requireAuth, token } = useAuth();
  const { items, count, clearCart } = useCart();
  const subtotal = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [shipping, setShipping] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: ''
  });

  const delivery = 0;
  const total = subtotal + delivery;

  const authenticated = useMemo(() => Boolean(user && token), [user, token]);

  const placeOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!authenticated) {
      requireAuth('#checkout');
      return;
    }

    if (count === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cartResponse = await fetch(`${API_URL}/api/cart`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ items })
      });

      if (!cartResponse.ok) {
        throw new Error('Unable to sync cart before checkout');
      }

      const orderResponse = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ shipping, payment: { method: 'cod', status: 'pending' } })
      });

      if (!orderResponse.ok) {
        throw new Error('Unable to place order');
      }

      clearCart();
      setSuccess(true);
    } catch (orderError) {
      setError(orderError instanceof Error ? orderError.message : 'Unable to place order');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section id="checkout" className="bg-ink py-28 md:py-40">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="luxury-card rounded-[2rem] p-10"
          >
            <p className="mb-5 text-[11px] uppercase tracking-[0.42em] text-white/50">Order Success</p>
            <h1 className="font-display text-4xl font-thin tracking-[-0.05em] text-white md:text-6xl">
              Thank you. Your order has been placed.
            </h1>
            <p className="mt-6 text-sm leading-8 tracking-[0.16em] text-white/60">
              Order confirmation is linked to your account and will be available in your order history.
            </p>
            <a
              href="#products"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-xs font-medium uppercase tracking-[0.24em] text-ink transition hover:bg-white/85"
            >
              Continue Shopping
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="checkout" className="bg-ink py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-12">
          <p className="mb-4 text-[11px] uppercase tracking-[0.42em] text-white/50">Checkout</p>
          <h1 className="font-display text-balance text-4xl font-thin leading-tight tracking-[-0.05em] text-white md:text-7xl">
            Complete your order
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 tracking-[0.16em] text-white/60">
            Authentication is required before order placement. Guest carts are merged into your account cart during login.
          </p>
        </div>

        {!authenticated ? (
          <div className="luxury-card rounded-[2rem] p-8 text-center">
            <p className="text-sm leading-7 tracking-[0.14em] text-white/60">Please login or register to proceed.</p>
            <button
              type="button"
              onClick={() => requireAuth('#checkout')}
              className="mt-6 rounded-full bg-white px-7 py-3 text-xs font-medium uppercase tracking-[0.24em] text-ink transition hover:bg-white/85"
            >
              Login / Register
            </button>
          </div>
        ) : count === 0 ? (
          <div className="luxury-card rounded-[2rem] p-8 text-center">
            <p className="text-sm leading-7 tracking-[0.14em] text-white/60">Your cart is empty.</p>
            <a
              href="#products"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-xs font-medium uppercase tracking-[0.24em] text-ink transition hover:bg-white/85"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <form onSubmit={placeOrder} className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              <div className="luxury-card rounded-[2rem] p-6">
                <h2 className="font-display text-2xl font-thin tracking-[-0.04em] text-white">Shipping Details</h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <label className="md:col-span-2">
                    <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50">Full Name</span>
                    <input
                      value={shipping.fullName}
                      onChange={(event) => setShipping({ ...shipping, fullName: event.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-white/24"
                      required
                    />
                  </label>
                  <label className="md:col-span-2">
                    <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50">Address</span>
                    <input
                      value={shipping.address}
                      onChange={(event) => setShipping({ ...shipping, address: event.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-white/24"
                      required
                    />
                  </label>
                  <label>
                    <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50">City</span>
                    <input
                      value={shipping.city}
                      onChange={(event) => setShipping({ ...shipping, city: event.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-white/24"
                      required
                    />
                  </label>
                  <label>
                    <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50">Phone</span>
                    <input
                      value={shipping.phone}
                      onChange={(event) => setShipping({ ...shipping, phone: event.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-white/24"
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="luxury-card rounded-[2rem] p-6">
                <h2 className="font-display text-2xl font-thin tracking-[-0.04em] text-white">Order Items</h2>
                <div className="mt-6 space-y-4">
                  {items.map((item) => (
                    <div key={item.slug} className="flex items-center gap-4 border-b border-white/8 pb-4 last:border-0">
                      <img src={item.image} alt={item.name || item.title || item.slug} className="h-16 w-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{item.name || item.title}</p>
                        <p className="mt-1 text-xs tracking-[0.16em] text-white/50">Qty {item.quantity}</p>
                      </div>
                      <span className="text-sm text-white/70">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.aside initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="luxury-card h-fit rounded-[2rem] p-6">
              <h2 className="font-display text-2xl font-thin tracking-[-0.04em] text-white">Payment</h2>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm font-medium text-white">Cash on Delivery</p>
                <p className="mt-2 text-xs leading-6 tracking-[0.14em] text-white/50">
                  Payment will be collected when your order is delivered.
                </p>
              </div>

              <div className="mt-6 space-y-4 text-sm tracking-[0.14em] text-white/60">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery</span>
                  <span className="text-white">Free</span>
                </div>
                <div className="border-t border-white/8 pt-4 text-base text-white">
                  <div className="flex items-center justify-between">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {error && <p className="mt-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-full bg-white px-6 py-3 text-xs font-medium uppercase tracking-[0.24em] text-ink transition hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Placing Order…' : 'Place Order'}
              </button>
            </motion.aside>
          </form>
        )}
      </div>
    </section>
  );
};
