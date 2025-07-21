'use client'
import { portfolioData } from '@/data/portfolio'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation, fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation'
import { useRef } from 'react'

export default function Certificates() {
  const { ref: titleRef, controls: titleControls } = useScrollAnimation()
  const { ref: gridRef, controls: gridControls } = useScrollAnimation()
  
  
  const parallaxRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -180])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.7])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.98])

  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <motion.section 
      ref={parallaxRef}
      id="certificates" 
      className="py-20 bg-gradient-to-br from-gojo-silver to-white dark:from-dark-bg dark:to-dark-surface"
      style={{ y, opacity, scale }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            ref={titleRef}
            initial="hidden"
            animate={titleControls}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Certificates & 
              <span className="bg-gradient-to-r from-gojo-red via-gojo-blue to-gojo-purple bg-clip-text text-transparent ml-4">
                Achievements
              </span>
            </h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-gojo-red to-gojo-purple mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              Continuous learning and professional development through certified courses
            </p>
          </motion.div>

          <motion.div 
            ref={gridRef}
            initial="hidden"
            animate={gridControls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {portfolioData.certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                variants={cardVariants}
                className="group h-full"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/80 dark:bg-black/40 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/20 dark:border-gray-700/30 h-full flex flex-col">
                  {/* Certificate Header */}
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 bg-gray-100 dark:bg-gray-800">
                      {certificate.image ? (
                        <img 
                          src={certificate.image} 
                          alt={certificate.title}
                          className="w-full h-full object-cover"
                          style={{ display: 'block' }}
                          onLoad={() => console.log(`Image loaded: ${certificate.title}`)}
                          onError={() => console.log(`Image failed to load: ${certificate.title} - ${certificate.image}`)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gojo-blue via-gojo-purple to-gojo-red flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-6xl text-white/90 mb-2">🎓</div>
                            <div className="text-white/80 font-semibold text-lg">{certificate.provider}</div>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                    </div>
                    
                    {/* Verification Badge */}
                    <motion.div 
                      className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      ✓ Verified
                    </motion.div>
                  </div>

                  {/* Certificate Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <motion.h3 
                      className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gojo-blue transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {certificate.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 dark:text-gray-300 mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Instructor: <span className="font-semibold text-gojo-blue">{certificate.instructor}</span>
                    </motion.p>
                    
                    <motion.p 
                      className="text-gray-500 dark:text-gray-400 mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Completed: {certificate.date}
                    </motion.p>
                    
                    {/* Skills Tags */}
                    <motion.div 
                      className="mb-4 flex-grow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex flex-wrap gap-2">
                        {certificate.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skillIndex}
                            className="px-3 py-1 bg-gradient-to-r from-gojo-red/10 to-gojo-purple/10 text-gojo-purple text-sm rounded-full border border-gojo-purple/20"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + skillIndex * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* View Certificate Button */}
                    <motion.a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-gradient-to-r from-gojo-blue to-gojo-purple text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full justify-center"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Certificate
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Stats */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-gojo-blue mb-2">{portfolioData.certificates.length}+</div>
                <div className="text-gray-600 dark:text-gray-300">Certificates Earned</div>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-gojo-purple mb-2">1000+</div>
                <div className="text-gray-600 dark:text-gray-300">Hours of Learning</div>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-gojo-red mb-2">2021</div>
                <div className="text-gray-600 dark:text-gray-300">Continuous Learning</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}