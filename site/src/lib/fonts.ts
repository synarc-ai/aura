import localFont from 'next/font/local'
import { Inter } from 'next/font/google'

// Fallback font - always available
export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '700'],
  variable: '--font-inter-fallback',
  display: 'swap',
})

// Sansation - clean geometric typeface
// NOTE: Download Sansation font files and place them in src/fonts/
// See src/fonts/README.md for download instructions
export const sansation = localFont({
  src: [
    {
      path: '../fonts/Sansation-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Sansation-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Sansation-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sansation',
  display: 'swap',
  fallback: ['Inter', 'system-ui', 'sans-serif'],
})