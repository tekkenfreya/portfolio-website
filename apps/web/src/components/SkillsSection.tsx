import { FaMobileScreen, FaPython, FaGamepad, FaFilm } from 'react-icons/fa6';
import { SiClaude, SiReact, SiAdobe } from 'react-icons/si';

const skills = [
  {
    title: 'AI & Automation',
    description:
      'LLM-powered pipelines and no-code/low-code automations using Claude AI, n8n, Zapier, Make, and GHL. Intelligent workflows that save time and scale operations.',
    icon: <SiClaude className="h-8 w-8" />,
  },
  {
    title: 'Full-Stack Development',
    description:
      'Production-ready web and mobile apps built with Next.js, React, Node.js, TypeScript, and PostgreSQL — from database schema to deployed product on Vercel or Hetzner.',
    icon: <SiReact className="h-8 w-8" />,
  },
  {
    title: 'App Development',
    description:
      'Android development using Java and Kotlin with practical experience creating user-friendly mobile applications. Also building cross-platform apps with React Native.',
    icon: <FaMobileScreen className="h-8 w-8" />,
  },
  {
    title: 'Python & Desktop Apps',
    description:
      'GUI desktop tools built with Python and Tkinter — workflow automation, data processing, and internal business utilities with REST API integrations.',
    icon: <FaPython className="h-8 w-8" />,
  },
  {
    title: 'Game Development',
    description:
      'Interactive experiences built in Unreal Engine and Unity — custom mechanics, 3D modeling, and real-time systems.',
    icon: <FaGamepad className="h-8 w-8" />,
  },
  {
    title: 'Motion Graphics & Video',
    description:
      'Over 10 years producing engaging visual content — motion graphics, video editing, and visual storytelling using After Effects, Premiere Pro, and Photoshop.',
    icon: <SiAdobe className="h-8 w-8" />,
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            What I Do
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">My Skills</h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="rounded-xl border border-border bg-bg-card p-8 transition-all hover:border-accent/50 hover:bg-bg-card-hover"
            >
              <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
                {skill.icon}
              </div>
              <h3 className="text-lg font-semibold">{skill.title}</h3>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
