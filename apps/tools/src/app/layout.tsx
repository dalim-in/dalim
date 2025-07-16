import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

import { Toaster as Sonner } from '@dalim/core/ui/sonner'
import { Toaster } from '@dalim/core/ui/toaster'
import { Suspense } from 'react'

import './globals.css'
import { HeaderTools } from '@dalim/core/components/layout/header'
import { FooterAgency } from '@dalim/core/components/layout/footer'
import Providers from '../components/providers'
import { Loader } from 'lucide-react'
const fontSans = Geist({
    subsets: ['latin'],
    variable: '--font-sans',
})

export const metadata: Metadata = {
    metadataBase: new URL('https://tools.dalim.in'),
    title: 'Tools - Dalim',
    description: 'Designs Tools',
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
               <Providers>
                     <div className="overflow-hidden px-4 supports-[overflow:clip]:overflow-clip sm:px-6">
                        <div className="relative mx-auto w-full before:absolute before:inset-y-0 before:-left-6 before:w-px before:bg-[linear-gradient(to_bottom,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))] after:absolute after:inset-y-0 after:-right-6 after:w-px after:bg-[linear-gradient(to_bottom,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]">
                            <div className="relative flex min-h-screen flex-col">
                                <HeaderTools />
                                <Suspense
                                    fallback={
                                        <div className="mt-[400px] flex h-screen justify-center">
                                            <Loader
                                                strokeWidth={0.5}
                                                className="h-10 w-10 animate-spin"
                                            />
                                        </div>
                                    }>
                                    <main className="grow">{children}</main>
                                </Suspense>
                                <FooterAgency />
                            </div>
                        </div>
                    </div>
                    <Toaster />
                    <Sonner />
                </Providers>
            </body>
        </html>
    )
}
