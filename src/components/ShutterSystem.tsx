import React, { useEffect, useState, useRef } from 'react';

interface ShutterSystemProps {
  onUnlock?: () => void;
}

export const ShutterSystem: React.FC<ShutterSystemProps> = ({ onUnlock }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [canEnter, setCanEnter] = useState(false);

  // Synchronous guard ref: ensures handleOpen cannot be executed twice
  const hasOpenedRef = useRef(false);
  const letterTimerRef = useRef<number | null>(null);
  const autoOpenTimerRef = useRef<number | null>(null);
  const removeTimerRef = useRef<number | null>(null);

  // Two stacked lines matching the reference:
  // KUNAL
  // KUMAR DAS
  const line1 = "KUNAL";
  const line2 = "KUMAR DAS";

  const handleOpen = () => {
    // Synchronously ensure opening is executed strictly once
    if (hasOpenedRef.current) return;
    hasOpenedRef.current = true;

    // Clear all pending timers immediately
    if (letterTimerRef.current) {
      clearTimeout(letterTimerRef.current);
      letterTimerRef.current = null;
    }
    if (autoOpenTimerRef.current) {
      clearTimeout(autoOpenTimerRef.current);
      autoOpenTimerRef.current = null;
    }

    setIsRevealed(true);

    // After physical shutter slide-up (1.4s) + finish (0.4s)
    removeTimerRef.current = window.setTimeout(() => {
      setIsRemoved(true);
      document.body.classList.remove('loading');
      if (onUnlock) onUnlock();
    }, 1800);
  };

  useEffect(() => {
    // Check reduced motion preference: if active, bypass splash immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsRemoved(true);
      document.body.classList.remove('loading');
      if (onUnlock) onUnlock();
      return;
    }

    // Lock body scroll while splash screen is active
    document.body.classList.add('loading');

    // Preload essential assets (Bebas Neue font + Hero portrait) to avoid FOUC / CLS
    const preloadHeroImage = new Promise((resolve) => {
      const img = new Image();
      img.src = '/kunal-portrait-transparent.webp';
      if (img.complete) {
        resolve(true);
      } else {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      }
    });

    const fontPromise = document.fonts ? document.fonts.load('1em "Bebas Neue"') : Promise.resolve();
    const safetyTimeout = new Promise((resolve) => setTimeout(resolve, 1500));

    Promise.race([Promise.all([fontPromise, preloadHeroImage]), safetyTimeout]).then(() => {
      // If already opened via click/key before assets loaded, do nothing
      if (hasOpenedRef.current) return;

      // 1. Trigger staggered typography reveal
      letterTimerRef.current = window.setTimeout(() => {
        setIsAnimated(true);
      }, 80);

      // Total animation time for letters: stagger + transition duration
      const totalChars = line1.length + line2.length;
      const animFinishTime = 80 + (totalChars * 32) + 400; // ~928ms

      // 2. Once letters finish revealing, enable canEnter state
      window.setTimeout(() => {
        if (!hasOpenedRef.current) {
          setCanEnter(true);
        }
      }, animFinishTime);

      // 3. Automatically lift shutter on itself after letters settle (~1.8s total from mount)
      autoOpenTimerRef.current = window.setTimeout(() => {
        handleOpen();
      }, animFinishTime + 900);
    }).catch(() => {
      // Fallback if loading encounters error: auto-open after 1.8s
      autoOpenTimerRef.current = window.setTimeout(() => {
        handleOpen();
      }, 1800);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'Escape') {
        e.preventDefault();
        handleOpen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (letterTimerRef.current) clearTimeout(letterTimerRef.current);
      if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
      if (removeTimerRef.current) clearTimeout(removeTimerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('loading');
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      id="shutter-system"
      className={`shutter-system ${isRevealed ? 'reveal' : ''}`}
      onClick={handleOpen}
      title="Click anywhere to enter portfolio"
    >
      {/* Top Box Roll Mechanism (Anchored coil housing) */}
      <div className="shutter-top-box" />

      {/* Left Wall Track */}
      <div className="shutter-track left" />

      {/* Right Wall Track with Switch Panel */}
      <div className="shutter-track right">
        <div className="shutter-switch-panel">
          <div className="switch-nail" />
          <div className="switch-lock" />
          <div className="switch-nail" />
        </div>
      </div>

      {/* Shutter Slat Surface with Center Name */}
      <div id="splash-screen" className={`splash-screen ${isRevealed ? 'reveal' : ''}`}>
        <div className="splash-content">
          <div id="splash-text" className="splash-text">
            {/* Line 1: KUNAL */}
            <div className="splash-line">
              {line1.split('').map((char, idx) => (
                <span
                  key={`l1-${idx}`}
                  className="splash-char"
                  style={{
                    opacity: isAnimated ? 1 : 0,
                    transform: isAnimated ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.92)',
                    transitionDelay: `${idx * 0.032}s`,
                  }}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Line 2: KUMAR DAS */}
            <div className="splash-line">
              {line2.split('').map((char, idx) => {
                const overallIndex = line1.length + idx;
                if (char === ' ') {
                  return (
                    <span key={`l2-${idx}`} className="splash-char splash-space">
                      &nbsp;
                    </span>
                  );
                }
                return (
                  <span
                    key={`l2-${idx}`}
                    className="splash-char"
                    style={{
                      opacity: isAnimated ? 1 : 0,
                      transform: isAnimated ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.92)',
                      transitionDelay: `${overallIndex * 0.032}s`,
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Shutter Lift Bar / Handle Plate */}
        <div
          id="splash-enter-btn"
          className={`splash-enter-btn ${canEnter ? 'show' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          role="button"
          tabIndex={0}
        >
          <div className="stopper-plate left">
            <div className="s-nail" />
            <div className="s-nail" />
          </div>

          <div className="shutter-mechanisms">
            <div className="shutter-handle-base">
              <div className="h-nail" />
              <div className="shutter-physical-handle" />
              <div className="h-nail" />
            </div>
            <div className="shutter-lock" />
            <div className="shutter-lock-plate">LOCK</div>
          </div>

          <div className="stopper-plate right">
            <div className="s-nail" />
            <div className="s-nail" />
          </div>

          {/* Subtle affordance hint */}
          <span className={`click-hint ${canEnter ? 'show' : ''}`}>
            [ ENTER ↗ ]
          </span>
        </div>

        {/* Quick Skip Control */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          className="skip-splash-btn"
          title="Skip intro"
        >
          [SKIP ↗]
        </button>
      </div>
    </div>
  );
};

export default ShutterSystem;
