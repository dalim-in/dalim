"use client"

import { useCallback, useEffect, useRef } from "react"

interface FluidDynamicsProps {
  width?: number
  height?: number
  iterations?: number
  strength?: number
  radius?: number
  viscosity?: number
  diffusion?: number
  showVelocity?: boolean
  showDensity?: boolean
  addVelocity?: boolean
  addDensity?: boolean
  animate?: boolean
  circle?: boolean
  className?: string
}

export function FluidDynamics({
  width = 300,
  height = 300,
  iterations = 3,
  strength = 100,
  radius = 1,
  viscosity = 0.0,
  diffusion = 0.0,
  showVelocity = false,
  showDensity = true,
  addVelocity = true,
  addDensity = true,
  animate = true,
  circle = true,
  className = "",
}: FluidDynamicsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const stateRef = useRef<{
    u: number[]
    v: number[]
    u_old: number[]
    v_old: number[]
    dens: number[]
    dens_old: number[]
    isAnimating: boolean
    isHovering: boolean
    lastX: number
    lastY: number
    time: number
    red: number[]
    grn: number[]
    blu: number[]
  } | null>(null)

  const generateColorArrays = useCallback(() => {
    const ncol = 500
    const red = new Array(ncol)
    const grn = new Array(ncol)
    const blu = new Array(ncol)

    // Generate heat map colors (black -> red -> yellow -> white)
    for (let i = 0; i < ncol; i++) {
      const t = i / (ncol - 1)

      if (t < 0.25) {
        // Black to red
        red[i] = Math.floor(t * 4 * 255)
        grn[i] = 0
        blu[i] = 0
      } else if (t < 0.5) {
        // Red to yellow
        red[i] = 255
        grn[i] = Math.floor((t - 0.25) * 4 * 255)
        blu[i] = 0
      } else if (t < 0.75) {
        // Yellow to white
        red[i] = 255
        grn[i] = 255
        blu[i] = Math.floor((t - 0.5) * 4 * 255)
      } else {
        // White
        red[i] = 255
        grn[i] = 255
        blu[i] = 255
      }
    }

    return { red, grn, blu }
  }, [])

  const IX = useCallback((i: number, j: number, w: number) => {
    return j * w + i
  }, [])

  const setBoundary = useCallback(
    (b: number, x: number[], w: number, h: number) => {
      for (let i = 1; i <= h; i++) {
        x[IX(0, i, w)] = 0
        x[IX(w + 1, i, w)] = 0
        x[IX(i, 0, w)] = 0
        x[IX(i, w + 1, w)] = 0
      }

      x[IX(0, 0, w)] = 0.5 * (x[IX(1, 0, w)] + x[IX(0, 1, w)])
      x[IX(0, w + 1, w)] = 0.5 * (x[IX(1, w + 1, w)] + x[IX(0, h, w)])
      x[IX(w + 1, 0, w)] = 0.5 * (x[IX(w, 0, w)] + x[IX(w + 1, 1, w)])
      x[IX(w + 1, h + 1, w)] = 0.5 * (x[IX(w, h + 1, w)] + x[IX(w + 1, w, w)])
    },
    [IX]
  )

  const diffuse = useCallback(
    (
      b: number,
      x: number[],
      x0: number[],
      diff: number,
      dt: number,
      iter: number,
      w: number,
      h: number
    ) => {
      const a = dt * diff * w * w

      for (let k = 0; k < iter; k++) {
        for (let i = 1; i <= w; i++) {
          for (let j = 1; j <= h; j++) {
            x[IX(i, j, w)] =
              (x0[IX(i, j, w)] +
                a *
                  (x[IX(i - 1, j, w)] +
                    x[IX(i + 1, j, w)] +
                    x[IX(i, j - 1, w)] +
                    x[IX(i, j + 1, w)])) /
              (1 + 4 * a)
          }
        }
        setBoundary(b, x, w, h)
      }
    },
    [IX, setBoundary]
  )

  const advect = useCallback(
    (
      b: number,
      d: number[],
      d0: number[],
      u: number[],
      v: number[],
      dt: number,
      w: number,
      h: number
    ) => {
      const dt0 = dt * w

      for (let i = 1; i <= w; i++) {
        for (let j = 1; j <= h; j++) {
          let x = i - dt0 * u[IX(i, j, w)]
          let y = j - dt0 * v[IX(i, j, w)]

          if (x < 0.5) x = 0.5
          if (x > w + 0.5) x = w + 0.5
          const i0 = Math.floor(x)
          const i1 = i0 + 1

          if (y < 0.5) y = 0.5
          if (y > h + 0.5) y = h + 0.5
          const j0 = Math.floor(y)
          const j1 = j0 + 1

          const s1 = x - i0
          const s0 = 1 - s1
          const t1 = y - j0
          const t0 = 1 - t1

          d[IX(i, j, w)] =
            s0 * (t0 * d0[IX(i0, j0, w)] + t1 * d0[IX(i0, j1, w)]) +
            s1 * (t0 * d0[IX(i1, j0, w)] + t1 * d0[IX(i1, j1, w)])
        }
      }
      setBoundary(b, d, w, h)
    },
    [IX, setBoundary]
  )

  const project = useCallback(
    (
      u: number[],
      v: number[],
      p: number[],
      div: number[],
      iter: number,
      w: number,
      h: number
    ) => {
      const h_val = 1.0 / w

      for (let i = 1; i <= w; i++) {
        for (let j = 1; j <= h; j++) {
          div[IX(i, j, w)] =
            -0.5 *
            h_val *
            (u[IX(i + 1, j, w)] -
              u[IX(i - 1, j, w)] +
              v[IX(i, j + 1, w)] -
              v[IX(i, j - 1, w)])
          p[IX(i, j, w)] = 0
        }
      }

      setBoundary(0, div, w, h)
      setBoundary(0, p, w, h)

      for (let k = 0; k < iter; k++) {
        for (let i = 1; i <= w; i++) {
          for (let j = 1; j <= h; j++) {
            p[IX(i, j, w)] =
              (div[IX(i, j, w)] +
                p[IX(i - 1, j, w)] +
                p[IX(i + 1, j, w)] +
                p[IX(i, j - 1, w)] +
                p[IX(i, j + 1, w)]) /
              4
          }
        }
        setBoundary(0, p, w, h)
      }

      for (let i = 1; i <= w; i++) {
        for (let j = 1; j <= h; j++) {
          u[IX(i, j, w)] -=
            (0.5 * (p[IX(i + 1, j, w)] - p[IX(i - 1, j, w)])) / h_val
          v[IX(i, j, w)] -=
            (0.5 * (p[IX(i, j + 1, w)] - p[IX(i, j - 1, w)])) / h_val
        }
      }
      setBoundary(1, u, w, h)
      setBoundary(2, v, w, h)
    },
    [IX, setBoundary]
  )

  const velStep = useCallback(
    (
      u: number[],
      v: number[],
      u0: number[],
      v0: number[],
      visc: number,
      dt: number,
      iter: number,
      w: number,
      h: number
    ) => {
      // Swap arrays
      let tmp = u0
      u0 = u
      u = tmp
      diffuse(1, u, u0, visc, dt, iter, w, h)
      tmp = v0
      v0 = v
      v = tmp
      diffuse(2, v, v0, visc, dt, iter, w, h)
      project(u, v, u0, v0, iter, w, h)
      tmp = u0
      u0 = u
      u = tmp
      tmp = v0
      v0 = v
      v = tmp
      advect(1, u, u0, u0, v0, dt, w, h)
      advect(2, v, v0, u0, v0, dt, w, h)
      project(u, v, u0, v0, iter, w, h)
    },
    [diffuse, advect, project]
  )

  const densStep = useCallback(
    (
      x: number[],
      x0: number[],
      u: number[],
      v: number[],
      diff: number,
      dt: number,
      iter: number,
      w: number,
      h: number
    ) => {
      let tmp = x0
      x0 = x
      x = tmp
      diffuse(0, x, x0, diff, dt, iter, w, h)
      tmp = x0
      x0 = x
      x = tmp
      advect(0, x, x0, u, v, dt, w, h)
    },
    [diffuse, advect]
  )

  const addDensityAt = useCallback(
    (x: number, y: number, amount: number, w: number, h: number) => {
      if (!stateRef.current) return

      for (let j = y - radius; j < y + radius; j++) {
        for (let k = x - radius; k < x + radius; k++) {
          if (j > radius && j < h - radius && k > radius && k < w - radius) {
            stateRef.current.dens[j * w + k] += amount
          }
        }
      }
    },
    [radius]
  )

  const addVelocityAt = useCallback(
    (
      x: number,
      y: number,
      amountX: number,
      amountY: number,
      w: number,
      h: number
    ) => {
      if (!stateRef.current) return

      for (let j = y - radius; j < y + radius; j++) {
        for (let k = x - radius; k < x + radius; k++) {
          if (j > radius && j < h - radius && k > radius && k < w - radius) {
            stateRef.current.u[j * w + k] += amountX
            stateRef.current.v[j * w + k] += amountY
          }
        }
      }
    },
    [radius]
  )

  const drawTexture = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      if (!stateRef.current) return

      const imageData = ctx.getImageData(0, 0, w, h)
      const data = imageData.data
      const { u, v, dens, red, grn, blu } = stateRef.current

      for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
          const i = y * w + x
          let value = 0

          if (showVelocity) {
            value = Math.abs(Math.sqrt(u[i] * u[i] + v[i] * v[i]))
          }
          if (showDensity) {
            value = dens[i]
          }

          const frac = Math.max(0.01, Math.min(0.99, value / 100))
          const icol = Math.floor(frac * (red.length - 1))

          const pxl = (x + y * w) * 4
          data[pxl] = red[icol]
          data[pxl + 1] = grn[icol]
          data[pxl + 2] = blu[icol]
          data[pxl + 3] = 255
        }
      }

      ctx.putImageData(imageData, 0, 0)
    },
    [showVelocity, showDensity]
  )

  const getMousePos = useCallback(
    (canvas: HTMLCanvasElement, e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

      const scaleX = width / canvas.width
      const scaleY = height / canvas.height

      return {
        x: Math.round((clientX - rect.left) * scaleX),
        y: Math.round((clientY - rect.top) * scaleY),
      }
    },
    [width, height]
  )

  const handleInteraction = useCallback(
    (x: number, y: number, prevX?: number, prevY?: number) => {
      if (!stateRef.current) return

      if (addDensity) {
        addDensityAt(x, y, strength, width, height)
      }

      if (addVelocity && prevX !== undefined && prevY !== undefined) {
        addVelocityAt(
          x,
          y,
          strength * (x - prevX),
          strength * (y - prevY),
          width,
          height
        )
      }
    },
    [
      addDensity,
      addVelocity,
      addDensityAt,
      addVelocityAt,
      strength,
      width,
      height,
    ]
  )

  const animate_loop = useCallback(() => {
    if (!canvasRef.current || !hiddenCanvasRef.current || !stateRef.current)
      return

    const canvas = canvasRef.current
    const hiddenCanvas = hiddenCanvasRef.current
    const ctx = canvas.getContext("2d", { alpha: true })
    const hiddenCtx = hiddenCanvas.getContext("2d", { alpha: true })

    if (!ctx || !hiddenCtx) return

    // Auto animation
    if (animate && circle && stateRef.current.isAnimating) {
      stateRef.current.time += 0.02
      const x = Math.round(
        width / 2 + (width / 4) * Math.cos(stateRef.current.time)
      )
      const y = Math.round(
        height / 2 + (height / 4) * Math.sin(stateRef.current.time)
      )

      handleInteraction(x, y, stateRef.current.lastX, stateRef.current.lastY)
      stateRef.current.lastX = x
      stateRef.current.lastY = y
    }

    // Physics simulation
    velStep(
      stateRef.current.u,
      stateRef.current.v,
      stateRef.current.u_old,
      stateRef.current.v_old,
      viscosity,
      0.0001,
      iterations,
      width,
      height
    )

    densStep(
      stateRef.current.dens,
      stateRef.current.dens_old,
      stateRef.current.u,
      stateRef.current.v,
      diffusion,
      0.0001,
      iterations,
      width,
      height
    )

    // Render
    drawTexture(hiddenCtx, width, height)

    // Scale to canvas size
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(hiddenCanvas, 0, 0, canvas.width, canvas.height)

    animationRef.current = requestAnimationFrame(animate_loop)
  }, [
    animate,
    circle,
    width,
    height,
    viscosity,
    diffusion,
    iterations,
    handleInteraction,
    velStep,
    densStep,
    drawTexture,
  ])

  useEffect(() => {
    const canvas = canvasRef.current
    const hiddenCanvas = hiddenCanvasRef.current
    if (!canvas || !hiddenCanvas) return

    // Initialize state
    const size = (width + 2) * (height + 2)
    const colors = generateColorArrays()

    stateRef.current = {
      u: new Array(size).fill(0),
      v: new Array(size).fill(0),
      u_old: new Array(size).fill(0),
      v_old: new Array(size).fill(0),
      dens: new Array(size).fill(0),
      dens_old: new Array(size).fill(0),
      isAnimating: true,
      isHovering: false,
      lastX: -1,
      lastY: -1,
      time: 0,
      ...colors,
    }

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      hiddenCanvas.width = width
      hiddenCanvas.height = height
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    const handleMouseEnter = () => {
      if (!stateRef.current) return
      stateRef.current.isHovering = true
      stateRef.current.isAnimating = false
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!stateRef.current || !stateRef.current.isHovering) return
      const pos = getMousePos(canvas, e)
      handleInteraction(
        pos.x,
        pos.y,
        stateRef.current.lastX,
        stateRef.current.lastY
      )
      stateRef.current.lastX = pos.x
      stateRef.current.lastY = pos.y
    }

    const handleMouseLeave = () => {
      if (!stateRef.current) return
      stateRef.current.isHovering = false
      stateRef.current.isAnimating = true
      stateRef.current.lastX = -1
      stateRef.current.lastY = -1
    }

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      if (!stateRef.current) return
      stateRef.current.isAnimating = false
      const pos = getMousePos(canvas, e)
      handleInteraction(pos.x, pos.y)
      stateRef.current.lastX = pos.x
      stateRef.current.lastY = pos.y
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (!stateRef.current) return
      const pos = getMousePos(canvas, e)
      handleInteraction(
        pos.x,
        pos.y,
        stateRef.current.lastX,
        stateRef.current.lastY
      )
      stateRef.current.lastX = pos.x
      stateRef.current.lastY = pos.y
    }

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      if (!stateRef.current) return
      stateRef.current.isAnimating = true
      stateRef.current.lastX = -1
      stateRef.current.lastY = -1
    }

    canvas.addEventListener("mouseenter", handleMouseEnter)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchmove", handleTouchMove)
    canvas.addEventListener("touchend", handleTouchEnd)
    canvas.addEventListener("touchcancel", handleTouchEnd)

    // Start animation
    animate_loop()

    return () => {
      // Cleanup
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", updateCanvasSize)
      canvas.removeEventListener("mouseenter", handleMouseEnter)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("touchend", handleTouchEnd)
      canvas.removeEventListener("touchcancel", handleTouchEnd)
    }
  }, [
    width,
    height,
    generateColorArrays,
    getMousePos,
    handleInteraction,
    animate_loop,
  ])

  return (
    <div
      className={`absolute inset-0 h-full w-full overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{
          display: "block",
          background: "transparent",
        }}
      />
      <canvas ref={hiddenCanvasRef} style={{ display: "none" }} />
    </div>
  )
}
