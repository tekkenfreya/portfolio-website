'use client'
import { portfolioData } from '@/data/portfolio'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation, fadeInUp, fadeInLeft, fadeInRight } from '@/hooks/useScrollAnimation'
import { useRef } from 'react'

export default function About() {
  const { ref: titleRef, controls: titleControls } = useScrollAnimation()
  const { ref: contentRef, controls: contentControls } = useScrollAnimation()
  const { ref: imageRef, controls: imageControls } = useScrollAnimation()
  
  const parallaxRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.7])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.98])

  return (
    <motion.section 
      ref={parallaxRef}
      id="about" 
      className="py-20 bg-gradient-to-br from-gojo-ice to-gojo-silver dark:from-dark-bg dark:to-dark-surface"
      style={{ y, opacity, scale }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            ref={titleRef}
            initial="hidden"
            animate={titleControls}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-gojo-red to-gojo-purple mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              ref={contentRef}
              initial="hidden"
              animate={contentControls}
              variants={fadeInLeft}
              className="space-y-16"
            >
              <motion.p 
                className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={contentControls}
                variants={fadeInLeft}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {portfolioData.personal.bio}
              </motion.p>
              
              <motion.div 
                className="space-y-4"
                initial="hidden"
                animate={contentControls}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.4
                    }
                  }
                }}
              >
                {[
                  { label: 'Name', value: portfolioData.personal.name },
                  { label: 'Email', value: portfolioData.personal.email, link: `mailto:${portfolioData.personal.email}` },
                  { label: 'Phone', value: portfolioData.personal.phone, link: `tel:${portfolioData.personal.phone}` },
                  { label: 'Location', value: portfolioData.personal.location }
                ].map((item, index) => (
                  <motion.div 
                    key={item.label}
                    className="flex items-center group"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <span className="font-semibold text-gray-900 dark:text-white w-24">{item.label}:</span>
                    {item.link ? (
                      <a 
                        href={item.link}
                        className="text-gojo-blue dark:text-gojo-blue hover:text-gojo-purple dark:hover:text-gojo-purple transition-colors duration-300 group-hover:scale-105 transform"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-gray-700 dark:text-gray-300">{item.value}</span>
                    )}
                  </motion.div>
                ))}
              </motion.div>

            </motion.div>

            <motion.div 
              ref={imageRef}
              initial="hidden"
              animate={imageControls}
              variants={fadeInRight}
              className="flex justify-center"
            >
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Outer decorative frame with modern aesthetic */}
                <motion.div 
                  className="relative w-72 h-72 p-1 bg-gradient-to-br from-gojo-red via-gojo-blue to-gojo-purple rounded-full shadow-2xl"
                  initial={{ rotateY: -30, opacity: 0 }}
                  animate={imageControls}
                  variants={fadeInRight}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {/* Inner border frame */}
                  <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-full p-2 shadow-inner">
                    {/* Image container */}
                    <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg">
                      <img 
                        src="/images/dp.jpg" 
                        alt="Profile"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"       
                      />
                      {/* Overlay gradients for modern aesthetic */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gojo-purple/20 via-transparent to-gojo-blue/10 rounded-full"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gojo-red/10 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Orbiting circles around the border with motion blur */}
                  <motion.div 
                    className="absolute w-6 h-6 bg-gojo-red rounded-full shadow-lg"
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-12px',
                      marginTop: '-12px',
                      filter: 'blur(0.5px)',
                    }}
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.3, 1],
                      filter: ['blur(0.5px)', 'blur(1px)', 'blur(0.5px)'],
                    }}
                    transition={{ 
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      filter: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    transformTemplate={({ rotate }) => 
                      `rotate(${rotate}) translateY(-150px) rotate(-${rotate})`
                    }
                  />
                  <motion.div 
                    className="absolute w-6 h-6 bg-gojo-blue rounded-full shadow-lg"
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-12px',
                      marginTop: '-12px',
                      filter: 'blur(0.5px)',
                    }}
                    animate={{
                      rotate: [120, 480],
                      scale: [1, 1.3, 1],
                      filter: ['blur(0.5px)', 'blur(1px)', 'blur(0.5px)'],
                    }}
                    transition={{ 
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
                      filter: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }
                    }}
                    transformTemplate={({ rotate }) => 
                      `rotate(${rotate}) translateY(-150px) rotate(-${rotate})`
                    }
                  />
                  <motion.div 
                    className="absolute w-6 h-6 bg-gojo-purple rounded-full shadow-lg"
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-12px',
                      marginTop: '-12px',
                      filter: 'blur(0.5px)',
                    }}
                    animate={{
                      rotate: [240, 600],
                      scale: [1, 1.3, 1],
                      filter: ['blur(0.5px)', 'blur(1px)', 'blur(0.5px)'],
                    }}
                    transition={{ 
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.3 },
                      filter: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.3 }
                    }}
                    transformTemplate={({ rotate }) => 
                      `rotate(${rotate}) translateY(-150px) rotate(-${rotate})`
                    }
                  />
                  
                  {/* Glowing effect behind the frame */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-gojo-red/20 via-gojo-blue/20 to-gojo-purple/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </motion.div>

                {/* Bottom right code badge - smaller and more elegant */}
                <motion.div 
                  className="absolute -bottom-3 -right-3 w-16 h-16 bg-gradient-to-r from-gojo-blue to-gojo-purple rounded-2xl flex items-center justify-center shadow-xl border-2 border-white dark:border-gray-800"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={imageControls}
                  variants={fadeInRight}
                  transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}