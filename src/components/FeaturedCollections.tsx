import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { collectionProducts } from '../lib/data';
import { Reveal } from './Reveal';

const easeOut = [0.16, 1, 0.3, 1];

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

export const FeaturedCollections = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set(collectionProducts.map((product) => product.collection)))], []);
  const visibleProducts = useMemo(
    () => (activeCategory === 'All' ? collectionProducts : collectionProducts.filter((product) => product.collection === activeCategory)),
    [activeCategory]
  );

  return (
    <section id="collections" className="bg-[#0f1111] py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <Reveal className="mb-8">
          <p className="mb-3 text-[11px] uppercase tracking-[0.42em] text-white/50">Featured Collections</p>
          <h2 className="font-display text-balance text-3xl font-thin leading-tight tracking-[-0.04em] text-white md:text-6xl">
            Shop collections with an Amazon-style product experience.
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                whileTap={{ scale: 0.98 }}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium tracking-[0.12em] transition duration-300 ${
                  activeCategory === category
                    ? 'bg-[#febd69] text-ink shadow-[0_0_0_1px_rgba(254,189,105,0.9)]'
                    : 'border border-white/10 bg-white/[0.06] text-white/70 hover:border-white/24 hover:bg-white/[0.10] hover:text-white'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visibleProducts.map((product, index) => (
              <Reveal key={`${product.collection}-${product.title}`} delay={Math.min(index * 0.04, 0.24)} as="article">
                <motion.article
                  layout
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white p-4 shadow-[0_16px_48px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.34)]"
                >
                  <div className="relative mb-4 flex h-56 items-center justify-center overflow-hidden rounded-xl bg-[#f7f7f7]">
                    {product.badge && (
                      <span className="absolute left-3 top-3 z-10 rounded-sm bg-[#cc0c39] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                        {product.badge}
                      </span>
                    )}
                    <motion.img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full max-h-56 object-cover object-center transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#565959]">{product.collection}</p>
                  <h3 className="mt-2 line-clamp-2 min-h-[48px] text-sm font-medium leading-6 text-[#0f1111]">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#565959]">{product.brand}</p>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center text-[#ffa41c]">
                      {'★'.repeat(Math.floor(product.rating))}
                      <span className="text-[#ffa41c]">★</span>
                    </div>
                    <span className="text-xs text-[#007185]">{product.rating}</span>
                    <span className="text-xs text-[#565959]">({product.reviews})</span>
                  </div>

                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-xl font-medium text-[#0f1111]">{formatPrice(product.price)}</span>
                    <span className="mb-1 text-xs text-[#565959] line-through">{formatPrice(product.originalPrice)}</span>
                  </div>

                  <p className="mt-1 text-xs text-[#565959]">{product.delivery}</p>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      className="flex-1 rounded-full bg-[#ffd814] px-4 py-2.5 text-sm font-medium text-[#0f1111] transition duration-300 hover:bg-[#f7ca00]"
                    >
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      className="rounded-full bg-[#fa8900] px-4 py-2.5 text-sm font-medium text-white transition duration-300 hover:bg-[#e37b00]"
                    >
                      Buy
                    </button>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
