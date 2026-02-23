import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-bg-card p-12 text-center sm:p-16">
          {/* Background gradient */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-[80px]" />
          </div>

          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to automate?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-text-secondary">
              Let&apos;s talk about your project. Reach out and I&apos;ll get back to you within 24 hours.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="rounded-xl bg-accent px-8 py-3.5 font-semibold text-white transition-colors hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25"
              >
                Get in Touch
              </Link>
              <Link
                href="#portfolio"
                className="rounded-xl border border-border px-8 py-3.5 font-semibold text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
