'use client'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollIndicator() {
  // Global scroll progress for the entire page
  const { scrollYProgress } = useScroll()
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.8 }}
      style={{ opacity: scrollIndicatorOpacity }}
    >
      <motion.div
        className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="w-1 h-3 bg-gojo-blue rounded-full mt-2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  )
}