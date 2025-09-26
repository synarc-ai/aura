'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float, Trail, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

// Semantic field gradient visualization with wave functions
function SemanticField({ phase }: { phase: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    phase: { value: 0 },
    resonance: { value: 0 },
  }), [])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime()
      materialRef.current.uniforms.phase.value = phase
      materialRef.current.uniforms.resonance.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5
    }
  })

  const vertexShader = `
    uniform float time;
    uniform float phase;
    uniform float resonance;
    varying vec3 vPosition;
    varying float vDistortion;

    void main() {
      vPosition = position;

      // Semantic field distortion
      float dist = length(position.xy);
      float wave = sin(dist * 3.0 - time * 2.0) * 0.2;
      float spiral = sin(atan(position.y, position.x) * 5.0 + time) * 0.1;

      vec3 distortedPosition = position;
      distortedPosition.z += wave * resonance;
      distortedPosition.xy += normalize(position.xy) * spiral * phase;

      vDistortion = wave + spiral;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(distortedPosition, 1.0);
    }
  `

  const fragmentShader = `
    uniform float time;
    uniform float phase;
    uniform float resonance;
    varying vec3 vPosition;
    varying float vDistortion;

    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    void main() {
      float dist = length(vPosition.xy);
      float angle = atan(vPosition.y, vPosition.x);

      // Multi-dimensional gradient
      float hue = (angle / 3.14159 * 0.5 + 0.5) * 0.8 + time * 0.05;
      float saturation = 0.7 + sin(dist * 5.0 - time * 2.0) * 0.3;
      float brightness = 0.5 + vDistortion * 0.5 + resonance * 0.3;

      vec3 color = hsv2rgb(vec3(hue, saturation, brightness));

      // Holographic interference pattern
      float interference = sin(dist * 20.0 - time * 3.0) * sin(angle * 10.0 + time * 2.0);
      color += vec3(interference * 0.1);

      // Phase-based color shift
      color = mix(color, vec3(0.0, 0.8, 1.0), phase * 0.3);

      gl_FragColor = vec4(color, 0.6 + vDistortion * 0.4);
    }
  `

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

// Hypervector representation (10,000-dimensional projected to 3D)
function HyperVector({ position, color, index }: { position: [number, number, number], color: string, index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const trailRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime()

      // Complex trajectory in high-dimensional space projection
      const phase = index * 0.5
      meshRef.current.position.x = position[0] + Math.sin(t * 0.7 + phase) * 2
      meshRef.current.position.y = position[1] + Math.cos(t * 0.5 + phase) * Math.sin(t * 0.3) * 2
      meshRef.current.position.z = position[2] + Math.sin(t * 0.9 + phase) * Math.cos(t * 0.4) * 2

      // Pulsation representing semantic activation
      const scale = 0.8 + Math.sin(t * 2 + index) * 0.2
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <Trail
      width={2}
      length={20}
      color={color}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
    </Trail>
  )
}

