"use client"

import { useEffect, useRef } from "react"

interface ParticleBackgroundProps {
  density?: number
  maxDensity?: number
  speed?: number
  color?: string
}

export default function ParticleBackground({ density = 50, maxDensity = 50, speed = 0.5, color = "#ef4444" }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number

      constructor() {
        this.x = canvas ? Math.random() * canvas.width : 0;
        this.y = canvas ? Math.random() * canvas.height : 0;
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * speed
        this.speedY = (Math.random() - 0.5) * speed
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        if (!canvas) return;
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = this.opacity
        ctx.fill()
      }
    }

    const initParticles = () => {
      if (!canvas || !ctx) return;
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / (10000 / Math.min(density, maxDensity)))

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      ctx.globalAlpha = 0.05
      ctx.strokeStyle = color
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [density, speed, color])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-70" style={{ pointerEvents: "none" }} />
}
