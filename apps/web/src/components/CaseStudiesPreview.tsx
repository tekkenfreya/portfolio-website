import Link from 'next/link';
import { FaCheck, FaArrowRight } from 'react-icons/fa6';

const caseStudies = [
  {
    title: 'GoWater HR Automation System',
    description:
      'Built a complete attendance tracking, task management, and reporting system for a water delivery company. Replaced manual spreadsheets with automated workflows.',
    tags: ['Next.js', 'Supabase', 'n8n', 'React Native'],
    metrics: ['80% less manual work', 'Real-time tracking', 'Auto-generated reports'],
  },
  {
    title: 'Automated Content Pipeline',
    description:
      'Designed an end-to-end content generation system using Claude AI. From topic research to draft generation to multi-platform publishing — all automated.',
    tags: ['Claude AI', 'n8n', 'Zapier', 'WordPress'],
    metrics: ['10x content output', '90% less editing time', 'SEO-optimized'],
  },
  {
    title: 'Intelligent Lead Routing',
    description:
      'Built an AI-powered lead qualification and routing system that analyzes incoming leads, scores them, and routes to the right sales rep with context.',
    tags: ['Claude AI', 'GoHighLevel', 'Webhooks'],
    metrics: ['3x conversion rate', 'Instant response', 'Smart scoring'],
  },
];

export default function CaseStudiesPreview() {
  return (
    <section id="case-studies" className="border-t border-border bg-bg-secondary py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Case Studies
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Real projects. Real results.
          </h2>
          <p className="mt-4 text-text-secondary">
            A selection of automation systems I&apos;ve built for clients.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <div
              key={study.title}
              className="group rounded-2xl border border-border bg-bg-card p-6 transition-all hover:border-border-hover hover:bg-bg-card-hover"
            >
              <h3 className="text-lg font-semibold">{study.title}</h3>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                {study.description}
              </p>

              {/* Metrics */}
              <div className="mt-4 space-y-2">
                {study.metrics.map((metric) => (
                  <div key={metric} className="flex items-center gap-2 text-sm">
                    <FaCheck className="h-4 w-4 text-success shrink-0" />
                    <span className="text-text-secondary">{metric}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-bg-primary px-2 py-1 text-xs text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            View detailed case studies
            <FaArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
