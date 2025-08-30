"use client"

import { ButtonRotate } from "@/registry/default/blocks/hero/hero-03/components/button-rotate"
import { Hero } from "@/registry/default/blocks/hero/hero-03/components/hero"
import { GradientBars } from "@/registry/default/ui/backgrounds/gradient-bars"

export default function HeroSection() {
  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-y-auto">
      <GradientBars numBars={20} color="#a855f7" />
      <ButtonRotate />
      <Hero />
    </div>
  )
}
