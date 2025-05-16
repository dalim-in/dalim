import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'  

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})
  
export const metadata: Metadata = {
    title: 'Design That Give | Dalim',
    description: '',
    keywords: '',
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
            <body className={`${geistSans.variable} overflow-x-hidden antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    {children}
                </ThemeProvider>
                 
            </body>
            
        </html>
    )
}
