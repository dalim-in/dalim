import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/registry/default/ui/button"

export function HeroSection() {
  return (
    <div className="z-30 h-screen pt-20">
      <div className="">
        <div className="text-center sm:mx-auto lg:mt-0 lg:mr-auto">
          <div>
            <Link
              href="#link"
              className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
            >
              <span className="text-foreground text-sm">
                Introducing Gradient Tool
              </span>
              <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

              <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                  <span className="flex size-6">
                    <ArrowRight className="m-auto size-3" />
                  </span>
                  <span className="flex size-6">
                    <ArrowRight className="m-auto size-3" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl text-6xl font-semibold tracking-tighter md:text-7xl lg:mt-16 xl:text-[5.25rem]">
            Design Tools for User Experience
          </h1>
          <h1 className="text-primary/60 mx-auto mt-8 max-w-2xl text-lg">
            Explore the modern toolkit behind intuitive, accessible, and
            engaging digital products.
          </h1>

          <div className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
            <div key={1}>
              <Button asChild size="lg" className="px-5 text-base">
                <Link href="/gradient">
                  <span className="text-nowrap">Start Designing</span>
                </Link>
              </Button>
            </div>
            <Button
              key={2}
              asChild
              size="lg"
              variant="ghost"
              className="h-10.5 px-5"
            >
              <Link target="_blank" href="https://cal.com/dalim/15min">
                <span className="text-nowrap">Request a demo</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className="relative mt-8 -mr-56 overflow-hidden px-2 sm:mt-12 sm:mr-0 md:mt-20">
          <div
            aria-hidden
            className="to-background absolute inset-0 z-10 bg-linear-to-b from-transparent from-35%"
          />
          <div className="ring-background bg-background relative mx-auto h-[345px] w-full max-w-4xl overflow-hidden rounded-3xl border p-4 shadow-lg ring-1 inset-shadow-2xs shadow-zinc-950/15 dark:inset-shadow-white/20">
            <Image
              className="bg-background relative hidden w-full rounded-xl dark:block"
              src="/images/tools-dark.jpg"
              alt="tools screen"
              width="2700"
              height="1440"
            />
            <Image
              className="bg-background relative z-2 w-full rounded-xl border dark:hidden"
              src="/images/tools.jpg"
              alt="tools screen"
              width="2700"
              height="1440"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
