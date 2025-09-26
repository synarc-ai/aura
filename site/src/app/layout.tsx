import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { I18nProvider } from '@/lib/i18n/context'

export const metadata: Metadata = {
  title: 'SYNARC.AI - Synergetic Arc to AGI',
  description: 'AURA & ψ-System: Unified Framework for Artificial General Intelligence. From computation to consciousness, from information to understanding.',
  keywords: ['AGI', 'Artificial Intelligence', 'AURA', 'ψ-System', 'Consciousness', 'Semantic Fields'],
  authors: [{ name: 'SYNARC Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-black text-white antialiased font-sansation">
        <div className="psi-field-bg" />
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}