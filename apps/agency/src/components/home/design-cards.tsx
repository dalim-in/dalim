import * as React from 'react'

import Image from 'next/image'
import { AboutMe } from './about-me'
import { Tools } from './tools'

export function DesignCards() {
    return (
        <div className="mx-auto max-w-4xl">
            <div className="flex flex-col items-center justify-center py-10">
                <div>
                    <h1 className="mx-auto mb-10 max-w-xs px-6 text-center text-xl font-thin md:max-w-full md:text-3xl">Design, the way it was always meant to be.</h1>
                </div>
                <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-3 lg:px-0">
                    <div className="rounded-3xl p-2 shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] transition-all dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]">
                        <div className="relative rounded-xl">
                            <Image
                                src="/images/1.svg"
                                alt="Your Image"
                                height={700}
                                width={700}
                                className="h-[400px] w-full rounded-xl object-cover"
                            />
                            <Image
                                src="/images/4.jpg"
                                alt="Your Image"
                                height={300}
                                width={300}
                                className="absolute left-1/2 top-36 z-10 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-md border-4 object-cover shadow-xl transition-all duration-500 hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 w-full rounded-b-xl bg-gradient-to-t from-black/60 to-transparent p-8 pt-16">
                                <div>
                                    <h1 className="text-2xl text-white">Subscribe</h1>
                                    <p className="text-sm text-white/80">Subscribe to a plan, get access to Dashboard, and start listing your requests.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-3xl p-2 shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] transition-all dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]">
                        <div className="relative overflow-hidden">
                            <Image
                                src="/images/2.svg"
                                alt="Your Image"
                                height={700}
                                width={700}
                                className="h-[400px] w-full rounded-xl object-cover"
                            />
                            <div className="absolute left-1/2 top-36 z-10 -translate-x-1/2 -translate-y-1/2">
                                <Tools />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full rounded-b-xl bg-gradient-to-t from-black/60 to-transparent p-4 pt-16">
                                <h1 className="text-2xl text-white">Request</h1>
                                <p className="text-sm text-white/80">Request whatever you'd like, from branding, website, social media to any design. </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-3xl p-2 shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] transition-all dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]">
                        <div className="relative overflow-hidden">
                            <Image
                                src="/images/3.svg"
                                alt="Your Image"
                                height={700}
                                width={700}
                                className="h-[400px] w-full rounded-xl object-cover"
                            />
                            <AboutMe />
                            <div className="absolute bottom-0 left-0 w-full rounded-b-xl bg-gradient-to-t from-black/60 to-transparent p-4 pt-16">
                                <h1 className="text-2xl text-white">Receive</h1>
                                <p className="text-sm text-white/80">Receive your design within two business days on average except weekends. Yes, it can be that fast.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
