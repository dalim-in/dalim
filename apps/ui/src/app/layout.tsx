import type { Metadata } from "next"
import { Geist } from "next/font/google"
import Providers from "@/src/components/providers"
import { FooterUI } from "@dalim/core/components/layout/footer"

import { Toaster as Sonner } from "@/registry/default/ui/sonner"
import { Toaster } from "@/registry/default/ui/toaster"

import "./globals.css"

import { HeaderUI } from "@dalim/core/components/layout/header"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.dalim.in"),
  title: "UI - Dalim",
  description: "Designs That Give",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} font-sans tracking-[-0.25px] antialiased has-not-data-home:before:absolute has-not-data-home:before:inset-x-0 has-not-data-home:before:h-100 has-not-data-home:before:bg-linear-to-b has-not-data-home:before:from-zinc-100 has-data-home:bg-zinc-50 dark:has-not-data-home:before:hidden dark:has-data-home:bg-zinc-950`}
      >
        <Providers>
          <div className="overflow-hidden px-4 supports-[overflow:clip]:overflow-clip sm:px-6">
            <div className="before:bg-[linear-gradient(to_bottom,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))] after:bg-[linear-gradient(to_bottom,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))] relative mx-auto w-full max-w-7xl before:absolute before:inset-y-0 before:-left-12 before:w-px after:absolute after:inset-y-0 after:-right-12 after:w-px">
              <div className="relative flex min-h-screen flex-col">
                <HeaderUI />
                <main className="grow">{children}</main>
                <FooterUI />
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
