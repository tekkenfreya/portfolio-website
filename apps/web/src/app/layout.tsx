import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Edson Pangilinan | Full-Stack Developer & AI Automation Specialist',
  description:
    'Portfolio of Edson Pangilinan — Full-Stack Developer and AI Automation Specialist with 10 years of motion graphics experience and a BS IT background.',
  keywords: [
    'Edson Pangilinan',
    'full-stack developer',
    'AI automation',
    'LLM workflows',
    'game developer',
    'app developer',
    'web developer',
    'motion graphics',
  ],
  openGraph: {
    title: 'Edson Pangilinan | Full-Stack Developer & AI Automation Specialist',
    description:
      'Full-Stack Developer and AI Automation Specialist. Full stack, AI automation, game dev, and motion graphics portfolio.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
