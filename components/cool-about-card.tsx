"use client"

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function CoolAboutCard() {
  const particlesRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = particlesRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = []
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      })
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })
      requestAnimationFrame(animateParticles)
    }

    animateParticles()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900">
      <motion.div
        className="relative w-80 h-96 bg-white bg-opacity-10 rounded-2xl p-6 backdrop-filter backdrop-blur-lg shadow-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <canvas ref={particlesRef} className="absolute inset-0" />
        <div className="relative z-10">
          <motion.h2 
            className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            John Doe
          </motion.h2>
          <motion.p
            className="text-white text-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <TypeWriter text="Web Developer & Designer" />
          </motion.p>
          <motion.p
            className="text-gray-300 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Passionate about creating beautiful and functional web experiences. Always learning, always growing.
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}

function TypeWriter({ text }: { text: string }) {
  const [displayText, setDisplayText] = React.useState('')

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [text])

  return <span>{displayText}</span>
}