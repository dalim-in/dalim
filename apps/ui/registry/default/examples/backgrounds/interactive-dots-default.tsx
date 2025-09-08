"use client"

import { InteractiveDots } from "@/registry/default/ui/backgrounds/interactive-dots"

export function DemoOne() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border">
      <InteractiveDots />
    </div>
  )
}
