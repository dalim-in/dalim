import type { Metadata } from "next"

import { META_THEME_COLORS, siteConfig } from "@/src/lib/config"
import { fontVariables } from "@/src/lib/fonts"
import { cn } from "@/src/lib/utils"
import { LayoutProvider } from "@/src/hooks/use-layout"
import { ActiveThemeProvider } from "@/src/components/active-theme"
import { Analytics } from "@/src/components/analytics"
import { TailwindIndicator } from "@/src/components/tailwind-indicator" 
import { Toaster } from "@/registry/default/ui/sonner" 

import "@/src/styles/globals.css"  
import { Providers } from "../components/providers"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(process.env.UI_URL!),
  description: siteConfig.description,
  keywords: ["Next.js", "React", "Tailwind CSS", "Components", "shadcn"],
  authors: [
    {
      name: "dalim/ui",
      url: "https://ui.dalim.in",
    },
  ],
  creator: "shadcn",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.UI_URL!,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${process.env.UI_URL}/opengraph-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${process.env.UI_URL}/opengraph-image.jpg`],
    creator: "@shadcn",
  },
  icons: {
    icon: "./icon.svg",
    shortcut: "./icon.svg",
    apple: "./icon.svg",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
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
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
              } catch (_) {}
            `,
          }}
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
      </head>
      <body
        className={cn(
          "text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
          fontVariables
        )}
      >
        <Providers> 
          <LayoutProvider>
            <ActiveThemeProvider> 
              
              {children} 
              <TailwindIndicator />
              <Toaster position="top-center" />
              <Analytics />
            </ActiveThemeProvider>
          </LayoutProvider> 
        </Providers>
      </body>
    </html>
  )
}
