import React from 'react';

export const SkillsMatrix: React.FC = () => {
  const stackRows = [
    {
      type: 'row-even',
      cards: [
        {
          title: 'AI / NLP',
          desc: 'OpenAI Whisper, Sentence Embeddings, Cosine Similarity, Skill Extraction, Groq API, LLM Tool Calling, AI Agents',
          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
        },
        {
          title: 'Languages',
          desc: 'JavaScript, TypeScript, Python, SQL',
          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
        },
      ],
    },
    {
      type: 'row-odd',
      cards: [
        {
          title: 'Backend',
          desc: 'Node.js, Express.js, REST APIs, Socket.IO',
          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
        },
        {
          title: 'Frontend',
          desc: 'HTML, CSS, React.js, Next.js, Vite, Tailwind CSS',
          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
        },
      ],
    },
    {
      type: 'row-even',
      cards: [
        {
          title: 'Database',
          desc: 'PostgreSQL, MongoDB, Prisma ORM',
          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
        },
        {
          title: 'Infrastructure',
          desc: 'Redis, BullMQ, Docker',
          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
        },
      ],
    },
    {
      type: 'row-odd',
      cards: [
        {
          title: 'Developer Tools',
          desc: 'Git, GitHub, Postman',
          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
        },
        {
          title: 'Deployment',
          desc: 'Vercel, Netlify, Cloudflare',
          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg',
        },
      ],
    },
  ];

  return (
    <section className="stack" id="skills">
      <div className="stack-header-container">
        <h2 className="works-header">MY STACK</h2>
        <div className="stack-footprints" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="stack-grid">
        {stackRows.map((row, rIdx) => (
          <div key={rIdx} className={`stack-row ${row.type}`}>
            {row.cards.map((card, cIdx) => (
              <div key={cIdx} className="stack-card">
                <div className="icon-wrap">
                  <img
                    src={card.iconUrl}
                    alt={card.title}
                    loading="lazy"
                  />
                </div>
                <div className="stack-info">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
