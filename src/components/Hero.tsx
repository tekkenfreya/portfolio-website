'use client'
import { portfolioData } from '@/data/portfolio'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import { useTheme } from '@/context/ThemeContext'

function AnimatedSphere() {
  const { isDark } = useTheme()
  
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere visible args={[1, 100, 200]} scale={1.5}>
        <MeshDistortMaterial
          color={isDark ? "#00D9FF" : "#7C3AED"}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function FloatingElements() {
  return (
    <>
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-accent-cyan/30 dark:bg-accent-cyan/50 rounded-full"
        animate={{ 
          y: [0, -20, 0], 
          x: [0, 10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-6 h-6 bg-accent-purple/30 dark:bg-accent-purple/50 rotate-45"
        animate={{ 
          y: [0, 15, 0], 
          rotate: [45, 135, 45]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute bottom-32 left-20 w-8 h-1 bg-accent-green/40 dark:bg-accent-green/60"
        animate={{ 
          scaleX: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="absolute top-60 left-1/3 w-3 h-3 border-2 border-accent-cyan/50 dark:border-accent-cyan/70 rounded-full"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </>
  )
}

export default function Hero() {
  const { isDark } = useTheme()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  const letterVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const name = portfolioData.personal.name

  return (
    <motion.section 
      ref={ref}
      id="home" 
      className="min-h-screen relative overflow-hidden bg-light-gradient dark:bg-dark-gradient flex items-center"
      style={{ y, opacity, scale }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,217,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.1)_0%,transparent_50%)]" />
      </div>

      {/* Floating geometric elements */}
      <FloatingElements />

      {/* Main content grid */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left side - Text content */}
          <motion.div 
            className="space-y-8 lg:space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              x: mousePosition.x,
              y: mousePosition.y
            }}
          >
            {/* Greeting */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.p 
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light mb-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Hello there! 👋 I&apos;m
              </motion.p>
              
              {/* Animated name */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-relaxed pb-2">
                <motion.span className="block" style={{ lineHeight: '1.3' }}>
                  {name.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      className="inline-block bg-gradient-to-r from-slate-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-extrabold shadow-2xl"
                      style={{
                        backgroundSize: '200% 200%',
                        animation: 'gradientShift 4s ease infinite'
                      }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </motion.span>
              </h1>
            </motion.div>

            {/* Title with typewriter effect */}
            <motion.div variants={itemVariants}>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "62%" }}
                  transition={{ delay: 1.5, duration: 2.5 }}
                  className="inline-block overflow-hidden whitespace-nowrap"
                >
                  {portfolioData.personal.title}
                </motion.span>
                <motion.span
                  className="border-r-2 border-accent-cyan"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 4.2, duration: 0.5 }}
                >
                  
                </motion.span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
            >
              {portfolioData.personal.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a 
                href="#projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-gojo-red to-gojo-blue text-white font-semibold rounded-full shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View My Work</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gojo-blue to-gojo-purple"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a 
                href="#contact"
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                whileHover={{ scale: 1.05, borderColor: isDark ? "#3b82f6" : "#8b5cf6" }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div 
              variants={itemVariants}
              className="flex space-x-6"
            >
              {[
                { icon: "github", url: portfolioData.social.github },
                { icon: "linkedin", url: portfolioData.social.linkedin },
                { icon: "onlinejobs", url: portfolioData.social.onlinejobs }
              ].map((social, index) => (
                <motion.a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-accent-cyan dark:hover:text-accent-cyan transition-all duration-300"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 + index * 0.1 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon === 'github' && (
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    )}
                    {social.icon === 'linkedin' && (
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    )}
                    {social.icon === 'onlinejobs' && (
                      <path d="M4 4a2 2 0 012-2h12a2 2 0 012 2v2h2a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V8a2 2 0 012-2h2V4zm2 2v12h12V6H6zm2-2h8V4H8v2zm-4 4h16v10H4V10z"/>
                    )}
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Animated Orbs */}
          <motion.div 
            className="relative flex items-center justify-center h-full min-h-[600px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            {/* Red Orb */}
            <motion.div
              className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-2xl"
              style={{
                boxShadow: '0 0 60px rgba(239, 68, 68, 0.8), 0 0 100px rgba(239, 68, 68, 0.4)',
                filter: 'blur(1px)'
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
            />

            {/* Blue Orb */}
            <motion.div
              className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl"
              style={{
                boxShadow: '0 0 50px rgba(59, 130, 246, 0.8), 0 0 80px rgba(59, 130, 246, 0.4)',
                filter: 'blur(1px)',
                top: '20%',
                right: '25%'
              }}
              animate={{
                y: [0, 40, 0],
                x: [0, -25, 0],
                rotate: [0, -360],
                scale: [1, 0.9, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              whileHover={{ scale: 1.15, transition: { duration: 0.3 } }}
            />

            {/* Purple Orb */}
            <motion.div
              className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-2xl"
              style={{
                boxShadow: '0 0 40px rgba(147, 51, 234, 0.8), 0 0 70px rgba(147, 51, 234, 0.4)',
                filter: 'blur(1px)',
                bottom: '25%',
                left: '30%'
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 15, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              whileHover={{ scale: 1.3, transition: { duration: 0.3 } }}
            />

            {/* Energy connecting lines */}
            <motion.svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 4, duration: 2 }}
            >
              <motion.path
                d="M200,300 Q300,200 400,150"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.path
                d="M200,300 Q250,400 350,450"
                stroke="url(#gradient2)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(239, 68, 68, 0.8)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.8)" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0.8)" />
                </linearGradient>
              </defs>
            </motion.svg>
          </motion.div>
         
        </div>
      </div>


      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.section>
  )
}