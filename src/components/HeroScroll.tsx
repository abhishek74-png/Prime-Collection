import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useCanvasSequence } from '../hooks/useCanvasSequence';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { heroFrames } from '../lib/data';

export const HeroScroll = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progress = useScrollProgress(sectionRef);
  const { images, loaded, progress: preloadProgress, error } = useImagePreloader({
    folder: '/sequence-1',
    frameCount: heroFrames
  });

  useCanvasSequence({ canvasRef, images, progress });

  const textOpacity = Math.max(0, 1 - progress * 2.15);
  const textY = progress * -72;

  return (
    <section ref={sectionRef} className="scroll-section bg-ink" aria-label="Luxury curated hero">
      <div className="sticky-canvas">
        <canvas ref={canvasRef} className="sequence-canvas" style={{ filter: 'brightness(0.72) contrast(1.12) saturate(0.82)' }} aria-hidden="true" />

        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.88), rgba(5,5,5,0.42) 42%, rgba(5,5,5,0.94))' }} />
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to right, rgba(5,5,5,0.68), rgba(5,5,5,0.18) 48%, rgba(5,5,5,0.48))' }} />
        <div className="absolute inset-0 z-10 opacity-70" style={{ backgroundImage: 'radial-gradient(circle at 50% 38%, rgba(255,255,255,0.12), transparent 36%)' }} />

        {!loaded && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-ink">
            <div className="flex flex-col items-center gap-5">
              <div className="h-px w-28 bg-white/20">
                <div className="h-full bg-white" style={{ width: `${preloadProgress * 100}%` }} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.38em] text-white/45">
                Loading cinematic frames {Math.round(preloadProgress * 100)}%
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-ink p-8 text-center">
            <p className="max-w-md text-sm leading-7 text-white/60">{error.message}</p>
          </div>
        )}

        <div className="relative z-20 flex min-h-screen items-center px-6 md:px-10">
          <motion.div
            className="mx-auto w-full max-w-5xl pt-24"
            style={{ opacity: textOpacity, y: textY }}
          >
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 text-[11px] uppercase tracking-[0.42em] text-white/55 md:text-xs"
            >
              Luxor Private Edit
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28, filter: 'blur(18px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.05, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-balance text-5xl font-thin leading-[0.92] tracking-[-0.055em] text-white md:text-7xl lg:text-9xl"
            >
              Luxury Curated For Modern Living
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-2xl text-sm leading-8 tracking-[0.18em] text-white/65 md:text-base"
            >
              Discover exceptional products crafted for those who expect more.
            </motion.p>

            <motion.a
              href="#collections"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
              style={{ opacity: Math.max(0, 1 - progress * 1.65) }}
              className="mt-12 inline-flex h-12 items-center justify-center rounded-full border border-white/18 px-8 text-xs uppercase tracking-[0.28em] text-white transition duration-300 hover:border-white/40 hover:bg-white/10"
            >
              Shop Collection
            </motion.a>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
          <span className="text-[10px] uppercase tracking-[0.36em] text-white/35">Scroll to explore</span>
          <span className="h-10 w-px overflow-hidden bg-white/10">
            <span className="block h-1/2 w-full animate-[scrollLine_1.8s_ease-in-out_infinite] bg-white/70" />
          </span>
        </div>
      </div>
    </section>
  );
};
