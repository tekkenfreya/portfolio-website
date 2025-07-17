import Hero from '@/components/Hero'
import About from '@/components/About'
import WorkExperience from '@/components/WorkExperience'
import Skills from '@/components/Skills'
import Certificates from '@/components/Certificates'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollIndicator from '@/components/ScrollIndicator'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WorkExperience />
      <Skills />
      <Certificates />
      <Projects />
      <Contact />
      <Footer />
      <ScrollIndicator />
    </>
  )
}