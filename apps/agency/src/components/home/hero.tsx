'use client'

import { Badge } from '@dalim/core/ui/badge'
import { Button } from '@dalim/core/ui/button'
import Link from 'next/link'
import * as React from 'react'

export function Hero() {
    return (
        <div className="mt-12 flex flex-col items-center">
            <Badge
                variant={'outline'}
                className="text-primary/60 mb-6">
                New Products. Coming Soon.
            </Badge>
            <main className="relative w-full overflow-hidden px-6">
                <h1 className="text-center mb-3 text-7xl font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)]">Design Without Limits</h1>
                <p className="text-primary/60 px-6 text-center text-xs md:text-sm lg:text-lg">Unleashing creativity through bold visuals, seamless interfaces, and limitless possibilities—crafted to elevate your brand.</p>
                <div className="mt-8 flex items-center justify-center gap-1">
                    <span className="relative flex h-3 w-3 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    <p className="text-xs text-green-500">Available Now</p>
                </div>
            </main>
            <div className="mt-8">
                <Link href={'/#pricing'}>
                    <Button size={'lg'}>Let's Go</Button>
                </Link>
            </div>
        </div>
    )
}
