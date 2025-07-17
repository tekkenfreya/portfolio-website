'use client'
import { portfolioData } from '@/data/portfolio'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation, fadeInUp } from '@/hooks/useScrollAnimation'
import { useTheme } from '@/context/ThemeContext'
import { useState, useRef } from 'react'

export default function Skills() {
  const { ref: titleRef, controls: titleControls } = useScrollAnimation()
  const { ref: skillsRef, controls: skillsControls } = useScrollAnimation()
  const { isDark } = useTheme()
  const [activeCategory, setActiveCategory] = useState('frontend')
  
  const parallaxRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -250])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.7])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.98])

  const skillCategories = [
    {
      id: 'frontend',
      name: 'Frontend',
      icon: '🎨',
      color: 'from-gojo-red to-gojo-blue',
      skills: portfolioData.skills.frontend
    },
    {
      id: 'backend',
      name: 'Backend', 
      icon: '⚙️',
      color: 'from-gojo-blue to-gojo-purple',
      skills: portfolioData.skills.backend
    },
    {
      id: 'tools',
      name: 'Tools & Others',
      icon: '🛠️', 
      color: 'from-gojo-purple to-gojo-red',
      skills: portfolioData.skills.tools
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const skillVariants = {
    hidden: { 
      opacity: 0, 
      x: -100,
      scale: 0.6 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 0.85,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: { 
      scaleY: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut" as const
      }
    }
  }

  return (
    <motion.section 
      ref={parallaxRef}
      id="skills" 
      className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-dark-elevated dark:to-dark-bg relative overflow-hidden"
      style={{ y, opacity, scale }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gojo-red rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gojo-blue rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gojo-purple rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div 
            ref={titleRef}
            initial="hidden"
            animate={titleControls}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Skills & 
              <span className="bg-gradient-to-r from-gojo-red via-gojo-blue to-gojo-purple bg-clip-text text-transparent ml-4">
                Expertise
              </span>
            </motion.h2>
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-gojo-red to-gojo-blue mx-auto mb-6"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Technologies and tools I use to craft exceptional digital experiences
            </motion.p>
          </motion.div>

          {/* Interactive Category Selector */}
          <motion.div 
            className="flex justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl p-2 border border-white/20 dark:border-gray-700/30">
              {skillCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 mx-2 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r ' + category.color + ' text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Skills Timeline */}
          <motion.div 
            ref={skillsRef}
            initial="hidden"
            animate={skillsControls}
            variants={containerVariants}
            className="relative"
          >
            {/* Central Timeline Line */}
            <motion.div 
              className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-gojo-red via-gojo-blue to-gojo-purple rounded-full origin-top"
              variants={timelineVariants}
              style={{ height: '100%', top: 0 }}
            />

            {/* Skills Display */}
            <div className="space-y-4">
              {skillCategories
                .find(cat => cat.id === activeCategory)
                ?.skills.map((skill, index) => (
                  <motion.div
                    key={`${activeCategory}-${skill}-${index}`}
                    variants={skillVariants}
                    className="flex items-center justify-center relative min-h-[80px] px-4"
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.2 }}
                  >
                    {/* Skill Card */}
                    <div className={`${index % 2 === 0 ? 'lg:absolute lg:right-1/2 lg:mr-4' : 'lg:absolute lg:left-1/2 lg:ml-4'} w-full max-w-sm lg:max-w-xs lg:w-64`}>
                      <motion.div
                        className="bg-white/70 dark:bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg"
                        whileHover={{ 
                          scale: 1.05, 
                          boxShadow: isDark 
                            ? "0 25px 50px -12px rgba(0, 217, 255, 0.25)" 
                            : "0 25px 50px -12px rgba(124, 58, 237, 0.25)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {skill}
                        </h3>
                        
                        {/* Animated Progress Bar */}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${
                              skillCategories.find(cat => cat.id === activeCategory)?.color
                            } rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${85 + Math.random() * 15}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                          />
                        </div>
                        
                        {/* Skill Level Indicator */}
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < 4 ? 'bg-yellow-400' : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.8 + i * 0.1 }}
                            />
                          ))}
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                            Advanced
                          </span>
                        </div>
                      </motion.div>

                      {/* Timeline Connector */}
                      <motion.div
                        className={`hidden lg:block absolute top-1/2 ${
                          index % 2 === 0 ? 'left-full' : 'right-full'
                        } w-4 h-0.5 bg-gradient-to-r ${
                          skillCategories.find(cat => cat.id === activeCategory)?.color
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 p-0.5 rounded-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-white dark:bg-dark-bg px-8 py-4 rounded-2xl">
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  Always learning and exploring new technologies
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Let's build something amazing together!
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}