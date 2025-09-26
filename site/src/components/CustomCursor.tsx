'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const cursorTrailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    const cursorRing = cursorRingRef.current
    const cursorTrail = cursorTrailRef.current

    if (!cursor || !cursorDot || !cursorRing || !cursorTrail) return

    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0
    let speed = 0.2

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      gsap.to(cursorDot, {
        x: mouseX - 4,
        y: mouseY - 4,
        duration: 0,
      })

      gsap.to(cursorRing, {
        x: mouseX - 24,
        y: mouseY - 24,
        duration: 0.15,
        ease: 'power2.out',
      })

      gsap.to(cursorTrail, {
        x: mouseX - 12,
        y: mouseY - 12,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseDown = () => {
      gsap.to(cursorRing, {
        scale: 0.8,
        duration: 0.1,
      })
      gsap.to(cursorDot, {
        scale: 1.5,
        duration: 0.1,
      })
    }

    const handleMouseUp = () => {
      gsap.to(cursorRing, {
        scale: 1,
        duration: 0.2,
      })
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.2,
      })
    }

    const handleMouseEnterLink = () => {
      gsap.to(cursorRing, {
        scale: 1.5,
        borderWidth: '1px',
        duration: 0.3,
      })
      gsap.to(cursorDot, {
        scale: 0,
        duration: 0.3,
      })
    }

    const handleMouseLeaveLink = () => {
      gsap.to(cursorRing, {
        scale: 1,
        borderWidth: '2px',
        duration: 0.3,
      })
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.3,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    const links = document.querySelectorAll('a, button, .clickable')
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnterLink)
      link.addEventListener('mouseleave', handleMouseLeaveLink)
    })

    const animateTrail = () => {
      currentX += (mouseX - currentX) * speed
      currentY += (mouseY - currentY) * speed

      const trail = document.createElement('div')
      trail.className = 'cursor-trail-particle'
      trail.style.left = currentX + 'px'
      trail.style.top = currentY + 'px'
      document.body.appendChild(trail)

      gsap.to(trail, {
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          trail.remove()
        }
      })

      requestAnimationFrame(animateTrail)
    }

    const animationFrame = requestAnimationFrame(animateTrail)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnterLink)
        link.removeEventListener('mouseleave', handleMouseLeaveLink)
      })
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor">
        <div
          ref={cursorDotRef}
          className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        />
        <div
          ref={cursorRingRef}
          className="fixed w-12 h-12 border-2 border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
        />
        <div
          ref={cursorTrailRef}
          className="fixed w-6 h-6 bg-gradient-to-r from-synarc-blue to-synarc-purple rounded-full pointer-events-none z-[9997] opacity-50 blur-sm"
        />
      </div>

      <style jsx global>{`
        .cursor-trail-particle {
          position: fixed;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #00d4ff, #8b5cf6);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9996;
        }
      `}</style>
    </>
  )
}