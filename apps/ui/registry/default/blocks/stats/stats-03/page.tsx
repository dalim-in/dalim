"use client"

import { Stats } from "@/registry/default/blocks/stats/stats-03/components/stats"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10">
      <h1 className="text-primary/60 mb-10 max-w-sm text-center text-sm md:max-w-md">
        Our Technology, Your Advantage.
      </h1>
      <Stats />
    </div>
  )
}
