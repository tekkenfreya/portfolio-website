import { useAnimation } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

export const useScrollAnimation = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.2, once: true })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return { ref, controls }
}

export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 60 
  },
  visible: { 
    opacity: 1, 
    y: 0
  }
}

export const fadeInLeft = {
  hidden: { 
    opacity: 0, 
    x: -60 
  },
  visible: { 
    opacity: 1, 
    x: 0
  }
}

export const fadeInRight = {
  hidden: { 
    opacity: 0, 
    x: 60 
  },
  visible: { 
    opacity: 1, 
    x: 0
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}