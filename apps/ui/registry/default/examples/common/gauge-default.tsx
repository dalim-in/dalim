"use client"

import { Gauge } from "@/registry/default/ui/common/gauge"

export default function Component() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Gauge value={63} />
    </div>
  )
}
