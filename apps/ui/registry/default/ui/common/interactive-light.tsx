"use client"

import { useEffect, useRef, useState } from "react"

interface InteractiveLampProps {
  shineColor?: string
  lampHeight?: string
  lampWidth?: string
  enableTilt?: boolean
  transitionDuration?: number
}

export function InteractiveLight({
  shineColor = "#5FB0F7",
  lampHeight = "50vh",
  lampWidth = "4vh",
  enableTilt = false,
  transitionDuration = 500,
}: InteractiveLampProps) {
  const lampRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [tiltEnabled] = useState(enableTilt)
  const [lampDirection, setLampDirection] = useState<
    "left" | "top" | "bottom" | "right" | "center"
  >("center")
  const [ready, setReady] = useState(false)
  const lastXRef = useRef<number>(0)
  const lastYRef = useRef<number>(0)

  // Generate lighter shades of shine color
  const lightenColor = (color: string, percent: number) => {
    const hex = color.replace("#", "")
    const r = Number.parseInt(hex.substr(0, 2), 16)
    const g = Number.parseInt(hex.substr(2, 2), 16)
    const b = Number.parseInt(hex.substr(4, 2), 16)

    const newR = Math.min(255, Math.floor(r + ((255 - r) * percent) / 100))
    const newG = Math.min(255, Math.floor(g + ((255 - g) * percent) / 100))
    const newB = Math.min(255, Math.floor(b + ((255 - b) * percent) / 100))

    return `rgb(${newR}, ${newG}, ${newB})`
  }

  const getLampBoxShadow = (
    direction: "left" | "right" | "top" | "bottom" | "center"
  ) => {
    const light20 = lightenColor(shineColor, 20)
    const light10 = lightenColor(shineColor, 10)
    const light5 = lightenColor(shineColor, 5)

    switch (direction) {
      case "left":
        return `
        0 0 1vh 0.5vh ${light20},
        -1vh 0 2vh 1vh ${light20},
        -4vh 0 5vh 1vh ${light10},
        -10vh 0 10vh 1vh ${light5},
        -13vh 0 15vh 1vh ${shineColor},
        -15vh 0 20vh 1vh ${shineColor},
        -25vh 0 25vh 0 ${shineColor},
        -50vh 0 50vh 0 ${shineColor}
      `
      case "right":
        return `
        0 0 1vh 0.5vh ${light20},
        1vh 0 2vh 1vh ${light20},
        4vh 0 5vh 1vh ${light10},
        10vh 0 10vh 1vh ${light5},
        13vh 0 15vh 1vh ${shineColor},
        15vh 0 20vh 1vh ${shineColor},
        25vh 0 25vh 0 ${shineColor},
        50vh 0 50vh 0 ${shineColor}
      `
      case "top":
        return `
        0 0 1vh 0.5vh ${light20},
        0 -1vh 2vh 1vh ${light20},
        0 -4vh 5vh 1vh ${light10},
        0 -10vh 10vh 1vh ${light5},
        0 -13vh 15vh 1vh ${shineColor},
        0 -15vh 20vh 1vh ${shineColor},
        0 -25vh 25vh 0 ${shineColor},
        0 -50vh 50vh 0 ${shineColor}
      `
      case "bottom":
        return `
        0 0 1vh 0.5vh ${light20},
        0 1vh 2vh 1vh ${light20},
        0 4vh 5vh 1vh ${light10},
        0 10vh 10vh 1vh ${light5},
        0 13vh 15vh 1vh ${shineColor},
        0 15vh 20vh 1vh ${shineColor},
        0 25vh 25vh 0 ${shineColor},
        0 50vh 50vh 0 ${shineColor}
      `
      default: // "center"
        return `
        0 0 1vh 0.5vh ${light20},
        0 0 2vh 1vh ${light20},
        0 0 5vh 1vh ${light10},
        0 0 10vh 1vh ${light5},
        0 0 15vh 1vh ${shineColor},
        0 0 20vh 1vh ${shineColor},
        0 0 25vh 1vh ${shineColor},
        0 0 50vh 1vh ${shineColor}
      `
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!ready || !lampRef.current || !highlightRef.current) return

    const xPos = e.clientX
    const yPos = e.clientY
    const lastX = lastXRef.current
    let offset = 0

    if (tiltEnabled) {
      if (lastX < xPos - 1) {
        setLampDirection("right")
        offset = 200
      } else if (lastX > xPos + 1) {
        setLampDirection("left")
        offset = -200
      } else if (lastX > yPos + 1) {
        setLampDirection("top")
        offset = 200
      } else if (lastX > yPos + 1) {
        setLampDirection("bottom")
        offset = -200
      } else {
        setLampDirection("center")
      }
    }

    lampRef.current.style.transform = `translate(${xPos - lampRef.current.offsetWidth / 2}px, ${yPos - lampRef.current.offsetHeight / 2}px)`

    highlightRef.current.style.transform = `translate(${xPos - highlightRef.current.offsetWidth / 2 + offset}px, ${yPos - highlightRef.current.offsetHeight / 2}px)`

    lastXRef.current = xPos
    lastYRef.current = yPos
  }

  const runIntroAnimation = () => {
    if (!lampRef.current || !highlightRef.current) return

    const xPos = window.innerWidth / 2
    const yPos = window.innerHeight / 2
    lastXRef.current = xPos
    lastYRef.current = yPos

    lampRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`

    setTimeout(() => {
      if (lampRef.current && highlightRef.current) {
        lampRef.current.style.transform = `translate(${xPos * 1.8 - lampRef.current.offsetWidth / 2}px, ${yPos * 1.5 - lampRef.current.offsetHeight / 2}px)`
        highlightRef.current.style.transform = `translate(${xPos * 1.8 - highlightRef.current.offsetWidth / 2}px, ${yPos * 1.5 - highlightRef.current.offsetHeight / 2}px)`
      }
    }, 100)

    setTimeout(() => {
      if (lampRef.current && highlightRef.current) {
        lampRef.current.style.transform = `translate(${xPos * 0.5 - lampRef.current.offsetWidth / 2}px, ${yPos * 0.3 - lampRef.current.offsetHeight / 2}px)`
        highlightRef.current.style.transform = `translate(${xPos * 0.5 - highlightRef.current.offsetWidth / 2}px, ${yPos * 0.3 - highlightRef.current.offsetHeight / 2}px)`
      }
    }, 1000)

    setTimeout(() => {
      setReady(true)
    }, 2000)
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    runIntroAnimation()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [ready, tiltEnabled])

  return (
    <div
      ref={containerRef}
      className="relative inset-0 h-full w-full overflow-hidden rounded-md border"
    >
      <div
        ref={highlightRef}
        className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out"
      />

      <div
        ref={lampRef}
        className="absolute transition-transform duration-500 ease-out"
        style={{
          height: lampHeight,
          width: lampWidth,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // centers it
          backgroundColor: "#fff",
          borderRadius: `calc(${lampWidth} / 2)`,
          boxShadow: getLampBoxShadow(lampDirection),
          transitionDuration: `${transitionDuration}ms`,
        }}
      />
    </div>
  )
}
