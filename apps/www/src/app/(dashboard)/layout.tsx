import { redirect } from 'next/navigation'

import { getCurrentUser } from '@dalim/auth'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@dalim/core/ui/sidebar'

import { AppSidebar } from '@/src/components/dashboard/sidebar/app-sidebar'
import { Separator } from '@dalim/core/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@dalim/core/ui/breadcrumb'
import { NotificationBell } from '@/src/components/dashboard/notification/notification-bell'

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
            <div className="relative -mx-6 -mt-14 h-[950px]">
                <SidebarProvider className="relative flex h-full">
                    <AppSidebar
                        user={user}
                        className="relative h-[950px] border-l"
                    />
                    <SidebarInset className="">
                        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger/>
                                <Separator
                                    orientation="vertical"
                                    className="data-[orientation=vertical]:h-6"
                                />
                                <Breadcrumb className='ml-2'>
                                    <BreadcrumbList>
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="hidden md:block" />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>{user.name}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <div className="pr-4">
                                <NotificationBell />
                            </div>
                        </header>
                        <div className="mt-3 h-[870px] overflow-y-auto px-6">{children}</div>
                    </SidebarInset>
                </SidebarProvider>
            </div>
        )
}
