'use client'

import { DALIM_URL } from '@dalim/auth'
import { Button } from '@dalim/core/ui/button'
import Link from 'next/link'
import * as React from 'react'  

export function Hero() {
    return (
        <div className="mt-12 h-[40vh] flex flex-col items-center"> 
            <main className="relative mt-20 w-full overflow-hidden px-6">
                <h1 className="mb-3 text-center text-7xl font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)]">Graphic</h1>
                <p className="text-primary/60 px-6 text-center text-xs md:text-sm lg:text-lg">Coming Soon.</p>
                <div className="my-8 flex items-center justify-center gap-1">
                    <span className="relative flex h-3 w-3 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    <p className="text-xs text-green-500">Available for New Projects</p>
                </div>
            </main>
            <div className="">
                <Link href={`${DALIM_URL}`}>
                    <Button size={'lg'}>Let's Go</Button>
                </Link>
            </div>
        </div>
    )
}
