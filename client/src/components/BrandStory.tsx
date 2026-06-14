import { motion } from 'framer-motion';
import { storySections } from '../lib/data';
import { Reveal } from './Reveal';

export const BrandStory = () => (
  <section id="about" className="bg-ink py-28 md:py-40">
    <div className="mx-auto max-w-[1600px] px-6 md:px-10">
      <Reveal className="mb-20 max-w-4xl">
        <p className="mb-5 text-[11px] uppercase tracking-[0.42em] text-white/50">Brand Story</p>
        <h2 className="font-display text-balance text-4xl font-thin leading-[1] tracking-[-0.045em] text-white md:text-7xl">
          Editorial restraint for a more intentional marketplace.
        </h2>
      </Reveal>

      <div className="space-y-28 md:space-y-36">
        {storySections.map((section, index) => (
          <article
            key={section.title}
            className={`grid items-center gap-12 md:grid-cols-2 ${index % 2 === 1 ? 'md:[grid-template-columns:0.9fr_1.1fr]' : ''}`}
          >
            {index % 2 === 1 ? (
              <>
                <Reveal className="order-2 md:order-1">
                  <p className="mb-5 text-[11px] uppercase tracking-[0.36em] text-white/45">{section.label}</p>
                  <h3 className="font-display text-balance text-3xl font-thin leading-tight tracking-[-0.04em] text-white md:text-5xl">
                    {section.title}
                  </h3>
                  <p className="mt-6 max-w-xl text-sm leading-8 tracking-[0.16em] text-white/62 md:text-base">
                    {section.body}
                  </p>
                </Reveal>
                <Reveal delay={0.12} className="order-1 md:order-2">
                  <motion.div
                    whileInView={{ y: [18, 0, -12] }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    className="luxury-card overflow-hidden"
                  >
                    {section.image.endsWith('.mp4') ? (
                      <video
                        src={section.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-[520px] w-full object-cover opacity-80 grayscale-[0.18] transition duration-700 hover:scale-105 hover:opacity-100"
                      />
                    ) : (
                      <img
                        src={section.image}
                        alt=""
                        className="h-[520px] w-full object-cover opacity-80 grayscale-[0.18] transition duration-700 hover:scale-105 hover:opacity-100"
                      />
                    )}
                  </motion.div>
                </Reveal>
              </>
            ) : (
              <>
                <Reveal>
                  <motion.div
                    whileInView={{ y: [-14, 0, 10] }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    className="luxury-card overflow-hidden"
                  >
                    {section.image.endsWith('.mp4') ? (
                      <video
                        src={section.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-[520px] w-full object-cover opacity-80 grayscale-[0.18] transition duration-700 hover:scale-105 hover:opacity-100"
                      />
                    ) : (
                      <img
                        src={section.image}
                        alt=""
                        className="h-[520px] w-full object-cover opacity-80 grayscale-[0.18] transition duration-700 hover:scale-105 hover:opacity-100"
                      />
                    )}
                  </motion.div>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mb-5 text-[11px] uppercase tracking-[0.36em] text-white/45">{section.label}</p>
                  <h3 className="font-display text-balance text-3xl font-thin leading-tight tracking-[-0.04em] text-white md:text-5xl">
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
