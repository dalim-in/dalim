'use client'

// this is a client component
import { useEffect } from 'react'
import React from 'react'
import { Tools } from '@/src/components/about/tools'
import { About } from '@/src/components/about/about'
import { AboutME } from '@/src/components/about/me'
import { Connect } from '@dalim/core/components/common/connect'
import { renderCanvas } from '@dalim/core/components/backgrunds/canvas-particle'

export default function AboutPage() {
    useEffect(() => {
        renderCanvas()
    }, [])

    return ( 
        <div className="">
            <About />
            <div className="relative mt-10 before:absolute before:-inset-x-6 before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
            <div className="mx-auto max-w-6xl border-x px-6 pb-10">
                <AboutME />
                <Tools />
                <Connect />
            </div>
            <canvas
                id="canvas"
                className="pointer-events-none fixed left-0 top-0 z-[-1] h-screen w-full cursor-pointer"></canvas>
        </div>
    )
}
