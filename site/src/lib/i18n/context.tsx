'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { en } from './translations/en'
import { ru } from './translations/ru'

export type Language = 'en' | 'ru'
export type Translations = typeof en

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations: Record<Language, Translations> = {
  en,
  ru,
}

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Auto-detect language from browser
    const storedLang = localStorage.getItem('language') as Language | null
    if (storedLang && (storedLang === 'en' || storedLang === 'ru')) {
      setLanguageState(storedLang)
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase()
      const detectedLang = browserLang.startsWith('ru') ? 'ru' : 'en'
      setLanguageState(detectedLang)
      localStorage.setItem('language', detectedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    // Update document language attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
  }

  const value = {
    language,
    setLanguage,
    t: translations[language],
  }

  // Prevent hydration mismatch by showing nothing until mounted
  if (!mounted) {
    return null
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}