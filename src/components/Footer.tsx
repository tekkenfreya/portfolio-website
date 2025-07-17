'use client'
import { portfolioData } from '@/data/portfolio'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-gojo-void via-dark-bg to-gojo-void text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gojo-red rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-gojo-blue rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gojo-purple rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Wavy separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg className="relative block w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="currentColor"
            className="text-gojo-silver dark:text-dark-surface"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.h3 
              className="text-3xl font-bold mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <span className="bg-gradient-to-r from-gojo-red via-gojo-blue to-gojo-purple bg-clip-text text-transparent">
                {portfolioData.personal.name}
              </span>
            </motion.h3>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              {portfolioData.personal.tagline}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { 
                  name: 'GitHub', 
                  url: portfolioData.social.github, 
                  icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
                  color: 'from-gojo-red to-gojo-blue'
                },
                { 
                  name: 'LinkedIn', 
                  url: portfolioData.social.linkedin, 
                  icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
                  color: 'from-gojo-blue to-gojo-purple'
                },
                { 
                  name: 'OnlineJobs.ph', 
                  url: portfolioData.social.onlinejobs, 
                  icon: 'M10 2L14 2C15.1 2 16 2.9 16 4V6H20C21.1 6 22 6.9 22 8V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V8C2 6.9 2.9 6 4 6H8V4C8 2.9 8.9 2 10 2ZM14 6V4H10V6H14ZM4 8V19H20V8H4Z',
                  color: 'from-gojo-purple to-gojo-red'
                }
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg`}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-gojo-blue">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About', href: '#about' },
                { name: 'Experience', href: '#experience' },
                { name: 'Skills', href: '#skills' },
                { name: 'Certificates', href: '#certificates' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' }
              ].map((link, index) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-gojo-purple transition-colors duration-300 flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-2 h-2 bg-gojo-red rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-gojo-purple">Stay Connected</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to get updates on new projects.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gojo-blue focus:border-transparent transition-all duration-300"
                required
              />
              
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-gojo-red to-gojo-blue text-white py-3 px-6 rounded-lg font-semibold hover:from-gojo-blue hover:to-gojo-purple transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubscribed}
              >
                {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
              </motion.button>
            </form>

            {isSubscribed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 text-sm mt-2"
              >
                Thank you for subscribing!
              </motion.p>
            )}
          </div>
        </div>

        {/* Bottom section with divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-gojo-red to-gojo-blue rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">EP</span>
              </div>
              <p className="text-gray-300">
                © {currentYear} {portfolioData.personal.name}. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Made with</span>
              <motion.span
                className="text-gojo-red"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ❤️
              </motion.span>
              <span>and Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}