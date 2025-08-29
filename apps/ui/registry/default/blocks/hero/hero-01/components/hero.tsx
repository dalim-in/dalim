"use client"

import Link from "next/link"
import { ArrowRight, Plus, Shapes } from "lucide-react"

import { DotPattern } from "@/registry/default/ui/backgrounds/dot-pattern"
import { Button } from "@/registry/default/ui/button"

export function Hero() {
  return (
    <div className="animation-delay-8 animate-fadeIn flex flex-col items-center justify-center px-4 text-center">
      <div className="z-10 mb-6 sm:justify-center">
        <div className="bg-popover text-primary/60 relative flex items-center rounded-full border px-3 py-1 text-xs leading-6 whitespace-nowrap">
          <Shapes className="h-5 p-1" /> Introducing
          <Link
            href="/docs"
            rel="noreferrer"
            className="hover:text-ali ml-1 flex items-center font-semibold"
          >
            <div className="absolute inset-0 flex" aria-hidden="true" />
            Explore Shader
            <span aria-hidden="true">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-4 mb-10 md:mt-6">
        <div className="px-2">
          <div className="border-ali relative mx-auto h-full max-w-5xl border [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)] p-6 md:px-10 md:py-12">
            <DotPattern />
            <h1 className="flex flex-col px-3 py-2 text-center text-5xl leading-none font-semibold tracking-tight select-none md:flex-col md:text-8xl lg:flex-row lg:text-8xl">
              <Plus
                strokeWidth={4}
                className="text-ali absolute -top-5 -left-5 h-10 w-10"
              />
              <Plus
                strokeWidth={4}
                className="text-ali absolute -bottom-5 -left-5 h-10 w-10"
              />
              <Plus
                strokeWidth={4}
                className="text-ali absolute -top-5 -right-5 h-10 w-10"
              />
              <Plus
                strokeWidth={4}
                className="text-ali absolute -right-5 -bottom-5 h-10 w-10"
              />
              Your complete platform for the Design.
            </h1>
            <div className="flex items-center justify-center gap-1">
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <p className="text-xs text-green-500">Available Now</p>
            </div>
          </div>
        </div>

        <h1 className="mt-8 text-2xl md:text-2xl">
          Welcome to my creative playground! I&#39;m{" "}
          <span className="text-ali font-bold">Ali </span>
        </h1>

        <p className="md:text-md text-primary/60 mx-auto mt-2 mb-16 max-w-2xl px-6 text-sm sm:px-6 md:max-w-4xl md:px-20 lg:text-lg">
          I craft enchanting visuals for brands, and conjure design resources to
          empower others.
        </p>
        <div className="flex justify-center gap-2">
          <Link href={"/dashboard"}>
            <Button variant="default" size="lg">
              Start Project
            </Button>
          </Link>
          <Link href={"https://cal.com/aliimam/designali"} target="_blank">
            <Button variant="outline" size="lg">
              Book a call
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
