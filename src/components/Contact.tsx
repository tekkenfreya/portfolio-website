'use client'
import { portfolioData } from '@/data/portfolio'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation, fadeInUp, fadeInLeft, fadeInRight } from '@/hooks/useScrollAnimation'
import { useRef, useState } from 'react'

export default function Contact() {
  const { ref: titleRef, controls: titleControls } = useScrollAnimation()
  const { ref: formRef, controls: formControls } = useScrollAnimation()
  const { ref: infoRef, controls: infoControls } = useScrollAnimation()
  
  const parallaxRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.8])
  const scale = useTransform(scrollYProgress, [0, 0.9], [1, 0.99])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio')
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
      `)
      
      const mailtoLink = `mailto:${portfolioData.personal.email}?subject=${subject}&body=${body}`
      
      // Open default email client
      window.location.href = mailtoLink
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section 
      ref={parallaxRef}
      id="contact" 
      className="py-20 bg-gradient-to-br from-gojo-void to-dark-bg relative overflow-hidden"
      style={{ y, opacity, scale }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gojo-red rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gojo-blue rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gojo-purple rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In 
              <span className="bg-gradient-to-r from-gojo-red via-gojo-blue to-gojo-purple bg-clip-text text-transparent ml-4">
                Touch
              </span>
            </h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-gojo-red to-gojo-purple mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
            <p className="text-lg text-gray-300 mt-6 max-w-2xl mx-auto">
              Let&apos;s discuss your next project or just say hello!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              ref={formRef}
              initial="hidden"
              animate={formControls}
              variants={fadeInLeft}
              className="space-y-8"
            >
              <motion.div
                className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gojo-blue focus:border-transparent transition-all duration-300"
                        placeholder="Your name"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gojo-blue focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gojo-blue focus:border-transparent transition-all duration-300"
                      placeholder="Project inquiry"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gojo-blue focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </motion.div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-gojo-red to-gojo-blue text-white py-4 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                  
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-green-400 text-center"
                    >
                      Email client opened! Please send the message from your email app.
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-red-400 text-center"
                    >
                      Something went wrong. Please try again.
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              ref={infoRef}
              initial="hidden"
              animate={infoControls}
              variants={fadeInRight}
              className="space-y-8"
            >
              <motion.div
                className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <motion.div
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-gojo-red to-gojo-blue rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300">Email</p>
                      <p className="text-white font-semibold">{portfolioData.personal.email}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-gojo-purple to-gojo-red rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300">Location</p>
                      <p className="text-white font-semibold">{portfolioData.personal.location}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}