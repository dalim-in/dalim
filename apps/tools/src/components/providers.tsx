'use client'


import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from './theme-provider'
import { TooltipProvider } from '@dalim/core/ui/tooltip' 
import { NuqsAdapter } from "nuqs/adapters/next/app";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <SessionProvider>
                <TooltipProvider>
                    <NuqsAdapter>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange>
                        
                            {children}
                       
                    </ThemeProvider>
                    </NuqsAdapter>
                </TooltipProvider>
            </SessionProvider>
        </>
    )
}

export default Providers
