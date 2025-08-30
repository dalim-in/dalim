"use client"

import { Stats } from "@/registry/default/blocks/stats/stats-01/components/stats"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10">
      <h1 className="text-primary/60 mb-10 max-w-sm text-center text-sm md:max-w-md">
        Dalim is more than just models - it powers APIs and platforms that help
        developers and businesses innovate.
      </h1>
      <Stats />
    </div>
  )
}
