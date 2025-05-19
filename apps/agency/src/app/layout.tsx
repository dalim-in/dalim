import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { ThemeProvider } from '@/src/components/theme-provider'

import { Toaster as Sonner } from '@dalim/core/ui/sonner'
import { Toaster } from '@dalim/core/ui/toaster'

import './globals.css'
import { HeaderAgency } from '@dalim/core/components/layout/header'
import { FooterAgency } from '@dalim/core/components/layout/footer'
const fontSans = Geist({
    subsets: ['latin'],
    variable: '--font-sans',
})

export const metadata: Metadata = {
    metadataBase: new URL('https://agency.dalim.in'),
    title: 'Agency - Dalim',
    description: 'Designs Without Limits',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className="scroll-smooth"
            suppressHydrationWarning>
            <body className={`${fontSans.variable} has-not-data-home:before:absolute has-not-data-home:before:inset-x-0 has-not-data-home:before:h-100 has-not-data-home:before:bg-linear-to-b has-not-data-home:before:from-zinc-100 has-data-home:bg-zinc-50 dark:has-not-data-home:before:hidden dark:has-data-home:bg-zinc-950 font-sans tracking-[-0.25px] antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    <div className="overflow-hidden supports-[overflow:clip]:overflow-clip">
                        <div className="relative mx-auto w-full max-w-7xl before:absolute before:inset-y-0 before:-left-12 before:w-px before:bg-[linear-gradient(to_bottom,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))] after:absolute after:inset-y-0 after:-right-12 after:w-px after:bg-[linear-gradient(to_bottom,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
                            <div className="relative flex min-h-screen flex-col">
                                <HeaderAgency />
                                <main className="grow">{children}</main>
                                <FooterAgency/>
                            </div>
                        </div>
                    </div>
                    <Toaster />
                    <Sonner />
                </ThemeProvider>
            </body>
        </html>
    )
}
