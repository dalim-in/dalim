"use client"

import React, { useRef, useState } from "react"

import { Button } from "@/registry/default/ui/button"

export default function Component() {
  const [ripples, setRipples] = useState<
    { x: number; y: number; size: number; key: number }[]
  >([])
  const rippleCount = useRef(0)
  const buttonRef = useRef<HTMLButtonElement>(null)

  function createRipple(event: React.MouseEvent<HTMLButtonElement>) {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return

    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const newRipple = {
      x,
      y,
      size,
      key: rippleCount.current++,
    }

    setRipples((old) => [...old, newRipple])

    // Remove ripple after animation (600ms)
    setTimeout(() => {
      setRipples((old) => old.filter((r) => r.key !== newRipple.key))
    }, 600)
  }

  return (
    <div className="flex flex-col justify-center gap-6">
      <Button
        ref={buttonRef}
        onClick={createRipple}
        className="relative overflow-hidden"
      >
        Click Me
        {/* Ripples */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden">
          {ripples.map(({ x, y, size, key }) => (
            <span
              key={key}
              style={{
                top: y,
                left: x,
                width: size,
                height: size,
              }}
              className="animate-ripple absolute rounded-full bg-white opacity-30"
            />
          ))}
        </span>
        <style jsx>{`
          @keyframes ripple {
            0% {
              transform: scale(0);
              opacity: 0.5;
            }
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }
          .animate-ripple {
            animation: ripple 600ms linear forwards;
          }
        `}</style>
      </Button>

      <p className="text-xs text-center">Ripple button</p>
    </div>
  )
}
