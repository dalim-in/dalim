'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '../../lib/utils'
import { useAnimate } from 'framer-motion'
import Image from 'next/image'

import { Button, buttonVariants } from '../../ui/button'

import { HighlighterItem, HighlightGroup, Particles } from '../backgrunds/highlighter'
import { Mail, Menu } from 'lucide-react'

type ConnectProps = {
    className?: string
}

export function Connect({ className }: ConnectProps) {
    const [scope, animate] = useAnimate()

    React.useEffect(() => {
        animate(
            [
                ['#pointer', { left: 200, top: 60 }, { duration: 0 }],
                ['#javascript', { opacity: 1 }, { duration: 0.3 }],
                ['#pointer', { left: 50, top: 102 }, { at: '+0.5', duration: 0.5, ease: 'easeInOut' }],
                ['#javascript', { opacity: 0.4 }, { at: '-0.3', duration: 0.1 }],
                ['#react-js', { opacity: 1 }, { duration: 0.3 }],
                ['#pointer', { left: 224, top: 170 }, { at: '+0.5', duration: 0.5, ease: 'easeInOut' }],
                ['#react-js', { opacity: 0.4 }, { at: '-0.3', duration: 0.1 }],
                ['#typescript', { opacity: 1 }, { duration: 0.3 }],
                ['#pointer', { left: 88, top: 198 }, { at: '+0.5', duration: 0.5, ease: 'easeInOut' }],
                ['#typescript', { opacity: 0.4 }, { at: '-0.3', duration: 0.1 }],
                ['#next-js', { opacity: 1 }, { duration: 0.3 }],
                ['#pointer', { left: 200, top: 60 }, { at: '+0.5', duration: 0.5, ease: 'easeInOut' }],
                ['#next-js', { opacity: 0.5 }, { at: '-0.3', duration: 0.1 }],
            ],
            {
                repeat: Number.POSITIVE_INFINITY,
            }
        )
    }, [animate])
    return (
        <section className={cn('relative mx-auto max-w-4xl', className)}>
            <HighlightGroup className="group h-full">
                <div
                    className="group/item h-full md:col-span-6 lg:col-span-12"
                    data-aos="fade-down">
                    <HighlighterItem className="rounded-3xl p-6">
                        <div className="relative z-20 h-full overflow-hidden rounded-3xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
                            <Particles
                                className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 ease-in-out group-hover/item:opacity-100"
                                quantity={200}
                                color={'#fff200'}
                                vy={-0.2}
                            />
                            <div className="flex justify-center">
                                <div className="flex h-full flex-col justify-center gap-10 p-4 md:h-[300px] md:flex-row">
                                    <div
                                        className="relative mx-auto h-[270px] w-[300px] md:h-[270px] md:w-[300px]"
                                        ref={scope}>
                                        <Image
                                            src="/brand/logo-icon.svg"
                                            alt="Your Image"
                                            height={50}
                                            width={50}
                                            className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 h-10 w-10"
                                        />

                                        <div
                                            id="next-js"
                                            className="absolute bottom-12 left-14 rounded-3xl border border-neutral-400 bg-neutral-200 px-2 py-1.5 text-xs opacity-50 dark:border-neutral-600 dark:bg-neutral-800">
                                            UI-UX
                                        </div>
                                        <div
                                            id="react-js"
                                            className="absolute left-2 top-20 rounded-3xl border border-neutral-400 bg-neutral-200 px-2 py-1.5 text-xs opacity-50 dark:border-neutral-600 dark:bg-neutral-800">
                                            Graphic Design
                                        </div>
                                        <div
                                            id="typescript"
                                            className="absolute bottom-20 right-1 rounded-3xl border border-neutral-400 bg-neutral-200 px-2 py-1.5 text-xs opacity-50 dark:border-neutral-600 dark:bg-neutral-800">
                                            Web Application
                                        </div>
                                        <div
                                            id="javascript"
                                            className="absolute right-12 top-10 rounded-3xl border border-neutral-400 bg-neutral-200 px-2 py-1.5 text-xs opacity-50 dark:border-neutral-600 dark:bg-neutral-800">
                                            Branding
                                        </div>

                                        <div
                                            id="pointer"
                                            className="absolute">
                                            <svg
                                                width="16.8"
                                                height="18.2"
                                                viewBox="0 0 12 13"
                                                className="fill-red-500"
                                                stroke="white"
                                                strokeWidth="1"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676V5.50676Z"
                                                />
                                            </svg>
                                            <span className="bg-ali relative -top-1 left-3 rounded-3xl px-2 py-1 text-xs text-white">Ali</span>
                                        </div>
                                    </div>

                                    <div className="-mt-20 flex h-full flex-col justify-center p-2 md:-mt-4 md:ml-10 md:w-[400px]">
                                        <div className="flex flex-col items-center">
                                            <h3 className="mt-6 pb-1 font-bold">
                                                <span className="text-2xl md:text-4xl">Any questions about Design?</span>
                                            </h3>
                                        </div>
                                        <p className="mb-4 text-neutral-400">Feel free to reach out to me!</p>
                                        <div className="flex flex-wrap gap-2">
                                            <Link
                                                href={'https://cal.com/dalim/15min'}
                                                target="_blank">
                                                <Button>Book a call</Button>
                                            </Link>
                                            <Link
                                                href="mailto:contact@designali.in"
                                                target="_blank"
                                                className={cn(
                                                    buttonVariants({
                                                        variant: 'outline',
                                                        size: 'icon',
                                                    })
                                                )}>
                                                <span className="flex items-center gap-1">
                                                    <Mail
                                                        strokeWidth={1}
                                                        className="h-5 w-5"
                                                    />
                                                </span>
                                            </Link>
                                            <Link
                                                href="https://wa.me/917678432186"
                                                target="_blank"
                                                className={cn(
                                                    buttonVariants({
                                                        variant: 'outline',
                                                        size: 'icon',
                                                    })
                                                )}>
                                                <span className="flex items-center gap-1">
                                                    <svg
                                                        viewBox="0 0 256 259"
                                                        width="256"
                                                        height="259"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        preserveAspectRatio="xMidYMid">
                                                        <path
                                                            d="m67.663 221.823 4.185 2.093c17.44 10.463 36.971 15.346 56.503 15.346 61.385 0 111.609-50.224 111.609-111.609 0-29.297-11.859-57.897-32.785-78.824-20.927-20.927-48.83-32.785-78.824-32.785-61.385 0-111.61 50.224-110.912 112.307 0 20.926 6.278 41.156 16.741 58.594l2.79 4.186-11.16 41.156 41.853-10.464Z"
                                                            fill="#00E676"
                                                        />
                                                        <path
                                                            d="M219.033 37.668C195.316 13.254 162.531 0 129.048 0 57.898 0 .698 57.897 1.395 128.35c0 22.322 6.278 43.947 16.742 63.478L0 258.096l67.663-17.439c18.834 10.464 39.76 15.347 60.688 15.347 70.453 0 127.653-57.898 127.653-128.35 0-34.181-13.254-66.269-36.97-89.986ZM129.048 234.38c-18.834 0-37.668-4.882-53.712-14.648l-4.185-2.093-40.458 10.463 10.463-39.76-2.79-4.186C7.673 134.63 22.322 69.058 72.546 38.365c50.224-30.692 115.097-16.043 145.79 34.181 30.692 50.224 16.043 115.097-34.18 145.79-16.045 10.463-35.576 16.043-55.108 16.043Zm61.385-77.428-7.673-3.488s-11.16-4.883-18.136-8.371c-.698 0-1.395-.698-2.093-.698-2.093 0-3.488.698-4.883 1.396 0 0-.697.697-10.463 11.858-.698 1.395-2.093 2.093-3.488 2.093h-.698c-.697 0-2.092-.698-2.79-1.395l-3.488-1.395c-7.673-3.488-14.648-7.674-20.229-13.254-1.395-1.395-3.488-2.79-4.883-4.185-4.883-4.883-9.766-10.464-13.253-16.742l-.698-1.395c-.697-.698-.697-1.395-1.395-2.79 0-1.395 0-2.79.698-3.488 0 0 2.79-3.488 4.882-5.58 1.396-1.396 2.093-3.488 3.488-4.883 1.395-2.093 2.093-4.883 1.395-6.976-.697-3.488-9.068-22.322-11.16-26.507-1.396-2.093-2.79-2.79-4.883-3.488H83.01c-1.396 0-2.79.698-4.186.698l-.698.697c-1.395.698-2.79 2.093-4.185 2.79-1.395 1.396-2.093 2.79-3.488 4.186-4.883 6.278-7.673 13.951-7.673 21.624 0 5.58 1.395 11.161 3.488 16.044l.698 2.093c6.278 13.253 14.648 25.112 25.81 35.575l2.79 2.79c2.092 2.093 4.185 3.488 5.58 5.58 14.649 12.557 31.39 21.625 50.224 26.508 2.093.697 4.883.697 6.976 1.395h6.975c3.488 0 7.673-1.395 10.464-2.79 2.092-1.395 3.487-1.395 4.882-2.79l1.396-1.396c1.395-1.395 2.79-2.092 4.185-3.487 1.395-1.395 2.79-2.79 3.488-4.186 1.395-2.79 2.092-6.278 2.79-9.765v-4.883s-.698-.698-2.093-1.395Z"
                                                            fill="#FFF"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </HighlighterItem>
                </div>
            </HighlightGroup>
        </section>
    )
}
