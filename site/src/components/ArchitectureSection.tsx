'use client'

import { useRef, useEffect, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useI18n } from '@/lib/i18n/context'

// const AuraVisualization = dynamic(() => import('@/components/AuraVisualization'), {
//   ssr: false,
//   loading: () => <div className="w-full h-[400px] loading-pulse" />
// })

// First version - kept for reference
// const MultidimensionalField = dynamic(() => import('@/components/MultidimensionalField'), {
//   ssr: false,
//   loading: () => <div className="w-full h-[500px] loading-pulse" />
// })

// Second version - advanced ψ-field visualization
const PsiFieldVisualization = dynamic(() => import('@/components/PsiFieldVisualization'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] loading-pulse" />
})

export default function ArchitectureSection() {
  const { t } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const architectureLayers = useMemo(() => [
    {
      name: t.architecture.layers.psiField.name,
      description: t.architecture.layers.psiField.description,
      features: t.architecture.layers.psiField.features,
      color: '#00d4ff',
    },
    {
      name: t.architecture.layers.vsa.name,
      description: t.architecture.layers.vsa.description,
      features: t.architecture.layers.vsa.features,
      color: '#8b5cf6',
    },
    {
      name: t.architecture.layers.cognitive.name,
      description: t.architecture.layers.cognitive.description,
      features: t.architecture.layers.cognitive.features,
      color: '#ec4899',
    },
  ], [t])

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-5xl md:text-6xl font-sansation font-bold mb-4">
          <span className="gradient-text">{t.architecture.title}</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-sansation font-light">
          {t.architecture.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto relative z-10 w-full items-stretch">
        <motion.div
          className="flex flex-col gap-6 h-full"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {architectureLayers.map((layer, index) => (
            <motion.div
              key={index}
              className="p-6 glass-morphism rounded-xl hover:bg-white/10 transition-all duration-300 group flex flex-col flex-1"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
              whileHover={{ x: 10 }}
            >
              <div className="flex items-start space-x-4 flex-1">
                <div
                  className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                  style={{ backgroundColor: layer.color, boxShadow: `0 0 20px ${layer.color}` }}
                />
                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl font-sansation font-bold mb-2" style={{ color: layer.color }}>
                    {layer.name}
                  </h3>
                  <p className="text-gray-400 mb-4 font-sansation font-normal min-h-[3rem]">{layer.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {layer.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm rounded-full glass-morphism text-gray-300 font-sansation font-light"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <motion.div
                className="h-0.5 mt-4 rounded-full"
                style={{ backgroundColor: layer.color }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: index * 0.3 + 0.8 }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col gap-6 h-full"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex-1 flex flex-col gap-6">
            {/* <AuraVisualization /> */}
            {/* <MultidimensionalField /> */}
            <PsiFieldVisualization />
            <motion.div
              className="p-6 glass-morphism rounded-xl flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <h4 className="text-lg font-sansation font-semibold mb-3 text-synarc-blue">{t.architecture.unifiedTitle}</h4>
              <ul className="space-y-2 text-gray-400 font-sansation font-light">
                {t.architecture.unifiedFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className={`mr-2 ${
                      i === 0 ? 'text-synarc-purple' :
                      i === 1 ? 'text-synarc-pink' :
                      i === 2 ? 'text-psi-gold' :
                      'text-synarc-green'
                    }`}>▸</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-16 text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <p className="text-lg text-gray-400 font-sansation font-normal">
          {t.architecture.synthesis}
        </p>
      </motion.div>
    </section>
  )
}