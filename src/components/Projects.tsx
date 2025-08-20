'use client'
import { portfolioData } from '@/data/portfolio'
import { Project, Company } from '@/utils/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation, fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation'
import { useRef, useState } from 'react'

export default function Projects() {
  const { ref: titleRef, controls: titleControls } = useScrollAnimation()
  const { ref: gridRef, controls: gridControls } = useScrollAnimation()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  const parallaxRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -220])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.7])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.98])

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  }

  const companyVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  // Group projects by company
  const projectsByCompany = portfolioData.companies.map((company: Company) => ({
    company,
    projects: portfolioData.projects.filter((project: Project) => project.companyId === company.id)
  }))

  return (
    <motion.section 
      ref={parallaxRef}
      id="projects" 
      className="py-20 bg-gradient-to-br from-gojo-ice to-gojo-silver dark:from-dark-surface dark:to-dark-elevated"
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-gojo-red to-gojo-purple mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6">
              Some of the projects I&apos;ve worked on recently
            </p>
          </motion.div>

          <motion.div 
            ref={gridRef}
            initial="hidden"
            animate={gridControls}
            variants={staggerContainer}
            className="space-y-16"
          >
            {projectsByCompany.map(({ company, projects }, companyIndex) => (
              projects.length > 0 ? (
                <motion.div
                  key={company.id}
                  variants={companyVariants}
                  className="space-y-8"
                >
                  {/* Company Header */}
                  <div className="text-left mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {company.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-6">
                      <span className="bg-gradient-to-r from-gojo-red to-gojo-purple bg-clip-text text-transparent font-semibold">
                        {company.type}
                      </span>
                      <span>•</span>
                      <span>{company.period}</span>
                    </div>
                  </div>

                  {/* Projects Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project: Project, projectIndex) => (
                      <motion.div
                        key={project.id}
                        variants={cardVariants}
                        className="group h-full cursor-pointer"
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="bg-white/80 dark:bg-black/40 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/20 dark:border-gray-700/30 h-full flex flex-col">
                          {/* Project Image */}
                          <div className="relative overflow-hidden">
                            <div className="w-full h-48 bg-gray-100 dark:bg-gray-800">
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                            </div>
                            
                            {/* Hover Overlay */}
                            <motion.div 
                              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                              initial={{ opacity: 0 }}
                            >
                              <div className="text-white text-center">
                                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/20 flex items-center justify-center">
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </div>
                                <p className="text-sm font-semibold">View Details</p>
                              </div>
                            </motion.div>
                          </div>

                          {/* Project Content */}
                          <div className="p-6 flex-grow flex flex-col">
                            <motion.h3 
                              className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gojo-blue transition-colors"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              {project.title}
                            </motion.h3>
                            
                            <motion.p 
                              className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm flex-grow"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              {project.description}
                            </motion.p>
                            
                            {/* Technologies */}
                            <motion.div 
                              className="mb-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.4 }}
                            >
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 text-xs rounded-full border border-gray-200"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </motion.div>

                            {/* Links */}
                            <div className="flex justify-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                              {/* Show only GitHub for mobile apps, both links for web apps */}
                              {project.title.includes('Mobile') ? (
                                <motion.a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors text-sm font-medium"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                  </svg>
                                  View on GitHub
                                </motion.a>
                              ) : (
                                <div className="flex space-x-4">
                                  <motion.a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm font-medium"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Visit App
                                  </motion.a>
                                  <motion.a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors text-sm font-medium"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    GitHub
                                  </motion.a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Horizontal Separator - only show if not the last company */}
                  {companyIndex < projectsByCompany.length - 1 && (
                    <motion.div 
                      className="mt-16 pt-8"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={gridControls}
                      transition={{ delay: companyIndex * 0.2 + 0.5, duration: 0.8 }}
                    >
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                    </motion.div>
                  )}
                </motion.div>
              ) : null
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-28"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.a
              href="https://github.com/tekkenfreya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2}}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View More Projects
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{selectedProject.title}</h3>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {/* Technologies */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 rounded-full border border-gray-200 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-center shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Live App
                </motion.a>
                
                <motion.a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-center shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Source Code
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  )
}