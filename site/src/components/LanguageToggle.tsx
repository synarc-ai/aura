'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/lib/i18n/context'

export default function LanguageToggle() {
  const { language, setLanguage, t } = useI18n()

  return (
    <motion.div
      className="fixed top-8 right-20 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.button
        className="glass-morphism px-6 py-3 rounded-full flex items-center gap-3 clickable"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={language}
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            {language === 'en' ? (
              <>
                <span className="text-2xl">🇬🇧</span>
                {/* <span className="font-sansation font-medium">EN</span> */}
              </>
            ) : (
              <>
                <span className="text-2xl">🇷🇺</span>
                {/* <span className="font-sansation font-medium">RU</span> */}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Animated switch indicator */}
        <motion.div
          className="relative w-12 h-6 bg-gray-700 rounded-full"
          whileHover={{ backgroundColor: 'rgba(0, 212, 255, 0.2)' }}
        >
          <motion.div
            className="absolute top-1 w-4 h-4 bg-synarc-blue rounded-full"
            animate={{
              left: language === 'en' ? '4px' : '24px',
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </motion.div>
      </motion.button>

      {/* Tooltip */}
      <motion.div
        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded text-sm text-gray-300 whitespace-nowrap">
          {language === 'en' ? t.common.switchToRussian : t.common.switchToEnglish}
        </div>
      </motion.div>
    </motion.div>
  )
}