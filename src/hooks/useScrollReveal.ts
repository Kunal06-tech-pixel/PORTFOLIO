import { useEffect } from 'react';
import anime from 'animejs';

/**
 * useScrollReveal: Cohesive, cinematic, hardware-accelerated scroll-reveal system
 * driven by IntersectionObserver and Anime.js spring / cubic-bezier curves.
 * 
 * Features:
 * - Editorial Curtain reveals (masked text slide-up from overflow hidden)
 * - Hairline Line Draws (scaleX(0) -> scaleX(1))
 * - Staggered Blur-to-Focus card elevations (blur(8px) -> blur(0px))
 * - Non-blocking (fast 400ms-550ms durations)
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
              duration: 520,
              delay,
              easing: 'cubicBezier(0.16, 1, 0.3, 1)',
            });
            return;
          }

          // 2. Expanding Hairline Grid Divider
          if (revealType === 'line') {
            anime({
              targets: target,
              scaleX: [0, 1],
              opacity: [0, 1],
              duration: 560,
              delay,
              easing: 'easeOutExpo',
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
                delay: anime.stagger(70, { start: delay }),
                duration: 480,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
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
              duration: 480,
              delay,
              easing: 'spring(1, 85, 12, 0)',
            });
            return;
          }

          // 5. Default fluid fade-up for section headings and paragraphs
          anime({
            targets: target,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 450,
            delay,
            easing: 'cubicBezier(0.16, 1, 0.3, 1)',
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

    return () => observer.disconnect();
  }, []);
};
