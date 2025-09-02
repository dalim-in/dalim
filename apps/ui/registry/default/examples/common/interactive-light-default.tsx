"use client"

import { InteractiveLight } from "@/registry/default/ui/common/interactive-light"

export default function Component() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-md border">
      <InteractiveLight
        shineColor="#fff200"
        lampHeight="10vh"
        lampWidth="10vh"
        transitionDuration={500}
      />
    </div>
  )
}
