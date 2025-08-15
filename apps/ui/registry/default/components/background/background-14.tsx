"use client"

import { useEffect, useRef } from "react"

export default function DemoOne() {
  return (
    <main className="h-[650px] flex items-center justify-center">
      <WaveAnimation width={1000} height={650} /> 
    </main>
  )
}

interface WaveAnimationProps {
  width?: number
  height?: number
}

export function WaveAnimation({ width = 800, height = 400 }: WaveAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set custom size
    canvas.width = width
    canvas.height = height
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const palette = ["#005f73", "#0a9396", "#94d2bd", "#e9d8a6", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226"]

    const animate = (timeStart: number) => (time: number) => {
      requestAnimationFrame(() => animate(timeStart)(Date.now() + timeStart))

      let x = 0
      const arr = Array(20)

      // Semi-transparent overlay for trailing effect
      ctx.fillStyle = `rgba(0, 0, 0, 0.03)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create wave bars
      for (let i = 0; i < arr.length; i++) {
        arr[i] = 2 - (Math.sin(i + time / 200) / 2) * canvas.height
        ctx.fillStyle = palette[Math.floor(i + time / 200) % palette.length]
        const w = 100
        ctx.fillRect(x, canvas.height / 2, w, arr[i])
        x += w
      }
    }

    animate(0)(0)
    animate(100)(0)
  }, [width, height])

  return (
    <canvas ref={canvasRef} />
  )
}
