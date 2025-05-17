"use client"
 
import * as React from "react"
import { BackgroundGradientAnimation } from '@/components/background'
import { ThemeToggle } from '@/components/theme-toggle' 

export default function Home() {
    
    return (
        <div>
            
            <main className="relative min-h-svh w-full overflow-hidden">
                <h1 className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-extrabold tracking-tighter text-white md:text-8xl dark:text-black">Designs That Give</h1>
                
                <BackgroundGradientAnimation />
                <div className="absolute bottom-10 left-1/2 z-10 mt-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                    <p>Coming Soon</p>
                    <ThemeToggle />
                    
                </div>
            </main>
        </div>
    )
}
