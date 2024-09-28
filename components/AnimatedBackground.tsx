import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Mesh, ShaderMaterial, Vector2, Vector3 } from 'three'

const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  uniform vec3 mousePosition;
  uniform float isMobile;

  vec3 palette( float t ) {
    vec3 a = vec3(0.05, 0.05, 0.05);
    vec3 b = vec3(0.1, 0.1, 0.1);
    vec3 c = vec3(0.3, 0.3, 0.3);
    vec3 d = vec3(0.05, 0.1, 0.15);
    return a + b*cos( 6.28318*(c*t+d) );
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);
    
    float iterations = isMobile > 0.5 ? 1.0 : 2.0;
    for (float i = 0.0; i < iterations; i++) {
      uv = fract(uv * 1.2) - 0.5;

      float d = length(uv) * exp(-length(uv0));

      vec3 col = palette(length(uv0) + i*.1 + time*.1);

      d = sin(d*4. + time*0.5)/10.;
      d = abs(d);

      d = pow(0.01 / d, 1.1);

      finalColor += col * d;
    }
    
    // Add subtle mouse interaction
    float mouseDist = length(uv - mousePosition.xy);
    finalColor += vec3(0.02, 0.04, 0.06) / (mouseDist + 1.0);
    
    // Add subtle pulsating effect
    float pulse = sin(time * 0.5) * 0.5 + 0.5;
    finalColor *= 0.95 + pulse * 0.05;
    
    // Darken the overall effect
    finalColor *= isMobile > 0.5 ? 0.3 : 0.4;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

function FluidBackground() {
  const meshRef = useRef<Mesh>(null)
  const { size, mouse } = useThree()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new Vector2() },
        mousePosition: { value: new Vector3() },
        isMobile: { value: isMobile ? 1.0 : 0.0 },
      },
      vertexShader,
      fragmentShader,
    }),
    [isMobile]
  )

  useEffect(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as ShaderMaterial
      material.uniforms.resolution.value.set(size.width, size.height)
      material.uniforms.isMobile.value = isMobile ? 1.0 : 0.0
    }
  }, [size, isMobile])

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as ShaderMaterial
      material.uniforms.time.value = state.clock.elapsedTime * 0.2 // Slow down the animation further
      material.uniforms.mousePosition.value.set(mouse.x, mouse.y, 0)
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  )
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <FluidBackground />
      </Canvas>
    </div>
  )
}