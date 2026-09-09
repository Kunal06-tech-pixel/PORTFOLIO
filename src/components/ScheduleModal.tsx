import React, { useState } from 'react';
import { PROFILE } from '../data/profile';
import { useModalTransition } from '../utils/motion';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  const { shouldRender, isClosing } = useModalTransition(isOpen, 220);

  const [topic, setTopic] = useState('Full-Time Full-Stack / AI Engineering Role');
  const [slot, setSlot] = useState('Today (16:00 - 16:30 IST / 10:30 UTC)');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [dispatched, setDispatched] = useState(false);
  const [errors, setErrors] = useState<{ senderName?: string; senderEmail?: string }>({});

  if (!shouldRender) return null;

  const topics = [
    'Full-Time Full-Stack / AI Engineering Role',
    'AI Voice Assistant & Whisper Pipelines',
    'Semantic Similarity & ATS Resume Systems',
    'Full-Stack Web & PostgreSQL Architecture',
    'Technical Advisory or Collaboration'
  ];

  const slots = [
    'Today (16:00 - 16:30 IST / 10:30 UTC)',
    'Tomorrow (11:00 - 11:30 IST / 05:30 UTC)',
    'Tomorrow (17:30 - 18:00 IST / 12:00 UTC)',
    'Custom Time Window (Specify in notes)'
  ];

  const validateForm = () => {
    const newErrors: { senderName?: string; senderEmail?: string } = {};
    if (!senderName.trim()) {
      newErrors.senderName = 'Please enter your name or organization';
    }
    if (!senderEmail.trim()) {
      newErrors.senderEmail = 'Please provide a valid contact email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail.trim())) {
      newErrors.senderEmail = 'Please enter a properly formatted email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const subject = encodeURIComponent(`[Engineering Sync] ${topic} - ${senderName.trim()}`);
    const body = encodeURIComponent(`Hi Kunal,\n\nI would like to schedule a 30-min engineering call regarding: ${topic}.\n\nPreferred Slot: ${slot}\nMy Contact: ${senderEmail.trim()}\n\nAgenda / Notes:\n${notes.trim()}\n\nBest regards,\n${senderName.trim()}`);
    
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setDispatched(true);
    setTimeout(() => {
      setDispatched(false);
      onClose();
    }, 2500);
  };

  return (
    <div className={`modal-overlay active ${isClosing ? 'modal-exit' : ''}`} onClick={onClose}>
      <div className={`schedule-modal-dialog ${isClosing ? 'modal-exit' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-title-left">
            <span className="modal-tag">[CALENDAR]</span>
            <span className="modal-name">SCHEDULE TECHNICAL CALL // 30 MIN</span>
          </div>
          <button onClick={onClose} type="button" className="btn-dark close-btn">
            [ESC / CLOSE]
          </button>
        </div>

        <form onSubmit={handleSubmit} className="schedule-form-body">
          <div className="form-intro">
            <p>Book a direct 1-on-1 technical conversation with <strong>Kunal Kumar Das</strong> to discuss system design, roles, or AI engineering projects.</p>
          </div>

          <div className="form-group">
            <label className="form-label">01 // SELECT AGENDA TOPIC</label>
            <div className="topic-selector-grid">
              {topics.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`topic-btn ${topic === t ? 'active' : ''}`}
                >
                  <span className="topic-dot">{topic === t ? '●' : '○'}</span>
                  <span className="topic-name">{t}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">02 // SELECT PREFERRED WINDOW</label>
            <select 
              value={slot} 
              onChange={(e) => setSlot(e.target.value)}
              className="slot-dropdown"
            >
              {slots.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">03 // YOUR NAME</label>
              <input
                type="text"
                placeholder="e.g. Sarah Jenkins (Engineering Lead)"
                value={senderName}
                onChange={(e) => {
                  setSenderName(e.target.value);
                  if (errors.senderName) setErrors((prev) => ({ ...prev, senderName: undefined }));
                }}
                className={`form-input ${errors.senderName ? 'form-input-error' : ''}`}
                aria-invalid={Boolean(errors.senderName)}
              />
              {errors.senderName && <div className="form-error-msg">⚠ {errors.senderName}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">04 // YOUR WORK EMAIL</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={senderEmail}
                onChange={(e) => {
                  setSenderEmail(e.target.value);
                  if (errors.senderEmail) setErrors((prev) => ({ ...prev, senderEmail: undefined }));
                }}
                className={`form-input ${errors.senderEmail ? 'form-input-error' : ''}`}
                aria-invalid={Boolean(errors.senderEmail)}
              />
              {errors.senderEmail && <div className="form-error-msg">⚠ {errors.senderEmail}</div>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">05 // BRIEF BRIEFING / AGENDA NOTES</label>
            <textarea
              rows={3}
              placeholder="Tell me about the role, project, or technical question..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-textarea"
            />
          </div>

          <div className="form-footer-actions">
            <button type="submit" className="btn-primary dispatch-btn">
              {dispatched ? 'CALENDAR REQUEST DISPATCHED!' : 'DISPATCH CALENDAR INVITE ↗'}
            </button>
            <span className="dispatch-note">
              Direct dispatch to kunaldaskumar3@gmail.com
            </span>
          </div>
        </form>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .schedule-modal-dialog {
          background-color: var(--bg-canvas);
          border: 1px solid var(--accent-green);
          width: 100%;
          max-width: 680px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 16px 48px rgba(0,0,0,0.9);
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 18px;
          background-color: #171a18;
          border-bottom: 1px solid var(--border-graphite);
        }
        .modal-title-left {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
        }
        .modal-tag {
          color: var(--accent-green);
          font-weight: 700;
        }
        .modal-name {
          color: var(--text-primary);
        }
        .close-btn {
          font-size: 10px;
          padding: 4px 8px;
        }
        .schedule-form-body {
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-intro {
          font-size: 12.5px;
          color: var(--text-secondary);
          line-height: 1.5;
          border-left: 2px solid var(--accent-green);
          padding-left: 12px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-label {
          font-size: 10px;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .topic-selector-grid {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .topic-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          background-color: #151515;
          border: 1px solid var(--border-graphite);
          color: var(--text-secondary);
          font-size: 12px;
          text-align: left;
        }
        .topic-btn:hover {
          border-color: var(--accent-green-border);
          color: #fff;
        }
        .topic-btn.active {
          border-color: var(--accent-green);
          background-color: rgba(74, 222, 128, 0.08);
          color: var(--text-primary);
        }
        .topic-dot {
          color: var(--accent-green);
        }
        .slot-dropdown, .form-input, .form-textarea {
          background-color: #151515;
          border: 1px solid var(--border-graphite);
          color: var(--text-primary);
          padding: 10px 14px;
          font-family: var(--font-mono);
          font-size: 12.5px;
          outline: none;
        }
        .slot-dropdown:focus, .form-input:focus, .form-textarea:focus {
          border-color: var(--accent-green);
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .form-footer-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 12px;
        }
        .dispatch-btn {
          padding: 12px 24px;
          font-size: 12px;
        }
        .dispatch-note {
          font-size: 10px;
          color: var(--text-muted);
        }
        @media (max-width: 600px) {
          .schedule-form-body {
            padding: 16px;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
