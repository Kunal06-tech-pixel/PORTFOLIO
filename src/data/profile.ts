export interface Profile {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  title: string;
  bio: string;
  experience: {
    company: string;
    role: string;
    period: string;
    locationType: string;
    location: string;
    bullets: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
    location: string;
    cgpa: string;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
}

export const PROFILE: Profile = {
  name: "Kunal Kumar Das",
  phone: "+91 8761941772",
  email: "kunaldaskumar3@gmail.com",
  linkedin: "https://linkedin.com/in/kunaldas06",
  github: "https://github.com/Kunal06-tech-pixel",
  location: "Guwahati, India",
  title: "Full-Stack Developer & AI Engineer",
  bio: "Full-Stack Developer & AI Engineer with hands-on experience developing ATSMind AI, JARVIS voice assistant, and KeyWall security vault. Specialized in voice-first AI pipelines, sentence embeddings, LLM tool calling, and full-stack web applications with React, Node.js, and PostgreSQL.",
  experience: [
    {
      company: "SynthWeb",
      role: "Full-Stack Developer Intern",
      period: "Jan. 2026 – May 2026",
      locationType: "On-site",
      location: "Guwahati, India",
      bullets: [
        "Developed ATSMind AI, an AI-assisted resume analysis and resume-building platform, from application workflows through backend integration and deployment.",
        "Built REST APIs, authentication, database integration, user dashboards, and role-based workflows for job seekers and recruiters.",
        "Implemented resume and job-description processing using local sentence embeddings and integrated generative AI specifically for personalized improvement recommendations."
      ]
    }
  ],
  education: [
    {
      institution: "Girijananda Chowdhury University",
      degree: "Master of Computer Applications (MCA)",
      period: "Aug. 2024 – June 2026",
      location: "Guwahati, India",
      cgpa: "CGPA: 7.9"
    },
    {
      institution: "Girijananda Chowdhury University",
      degree: "Bachelor of Computer Applications (BCA)",
      period: "Aug. 2021 – May 2024",
      location: "Guwahati, India",
      cgpa: "CGPA: 6.9"
    }
  ],
  skills: [
    {
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Python", "SQL"]
    },
    {
      category: "Frontend",
      items: ["HTML", "CSS", "React.js", "Next.js", "Vite", "Tailwind CSS"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "REST APIs", "Socket.IO"]
    },
    {
      category: "Database",
      items: ["PostgreSQL", "MongoDB", "Prisma ORM"]
    },
    {
      category: "AI/NLP",
      items: [
        "OpenAI Whisper",
        "Sentence Embeddings",
        "Cosine Similarity",
        "Skill Extraction",
        "Groq API",
        "LLM Tool Calling",
        "AI Agents"
      ]
    },
    {
      category: "Infrastructure",
      items: ["Redis", "BullMQ", "Docker"]
    },
    {
      category: "Developer Tools",
      items: ["Git", "GitHub", "Postman"]
    },
    {
      category: "Deployment",
      items: ["Vercel", "Netlify", "Cloudflare"]
    }
  ]
};
