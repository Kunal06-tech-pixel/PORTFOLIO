import React, { useState, useEffect } from 'react';
import soundManager from '../lib/sound';

interface TopHUDProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  viewsCount: number;
  onOpenAnalytics: () => void;
  onOpenHireModal: () => void;
}

export const TopHUD: React.FC<TopHUDProps> = ({
  theme,
  onToggleTheme,
  viewsCount,
  onOpenAnalytics,
  onOpenHireModal,
}) => {
  const [isMuted, setIsMuted] = useState(() => soundManager.getIsMuted());

  useEffect(() => {
    return soundManager.subscribe((muted) => setIsMuted(muted));
  }, []);

  const handleToggleSound = () => {
    soundManager.toggleMute();
  };
  return (
    <>
      {/* Top Left Status Bar */}
      <div className="top-left-status">
        <button
          className="status-theme-btn"
          id="themeToggle2"
          onClick={onToggleTheme}
          aria-label="Toggle Theme"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
        <button
          className={`status-sound-btn ${isMuted ? 'muted' : 'active'}`}
          id="soundToggle"
          onClick={handleToggleSound}
          aria-label={isMuted ? 'Unmute transition audio' : 'Mute transition audio'}
          title={isMuted ? 'Sound: Muted (Click to enable transition sounds)' : 'Sound: Active (Click to mute)'}
        >
          {isMuted ? (
            <svg className="icon-sound" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg className="icon-sound" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" className="sound-wave wave-1" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" className="sound-wave wave-2" />
            </svg>
          )}
        </button>
        <div className="status-info">
          <div className="status-location">GUWAHATI, IN</div>
          <button
            className="status-views"
            id="openAnalyticsModal"
            onClick={onOpenAnalytics}
            aria-label="Open Analytics"
          >
            <span id="top-view-count">{(viewsCount || 39114).toLocaleString()}</span> VIEWS
          </button>
        </div>
      </div>

      {/* Top Right Hire Me / Open to Work Fixed Pill Button */}
      <button
        className="top-hire-btn"
        id="openHireModal"
        onClick={onOpenHireModal}
        aria-label="Open to work"
      >
        <span className="status-dot" /> OPEN TO WORK
      </button>
    </>
  );
};
