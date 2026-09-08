# Kunal Kumar Das — Full-Stack Developer & AI Engineer

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Anime.js](https://img.shields.io/badge/Anime.js-3.2.2-FF4B4B?style=flat)](https://animejs.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A dark-mode, editorial, monospace-heavy technical portfolio designed for **Kunal Kumar Das**, Full-Stack Developer and AI Engineer based in Guwahati, India. Built with a focus on tactile interaction design, industrial brutalist aesthetics, and verified production achievements.

---

## Key Features

- **Industrial Security Shutter Intro**: Authentic roll-up slat mechanism with Bebas Neue staggered typography, smooth auto-lift sequence, and click-to-skip controls.
- **Generative Halftone Canvas**: Mathematical real-time fluid dot-matrix undulation on HTML5 Canvas adapting dynamically to dark/light theme tokens.
- **Feathered Pixel Art Portrait**: Artifact-free transparent portrait cutout with vertical alpha gradient dissolve into the viewport.
- **Featured Projects Showcase**:
  - **JARVIS — AI Voice Assistant & Productivity Suite**: Natural-language voice pipeline (OpenAI Whisper, Groq LLM tool calling, Socket.IO, Redis, BullMQ, PostgreSQL, Prisma).
  - **ATSMind AI — AI Resume Analyzer & ATS Platform**: Semantic similarity engine using local sentence embeddings and cosine similarity with explainable ATS scores.
  - **KeyWall — Secure Sensitive Data Vault**: Encrypted category-based secret manager for credentials, notes, and payment cards.
- **Live GitHub Heatmap**: Real-time interactive contribution grid visualizer.
- **Interactive Modals**:
  - **Official Resume Dossier**: Monospace printable/saveable resume viewable directly in-browser.
  - **Schedule a Call**: Interactive topic selection and calendar booking modal.
  - **Live Traffic Telemetry**: Session visitor metrics and analytics viewer.
  - **Dedicated Hire Me Flow**: Direct contract inquiry drawer.
- **Full-Bleed Contact Section**: Towering `GETINTOUCH!` watermark in architectural Bebas Neue, direct email copy, and floating glass dock navigation.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, CSS Modules / Vanilla CSS |
| **Animation** | Anime.js, CSS Hardware-Accelerated 3D Transforms |
| **Typography** | Bebas Neue, Share Tech Mono, Space Mono |
| **Data & Specs** | Fully grounded in 1-page authoritative resume |

---

## Project Structure

```
PO/
├── public/
│   ├── kunal-portrait-transparent.webp # Feathered transparent portrait
│   └── kunal-pixel-avatar.jpg       # Profile assets
├── src/
│   ├── components/
│   │   ├── AnalyticsModal.tsx        # Live traffic telemetry modal
│   │   ├── BottomDock.tsx            # Floating glass navigation dock
│   │   ├── ContactStrip.tsx          # Full-bleed warm ivory contact section
│   │   ├── Experience.tsx            # Work history & GCU education
│   │   ├── GithubHeatmap.tsx         # Interactive activity heatmap
│   │   ├── Hero.tsx                  # Split hero with halftone canvas & portrait
│   │   ├── HireModal.tsx             # Hire me contact modal
│   │   ├── Projects.tsx              # Featured works & drawer specifications
│   │   ├── ResumeModal.tsx           # Printable monospace resume modal
│   │   ├── ScheduleModal.tsx         # Call scheduling drawer
│   │   ├── ShutterSystem.tsx         # Roll-up security shutter intro
│   │   ├── SkillsMatrix.tsx          # 8 verified skill categories
│   │   ├── TopHUD.tsx                # Status bar & theme controls
│   │   └── VideoPlayer.tsx           # Interactive media preview player
│   ├── data/
│   │   ├── profile.ts                # Authoritative experience, education & skills
│   │   └── projects.ts               # Authoritative project highlights
│   ├── hooks/
│   │   └── useLiveTraffic.ts         # Session telemetry hook
│   ├── App.tsx                       # Root application shell
│   ├── index.css                     # Primary design system stylesheet
│   ├── inspo-styles.css              # Animation & component tokens
│   └── main.tsx                      # Vite React entrypoint
├── index.html                        # HTML5 shell & Open Graph tags
├── package.json                      # Project manifest
├── tsconfig.json                     # TypeScript compiler configuration
└── vite.config.ts                    # Vite build configuration
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/Kunal06-tech-pixel/PORTFOLIO.git

# Navigate into directory
cd PORTFOLIO

# Install dependencies
npm install
```

### Development
```bash
# Start local development server
npm run dev
```
Visit `http://localhost:5173` to view the application.

### Production Build
```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Contact & Profiles

- **Email**: [kunaldaskumar3@gmail.com](mailto:kunaldaskumar3@gmail.com)
- **LinkedIn**: [linkedin.com/in/kunaldas06](https://linkedin.com/in/kunaldas06)
- **GitHub**: [github.com/Kunal06-tech-pixel](https://github.com/Kunal06-tech-pixel)
- **Location**: Guwahati, Assam, India

---

## License
MIT License © 2026 Kunal Kumar Das
