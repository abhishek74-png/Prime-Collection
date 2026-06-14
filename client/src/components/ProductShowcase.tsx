import { motion } from 'framer-motion';
import { showcaseSections } from '../lib/data';
import { Reveal } from './Reveal';

export const ProductShowcase = () => (
  <section className="bg-surface py-28 md:py-40">
    <div className="mx-auto max-w-[1600px] px-6 md:px-10">
      <Reveal className="mb-24 max-w-5xl">
        <p className="mb-5 text-[11px] uppercase tracking-[0.42em] text-white/50">Product Showcase</p>
        <h2 className="font-display text-balance text-4xl font-thin leading-[1] tracking-[-0.045em] text-white md:text-7xl">
          Magazine-scale compositions for products with presence.
        </h2>
      </Reveal>

      <div className="space-y-32">
        {showcaseSections.map((section, index) => (
          <article
            key={section.eyebrow}
            className={`grid gap-12 md:grid-cols-2 md:items-center ${index % 2 === 1 ? 'md:[grid-template-columns:1.05fr_0.95fr]' : ''}`}
          >
            {index % 2 === 1 ? (
              <>
                <Reveal className="order-2 md:order-1">
                  <div className="mb-6 flex flex-wrap gap-3">
                    {section.stats.map((stat) => (
                      <span key={stat} className="rounded-full border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/50">
                        {stat}
                      </span>
                    ))}
                  </div>
                  <p className="mb-5 text-[11px] uppercase tracking-[0.36em] text-white/45">{section.eyebrow}</p>
                  <h3 className="font-display text-balance text-3xl font-thin leading-tight tracking-[-0.045em] text-white md:text-5xl">
                    {section.title}
                  </h3>
                  <p className="mt-6 max-w-xl text-sm leading-8 tracking-[0.16em] text-white/62 md:text-base">
                    {section.body}
                  </p>
                </Reveal>
                <Reveal delay={0.12} className="order-1 md:order-2">
                  <motion.div
                    whileInView={{ y: [18, 0, -10] }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1] }}
                    className="luxury-card overflow-hidden"
                  >
                    <img
                      src={section.image}
                      alt=""
                      className="h-[560px] w-full object-cover opacity-80 grayscale-[0.18] transition duration-700 hover:scale-105 hover:opacity-100"
                    />
                  </motion.div>
                </Reveal>
              </>
            ) : (
              <>
                <Reveal>
                  <motion.div
                    whileInView={{ y: [-14, 0, 10] }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1] }}
                    className="luxury-card overflow-hidden"
                  >
                    <img
                      src={section.image}
                      alt=""
                      className="h-[560px] w-full object-cover opacity-80 grayscale-[0.18] transition duration-700 hover:scale-105 hover:opacity-100"
                    />
                  </motion.div>
                </Reveal>
                <Reveal delay={0.12}>
                  <div className="mb-6 flex flex-wrap gap-3">
                    {section.stats.map((stat) => (
                      <span key={stat} className="rounded-full border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/50">
                        {stat}
                      </span>
                    ))}
                  </div>
                  <p className="mb-5 text-[11px] uppercase tracking-[0.36em] text-white/45">{section.eyebrow}</p>
                  <h3 className="font-display text-balance text-3xl font-thin leading-tight tracking-[-0.045em] text-white md:text-5xl">
                    {section.title}
                  </h3>
                  <p className="mt-6 max-w-xl text-sm leading-8 tracking-[0.16em] text-white/62 md:text-base">
                    {section.body}
                  </p>
                </Reveal>
              </>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
);
