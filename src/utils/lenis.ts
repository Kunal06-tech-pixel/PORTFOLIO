import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenisInstance = instance;
};

export const getLenis = (): Lenis | null => {
  return lenisInstance;
};

export const scrollToAnchor = (target: string | HTMLElement, offset: number = 0) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      immediate: false,
    });
  } else {
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
