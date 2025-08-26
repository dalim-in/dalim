"use client"

import { AnimatedLeaves } from "@/registry/default/ui/backgrounds/animated-leaves"

export default function DemoOne() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border">
      <AnimatedLeaves />
    </div>
  )
}
