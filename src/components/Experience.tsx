import React from 'react';
import { PROFILE } from '../data/profile';

export const Experience: React.FC = () => {
  return (
    <section className="experience-section" id="experience">
      <div className="section-head-bar" data-reveal="fade-up">
        <div className="section-title-wrap">
          <span className="section-index">03 //</span>
          <div className="curtain-wrapper" data-reveal="curtain">
            <h2 className="section-title curtain-inner">EXPERIENCE &amp; EDUCATION</h2>
          </div>
        </div>
        <div className="section-annotation">
          [CAREER TIMELINE // ACADEMIC RECORD]
        </div>
      </div>
      <div
        data-reveal="line"
        className="reveal-hairline"
        style={{
          height: '1px',
          background: 'var(--border-line)',
          width: '100%',
          margin: '0.5rem 0 1.5rem',
        }}
      />

      <div className="exp-edu-grid">
        {/* Experience Column */}
        <div className="timeline-column" data-reveal="blur-focus">
          <div className="column-header">
            <span className="col-tag">WORK HISTORY</span>
            <span className="col-sub">[ENGINEERING ROLES]</span>
          </div>

          <div className="timeline-items">
            {PROFILE.experience.map((exp, idx) => (
              <div key={idx} data-reveal-child className="timeline-card">
                <div className="card-period-bar">
                  <span className="period-badge">{exp.period}</span>
                  <span className="type-badge">{exp.locationType}</span>
                </div>

                <h3 className="role-title">{exp.role}</h3>
                <div className="company-line">
                  <span className="company-name">{exp.company}</span>
                  <span className="company-sep">//</span>
                  <span className="company-loc">{exp.location}</span>
                </div>

                <ul className="exp-highlights-list">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="exp-bullet">
                      <span className="bullet-sym">&gt;</span>
                      <span className="bullet-text">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div className="timeline-column" data-reveal="blur-focus" data-reveal-delay="80">
          <div className="column-header">
            <span className="col-tag">ACADEMIC FOUNDATION</span>
            <span className="col-sub">[DEGREE PROGRAMS]</span>
          </div>

          <div className="timeline-items">
            {PROFILE.education.map((edu, idx) => (
              <div key={idx} data-reveal-child className="timeline-card edu-card">
                <div className="card-period-bar">
                  <span className="period-badge">{edu.period}</span>
                  <span className="grade-badge">{edu.cgpa}</span>
                </div>

                <h3 className="role-title">{edu.degree}</h3>
                <div className="company-line">
                  <span className="company-name">{edu.institution}</span>
                  <span className="company-sep">//</span>
                  <span className="company-loc">{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .experience-section {
          margin-bottom: 56px;
          padding: 0 1.5rem;
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
        }
        .section-head-bar {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          border-bottom: 2px solid var(--border-graphite, #2a2a2a);
          padding-bottom: 12px;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .section-title-wrap {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }
        .section-index {
          font-family: var(--font-display, "Space Mono", monospace);
          font-size: 24px;
          color: var(--accent-green, #4ade80);
        }
        .section-title {
          font-size: clamp(28px, 5vw, 44px);
          font-family: var(--font-heading, "Bebas Neue", sans-serif);
          color: var(--text-primary, #ffffff);
          letter-spacing: 0.03em;
          margin: 0;
        }
        .section-annotation {
          font-family: var(--font-mono, "Space Mono", monospace);
          font-size: 11px;
          color: var(--text-muted, #888888);
          letter-spacing: 0.08em;
        }
        .exp-edu-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 24px;
        }
        @media (max-width: 900px) {
          .exp-edu-grid {
            grid-template-columns: 1fr;
          }
        }
        .timeline-column {
          display: flex;
          flex-direction: column;
        }
        .column-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background-color: #171717;
          border: 1px solid var(--border-graphite, #2a2a2a);
          margin-bottom: 16px;
          font-family: var(--font-mono, "Space Mono", monospace);
          font-size: 11px;
        }
        .col-tag {
          color: var(--accent-green, #4ade80);
          font-weight: 700;
          letter-spacing: 0.08em;
        }
        .col-sub {
          color: var(--text-muted, #888888);
          font-size: 10px;
        }
        .timeline-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .timeline-card {
          padding: 20px;
          background-color: rgba(20, 20, 20, 0.6);
          border: 1px solid var(--border-graphite, #2a2a2a);
          border-left: 3px solid var(--accent-green, #4ade80);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .timeline-card:hover {
          border-color: var(--accent-green, #4ade80);
          transform: translateY(-2px);
        }
        .edu-card {
          border-left-color: #3b82f6;
        }
        .card-period-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .period-badge {
          font-family: var(--font-mono, "Space Mono", monospace);
          font-size: 11px;
          color: var(--text-muted, #888888);
        }
        .type-badge, .grade-badge {
          font-family: var(--font-mono, "Space Mono", monospace);
          font-size: 10px;
          padding: 2px 8px;
          background: rgba(74, 222, 128, 0.1);
          color: var(--accent-green, #4ade80);
          border: 1px solid rgba(74, 222, 128, 0.3);
          border-radius: 2px;
        }
        .grade-badge {
          background: rgba(59, 130, 246, 0.1);
          color: #60a5fa;
          border-color: rgba(59, 130, 246, 0.3);
        }
        .role-title {
          font-family: var(--font-heading, "Bebas Neue", sans-serif);
          font-size: 20px;
          letter-spacing: 0.5px;
          color: #ffffff;
          margin: 0 0 6px 0;
        }
        .company-line {
          font-family: var(--font-mono, "Space Mono", monospace);
          font-size: 12px;
          color: #bbbbbb;
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        .company-name {
          color: var(--accent-green, #4ade80);
          font-weight: 600;
        }
        .exp-highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .exp-bullet {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 12px;
          line-height: 1.5;
          color: #cccccc;
          font-family: var(--font-mono, "Space Mono", monospace);
        }
        .bullet-sym {
          color: var(--accent-green, #4ade80);
          font-weight: bold;
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
};
