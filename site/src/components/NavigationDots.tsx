'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n/context'

const sections = ['hero', 'concept', 'architecture', 'documentation']

export default function NavigationDots() {
  const { t } = useI18n()
  const [activeSection, setActiveSection] = useState(0)

  const sectionNames = [
    t.navigation.hero,
    t.navigation.concept,
    t.navigation.architecture,
    t.navigation.documentation
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const currentSection = Math.floor(scrollY / windowHeight)
      setActiveSection(Math.min(currentSection, sections.length - 1))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    const section = document.getElementById(sections[index])
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 space-y-4">
      {sections.map((_, index) => (
        <motion.button
          key={index}
          onClick={() => scrollToSection(index)}
          className="clickable block w-3 h-3 rounded-full glass-morphism relative group"
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              backgroundColor: activeSection === index ? '#00d4ff' : 'rgba(255, 255, 255, 0.3)',
              boxShadow: activeSection === index
                ? '0 0 20px #00d4ff, 0 0 40px #00d4ff'
                : '0 0 10px rgba(255, 255, 255, 0.1)',
            }}
            transition={{ duration: 0.3 }}
          />
          <span className="absolute right-full mr-4 whitespace-nowrap text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            {sectionNames[index]}
          </span>
        </motion.button>
      ))}
    </div>
  )
}