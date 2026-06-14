import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCart } from '../context/CartContext';

type NavItem = {
  label: string;
  id: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: 'Home', id: 'home', href: '#' },
  { label: 'Collections', id: 'collections', href: '#collections' },
  { label: 'Products', id: 'products', href: '#products' },
  { label: 'Cart', id: 'cart', href: '#cart' },
  { label: 'Profile', id: 'auth', href: '#auth' }
];

const trackedSectionIds = navItems.filter((item) => item.id !== 'home').map((item) => item.id);
const cubic = [0.16, 1, 0.3, 1];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const Navbar = () => {
  const navRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeLink, setActiveLink] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [pill, setPill] = useState({ left: 0, width: 120 });
  const [magnetic, setMagnetic] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const { count } = useCart();

  const navBackground = useTransform(scrollY, [0, 96], ['rgba(10,10,10,0.62)', 'rgba(10,10,10,0.82)']);
  const navBorder = useTransform(scrollY, [0, 96], ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.16)']);
  const navBlur = useTransform(scrollY, [0, 96], ['blur(0px)', 'blur(20px)']);
  const navShadow = useTransform(
    scrollY,
    [0, 96],
    ['0 18px 70px rgba(0,0,0,0.24)', '0 24px 90px rgba(0,0,0,0.42)']
  );

  const updatePill = (index: number) => {
    const item = itemRefs.current[index];
    const nav = navRef.current;

    if (!item || !nav) return;

    const itemRect = item.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    setPill({
      left: itemRect.left - navRect.left,
      width: itemRect.width
    });
  };

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    event.preventDefault();

    setActiveLink(item.id);

    if (item.id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      return;
    }

    window.location.hash = item.href;
  };

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const nav = navRef.current;
    if (!nav) return;

    const rect = nav.getBoundingClientRect();
    const x = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2), -1, 1);
    const y = clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2), -1, 1);

    setMagnetic({
      x: x * 6,
      y: y * 4
    });
  };

  useEffect(() => {
    const activeIndex = Math.max(0, navItems.findIndex((item) => item.id === activeLink));
    updatePill(activeIndex);
  }, [activeLink]);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      const scrolled = currentY > 28;
      const scrollingDown = currentY > lastY;

      setIsScrolled(scrolled);
      setIsVisible(!scrollingDown || currentY < 140);

      lastY = Math.max(currentY, 0);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = trackedSectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    let frame = 0;

    const updateActive = () => {
      frame = 0;
      const offset = 180;
      let current = 'home';

      if (window.scrollY < 360) {
        setActiveLink(current);
        return;
      }

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= offset && rect.bottom > offset) {
          current = section.id;
          break;
        }

        if (rect.top <= offset) {
          current = section.id;
        }
      }

      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10) {
        current = trackedSectionIds[trackedSectionIds.length - 1];
      }

      setActiveLink(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateActive);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  return (
    <motion.header
      className="fixed right-0 left-0 top-4 z-50 w-full px-4 sm:px-6 flex justify-end box-border"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -120 }}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      transition={{ duration: 0.55, ease: cubic }}
    >
      <motion.nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setMagnetic({ x: 0, y: 0 });
        }}
        className={`relative flex w-fit max-w-full h-[58px] items-center overflow-x-auto overflow-y-hidden rounded-[9999px] pl-2 pr-4 scrollbar-hide sm:h-[60px] sm:pl-3 sm:pr-5 box-border ${
          isScrolled ? 'pl-2 pr-4 sm:pl-3 sm:pr-5' : ''
        }`}
        style={{
          backgroundColor: navBackground,
          borderColor: navBorder,
          boxShadow: navShadow,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          transform: `translate3d(${magnetic.x}px, ${magnetic.y}px, 0)`
        }}
        aria-label="Primary navigation"
      >
        <motion.div
          layoutId="navbar-pill"
          layout
          className="absolute inset-y-2 z-0 rounded-[9999px] bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_30px_rgba(255,255,255,0.08)]"
          style={{ left: pill.left, width: pill.width }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        />

        <div className="relative z-10 flex items-center gap-1 whitespace-nowrap sm:gap-2">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              href={item.href}
              onClick={(event) => handleNavigate(event, item)}
              onMouseEnter={() => {
                updatePill(index);
              }}
              onFocus={() => {
                updatePill(index);
              }}
              aria-current={activeLink === item.id ? 'page' : undefined}
              className="relative inline-flex h-10 items-center justify-center rounded-[9999px] px-4 text-xs font-medium tracking-[0.22em] text-white/62 outline-none transition-colors duration-300 hover:text-white focus:text-white sm:px-5 sm:text-sm"
            >
              {item.label}
              {item.id === 'cart' && count > 0 && (
                <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-[10px] text-black">
                  {count}
                </span>
              )}
            </motion.a>
          ))}
        </div>
      </motion.nav>
    </motion.header>
  );
};
