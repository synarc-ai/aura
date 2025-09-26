'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { useI18n } from '@/lib/i18n/context'

export default function HeroSection() {
  const { t } = useI18n()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [currentConcept, setCurrentConcept] = useState(0)
  const [showArrow, setShowArrow] = useState(true)

  const concepts = useMemo(() => [
    { text: t.hero.concepts.hyperdimensional, color: '#00d4ff' },
    { text: t.hero.concepts.holographic, color: '#8b5cf6' },
    { text: t.hero.concepts.resonance, color: '#ec4899' },
    { text: t.hero.concepts.semanticField, color: '#10b981' },
    { text: t.hero.concepts.differentiation, color: '#fbbf24' },
    { text: t.hero.concepts.coherence, color: '#f59e0b' },
    { text: t.hero.concepts.embodiment, color: '#06b6d4' },
    { text: t.hero.concepts.topology, color: '#a855f7' },
    { text: t.hero.concepts.stigmergy, color: '#8b5cf6' },
    { text: t.hero.concepts.emergence, color: '#ec4899' },
    { text: t.hero.concepts.synthesis, color: '#14b8a6' },
    { text: t.hero.concepts.metamorphosis, color: '#6366f1' },
    { text: t.hero.concepts.activeInference, color: '#00d4ff' },
    { text: t.hero.concepts.freeEnergy, color: '#8b5cf6' },
    { text: t.hero.concepts.compositionality, color: '#ec4899' },
    { text: t.hero.concepts.selfOrganization, color: '#10b981' },
    { text: t.hero.concepts.consciousness, color: '#fbbf24' },
    { text: t.hero.concepts.multiScale, color: '#f59e0b' },
    { text: t.hero.concepts.vectorSymbolic, color: '#06b6d4' },
    { text: t.hero.concepts.distributed, color: '#a855f7' },
    { text: t.hero.concepts.cognitiveField, color: '#8b5cf6' },
    { text: t.hero.concepts.transcendence, color: '#ec4899' },
    { text: t.hero.concepts.planetaryMind, color: '#14b8a6' },
    { text: t.hero.concepts.unifiedSubstrate, color: '#6366f1' },
  ], [t])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentConcept((prev) => (prev + 1) % concepts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Using Intersection Observer for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Show arrow when more than 50% of hero section is visible
          setShowArrow(entry.isIntersecting && entry.intersectionRatio > 0.5)
        })
      },
      { threshold: [0, 0.5, 1] }
    )

    const currentSection = sectionRef.current
    if (currentSection) {
      observer.observe(currentSection)
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection)
      }
    }
  }, [])

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return

    const timeline = gsap.timeline()

    // Animate SYNARC letters first
    const chars = titleRef.current.querySelectorAll('.char')
    if (chars.length > 0) {
      timeline.fromTo(chars,
        {
          opacity: 0,
          y: 100,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'back.out(1.7)',
        }
      )
    }

    // Then animate subtitle and descriptions
    timeline
      .from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=0.5')
      .from('.hero-description', {
        opacity: 0.4,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
      }, '-=0.5')
  }, [])

  // Static text with glow effect
  const AnimatedText = ({ text }: { text: string }) => {
    return (
      <span
        className="animated-text inline-block relative"
        style={{
          padding: '20px 40px', // Add padding for glow space
          margin: '0 -40px', // Compensate margin to maintain layout
        }}
      >
        {/* Main text with static styling */}
        <span
          className="relative"
          style={{
            color: '#60d4ff',
            textShadow: '0 0 40px rgba(0, 212, 255, 0.8), 0 0 80px rgba(0, 212, 255, 0.4), 0 0 120px rgba(139, 92, 246, 0.3)',
            opacity: 0.85, // Semi-transparent text
            fontSize: 'inherit',
            fontWeight: 'inherit',
            letterSpacing: '0.02em',
          }}
        >
          {text}
        </span>
      </span>
    )
  }

  const wrapTextInSpans = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{
          transformStyle: 'preserve-3d',
          '--char-index': i,
        } as React.CSSProperties}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <div ref={sectionRef} className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-radial from-synarc-blue/20 via-synarc-purple/10 to-transparent blur-3xl" />
      </motion.div>

      <div className="relative space-y-8 max-w-5xl">
        <motion.div
          className="group relative inline-block px-8 py-4 cursor-pointer"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Border with wave effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-synarc-blue/30"
            whileHover={{
              borderColor: 'rgba(0, 212, 255, 0.6)',
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Wave effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              opacity: [0, 0.3, 0],
              scale: [1, 1.2, 1.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            style={{
              border: '2px solid rgba(0, 212, 255, 0.3)',
              pointerEvents: 'none',
            }}
          />

          {/* Background glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15), transparent 70%)',
              filter: 'blur(20px)',
            }}
          />

          <span className="relative text-lg font-sansation text-synarc-blue font-semibold tracking-wider uppercase">
            {t.hero.badge}
          </span>
        </motion.div>

        <h1
          ref={titleRef}
          className="text-7xl md:text-8xl lg:text-9xl font-sansation font-extrabold tracking-tighter"
          style={{ perspective: '1000px' }}
        >
          <div className="inline-block relative overflow-visible">
            <AnimatedText text={t.hero.title} />
          </div>
          <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 font-sansation font-bold">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentConcept}
                initial={{ opacity: 0, scale: 0.8, z: -100 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.8, 1.1, 1, 0.9],
                  z: [-100, 0, 0, 100]
                }}
                exit={{ opacity: 0, scale: 0.8, z: 100 }}
                transition={{
                  duration: 3,
                  times: [0, 0.3, 0.7, 1],
                  ease: "easeInOut"
                }}
                style={{
                  color: concepts[currentConcept].color,
                  display: 'inline-block',
                  padding: '0 10px',
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
                className="concept-text"
              >
                {concepts[currentConcept].text}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="hero-description text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-sansation font-medium"
        >
          {t.hero.subtitle.where} <span className="text-synarc-blue font-bold tracking-wide">{t.hero.subtitle.resonance}</span> {t.hero.subtitle.meets}{' '}
          <span className="text-synarc-purple font-bold tracking-wide">{t.hero.subtitle.understanding}</span>
        </p>

        <div className="hero-description space-y-4">
          <p className="text-lg font-sansation font-normal text-gray-100"
             style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)', opacity: 0.9 }}>
            {t.hero.description1}
          </p>
          <p className="text-lg font-sansation font-normal text-gray-100"
             style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)', opacity: 0.9 }}>
            {t.hero.description2}
          </p>
        </div>


        <AnimatePresence>
          {showArrow && (
            <motion.div
              className="fixed bottom-8 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                y: [0, 10, 0]
              }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                opacity: { duration: 0.3 },
                exit: { duration: 0.2 },
                y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5V19M12 19L5 12M12 19L19 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}