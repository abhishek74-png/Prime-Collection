import { Reveal } from './Reveal';

export const Globe = () => (
  <section id="contact" className="relative min-h-screen overflow-hidden bg-ink">
    <video
      className="absolute inset-0 h-full w-full object-cover opacity-70"
      src="/globe-loop.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/35 to-ink/95" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_38%)] opacity-70" />

    <div className="relative z-10 flex min-h-screen items-center px-6 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-6 text-[11px] uppercase tracking-[0.42em] text-white/55">Global Footprint</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-balance text-5xl font-thin leading-[0.96] tracking-[-0.05em] text-white md:text-8xl">
            Delivering Excellence Worldwide
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-2xl text-sm leading-8 tracking-[0.18em] text-white/65 md:text-base">
            Connecting customers around the globe with premium products and exceptional service.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <a
            href="#collections"
            className="mt-10 inline-flex h-12 items-center justify-center rounded-full border border-white/18 px-8 text-xs uppercase tracking-[0.28em] text-white transition duration-300 hover:border-white/40 hover:bg-white/10"
          >
            Explore Collections
          </a>
        </Reveal>
      </div>
    </div>
  </section>
);
