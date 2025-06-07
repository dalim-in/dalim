import Image from 'next/image'
import React from 'react'
import { ImageZoom } from '@dalim/core/components/backgrunds/image-zoom'
import { AboutTrackPattern } from '@/src/components/about/track-pattern'
import { Plus } from 'lucide-react'

export function About() {
    return (
        <div className="relative">
            <div className="">
                <p className="text-brand text-center tracking-widest">FOUNDER</p>
                <div className="grid items-center lg:grid-cols-3">
                    <h1 className="mt-6 text-center">I&apos;m Ali, Creative Design Engineer.</h1>

                    <div className="border-brand/10 relative mx-auto my-6 flex h-[336px] max-w-[250px] flex-col items-start border p-4 md:h-[28rem] md:max-w-sm">
                        <Plus
                            strokeWidth={0.5}
                            className="text-brand absolute -left-4 -top-4 h-8 w-8"
                        />
                        <Plus
                            strokeWidth={0.5}
                            className="text-brand absolute -bottom-4 -left-4 h-8 w-8"
                        />
                        <Plus
                            strokeWidth={0.5}
                            className="text-brand absolute -right-4 -top-4 h-8 w-8"
                        />
                        <Plus
                            strokeWidth={0.5}
                            className="text-brand absolute -bottom-4 -right-4 h-8 w-8"
                        />
                        <ImageZoom>
                            <Image
                                src="/ai.JPEG"
                                alt="Your Image"
                                height={700}
                                width={700}
                                className="h-[300px] object-cover md:h-[404px]"
                            />
                            <div className="relative -mt-14 bg-gradient-to-b from-black/0 to-black text-white md:-mt-24">
                                <h1 className="z-20 items-center text-center text-[40px] font-black tracking-tighter md:text-[70px]">Ali Imam</h1>{' '}
                            </div>
                        </ImageZoom>
                    </div>
                    <h1 className="mt-6 text-center">Designs That Give.</h1>
                </div>
            </div>
            <div className="relative space-y-10 md:space-y-16">
                {/* About */}
                <div className="relative space-y-6 text-center">
                    <div className="relative h-fit w-full overflow-hidden">
                        <div className="absolute inset-0 left-1/2 top-0 w-[300px] -translate-x-1/2 transform">
                            <AboutTrackPattern />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
