'use client'

import Link from 'next/link'
import { Download } from 'lucide-react'

import { cn } from '@/src/lib/utils'
import { buttonVariants } from '@dalim/core/ui/button'
import { Separator } from '@dalim/core/ui/separator'
import { Skills } from './skills'
import { NumbersCount } from './numbers'

const AboutME = () => {
    return (
        <section>
            <div className="relative h-full w-full">
                <div className="">
                    <div className="flex flex-col items-center">
                        <h1 className="mt-10 pb-1 text-2xl font-bold md:text-4xl">Greetings!</h1>
                        <hr className="mx-auto my-4 h-1 w-6 rounded border-0 bg-violet-500"></hr>
                    </div>

                    <div className="items-center justify-center text-center align-top leading-8 md:flex-row">
                        <div className="mx-auto max-w-4xl px-8">
                            <p className="text-md">
                                Hi, my name is
                                <span className="text-brand font-bold">{' Ali Imam '}</span>
                                and I am a highly ambitious, self-motivated and driven
                                <br />
                                <span className="font-bold">{' Graphic Designer | Visualiser | Art Director | Developer '}</span>
                                based in Bokaro Steel City, India.
                            </p>
                            <br />

                            <p className="grid gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                                <span>I am a visionary graphic designer on a mission to transform concepts into captivating visual stories. With a passion for design that goes beyond pixels, I immerse myself in the realm of creativity, bringing digital products and experiences to life.</span>
                                <span>As a design enthusiast, my journey is marked by a relentless pursuit of perfection, particularly in the intricate world of pixel-perfect UI and the dynamic realm of graphic design. My dedication to merging form with function is evident in every project I undertake.</span>
                            </p>
                            <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">Designali is actually an agency of one. This means you'll work directly with me, founder of Designali.</p>
                        </div>

                        <Skills />
                        <div className="relative -mx-6 my-10">
                            <Separator />
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <Link
                                href="/Ali-CV.pdf"
                                download={true}
                                target="_blank"
                                className={cn(
                                    buttonVariants({
                                        variant: 'default',
                                        size: 'lg',
                                    })
                                )}>
                                <span className="flex gap-2 px-1">
                                    <Download size={14} />
                                    Download CV
                                </span>
                            </Link>
                            <Link
                                href="https://wa.me/917678432186"
                                target="_blank"
                                className={cn(
                                    buttonVariants({
                                        variant: 'default',
                                        size: 'lg',
                                    })
                                )}>
                                <span className="flex gap-2 px-1">Join Whatsapp</span>
                            </Link>
                        </div>
                        <div className="relative -mx-6 my-10">
                            <Separator />
                        </div>
                        <NumbersCount />
                    </div>
                </div>
            </div>
        </section>
    )
}

export { AboutME }
