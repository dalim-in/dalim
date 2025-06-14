"use client"

import { useEffect } from "react"
import { renderCanvas } from "@dalim/core/components/backgrunds/canvas-particle"

export function PageGrid({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    renderCanvas()
  }, [])
  return (
    <div className="-mx-6 overflow-hidden">
      <div className="-m-px grid grid-cols-12 *:px-1 *:py-12 *:not-first:-ms-px *:not-first:-mt-px sm:*:px-8 xl:*:px-12">
        {children}
      </div>
      <canvas
        id="canvas"
        className="pointer-events-none fixed top-0 left-0 z-[-1] h-screen w-full cursor-pointer"
      ></canvas>
    </div>
  )
}
