import { useRef } from 'react';
import { useCanvasSequence } from '../hooks/useCanvasSequence';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { morphFrames } from '../lib/data';
import { Reveal } from './Reveal';

export const ProductMorph = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progress = useScrollProgress(sectionRef);
  const { images, loaded, progress: preloadProgress, error } = useImagePreloader({
    folder: '/sequence-2',
    frameCount: morphFrames
  });

  useCanvasSequence({ canvasRef, images, progress, options: { fit: 'cover' } });

  const headlineOpacity = Math.max(0, 1 - Math.abs(progress - 0.5) * 1.8);
  const headlineY = (progress - 0.5) * -46;

  return (
    <section id="morph" ref={sectionRef} className="scroll-section bg-ink" aria-label="Product morph sequence">
      <div className="sticky-canvas">
        <canvas ref={canvasRef} className="sequence-canvas" aria-hidden="true" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-ink/95 via-ink/45 to-ink/88" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink via-transparent to-ink/70" />

        {!loaded && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-ink">
            <div className="flex flex-col items-center gap-5">
              <div className="h-px w-28 bg-white/20">
                <div className="h-full bg-white" style={{ width: `${preloadProgress * 100}%` }} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.38em] text-white/45">
                Rendering product ecosystem {Math.round(preloadProgress * 100)}%
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
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div
              style={{ opacity: headlineOpacity, y: headlineY }}
              className="max-w-3xl"
            >
              <Reveal as="p" className="mb-6 text-[11px] uppercase tracking-[0.42em] text-white/50">
                Product Morphology
              </Reveal>
              <Reveal as="h2" className="font-display text-balance text-4xl font-thin leading-[0.98] tracking-[-0.045em] text-white md:text-6xl lg:text-7xl">
                Designed To Transform Everyday Experiences
              </Reveal>
              <Reveal as="p" delay={0.12} className="mt-7 max-w-xl text-sm leading-8 tracking-[0.18em] text-white/62 md:text-base">
                Where craftsmanship, technology, and design come together.
              </Reveal>
            </div>

            <div className="hidden h-px max-w-md bg-white/10 lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
};
