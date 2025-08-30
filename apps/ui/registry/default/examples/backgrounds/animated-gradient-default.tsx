"use client"

import { AnimatedGradient } from "@/registry/default/ui/backgrounds/animated-gradient"

export default function DemoOne() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border">
      <AnimatedGradient />
      <div className="absolute h-full w-full bg-red-500 mix-blend-color-burn" />
    </div>
  )
}
