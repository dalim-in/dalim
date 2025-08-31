"use client"

import * as React from "react"

import { Button } from "@/registry/default/ui/button"
import { LiquidCard } from "@/registry/default/ui/card"

export function HeroSection() {
  return (
    <div className="h-full w-full p-6 md:p-20">
      <div className="relative h-full w-full">
        <LiquidCard className="h-[760px] p-0">
          <header className="relative z-20 flex items-center justify-between p-6">
            {/* Logo */}
            <div className="flex items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 392.02 324.6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#fff200"
                  d="M268.08,0c-27.4,0-51.41,4.43-72.07,13.26C175.36,4.43,151.35,0,123.95,0H0v324.6h123.95c27.37,0,51.38-4.58,72.07-13.7,20.69,9.12,44.7,13.7,72.07,13.7h123.95V0h-123.95ZM324.09,268.36h-47.91c-20.25,0-37.3-4.05-51.18-12.15-12.28-7.17-21.94-17.41-28.99-30.7h0s0,0,0,0c0,0,0,0,0,0h0c-7.05,13.29-16.71,23.53-28.99,30.7-13.87,8.1-30.93,12.15-51.18,12.15h-47.91V56.24h47.91c19.8,0,36.67,4.01,50.61,12.04,12.51,7.2,22.35,17.47,29.55,30.77h0s0,0,0,0c0,0,0,0,0,0h0c7.2-13.3,17.04-23.57,29.55-30.77,13.95-8.02,30.82-12.04,50.61-12.04h47.91v212.13Z"
                ></path>
              </svg>
            </div>

            {/* Navigation */}
            <nav className="hidden items-center space-x-2 md:flex">
              <a
                href="#"
                className="rounded-full px-3 py-2 text-xs font-light transition-all duration-200"
              >
                Products
              </a>
              <a
                href="#"
                className="rounded-full px-3 py-2 text-xs font-light transition-all duration-200"
              >
                Pricing
              </a>
              <a
                href="#"
                className="rounded-full px-3 py-2 text-xs font-light transition-all duration-200"
              >
                Docs
              </a>
            </nav>

            <Button className="z-10 flex h-8 cursor-pointer items-center rounded-full">
              Login
            </Button>
          </header>
          <main className="absolute bottom-8 left-8 z-20 max-w-lg">
            <div className="text-left">
              <div className="relative mb-4 inline-flex items-center rounded-full bg-white/5 px-3 py-1 backdrop-blur-sm">
                <div className="absolute top-0 right-1 left-1 h-px rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative z-10 text-xs font-light">
                  ✨ New Design Ideas
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="mb-4 text-5xl leading-14 tracking-tight md:text-6xl">
                <span className="instrument italic">Beautiful</span> Design
                <br />
                <span className="font-bold tracking-tight">Experiences</span>
              </h1>

              {/* Description */}
              <p className="text-primary/70 mb-4 text-xs leading-relaxed font-light">
                Discover the essence of creativity in our exquisite collection
                of top-tier abstract design assets. Each piece is a blend of
                beauty and utility, perfect for elevating any project.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="cursor-pointer rounded-full"
                >
                  Pricing
                </Button>
                <Button size={"lg"} className="cursor-pointer rounded-full">
                  Get Started
                </Button>
              </div>
            </div>
          </main>
        </LiquidCard>
      </div>
    </div>
  )
}
