'use client'

import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n/context'

export default function ConceptSection() {
  const { t } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const concepts = useMemo(() => [
    {
      title: t.concept.principles.hyperdimensional.title,
      subtitle: t.concept.principles.hyperdimensional.subtitle,
      description: t.concept.principles.hyperdimensional.description,
      icon: '⊗',
      color: 'from-synarc-blue to-synarc-purple',
    },
    {
      title: t.concept.principles.compositional.title,
      subtitle: t.concept.principles.compositional.subtitle,
      description: t.concept.principles.compositional.description,
      icon: '◈',
      color: 'from-synarc-purple to-synarc-pink',
    },
    {
      title: t.concept.principles.holographic.title,
      subtitle: t.concept.principles.holographic.subtitle,
      description: t.concept.principles.holographic.description,
      icon: '◉',
      color: 'from-synarc-pink to-psi-gold',
    },
    {
      title: t.concept.principles.resonant.title,
      subtitle: t.concept.principles.resonant.subtitle,
      description: t.concept.principles.resonant.description,
      icon: '∿',
      color: 'from-psi-gold to-synarc-green',
    },
    {
      title: t.concept.principles.adaptive.title,
      subtitle: t.concept.principles.adaptive.subtitle,
      description: t.concept.principles.adaptive.description,
      icon: '☉',
      color: 'from-synarc-green to-synarc-blue',
    },
    {
      title: t.concept.principles.scalable.title,
      subtitle: t.concept.principles.scalable.subtitle,
      description: t.concept.principles.scalable.description,
      icon: '⟆',
      color: 'from-synarc-blue to-synarc-purple',
    },
  ], [t])


  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20"
    >
      <div className="neural-grid absolute inset-0 opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.5, type: "spring", damping: 20 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="section-title text-5xl md:text-6xl font-sansation font-bold mb-4">
          <span className="gradient-text">{t.concept.title}</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-sansation font-light">
          {t.concept.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
        {concepts.map((concept, index) => (
          <motion.div
            key={index}
            className="concept-card group h-full"
            initial={{ opacity: 0, y: 100, rotateY: -45 }}
            animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
            transition={{ duration: 1.2, delay: index * 0.2, type: "spring", damping: 20 }}
          >
            <div className="relative p-8 glass-morphism rounded-2xl hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 semantic-node h-full flex flex-col">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition-opacity"
                   style={{ background: `linear-gradient(135deg, ${concept.color.split(' ')[1]}, ${concept.color.split(' ')[3]})` }} />

              <div className="text-6xl mb-4 opacity-60 group-hover:opacity-100 transition-opacity">
                {concept.icon}
              </div>

              <h3 className={`text-2xl font-sansation font-bold mb-2 bg-gradient-to-r ${concept.color} bg-clip-text text-transparent`}>
                {concept.title}
              </h3>

              <h4 className="text-lg text-gray-300 mb-4 font-sansation font-medium">{concept.subtitle}</h4>

              <p className="text-gray-400 font-sansation font-light flex-grow">{concept.description}</p>

              <motion.div
                className="mt-6 h-1 bg-gradient-to-r rounded-full opacity-50"
                style={{ background: `linear-gradient(90deg, ${concept.color.split(' ')[1]}, ${concept.color.split(' ')[3]})` }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: index * 0.3 + 0.5 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
      >
        <p className="text-lg text-gray-400 max-w-3xl mx-auto font-sansation font-normal">
          {t.concept.deepTruth}
        </p>
      </motion.div>
    </section>
  )
}