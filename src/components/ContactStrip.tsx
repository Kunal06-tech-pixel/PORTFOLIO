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
          <div className="contact-left" data-reveal="fade-up">
            <div className="curtain-wrapper" data-reveal="curtain">
              <h3 className="contact-heading curtain-inner">
                WHAT IF WE WORKED <strong>TOGETHER ?</strong>
              </h3>
            </div>
            <p className="contact-paragraph">
              That's it, you've reached the end of my portfolio. <strong>Thanks for visiting :)</strong><br />
              If you enjoyed the journey, let's make the sequel together.<br />
              You're the <span id="contact-visitor-count">{visitorTotal}</span>
              <span id="contact-visitor-suffix">th</span> visitor.
            </p>
          </div>

          <div className="contact-right">
            <div className="contact-socials" data-reveal="cascade">
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn: kunaldas06"
                data-reveal-child
              >
                Linkedin
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub: Kunal06-tech-pixel"
                data-reveal-child
              >
                Github
              </a>
              <a
                href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                title={`Phone: ${PROFILE.phone}`}
                data-reveal-child
              >
                Phone
              </a>
              <button
                onClick={onOpenResume}
                id="contactResumeBtn"
                type="button"
                data-reveal-child
              >
                Resume ↗
              </button>
            </div>
          </div>
        </div>

        <div className="contact-cta" data-reveal="pop" data-reveal-delay="100">
          <button
            className="contact-call-link"
            onClick={onOpenSchedule}
            type="button"
          >
            <span className="contact-call-text">Schedule a call</span>
            <span className="contact-call-mark" aria-hidden="true">
              ↗
            </span>
          </button>
          <div className="contact-email-row">
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
