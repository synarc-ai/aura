'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Torus, Box } from '@react-three/drei'
import * as THREE from 'three'

function AuraCore() {
  const groupRef = useRef<THREE.Group>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const torusRefs = useRef<THREE.Mesh[]>([])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.3
      sphereRef.current.rotation.z = clock.getElapsedTime() * 0.2
    }

    torusRefs.current.forEach((torus, i) => {
      if (torus) {
        torus.rotation.x = clock.getElapsedTime() * (0.5 + i * 0.1)
        torus.rotation.y = clock.getElapsedTime() * (0.3 + i * 0.1)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <Sphere ref={sphereRef} args={[1, 32, 32]}>
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.5}
          wireframe
        />
      </Sphere>

      {/* Resonance Rings */}
      {[1.5, 2, 2.5].map((radius, i) => (
        <Torus
          key={i}
          ref={(el) => {
            if (el) torusRefs.current[i] = el
          }}
          args={[radius, 0.05, 16, 100]}
          rotation={[i * 30, i * 45, 0]}
        >
          <meshStandardMaterial
            color={['#8b5cf6', '#ec4899', '#10b981'][i]}
            emissive={['#8b5cf6', '#ec4899', '#10b981'][i]}
            emissiveIntensity={0.3}
          />
        </Torus>
      ))}

      {/* Semantic Nodes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = Math.cos(angle) * 3
        const z = Math.sin(angle) * 3
        const y = Math.sin(angle * 2) * 0.5

        return (
          <group key={i} position={[x, y, z]}>
            <Box args={[0.2, 0.2, 0.2]}>
              <meshStandardMaterial
                color="#fbbf24"
                emissive="#fbbf24"
                emissiveIntensity={0.4}
              />
            </Box>
            <pointLight
              color="#fbbf24"
              intensity={0.5}
              distance={2}
            />
          </group>
        )
      })}
    </group>
  )
}

export default function AuraVisualization() {
  return (
    <div className="w-full h-[400px] glass-morphism rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <AuraCore />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <fog attach="fog" args={['#000000', 5, 15]} />
      </Canvas>
    </div>
  )
}