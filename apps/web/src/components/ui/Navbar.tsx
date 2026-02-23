'use client';

import { useState } from 'react';
import type { IconType } from 'react-icons';
import { FaLinkedin, FaFacebook, FaEnvelope, FaWhatsapp, FaBars, FaXmark } from 'react-icons/fa6';
import Link from 'next/link';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

interface SocialLink {
  href: string;
  label: string;
  external: boolean;
  icon: IconType;
}

const socialLinks: SocialLink[] = [
  { href: 'https://www.linkedin.com/in/edson-pangilinan-38714226a', label: 'LinkedIn', external: true,  icon: FaLinkedin },
  { href: 'https://www.facebook.com/tekkenfreya',                   label: 'Facebook', external: true,  icon: FaFacebook },
  { href: 'mailto:tekkenfreya@gmail.com',                           label: 'Email',    external: false, icon: FaEnvelope },
  { href: 'https://wa.me/639620650416',                             label: 'WhatsApp', external: true,  icon: FaWhatsapp },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-accent/50 bg-gradient-to-r from-violet-950/95 via-purple-950/90 to-violet-950/95 backdrop-blur-xl shadow-[0_2px_40px_rgba(126,34,206,0.45),0_0_80px_rgba(126,34,206,0.15)]">
      {/* Crystal shimmer — clipped to navbar height so mobile menu is unaffected */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 overflow-hidden">
        <div className="animate-crystal-shimmer absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-violet-200/10 to-transparent" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="bg-gradient-to-r from-violet-300 via-purple-200 to-violet-400 bg-clip-text text-lg font-bold text-transparent">
            Full Stack Automation Specialist
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition-colors hover:text-accent-hover"
              >
                {link.label}
              </Link>
            ))}

            <span className="h-4 w-px bg-accent/40" />

            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-label={link.label}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-text-secondary transition-colors hover:text-accent-hover"
              >
                <link.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-text-secondary md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen
              ? <FaXmark className="h-5 w-5" aria-hidden="true" />
              : <FaBars  className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="border-t border-accent/20 py-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-2 py-3 text-sm text-text-secondary transition-colors hover:text-accent-hover"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-5 border-t border-accent/20 px-2 pt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-label={link.label}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="text-text-secondary transition-colors hover:text-accent-hover"
                >
                  <link.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
