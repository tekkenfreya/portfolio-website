import Image from 'next/image';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

const certificates = [
  {
    image: '/images/AppDevCert.jpg',
    title: 'App Development Course Certificate',
    description:
      'Certificate of Completion: App Development in Android 14 using Visual Studio, completed on Udemy.',
    href: 'https://drive.google.com/file/d/1fTZi3dePnLLdvu0lPRNVQqBy8K61uzLU/view?usp=sharing',
  },
  {
    image: '/images/GameDevCert.png',
    title: 'EDX Game Development Certificate',
    description:
      'Verified Certificate: Game Development Course from edX, endorsed by HP.',
    href: 'https://drive.google.com/file/d/1FW5e1M80TVo4pTKzyRCH5yIgQfBc88ra/view?usp=sharing',
  },
  {
    image: '/images/GameDevCert2.png',
    title: 'Game Development Seminar',
    description:
      'Certificate of Recognition: Speaker at Game Development Seminar at Our Lady Fatima University.',
    href: 'https://drive.google.com/file/d/1wcpejHVvYy9ze4CN_kAgkpmGOtjQ2Sho/view?usp=sharing',
  },
  {
    image: '/images/WebDevCert.jpg',
    title: 'Web Development Bootcamp Course',
    description:
      'Certificate of Completion: Web Development Bootcamp by Angela Yu, completed on Udemy.',
    href: 'https://drive.google.com/file/d/1ZBEftR4gomJ5Fpyt2751oWUemWyxieUJ/view?usp=sharing',
  },
  {
    image: '/images/udemy-prompt-engineering.png',
    title: 'Prompt Engineering Certificate',
    description: 'Certificate of Completion: Prompt Engineering course, completed on Udemy.',
    href: 'https://www.udemy.com/certificate/UC-2b15633c-a76e-41e8-b7dc-b0d7270e9afa/',
  },
  {
    image: '/images/ai-coding-course.png',
    title: 'AI Coding Course Certificate',
    description: 'Certificate of Completion: AI Coding course, completed on Udemy.',
    href: 'https://www.udemy.com/certificate/UC-294423a1-98da-46aa-a7ae-240404143a6a/',
  },
];

export default function CertificatesSection() {
  return (
    <section id="certificates" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Credentials
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">My Certificates</h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <div
              key={cert.title}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-bg-card transition-colors hover:border-border-hover"
            >
              {/* Certificate image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-secondary">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card content */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-sm font-semibold text-text-primary leading-snug">
                  {cert.title}
                </h3>
                <p className="mt-2 flex-1 text-xs text-text-secondary leading-relaxed">
                  {cert.description}
                </p>
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-accent-hover"
                >
                  View Certificate
                  <FaArrowUpRightFromSquare className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
