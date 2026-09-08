export interface ProjectCaseStudy {
  id: string;
  title: string;
  name: string;
  subtitle: string;
  status: string;
  githubUrl: string;
  liveDemoUrl?: string;
  bullets: string[];
  tags: string[];
  sections: {
    num: string;
    title: string;
    content: string[];
  }[];
  infoFlow?: {
    box1: string;
    box2: string;
    box3: string;
  };
  playerType: 'jarvis' | 'atsmind' | 'keywall';
}

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "jarvis",
    title: "JARVIS — AI Voice Assistant & Productivity Suite",
    name: "JARVIS",
    subtitle: "AI Voice Assistant & Productivity Suite",
    status: "Production Ready",
    githubUrl: "https://github.com/Kunal06-tech-pixel/jarvis-ai-voice-assistant",
    liveDemoUrl: "https://github.com/Kunal06-tech-pixel/jarvis-ai-voice-assistant",
    playerType: "jarvis",
    bullets: [
      "Developed and deployed a full-stack AI personal assistant that converts natural-language voice commands into actionable tasks, reminders, and scheduled events.",
      "Implemented a voice-first AI pipeline using Whisper for speech-to-text and Groq LLM tool calling for intent detection and autonomous task execution.",
      "Built real-time notifications with Socket.IO, asynchronous background jobs using Redis and BullMQ, and productivity analytics using interactive dashboard visualizations.",
      "Implemented JWT authentication, bcrypt password hashing, PostgreSQL with Prisma ORM, schema validation, and calendar conflict detection for secure and reliable task management."
    ],
    tags: [
      "OpenAI Whisper",
      "Groq API",
      "LLM Tool Calling",
      "AI Agents",
      "Node.js",
      "Express.js",
      "Socket.IO",
      "Redis",
      "BullMQ",
      "PostgreSQL",
      "Prisma ORM"
    ],
    sections: [
      {
        num: "01",
        title: "OVERVIEW & PURPOSE",
        content: [
          "Developed and deployed a full-stack AI personal assistant that converts natural-language voice commands into actionable tasks, reminders, and scheduled events.",
          "Voice-first interaction allows users to operate hands-free while maintaining deterministic action execution across personal calendars and task lists."
        ]
      },
      {
        num: "02",
        title: "VOICE-FIRST AI PIPELINE",
        content: [
          "Implemented an end-to-end voice-first pipeline utilizing OpenAI Whisper for accurate speech-to-text transcription.",
          "Leveraged Groq LLM tool calling for low-latency intent detection and autonomous task execution without manual menu navigation."
        ]
      },
      {
        num: "03",
        title: "REAL-TIME & ASYNC INFRASTRUCTURE",
        content: [
          "Built real-time client notifications powered by Socket.IO.",
          "Managed asynchronous background jobs and scheduled reminder events using Redis and BullMQ queue workers, and designed interactive productivity analytics visualizations."
        ]
      },
      {
        num: "04",
        title: "SECURITY & DATA RELIABILITY",
        content: [
          "Secured endpoints using JWT authentication and bcrypt password hashing.",
          "Constructed relational data schemas on PostgreSQL with Prisma ORM, complete with runtime schema validation and calendar conflict detection for conflict-free scheduling."
        ]
      }
    ],
    infoFlow: {
      box1: "Voice Audio -> Whisper STT",
      box2: "Groq LLM Tool Calling & Intent",
      box3: "BullMQ / Redis -> PostgreSQL Event"
    }
  },
  {
    id: "atsmind",
    title: "ATSMind AI — AI Resume Analyzer & ATS Platform",
    name: "ATSMind AI",
    subtitle: "AI Resume Analyzer & ATS Platform",
    status: "Deployed at SynthWeb",
    githubUrl: "https://github.com/Kunal06-tech-pixel/atsmind-ai",
    liveDemoUrl: "https://github.com/Kunal06-tech-pixel/atsmind-ai",
    playerType: "atsmind",
    bullets: [
      "Developed and deployed a full-stack platform that evaluates resumes against job descriptions and generates explainable ATS compatibility scores.",
      "Implemented skill matching, keyword coverage, resume-quality analysis, and semantic similarity using local sentence embeddings and cosine similarity.",
      "Built authentication, PDF resume upload, saved analysis reports, and role-based workflows; integrated the Groq API for contextual resume improvement suggestions without using it to calculate ATS scores."
    ],
    tags: [
      "Sentence Embeddings",
      "Cosine Similarity",
      "Skill Extraction",
      "Groq API",
      "React.js",
      "Node.js",
      "Express.js",
      "REST APIs",
      "PostgreSQL",
      "Prisma ORM"
    ],
    sections: [
      {
        num: "01",
        title: "OVERVIEW & PURPOSE",
        content: [
          "Developed and deployed a full-stack platform that evaluates resumes against job descriptions and generates explainable ATS compatibility scores.",
          "Built both for job seekers aiming to optimize their career applications and recruiters looking for objective, evidence-based candidate assessment."
        ]
      },
      {
        num: "02",
        title: "SEMANTIC SIMILARITY & SKILL EXTRACTION",
        content: [
          "Implemented skill matching, keyword coverage, and resume-quality analysis.",
          "Computed contextual semantic similarity using local sentence embeddings and vector cosine similarity to capture true qualifications rather than rigid keyword matching."
        ]
      },
      {
        num: "03",
        title: "RESPONSIBLE GENERATIVE INTEGRATION",
        content: [
          "Integrated the Groq API for contextual resume improvement recommendations tailored to specific job specs.",
          "Strict architectural separation: Generative LLM suggestions are kept isolated and are never used to calculate numeric ATS compatibility scores."
        ]
      },
      {
        num: "04",
        title: "APPLICATION WORKFLOWS",
        content: [
          "Built authentication, multi-page PDF resume upload, saved analysis reports, and role-based workflows for job seekers and recruiters with PostgreSQL and Prisma ORM."
        ]
      }
    ],
    infoFlow: {
      box1: "Candidate PDF + Job Description",
      box2: "Sentence Embeddings & Cosine Match",
      box3: "Explainable Score & Groq Advisory"
    }
  },
  {
    id: "keywall",
    title: "KeyWall — Secure Password & Sensitive Data Vault",
    name: "KeyWall",
    subtitle: "Secure Password & Sensitive Data Vault",
    status: "Live on Cloudflare",
    githubUrl: "https://github.com/Kunal06-tech-pixel/keywall-vault",
    liveDemoUrl: "https://github.com/Kunal06-tech-pixel/keywall-vault",
    playerType: "keywall",
    bullets: [
      "Developed and deployed a secure digital vault for storing passwords, payment-card details, PINs, private notes, and other sensitive records.",
      "Designed category-based secret management with protected viewing, editing, searching, and organization of stored information.",
      "Implemented authentication and encryption-focused storage workflows, created a responsive application interface, and deployed the system using Cloudflare."
    ],
    tags: [
      "Encryption Workflows",
      "Authentication",
      "Cloudflare",
      "TypeScript",
      "React.js",
      "HTML",
      "CSS",
      "Tailwind CSS"
    ],
    sections: [
      {
        num: "01",
        title: "OVERVIEW & PURPOSE",
        content: [
          "Developed and deployed a secure digital vault for storing passwords, payment-card details, PINs, private notes, and other sensitive records.",
          "Provides a protected, responsive interface for managing private credentials with granular categories."
        ]
      },
      {
        num: "02",
        title: "SECRET MANAGEMENT & SEARCH",
        content: [
          "Designed category-based secret management with protected viewing, inline editing, instant search, and organization of stored confidential records."
        ]
      },
      {
        num: "03",
        title: "ENCRYPTION & STORAGE WORKFLOWS",
        content: [
          "Implemented strict authentication and encryption-focused storage workflows to safeguard sensitive user data against unauthorized access."
        ]
      },
      {
        num: "04",
        title: "CLOUD DEPLOYMENT",
        content: [
          "Engineered a lightweight, responsive web application interface using React.js and TypeScript, and deployed the entire system globally using Cloudflare."
        ]
      }
    ],
    infoFlow: {
      box1: "User Secrets (Passwords / PINs / Cards)",
      box2: "Encryption Storage Workflows",
      box3: "Cloudflare Secure Edge Vault"
    }
  }
];
