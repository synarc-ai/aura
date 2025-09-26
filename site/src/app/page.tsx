'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/HeroSection'
import ConceptSection from '@/components/ConceptSection'
import ArchitectureSection from '@/components/ArchitectureSection'
import DocumentationSection from '@/components/DocumentationSection'
import CustomCursor from '@/components/CustomCursor'
import NavigationDots from '@/components/NavigationDots'
import LanguageToggle from '@/components/LanguageToggle'

const SemanticField = dynamic(() => import('@/components/SemanticField'), {
  ssr: false,
  loading: () => <div className="w-full h-screen loading-pulse" />
})

const ParticleNetwork = dynamic(() => import('@/components/ParticleNetwork'), {
  ssr: false
})

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      document.documentElement.style.setProperty('--mouse-x', `${x}%`)
      document.documentElement.style.setProperty('--mouse-y', `${y}%`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <CustomCursor />
      <NavigationDots />
      <LanguageToggle />

      <main ref={containerRef} className="relative">
        <div className="fixed inset-0 pointer-events-none z-10">
          <ParticleNetwork />
        </div>

        <section id="hero" className="relative min-h-screen">
          <SemanticField />
          <HeroSection />
        </section>

        <section id="concept" className="relative min-h-screen">
          <ConceptSection />
        </section>

        <section id="architecture" className="relative min-h-screen">
          <ArchitectureSection />
        </section>

        <section id="documentation" className="relative min-h-screen">
          <DocumentationSection />
        </section>
      </main>
    </>
  )
}