'use client'

import dynamic from 'next/dynamic'

const PsiFieldVisualization = dynamic(
  () => import('./PsiFieldVisualization'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] glass-morphism rounded-xl overflow-hidden flex items-center justify-center">
        <div className="text-cyan-400 animate-pulse">Loading ψ-field visualization...</div>
      </div>
    )
  }
)

export default PsiFieldVisualization