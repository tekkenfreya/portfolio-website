'use client'

import { useState } from 'react'
import { portfolioData } from '@/data/portfolio'
import { motion } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 w-full bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-50 transition-colors duration-300 overflow-hidden">
      {/* Animated Energy Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Edge Energy Flow */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gojo-purple to-transparent opacity-60"
          animate={{
            backgroundImage: [
              'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.8) 50%, transparent 100%)',
              'linear-gradient(90deg, transparent 20%, rgba(139, 92, 246, 0.8) 70%, transparent 100%)',
              'linear-gradient(90deg, transparent 40%, rgba(139, 92, 246, 0.8) 90%, transparent 100%)',
              'linear-gradient(90deg, transparent 60%, rgba(139, 92, 246, 0.8) 110%, transparent 100%)',
              'linear-gradient(90deg, transparent 80%, rgba(139, 92, 246, 0.8) 130%, transparent 100%)',
              'linear-gradient(90deg, transparent 100%, rgba(139, 92, 246, 0.8) 150%, transparent 100%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Bottom Edge Energy Flow */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gojo-purple to-transparent opacity-60"
          animate={{
            backgroundImage: [
              'linear-gradient(270deg, transparent 0%, rgba(139, 92, 246, 0.8) 50%, transparent 100%)',
              'linear-gradient(270deg, transparent 20%, rgba(139, 92, 246, 0.8) 70%, transparent 100%)',
              'linear-gradient(270deg, transparent 40%, rgba(139, 92, 246, 0.8) 90%, transparent 100%)',
              'linear-gradient(270deg, transparent 60%, rgba(139, 92, 246, 0.8) 110%, transparent 100%)',
              'linear-gradient(270deg, transparent 80%, rgba(139, 92, 246, 0.8) 130%, transparent 100%)',
              'linear-gradient(270deg, transparent 100%, rgba(139, 92, 246, 0.8) 150%, transparent 100%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 5 }}
        />

        {/* Left Edge Energy Flow */}
        <motion.div
          className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-gojo-purple to-transparent opacity-60"
          animate={{
            backgroundImage: [
              'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.8) 50%, transparent 100%)',
              'linear-gradient(180deg, transparent 20%, rgba(139, 92, 246, 0.8) 70%, transparent 100%)',
              'linear-gradient(180deg, transparent 40%, rgba(139, 92, 246, 0.8) 90%, transparent 100%)',
              'linear-gradient(180deg, transparent 60%, rgba(139, 92, 246, 0.8) 110%, transparent 100%)',
              'linear-gradient(180deg, transparent 80%, rgba(139, 92, 246, 0.8) 130%, transparent 100%)',
              'linear-gradient(180deg, transparent 100%, rgba(139, 92, 246, 0.8) 150%, transparent 100%)',
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        {/* Right Edge Energy Flow */}
        <motion.div
          className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-gojo-purple to-transparent opacity-60"
          animate={{
            backgroundImage: [
              'linear-gradient(0deg, transparent 0%, rgba(139, 92, 246, 0.8) 50%, transparent 100%)',
              'linear-gradient(0deg, transparent 20%, rgba(139, 92, 246, 0.8) 70%, transparent 100%)',
              'linear-gradient(0deg, transparent 40%, rgba(139, 92, 246, 0.8) 90%, transparent 100%)',
              'linear-gradient(0deg, transparent 60%, rgba(139, 92, 246, 0.8) 110%, transparent 100%)',
              'linear-gradient(0deg, transparent 80%, rgba(139, 92, 246, 0.8) 130%, transparent 100%)',
              'linear-gradient(0deg, transparent 100%, rgba(139, 92, 246, 0.8) 150%, transparent 100%)',
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2.5 }}
        />


        {/* Particle Effects */}
        {Array.from({ length: 6 }).map((_, i) => {
          const colors = ['bg-gojo-blue', 'bg-gojo-red', 'bg-gojo-purple'];
          const colorClass = colors[i % 3];
          
          return (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 ${colorClass} rounded-full opacity-60 blur-sm`}
              style={{
                left: `${10 + i * 15}%`,
                top: '50%',
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-16">
          <div className="font-bold text-xl text-gray-900 dark:text-white">
            {portfolioData.personal.name}
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}