'use client'


import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from './theme-provider'
import { TooltipProvider } from '@dalim/core/ui/tooltip' 
import { FontPreviewProvider } from '../hooks/use-font-preview'

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
                        <FontPreviewProvider>
                            {children}
                       </FontPreviewProvider>
                    </ThemeProvider>
                </TooltipProvider>
            </SessionProvider>
        </>
    )
}

export default Providers
