import { useEffect } from 'react';
import anime from 'animejs';
import { EASINGS, DURATIONS } from '../utils/motion';

/**
 * useScrollReveal: Cohesive, cinematic, hardware-accelerated scroll-reveal system
 * driven by IntersectionObserver and Anime.js spring / cubic-bezier curves.
 * 
 * Features:
 * - Velocity-responsive durations: dynamically speeds up reveals during rapid scrolling
 * - Editorial Curtain reveals (masked text slide-up from overflow hidden)
 * - Hairline Line Draws (scaleX(0) -> scaleX(1))
 * - Staggered Blur-to-Focus card elevations (blur(8px) -> blur(0px))
 * - Zero layout shifts (only animates transform, opacity, & filter)
 * - Safe for reduced-motion users
 */
export const useScrollReveal = () => {
  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!targets.length) return;

    if (prefersReducedMotion) {
      targets.forEach((el) => {
        el.classList.add('is-revealed');
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.filter = 'none';
        const children = el.querySelectorAll<HTMLElement>('[data-reveal-child]');
        children.forEach((c) => {
          c.style.opacity = '1';
          c.style.transform = 'none';
          c.style.filter = 'none';
        });
      });
      return;
    }

    // Dynamic scroll velocity tracker
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let scrollVelocity = 0;

    const handleScrollMeasure = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const dy = Math.abs(window.scrollY - lastScrollY);
      scrollVelocity = dy / dt;
      lastScrollY = window.scrollY;
      lastTime = now;
    };

    window.addEventListener('scroll', handleScrollMeasure, { passive: true });

    const getScaledDuration = (baseDuration: number) => {
      // Scale down duration up to 40% if user is flick-scrolling rapidly
      const speedCompression = Math.max(0.6, 1 - Math.min(0.4, scrollVelocity * 0.18));
      return Math.round(baseDuration * speedCompression);
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;

          obs.unobserve(target);
          target.classList.add('is-revealed');

          const revealType = target.dataset.reveal || 'fade-up';
          const delay = target.dataset.revealDelay ? parseInt(target.dataset.revealDelay, 10) : 0;

          // 1. Editorial Curtain Unmask (masked text slide-up)
          if (revealType === 'curtain') {
            const innerText = target.querySelector<HTMLElement>('.curtain-inner') || target;
            anime({
              targets: innerText,
              translateY: ['105%', '0%'],
              opacity: [0, 1],
              duration: getScaledDuration(DURATIONS.curtain),
              delay,
              easing: EASINGS.outExpo,
            });
            return;
          }

          // 2. Expanding Hairline Grid Divider
          if (revealType === 'line') {
            anime({
              targets: target,
              scaleX: [0, 1],
              opacity: [0, 1],
              duration: getScaledDuration(560),
              delay,
              easing: EASINGS.outExpo,
            });
            return;
          }

          // 3. Staggered Blur-to-Focus Card Elevation
          if (revealType === 'blur-focus' || revealType === 'cascade') {
            const children = target.querySelectorAll<HTMLElement>('[data-reveal-child]');
            if (children.length) {
              anime({
                targets: children,
                opacity: [0, 1],
                translateY: [20, 0],
                filter: ['blur(6px)', 'blur(0px)'],
                delay: anime.stagger(65, { start: delay }),
                duration: getScaledDuration(480),
                easing: EASINGS.outExpo,
                complete: () => {
                  children.forEach((c) => {
                    c.style.filter = '';
                  });
                },
              });
              return;
            }
          }

          // 4. Spring pop for badges, CTAs, and featured elements
          if (revealType === 'pop') {
            anime({
              targets: target,
              opacity: [0, 1],
              scale: [0.92, 1],
              translateY: [14, 0],
              duration: getScaledDuration(480),
              delay,
              easing: EASINGS.springSnappy,
            });
            return;
          }

          // 5. Default fluid fade-up for section headings and paragraphs
          anime({
            targets: target,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: getScaledDuration(450),
            delay,
            easing: EASINGS.outExpo,
          });
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -5% 0px',
        threshold: 0.08,
      }
    );

    targets.forEach((el) => {
      if (!el.classList.contains('is-revealed')) {
        observer.observe(el);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScrollMeasure);
      observer.disconnect();
    };
  }, []);
};
