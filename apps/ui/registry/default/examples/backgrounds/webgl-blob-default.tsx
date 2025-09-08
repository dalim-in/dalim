"use client"

import { WebGLBlob } from "@/registry/default/ui/backgrounds/webgl-blob"

export function DemoOne() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-black">
      <WebGLBlob />
    </div>
  )
}
