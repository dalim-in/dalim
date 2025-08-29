"use client"

import { Hero } from "@/registry/default/blocks/hero/hero-01/components/hero"
import { RenderCanvas } from "@/registry/default/ui/backgrounds/render-canvas"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <RenderCanvas width={1400} height={930} className="absolute inset-0" />
      <Hero />
    </div>
  )
}