// Resonance rings representing cognitive cycles
function ResonanceRing({ radius, speed, color, phase }: { radius: number, speed: number, color: string, phase: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = clock.getElapsedTime() * speed
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
    }
    if (ringRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2 + phase) * 0.1
      ringRef.current.scale.set(scale, scale, 1)
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, 0.05, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

// Hierarchical binding tree structure
function BindingTree({ level = 0, position = [0, 0, 0] as [number, number, number], maxLevel = 3 }: any) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2 + level) * 0.1
    }
  })

  if (level > maxLevel) return null

  const childPositions: [number, number, number][] = [
    [1.5, 0.5, 0],
    [-1.5, 0.5, 0],
    [0, 0.5, 1.5],
    [0, 0.5, -1.5],
  ]

  return (
    <group ref={groupRef} position={position}>
      {/* Node */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <octahedronGeometry args={[0.2 * (1 - level * 0.2), 0]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.5}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.2}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
            color="#00d4ff"
          />
        </mesh>
      </Float>

      {/* Connections */}
      {level < maxLevel && childPositions.map((childPos, i) => (
        <group key={i}>
          {/* Connection line */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([0, 0, 0, ...childPos]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#8b5cf6" opacity={0.3} transparent />
          </line>

          {/* Child node */}
          <BindingTree level={level + 1} position={childPos} maxLevel={maxLevel} />
        </group>
      ))}
    </group>
  )
}

// Central consciousness core with phase transitions
function ConsciousnessCore() {
  const coreRef = useRef<THREE.Mesh>(null)
  const [phase, setPhase] = useState(0)

  // Life cycle phases: α→β→γ→δ→ε→ω
  const phases = ['#00d4ff', '#8b5cf6', '#ec4899', '#fbbf24', '#10b981', '#f97316']

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p + 1) % 6)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useFrame(({ clock }) => {
    if (coreRef.current) {
      const t = clock.getElapsedTime()

      // Complex rotation representing cognitive processing
      coreRef.current.rotation.x = Math.sin(t * 0.3) * 0.5
      coreRef.current.rotation.y = t * 0.2
      coreRef.current.rotation.z = Math.cos(t * 0.4) * 0.3

      // Breathing effect
      const scale = 1 + Math.sin(t * 2) * 0.1
      coreRef.current.scale.setScalar(scale)
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[1.5, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={256}
          transmission={0.95}
          roughness={0.0}
          thickness={1.5}
          ior={1.5}
          chromaticAberration={1}
          anisotropy={1}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.2}
          color={phases[phase]}
        />
      </mesh>
    </Float>
  )
}

// Information flow particles
function InfoParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 500

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 5 + Math.random() * 5

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05

      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const t = clock.getElapsedTime() + i * 0.01

        // Spiral motion
        const r = 5 + Math.sin(t * 0.5) * 2
        const theta = t * 0.3 + i * 0.1
        positions[i3] += Math.sin(t * 2) * 0.01
        positions[i3 + 1] += Math.cos(t * 2) * 0.01
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

// Main scene composition
function Scene() {
  const { camera } = useThree()

  useFrame(({ clock }) => {
    // Subtle camera movement
    camera.position.x = Math.sin(clock.getElapsedTime() * 0.1) * 2
    camera.position.y = Math.cos(clock.getElapsedTime() * 0.1) * 1
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <fog attach="fog" args={['#000511', 5, 30]} />

      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[-10, -10, 10]} intensity={0.3} color="#ec4899" />
      <pointLight position={[0, 0, -10]} intensity={0.2} color="#8b5cf6" />

      {/* Semantic field background */}
      <SemanticField phase={0} />

      {/* Central consciousness core */}
      <ConsciousnessCore />

      {/* Hypervectors in orbital motion */}
      {[
        { pos: [3, 0, 0], color: '#00d4ff' },
        { pos: [-3, 0, 0], color: '#ec4899' },
        { pos: [0, 3, 0], color: '#8b5cf6' },
        { pos: [0, -3, 0], color: '#fbbf24' },
        { pos: [0, 0, 3], color: '#10b981' },
        { pos: [0, 0, -3], color: '#f97316' },
      ].map((config, i) => (
        <HyperVector
          key={i}
          position={config.pos as [number, number, number]}
          color={config.color}
          index={i}
        />
      ))}

      {/* Resonance rings */}
      <ResonanceRing radius={4} speed={0.3} color="#00d4ff" phase={0} />
      <ResonanceRing radius={5} speed={-0.2} color="#8b5cf6" phase={1} />
      <ResonanceRing radius={6} speed={0.1} color="#ec4899" phase={2} />

      {/* Hierarchical binding tree */}
      <group position={[0, -3, 0]}>
        <BindingTree level={0} position={[0, 0, 0]} maxLevel={2} />
      </group>

      {/* Information flow particles */}
      <InfoParticles />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.001, 0.001)}
          radialModulation={false}
          modulationOffset={0}
        />
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={3}
          height={480}
        />
      </EffectComposer>
    </>
  )
}

export default function MultidimensionalField() {
  return (
    <div className="w-full h-[500px] glass-morphism rounded-xl overflow-hidden relative">
      <Canvas
        camera={{ position: [0, 5, 15], fov: 60 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Scene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI * 0.75}
          minPolarAngle={Math.PI * 0.25}
        />
      </Canvas>

      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 text-white/60 text-sm font-mono">
        <div>10,000D → 3D Projection</div>
        <div>ψ-Field Resonance Active</div>
        <div className="text-xs mt-1 opacity-50">Phase Transitions: α→β→γ→δ→ε→ω</div>
      </div>
    </div>
  )
}