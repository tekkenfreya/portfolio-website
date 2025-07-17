'use client'
import { useTheme } from '@/context/ThemeContext'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-4 right-16 md:right-6 z-50 p-2 rounded-full bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/30 dark:border-gray-600/50 shadow-xl hover:shadow-2xl transition-all duration-300"
      style={{
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative w-5 h-5"
      >
        {/* Sun Icon */}
        <motion.svg
          className="absolute inset-0 w-5 h-5 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 24 24"
          animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.3 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </motion.svg>

        {/* Moon Icon */}
        <motion.svg
          className="absolute inset-0 w-5 h-5 text-gojo-blue"
          fill="currentColor"
          viewBox="0 0 24 24"
          animate={{ opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
        </motion.svg>
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 dark:bg-white/80 text-white dark:text-black text-xs rounded whitespace-nowrap"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -5 }}
        transition={{ duration: 0.2 }}
      >
        Switch to {isDark ? 'light' : 'dark'} mode
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-black/80 dark:bg-white/80 rotate-45"></div>
      </motion.div>
    </motion.button>
  )
}