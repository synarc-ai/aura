'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'

// TypeScript declaration for our custom shader material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      semanticFieldMaterial: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          ref?: any;
          transparent?: boolean;
          depthWrite?: boolean;
          blending?: any;
        },
        HTMLElement
      >;
    }
  }
}

const SemanticFieldMaterial = shaderMaterial(
  {
    time: 0,
    mouse: new THREE.Vector2(0.5, 0.5),
    resolution: new THREE.Vector2(1, 1),
    colorA: new THREE.Color('#00d4ff'),
    colorB: new THREE.Color('#8b5cf6'),
    colorC: new THREE.Color('#ec4899'),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    uniform float time;

    void main() {
      vUv = uv;
      vNormal = normal;
      vPosition = position;

      vec3 pos = position;

      // Semantic wave distortion
      float frequency = 2.0;
      float amplitude = 0.1;

      pos.z += sin(pos.x * frequency + time) * amplitude;
      pos.z += cos(pos.y * frequency + time * 0.8) * amplitude * 0.5;

      // Resonance effect
      float resonance = sin(time * 0.5) * 0.05;
      pos.z += resonance * sin(length(pos.xy) * 10.0 - time * 2.0);

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec2 mouse;
    uniform vec2 resolution;
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform vec3 colorC;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    // Simplex noise function
    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 permute(vec4 x) {
      return mod289(((x*34.0)+1.0)*x);
    }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      // Mouse influence
      vec2 mouseInfluence = (mouse - 0.5) * 2.0;
      float mouseDistance = length(vUv - mouse);

      // Semantic field noise
      vec3 noisePos = vec3(vUv * 5.0, time * 0.2);
      float noise = snoise(noisePos) * 0.5 + 0.5;

      // Resonance patterns
      float resonance = sin(length(vUv - 0.5) * 20.0 - time * 3.0) * 0.5 + 0.5;
      resonance *= sin(time + vUv.x * 10.0) * 0.5 + 0.5;

      // Psi-field waves
      float psiField = sin(vUv.x * 10.0 + time) * sin(vUv.y * 10.0 + time * 1.3);
      psiField = smoothstep(0.0, 1.0, psiField * 0.5 + 0.5);

      // Color mixing
      vec3 color = mix(colorA, colorB, noise);
      color = mix(color, colorC, resonance * 0.5);

      // Mouse glow effect
      float mouseGlow = exp(-mouseDistance * 5.0);
      color += vec3(0.2, 0.1, 0.3) * mouseGlow;

      // Semantic gravity effect
      float gravity = 1.0 / (1.0 + mouseDistance * 2.0);
      color = mix(color, vec3(1.0), gravity * 0.1);

      // Final output
      float alpha = noise * 0.8 + 0.2;
      alpha *= (1.0 - mouseDistance * 0.5);

      gl_FragColor = vec4(color, alpha * 0.6);
    }
  `
)

extend({ SemanticFieldMaterial })

function SemanticFieldMesh() {
  const meshRef = useRef<any>(null)
  const materialRef = useRef<any>(null)
  const noise = useMemo(() => createNoise3D(), [])

  useFrame(({ clock, mouse }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.getElapsedTime()
      materialRef.current.mouse.x = (mouse.x + 1) / 2
      materialRef.current.mouse.y = (mouse.y + 1) / 2
    }

    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} scale={[15, 15, 1]}>
      <planeGeometry args={[1, 1, 128, 128]} />
      {/* @ts-ignore - custom shader material */}
      <semanticFieldMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export default function SemanticField() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <SemanticFieldMesh />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}