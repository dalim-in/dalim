"use client"

import { useEffect, useRef, useState } from "react"

export default function DemoOne() {
  return (
    <main  >
       <ParticleTextEffect
        text="21st"
        fontSize={50}
        fontWeight="bold"
        fontFamily="Inter, sans-serif"
        tileSize="0.5vmin"
        distance="0.7vmin"  
      /> 
    </main>
  )
}


interface ParticleTextEffectProps {
  text?: string
  className?: string
  fontSize?: number
  fontWeight?: string
  fontFamily?: string
  tileSize?: string
  distance?: string 
  textColor?: string
  animationDuration?: number
  blurEffect?: boolean
  dropShadowColor?: string
}

export function ParticleTextEffect({
  text = "Dalim",
  className = "",
  fontSize = 35,
  fontWeight = "bold",
  fontFamily = "monospace",
  tileSize = "0.7vmin",
  distance = "1vmin", 
  textColor = "#ee75d2",
  animationDuration = 10,
  blurEffect = true,
  dropShadowColor = "#b818da",
}: ParticleTextEffectProps) {
  const tilesRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const countRef = useRef<HTMLDivElement>(null)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    const tiles = tilesRef.current
    const canvas = canvasRef.current
    const count = countRef.current

    if (!tiles || !canvas || !count) return

    // Clear existing tiles
    tiles.innerHTML = ""

    const counts = text
    const size = fontSize
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const font = `${fontWeight} ${size}px ${fontFamily}`
    ctx.font = font
    const metrics = ctx.measureText(counts)
    canvas.width = metrics.width
    canvas.height = size

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.font = font
    ctx.fillStyle = "black"
    ctx.fillText(counts, 0, canvas.height)

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const length = data.length
    const pixels = []
    let x = 0,
      y = 0
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    for (let i = 0; i < length; i += 4) {
      const pixel = { hit: data[i] === 0, i, x: x - centerX, y: y - centerY }
      if (data[i] === 0) {
        pixels.push(pixel)
      }
      x++
      if (x === canvas.width) {
        x = 0
        y++
      }
    }

    pixels.forEach(({ x, y }, index) => {
      const tile = document.createElement("div")
      tile.style.setProperty("--p-x", `${x}`)
      tile.style.setProperty("--p-y", `${y}`)
      tile.style.setProperty("--p-i", `${index}`)
      tile.style.setProperty("--p-r", `${Math.random()}`)
      tile.style.setProperty("--p-r2", `${Math.random()}`)
      tiles.appendChild(tile)
    })

    // Start animation after a brief delay
    setTimeout(() => setShowAnimation(true), 100)
  }, [text, fontSize, fontWeight, fontFamily])

  const handleClick = () => {
    setShowAnimation(false)
    requestAnimationFrame(() => {
      setShowAnimation(true)
    })
  }

  return (
    <div
      className={`particle-text-container ${className}`}
      onClick={handleClick}
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center", 
        color: textColor,
        margin: 0,
        overflow: "clip",
        cursor: "pointer",
        boxSizing: "border-box",
      }}
    >
      <style jsx>{`
        @property --x {
          syntax: "<length>";
          initial-value: 0;
          inherits: true;
        }

        @property --y {
          syntax: "<length>";
          initial-value: 0;
          inherits: true;
        }

        @property --scale {
          syntax: "<number>";
          initial-value: 1;
          inherits: true;
        }

        .tiles {
          filter: drop-shadow(0 0 1rem ${dropShadowColor});
          width: 0dvw;
          height: 0dvh;
          display: grid;
          place-items: center;
          cursor: pointer;
          --tile-size: ${tileSize};
          --distance: ${distance};
        }

        .tiles > div {
          border-radius: 50%;
          width: var(--tile-size);
          aspect-ratio: 1;
          background: hsla(var(--color), 110%, 60%, 1);
          position: absolute;
          transform: translate3d(var(--x), var(--y), 0) scale(var(--scale));
          --delay: calc(var(--p-r) * 1s);
          --color: calc(var(--p-r) * (360 - 100) + 100);
          --duration: calc(var(--p-r2) * ${animationDuration}s);
        }

        .tiles.show > div {
          animation: fade-in 0.3s linear forwards,
            show var(--duration) var(--delay) cubic-bezier(0.86, 0.86, 0.41, 1.16) infinite,
            blink 1s var(--delay) ease-in-out infinite;
        }

        @keyframes blink {
          from, 50%, to {
            opacity: 1;
          }
          30%, 70% {
            opacity: 0.3;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes show {
          from {
            --x: calc(1dvw * var(--p-r));
            --y: calc(-100dvh * var(--p-r));
            filter: ${blurEffect ? "blur(0.5rem)" : "none"};
            --scale: calc(clamp(1.5, 10 * var(--p-r2), 5));
          }
          5% {
            filter: ${blurEffect ? "blur(0rem)" : "none"};
          }
          10% {
            --x: calc(var(--p-x) * var(--distance));
            --y: calc(var(--p-y) * var(--distance));
            --scale: calc(1);
          }
          to {
            --x: calc(var(--p-x) * var(--distance));
            --y: calc(var(--p-y) * var(--distance));
          }
        }

        .hidden {
          display: none;
        }
      `}</style>

      <div ref={tilesRef} className={`tiles ${showAnimation ? "show" : ""}`} />

      <div ref={countRef} className="hidden">
        {text}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
