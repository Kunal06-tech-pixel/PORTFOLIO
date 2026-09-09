import React, { useEffect, useRef } from 'react';
import { PROFILE } from '../data/profile';
import anime from 'animejs';
import { useModalTransition, EASINGS } from '../utils/motion';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSchedule: () => void;
}

export const HireModal: React.FC<HireModalProps> = ({
  isOpen,
  onClose,
  onOpenSchedule,
}) => {
  const { shouldRender, isClosing } = useModalTransition(isOpen, 220);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current && !isClosing) {
      anime({
        targets: contentRef.current,
        scale: [0.94, 1],
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 320,
        easing: EASINGS.springSnappy,
      });
    }
  }, [isOpen, isClosing]);

  if (!shouldRender) return null;

  return (
    <div className={`hire-modal-overlay active ${isClosing ? 'modal-exit' : ''}`} id="hireModal" onClick={onClose}>
      <div
        ref={contentRef}
        className={`hire-modal-content ${isClosing ? 'modal-exit' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="hire-close-btn" id="closeHireModal" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        <div className="hire-right">
          <h2>
            Hire me to bring your<br />ideas to life!
          </h2>
          <p>Feel free to reach out!</p>
          <div className="hire-actions">
            {/* Gmail */}
            <a
              href={`mailto:${PROFILE.email}`}
              className="hire-action-icon"
              aria-label="Gmail"
              title={`Send an email: ${PROFILE.email}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={PROFILE.linkedin}
              className="hire-action-icon"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn profile"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* Phone */}
            <a
              href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
              className="hire-action-icon"
              aria-label="Phone"
              title={`Call / WhatsApp: ${PROFILE.phone}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href={PROFILE.github}
              className="hire-action-icon"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub profile"
            >
              <svg viewBox="0 0 98 96" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0112.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                />
              </svg>
            </a>
          </div>

          <button
            className="hire-call-link"
            onClick={() => {
              onClose();
              onOpenSchedule();
            }}
          >
            <span>Schedule a call</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </div>
  );
};
