"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/registry/default/lib/utils"

interface RainDrop {
  id: number
  left: number
  animationDuration: number
  opacity: number
  size: number
  delay: number
}

interface Lightning {
  id: number
  type: "flash" | "bolt"
  intensity: number
  duration: number
}

interface RainProps {
  intensity?: number // Number of raindrops (default: 100)
  speed?: number // Base speed multiplier (default: 1)
  color?: string // Rain color (default: "rgba(174, 194, 224, 0.6)")
  angle?: number // Wind angle in degrees (default: 0)
  dropSize?: {
    min: number
    max: number
  } // Drop size range (default: {min: 1, max: 3})
  // Thunder & Lightning props
  lightningEnabled?: boolean // Enable lightning effects (default: false)
  lightningFrequency?: number // Lightning frequency in seconds (default: 8)
  thunderEnabled?: boolean // Enable thunder sounds (default: false)
  thunderVolume?: number // Thunder volume 0-1 (default: 0.5)
  thunderDelay?: number // Delay between lightning and thunder in seconds (default: 2)
  className?: string
  children?: React.ReactNode
}

export function Rain({
  intensity = 100,
  speed = 1,
  color = "rgba(174, 194, 224, 0.6)",
  angle = 0,
  dropSize = { min: 1, max: 3 },
  lightningEnabled = false,
  lightningFrequency = 8,
  thunderEnabled = false,
  thunderVolume = 0.5,
  thunderDelay = 2,
  className,
  children,
}: RainProps) {
  const [raindrops, setRaindrops] = useState<RainDrop[]>([])
  const [lightning, setLightning] = useState<Lightning | null>(null)
  const [, setIsFlashing] = useState(false)
  const thunderAudioRef = useRef<HTMLAudioElement | null>(null)
  const lightningTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize thunder audio
  useEffect(() => {
    if (thunderEnabled && typeof window !== "undefined") {
      thunderAudioRef.current = new Audio()
      thunderAudioRef.current.volume = thunderVolume
      // Using a data URL for a simple thunder sound simulation
      thunderAudioRef.current.src =
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
    }
  }, [thunderEnabled, thunderVolume])

  // Generate raindrops
  useEffect(() => {
    const drops: RainDrop[] = []

    for (let i = 0; i < intensity; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: (Math.random() * 1 + 0.5) / speed,
        opacity: Math.random() * 0.6 + 0.2,
        size: Math.random() * (dropSize.max - dropSize.min) + dropSize.min,
        delay: Math.random() * 2,
      })
    }

    setRaindrops(drops)
  }, [intensity, speed, dropSize])

  // Lightning effect
  const triggerLightning = useCallback(() => {
    if (!lightningEnabled) return

    const lightningTypes: ("flash" | "bolt")[] = ["flash", "flash", "bolt"] // More flashes than bolts
    const type =
      lightningTypes[Math.floor(Math.random() * lightningTypes.length)]
    const intensity = Math.random() * 0.8 + 0.2 // 0.2 to 1.0
    const duration =
      type === "flash" ? 150 + Math.random() * 100 : 300 + Math.random() * 200

    const newLightning: Lightning = {
      id: Date.now(),
      type,
      intensity,
      duration,
    }

    setLightning(newLightning)
    setIsFlashing(true)

    // End lightning effect
    setTimeout(() => {
      setIsFlashing(false)
      setLightning(null)
    }, duration)

    // Play thunder after delay
    if (thunderEnabled && thunderAudioRef.current) {
      setTimeout(() => {
        if (thunderAudioRef.current) {
          thunderAudioRef.current.currentTime = 0
          thunderAudioRef.current.play().catch(() => {
            // Handle autoplay restrictions
            console.log("Thunder audio blocked by browser autoplay policy")
          })
        }
      }, thunderDelay * 1000)
    }

    // Schedule next lightning
    const nextLightning =
      (lightningFrequency + Math.random() * lightningFrequency) * 1000
    lightningTimeoutRef.current = setTimeout(triggerLightning, nextLightning)
  }, [lightningEnabled, lightningFrequency, thunderEnabled, thunderDelay])

  // Start lightning cycle
  useEffect(() => {
    if (lightningEnabled) {
      const initialDelay = Math.random() * lightningFrequency * 1000
      lightningTimeoutRef.current = setTimeout(triggerLightning, initialDelay)
    }

    return () => {
      if (lightningTimeoutRef.current) {
        clearTimeout(lightningTimeoutRef.current)
      }
    }
  }, [lightningEnabled, triggerLightning])

  // Generate lightning bolt path
  const generateBoltPath = () => {
    const startX = Math.random() * 100
    const segments = 8 + Math.random() * 4
    let path = `M ${startX} 0`
    let currentX = startX
    let currentY = 0

    for (let i = 1; i <= segments; i++) {
      const segmentHeight = 100 / segments
      currentY = i * segmentHeight
      currentX += (Math.random() - 0.5) * 20 // Random horizontal deviation
      currentX = Math.max(0, Math.min(100, currentX)) // Keep within bounds
      path += ` L ${currentX} ${currentY}`
    }

    return path
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Lightning Effects */}
      {lightning && (
        <>
          {/* Screen Flash */}
          {lightning.type === "flash" && (
            <div
              className="animate-lightning-flash pointer-events-none absolute inset-0 z-20"
              style={{
                background: `radial-gradient(circle, rgba(255, 255, 255, ${lightning.intensity}) 0%, rgba(135, 206, 235, ${lightning.intensity * 0.3}) 50%, transparent 100%)`,
                animationDuration: `${lightning.duration}ms`,
              }}
            />
          )}

          {/* Lightning Bolt */}
          {lightning.type === "bolt" && (
            <div className="pointer-events-none absolute inset-0 z-20">
              <svg
                className="animate-lightning-bolt h-full w-full"
                style={{ animationDuration: `${lightning.duration}ms` }}
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d={generateBoltPath()}
                  stroke={`rgba(255, 255, 255, ${lightning.intensity})`}
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow)"
                />
                <path
                  d={generateBoltPath()}
                  stroke={`rgba(135, 206, 235, ${lightning.intensity * 0.8})`}
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>
          )}
        </>
      )}

      {/* Rain container */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          transform: `rotate(${angle}deg)`,
          transformOrigin: "center center",
        }}
      >
        {raindrops.map((drop) => (
          <div
            key={drop.id}
            className="animate-rain-fall absolute"
            style={{
              left: `${drop.left}%`,
              width: `${drop.size}px`,
              height: `${drop.size * 10}px`,
              background: `linear-gradient(to bottom, transparent, ${color})`,
              borderRadius: `${drop.size}px`,
              animationDuration: `${drop.animationDuration}s`,
              animationDelay: `${drop.delay}s`,
              opacity: drop.opacity,
              top: "-20px",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes rain-fall {
          0% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(calc(100vh + 20px));
          }
        }

        @keyframes lightning-flash {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          20% {
            opacity: 0.3;
          }
          30% {
            opacity: 1;
          }
          40% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes lightning-bolt {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          20% {
            opacity: 0.7;
          }
          30% {
            opacity: 1;
          }
          40% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
          60% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }

        .animate-rain-fall {
          animation: rain-fall linear infinite;
        }

        .animate-lightning-flash {
          animation: lightning-flash ease-out forwards;
        }

        .animate-lightning-bolt {
          animation: lightning-bolt ease-out forwards;
        }
      `}</style>
    </div>
  )
}

interface ThunderAudioProps {
  volume: number
  onPlay?: () => void
}

export function ThunderAudio({ volume, onPlay }: ThunderAudioProps) {
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).webkitAudioContext)()
    }
  }, [])

  const generateThunderSound = async () => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current
    const duration = 2 + Math.random() * 3 // 2-5 seconds
    const sampleRate = audioContext.sampleRate
    const frameCount = sampleRate * duration
    const arrayBuffer = audioContext.createBuffer(1, frameCount, sampleRate)
    const channelData = arrayBuffer.getChannelData(0)

    // Generate thunder-like noise
    for (let i = 0; i < frameCount; i++) {
      const t = i / sampleRate
      let sample = 0

      // Multiple layers of noise for realistic thunder
      sample += (Math.random() * 2 - 1) * Math.exp(-t * 2) * 0.5 // Initial crack
      sample += (Math.random() * 2 - 1) * Math.exp(-t * 0.5) * 0.3 // Rumble
      sample += Math.sin(t * 60 + Math.random() * 10) * Math.exp(-t * 1) * 0.2 // Low frequency

      // Apply envelope for natural fade
      const envelope = Math.exp(-t * 0.8) * (1 - Math.exp(-t * 10))
      channelData[i] = sample * envelope * volume
    }

    // Play the generated sound
    const source = audioContext.createBufferSource()
    const gainNode = audioContext.createGain()

    source.buffer = arrayBuffer
    source.connect(gainNode)
    gainNode.connect(audioContext.destination)
    gainNode.gain.value = volume

    source.start()
    onPlay?.()
  }

  return {
    playThunder: generateThunderSound,
  }
}
