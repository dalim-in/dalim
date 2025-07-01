import type { Metadata, Viewport } from "next"
import { Geist } from "next/font/google"
import Providers from "@/src/components/providers"
import { AdSense } from "@dalim/core/components/common/adsence"
import { Analytics } from "@dalim/core/components/common/analytics"

import { Toaster as Sonner } from "@/registry/default/ui/sonner"
import { Toaster } from "@/registry/default/ui/toaster"

import "./globals.css"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.dalim.in"),
  title: "UI - Dalim",
  description: "Designs That Give",
}

const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#000000",
}

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
      <body
        className={`${fontSans.variable} font-sans tracking-[-0.25px] antialiased has-not-data-home:before:absolute has-not-data-home:before:inset-x-0 has-not-data-home:before:h-100 has-not-data-home:before:bg-linear-to-b has-not-data-home:before:from-zinc-100 has-data-home:bg-zinc-50 dark:has-not-data-home:before:hidden dark:has-data-home:bg-zinc-950`}
      >
        <Providers>
          <main className="grow">{children}</main>
          <Toaster />
          <Sonner />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
