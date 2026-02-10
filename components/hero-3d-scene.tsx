"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "@/components/theme-provider"

// Animated floating sphere with theme-aware colors
function AnimatedSphere({ position, color, size, speed = 1, distort = 0.4 }: { 
  position: [number, number, number]
  color: string
  size: number
  speed?: number
  distort?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} position={position} args={[size, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

// Particle field that adapts to theme
function ParticleField({ isDark }: { isDark: boolean }) {
  const count = 500
  const particlesRef = useRef<THREE.Points>(null)
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      
      if (isDark) {
        // Cyan to teal gradient for dark mode
        colors[i * 3] = 0.3 + Math.random() * 0.3
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.3
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
      } else {
        // Blue to indigo gradient for light mode
        colors[i * 3] = 0.1 + Math.random() * 0.2
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.3
        colors[i * 3 + 2] = 0.7 + Math.random() * 0.3
      }
    }
    
    return [positions, colors]
  }, [isDark])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={isDark ? 0.8 : 0.6}
        sizeAttenuation
      />
    </points>
  )
}

function Scene({ isDark }: { isDark: boolean }) {
  // Theme-aware colors
  const primaryColor = isDark ? "#4ecdc4" : "#0891b2"
  const secondaryColor = isDark ? "#26a69a" : "#0d9488"
  const tertiaryColor = isDark ? "#2dd4bf" : "#14b8a6"
  const accentColor = isDark ? "#14b8a6" : "#0f766e"

  return (
    <>
      <ambientLight intensity={isDark ? 0.2 : 0.4} />
      <pointLight position={[10, 10, 10]} intensity={isDark ? 1 : 0.8} color={primaryColor} />
      <pointLight position={[-10, -10, -10]} intensity={isDark ? 0.5 : 0.4} color={secondaryColor} />
      <spotLight position={[0, 10, 0]} intensity={isDark ? 0.5 : 0.7} color="#ffffff" />
      
      {/* Main central sphere */}
      <AnimatedSphere position={[0, 0, 0]} color={primaryColor} size={1.5} distort={0.3} />
      
      {/* Surrounding smaller spheres */}
      <AnimatedSphere position={[-4, 2, -3]} color={secondaryColor} size={0.5} speed={0.7} distort={0.5} />
      <AnimatedSphere position={[4, -1, -2]} color={tertiaryColor} size={0.3} speed={1.2} distort={0.6} />
      <AnimatedSphere position={[-3, -2, 2]} color={accentColor} size={0.4} speed={0.9} distort={0.4} />
      <AnimatedSphere position={[3.5, 2, -1]} color={isDark ? "#22d3ee" : "#06b6d4"} size={0.35} speed={1.1} distort={0.45} />
      
      {/* Particle field */}
      <ParticleField isDark={isDark} />
      
      {/* Stars - adjusted for theme */}
      <Stars 
        radius={100} 
        depth={50} 
        count={isDark ? 1500 : 800} 
        factor={4} 
        saturation={isDark ? 0 : 0.3} 
        fade 
        speed={1} 
      />
    </>
  )
}

export default function Hero3DScene() {
  const { theme } = useTheme()
  const isDark = theme !== "light"

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene isDark={isDark} />
      </Canvas>
      {/* Gradient overlay that adapts to theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
    </div>
  )
}
