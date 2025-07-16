import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@dalim/core/ui/button'
import Image from 'next/image'
import { TextEffect } from '@/src/components/ui/text-effect'
import { GradientBackground } from '@dalim/core/components/backgrunds/flicker-grid'

export function HeroSection() {
    return (
        <>
            <main className="relative -mx-6 -mt-14 overflow-hidden">
                <GradientBackground
                    className="absolute"
                    squareSize={1}
                    gridGap={4}
                    color="#6B7280"
                    maxOpacity={0.7}
                    flickerChance={0.1}
                />

                <section>
                    <div className="relative mt-20">
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <div>
                                    <Link
                                        href="#link"
                                        className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950">
                                        <span className="text-foreground text-sm">Introducing Gradient Tool</span>
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

                                <TextEffect
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    as="h1"
                                    className="mx-auto mt-8 max-w-4xl text-6xl font-semibold tracking-tighter md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                                    Design Tools for User Experience
                                </TextEffect>
                                <TextEffect
                                    per="line"
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    delay={0.5}
                                    as="p"
                                    className="text-primary/60 mx-auto mt-8 max-w-2xl text-lg">
                                    Explore the modern toolkit behind intuitive, accessible, and engaging digital products.
                                </TextEffect>

                                <div className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                    <div
                                        key={1} >
                                        <Button
                                            asChild
                                            size="lg"
                                            className="px-5 text-base">
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
                                        className="h-10.5 px-5">
                                        <Link target='_blank' href="https://cal.com/dalim/15min">
                                            <span className="text-nowrap">Request a demo</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                                />
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                                    <Image
                                        className="bg-background relative hidden w-full rounded-xl dark:block"
                                        src="/images/tools-dark.jpg"
                                        alt="tools screen"
                                        width="2700"
                                        height="1440"
                                    />
                                    <Image
                                        className="z-2 bg-background relative w-full rounded-xl border dark:hidden"
                                        src="/images/tools.jpg"
                                        alt="tools screen"
                                        width="2700"
                                        height="1440"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
