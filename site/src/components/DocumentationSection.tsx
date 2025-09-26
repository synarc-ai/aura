'use client'

import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n/context'

export default function DocumentationSection() {
  const { t } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const documentationSections = useMemo(() => [
    {
      title: t.documentation.cards.technical.title,
      icon: '⊗',
      description: t.documentation.cards.technical.description,
      link: '/docs/architecture',
      features: t.documentation.cards.technical.features,
      gradient: 'from-synarc-blue to-synarc-purple',
    },
    {
      title: t.documentation.cards.implementation.title,
      icon: '◈',
      description: t.documentation.cards.implementation.description,
      link: '/docs/implementation',
      features: t.documentation.cards.implementation.features,
      gradient: 'from-synarc-purple to-synarc-pink',
    },
    {
      title: t.documentation.cards.research.title,
      icon: '∿',
      description: t.documentation.cards.research.description,
      link: '/docs/research',
      features: t.documentation.cards.research.features,
      gradient: 'from-synarc-pink to-psi-gold',
    },
  ], [t])

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-5xl md:text-6xl font-sansation font-bold mb-4">
          <span className="gradient-text">{t.documentation.title}</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-sansation font-light">
          {t.documentation.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10 w-full">
        {documentationSections.map((doc, index) => (
          <motion.div
            key={index}
            className="group relative"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ y: -10 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
                 style={{ background: `linear-gradient(135deg, ${doc.gradient.split(' ')[1]}, ${doc.gradient.split(' ')[3]})` }} />

            <div className="relative p-8 glass-morphism rounded-2xl h-full">
              <div className="text-5xl mb-4">{doc.icon}</div>

              <h3 className={`text-2xl font-sansation font-bold mb-3 bg-gradient-to-r ${doc.gradient} bg-clip-text text-transparent`}>
                {doc.title}
              </h3>

              <p className="text-gray-400 mb-6 font-sansation font-normal">{doc.description}</p>

              <ul className="space-y-2 mb-6">
                {doc.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-300 font-sansation font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r mr-2"
                          style={{ background: `linear-gradient(135deg, ${doc.gradient.split(' ')[1]}, ${doc.gradient.split(' ')[3]})` }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="clickable w-full py-3 rounded-lg glass-morphism text-white font-sansation font-semibold hover:bg-white/10 transition-all duration-300">
                {t.documentation.viewDocumentation}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-20 text-center max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="p-8 glass-morphism rounded-2xl">
          <h3 className="text-2xl font-sansation font-bold mb-4 text-synarc-blue">{t.documentation.joinTheJourney.title}</h3>
          <p className="text-gray-400 mb-6 font-sansation font-normal">
            {t.documentation.joinTheJourney.description}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="clickable px-6 py-3 bg-gradient-to-r from-synarc-blue to-synarc-purple rounded-lg font-sansation font-semibold text-white">
              {t.documentation.joinTheJourney.buttons.github}
            </button>
            <button className="clickable px-6 py-3 glass-morphism rounded-lg font-sansation font-semibold text-white hover:bg-white/10">
              {t.documentation.joinTheJourney.buttons.research}
            </button>
            <button className="clickable px-6 py-3 glass-morphism rounded-lg font-sansation font-semibold text-white hover:bg-white/10">
              {t.documentation.joinTheJourney.buttons.discord}
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mt-12 text-center text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <p className="font-sansation font-extralight">{t.documentation.footer.replace('{{year}}', new Date().getFullYear().toString())}</p>
      </motion.div>
    </section>
  )
}