import React from 'react';
import { PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { useModalTransition } from '../utils/motion';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { shouldRender, isClosing } = useModalTransition(isOpen, 220);

  if (!shouldRender) return null;

  return (
    <div
      id="resumeModal"
      className={`modal active ${isClosing ? 'modal-exit' : ''}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Resume Modal"
    >
      <div className={`modal-content ${isClosing ? 'modal-exit' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="terminal-dots">
            <span className="dot close" onClick={onClose} style={{ cursor: 'pointer' }}></span>
            <span className="dot minimize"></span>
            <span className="dot maximize"></span>
          </div>

          <h2 className="modal-title">OFFICIAL RESUME</h2>

          <div className="modal-actions">
            <button
              className="modal-download-btn"
              onClick={() => window.print()}
              style={{ cursor: 'pointer' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>PRINT / SAVE</span>
            </button>

            <button
              className="modal-close"
              id="closeModal"
              onClick={onClose}
              aria-label="Close Resume"
            >
              &times;
            </button>
          </div>
        </div>

        <div
          className="modal-body"
          style={{
            overflowY: 'auto',
            padding: '2.5rem',
            fontFamily: 'var(--font-mono, "Space Mono", monospace)',
            color: 'var(--text-main, #ffffff)',
            lineHeight: 1.6,
          }}
        >
          {/* Authentic Resume Document */}
          <div style={{ maxWidth: '820px', margin: '0 auto', background: '#0d0f0e', padding: '2rem', border: '1px solid #27272a' }}>
            {/* Header */}
            <div style={{ borderBottom: '2px solid #3f3f46', paddingBottom: '1.25rem', marginBottom: '1.75rem', textAlign: 'center' }}>
              <h1 style={{ fontFamily: 'var(--font-heading, "Bebas Neue", sans-serif)', fontSize: '2.8rem', margin: '0 0 0.5rem 0', letterSpacing: '2px', color: '#ffffff' }}>
                KUNAL KUMAR DAS
              </h1>
              <div style={{ fontSize: '0.85rem', color: '#a1a1aa', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span>{PROFILE.phone}</span>
                <span>|</span>
                <a href={`mailto:${PROFILE.email}`} style={{ color: '#4ade80', textDecoration: 'none' }}>{PROFILE.email}</a>
                <span>|</span>
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80', textDecoration: 'none' }}>linkedin.com/in/kunaldas06</a>
                <span>|</span>
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80', textDecoration: 'none' }}>github.com/Kunal06-tech-pixel</a>
              </div>
            </div>

            {/* Experience */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontSize: '1rem', letterSpacing: '1px', borderBottom: '1px solid #3f3f46', paddingBottom: '0.3rem', color: '#4ade80', marginBottom: '0.75rem' }}>
                EXPERIENCE
              </h3>
              {PROFILE.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: '1rem', color: '#ffffff' }}>{exp.company}</strong>
                    <span style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>{exp.period}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.88rem', fontStyle: 'italic', color: '#86efac' }}>{exp.role}</span>
                    <span style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>{exp.locationType}, {exp.location.replace(', India', '')}</span>
                  </div>
                  <ul style={{ margin: '0', paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#d4d4d8' }}>
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} style={{ marginBottom: '0.35rem' }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontSize: '1rem', letterSpacing: '1px', borderBottom: '1px solid #3f3f46', paddingBottom: '0.3rem', color: '#4ade80', marginBottom: '0.75rem' }}>
                PROJECTS
              </h3>
              {PROJECTS.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                    <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>{proj.title}</strong>
                    <div style={{ fontSize: '0.82rem', display: 'flex', gap: '8px' }}>
                      <a href={proj.liveDemoUrl || proj.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80', textDecoration: 'none' }}>Live Demo</a>
                      <span style={{ color: '#71717a' }}>|</span>
                      <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80', textDecoration: 'none' }}>GitHub</a>
                    </div>
                  </div>
                  <ul style={{ margin: '0', paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#d4d4d8' }}>
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx} style={{ marginBottom: '0.35rem' }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Technical Skills */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontSize: '1rem', letterSpacing: '1px', borderBottom: '1px solid #3f3f46', paddingBottom: '0.3rem', color: '#4ade80', marginBottom: '0.75rem' }}>
                TECHNICAL SKILLS
              </h3>
              <div style={{ fontSize: '0.82rem', color: '#d4d4d8', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {PROFILE.skills.map((s, i) => (
                  <div key={i}>
                    <strong style={{ color: '#ffffff' }}>{s.category}:</strong> {s.items.join(', ')}
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 style={{ fontSize: '1rem', letterSpacing: '1px', borderBottom: '1px solid #3f3f46', paddingBottom: '0.3rem', color: '#4ade80', marginBottom: '0.75rem' }}>
                EDUCATION
              </h3>
              {PROFILE.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: '0.92rem', color: '#ffffff' }}>{edu.institution}</strong>
                    <span style={{ fontSize: '0.82rem', color: '#a1a1aa' }}>{edu.location}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.82rem', color: '#d4d4d8' }}>{edu.degree}; <strong>{edu.cgpa}</strong></span>
                    <span style={{ fontSize: '0.82rem', color: '#a1a1aa' }}>{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
