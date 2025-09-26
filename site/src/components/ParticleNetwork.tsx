'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Points, PointMaterial } from '@react-three/drei'

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  connections: number[]
  resonance: number
}

function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const { viewport, mouse } = useThree()

  const [particles] = useState<Particle[]>(() => {
    const temp = []
    const count = 150

    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * viewport.width * 2,
        (Math.random() - 0.5) * viewport.height * 2,
        (Math.random() - 0.5) * 10
      )

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      )

      temp.push({
        position,
        velocity,
        connections: [],
        resonance: Math.random(),
      })
    }
    return temp
  })

  const positions = useMemo(() => {
    const positions = new Float32Array(particles.length * 3)
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.position.x
      positions[i * 3 + 1] = particle.position.y
      positions[i * 3 + 2] = particle.position.z
    })
    return positions
  }, [particles])

  const colors = useMemo(() => {
    const colors = new Float32Array(particles.length * 3)
    const colorA = new THREE.Color('#00d4ff')
    const colorB = new THREE.Color('#8b5cf6')
    const colorC = new THREE.Color('#ec4899')

    particles.forEach((particle, i) => {
      const mixedColor = new THREE.Color()

      if (particle.resonance < 0.33) {
        mixedColor.lerpColors(colorA, colorB, particle.resonance * 3)
      } else if (particle.resonance < 0.66) {
        mixedColor.lerpColors(colorB, colorC, (particle.resonance - 0.33) * 3)
      } else {
        mixedColor.lerpColors(colorC, colorA, (particle.resonance - 0.66) * 3)
      }

      colors[i * 3] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b
    })
    return colors
  }, [particles])

  const linePositions = useMemo(() => {
    const maxConnections = 500
    const positions = new Float32Array(maxConnections * 6)
    return positions
  }, [])

  const lineColors = useMemo(() => {
    const maxConnections = 500
    const colors = new Float32Array(maxConnections * 6)
    return colors
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current || !linesRef.current) return

    const time = clock.getElapsedTime()
    const pointsGeometry = pointsRef.current.geometry
    const linesGeometry = linesRef.current.geometry

    const positionsArray = pointsGeometry.attributes.position.array as Float32Array
    const colorsArray = pointsGeometry.attributes.color.array as Float32Array

    const linePositionsArray = linesGeometry.attributes.position.array as Float32Array
    const lineColorsArray = linesGeometry.attributes.color.array as Float32Array

    let lineIndex = 0
    const connectionDistance = 3

    particles.forEach((particle, i) => {
      // Update particle position
      particle.position.x += particle.velocity.x
      particle.position.y += particle.velocity.y
      particle.position.z += Math.sin(time * 0.5 + i * 0.1) * 0.01

      // Mouse influence
      const mouseInfluence = 0.5
      const mousePos = new THREE.Vector3(mouse.x * viewport.width / 2, mouse.y * viewport.height / 2, 0)
      const distanceToMouse = particle.position.distanceTo(mousePos)

      if (distanceToMouse < 3) {
        const force = mousePos.clone().sub(particle.position).normalize().multiplyScalar(-0.01)
        particle.velocity.add(force)
      }

      // Boundary check
      if (Math.abs(particle.position.x) > viewport.width) particle.velocity.x *= -1
      if (Math.abs(particle.position.y) > viewport.height) particle.velocity.y *= -1
      if (Math.abs(particle.position.z) > 5) particle.velocity.z *= -1

      // Apply damping
      particle.velocity.multiplyScalar(0.99)

      // Update resonance
      particle.resonance = (Math.sin(time * 0.5 + i * 0.2) + 1) / 2

      // Update positions
      positionsArray[i * 3] = particle.position.x
      positionsArray[i * 3 + 1] = particle.position.y
      positionsArray[i * 3 + 2] = particle.position.z

      // Update colors based on resonance
      const colorA = new THREE.Color('#00d4ff')
      const colorB = new THREE.Color('#8b5cf6')
      const colorC = new THREE.Color('#ec4899')
      const mixedColor = new THREE.Color()

      if (particle.resonance < 0.33) {
        mixedColor.lerpColors(colorA, colorB, particle.resonance * 3)
      } else if (particle.resonance < 0.66) {
        mixedColor.lerpColors(colorB, colorC, (particle.resonance - 0.33) * 3)
      } else {
        mixedColor.lerpColors(colorC, colorA, (particle.resonance - 0.66) * 3)
      }

      colorsArray[i * 3] = mixedColor.r
      colorsArray[i * 3 + 1] = mixedColor.g
      colorsArray[i * 3 + 2] = mixedColor.b

      // Create connections
      particle.connections = []
      for (let j = i + 1; j < particles.length; j++) {
        const distance = particle.position.distanceTo(particles[j].position)
        if (distance < connectionDistance && lineIndex < 500) {
          particle.connections.push(j)

          // Add line positions
          linePositionsArray[lineIndex * 6] = particle.position.x
          linePositionsArray[lineIndex * 6 + 1] = particle.position.y
          linePositionsArray[lineIndex * 6 + 2] = particle.position.z
          linePositionsArray[lineIndex * 6 + 3] = particles[j].position.x
          linePositionsArray[lineIndex * 6 + 4] = particles[j].position.y
          linePositionsArray[lineIndex * 6 + 5] = particles[j].position.z

          // Add line colors with alpha based on distance
          const alpha = 1 - (distance / connectionDistance)
          const lineColor = mixedColor.clone().multiplyScalar(alpha * 0.5)

          lineColorsArray[lineIndex * 6] = lineColor.r
          lineColorsArray[lineIndex * 6 + 1] = lineColor.g
          lineColorsArray[lineIndex * 6 + 2] = lineColor.b
          lineColorsArray[lineIndex * 6 + 3] = lineColor.r
          lineColorsArray[lineIndex * 6 + 4] = lineColor.g
          lineColorsArray[lineIndex * 6 + 5] = lineColor.b

          lineIndex++
        }
      }
    })

    // Clear unused lines
    for (let i = lineIndex * 6; i < linePositionsArray.length; i++) {
      linePositionsArray[i] = 0
      lineColorsArray[i] = 0
    }

    pointsGeometry.attributes.position.needsUpdate = true
    pointsGeometry.attributes.color.needsUpdate = true
    linesGeometry.attributes.position.needsUpdate = true
    linesGeometry.attributes.color.needsUpdate = true
  })

  return (
    <>
      <Points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.length}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          size={0.1}
          sizeAttenuation
          transparent
          opacity={0.8}
          vertexColors
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={500 * 2}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={500 * 2}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          transparent
          opacity={0.3}
          vertexColors
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  )
}

export default function ParticleNetwork() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      gl={{ alpha: true, antialias: false }}
      style={{ background: 'transparent' }}
    >
      <ParticleSystem />
    </Canvas>
  )
}