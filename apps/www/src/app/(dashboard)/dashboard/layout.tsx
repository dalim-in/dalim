import { redirect } from 'next/navigation'

import { getCurrentUser } from '@dalim/auth'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@dalim/core/ui/sidebar'

import { AppSidebar } from '@/src/components/dashboard/sidebar/app-sidebar'

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
