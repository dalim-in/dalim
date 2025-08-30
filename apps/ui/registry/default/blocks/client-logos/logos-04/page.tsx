"use client"

import { ClientLogos } from "@/registry/default/blocks/client-logos/logos-04/components/logos"
import { AnimatedGradient } from "@/registry/default/ui/backgrounds/animated-gradient"

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-6 md:p-10">
      <div className="relative z-50 flex flex-col justify-center">
        <h1 className="mb-10 px-6 text-center text-lg font-medium text-white">
          Backed by the design industry’s top creators and brands.
        </h1>
        <ClientLogos />
      </div>
      <AnimatedGradient />
      <div className="absolute h-full w-full bg-red-500 mix-blend-color-burn" />
    </div>
  )
}
