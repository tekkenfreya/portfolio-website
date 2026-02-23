import Image from 'next/image';

const educationEntries = [
  {
    logo: '/images/CAS-logo.png',
    logoAlt: 'PLMAR Logo',
    school: 'PLMAR',
    degree: 'Bachelor of Arts in Mass Communication',
    years: '2010 – 2014',
  },
  {
    logo: '/images/feu-logo.png',
    logoAlt: 'FEU Logo',
    school: 'Far Eastern University (FEU)',
    degree: 'BS – Information Technology',
    years: '2022 – 2025',
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Left — header + cards */}
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Academic Background
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">My Education</h2>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {educationEntries.map((entry) => (
                <div
                  key={entry.school}
                  className="flex flex-col items-center gap-6 rounded-xl border border-border bg-bg-card p-8 text-center transition-colors hover:border-border-hover"
                >
                  <div className="relative h-20 w-20">
                    <Image
                      src={entry.logo}
                      alt={entry.logoAlt}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{entry.school}</h3>
                    <p className="mt-2 text-sm text-text-secondary">{entry.degree}</p>
                    <p className="mt-3 text-sm font-medium text-accent">{entry.years}</p>
                  </div>
                </div>
              ))}
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
