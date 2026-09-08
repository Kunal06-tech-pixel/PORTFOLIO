import React, { useState, useEffect, useRef } from 'react';

interface VideoPlayerProps {
  title: string;
  type: 'jarvis' | 'atsmind' | 'keywall';
  videoSrc?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ title, type }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(25);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // High-fidelity generative visual demonstration simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let tick = 0;

    const render = () => {
      if (isPlaying) {
        tick += 1;
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.15));
      }

      const w = canvas.width;
      const h = canvas.height;

      // Dark background
      ctx.fillStyle = '#0a0c0b';
      ctx.fillRect(0, 0, w, h);

      // Subtle grid
      ctx.strokeStyle = '#181c19';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (type === 'jarvis') {
        // Voice Spectrogram & Waveform
        ctx.strokeStyle = '#4ADE80';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const slice = w / 64;
        for (let i = 0; i < 64; i++) {
          const v = Math.sin((i * 0.2) + (tick * 0.05)) * Math.cos(i * 0.1 + tick * 0.03);
          const amp = isPlaying ? v * 60 : 5;
          const y = h / 2 + amp;
          if (i === 0) ctx.moveTo(i * slice, y);
          else ctx.lineTo(i * slice, y);
        }
        ctx.stroke();

        // Audio HUD
        ctx.fillStyle = '#4ADE80';
        ctx.font = '11px "Space Mono", monospace';
        ctx.fillText(`[WHISPER STT INGESTION] STREAM_CHUNK_${Math.floor(tick / 10)} // GROQ LLM INFERENCE`, 20, 30);
        ctx.fillText(`LATENCY: 412ms | VAD: ACTIVE_VOICE | BUFFER: 16kHz`, 20, h - 25);
      } else if (type === 'atsmind') {
        // Semantic Vector Clusters
        ctx.fillStyle = 'rgba(74, 222, 128, 0.4)';
        const points = 40;
        for (let i = 0; i < points; i++) {
          const px = (w / 2) + Math.cos(i + tick * 0.02) * (100 + (i % 5) * 20);
          const py = (h / 2) + Math.sin(i * 1.5 + tick * 0.02) * (60 + (i % 3) * 20);
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();

          // Connect nearby points
          ctx.strokeStyle = 'rgba(74, 222, 128, 0.08)';
          ctx.beginPath();
          ctx.moveTo(w / 2, h / 2);
          ctx.lineTo(px, py);
          ctx.stroke();
        }

        ctx.fillStyle = '#4ADE80';
        ctx.font = '11px "Space Mono", monospace';
        ctx.fillText(`[COSINE SIMILARITY ENGINE] EMBEDDINGS: 384-DIMENSIONAL SPACE`, 20, 30);
        ctx.fillText(`MATCH_SCORE: 94.8% | DETERMINISTIC MATRIX: VERIFIED`, 20, h - 25);
      } else {
        // KeyWall Cipher Matrix
        ctx.fillStyle = '#3F9F73';
        ctx.font = '10px "Space Mono", monospace';
        const hex = ['0x4A', '0xDE', '0x80', '0x12', '0xFE', '0x0A', '0x99', '0xC3'];
        for (let r = 0; r < 7; r++) {
          let line = '';
          for (let c = 0; c < 12; c++) {
            line += hex[(r + c + Math.floor(tick / 15)) % hex.length] + ' ';
          }
          ctx.fillText(line, 25, 60 + r * 22);
        }

        ctx.fillStyle = '#4ADE80';
        ctx.fillText(`[AES-GCM-256 ZERO-KNOWLEDGE] PBKDF2: 310,000 ROUNDS`, 20, 30);
        ctx.fillText(`PLAINTEXT EXPOSURE: 0 BYTES | CLOUDFLARE EDGE: BOM1`, 20, h - 25);
      }

      animFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrame);
  }, [isPlaying, type]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  return (
    <div className="video-player" ref={containerRef}>
      <div className="video-viewport">
        <canvas
          ref={canvasRef}
          width={640}
          height={280}
          className="work-detail-canvas"
        />
        <div className="player-overlay-tag">
          <span className="pulse-dot"></span>
          <span>LIVE ARCHITECTURE DEMONSTRATION // {title}</span>
        </div>
      </div>

      <div className="video-controls">
        <button
          className="video-ctrl-btn"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        <div
          className="video-progress-wrap"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            setProgress(clickPos * 100);
          }}
        >
          <div className="video-progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <button
          className="video-ctrl-btn"
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8.3v1.5a3 3 0 0 1 0 4.4v1.5a4.5 4.5 0 0 0 2.5-3.7z"/>
              <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2"/>
              <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8.3v7.4a4.5 4.5 0 0 0 2.5-3.7zM14 3.2v2a7 7 0 0 1 0 13.6v2a9 9 0 0 0 0-17.6z"/>
            </svg>
          )}
        </button>

        <button
          className="video-ctrl-btn"
          onClick={toggleFullscreen}
          aria-label="Fullscreen"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        </button>
      </div>

      <style>{`
        .video-player {
          background-color: #0d0f0e;
          border: 1px solid var(--border-graphite);
          display: flex;
          flex-direction: column;
          margin-top: 20px;
          margin-bottom: 24px;
        }
        .video-viewport {
          position: relative;
          width: 100%;
          background: #000;
          display: flex;
          overflow: hidden;
        }
        .work-detail-canvas {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 7.5;
          display: block;
        }
        .player-overlay-tag {
          position: absolute;
          top: 12px;
          left: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 0.08em;
          color: var(--accent-green);
          background: rgba(10, 12, 11, 0.75);
          padding: 3px 8px;
          border: 1px solid var(--border-graphite);
        }
        .video-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 14px;
          background: #141715;
          border-top: 1px solid var(--border-graphite);
        }
        .video-ctrl-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 4px;
        }
        .video-ctrl-btn:hover {
          color: var(--accent-green);
        }
        .video-progress-wrap {
          flex: 1;
          height: 5px;
          background: #222724;
          cursor: pointer;
          position: relative;
        }
        .video-progress-bar {
          height: 100%;
          background: var(--accent-green);
          box-shadow: 0 0 6px var(--accent-green);
        }
      `}</style>
    </div>
  );
};
