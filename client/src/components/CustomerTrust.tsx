import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const metrics = [
  { value: '50,000+', label: 'Customers' },
  { value: '150+', label: 'Luxury Brands' },
  { value: '24/7', label: 'Support' },
  { value: '99%', label: 'Customer Satisfaction' }
];

export const CustomerTrust = () => (
  <section id="journal" className="bg-surface py-28 md:py-40">
    <div className="mx-auto max-w-[1600px] px-6 md:px-10">
      <Reveal className="mx-auto mb-20 max-w-3xl text-center">
        <p className="mb-5 text-[11px] uppercase tracking-[0.42em] text-white/50">Customer Trust</p>
        <h2 className="font-display text-balance text-4xl font-thin leading-[1] tracking-[-0.045em] text-white md:text-7xl">
          Service with the precision of a private atelier.
        </h2>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-4">
        {metrics.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 0.1} as="article">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: 'blur(14px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.85, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="luxury-card p-8"
            >
              <p className="font-display text-4xl font-thin tracking-[-0.04em] text-white md:text-6xl">{metric.value}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.28em] text-white/52">{metric.label}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
