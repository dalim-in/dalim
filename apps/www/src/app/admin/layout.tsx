import { getCurrentUser } from '@dalim/auth'
import { redirect } from 'next/navigation'
import { Metadata } from 'next/types'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@dalim/core/ui/sidebar'

import { AppSidebar } from '@/src/components/dashboard/sidebar/app-sidebar'

const title = 'Admin'
const description = 'Manage users and view system statistics'

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        images: [
            {
                url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: [
            {
                url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
            },
        ],
    },
}

export default async function BlocksLayout({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login') // Redirect to login if no user is found
    }

    if (!user || user.role !== 'ADMIN') {
        redirect('/dashboard') // Redirect to dashboard if no user or if user is not an admin
    }
    return (
       <div className="">
                <div className="relative -mx-6">
                    <SidebarProvider>
                        <AppSidebar className="sticky top-24 -mt-14" />
                        <SidebarInset className="-mt-11 mb-4 md:mb-3 mx-6 md:mx-0 md:mr-3 rounded-xl p-6">
                            <div className="flex flex-col">
                                <div className="">
                                    <SidebarTrigger className="mb-4 -mt-3" />
                                    <div className="relative before:absolute before:-inset-x-6 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
                                </div>
                            </div>
                            {children}
                            <div className="flex flex-1 flex-col gap-4">
                                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                                    <div className="bg-muted/50 aspect-video rounded-xl" />
                                    <div className="bg-muted/50 aspect-video rounded-xl" />
                                    <div className="bg-muted/50 aspect-video rounded-xl" />
                                </div>
                                <div className="bg-muted/50 h-[100vh] flex-1 rounded-xl" />
                            </div>
                        </SidebarInset>
                    </SidebarProvider>
                </div>
            </div>
    )
}
