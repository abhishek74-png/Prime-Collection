import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Reveal } from './Reveal';

type DbProduct = {
  _id: string;
  name?: string;
  title?: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  stock?: number;
  brand?: string;
  rating?: number;
  featured?: boolean;
  image: string;
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

export const ProductPage = () => {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<DbProduct | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const { addToCart, buyNow } = useCart();
  const { requireAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:5000/api/products');

        if (!response.ok) {
          throw new Error('Unable to load products from MongoDB');
        }

        const data = await response.json();

        if (!cancelled) {
          setProducts(data);
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError instanceof Error ? fetchError.message : 'Unable to load products from MongoDB');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProduct(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const showProductToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  };

  const handleAddToCart = (product: DbProduct) => {
    addToCart(product);
    showProductToast(`${product.name || product.title} added to cart`);
  };

  const handleBuyNow = (product: DbProduct) => {
    buyNow(product);
    const authenticated = requireAuth('#checkout');

    if (authenticated) {
      showProductToast(`${product.name || product.title} added to cart. Proceeding to checkout.`);
      window.location.hash = '#checkout';
    } else {
      showProductToast('Login required to continue to checkout.');
    }
  };

  return (
    <section id="products" className="bg-ink py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal className="max-w-4xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.42em] text-white/50">Product Page</p>
            <h2 className="font-display text-balance text-4xl font-thin leading-[1] tracking-[-0.045em] text-white md:text-7xl">
              {loading ? 'Loading product catalog…' : `${products.length} products from MongoDB`}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm text-sm leading-8 tracking-[0.16em] text-white/60">
            The Products navbar option now opens this full product page with all seeded MongoDB products.
          </Reveal>
        </div>

        {loading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="luxury-card glow-border h-[520px] animate-pulse rounded-2xl" />
            ))}
          </div>
        )}

        {error && (
          <div className="luxury-card rounded-2xl p-8 text-center">
            <p className="text-sm leading-7 tracking-[0.14em] text-white/60">{error}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-white/40">Start the backend with: npm run dev:server</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <Reveal key={product._id || product.slug} delay={Math.min(index * 0.045, 0.24)} as="article">
                <motion.div
                  whileHover={{ y: -6 }}
                  className="luxury-card glow-border group overflow-hidden rounded-2xl p-4 transition duration-500"
                >
                  <div className="relative overflow-hidden rounded-xl bg-white/5">
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      src={product.image}
                      alt={product.name || product.title || product.slug}
                      className="h-[300px] w-full object-cover opacity-80 grayscale-[0.18] transition duration-700 group-hover:opacity-100"
                    />
                    {product.featured && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/12 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/80 backdrop-blur-md">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="px-1 pb-1 pt-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] uppercase tracking-[0.30em] text-white/42">{product.category}</p>
                      {typeof product.rating === 'number' && (
                        <span className="text-xs tracking-[0.12em] text-[#ffa41c]">★ {product.rating.toFixed(1)}</span>
                      )}
                    </div>

                    <h3 className="mt-3 line-clamp-2 min-h-[56px] font-display text-2xl font-thin leading-tight tracking-[-0.04em] text-white">
                      {product.name || product.title}
                    </h3>

                    <p className="mt-2 text-xs tracking-[0.18em] text-white/45">{product.brand || 'Luxor'}</p>

                    <p className="mt-4 min-h-[72px] text-sm leading-7 tracking-[0.13em] text-white/58">
                      {product.description}
                    </p>

                    <div className="mt-5 flex items-end gap-2">
                      <span className="text-lg font-medium tracking-[0.12em] text-white">{formatPrice(product.price)}</span>
                      {typeof product.stock === 'number' && (
                        <span className="pb-1 text-xs tracking-[0.14em] text-white/40">Stock {product.stock}</span>
                      )}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/8">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="py-5 text-xs uppercase tracking-[0.26em] text-white/55 transition duration-300 hover:text-white"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="rounded-full bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-[0.22em] text-ink transition duration-300 hover:bg-white/85"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="luxury-card relative w-full max-w-5xl overflow-hidden rounded-[2rem]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/20 hover:text-white"
            >
              Close
            </button>

            <div className="grid md:grid-cols-[0.95fr_1.05fr]">
              <div className="bg-white/5 p-5 md:p-8">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name || selectedProduct.title || selectedProduct.slug}
                  className="h-[360px] w-full rounded-2xl object-cover md:h-full"
                />
              </div>

              <div className="flex flex-col justify-center p-6 md:p-10">
                <p className="text-[11px] uppercase tracking-[0.36em] text-white/45">{selectedProduct.category}</p>
                <h3 className="mt-4 font-display text-4xl font-thin leading-tight tracking-[-0.05em] text-white md:text-6xl">
                  {selectedProduct.name || selectedProduct.title}
                </h3>
                <p className="mt-3 text-sm uppercase tracking-[0.22em] text-white/45">{selectedProduct.brand || 'Luxor'}</p>

                <div className="mt-6 flex items-center gap-3">
                  {typeof selectedProduct.rating === 'number' && (
                    <span className="text-sm tracking-[0.14em] text-[#ffa41c]">★ {selectedProduct.rating.toFixed(1)}</span>
                  )}
                  {typeof selectedProduct.stock === 'number' && (
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs tracking-[0.16em] text-white/50">
                      Stock {selectedProduct.stock}
                    </span>
                  )}
                  {selectedProduct.featured && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/70">
                      Featured
                    </span>
                  )}
                </div>

                <p className="mt-7 text-sm leading-8 tracking-[0.14em] text-white/62 md:text-base">
                  {selectedProduct.description}
                </p>

                <div className="mt-8 text-3xl font-medium tracking-[0.12em] text-white md:text-5xl">
                  {formatPrice(selectedProduct.price)}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      selectedProduct && handleAddToCart(selectedProduct);
                    }}
                    className="rounded-full bg-white px-7 py-3 text-xs font-medium uppercase tracking-[0.24em] text-ink transition hover:bg-white/85"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => selectedProduct && handleBuyNow(selectedProduct)}
                    className="rounded-full border border-white/15 px-7 py-3 text-xs font-medium uppercase tracking-[0.24em] text-white transition hover:border-white/30 hover:bg-white/10"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 rounded-full bg-white px-5 py-3 text-sm font-medium tracking-[0.12em] text-ink shadow-2xl"
        >
          {toast}
        </motion.div>
      )}
    </section>
  );
};
