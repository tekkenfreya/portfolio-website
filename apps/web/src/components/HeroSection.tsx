import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaLinkedin, FaEnvelope, FaWhatsapp, FaArrowRight } from 'react-icons/fa6';

const techBadges = [
  'Claude AI', 'ChatGPT', 'Codex', 'Ollama', 'Cursor',
  'n8n', 'Zapier', 'Make', 'GHL',
  'Next.js', 'React.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'React Native', 'Java', 'Kotlin',
  'Node.js', 'Python', 'Django', 'Tkinter', 'Supabase', 'PostgreSQL',
  'Vercel', 'Hetzner', 'Docker',
  'Unreal Engine', 'Unity', 'After Effects', 'Premiere Pro', 'Photoshop',
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* Left — text content */}
          <div className="max-w-2xl text-center lg:text-left">
            {/* Status badge */}
            <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-success animate-[pulse_2.5s_ease-in-out_infinite]" />
              <span className="text-sm text-text-secondary">Available for projects</span>
            </div>

            {/* Greeting */}
            <p className="animate-fade-in-up text-lg text-text-secondary">Hello, I&apos;m</p>

            {/* Name */}
            <h1 className="animate-fade-in-up animate-delay-100 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Edson Pangilinan
            </h1>

            {/* Title */}
            <h2 className="animate-fade-in-up animate-delay-200 mt-3 text-xl font-semibold sm:text-2xl">
              <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
                AI Automation Specialist &amp; Full-Stack Developer
              </span>
            </h2>

            {/* Bio */}
            <p className="animate-fade-in-up animate-delay-300 mt-6 text-text-secondary leading-relaxed sm:text-lg">
              I build{' '}
              <span className="font-medium text-text-primary">AI-powered automation systems</span>
              {' '}and full-stack web applications that eliminate manual work and scale intelligently.
              With a background in motion graphics and video production, I bring creative precision
              to every technical solution — from LLM workflows to end-to-end product development.
            </p>

            {/* Social icons */}
            <div className="animate-fade-in-up animate-delay-400 mt-6 flex items-center gap-4 justify-center lg:justify-start">
              <a
                href="https://www.facebook.com/tekkenfreya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-lg border border-border p-2.5 text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/edson-pangilinan-38714226a"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg border border-border p-2.5 text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:tekkenfreya@gmail.com"
                aria-label="Email"
                className="rounded-lg border border-border p-2.5 text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
              >
                <FaEnvelope className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/639620650416"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="rounded-lg border border-border p-2.5 text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
            </div>

            {/* CTAs */}
            <div className="animate-fade-in-up animate-delay-400 mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="#portfolio"
                className="group flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25"
              >
                See My Work
                <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#portfolio"
                className="rounded-xl border border-border px-8 py-3.5 text-base font-semibold text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
              >
                View Portfolio
              </Link>
            </div>

            {/* Tech badges */}
            <div className="animate-fade-in-up animate-delay-500 mt-12">
              <p className="mb-4 text-xs uppercase tracking-widest text-text-muted">Tech I work with</p>
              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {techBadges.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-border bg-bg-card px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — profile image */}
          <div className="animate-fade-in-up animate-delay-200 flex-shrink-0">
            <div className="relative h-64 w-64 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
              {/* Glow behind */}
              <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl" />
              {/* Outer ring — slow clockwise dashed */}
              <div className="pointer-events-none absolute -inset-4 rounded-full border-2 border-dashed border-accent/40 animate-spin-slow" />
              {/* Inner ring — counter-clockwise solid */}
              <div className="pointer-events-none absolute -inset-1 rounded-full border border-solid border-purple-400/25 animate-spin-reverse" />
              {/* Circular photo */}
              <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-accent/50 shadow-[0_0_40px_rgba(99,102,241,0.3)]">
                <Image
                  src="/images/dp.png"
                  alt="Edson Pangilinan"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
