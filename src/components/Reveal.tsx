import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'p' | 'h2' | 'h3' | 'section' | 'article';
}

export const Reveal = ({ children, className = '', delay = 0, as = 'div' }: RevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={
        prefersReducedMotion
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 34, filter: 'blur(16px)' }
      }
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
};
