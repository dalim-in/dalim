import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

import { Toaster as Sonner } from '@dalim/core/ui/sonner'
import { Toaster } from '@dalim/core/ui/toaster'
import { Suspense } from 'react'
import { AdSense } from '@dalim/core/components/common/adsence'
import { Analytics } from '@dalim/core/components/common/analytics'

import './globals.css'
import { HeaderIcons } from '@dalim/core/components/layout/header'
import { FooterAgency } from '@dalim/core/components/layout/footer'
import Providers from '../components/providers'
import { Loader } from 'lucide-react'
const fontSans = Geist({
    subsets: ['latin'],
    variable: '--font-sans',
})

export const metadata: Metadata = {
    metadataBase: new URL('https://agency.dalim.in'),
    title: 'Icons - Dalim',
    description: 'Designs Icons',
}

const META_THEME_COLORS = {
    light: '#ffffff',
    dark: '#000000',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
                    }}
                />
                <AdSense pId="ca-pub-3647003303744848" />
            </head>
            <body className={`${fontSans.variable} has-not-data-home:before:absolute has-not-data-home:before:inset-x-0 has-not-data-home:before:h-100 has-not-data-home:before:bg-linear-to-b has-not-data-home:before:from-zinc-100 has-data-home:bg-zinc-50 dark:has-not-data-home:before:hidden dark:has-data-home:bg-zinc-950 font-sans tracking-[-0.25px] antialiased`}>
                <Providers>
                    <div className="overflow-hidden px-4 supports-[overflow:clip]:overflow-clip sm:px-6">
                        <div className="relative mx-auto w-full before:absolute before:inset-y-0 before:-left-6 before:w-px before:bg-[linear-gradient(to_bottom,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))] after:absolute after:inset-y-0 after:-right-6 after:w-px after:bg-[linear-gradient(to_bottom,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]">
                            <div className="relative flex min-h-screen flex-col">
                                <HeaderIcons />
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
                                <div className="relative mx-auto w-full max-w-7xl before:absolute before:inset-y-0 before:-left-6 before:w-px before:bg-[linear-gradient(to_bottom,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))] after:absolute after:inset-y-0 after:-right-6 after:w-px after:bg-[linear-gradient(to_bottom,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]">
                                    <FooterAgency />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Toaster />
                    <Sonner />
                    <Analytics />
                </Providers>
            </body>
        </html>
    )
}
