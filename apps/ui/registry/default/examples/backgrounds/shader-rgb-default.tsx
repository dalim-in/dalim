"use client"

import { ShaderRGB } from "@/registry/default/ui/backgrounds/shader-rgb"

export default function DemoOne() {
  return (
    <div className="relative flex h-[550px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border">
      <ShaderRGB />
    </div>
  )
}
