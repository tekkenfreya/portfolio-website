import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="text-lg font-bold text-text-primary">
              Full Stack Automation Specialist
            </Link>
            <p className="mt-3 text-sm text-text-secondary">
              AI automation and full-stack development that eliminates manual work and scales with your business.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="#about" className="text-sm text-text-secondary hover:text-text-primary">
                About
              </Link>
              <Link href="#skills" className="text-sm text-text-secondary hover:text-text-primary">
                Skills
              </Link>
              <Link href="#portfolio" className="text-sm text-text-secondary hover:text-text-primary">
                Portfolio
              </Link>
              <Link href="#education" className="text-sm text-text-secondary hover:text-text-primary">
                Education
              </Link>
              <Link href="#certificates" className="text-sm text-text-secondary hover:text-text-primary">
                Certificates
              </Link>
              <Link href="/contact" className="text-sm text-text-secondary hover:text-text-primary">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Claude AI', 'ChatGPT', 'Codex', 'Ollama', 'Cursor',
                'n8n', 'Zapier', 'Make', 'GHL',
                'Next.js', 'React.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'React Native', 'Java', 'Kotlin',
                'Node.js', 'Python', 'Django', 'Tkinter', 'Supabase', 'PostgreSQL',
                'Vercel', 'Hetzner', 'Docker',
                'Unreal Engine', 'Unity', 'After Effects', 'Premiere Pro', 'Photoshop',
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-bg-card px-2 py-1 text-xs text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-text-muted">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
