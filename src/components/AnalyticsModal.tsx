import React from 'react';
import { LiveTrafficState } from '../hooks/useLiveTraffic';
import { useModalTransition } from '../utils/motion';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: LiveTrafficState;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({
  isOpen,
  onClose,
  telemetry,
}) => {
  const { shouldRender, isClosing } = useModalTransition(isOpen, 220);

  if (!shouldRender) return null;

  const isCalibrating = telemetry.totalViews === 0;

  return (
    <div className={`hire-modal-overlay active ${isClosing ? 'modal-exit' : ''}`} id="analyticsModal" onClick={onClose}>
      <div
        className={`hire-modal-content analytics-modal-content ${isClosing ? 'modal-exit' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Live Traffic Analytics"
      >
        <button
          className="hire-close-btn"
          id="closeAnalyticsModal"
          onClick={onClose}
          aria-label="Close Analytics"
        >
          &times;
        </button>

        <div className="analytics-header">
          <h2>Live Traffic</h2>
          <p>Powered by Upstash Redis &amp; Edge Network</p>
        </div>

        <div className="analytics-grid">
          <div className="analytics-card">
            <h3 className="analytics-title">TOTAL VIEWS</h3>
            <div className={`analytics-value ${isCalibrating ? 'skeleton-shimmer' : ''}`} id="modal-total-views" style={isCalibrating ? { minWidth: '80px', minHeight: '2rem' } : undefined}>
              {isCalibrating ? '' : telemetry.totalViews.toLocaleString()}
            </div>
          </div>
          <div className="analytics-card">
            <h3 className="analytics-title">UNIQUE VISITORS</h3>
            <div className={`analytics-value ${isCalibrating ? 'skeleton-shimmer' : ''}`} id="modal-unique-views" style={isCalibrating ? { minWidth: '80px', minHeight: '2rem' } : undefined}>
              {isCalibrating ? '' : telemetry.uniqueVisitors.toLocaleString()}
            </div>
          </div>
          <div className="analytics-card">
            <h3 className="analytics-title">LIVE NOW</h3>
            <div className={`analytics-value ${isCalibrating ? 'skeleton-shimmer' : ''}`} id="modal-active-visitors" style={isCalibrating ? { minWidth: '40px', minHeight: '2rem' } : undefined}>
              {isCalibrating ? '' : telemetry.onlineNow}
            </div>
          </div>
        </div>

        <div className="analytics-status">
          <span className="live-dot"></span>
          <span className="analytics-status-text">
            Real-time connection active // Latency: {telemetry.latencyMs}ms
          </span>
        </div>
      </div>
    </div>
  );
};
