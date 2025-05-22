'use client'

import { Suspense } from 'react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from './theme-provider'
import { TooltipProvider } from '@dalim/core/ui/tooltip'
import { Loader } from 'lucide-react'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <SessionProvider>
                <TooltipProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange>
                        <Suspense
                            fallback={
                                <div className="mt-[400px] flex h-screen justify-center">
                                    <Loader
                                        strokeWidth={0.5}
                                        className="h-10 w-10 animate-spin"
                                    />
                                </div>
                            }>
                            {children}
                        </Suspense>
                    </ThemeProvider>
                </TooltipProvider>
            </SessionProvider>
        </>
    )
}

export default Providers
