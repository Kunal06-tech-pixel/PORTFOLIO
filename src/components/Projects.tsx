import React, { useState, useEffect } from 'react';
import { GithubHeatmap } from './GithubHeatmap';
import { VideoPlayer } from './VideoPlayer';
import { PROJECTS, ProjectCaseStudy } from '../data/projects';

export const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Sync scroll lock when an item expands
  useEffect(() => {
    if (expandedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [expandedId]);

  return (
    <>
      <section className="works" id="projects">
        <div className="works-hero">
          <h2 className="works-header reveal visible">WORKS</h2>
          <GithubHeatmap />
        </div>

        <div className="works-list">
          {PROJECTS.map((work: ProjectCaseStudy, idx: number) => {
            const isExpanded = expandedId === work.id;
            const repoSlug = work.githubUrl.replace('https://github.com/', '');

            return (
              <div
                key={work.id}
                className={`work-item reveal visible ${isExpanded ? 'expanded' : ''}`}
                data-preview={idx + 1}
                data-github-repo={repoSlug}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (
                    target.closest('a') ||
                    target.closest('.video-player') ||
                    target.closest('.video-controls')
                  ) {
                    return;
                  }
                  if (!isExpanded) {
                    setExpandedId(work.id);
                  }
                }}
              >
                {/* Close Button (visible when expanded) */}
                <button
                  className="modal-close"
                  aria-label="Close Project"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedId(null);
                  }}
                >
                  &times;
                </button>

                {/* Work Header Bar */}
                <div className="work-header">
                  <span className="work-name">{work.name}</span>
                  <span className="work-tech">
                    {work.subtitle}
                  </span>
                  <span className="work-status">{work.status}</span>
                </div>

                {/* Work Details & Interactive Visualizer Drawer */}
                <div className="work-details">
                  <div className="work-desc">
                    {work.sections.map((sec) => (
                      <div key={sec.num} className="project-section">
                        <h4>
                          {sec.num}
                          <br />
                          {sec.title}
                        </h4>

                        {sec.content.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>
                    ))}

                    {/* Architecture Flow */}
                    {work.infoFlow && (
                      <div className="project-section">
                        <h4>
                          05
                          <br />
                          SYSTEM PIPELINE
                        </h4>
                        <div className="info-flow">
                          <div className="info-box">{work.infoFlow.box1}</div>
                          <div className="info-arrow">↔</div>
                          <div className="info-box">{work.infoFlow.box2}</div>
                          <div className="info-arrow">↔</div>
                          <div className="info-box">{work.infoFlow.box3}</div>
                        </div>
                      </div>
                    )}

                    {/* Verbatim Resume Highlights */}
                    <div className="project-section">
                      <h4>
                        06
                        <br />
                        RESUME SPECIFICATIONS
                      </h4>
                      <ul style={{ paddingLeft: '1.2rem', margin: '0.5rem 0' }}>
                        {work.bullets.map((b, bIdx) => (
                          <li key={bIdx} style={{ marginBottom: '0.4rem' }}>{b}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="project-section">
                      <h4>
                        07
                        <br />
                        TECH STACK
                      </h4>
                      <div className="tech-tags">
                        {work.tags.map((item) => (
                          <span key={item} className="tech-tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Work Action Links */}
                    <div className="work-links">
                      {work.liveDemoUrl && (
                        <a
                          href={work.liveDemoUrl}
                          className="work-btn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Demo
                        </a>
                      )}
                      <a
                        href={work.githubUrl}
                        className="work-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Source Code
                      </a>
                    </div>
                  </div>

                  {/* High-Fidelity Generative Video Player Simulation */}
                  <VideoPlayer title={work.name} type={work.playerType} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Global Backdrop for Expanded Project Modal */}
      <div
        id="modal-backdrop"
        className={expandedId ? 'active' : ''}
        onClick={() => setExpandedId(null)}
      />
    </>
  );
};
