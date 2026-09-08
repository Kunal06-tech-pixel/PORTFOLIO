import React, { useState, useEffect } from 'react';
import { useLiveTraffic } from './hooks/useLiveTraffic';
import { ShutterSystem } from './components/ShutterSystem';
import { TopHUD } from './components/TopHUD';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ContactStrip } from './components/ContactStrip';
import { BottomDock } from './components/BottomDock';
import { ResumeModal } from './components/ResumeModal';
import { ScheduleModal } from './components/ScheduleModal';
import { HireModal } from './components/HireModal';
import { AnalyticsModal } from './components/AnalyticsModal';

export const App: React.FC = () => {
  const telemetry = useLiveTraffic();

  // Modals state
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  // Theme state: default dark, persisted in localStorage
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Keyboard shortcut listener (ESC closes all modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsResumeOpen(false);
        setIsScheduleOpen(false);
        setIsHireOpen(false);
        setIsAnalyticsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Mechanical Shutter Security Splash Screen */}
      <ShutterSystem />

      {/* Top HUD Bar with Theme Toggle, Location, Views Analytics & Open to Work */}
      <TopHUD
        theme={theme}
        onToggleTheme={toggleTheme}
        viewsCount={telemetry.totalViews}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenHireModal={() => setIsHireOpen(true)}
      />

      {/* Split Two-Column Hero with Halftone Canvas, Feathered Portrait, Socials, Name & Bio */}
      <Hero
        onOpenSchedule={() => setIsScheduleOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <main>

        {/* Featured Works Case Studies with GitHub Heatmap, Interactive Visualizer & Expandable Drawers */}
        <Projects />

        {/* Work History (SynthWeb Intern) & Academic Foundation (GCU MCA/BCA) */}
        <Experience />

        {/* "MY STACK" 4 Alternating 2-Column Rows with Official Devicon SVGs */}
        <SkillsMatrix />

      </main>

      {/* Closing Contact Strip with Visitor Count Badge, Giant GETINTOUCH! Watermark, & Copyright */}
      <ContactStrip
        onOpenSchedule={() => setIsScheduleOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        viewsCount={telemetry.totalViews}
      />

      {/* Floating Bottom Glass Navigation Dock */}
      <BottomDock />

      {/* Monospace Interactive Printable Resume Dossier Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Schedule a Call Modal with Topic Selection & Email Dispatch */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />

      {/* Dedicated "Hire Me" Modal */}
      <HireModal
        isOpen={isHireOpen}
        onClose={() => setIsHireOpen(false)}
        onOpenSchedule={() => {
          setIsHireOpen(false);
          setIsScheduleOpen(true);
        }}
      />

      {/* Live Traffic Analytics Modal */}
      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        telemetry={telemetry}
      />
    </>
  );
};

export default App;
