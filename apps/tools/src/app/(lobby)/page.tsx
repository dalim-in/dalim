'use client'
import { HeroSection } from '@/src/components/home/hero'

import { Connect } from '@dalim/core/components/common/connect'

export default function Home() {
    return (
        <div>
            <HeroSection /> 
            <div className="my-10">
                <Connect />
            </div>
        </div>
    )
}
