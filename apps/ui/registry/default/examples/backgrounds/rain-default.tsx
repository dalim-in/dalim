"use client"

import { Rain } from "@/registry/default/ui/backgrounds/rain"

export default function Component() {
  return (
    <div className="h-[500px] w-full">
      <Rain
        intensity={500}
        speed={0.5}
        angle={10}
        color={"rgba(174, 194, 224, 0.6)"}
        dropSize={{ min: 1, max: 2 }}
        lightningEnabled={true}
        lightningFrequency={8}
        thunderEnabled={true}
        thunderVolume={1}
        thunderDelay={2}
        className="bg-background relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-950"
      >
        <div className="p-6">
          <p className="z-10 text-center text-3xl font-semibold tracking-tighter whitespace-pre-wrap text-white md:text-7xl">
            Rain
          </p>
        </div>
      </Rain>
    </div>
  )
}
