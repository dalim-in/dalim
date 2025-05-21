import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getCurrentUser } from '@dalim/auth'
import { SidebarInset, SidebarProvider } from '@dalim/core/ui/sidebar'
import { Heart } from 'lucide-react'

interface ProtectedLayoutProps {
    children: React.ReactNode
}

export default async function Users({ children }: ProtectedLayoutProps) {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login') // Redirect to login if no user is found
    }

    if ((user && user.role === 'USER') || 'ADMIN')
        return (
            <div className="">
                <SidebarProvider>
                    <SidebarInset
                        style={{ marginTop: '18px' }}
                        className="mx-2 mb-2 rounded-lg border shadow-md">
                        {children}
                        <div className="mt-6">
                            <div className="absolute bottom-3 left-0 right-0 flex flex-col justify-between text-center text-xs">
                                <div className="flex flex-row items-center justify-center gap-1 border-t pt-3 text-slate-600 dark:text-slate-400">
                                    <span> © </span>
                                    <span>{new Date().getFullYear()}</span>
                                    <span>Made with</span>
                                    <Heart className="text-ali mx-1 h-4 w-4 animate-pulse" />
                                    <span> by </span>
                                    <span className="hover:text-ali dark:hover:text-ali cursor-pointer text-black dark:text-white">
                                        <Link
                                            aria-label="Logo"
                                            className="font-bold"
                                            href="https://www.instagram.com/aliimam.in/"
                                            target="_blank">
                                            Ali Imam {''}
                                        </Link>
                                    </span>
                                    -
                                    <span className="hover:text-ali dark:hover:text-ali cursor-pointer text-slate-600 dark:text-slate-400">
                                        <Link
                                            aria-label="Logo"
                                            className=""
                                            href="/">
                                            Designali
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </div>
        )
}
