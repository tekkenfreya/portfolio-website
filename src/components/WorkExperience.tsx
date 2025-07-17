'use client'
import { portfolioData } from '@/data/portfolio'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation, fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation'
import { useRef, useState } from 'react'

export default function WorkExperience() {
  const { ref: titleRef, controls: titleControls } = useScrollAnimation()
  const { ref: experienceRef, controls: experienceControls } = useScrollAnimation()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  
  const parallaxRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.7])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.98])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Full-time':
        return '💼'
      case 'Freelance':
        return '🚀'
      case 'Contract':
        return '📝'
      default:
        return '💼'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'from-gojo-blue to-gojo-purple'
      case 'Freelance':
        return 'from-gojo-red to-gojo-blue'
      case 'Contract':
        return 'from-gojo-purple to-gojo-red'
      default:
        return 'from-gojo-blue to-gojo-purple'
    }
  }

  return (
    <motion.section 
      ref={parallaxRef}
      id="experience" 
      className="py-20 bg-gradient-to-br from-white to-gojo-ice dark:from-dark-elevated dark:to-dark-bg relative overflow-hidden"
      style={{ y, opacity, scale }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-20 right-10 w-80 h-80 bg-gojo-red rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gojo-blue rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gojo-purple rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            ref={titleRef}
            initial="hidden"
            animate={titleControls}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Work 
              <span className="bg-gradient-to-r from-gojo-red via-gojo-blue to-gojo-purple bg-clip-text text-transparent ml-4">
                Experience
              </span>
            </h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-gojo-red to-gojo-purple mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              My professional journey and the experiences that shaped my career
            </p>
          </motion.div>

          <motion.div 
            ref={experienceRef}
            initial="hidden"
            animate={experienceControls}
            variants={containerVariants}
            className="space-y-8"
          >
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={cardVariants}
                className="group relative"
                onMouseEnter={() => setHoveredCard(exp.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Timeline connector */}
                {index < portfolioData.experience.length - 1 && (
                  <motion.div
                    className="absolute left-8 top-20 w-0.5 h-32 bg-gradient-to-b from-gojo-blue to-gojo-purple opacity-30 z-0"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                  />
                )}

                <motion.div
                  className="relative bg-white/80 dark:bg-black/30 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-500"
                  whileHover={{ 
                    scale: 1.02,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    {/* Left side - Company info */}
                    <div className="flex items-start space-x-4 mb-6 lg:mb-0 lg:flex-1">
                      {/* Company icon */}
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getTypeColor(exp.type)} flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-2xl text-white">{getTypeIcon(exp.type)}</span>
                      </motion.div>

                      <div className="flex-1">
                        <motion.h3 
                          className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {exp.position}
                        </motion.h3>
                        <motion.div 
                          className="text-xl font-semibold text-gojo-blue mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {exp.company}
                        </motion.div>
                        <motion.div 
                          className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <span className="flex items-center">
                            📅 {exp.duration}
                          </span>
                          <span className="flex items-center">
                            📍 {exp.location}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getTypeColor(exp.type)} text-white`}>
                            {exp.type}
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Right side - Details */}
                    <div className="lg:flex-1 lg:pl-8">
                      <motion.p 
                        className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {exp.description}
                      </motion.p>

                      {/* Achievements */}
                      <motion.div 
                        className="mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                          Key Achievements
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <motion.div
                              key={achIndex}
                              className="flex items-start space-x-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + achIndex * 0.1 }}
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-gojo-red to-gojo-blue rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-600 dark:text-gray-300">{achievement}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Technologies */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              className="px-3 py-1 bg-gradient-to-r from-gojo-purple/10 to-gojo-blue/10 text-gojo-purple text-sm rounded-full border border-gojo-purple/20 hover:border-gojo-purple/40 transition-colors"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.9 + techIndex * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gojo-blue/5 to-gojo-purple/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === exp.id ? 1 : 0 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom summary stats */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-gojo-blue mb-2">4+</div>
                <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-gojo-purple mb-2">25+</div>
                <div className="text-gray-600 dark:text-gray-300">Projects Completed</div>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-gojo-red mb-2">100%</div>
                <div className="text-gray-600 dark:text-gray-300">Client Satisfaction</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}