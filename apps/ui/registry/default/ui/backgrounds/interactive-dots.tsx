"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface InteractiveDotsProps {
  colors?: string[]
  spacing?: number
  dotRadius?: number
  repelForce?: number
  repelDistance?: number
  returnSpeed?: number
  className?: string
  style?: React.CSSProperties
}

export function InteractiveDots({
  colors = [
    "#C501E1",
    "#9A26F8",
    "#6564FE",
    "#2B97FA",
    "#02C4E7",
    "#16E6CC",
    "#2EF9A0",
    "#C6E501",
    "#E7C501",
    "#FF6A63",
    "#F82D98",
    "#E830CE",
  ],
  spacing = 20,
  dotRadius = 6,
  repelForce = 0.6,
  repelDistance = 10000,
  returnSpeed = 1,
  className = "",
}: InteractiveDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const dotsRef = useRef<Dot[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  class Dot {
    x: number
    y: number
    dx: number
    dy: number
    color: string
    radius: number

    constructor(x: number, y: number, color: string) {
      this.x = x
      this.y = y
      this.dx = x
      this.dy = y
      this.color = color
      this.radius = dotRadius
    }

    update(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
      const mouse = mouseRef.current
      const disX = this.x - mouse.x
      const disY = this.y - mouse.y
      const ds = disX * disX + disY * disY
      const angle = Math.atan2(disY, disX)
      const dist = repelDistance / ds

      if (ds < repelDistance) {
        this.x += Math.cos(angle) * dist * repelForce
        this.y += Math.sin(angle) * dist * repelForce
      } else {
        if (this.x !== this.dx) {
          this.x += (this.dx - this.x) * 0.02 * returnSpeed
        }
        if (this.y !== this.dy) {
          this.y += (this.dy - this.y) * 0.02 * returnSpeed
        }
      }

      if (this.x < 0 || this.x > canvas.width) this.x = this.dx
      if (this.y < 0 || this.y > canvas.height) this.y = this.dy

      this.draw(ctx)
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      ctx.fillStyle = this.color
      ctx.fill()
      ctx.closePath()
    }
  }

  const randomColor = (colorArray: string[]) => {
    return colorArray[Math.floor(Math.random() * colorArray.length)]
  }

  const initDots = (canvas: HTMLCanvasElement) => {
    const dots: Dot[] = []
    for (let x = spacing / 2; x < canvas.width; x += spacing) {
      for (let y = spacing / 2; y < canvas.height; y += spacing) {
        const color = randomColor(colors)
        const dot = new Dot(x, y, color)
        dots.push(dot)
      }
    }
    dotsRef.current = dots
  }

  const animate = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dotsRef.current.forEach((dot) => {
      dot.update(canvas, ctx)
    })
    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx))
  }

  const handleMouseMove = (event: MouseEvent | TouchEvent) => {
    if (event instanceof MouseEvent) {
      mouseRef.current.x = event.clientX
      mouseRef.current.y = event.clientY
    } else if (event instanceof TouchEvent && event.touches.length > 0) {
      mouseRef.current.x = event.touches[0].clientX
      mouseRef.current.y = event.touches[0].clientY
    }
  }

  const handleResize = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initDots(canvas)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Initialize dots
    initDots(canvas)

    // Start animation
    animate(canvas, ctx)

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [colors, spacing, dotRadius, repelForce, repelDistance, returnSpeed])

  return <canvas ref={canvasRef} className={className} />
}
