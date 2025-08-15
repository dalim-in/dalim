"use client"

import type React from "react"

import { useEffect, useState } from "react"

export default function DemoOne() {
  return (
    <AnimatedLeaves />
  )
}


export function AnimatedLeaves() {
  const [leaves, setLeaves] = useState<
    Array<{
      index: number
      ringIndex: number
      count: number
      delay: number
    }>
  >([])

  useEffect(() => {
    const startCount = 10
    const ringCount = 13
    const leafElements = []
    let globalIndex = 0

    for (let ri = 0; ri < ringCount; ri++) {
      const count = startCount - 1 + ri * 11
      for (let i = 0; i <= count; i++) {
        leafElements.push({
          index: globalIndex,
          ringIndex: ri,
          count: count + 1,
          delay: 0.6 * ri + 0.9 * Math.random(),
        })
        globalIndex++
      }
    }

    setLeaves(leafElements)
  }, [])

  return (
    <div className="w-full h-[650px] grid place-items-center border relative overflow-hidden">
      {/* SVG Filter */}
      <svg className="absolute invisible pointer-events-none" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <filter id="blurFilter">
          <feGaussianBlur stdDeviation="4.5"></feGaussianBlur>
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 19 -9"
          ></feColorMatrix>
        </filter>
      </svg>

      {/* Background blur circle */}
      <div
        className="absolute w-[30vmin] aspect-square rounded-full translate-y-1/2"
        style={{ filter: "blur(1rem)" }}
      />

      {/* Container with leaves */}
      <div
        className="relative"
        style={
          {
            filter: "url(#blurFilter) saturate(1.5) brightness(1.1)",
            "--color-primary": "#ee75d2",
          } as React.CSSProperties
        }
      >
        {leaves.map((leaf) => {
          const anglePerItem = 360 / leaf.count
          const angle = anglePerItem * (leaf.index % leaf.count)

          return (
            <div
              key={leaf.index}
              className="absolute opacity-0 rounded-full"
              style={
                {
                  "--size": "20vmin",
                  "--ri": leaf.ringIndex,
                  "--i": leaf.index % leaf.count,
                  "--delay": `${leaf.delay}s`,
                  "--count": leaf.count,
                  height:  "20vmin",
                  aspectRatio: "1 / 20",
                  background: `radial-gradient(
                  color-mix(in srgb, white, transparent 90%),
                  color-mix(
                    in srgb,
                    var(--color-primary),
                    hsla(${10 * (leaf.index % leaf.count)}, 100%, 50%, 1) 50%
                  )
                )`,
                  animation: `leafMove 0.8s var(--delay) ease infinite`,
                  transform: `
                  translate(
                    calc(cos(${angle}deg) * (var(--move, 0vmin) + 4.2vmin + ${leaf.ringIndex} * 20vmin * 0.44)),
                    calc(sin(${angle}deg) * (var(--move, 0vmin) + 4.2vmin + ${leaf.ringIndex} * 20vmin * 0.44) * -1)
                  )
                  rotate(${90 - angle}deg)
                `,
                } as React.CSSProperties
              }
            />
          )
        })}
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @property --move {
          syntax: "<length>";
          inherits: true;
          initial-value: 0;
        }

        @keyframes leafMove {
          from {
            --move: 0vmin;
            opacity: 0;
          }
          20%, 50%, 70% {
            opacity: 1;
          }
          to {
            --move: 22vmin;
          }
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
