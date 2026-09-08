import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';

interface HeroProps {
  onOpenSchedule: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSchedule, onOpenResume }) => {
  // Portrait image source (defaults to Kunal's transparent portrait)
  const [portraitSrc] = useState<string>(() => {
    const saved = localStorage.getItem('kd_custom_portrait');
    if (saved && !saved.includes('kunal-pixel-avatar') && !saved.includes('kunal-portrait.jpg')) {
      return saved;
    }
    return '/kunal-portrait-transparent.webp';
  });

  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Entrance animations via Anime.js
  useEffect(() => {
    const heroElements = heroRef.current?.querySelectorAll('.hero-animate');
    if (heroElements && heroElements.length > 0) {
      anime({
        targets: heroElements,
        opacity: [0, 1],
        translateY: [32, 0],
        delay: anime.stagger(130, { start: 250 }),
        duration: 900,
        easing: 'easeOutCubic',
      });
    }
  }, []);

  // Halftone canvas dot matrix background (matching inspo's fluid mathematical blob)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;

    let animId: number;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : { width: window.innerWidth * 0.75, height: window.innerHeight * 0.6 };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    let lastWidth = window.innerWidth;
    resizeCanvas();

    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        resizeCanvas();
      }
    };

    window.addEventListener('resize', handleResize);

    const getDotColor = () => {
      return getComputedStyle(document.documentElement).getPropertyValue('--text-main').trim() || '#E0E0E0';
    };

    const start = performance.now();

    const drawHalftone = (now: number) => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const dotSpacing = 9;
      const maxRadius = 3.6;
      const cx = w * 0.52;
      const cy = h * 0.48;
      const time = (now - start) * 0.0006;
      const dotColor = getDotColor();

      for (let x = 0; x < w; x += dotSpacing) {
        for (let y = 0; y < h; y += dotSpacing) {
          const dx = (x - cx) / (w * 0.45);
          const dy = (y - cy) / (h * 0.45);
          const dist = Math.sqrt(dx * dx + dy * dy);

          const angle = Math.atan2(dy, dx);
          const blobRadius =
            0.8 +
            0.15 * Math.sin(angle * 3 + 1.2 + Math.sin(time) * 0.25) +
            0.1 * Math.sin(angle * 5 - 0.8 + time * 0.2) +
            0.08 * Math.cos(angle * 7 + 2.5) +
            0.12 * Math.sin(angle * 2 + 0.5);

          if (dist < blobRadius) {
            const edgeFade = 1 - dist / blobRadius;
            const intensity = Math.pow(edgeFade, 0.6);
            const variation = 0.7 + 0.3 * Math.sin(x * 0.05 + y * 0.03);
            const radius = maxRadius * intensity * variation;

            if (radius > 0.3) {
              ctx.beginPath();
              ctx.arc(x, y, radius, 0, Math.PI * 2);
              ctx.fillStyle = dotColor;
              ctx.fill();
            }
          }
        }
      }
      animId = requestAnimationFrame(drawHalftone);
    };

    animId = requestAnimationFrame(drawHalftone);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Subtle 3D Tilt mousemove tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setTilt({
      x: -normY * 8,
      y: normX * 8,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
  };

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* Fluid Halftone Dot Matrix Canvas */}
      <div className="hero-blob" aria-hidden="true">
        <div className="hero-blob-inner">
          <canvas id="halftoneCanvas" ref={canvasRef} />
        </div>
      </div>

      {/* Vertical Wall Watermark */}
      <div className="hero-wall-name" aria-hidden="true">
        KUNAL KUMAR DAS <span>↓</span>
      </div>

      <div className="hero-main-content">
        {/* Left Column: Feathered Seamless Portrait & Social Dock */}
        <div className="hero-portrait-side">
          <div
            className="hero-portrait-container hero-animate"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                transform: tilt.active
                  ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
                  : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transition: tilt.active ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Kunal's portrait with multi-stop organic feathered mask */}
              <img
                src={portraitSrc}
                alt="Kunal Kumar Das"
                className="hero-portrait"
              />
            </div>
          </div>

          {/* Social Icons & Resume CTA Strip */}
          <div className="hero-socials hero-animate">
            <a
              href="https://github.com/Kunal06-tech-pixel"
              className="hero-social-icon"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub: Kunal06-tech-pixel"
            >
              <svg viewBox="0 0 98 96" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0112.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                />
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/kunaldas06"
              className="hero-social-icon"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn: kunaldas06"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            <a
              href="mailto:kunaldaskumar3@gmail.com"
              className="hero-social-icon"
              aria-label="Email"
              title="Email: kunaldaskumar3@gmail.com"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>

            <a
              href="tel:+918761941772"
              className="hero-social-icon"
              aria-label="Phone"
              title="Phone: +91 8761941772"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>

            <button
              onClick={onOpenSchedule}
              className="hero-social-icon"
              aria-label="Book a 30-minute call"
              title="Book a 30-minute call"
              style={{ background: 'transparent', cursor: 'pointer', color: 'inherit' }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </button>

            <button
              onClick={onOpenResume}
              id="resumeBtn"
              className="hero-btn"
              style={{
                marginLeft: '0.5rem',
                padding: '0.5rem 1.2rem',
                cursor: 'pointer',
              }}
            >
              Resume
            </button>
          </div>
        </div>

        {/* Right Column: Monumental Bebas Neue Typography & Editorial Bio */}
        <div className="hero-right-side">
          <h1 className="hero-name hero-animate">
            <span className="name-line">Kunal</span>
            <span className="name-line">Kumar Das</span>
          </h1>
          <p className="hero-intro hero-animate">
            <strong>Full-Stack Developer &amp; AI Engineer</strong> from <strong>Guwahati, India</strong> — building{' '}
            <strong>ATSMind AI</strong>, <strong>JARVIS voice assistant</strong>, and{' '}
            <strong>KeyWall vault</strong>. Specialized in <strong>voice-first AI pipelines</strong>,{' '}
            <strong>sentence embeddings</strong>, <strong>LLM tool calling</strong>, and{' '}
            <strong>high-performance React &amp; PostgreSQL systems</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};
export default Hero;
