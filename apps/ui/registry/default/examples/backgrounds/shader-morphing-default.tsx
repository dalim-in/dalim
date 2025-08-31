"use client"

import { ShaderMorphing } from "@/registry/default/ui/backgrounds/shader-morphing"

export default function DemoOne() {
  return (
    <div className="relative flex h-[550px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border">
      <ShaderMorphing />
    </div>
  )
}
