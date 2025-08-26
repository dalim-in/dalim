"use client"

import { ShaderLines } from "@/registry/default/ui/backgrounds/shader-lines"

export default function DemoOne() {
  return (
    <div className="relative flex h-[550px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border">
      <ShaderLines />
    </div>
  )
}
