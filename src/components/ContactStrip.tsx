import React from 'react';
import { PROFILE } from '../data/profile';

interface ContactStripProps {
  onOpenSchedule: () => void;
  onOpenResume: () => void;
  viewsCount: number;
}

export const ContactStrip: React.FC<ContactStripProps> = ({
  onOpenSchedule,
  onOpenResume,
  viewsCount,
}) => {
  const visitorTotal = (viewsCount + 39112).toLocaleString();

  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <div className="contact-grid">
          <div className="contact-left">
            <h3 className="contact-heading reveal visible">
              WHAT IF WE WORKED <strong>TOGETHER ?</strong>
            </h3>
            <p className="contact-paragraph reveal visible">
              That's it, you've reached the end of my portfolio. <strong>Thanks for visiting :)</strong><br />
              If you enjoyed the journey, let's make the sequel together.<br />
              You're the <span id="contact-visitor-count">{visitorTotal}</span>
              <span id="contact-visitor-suffix">th</span> visitor.
            </p>
          </div>

          <div className="contact-right">
            <div className="contact-socials reveal visible">
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn: kunaldas06"
              >
                Linkedin
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub: Kunal06-tech-pixel"
              >
                Github
              </a>
              <a
                href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                title={`Phone: ${PROFILE.phone}`}
              >
                Phone
              </a>
              <button
                onClick={onOpenResume}
                id="contactResumeBtn"
                type="button"
              >
                Resume ↗
              </button>
            </div>
          </div>
        </div>

        <div className="contact-cta">
          <button
            className="contact-call-link reveal visible"
            onClick={onOpenSchedule}
            type="button"
          >
            <span className="contact-call-text">Schedule a call</span>
            <span className="contact-call-mark" aria-hidden="true">
              ↗
            </span>
          </button>
          <div className="contact-email-row reveal visible">
            <a
              href={`mailto:${PROFILE.email}`}
              className="contact-email"
            >
              {PROFILE.email}
            </a>
          </div>
        </div>

        <div className="contact-giant">GETINTOUCH!</div>
      </div>
      <span className="contact-edition">2026 &copy; EDITION</span>
    </section>
  );
};
