import React, { useEffect, useRef, useState, useCallback } from 'react';
import anime from 'animejs';
import { scrollToAnchor } from '../utils/lenis';

interface DockItemConfig {
  id: string;
  label: string;
  num: string;
  icon: React.ReactNode;
}

const DOCK_ITEMS: DockItemConfig[] = [
  {
    id: 'hero',
    label: 'Home',
    num: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Works',
    num: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    id: 'experience',
    label: 'History',
    num: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 'skills',
    label: 'Stack',
    num: '04',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    num: '05',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
];

export const BottomDock: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const isClickScrollingRef = useRef<boolean>(false);
  const clickTimeoutRef = useRef<number | null>(null);

  const dockContainerRef = useRef<HTMLDivElement>(null);
  const dockNavRef = useRef<HTMLElement>(null);
  const activePillRef = useRef<HTMLDivElement>(null);

  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const activeIndex = DOCK_ITEMS.findIndex((item) => item.id === activeSection);

  // 1. Initial Dock Entrance Timeline via Anime.js
  useEffect(() => {
    if (!dockContainerRef.current) return;

    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 800,
    });

    tl.add({
      targets: dockContainerRef.current,
      translateY: [35, 0],
      opacity: [0, 1],
      duration: 700,
      easing: 'spring(1, 80, 12, 0)',
    }).add(
      {
        targets: itemRefs.current.filter(Boolean),
        scale: [0.75, 1],
        opacity: [0, 1],
        delay: anime.stagger(50),
        duration: 400,
        easing: 'spring(1, 85, 10, 0)',
      },
      '-=400'
    );
  }, []);

  // 2. Animate Active Sliding Spotlight / Pill when activeIndex changes
  const updateActivePillPosition = useCallback(
    (index: number, immediate = false) => {
      const activeBtn = itemRefs.current[index];
      const pill = activePillRef.current;
      const nav = dockNavRef.current;

      if (!activeBtn || !pill || !nav) return;

      const navRect = nav.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();

      const targetX = btnRect.left - navRect.left;
      const targetWidth = btnRect.width;

      if (immediate) {
        pill.style.transform = `translateX(${targetX}px)`;
        pill.style.width = `${targetWidth}px`;
        pill.style.opacity = '1';
        return;
      }

      anime.remove(pill);
      anime({
        targets: pill,
        translateX: targetX,
        width: targetWidth,
        opacity: [0.85, 1],
        scaleX: [1.15, 1],
        duration: 460,
        easing: 'spring(1, 85, 12, 0)',
      });

      // Animate active icon spring bounce
      const activeIcon = iconRefs.current[index];
      if (activeIcon) {
        anime.remove(activeIcon);
        anime({
          targets: activeIcon,
          scale: [0.82, 1.22, 1],
          translateY: [0, -3, 0],
          duration: 520,
          easing: 'spring(1, 75, 9, 0)',
        });
      }
    },
    []
  );

  useEffect(() => {
    if (activeIndex >= 0) {
      updateActivePillPosition(activeIndex);
    }
  }, [activeIndex, updateActivePillPosition]);

  // Window resize handler for pill alignment
  useEffect(() => {
    const handleResize = () => {
      if (activeIndex >= 0) {
        updateActivePillPosition(activeIndex, true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, updateActivePillPosition]);

  // 3. Scroll & Viewport Tracker — Contextually maps scroll position to active section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        if (isClickScrollingRef.current) {
          ticking = false;
          return;
        }

        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

        // Special case: near bottom activates contact
        if (progress >= 92) {
          setActiveSection('contact');
          ticking = false;
          return;
        }

        const sectionIds = DOCK_ITEMS.map((item) => item.id);
        const viewportCenter = window.innerHeight * 0.45;

        let currentActive = 'hero';
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= viewportCenter && rect.bottom >= viewportCenter * 0.4) {
              currentActive = id;
            }
          }
        }

        setActiveSection(currentActive);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 4. Click Handler with Shockwave & Programmatic Smooth Scroll
  const handleItemClick = (e: React.MouseEvent, id: string, index: number) => {
    e.preventDefault();

    setActiveSection(id);
    updateActivePillPosition(index);

    // Shockwave click spring on button
    const btn = itemRefs.current[index];
    if (btn) {
      anime({
        targets: btn,
        scale: [0.88, 1.08, 1],
        duration: 380,
        easing: 'spring(1, 90, 11, 0)',
      });
    }

    // Lock scroll observer temporarily during smooth scroll
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    scrollToAnchor('#' + id);

    clickTimeoutRef.current = window.setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 1100);
  };

  // 5. Tactile Hover Physics with Neighbor Attraction
  const handleMouseEnter = (idx: number) => {
    const icon = iconRefs.current[idx];
    if (icon) {
      anime({
        targets: icon,
        scale: 1.16,
        translateY: -2,
        duration: 220,
        easing: 'easeOutCubic',
      });
    }

    // Magnetic micro-attraction on immediate neighbors
    [-1, 1].forEach((offset) => {
      const neighbor = iconRefs.current[idx + offset];
      if (neighbor) {
        anime({
          targets: neighbor,
          scale: 1.06,
          duration: 220,
          easing: 'easeOutCubic',
        });
      }
    });
  };

  const handleMouseLeave = (idx: number) => {
    const icon = iconRefs.current[idx];
    if (icon) {
      anime({
        targets: icon,
        scale: 1,
        translateY: 0,
        duration: 300,
        easing: 'spring(1, 80, 10, 0)',
      });
    }

    [-1, 1].forEach((offset) => {
      const neighbor = iconRefs.current[idx + offset];
      if (neighbor) {
        anime({
          targets: neighbor,
          scale: 1,
          duration: 300,
          easing: 'spring(1, 80, 10, 0)',
        });
      }
    });
  };

  return (
    <div className="dock-wrapper" id="dockWrapper">
      <div className="dock-container" id="dockContainer" ref={dockContainerRef}>
        {/* Main Bottom Dock Navigation Bar */}
        <nav className="dock-nav" id="dockNav" ref={dockNavRef} role="navigation" aria-label="Quick Sections">
          {/* Anime.js Sliding Active Frame / Spotlight */}
          <div className="dock-active-pill" ref={activePillRef} aria-hidden="true" />

          {/* Dock Items */}
          {DOCK_ITEMS.map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                ref={(el) => (itemRefs.current[idx] = el)}
                className={`dock-item ${isActive ? 'active' : ''}`}
                onClick={(e) => handleItemClick(e, item.id, idx)}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                aria-label={`${item.label} Section`}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Corner Accent for Active Item */}
                {isActive && <div className="dock-active-corner" aria-hidden="true" />}

                {/* Icon Container */}
                <span className="dock-icon-wrapper" ref={(el) => (iconRefs.current[idx] = el)}>
                  {item.icon}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      <style>{`
        /* ============================================
           PERFECT VIEWPORT CENTERING WRAPPER
           ============================================ */
        .dock-wrapper {
          position: fixed !important;
          bottom: 1.25rem !important;
          left: 0 !important;
          right: 0 !important;
          width: 100vw !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          pointer-events: none !important;
          z-index: 1000 !important;
        }

        .dock-container {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          pointer-events: none !important;
          margin: 0 auto !important;
        }

        /* Disable redundant tooltips */
        .dock-item::before {
          display: none !important;
          content: none !important;
        }

        /* Main Navigation Chassis matching reference image */
        .dock-nav {
          position: relative !important;
          left: auto !important;
          right: auto !important;
          bottom: auto !important;
          transform: none !important;
          display: flex !important;
          align-items: center !important;
          gap: 0.35rem !important;
          padding: 0.4rem 0.5rem !important;
          background: #141414 !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border-radius: 0px !important;
          border: 1px solid rgba(255, 255, 255, 0.16) !important;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
          pointer-events: auto !important;
          user-select: none !important;
          overflow: visible !important;
        }

        /* Anime.js Sliding Active Spotlight Frame */
        .dock-active-pill {
          position: absolute !important;
          top: 0.4rem !important;
          left: 0 !important;
          height: calc(100% - 0.8rem) !important;
          background: rgba(255, 255, 255, 0.14) !important;
          border: 1px solid rgba(255, 255, 255, 0.45) !important;
          pointer-events: none !important;
          z-index: 1 !important;
          box-shadow: 0 0 16px rgba(255, 255, 255, 0.18), inset 0 0 10px rgba(255, 255, 255, 0.08) !important;
          will-change: transform, width !important;
        }

        /* Individual Dock Item Button */
        .dock-item {
          position: relative !important;
          width: 48px !important;
          height: 48px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-radius: 0px !important;
          border: 1px solid rgba(255, 255, 255, 0.09) !important;
          background: #181818 !important;
          color: rgba(255, 255, 255, 0.55) !important;
          cursor: pointer !important;
          text-decoration: none !important;
          outline: none !important;
          z-index: 2 !important;
          will-change: transform !important;
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease !important;
        }

        .dock-item:focus-visible {
          border-color: #FFFFFF !important;
        }

        .dock-icon-wrapper {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 100% !important;
          height: 100% !important;
          will-change: transform !important;
          pointer-events: none !important;
        }

        .dock-item svg {
          width: 22px !important;
          height: 22px !important;
          stroke: rgba(255, 255, 255, 0.55) !important;
          stroke-linecap: round !important;
          stroke-linejoin: round !important;
          transition: stroke 0.2s ease, filter 0.2s ease !important;
        }

        /* Hover State */
        .dock-item:hover {
          background: #222222 !important;
          border-color: rgba(255, 255, 255, 0.25) !important;
        }

        .dock-item:hover svg {
          stroke: #FFFFFF !important;
        }

        /* Active State */
        .dock-item.active {
          background: transparent !important;
          border-color: transparent !important;
        }

        .dock-item.active svg {
          stroke: #FFFFFF !important;
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.8)) !important;
        }

        /* Active Corner Indicator Notch */
        .dock-active-corner {
          position: absolute !important;
          bottom: 3px !important;
          right: 3px !important;
          width: 4px !important;
          height: 4px !important;
          background-color: #27c93f !important;
          box-shadow: 0 0 6px #27c93f !important;
          pointer-events: none !important;
        }

        /* ============================================
           LIGHT THEME ADAPTATION
           ============================================ */
        [data-theme="light"] .dock-nav {
          background: #F4F2EE !important;
          border-color: rgba(0, 0, 0, 0.16) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12) !important;
        }

        [data-theme="light"] .dock-active-pill {
          background: rgba(0, 0, 0, 0.08) !important;
          border-color: rgba(0, 0, 0, 0.35) !important;
          box-shadow: 0 0 12px rgba(0, 0, 0, 0.08) !important;
        }

        [data-theme="light"] .dock-item {
          background: #FFFFFF !important;
          border-color: rgba(0, 0, 0, 0.1) !important;
        }

        [data-theme="light"] .dock-item svg {
          stroke: rgba(0, 0, 0, 0.6) !important;
        }

        [data-theme="light"] .dock-item:hover {
          background: #E8E6E1 !important;
          border-color: rgba(0, 0, 0, 0.3) !important;
        }

        [data-theme="light"] .dock-item:hover svg {
          stroke: #000000 !important;
        }

        [data-theme="light"] .dock-item.active {
          background: transparent !important;
          border-color: transparent !important;
        }

        [data-theme="light"] .dock-item.active svg {
          stroke: #000000 !important;
          filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.4)) !important;
        }

        [data-theme="light"] .dock-active-corner {
          background-color: #000000 !important;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.6) !important;
        }

        /* Mobile responsiveness */
        @media (max-width: 600px) {
          .dock-wrapper {
            bottom: 0.85rem !important;
          }
          .dock-nav {
            gap: 0.2rem !important;
            padding: 0.3rem 0.4rem !important;
          }
          .dock-item {
            width: 42px !important;
            height: 42px !important;
          }
          .dock-item svg {
            width: 18px !important;
            height: 18px !important;
          }
        }
      `}</style>
    </div>
  );
};
