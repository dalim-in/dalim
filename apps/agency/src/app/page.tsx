'use client'

import * as React from 'react'
import { DesignCards } from '../components/home/design-cards'

export default function Home() {
    return (
        <div>
            <main className="w-full overflow-hidden">
                <h1 className="text-center text-[clamp(2rem,8vw,7rem)] font-extrabold tracking-tighter">Designs Without Limits</h1>
                <p className="text-primary/60 px-6 text-center text-xs md:text-sm lg:text-lg">Unleashing creativity through bold visuals, seamless interfaces, and limitless possibilities—crafted to elevate your brand.</p>
            </main>
            <DesignCards />
        </div>
    )
}
