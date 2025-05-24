import React from 'react'
import { Tools } from '@/src/components/about/tools'
import { About } from '@/src/components/about/about'

export default function AboutPage() {
    return (
        <div className="relative">
            <About />
            <div className="relative mt-10 before:absolute before:-inset-x-6 before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
            <div className="mx-auto max-w-6xl border-x px-6 py-6">
                <Tools />
            </div>
        </div>
    )
}
