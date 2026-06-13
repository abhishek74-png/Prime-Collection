import { ReactNode, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (value) => Math.min(1, 1 - Math.pow(2, -10 * value)),
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.6,
      infinite: false
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
