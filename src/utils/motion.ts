import { useState, useEffect } from 'react';

/**
 * Consolidated named motion tokens for consistent animation curves
 * across Anime.js timelines and JS animations.
 */
export const EASINGS = {
  // Fluent Apple-like deceleration curve
  outExpo: 'cubicBezier(0.16, 1, 0.3, 1)',
  // Natural cubic deceleration
  outCubic: 'easeOutCubic',
  // Smooth bidirectional transition
  inOutSoft: 'cubicBezier(0.65, 0, 0.15, 1)',
  // Snappy spring with tight settling
  springSnappy: 'spring(1, 85, 12, 0)',
  // Gentle tactile spring
  springGentle: 'spring(1, 75, 10, 0)',
  // Bouncy micro-interaction spring
  springBounce: 'spring(1, 90, 11, 0)',
} as const;

export const DURATIONS = {
  instant: 100,
  fast: 160,
  normal: 240,
  relaxed: 380,
  curtain: 520,
  shutter: 1400,
} as const;

/**
 * useModalTransition
 * Manages entrance AND exit animation lifecycles so modals can play
 * exit animations smoothly before being unmounted from the DOM.
 */
export function useModalTransition(isOpen: boolean, durationMs: number = 220) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = window.setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, durationMs);
      return () => clearTimeout(timer);
    }
  }, [isOpen, durationMs, shouldRender]);

  return {
    shouldRender,
    isClosing,
    isVisible: isOpen && !isClosing,
  };
}
