"use client"

import { FluidDynamics } from "@/registry/default/ui/backgrounds/fluid-dynamics"

export function DemoOne() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border">
      <FluidDynamics />
    </div>
  )
}
