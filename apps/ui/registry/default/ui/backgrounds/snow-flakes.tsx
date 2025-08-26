"use client"

import { useEffect, useState } from "react"

interface SnowflakeProps {
  id: number
  size: number
  left: number
  animationDuration: number
  opacity: number
  color: string
}

interface SnowFlakesProps {
  /** Number of snowflakes */
  count?: number
  /** Snow color */
  color?: string
  /** Animation speed multiplier (lower = slower) */
  speed?: number
  /** Minimum snowflake size in pixels */
  minSize?: number
  /** Maximum snowflake size in pixels */
  maxSize?: number
  /** Minimum opacity */
  minOpacity?: number
  /** Maximum opacity */
  maxOpacity?: number
  /** Z-index for the snow layer */
  zIndex?: number
  /** Whether to enable wind effect */
  wind?: boolean
}

const Snowflake = ({
  id,
  size,
  left,
  animationDuration,
  opacity,
  color,
}: SnowflakeProps) => {
  return (
    <div
      className="pointer-events-none absolute select-none"
      style={{
        left: `${left}%`,
        fontSize: `${size}px`,
        opacity,
        color,
        animation: `snowfall-${id} ${animationDuration}s linear infinite`,
        animationDelay: `${-Math.random() * animationDuration}s`, // 👈 random negative delay
        textShadow: "0 0 1px rgba(255,255,255,0.8)",
      }}
    >
      ❄
    </div>
  )
}

export function SnowFlakes({
  count = 50,
  color = "#ffffff",
  speed = 1,
  minSize = 10,
  maxSize = 20,
  minOpacity = 0.3,
  maxOpacity = 0.8,
  zIndex = -1,
  wind = true,
}: SnowFlakesProps) {
  const [snowflakes, setSnowflakes] = useState<SnowflakeProps[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const generateSnowflakes = () => {
      const flakes: SnowflakeProps[] = []

      for (let i = 0; i < count; i++) {
        const size = Math.random() * (maxSize - minSize) + minSize
        const left = Math.random() * 100
        const animationDuration = (Math.random() * 3 + 2) / speed
        const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity

        flakes.push({
          id: i,
          size,
          left,
          animationDuration,
          opacity,
          color,
        })
      }

      setSnowflakes(flakes)
    }

    generateSnowflakes()
  }, [count, color, speed, minSize, maxSize, minOpacity, maxOpacity])

  useEffect(() => {
    if (!mounted) return

    // Generate CSS animations for each snowflake
    const styleSheet = document.createElement("style")
    styleSheet.type = "text/css"

    let cssRules = ""

    snowflakes.forEach((flake) => {
      const windOffset = wind ? Math.random() * 100 - 50 : 0

      cssRules += `
        @keyframes snowfall-${flake.id} {
          0% {
            transform: translateY(-100vh) translateX(0px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) translateX(${windOffset}px) rotate(360deg);
          }
        }
      `
    })

    styleSheet.innerHTML = cssRules
    document.head.appendChild(styleSheet)

    return () => {
      document.head.removeChild(styleSheet)
    }
  }, [snowflakes, wind, mounted])

  if (!mounted) return null

  return (
    <div className="pointer-events-none overflow-hidden" style={{ zIndex }}>
      {snowflakes.map((flake) => (
        <Snowflake key={flake.id} {...flake} />
      ))}
    </div>
  )
}
