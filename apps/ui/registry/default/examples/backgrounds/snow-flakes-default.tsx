"use client"

import { SnowFlakes } from "@/registry/default/ui/backgrounds/snow-flakes"

export default function DemoOne() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-blue-700">
      <SnowFlakes
        count={150}
        speed={0.1}
        minSize={1}
        maxSize={40}
        minOpacity={0}
        maxOpacity={1}
        color={"#ffffff"}
        wind={true}
        zIndex={1}
      />
      <span className="pointer-events-none z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white">
        Snow Flakes
      </span>
    </div>
  )
}
