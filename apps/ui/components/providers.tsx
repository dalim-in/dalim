'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from './theme-provider'
import { TooltipProvider } from '@dalim/core/ui/tooltip' 

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <SessionProvider >
                <TooltipProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange>
                       
                            {children}
                        
                    </ThemeProvider>
                </TooltipProvider>
            </SessionProvider>
        </>
    )
}

export { Providers }