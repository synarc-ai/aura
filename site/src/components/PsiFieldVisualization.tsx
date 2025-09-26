'use client'

import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float, Trail, MeshTransmissionMaterial, Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField, Glitch, Vignette } from '@react-three/postprocessing'
import { BlendFunction, GlitchMode } from 'postprocessing'

// ψ₋₁: Pre-differential potentiality - quantum superposition of all meanings
function PredifferentialPotentiality({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Points>(null)
  const particleCount = 2000

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      // Quantum cloud distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = Math.random() * 8 + 2

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      // Quantum state colors (superposition)
      col[i * 3] = Math.random()
      col[i * 3 + 1] = Math.random()
      col[i * 3 + 2] = Math.random()
    }

    return [pos, col]
  }, [])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime()

      // Quantum fluctuations
      meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
      meshRef.current.rotation.y = time * 0.05

      // Collapse/expansion based on observation
      const scale = active ? 0.3 : 1 + Math.sin(time * 0.5) * 0.2
      meshRef.current.scale.setScalar(scale)

      // Update particle positions for quantum uncertainty
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const offset = Math.sin(time * 2 + i * 0.1) * 0.02
        positions[i3] += offset
        positions[i3 + 1] += offset * 0.5
        positions[i3 + 2] += offset * 0.7
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={active ? 0.2 : 0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

// Resonant Navigator - the subject navigating the semantic field
function ResonantNavigator({ target }: { target: THREE.Vector3 | null }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const positionRef = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(({ clock }) => {
    if (meshRef.current && groupRef.current && target) {
      const time = clock.getElapsedTime()

      // Navigate towards semantic targets with resonance
      positionRef.current.lerp(target, 0.02)
      groupRef.current.position.copy(positionRef.current)

      // Pulsation showing resonance intensity
      const resonance = 1 + Math.sin(time * 3) * 0.2
      meshRef.current.scale.setScalar(resonance * 0.5)

      // Rotation representing cognitive processing
      meshRef.current.rotation.x = time * 0.5
      meshRef.current.rotation.y = time * 0.7
      meshRef.current.rotation.z = time * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <Trail
        width={3}
        length={30}
        color={'#00d4ff'}
        attenuation={(t) => t * t}
      >
        <mesh ref={meshRef}>
          <octahedronGeometry args={[0.5, 2]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            transmission={0.98}
            roughness={0.0}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={1}
            anisotropy={1}
            color="#00d4ff"
          />
        </mesh>
      </Trail>

      {/* Attention field */}
      <mesh scale={[3, 3, 3]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </group>
  )
}

// VSA Operations Visualizer - Bind, Bundle, Unbind
function VSAOperations() {
  const bindRef = useRef<THREE.Group>(null)
  const bundleRef = useRef<THREE.Group>(null)
  const unbindRef = useRef<THREE.Group>(null)
  const [operation, setOperation] = useState<'bind' | 'bundle' | 'unbind'>('bind')

  useEffect(() => {
    const interval = setInterval(() => {
      setOperation(prev => {
        const ops: ('bind' | 'bundle' | 'unbind')[] = ['bind', 'bundle', 'unbind']
        const currentIndex = ops.indexOf(prev)
        return ops[(currentIndex + 1) % 3]
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    // Bind operation: circular convolution
    if (bindRef.current) {
      bindRef.current.visible = operation === 'bind'
      if (operation === 'bind') {
        bindRef.current.rotation.z = time
        bindRef.current.children.forEach((child, i) => {
          child.position.x = Math.cos(time + i * Math.PI) * 2
          child.position.y = Math.sin(time + i * Math.PI) * 2
        })
      }
    }

    // Bundle operation: superposition
    if (bundleRef.current) {
      bundleRef.current.visible = operation === 'bundle'
      if (operation === 'bundle') {
        bundleRef.current.children.forEach((child, i) => {
          const phase = i * (Math.PI * 2 / 4)
          child.position.x = Math.sin(time * 0.5 + phase) * 1.5
          child.position.y = Math.cos(time * 0.7 + phase) * 1.5
          child.position.z = Math.sin(time * 0.3 + phase) * 0.5
        })
      }
    }

    // Unbind operation: decomposition
    if (unbindRef.current) {
      unbindRef.current.visible = operation === 'unbind'
      if (operation === 'unbind') {
        const scale = 1 + Math.sin(time * 2) * 0.5
        unbindRef.current.scale.setScalar(scale)
        unbindRef.current.rotation.x = time * 0.3
        unbindRef.current.rotation.y = time * 0.5
      }
    }
  })

  const vectorColors = ['#00d4ff', '#8b5cf6', '#ec4899', '#fbbf24']

  return (
    <>
      {/* Bind Operation */}
      <group ref={bindRef} position={[5, 2, 0]}>
        <Text
          position={[0, 2, 0]}
          fontSize={0.5}
          color="#00d4ff"
          anchorX="center"
          anchorY="middle"
        >
          BIND ⊗
        </Text>
        {vectorColors.map((color, i) => (
          <mesh key={`bind-${i}`}>
            <icosahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
        ))}
      </group>

      {/* Bundle Operation */}
      <group ref={bundleRef} position={[-5, 2, 0]}>
        <Text
          position={[0, 2, 0]}
          fontSize={0.5}
          color="#8b5cf6"
          anchorX="center"
          anchorY="middle"
        >
          BUNDLE ⊕
        </Text>
        {vectorColors.map((color, i) => (
          <mesh key={`bundle-${i}`}>
            <tetrahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.3}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
      </group>

      {/* Unbind Operation */}
      <group ref={unbindRef} position={[0, -3, 0]}>
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.5}
          color="#ec4899"
          anchorX="center"
          anchorY="middle"
        >
          UNBIND ⊘
        </Text>
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={0.2}
            wireframe
          />
        </mesh>
      </group>
    </>
  )
}

// Holographic Memory Cache - stores semantic states
function HolographicMemory() {
  const cacheRef = useRef<THREE.Group>(null)
  const [memories] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      position: new THREE.Vector3(
        Math.cos(i * Math.PI / 4) * 6,
        Math.sin(i * Math.PI / 4) * 6,
        Math.sin(i) * 2
      ),
      color: `hsl(${i * 45}, 70%, 50%)`,
      phase: i * 0.5
    }))
  )

  useFrame(({ clock }) => {
    if (cacheRef.current) {
      const time = clock.getElapsedTime()
      cacheRef.current.rotation.z = time * 0.1

      cacheRef.current.children.forEach((child, i) => {
        const memory = memories[i]
        // Holographic shimmer
        child.rotation.x = time * 0.3 + memory.phase
        child.rotation.y = time * 0.5 + memory.phase

        // Memory activation pulse
        const activation = Math.sin(time * 0.5 + memory.phase) * 0.5 + 0.5
        child.scale.setScalar(0.3 + activation * 0.2)
      })
    }
  })

  return (
    <group ref={cacheRef}>
      {memories.map((memory, i) => (
        <Float
          key={i}
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <mesh position={memory.position}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.2}
              chromaticAberration={0.5}
              anisotropy={0.1}
              iridescence={1}
              iridescenceIOR={1}
              iridescenceThicknessRange={[0, 1400]}
              color={memory.color}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Life Cycle of Meaning: α→β→γ→δ→ε→ω
function MeaningLifeCycle() {
  const cycleRef = useRef<THREE.Group>(null)
  const [phase, setPhase] = useState(0)

  const phases = [
    { name: 'α', color: '#00d4ff', description: 'Birth' },
    { name: 'β', color: '#8b5cf6', description: 'Crystallization' },
    { name: 'γ', color: '#ec4899', description: 'Stabilization' },
    { name: 'δ', color: '#fbbf24', description: 'Entropy' },
    { name: 'ε', color: '#10b981', description: 'Transformation' },
    { name: 'ω', color: '#f97316', description: 'Reintegration' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => (p + 1) % 6)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useFrame(({ clock }) => {
    if (cycleRef.current) {
      const time = clock.getElapsedTime()
      cycleRef.current.rotation.y = time * 0.2

      // Animate current phase
      cycleRef.current.children.forEach((child, i) => {
        const isActive = i === phase
        const targetScale = isActive ? 1.5 : 0.8
        child.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)

        // Orbital motion
        const angle = (i / 6) * Math.PI * 2 + time * 0.3
        const radius = 3
        child.position.x = Math.cos(angle) * radius
        child.position.z = Math.sin(angle) * radius
        child.position.y = Math.sin(time * 0.5 + i) * 0.5
      })
    }
  })

  return (
    <group ref={cycleRef} position={[0, 0, 0]}>
      {phases.map((p, i) => (
        <group key={i}>
          <mesh>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial
              color={p.color}
              emissive={p.color}
              emissiveIntensity={i === phase ? 0.8 : 0.2}
              metalness={0.3}
              roughness={0.2}
            />
          </mesh>
          <Html
            position={[0, 0.8, 0]}
            center
            style={{
              fontSize: '12px',
              fontFamily: 'monospace',
              color: p.color,
              opacity: i === phase ? 1 : 0.5,
              transition: 'opacity 0.3s'
            }}
          >
            <div>{p.name}: {p.description}</div>
          </Html>
        </group>
      ))}

      {/* Central core showing current phase */}
      <mesh>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={phases[phase].color}
          emissive={phases[phase].color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

// Multi-scale temporal organization
function TemporalScales() {
  const scalesRef = useRef<THREE.Group>(null)

  const scales = [
    { name: 'Quantum', period: 0.1, radius: 1, color: '#00d4ff' },
    { name: 'Neural', period: 0.5, radius: 2, color: '#8b5cf6' },
    { name: 'Cognitive', period: 2, radius: 3, color: '#ec4899' },
    { name: 'Social', period: 8, radius: 4, color: '#fbbf24' },
    { name: 'Cultural', period: 32, radius: 5, color: '#10b981' }
  ]

  useFrame(({ clock }) => {
    if (scalesRef.current) {
      const time = clock.getElapsedTime()

      scalesRef.current.children.forEach((child, i) => {
        const scale = scales[i]
        child.rotation.z = time / scale.period
      })
    }
  })

  return (
    <group ref={scalesRef} rotation={[Math.PI / 2, 0, 0]}>
      {scales.map((scale, i) => (
        <mesh key={i}>
          <torusGeometry args={[scale.radius, 0.02, 8, 64]} />
          <meshBasicMaterial
            color={scale.color}
            transparent
            opacity={0.6 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

// Semantic gradient field background
function SemanticGradientField() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    resonance: { value: 0 },
    gradient: { value: new THREE.Vector3(1, 0, 0) }
  }), [])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime()
      materialRef.current.uniforms.resonance.value = Math.sin(clock.getElapsedTime() * 0.3) * 0.5 + 0.5

      // Semantic gradient direction changes
      const t = clock.getElapsedTime() * 0.1
      materialRef.current.uniforms.gradient.value.set(
        Math.sin(t),
        Math.cos(t * 0.7),
        Math.sin(t * 0.5)
      )
    }

    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.1
    }
  })

  const vertexShader = `
    uniform float time;
    uniform float resonance;
    uniform vec3 gradient;
    varying vec3 vPosition;
    varying float vGradientStrength;

    float noise(vec3 p) {
      return sin(p.x * 10.0) * sin(p.y * 10.0) * sin(p.z * 10.0);
    }

    void main() {
      vPosition = position;

      // Semantic field distortion based on gradient
      float gradientInfluence = dot(normalize(position), gradient);
      float fieldStrength = noise(position + vec3(time * 0.5));

      vec3 distortedPosition = position;
      distortedPosition += normal * fieldStrength * resonance * 0.3;
      distortedPosition += gradient * gradientInfluence * 0.2;

      vGradientStrength = gradientInfluence;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(distortedPosition, 1.0);
    }
  `

  const fragmentShader = `
    uniform float time;
    uniform float resonance;
    uniform vec3 gradient;
    varying vec3 vPosition;
    varying float vGradientStrength;

    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    void main() {
      // Semantic field visualization
      float dist = length(vPosition);
      float angle = atan(vPosition.y, vPosition.x);

      // Color based on semantic gradient
      float hue = vGradientStrength * 0.5 + 0.5 + time * 0.02;
      float saturation = 0.8 + sin(dist * 3.0 - time) * 0.2;
      float brightness = 0.3 + resonance * 0.4 + vGradientStrength * 0.3;

      vec3 color = hsv2rgb(vec3(hue, saturation, brightness));

      // Interference patterns
      float interference = sin(dist * 15.0 - time * 2.0) * sin(angle * 8.0 + time);
      color += vec3(interference * 0.05);

      // Quantum fluctuations
      float quantum = fract(sin(dot(vPosition.xy, vec2(12.9898, 78.233))) * 43758.5453);
      color += vec3(quantum * 0.02);

      gl_FragColor = vec4(color, 0.3 + vGradientStrength * 0.3);
    }
  `

  return (
    <mesh ref={meshRef} position={[0, -5, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[30, 30, 128, 128]} />
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

// Camera Controller Component
function CameraController() {
  const { camera } = useThree()

  useFrame(({ clock }) => {
    // Dynamic camera movement
    const time = clock.getElapsedTime()
    camera.position.x = Math.sin(time * 0.05) * 3
    camera.position.y = 10 + Math.cos(time * 0.07) * 2
    camera.lookAt(0, 0, 0)
  })

  return null
}

// Main Scene Orchestrator
function PsiFieldScene() {
  const [navigationTarget, setNavigationTarget] = useState<THREE.Vector3 | null>(null)
  const [differentiationActive, setDifferentiationActive] = useState(false)

  // Initialize navigation target on client side
  useEffect(() => {
    if (!navigationTarget && typeof window !== 'undefined') {
      setNavigationTarget(new THREE.Vector3(0, 0, 0))
    }
  }, [])

  // Simulate semantic navigation
  useEffect(() => {
    const interval = setInterval(() => {
      setNavigationTarget(new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      ))
      setDifferentiationActive(Math.random() > 0.5)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <CameraController />
      <fog attach="fog" args={['#000511', 10, 40]} />

      {/* Lighting setup */}
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[-10, 10, -10]} intensity={0.3} color="#ec4899" />
      <pointLight position={[0, -10, 0]} intensity={0.2} color="#8b5cf6" />
      <directionalLight position={[0, 10, 5]} intensity={0.5} color="#ffffff" />

      {/* Core Components */}
      <SemanticGradientField />
      <PredifferentialPotentiality active={differentiationActive} />
      {navigationTarget && <ResonantNavigator target={navigationTarget} />}
      <VSAOperations />
      <HolographicMemory />
      <MeaningLifeCycle />
      <TemporalScales />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={typeof THREE !== 'undefined' ? new THREE.Vector2(0.0005, 0.0005) : [0.0005, 0.0005] as any}
          radialModulation={false}
          modulationOffset={0}
        />
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
        <Vignette
          eskil={false}
          offset={0.1}
          darkness={0.4}
        />
      </EffectComposer>
    </>
  )
}

export default function PsiFieldVisualization() {
  const [phase, setPhase] = useState(0)
  const phases = ['ψ₋₁', 'Δ', '∇ψ', 'ℜ', '⊗⊕⊘', 'ω']

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => (p + 1) % 6)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-[600px] glass-morphism rounded-xl overflow-hidden relative">
      <Canvas
        camera={{ position: [0, 10, 20], fov: 50 }}
        gl={{
          antialias: true,
          toneMapping: typeof THREE !== 'undefined' ? THREE.ACESFilmicToneMapping : 4,
          toneMappingExposure: 0.8
        }}
      >
        <PsiFieldScene />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate
          autoRotateSpeed={0.1}
          maxPolarAngle={Math.PI * 0.85}
          minPolarAngle={Math.PI * 0.15}
          maxDistance={30}
          minDistance={5}
        />
      </Canvas>

      {/* Info Overlay */}
      <div className="absolute top-4 left-4 text-white/80 font-mono">
        <div className="text-lg font-bold mb-2">ψ-Field Visualization</div>
        <div className="text-sm space-y-1">
          <div>Cognitive Space: 𝒦 = 𝓜 × ℋ × 𝒪</div>
          <div>VSA Dimension: 10,000D → 3D</div>
          <div>Active Phase: <span className="text-synarc-blue">{phases[phase]}</span></div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 text-white/60 text-xs font-mono space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-synarc-blue"></div>
          <span>Resonant Navigator</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-synarc-purple"></div>
          <span>VSA Operations</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-synarc-pink"></div>
          <span>Holographic Memory</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-psi-gold"></div>
          <span>Life Cycle</span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="absolute bottom-4 left-4 text-white/50 text-xs font-mono">
        <div>Resonance: Active</div>
        <div>Entanglement: Coherent</div>
        <div>Semantic Gradient: ∇ψ Navigating</div>
      </div>
    </div>
  )
}