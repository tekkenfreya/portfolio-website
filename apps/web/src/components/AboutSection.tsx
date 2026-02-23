import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: 'BS IT', label: 'Graduate 2025' },
  { value: 'AI', label: 'Automation Specialist' },
];

export default function AboutSection() {
  return (
    <section id="about" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">

          {/* LEFT — text content */}
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              About
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              About Me
            </h2>
            <p className="mt-2 text-text-secondary font-medium">
              Full-Stack Developer &amp; AI Automation Specialist
            </p>
            <p className="mt-6 text-text-secondary leading-relaxed">
              BS IT graduate (2025) and Full-Stack Developer specializing in AI automation
              and end-to-end web and mobile applications. I build production-ready systems —
              from Next.js web apps and Supabase-backed APIs to LLM workflows with Claude
              AI, n8n, Zapier, and Make.
            </p>
            <p className="mt-4 text-text-secondary leading-relaxed">
              With a background in Mass Communication and 10 years of motion graphics and
              video production, I bring a creative eye to every technical project — helping
              businesses communicate their value while automating the work behind it.
            </p>
            <p className="mt-4 text-text-secondary leading-relaxed">
              I&apos;m driven by the belief that the right combination of automation and craftsmanship
              can give small teams the leverage of a much larger operation. Every project I take
              on starts with understanding the bottleneck — then building the simplest system
              that eliminates it permanently.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-accent">{stat.value}</div>
                  <div className="mt-1 text-sm text-text-muted">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 rounded-xl border border-border bg-bg-card p-8">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm text-text-secondary">Available for projects</span>
              </div>
              <h3 className="mt-4 text-xl font-bold">Let&apos;s Build Something Together</h3>
              <p className="mt-1 text-sm text-text-secondary">
                Open to freelance and full-time work.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Get in Touch
                <FaArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT — vertical glowing line, hidden on mobile */}
          <div className="relative hidden w-16 lg:block">
            {/* Gradient line — full height */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/40 to-transparent" />

            {/* Node 1 — top ~8% */}
            <div className="absolute left-1/2 top-[8%] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-lg" />
              <div className="h-2.5 w-2.5 rounded-full bg-accent animate-twinkle-1" />
            </div>

            {/* Node 2 — ~35% */}
            <div className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400/20 blur-lg" />
              <div className="h-2 w-2 rounded-full bg-purple-400 animate-twinkle-3" />
            </div>

            {/* Node 3 — ~62% */}
            <div className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300/20 blur-lg" />
              <div className="h-2.5 w-2.5 rounded-full bg-violet-300 animate-twinkle-2" />
            </div>

            {/* Node 4 — ~88% */}
            <div className="absolute left-1/2 top-[88%] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-lg" />
              <div className="h-2 w-2 rounded-full bg-accent animate-twinkle-4" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
